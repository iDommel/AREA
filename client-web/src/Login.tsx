import React from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { message, Form, Typography, Input, Button } from "antd";
import { useAuthContext } from "./Context/AuthContext";

const { Title } = Typography;

const OAuth = () => {
  const navigate = useNavigate();

  const HandleClick = (event: any) => {
    navigate("/Home");
  };

  return (
    <div className="oauth">
      <h3>Connect With</h3>
      <div className="oauth-buttons">
        <button className="oauth-button" onClick={(e) => HandleClick(e)}>
          <img
            src="https://img.icons8.com/color/48/000000/google-logo.png"
            alt="Google"
          />
        </button>
        <button className="oauth-button" onClick={(e) => HandleClick(e)}>
          <img
            src="https://img.icons8.com/color/48/000000/facebook-new.png"
            alt="Facebook"
          />
        </button>
        <button className="oauth-button" onClick={(e) => HandleClick(e)}>
          <img
            src="https://img.icons8.com/color/48/000000/microsoft.png"
            alt="Twitter"
          />
        </button>
      </div>
    </div>
  );
};

const RegisterForm = () => {
  const { fetchAPI } = useAuthContext();
  const navigate = useNavigate();
  const handleRegister = async (values: any) => {
    console.log("values", values);
    try {
      const response = await fetchAPI("/auth/register", 
         "POST",
        {
          username: values.username,
          password: values.password,
        },
      );
      console.log("response", response);
      const data = await response.json();
      if (response.status > 299 && response.status < 200) {
        message.error(data.message);
      } else {
        message.success("Account created successfully");
        navigate("/Login");
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  return (
    <div className="login">
      <Form
        wrapperCol={{ span: 20 }}
        layout="vertical"
        onFinish={handleRegister}
        style={{ marginLeft: 20 }}
      >
        <Title level={3}>Register</Title>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
        Or <a href="/Login">login now!</a>
      </Form>
      <OAuth />
    </div>
  );
};

const LoginForm = ({ setIsLogin }: any) => {
  const { login } = useAuthContext();

  const handleLogin = (values: any) => {
    login(values.username, values.password);
  };

  return (
    <div className="login">
      <Form wrapperCol={{ span: 20 }} layout="vertical" onFinish={handleLogin}>
        <Title level={3}>Login</Title>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Log In
          </Button>
        </Form.Item>
        Or <a href="/Register">register now!</a>
      </Form>
      <OAuth />
    </div>
  );
};

const Login = ({ isLoginMode = true }: any) => {
  return (
    <div className="background">
      <div className="baseLogin">
        <div className="text">
          <h1>Welcome the AREA Web APP</h1>
          <h2>Please log in to continue</h2>
        </div>
        {isLoginMode ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
};

export default Login;
