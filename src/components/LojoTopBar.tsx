import React, { useState } from "react";
import { Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import "./LojoTopBar.css";
import UserDetails from "./UserDetails"
import LojoLinks from "./LojoLinks"


// type MenuItem = Required<MenuProps>['items'][number];

interface LojoTopBarProps {
    children: React.ReactNode;
    onUserChange: (firstname: string, username: string) => void;
}

const LojoTopBar: React.FC<LojoTopBarProps> = ({children,onUserChange}) => {
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
        title="Chats"
        placement="left"
        onClick={() => setVisible(false)}
        onClose={() => setVisible(false)}
        visible={visible}
      >
        {children}
     </Drawer>
      <LojoLinks />
      <UserDetails 
        onUserChange={onUserChange}/>
    </nav>
  );
};
export default LojoTopBar;