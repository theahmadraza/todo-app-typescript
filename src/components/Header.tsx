import React from "react";
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <h3 className="logo">
        <Link to="/dashboard">Todo App</Link>
      </h3>
      <div className="right-nav">
        <Button onClick={() => navigate("/login")}>Login</Button>
        <Button onClick={() => navigate("/register")}>Register</Button>
      </div>
    </div>
  );
};

export default Header;
