import React, { useEffect } from "react";
import { UserDetailsUrl } from "../utils/envvars";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";
import './UserDetails.css';
import { Layout } from 'antd';
import { getUserDetails } from "../utils/LojoDataService";
import { UserDetail } from "../models/User";
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

const { Header, Content, Footer } = Layout;

interface UserDetailsProps {
    onUserChange: (firstname: string, username: string) => void;
}

const UserDetails: React.FC<UserDetailsProps> = ({onUserChange}) => {

    const [errorMessage, setErrorMessage] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [profilePicUrl, setProfilePicUrl] = React.useState('');
    const navigate = useNavigate();

    const userProfileMenu:MenuProps['items'] = [
        {
            label: (<span>{firstName}</span>),
            key: 'userprofile',
            icon: <Avatar size={40} icon={<img src={profilePicUrl} alt="Profile Picture" />} />,
            children: [
                { 
                    label: 'Log out',
                    key: 'logout',
                }
            ]
        }
    ];

    useEffect(() => {
            
        const token : string |null = localStorage.getItem('token');
        if (!token) {
            navigate('/signin');
        } else {
            getUserDetails(token)
            .then((userDetail:UserDetail) => {
                console.log(userDetail);
                setFirstName(userDetail.firstname);
                setProfilePicUrl(userDetail.profilepicurl);
                onUserChange(userDetail.firstname, userDetail.username);
            })
            .catch((error) => {
                console.log(error);
                // navigate('/signin');
                setErrorMessage(error);
            });
        }
    }, []);

    const handleSignOut:MenuProps['onClick'] = (e) => {
        if (e.key === 'logout') {
            localStorage.removeItem('token');
            navigate('/signin');
        }
    }


    return (
        <div className="navbar-user-detail" >
            <Menu 
                className="minwidth200" 
                items={userProfileMenu} 
                mode="horizontal" 
                selectedKeys={['userprofile']} 
                onClick={handleSignOut} />
        </div>
    );
};

export default UserDetails;
