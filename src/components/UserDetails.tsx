import React, { useEffect } from "react";
import { UserDetailsUrl } from "../utils/envvars";
import axios from "axios";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";
import './UserDetails.css';
import { Layout } from 'antd';
const { Header, Content, Footer } = Layout;

interface UserDetailsProps {
    firstName: string;
    username: string;
    onUserDetailsChange: (firstName: string,username:string) => void;
}

const UserDetails: React.FC<UserDetailsProps> = ({firstName,username,onUserDetailsChange}) => {

    const [errorMessage, setErrorMessage] = React.useState('');

    const getUserDetails = async () => {
        console.log(`First Name: ${firstName}`);
        const token = localStorage.getItem('token');
        const _username = String(localStorage.getItem('username'));
        axios.get(UserDetailsUrl(), {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                username: _username
            }
        })
        .then((response) => {
            console.log(response.data);
            onUserDetailsChange(response.data.firstname,response.data.username);
        })
        .catch((error) => {
            console.log(error);
            // navigate('/signin');
            setErrorMessage(error);
        });
    };

    useEffect(() => {
        getUserDetails();
    }, []);
    
    return (
        <div className="navbar-user-detail" >
            <div>{firstName}</div>
        </div>
    );
};

export default UserDetails;
