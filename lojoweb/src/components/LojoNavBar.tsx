import React, { useEffect } from "react";
import type { MenuProps } from "antd";
import { Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const LojoNavBar: React.FC = () => {

    function getItem(
        label: React.ReactNode,
        key: string,
        icon?: React.ReactNode,
        children?: MenuItem[],
        type?: 'group'
    ): MenuItem {
        return {
            key,
            icon,
            children,
            label,
            type
        } as MenuItem;
    }

    function getChatsListJson(): object {
        const chatItemsString : string = localStorage.getItem('chatItems') || '{}';
        return JSON.parse(chatItemsString);
    }



    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        const key = e.key;
        if (key === 'newchat') {
            console.log('New Chat');
        }
    };

    const chatsList: MenuProps['items'] = [
        getItem('New Chat', 'newchat'),
        getItem('Chats', 'chats', null, [
            getItem('Chat 1', 'chat1'),
            getItem('Chat 2', 'chat2'),
            getItem('Chat 3', 'chat3'),
            getItem('Chat 4', 'chat4'),
            getItem('Chat 5', 'chat5'),
            getItem('Chat 6', 'chat6'),
            getItem('Chat 7', 'chat7'),
            getItem('Chat 8', 'chat8'),
            getItem('Chat 9', 'chat9'),
            getItem('Chat 10', 'chat10')
        ])
    ]

    useEffect(() => {
        console.log('useEffect');
    }, []);
    
    return (
        <Menu
            onClick={onClick}
            mode="inline"
            items={chatsList}
            defaultOpenKeys={['chats']}
        />

    );
};

export default LojoNavBar;
