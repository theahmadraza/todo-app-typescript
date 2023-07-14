import React, { useState, ChangeEvent } from "react";
import { Button, Form, Input } from "antd";
import { login } from "../../services/AuthServices";
import { useNavigate } from "react-router-dom";

interface Users {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [userLogin, setUserLogin] = useState<Users>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserLogin((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
      const response = await login(userLogin);
      if (response.status === 200) {
        navigate("/dashboard");
      }else if(response.response.status === 400){
        alert('Invalid credentials')
      }
  };
  return (
    <div className="main-form">
      <h3 className="form-title">Login Here!</h3>
      <Form
        name="basic"
        layout="vertical"
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        onFinish={handleSubmit}
      >
        <Form.Item
          className="form-field"
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter your Email!" }]}
        >
          <Input
            name="email"
            value={userLogin.email}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item
          className="form-field"
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input.Password
            name="password"
            value={userLogin.password}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
