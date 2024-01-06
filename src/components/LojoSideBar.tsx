import { Layout } from "antd";
import React from "react";
// import type { MenuProps } from "antd";



// type MenuItem = Required<MenuProps>['items'][number];

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
