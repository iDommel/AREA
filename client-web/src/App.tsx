import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./index.css";
import Login from "./Login";
import Home from "./Home";
import WorkflowPage from "./WorkflowPage";
import WorkflowInfo from "./WorkflowInfo";
import NotFound from "./NotFound";
import { CookiesProvider } from "react-cookie";
import { AuthContextProvider } from "./Context/AuthContext";

const App = () => {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <React.StrictMode>
        <BrowserRouter>
          <CookiesProvider>
            <AuthContextProvider>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Login" element={<Login />} />
                <Route
                  path="/Register"
                  element={<Login isLoginMode={false} />}
                />
                <Route path="/Home/" element={<Home />} />
                <Route path="/Workflow" element={<WorkflowPage />} />
                <Route path="/WorkflowInfo/:id" element={<WorkflowInfo />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthContextProvider>
          </CookiesProvider>
        </BrowserRouter>
      </React.StrictMode>
    </div>
  );
};

export default App;
