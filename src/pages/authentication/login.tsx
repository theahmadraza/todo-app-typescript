import React from 'react';
import { Button, Form, Input } from 'antd';

const Login:React.FC = () => {
  return(
    <div className='login-page'>  
        <h3 className='login-title'>Login Here!</h3>
        <Form
            name="basic"
            layout="vertical"
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            >
            <Form.Item className='form-field'
            label="Email"
            name="email"
            rules={[{required:true, message:'Please enter your Email!'}]}
            >
            <Input />
            </Form.Item>
            <Form.Item className='form-field'
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
            >
            <Input.Password />
            </Form.Item>
            <Form.Item>
            <Button type="primary" htmlType="submit">Login</Button>
            </Form.Item>
        </Form>
    </div>
  )
}

export default Login;