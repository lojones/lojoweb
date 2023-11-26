import React, { useEffect } from "react";
import { Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';

const LojoChatInputBox: React.FC = () => {


    useEffect(() => {
        console.log('useEffect');
    }, []);
    
    return (
        <div>
            <Row justify="space-around" align="middle">
                <Col flex={9}>
                    <Input.TextArea autoSize={{ minRows:2,maxRows:5 }} placeholder="Question" />
                </Col>
                <Col flex={1}>
                    <Button type="primary" shape="circle" icon={<SendOutlined />} />
                </Col>
            </Row>
        </div>

    );
};

export default LojoChatInputBox;
