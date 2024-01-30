import React from "react";
import { useNavigate } from "react-router-dom";
import { apiHost, signInUrl } from "../utils/envvars";
import { Button, Form, Input, Checkbox, Card, Alert, message } from 'antd';
import GoogleSignIn from "./GoogleSignIn";
import LinkedInSignIn from "./LinkedInSignin";
import type { CollapseProps } from 'antd';
import { Collapse, Carousel } from 'antd';
import './SignInPage.css';

type SignInType = {
    username?: string;
    password?: string;
    remember?: string;
};

const contentStyle: React.CSSProperties = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };

const SignInPage: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [errorMessage, setErrorMessage] = React.useState('');
    const navigate = useNavigate();
    const apiUrlSignIn = signInUrl()

    const getRandomNumber = () => {
        return Math.floor(Math.random() * 8) + 1;
    };

    const generateFilename = () => {
        const randomNumber = getRandomNumber();
        return `genericprofilepic${randomNumber}.png`;
    };

    const logofile = generateFilename();

    const handleSignIn = async (e: SignInType) => {
        console.log(`Username: ${e.username}`);
        console.log(`Password: ${e.password}`);

        const un = e.username || '';
        const pw = e.password || '';

        const response = await fetch(apiUrlSignIn, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: un, password: pw})
        });

        const data = await response.json();
        console.log(data);

        if (response.ok) {
            console.log('Sign in successful');
            setErrorMessage('Sign in successfully');
            const token = data.token;
            localStorage.setItem('token', token);
            localStorage.setItem('username', un);
            localStorage.setItem('authtype', 'local');
            navigate('/');
        } else {
            const em: string = data.message || 'Sign in failed';
            setErrorMessage(em);
            error(em);
        }
    }

    const error = (msg: string) => {
        messageApi.error(msg);
    }

    const handleSuccess = (credentialResponse: any) => {
        // Handle the successful login here
        console.log('Google login successful', credentialResponse);
    };

    const handleError = () => {
        // Handle login errors here
        console.log('Google login failed');
    };

    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: 'Sign In with Providers',
            children: <p>
                <Card style={{ width: '50%', justifyContent: 'center', alignItems: 'center', display: 'contents' }}>
                    <div className="signin-mid-center">
                        <GoogleSignIn />
                    </div>
                    <div className="signin-mid-center">
                        <LinkedInSignIn />
                    </div>
                </Card>
            </p>
        },
        {
          key: '2',
          label: 'Local Sign In',
          children: <p>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={handleSignIn}
                autoComplete="off"
            >
                <Form.Item<SignInType>
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>
    
                <Form.Item<SignInType>
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                </Form.Item>
            </Form>
          </p>
        }
    ];

    return (
        
        <div id="main-signin-container" >
            <Card bordered style={{ justifyContent: 'center', alignItems: 'center', display: 'block', fontSize: 'small', margin: '10px', color: '#5b5b5b' }}>
                <div>
                    <h1 style={{ textAlign: 'center'}}>Welcome to Login Jones Chat</h1>
                    <p>Chat with <strong>Login AI</strong> - an avatar of IT Professional Login Jones</p>
                    <p>Engaging with the AI avatar of Login Jones is simple.</p>
                    <ol>
                        <li>Sign in using your Google or Microsoft account. Your profile information is only used to create a unique account on Login Jones Chat. <a href="privacy.html" target="_blank">Privacy Policy</a>.</li>
                        <li>Once logged in, start chatting with <strong>Login AI</strong>! </li>
                    </ol>
                    <small><a href="home.html" target="_blank">More details</a></small>
                    
                    <p>Sign In Below!</p>
                </div>
            </Card>
            
            
            
            
            <Collapse items={items} bordered defaultActiveKey={['1']} style={{margin: '10px'}}/>
            
        </div>
    );
};

export default SignInPage;
