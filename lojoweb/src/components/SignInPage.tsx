import React from "react";
import { useNavigate } from "react-router-dom";
import { apiHost, signInUrl } from "../utils/envvars";
import { Button, Form, Input, Checkbox, Card, Alert, message } from 'antd';

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

    return (
        
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10%' }}>
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
        </div>
    );
};

export default SignInPage;
