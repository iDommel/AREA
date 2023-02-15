import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { message } from "antd";

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

const Form = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: any) => {
    if (user === "" || password === "") {
      message.error("Please fill all the fields");
      event.preventDefault();
      return;
    }
    message.success("Logged in successfully");
    event.preventDefault();
    navigate("/Home");
  };

  return (
    <div className="login">
      <form onSubmit={(e) => handleSubmit(e)}>
        <h3>Username</h3>
        <input
          className="input"
          value={user}
          type="text"
          onChange={(e) => setUser(e.target.value)}
        />
        <h3>Password</h3>
        <input
          className="input"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input className="sendLogin" type="submit" value="Log in" />
        <p onClick={() => message.error("Not implemented yet!")}> Forgot password?</p>
        <p onClick={() => message.error("Not implemented yet!")}> Don't have an account? Sign up</p>
      </form>
      <OAuth />
    </div>
  );
};

const Login = () => (
  <div className="background">
    <div className="baseLogin">
      <div className="text">
        <h1>Welcome the AREA Web APP</h1>
        <h2>Please log in to continue</h2>
      </div>
      <Form />
    </div>
  </div>
);

export default Login;