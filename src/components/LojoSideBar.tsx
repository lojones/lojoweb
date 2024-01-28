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
        width={300}
        collapsedWidth={0}
        trigger={null}
        style={{
            position: 'sticky',
            top: 0,  // or the height of your header if you have one
            left: 0,
            height: '100vh',  // 100% of the viewport height
            zIndex: 1,
            overflowY: 'auto'
            // Add more styles as needed for width, padding, background, etc.
          }}
        >
            {children}
    </Layout.Sider>

    );
};

export default LojoSideBar;
