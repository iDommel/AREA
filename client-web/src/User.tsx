import "./App.css";
import React from "react";
import { LogoutOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown, Space, message } from "antd";
import { useNavigate } from "react-router-dom";

const items: MenuProps["items"] = [
  {
    label: "Se déconnecter",
    key: "1",
    icon: <LogoutOutlined />,
  },
];

const User: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8080/auth/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status / 100 !== 2) {
        message.error("Error while logging out");
      } else {
        navigate("/Login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "1") {
      handleLogout();
    }
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <div className="user">
      <Dropdown menu={menuProps} trigger={["click"]} className="buttonUser">
        <Button>
          <Space>User</Space>
        </Button>
      </Dropdown>
    </div>
  );
};

export default User;
