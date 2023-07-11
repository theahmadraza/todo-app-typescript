import React, {ChangeEvent, useState} from 'react'
import { Button, Form, Input } from 'antd';



interface Users{
    name:string;
    email:string;
    password:string;
}

const Register: React.FC = () =>  {
    const [user, setUser] = useState<Users>({
        name:'',
        email:'',
        password:'',
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setUser((prevUser)=> ({
            ...prevUser,
            [name]:value
        }))
    }

    const handleSubmitUser = (values:string) => {
        console.log('Success' , values)
    }
  return (
    <div className='register-page'>  
        <h3 className='register-title'>Register Yourself!</h3>
        <Form
            name="basic"
            layout="vertical"
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            onFinish={handleSubmitUser}
            >
            <Form.Item className='form-field'
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter your Name!' }]}
            >
            <Input name='name' value={user.name} onChange={handleInputChange} />
            </Form.Item>
            <Form.Item className='form-field'
            label="Email"
            name="email"
            rules={[{required:true, message:'Please enter your Email!'}]}
            >
            <Input name='email' value={user.email} onChange={handleInputChange} />
            </Form.Item>
            <Form.Item className='form-field'
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
            >
            <Input.Password name='password' value={user.password} onChange={handleInputChange} />
            </Form.Item>
            <Form.Item>
            <Button type="primary" htmlType="submit">
            Register
            </Button>
            </Form.Item>
        </Form>
    </div>
  )
}

export default Register;