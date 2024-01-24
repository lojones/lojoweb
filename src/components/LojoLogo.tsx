import React from "react";
import { Menu } from 'antd';

const LojoLogo: React.FC = () => {

    console.log('LojoChatListMenu: enter component');
    
    const filename = 'lojologo.png';

    return (
        <div>
            <img src={filename} alt="Lojo Chat" style={{width:'200px', height: '200px', margin: '40px', borderRadius: '20px', boxShadow: '0 0 15px 10px white', overflow: 'hidden'}}/>
        </div>

    );
};

export default LojoLogo;
