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
    email: '',
    password: '',
  });
  const navigate = useNavigate()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserLogin((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const loggedInUser = await login(userLogin);
      if(loggedInUser){
        navigate("/dashboard")
      }
      // console.log("Login Page",loggedInUser)
    } catch (err) {
      console.log("Error:", err);
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
