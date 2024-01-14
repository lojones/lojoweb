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

const { Header, Content, Footer } = Layout;

const UserDetails: React.FC = () => {

    const [errorMessage, setErrorMessage] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [profilePicUrl, setProfilePicUrl] = React.useState('');
    const navigate = useNavigate();

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
            })
            .catch((error) => {
                console.log(error);
                // navigate('/signin');
                setErrorMessage(error);
            });
        }
    }, []);

    const handleSignOut = () => {
        localStorage.removeItem('token');
        navigate('/signin');
    }


    return (
        <div className="navbar-user-detail" >
            <div>{firstName}</div>
            <Avatar size={64} icon={<img src={profilePicUrl} alt="Profile Picture" />} />
            <div><Link to="" onClick={handleSignOut}>Sign out</Link></div>
        </div>
    );
};

export default UserDetails;
