import React, { createContext, useContext, useEffect, useReducer } from "react";
import axios, { ResponseType, CancelToken } from "axios";
import { message } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import jwt_decode, { JwtPayload } from "jwt-decode";

type InvalidAuthContextType = {
  isAuthenticated: boolean;
  user: string | null;
  token: any;
};

type ValidAuthContextType = {
  isAuthenticated: boolean;
  user: string | null;
  token: any;
  login: (username: String, password: String) => void;
  logout: () => void;
  fetchAPI: (
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    body?: object | undefined,
    responseType?: ResponseType | undefined,
    cancelToken?: CancelToken | undefined
  ) => Promise<any>;
};

type AuthContextType = InvalidAuthContextType | ValidAuthContextType;

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  token: null,
});

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
});

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, {
    isAuthenticated: false,
    user: null,
    token: null,
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("user", localStorage.getItem("user"));
    console.log("token", localStorage.getItem("token"));
    const localUser = localStorage.getItem("user");
    const localToken = localStorage.getItem("token");
    const user = JSON.parse((localUser !== "undefined" && localUser) || "{}");
    const token = JSON.parse(
      (localToken !== "undefined" && localToken) || "{}"
    );

    if (user && token) {
      dispatch({
        type: "LOGIN",
        payload: {
          user,
          token,
        },
      });
    }
  }, []);

  const login = async (username: String, password: String) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        username,
        password,
      });
      const { user, token } = response.data;
      dispatch({
        type: "LOGIN",
        payload: {
          user,
          token,
        },
      });
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message)
        message.error(error.response.data.message);
      else message.error(error.message);
    }
  };

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  const fetchAPI = async (
    url: string,
    method: string = "GET",
    body: object | undefined = undefined,
    responseType?: ResponseType | undefined,
    cancelToken?: CancelToken | undefined
  ) => {
    if (!isTokenExpired(state.token)) {
      console.log("token expired");
      // await refreshToken();
    }

    const result = await axiosInstance({
      url,
      method,
      responseType,
      cancelToken,
      data: body,
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
    });
    return result;
  };

  const isTokenExpired = (token: any) => {
    const decoded = jwt_decode(token) as JwtPayload;
    const currentTime = Date.now() / 1000;
    if (decoded !== undefined && decoded.exp && decoded.exp < currentTime) {
      return true;
    }
    return false;
  };

  const refreshToken = async () => {
    try {
      const response = await axiosInstance.post("/auth/refresh", {
        token: state.token,
      });
      const { user, token } = response.data;
      dispatch({
        type: "LOGIN",
        payload: {
          user,
          token,
        },
      });
    } catch (error: any) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (
      !state.user &&
      location.pathname !== "/Login" &&
      location.pathname !== "/Register"
    ) {
      navigate("/Login");
    } else if (state.user && location.pathname === "/Login") {
      navigate("/Home");
    }
  }, [state, location.pathname, navigate]);
  console.log("state", state);
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token,
        login,
        logout,
        fetchAPI,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("Context must be used within a context provider");
  return context as ValidAuthContextType;
};
