import React, { useRef, useEffect, useState } from "react";
import { Card, Space, Typography, Col, Row, Divider, List } from 'antd';
import { getChat, saveChat, isValidToken, submitRemark, getRemarkResponseStream } from "../utils/utils";
import { LojoChat, LojoChatRemarkUniqueId } from "../models/LojoChat";
import { storeChat } from "../utils/LojoDataService";
import moment from 'moment'
import { useNavigate } from "react-router-dom";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
// import MarkdownCodeBlock from "./MarkdownCodeBlock";
// @ts-expect-error https://github.com/react-syntax-highlighter/react-syntax-highlighter/issues/407
import { materialLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
// @ts-expect-error https://github.com/react-syntax-highlighter/react-syntax-highlighter/issues/407
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import  mermaid  from 'mermaid'

import './Chat.css'

const { Text } = Typography;

interface ChatProps {
    currentChatId: string;
    firstName: string;
    username: string;
    latestRemark: string;
}

const DelayedComponent: React.FC<IMermaidChart> = ({ code }) => {
    const [visible, setVisible] = useState(false);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setVisible(true);
      }, 2000);
  
      return () => clearTimeout(timer); // This will clear the timer if the component is unmounted before 5 seconds
    }, []);
  
    return (
        <div>
            { visible ?
            ( 
                <div dangerouslySetInnerHTML={{ __html:  code }} /> 
            ) : (
                <div>Rendering Diagram...</div>
            )
 }
        </div>
      
        
    );
};
  

interface IMermaidChart {
    code: string;
  }

const MermaidChart: React.FC<IMermaidChart> = ({ code }) => {
    const ref = useRef<HTMLDivElement>(null);

    const [mermaidDiagram, setMermaidDiagram] = React.useState('');

    useEffect(() => {
        mermaid.initialize({ startOnLoad: false });
    }, []);
  
    useEffect(() => {
        const render = async () => {
            
            try {
                if (await mermaid.parse(code, {suppressErrors: true})) {
                    const { svg } = await mermaid.render('mermaidChart', code);
                    setMermaidDiagram(svg);
                } else {
                    console.log("MermaidChart: could not parse diagram ");
                }
                
                
            } catch (error) {
                // setMermaidDiagram(code);
                console.log("MermaidChart: did not render diagram ", error);
            }
            
        }
        render();
    }, [code]);
  
    return <DelayedComponent code={mermaidDiagram} />;
  };

