import React from "react";
import { Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import { getNewChatId } from "../utils/utils";

interface LojoChatInputBoxProps {
    currentChatId: string;
    firstName: string;
    username: string;
    onChatChange: (e: string) => void;
    onNewRemarkChange: (e: string) => void;
}

const LojoChatInputBox: React.FC<LojoChatInputBoxProps>= ({currentChatId,firstName, username, onChatChange, onNewRemarkChange}) => {

    const [remark, setRemark] = React.useState('');

    // onClick function for the lojo-newchat button
    const onClickNewChat = () => {
        onChatChange(getNewChatId());
    }

    const onSendRemarkClick = () => {
        console.log('LojoChatInputBox: onSendRemarkClick - send remark: ', remark);
        const sendRemark = remark;
        onNewRemarkChange(sendRemark);
        setRemark('');
    }

    return (
        <div>
        {
            (currentChatId.startsWith('lojo-chat-'))
            ? <Row justify="space-around" align="middle">
                <Col style={{ width: '90%' }}>
                    <Input.TextArea 
                        autoSize={{ minRows:2,maxRows:5 }} 
                        placeholder="Question for Login AI"
                        style={{ fontSize: '16px' }}
                        value={remark}
                        onChange={e => setRemark(e.target.value)}
                        onKeyDown={e => {
                            if (!e.shiftKey && e.key === 'Enter') {
                                e.preventDefault();
                                onSendRemarkClick();
                                }
                            }
                        }
                    />
                </Col>
                <Col style={{ width: '10%' }}>
                    <Button 
                        id="newChatBtn" 
                        type="primary" 
                        shape="circle" 
                        icon={<SendOutlined />} 
                        onClick={()=> onSendRemarkClick()}
                        style={{ margin: '10px' }}
                    />
                </Col>
            </Row>
            : <Row justify="space-around" align="middle">
                <Col flex={9} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button id="lojo-newchat" type="primary" block onClick={onClickNewChat}>Start New Chat</Button>
                </Col>
            </Row>
        }
        </div>

    );
};

export default LojoChatInputBox;
