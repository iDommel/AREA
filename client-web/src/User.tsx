import "./App.css";
import React from "react";
import { LogoutOutlined, DownloadOutlined } from "@ant-design/icons";
import { MenuProps, message } from "antd";
import { Button, Dropdown, Space } from "antd";
import { useAuthContext } from "./Context/AuthContext";

const items: MenuProps["items"] = [
  {
    label: "Se déconnecter",
    key: "1",
    icon: <LogoutOutlined />,
  },
  {
    label: "Télécharger l'APK",
    key: "2",
    icon: <DownloadOutlined />,
  }
];

const User: React.FC = () => {
  const { logout, fetchAPI } = useAuthContext();
  const handleLogout = async () => {
    logout();
  };

  const getApk = async () => {
    try {
      const res = await fetchAPI(`/client.apk/`, "GET");

      if (res.status === 200) {
        console.log(res);
      }
    } catch (error) {
      message.error("Une erreur est survenue lors du téléchargement");
    }
  };

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "1") {
      handleLogout();
    } else if (e.key === "2") {
      getApk();
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
