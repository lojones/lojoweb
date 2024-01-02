import React, { useEffect } from "react";
import { Card, Space, Typography } from 'antd';
import { getChat, saveChat, isValidToken, sendRemark } from "../utils/utils";
import { LojoChat, LojoChatRemark, LojoChatMetadata } from "../models/LojoChat";
import moment from 'moment'
import { useNavigate } from "react-router-dom";

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

    console.log("Chats, currentChat", myChat);

    useEffect(() => {
        
        if (currentChatId == "lojo-chat") {
            console.log("Chats: user has not started a new chat yet, currentChatId is lojo-chat, so dont do anything");
            return;
        }
        else if (currentChatId.startsWith("lojo-chat-")) {
            console.log('Chats: valid currentChatId change>', currentChatId);
            const newChat : LojoChat = getChat(currentChatId);
            setMyChat(newChat);
            console.log("Chats: got this new chat for this chat id>",currentChatId,newChat);
        }
        
    }, [currentChatId]);

    useEffect(() => {
        if (currentChatId == "lojo-chat") {
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
        console.log("Chats: appended this remark to this chat>",latestRemark)
        getAiResponse(newChat);
        
    }, [latestRemark]);

    const getAiResponse = (myChat: LojoChat) => {
        if (!isValidToken()) {
            navigate('/signin');
        }
        else {
            sendRemark(myChat)
            .then((response) => {
                
                const responsemessage = response.message;
                console.log(responsemessage);
                const newRemarks = myChat.remarks ? [...myChat.remarks] : [];
                newRemarks.push({remark: responsemessage, speaker: "AI", timestamp: new Date(), isAiResponse: true});
                const newChatWithAiResponse = {
                    ...myChat,
                    remarks: newRemarks,
                    summary: myChat.summary,
                    };
                setMyChat(newChatWithAiResponse);
                saveChat(newChatWithAiResponse);
                console.log("Chats: appended this remark to this chat>",responsemessage)
            })
            .catch((error) => {
                console.log(error);
                navigate('/signin');
            });
        }
    }
    
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '90%' }}>
                <Space direction="vertical" size="middle" style={{ width: '70%' }}>
                    {myChat.remarks.map((remark, index) => (
                    <Card key={index} title={remark.speaker} size="small">
                        <p>{remark.remark}</p>
                        <p><Text italic className="smalltext">{moment(remark.timestamp).format("h:mm:ss a")}</Text> </p>
                    </Card>
                    ))}
                </Space>
            </div>
        </div>
    );
};

export default Chats;

