import React, { useEffect } from "react";
import { UserDetailsUrl } from "../utils/envvars";
import axios from "axios";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";
import './UserDetails.css';
import { Layout } from 'antd';
const { Header, Content, Footer } = Layout;

const UserDetails: React.FC = () => {
    const [firstName, setFirstName] = React.useState('');
    const [username, setUsername] = React.useState('');
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
            setUsername(response.data.username);
            setFirstName(response.data.firstname);

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
