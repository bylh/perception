import { Form, Input, Button, Checkbox } from 'antd';
import React from 'react'
import {
    useHistory,
} from "react-router-dom"
import axios from '../../service/axios'
import './login.scss'
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export default function () {
    const history = useHistory()
    const onFinish = async (values) => {
        console.log('Success:', values);
        let data = new FormData();
        data.append('username',values.username);
        data.append('password',values.password);
        const res = await axios.request({
            method: "post",
            url: '/login',
            data
        })
        if (res.data.code !== 200) {
            return;
        }
        console.log(res.data.data.token)
        localStorage.setItem("token", res.data.data.token)
        history.push('/')
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="login">
            <Form
                {...layout}
                style={{width: "500px"}}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        login
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