const Chats: React.FC<ChatProps>= ({currentChatId,firstName, username,latestRemark}) => {

    console.log('Chats: enter component');
    const navigate = useNavigate();

    const currentChat : LojoChat = getChat(currentChatId);
    const [myChat, setMyChat] = React.useState(currentChat);

    const scrollRef = useRef<HTMLDivElement>(null);
    const mermaidRef = useRef(null);

    console.log("Chats, currentChat", myChat);

    const scrolldown = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            console.log("Chats: scrolldown - scrolled down");
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        
        if (currentChatId === "lojo-chat") {
            console.log("Chats: user has not started a new chat yet, currentChatId is lojo-chat, so dont do anything");
            return;
        }
        else if (currentChatId.startsWith("lojo-chat-")) {
            console.log('Chats: valid currentChatId change>', currentChatId);
            const newChat : LojoChat = getChat(currentChatId);
            if (!newChat.userId || newChat.userId === ''){
                newChat.userId = username;
                newChat.firstName= firstName;
            }
            if (!newChat.remarks || newChat.remarks.length === 0) {
                const remark = [];
                const introduction = 'Hi I\'m Login AI, an AI avatar of [Login Jones](https://lojones.github.io/about/).  Would you like me to tell you about myself?';
                remark.push({remark: introduction, speaker: "Login AI", timestamp: new Date(), isAiResponse: true});
                newChat.remarks = remark;
                
            }
            setMyChat(newChat);
            scrolldown();
            console.log("Chats: got this new chat for this chat id>",currentChatId,newChat);
        }
        
    }, [currentChatId]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (currentChatId === "lojo-chat") {
            console.log("Chats: user has not started a new chat yet, currentChatId is lojo-chat, so dont do anything");
            return;
        }
        if (!latestRemark || latestRemark === '') {
            console.log("Chats: latestRemark is empty, so dont do anything");
            return;
        }
        console.log('Chats: latestRemark change>', latestRemark);
        const newRemarks = myChat.remarks ? [...myChat.remarks] : [];

        newRemarks.push({remark: latestRemark, speaker: firstName, timestamp: new Date(), isAiResponse: false});

        const newChat = {
            ...myChat,
            remarks: newRemarks,
            summary: latestRemark.substring(0, 35) + "..",
          };

        setMyChat(newChat);
        saveChat(newChat);
        scrolldown();
        console.log("Chats: appended this remark to this chat>",latestRemark)
        getAiResponse(newChat);

    }, [latestRemark]);


    const getAiResponse = (myChat: LojoChat) => {
        console.log("Chats: getAiResponse - start");
        const token = localStorage.getItem('token');
        if (!token || !isValidToken()) {
            navigate('/signin');
        }
        else {
            const submitResponse = submitRemark(myChat);
            submitResponse.then((response) => {
                // check if the response is a 403 and if it is then redirect to /signin
                if (response == null) {
                    console.log("error trying to submit the chat to AI");
                } else if (response.responseStatusCode === 403) {
                    navigate('/signin');
                } else {
                    
                    const responseRemarkUid : LojoChatRemarkUniqueId = response;
                    const remarkUid = responseRemarkUid.remarkUid;
                    const responseEventSourceStream = getRemarkResponseStream(remarkUid);
                    const responseStringArray:string[] = [];
                    responseEventSourceStream.onmessage = (event) => {
                        const responseobj = event.data;
                        console.log("Chats: responseobj is ",responseobj);
                        const responsejson = JSON.parse(responseobj);
                        const responsemessage:string = responsejson.chunk;

                        
                        if (responsemessage.includes("\n")) {
                            console.log("Chats: getAiResponse - this response contains a newline", responsemessage);
                        }
                        // console.log(responsemessage);
                        if (responsemessage === `done ${remarkUid}`) {
                            responseEventSourceStream.close();
                            storeChat(token, getChat(currentChatId));
                            return;
                        }

                        const newRemarks = myChat.remarks ? [...myChat.remarks] : [];
                        responseStringArray.push(responsemessage);
                        newRemarks.push({remark: responseStringArray.join(""), speaker: "Login AI", timestamp: new Date(), isAiResponse: true});
                        const newChatWithAiResponse = {
                            ...myChat,
                            remarks: newRemarks,
                            summary: myChat.summary,
                        };
                        setMyChat(newChatWithAiResponse);
                        saveChat(newChatWithAiResponse);
                        scrolldown();
                        console.log("Chats: appended this remark to this chat>", responsemessage);
                    };
                    responseEventSourceStream.onerror = (event) => {
                        console.log("error trying to get response from AI",event);
                    };
                    responseEventSourceStream.onopen = (event) => {
                        console.log("opened connection to get response from AI", event);
                    }
                    console.log("ok");

                }
            });
        }
        console.log("Chats: getAiResponse - end");
    }
    
    return (
        <div style={{ marginTop: '20px' }}>
            <div id="mainchatdiv" ref={scrollRef} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', overflowY: 'auto', maxHeight: '75vh' }}>
                <Space id="mainchatspace" direction="vertical" size="middle" style={{ width: '70%' }}>
                    {
                        myChat.remarks.length === 0 ? (
                            <div>
                                <div style={{ justifyContent:'center', paddingBottom: '20px'}}>Try asking these questions...</div>
                                <div id="suggestioncardcontainer" >
                                    <div className="suggestionCard">
                                        <p>What is your app architecture?</p>
                                    </div>
                                    <div className="suggestionCard">
                                        <p>Tell me about your work history</p>
                                    </div>
                                    <div className="suggestionCard">
                                        <p>What gen AI work have you done?</p>
                                    </div>
                                    <div className="suggestionCard">
                                        <p>How do you stay current with tech?</p>
                                    </div>
                                    <div className="suggestionCard">
                                        <p>Your thoughts on work life balance?</p>
                                    </div>
                                    <div className="suggestionCard">
                                        <p>Tell me about your written, video and art publications?</p>
                                    </div>
                                    <div className="suggestionCard">
                                        <p>What is your purpose?</p>
                                    </div>
                                </div>
                            </div>
                            )
                        : (
                            myChat.remarks.map((remark, index) => (
                                <div>
                                    <Card key={index} title={remark.speaker} size="small">
                                        <Markdown remarkPlugins={[remarkGfm]} 
                                        components={{
                                                    code({ node,  className, children, ...props }) {
                                                        const match = /language-(\w+)/.exec(className || "");
                                                        const text = String(children);

                                                        if (match) {
                                                            if (className === 'language-mermaid') {
                                                                
                                                                return <MermaidChart code={text} />;
                                                            } else {
                                                                return <SyntaxHighlighter
                                                                    style={materialLight}
                                                                    PreTag="div"
                                                                    language={match[1]}
                                                                    children={String(children).replace(/\n$/, "")}
                                                                    {...props}
                                                                />
                                                            }
                                                            
                                                        } else {
                                                            return  <code className={className ? className : ""} {...props}>
                                                                        {children}
                                                                    </code>;
                                                        }
                                                        
                                                        
                                                    }
                                                }}>
                                            {remark.remark}
                                        </Markdown>
                                        <p><Text italic className="smalltext">{moment(remark.timestamp).format("h:mm:ss a")}</Text> </p>
                                    </Card>                            
                                </div>
                            ))
                        )
                    }
                </Space>
            </div>
        </div>
    );
};

export default Chats;

