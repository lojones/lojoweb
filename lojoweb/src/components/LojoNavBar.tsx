import React, { useEffect } from "react";
import type { MenuProps } from "antd";
import { Menu } from 'antd';
import { LojoChatMetadata } from "../models/LojoChat";
import { getChatHistoryList, getChat, saveChat } from "../utils/utils";
import { getNewChatId } from "../utils/utils";

type MenuItem = Required<MenuProps>['items'][number];

interface LojoNavBarProps {
    currentChatId: string;
    latestRemark: string;
    onChatChange: (e: string) => void;
}

const LojoNavBar: React.FC<LojoNavBarProps> = ({currentChatId,latestRemark,onChatChange}) => {

    console.log('LojoNavBar: enter component');

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
        const chatId = e.key;
        if (chatId === 'lojo-chat') {
            console.log('LojoNavBar: click - new chat');
            onChatChange(getNewChatId());
            return;
        }
        console.log('LojoNavBar: click ', e.key);
        onChatChange(chatId);
    };

    const [existingChats, setExistingChats] = React.useState(getChatHistoryList());
    const [existingChatMenuItems, setExistingChatMenuItems] = React.useState(existingChats.map((chat: LojoChatMetadata) => getItem(chat.summary, chat.chatId)));
    const chatsList: MenuProps['items'] = [
        getItem('New Chat', 'lojo-chat'),
        getItem('Chats', 'chats', null, existingChatMenuItems)
    ]
    const [navbarChatsList, setNavbarChatsList] = React.useState(chatsList);
    const [selectedChat, setSelectedChat] = React.useState(currentChatId);

    useEffect(() => {
        if (!currentChatId || currentChatId === '' || currentChatId === 'lojo-chat' || !currentChatId.startsWith('lojo-chat-')) {
            console.log('LojoNavBar - invalid chat id used so dont do anything, currentChatId: ', currentChatId);
            return;
        }
        console.log('LojoNavBar - useEffect - another chat selected: ', currentChatId);
        if (currentChatId === '') {
            console.log('LojoNavBar - empty chat id used so dont do anything');
            return;
        }
        const newChatExistsAlready = existingChatMenuItems.find((menuItem) => menuItem !== null && menuItem.key === currentChatId);
        if (newChatExistsAlready === undefined) {
            console.log('LojoNavBar - New chat does not exist already');
            const newChat: LojoChatMetadata = {
                chatId: currentChatId,
                summary: "New chat",
                timestamp: new Date()
            }
            const newChatMenuItems = [getItem(newChat.summary, newChat.chatId), ...existingChatMenuItems];
            setExistingChatMenuItems(newChatMenuItems);
            const newChatsList: MenuProps['items'] = [
                getItem('New Chat', 'lojo-chat'),
                getItem('Chats', 'chats', null, newChatMenuItems)
            ]
            setNavbarChatsList(newChatsList);
            setSelectedChat(newChat.chatId);
            console.log('LojoNavBar - Selected chat menu item: ', newChat);
        } else {
            setSelectedChat(currentChatId);
        }
        
    }, [currentChatId]);

    useEffect(() => {
        // get the currently selected key from the Menu component
        console.log('LojoNavBar - useEffect - latestRemark: ', latestRemark);
        if (existingChatMenuItems[0] && 
            existingChatMenuItems[0].key && 
            'label' in existingChatMenuItems[0] &&
            existingChatMenuItems[0].label === 'New chat') {

            const newChatMenuItems = [...existingChatMenuItems];
            if (newChatMenuItems[0] && newChatMenuItems[0].key) {

                const latestRemarkChatId: string = String(newChatMenuItems[0].key);
                newChatMenuItems[0] = getItem(latestRemark, latestRemarkChatId);
                setExistingChatMenuItems(newChatMenuItems);
                const newChatsList: MenuProps['items'] = [
                    getItem('New Chat', 'lojo-chat'),
                    getItem('Chats', 'chats', null, newChatMenuItems)
                ]
                setNavbarChatsList(newChatsList);
                setSelectedChat(latestRemarkChatId);
            }

        }
    }, [latestRemark]);

    return (
        <Menu
            onClick={onClick}
            mode="inline"
            items={navbarChatsList}
            defaultOpenKeys={['chats']}
            selectedKeys={[selectedChat]}
        />

    );
};

export default LojoNavBar;
