import { Layout } from "antd";
import React, { useEffect } from "react";
import type { MenuProps } from "antd";
import { Menu } from 'antd';
import { LojoChatMetadata } from "../models/LojoChat";
import { getChatHistoryList, getChat, saveChat } from "../utils/utils";
import { getNewChatId } from "../utils/utils";


type MenuItem = Required<MenuProps>['items'][number];

interface LojoSideBarProps {
    children: React.ReactNode;
}

const LojoSideBar: React.FC<LojoSideBarProps> = ({children}) => {

    console.log('LojoSideBar: enter component');


    return (
    <Layout.Sider
        className="lojosidebar"
        breakpoint={"lg"}
        theme="light"
        collapsedWidth={0}
        trigger={null}
        >
            {children}
    </Layout.Sider>

    );
};

export default LojoSideBar;
