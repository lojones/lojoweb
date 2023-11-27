import React, { useEffect } from "react";
import { Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { LojoChat, LojoChatRemark } from "../models/LojoChat";


interface LojoChatInputBoxProps {
    currentChat: string;
    firstName: string;
    username: string;
    onChatChange: (e: string) => void;
}

const LojoChatInputBox: React.FC<LojoChatInputBoxProps>= ({currentChat,firstName, username, onChatChange}) => {

    // onClick function for the lojo-newchat button
    const onClickNewChat = () => {
        
        const uuid = uuidv4();
        const newChatId = `lojo-chat-${uuid}`;
        console.log('New Chat',newChatId);
        const newChat: LojoChat = {
            chatId: newChatId,
            userId: username,
            firstName: firstName,
            remarks: []
        }
        onChatChange(newChatId);
    }

    useEffect(() => {
        console.log('useEffect', currentChat);
    }, []);
    
    return (
        <div>
        {
            currentChat != ''
            ? <Row justify="space-around" align="middle">
                <Col flex={9}>
                    <Input.TextArea autoSize={{ minRows:2,maxRows:5 }} placeholder="Question" />
                </Col>
                <Col flex={1}>
                    <Button type="primary" shape="circle" icon={<SendOutlined />} />
                </Col>
            </Row>
            : <Row justify="space-around" align="middle">
                <Col flex={9}>
                    <Button id="lojo-newchat" type="primary" onClick={onClickNewChat}>Start New Chat</Button>
                </Col>
            </Row>
        }
        </div>

    );
};

export default LojoChatInputBox;
