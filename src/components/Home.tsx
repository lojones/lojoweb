import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Layout } from 'antd';
// import type { MenuProps } from "antd";
import { healthUrl } from "../utils/envvars";
import LojoSideBar from "./LojoSideBar";
import LojoTopBar from "./LojoTopBar";
import LojoChatInputBox from "./LojoChatInputBox";
import LojoChatListMenu from "./LojoChatListMenu";
import Chats from "./Chat";

const { Header, Content, Footer } = Layout;

// type MenuItem = Required<MenuProps>['items'][number];

const Home: React.FC = () => {

    console.log('Home: enter component');

    // const [collapsed, setCollapsed] = React.useState(false);
    const [status, setStatus] = React.useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const healthurl = healthUrl();
    console.log(healthurl);

    const [latestRemark, setLatestRemark] = React.useState('');
    const [currentChatId, setCurrentChatId] = React.useState('lojo-chat');
    const [firstName, setFirstName] = React.useState('');
    const [username, setUsername] = React.useState('');

    const setUserHandler = (firstName: string, username: string) => {
        setFirstName(firstName);
        setUsername(username);
    }

    const latestRemarkChangeHandler = (e: string) => {
        setLatestRemark(e);
        console.log('Home: latestRemarkChangeHandler - set latest remark: ', e);
    }

    const currentChatIdChangeHandler = (e: string) => {
        setCurrentChatId(e);
        console.log('Home: currentChatIdChangeHandler - set current chatid: ', e);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <Layout>
            <LojoSideBar>
                <LojoChatListMenu 
                    currentChatId={currentChatId} 
                    latestRemark={latestRemark}
                    onChatChange={currentChatIdChangeHandler}/>
            </LojoSideBar>

            <Layout style={{ minHeight: '90vh' }} >
                <Header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                    alignItems: 'center',
                    padding: 0,
                    backgroundColor: '#FFFFFF'
                  }}>
                    <LojoTopBar
                        onUserChange={setUserHandler}>
                        <LojoChatListMenu 
                            currentChatId={currentChatId} 
                            latestRemark={latestRemark}
                            onChatChange={currentChatIdChangeHandler}/>
                    </LojoTopBar>
                </Header>
                <Content>
                    <Chats  
                        firstName={firstName} 
                        username={username} 
                        currentChatId={currentChatId}
                        latestRemark={latestRemark} 
                    />
                </Content>
                <Footer
                    style={{
                        position: 'sticky',
                        bottom: 0,
                        zIndex: 1,
                        width: '100%',                        
                        alignItems: 'center',
                    }}>
                    <div>
                        <LojoChatInputBox 
                            firstName={firstName} 
                            username={username} 
                            onChatChange={currentChatIdChangeHandler} 
                            onNewRemarkChange={latestRemarkChangeHandler} 
                            currentChatId={currentChatId} 
                        />
                    </div>
                </Footer>

            </Layout>
            
        </Layout>
        
       

    );
};

export default Home;
