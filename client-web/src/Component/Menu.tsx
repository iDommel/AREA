import React, { useState } from "react";
import {
  AppstoreOutlined,
  HomeOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu, message } from "antd";
import { useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const serviceList = ["63e1a99689b9860fb46d3698", "63e1ab6fe3a0d2130314394b"];

const rootSubmenuKeys = ["sub1", "sub2"];

const MenuPage: React.FC = () => {
  const [openKeys, setOpenKeys] = useState(["sub1"]);
  const navigate = useNavigate();
  const [items, setItems] = useState<MenuItem[]>([
    getItem("Home", "1", <HomeOutlined />),
    getItem("Workflows", "2", <AppstoreOutlined />),
  ]);

  const getWorkflows = async () => {
    try {
      const response = await fetch("http://localhost:8080/workflows/user/" + document.cookie.split("=")[1] , {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Autorization": "Bearer " + document.cookie.split("=")[1]
        },
      });
      const data = await response.json();
      if (response.status !== 200 || !data.workflows) {
        message.error(data.message);
      } else {
        const workflows = data.workflows;
        const workflowItems: MenuItem[] = [];
        workflows.map((workflow: any) => {
          workflowItems.push(getItem(workflow.name, workflow._id));
        });
        items[1] = getItem(
          "Workflows",
          "2",
          <AppstoreOutlined />,
          workflowItems
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getServices = async () => {
    try {
      const response = await fetch("http://localhost:8080/services", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.status !== 200 || !data.services) {
        message.error(data.message);
      } else {
        const services = data.services;
        const serviceItems: MenuItem[] = [];
        services.map((service: any) => {
          serviceItems.push(getItem(service.name, service._id));
        });
        setItems([
          ...items,
          getItem("Services", "3", <SettingOutlined />, serviceItems),
        ]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getWorkflows();
    getServices();
  }, []);

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const handleSelect = (e: any) => {
    console.log(e);
    if (e.key === "1") {
      navigate("/home");
    } else if (e.key === "2-1") {
      navigate("/Workflow");
    } else if (serviceList.includes(e.key)) {
      message.info("Service n°" + e.key + " is not implemented yet");
    } else {
      navigate("/WorkflowInfo/" + e.key);
    }
  };

  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      onSelect={(info) => handleSelect(info)}
      onOpenChange={onOpenChange}
      style={{ width: 256 }}
      items={items}
      className="Menu"
    />
  );
};

export default MenuPage;
