import React from "react";
import { Menu } from 'antd';

const LojoLogo: React.FC = () => {

    console.log('LojoChatListMenu: enter component');
    
    const getRandomNumber = () => {
        return Math.floor(Math.random() * 8) + 1;
    };
    
    const generateFilename = () => {
        const randomNumber = getRandomNumber();
        return `genericprofilepic${randomNumber}.png`;
    };
    
    const filename = generateFilename();

    return (
        <div>
            <img src={filename} alt="Lojo Chat" style={{width:'200px', height: '200px', margin: '40px', boxShadow: '0 0 8px 8px rgba(0, 0, 0, 0.5)'}}/>
        </div>

    );
};

export default LojoLogo;
