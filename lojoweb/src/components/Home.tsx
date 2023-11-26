import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Layout, Menu } from 'antd';
import type { MenuProps } from "antd";
import { healthUrl } from "../utils/envvars";
import UserDetails from "./UserDetails";
import LojoNavBar from "./LojoNavBar";
import LojoChatInputBox from "./LojoChatInputBox";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const Home: React.FC = () => {
    const [collapsed, setCollapsed] = React.useState(false);
    const [status, setStatus] = React.useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const healthurl = healthUrl();
    console.log(healthurl);

    const [currentChat, setCurrentChat] = React.useState('');

    const currentChatChangeHandler = (e: string) => {
        setCurrentChat(e);
    }

    useEffect(() => {
        if (!token) {
            navigate('/signin');
        } else {
            axios.get(healthUrl(), {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((response) => {
                    console.log(response.data);
                    setStatus(response.data);
                })
                .catch((error) => {
                    console.log(error);
                    navigate('/signin');
                });
        }
    }, [navigate]);
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider 
                    style={{background: 'white'}}>
                <div>
                    <UserDetails />
                    <LojoNavBar currentChat={currentChat} onChatChange={currentChatChangeHandler}/>
                </div>
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: 'lightgray' }}>
                    <div>This is the header</div>
                </Header>
                <Content>
                    <div>This is the content</div>
                </Content>
                <Footer>
                    <div>
                        <LojoChatInputBox currentChat={currentChat} onChatChange={currentChatChangeHandler}/>
                    </div>
                </Footer>
            </Layout>
        </Layout>
       

    );
};

export default Home;
