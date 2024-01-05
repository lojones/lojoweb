import React, { useState } from "react";
import { Drawer, Button } from "antd";
import type { MenuProps } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Menu } from 'antd';
import "./LojoTopBar.css";
import logo from "./logo.svg";
import { getNewChatId } from "../utils/utils";
import { getChatHistoryList, getChat, saveChat } from "../utils/utils";
import { LojoChatMetadata } from "../models/LojoChat";

type MenuItem = Required<MenuProps>['items'][number];

interface LojoTopBarProps {
    children: React.ReactNode;
}

const LojoTopBar: React.FC<LojoTopBarProps> = ({children}) => {
  const [visible, setVisible] = useState(false);

  return (
    <nav className="lojotopbar">
      <Button
        className="lojotopbarmenu"
        type="primary"
        icon={<MenuOutlined />}
        onClick={() => setVisible(true)}
      />
      <Drawer
        title="Topics"
        placement="left"
        onClick={() => setVisible(false)}
        onClose={() => setVisible(false)}
        visible={visible}
      >
        {children}
     </Drawer>
     <a href="/"><img src={logo} className="logo" alt="logo" /></a>     
    </nav>
  );
};
export default LojoTopBar;