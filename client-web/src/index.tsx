import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import { Routes, Route, BrowserRouter } from "react-router-dom";

import Login from "./Login";
import Home from "./App";
import WorkflowPage from "./WorkflowPage";
import WorkflowInfo from "./WorkflowInfo";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <div style={{ width: "100%", height: "100vh" }}>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Login isLoginMode={false} />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Workflow" element={<WorkflowPage />} />
          <Route path="/WorkflowInfo/:id" element={<WorkflowInfo />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
