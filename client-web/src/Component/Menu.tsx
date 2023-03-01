import React, { useState, useEffect } from "react";
import {
  AppstoreOutlined,
  HomeOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";

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

const rootSubmenuKeys = ["/Workflow", "/Service"];

const MenuPage: React.FC = () => {
  const [openKeys, setOpenKeys] = useState(["/WorkflowInfo"]);
  const [workflows, setWorkflows] = useState<MenuItem[]>([]);
  const [services, setServices] = useState<MenuItem[]>([]);
  const { user, fetchAPI } = useAuthContext();
  const navigate = useNavigate();

  const [items, setItems] = useState<MenuItem[]>([
    getItem("Home", "/Home", <HomeOutlined />),
    getItem("Workflows", "/WorkflowInfo", <AppstoreOutlined />),
    getItem("Services", "/Service", <SettingOutlined />),
  ]);

  const getWorkflows = async () => {
    try {
      const response = await fetchAPI(`/workflows?relativeUser=${user}`, "GET");
      const data = response.data;
      if (response.status !== 200 || !data.workflows) {
        message.error(data.message);
      } else {
        const workflows = data.workflows;
        const workflowItems: MenuItem[] = workflows.map((workflow: any) =>
          getItem(workflow.name, workflow._id)
        );
        setWorkflows(workflowItems);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getServices = async () => {
    try {
      const response = await fetchAPI(`/services`, "GET");
      const data = response.data;
      if (response.status !== 200 || !data.services) {
        message.error(data.message);
      } else {
        const services = data.services;
        const serviceItems: MenuItem[] = services.map((service: any) =>
          getItem(service.name, service._id)
        );
        setServices(serviceItems);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getWorkflows();
    getServices();
  }, []);

  useEffect(() => {
    setItems([
      getItem("Home", "/Home", <HomeOutlined />),
      getItem("Workflows", "/WorkflowInfo", <AppstoreOutlined />, workflows),
      getItem("Services", "/Service", <SettingOutlined />, services),
    ]);
  }, [workflows, services]);

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
    if (serviceList.includes(e.key)) {
      message.info("Service n°" + e.key + " is not implemented yet");
    } else if (e.keyPath && e.keyPath.length > 1) {
      navigate(e.keyPath[1] + "/" + e.key);
    } else {
      navigate(e.key);
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