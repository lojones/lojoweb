import React from "react";
import { useNavigate } from "react-router-dom";
import { apiHost, signInUrl } from "../utils/envvars";
import { Button, Form, Input, Checkbox, Card, Alert, message } from 'antd';
import GoogleSignIn from "./GoogleSignIn";
import MicrosoftSignIn from "./MicrosoftSignIn";
import './SignInPage.css';



type SignInType = {
    username?: string;
    password?: string;
    remember?: string;
  };

const SignInPage: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [errorMessage, setErrorMessage] = React.useState('');
    const navigate = useNavigate();
    const apiUrlSignIn = signInUrl()

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

    return (
        
        <div id="main-signin-container" >
            {contextHolder}
            <Card title="Sign In" style={{ width: '50%' }}>
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
            </Card>
            <Card title="Sign In with Providers" style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}>
                <div className="signin-mid-center">
                    <GoogleSignIn />
                </div>
                <div className="signin-mid-center">
                    <MicrosoftSignIn />
                </div>
                
            </Card>
        </div>
    );
};

export default SignInPage;
