import React, { useEffect } from "react";
import { Card, Space } from 'antd';

interface ChatsProps {
    currentChat: string;
    firstName: string;
    username: string;
}

const Chats: React.FC<ChatsProps>= ({currentChat,firstName, username}) => {


    useEffect(() => {
        console.log('useEffect', currentChat);
    }, []);
    
    return (
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Card title={firstName} size="small">
                <p>Card content</p>
                <p>Card content</p>
            </Card>
        </Space>

    );
};

export default Chats;
