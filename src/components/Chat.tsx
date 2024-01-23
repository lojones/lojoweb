import React, { useRef, useEffect } from "react";
import { Card, Space, Typography, Col, Row, Divider, List } from 'antd';
import { getChat, saveChat, isValidToken, submitRemark, getRemarkResponseStream } from "../utils/utils";
import { LojoChat, LojoChatRemarkUniqueId } from "../models/LojoChat";
import moment from 'moment'
import { useNavigate } from "react-router-dom";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
// import MarkdownCodeBlock from "./MarkdownCodeBlock";
// @ts-expect-error https://github.com/react-syntax-highlighter/react-syntax-highlighter/issues/407
import { materialLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
// @ts-expect-error https://github.com/react-syntax-highlighter/react-syntax-highlighter/issues/407
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import './Chat.css'

const { Text } = Typography;

interface ChatProps {
    currentChatId: string;
    firstName: string;
    username: string;
    latestRemark: string;
}

const Chats: React.FC<ChatProps>= ({currentChatId,firstName, username,latestRemark}) => {

    console.log('Chats: enter component');
    const navigate = useNavigate();

    const currentChat : LojoChat = getChat(currentChatId);
    const [myChat, setMyChat] = React.useState(currentChat);

    const scrollRef = useRef<HTMLDivElement>(null);

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
            summary: latestRemark.substring(0, 25) + "..",
          };

        setMyChat(newChat);
        saveChat(newChat);
        scrolldown();
        console.log("Chats: appended this remark to this chat>",latestRemark)
        getAiResponse(newChat);

    }, [latestRemark]);


    const getAiResponse = (myChat: LojoChat) => {
        console.log("Chats: getAiResponse - start");
        if (!isValidToken()) {
            navigate('/signin');
        }
        else {
            const submitResponse = submitRemark(myChat);
            submitResponse.then((response) => {
                if (response == null) {
                    console.log("error trying to submit the chat to AI");
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
        <div style={{ marginTop: '50px' }}>
            <div id="mainchatdiv" ref={scrollRef} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', overflowY: 'auto', maxHeight: '75vh' }}>
                <Space id="mainchatspace" direction="vertical" size="middle" style={{ width: '70%' }}>
                    {
                        myChat.remarks.length === 0 ? (
                            <div>
                                <div style={{ justifyContent:'center', paddingBottom: '20px'}}>Try asking these questions...</div>
                                <Row gutter={16}>
                                    <Col span={8}>
                                        <Card bordered={false} size="small">
                                            <p>Describe a specific challenge you faced while implementing cloud platforms and how you overcame it</p>
                                            <p>What was the most innovative solution you implemented in risk technology, and how did it impact the business</p>
                                        </Card>
                                    </Col>
                                    <Col span={8}>
                                        <Card bordered={false} size="small">
                                            <p>Can you give an example of how you utilized a specific AI service to solve a complex problem </p>
                                            <p>Describe some AI research your team did and how its findings were practically applied?</p>
                                        </Card>
                                    </Col>
                                    <Col span={8}>
                                        <Card bordered={false} size="small">
                                            <p>how do you balance the need for innovation with the management of potential risks, especially in Fintech?</p>
                                            <p>How have you used technology to improve risk management processes in your previous roles?</p>
                                        </Card>
                                    </Col>
                                </Row>
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
        
                                                        return match ? (
                                                            <SyntaxHighlighter
                                                            style={materialLight}
                                                            PreTag="div"
                                                            language={match[1]}
                                                            children={String(children).replace(/\n$/, "")}
                                                            {...props}
                                                            />
                                                        ) : (
                                                            <code className={className ? className : ""} {...props}>
                                                            {children}
                                                            </code>
                                                        );
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

