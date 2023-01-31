import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

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
      alert("Please fill all the fields");
      event.preventDefault();
      return;
    }
    alert("User loged in: " + user + " with password: " + password);
    event.preventDefault();
    navigate("/Home");
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="login-form">
          <label>
            <input
              className="input"
              value={user}
              type="text"
              placeholder="Identifiant"
              onChange={(e) => setUser(e.target.value)}
            />
            <input
              className="input"
              value={password}
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input className="sendLogin" type="submit" value="Log in" />
          </label>
        </div>
      </form>
      <OAuth />
    </div>
  );
};

const Login = () => (
  <div className="background">
    <div className="baseLogin">
      <Form />
    </div>
  </div>
);

export default Login;