import React, { useEffect } from "react";
import { UserDetailsUrl } from "../utils/envvars";
import axios from "axios";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";
import './UserDetails.css';

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
            <Space direction="vertical" size={16}>
                haha
            </Space>
             <Space direction="vertical" size={16}>
                <Space wrap size={16}>
                    <Avatar size={64} icon={<UserOutlined />} />
                        <div>
                            {firstName}
                        </div>
                </Space>
            </Space> 
        </div>
    );
};

export default UserDetails;
