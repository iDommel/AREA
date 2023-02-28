import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./index.css";
import Login from "./Login";
import Home from "./Home";
import WorkflowPage from "./WorkflowPage";
import WorkflowInfo from "./WorkflowInfo";

const App = () => {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <React.StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Login isLoginMode={false} />} />
            <Route path="/Home/" element={<Home />} />
            <Route path="/Workflow" element={<WorkflowPage />} />
            <Route path="/WorkflowInfo/:id" element={<WorkflowInfo />} />
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    </div>
  );
};

export default App;
