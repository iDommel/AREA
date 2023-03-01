import { useState, useEffect } from "react";
import "./Home.css";

import Service from "./Component/Service";
import Workflow from "./Component/Workflow";
import User from "./User";
import Menu from "./Component/Menu";

import { useAuthContext } from "./Context/AuthContext";
import { message } from "antd";

type ServiceType = {
  _id: string;
  name: string;
  route: string;
  isConnected: string;
};

type ServiceStatusType = {
  _id: string;
  service: ServiceType;
  serviceName: string;
  user: string;
  isConnected: boolean;
  token: string;
  isEnabled: boolean;
};

type WorkflowType = {
  _id: string;
  name: string;
  isActivated: string;
  service1: string;
  service2: string;
  preview: string;
};

const Home = () => {
  const { user } = useAuthContext();
  const [services, setServices] = useState<ServiceType[] | never[]>([]);
  const [workflows, setWorkflows] = useState<WorkflowType[] | never[]>([]);
  const [serviceStatuses, setServiceStatuses] = useState<
    ServiceStatusType[] | never[]
  >([]);

  const { fetchAPI } = useAuthContext();
  const getServices = async () => {
    try {
      const response = await fetchAPI(`/services`, "GET");
      const data = response.data;
      if (response.status !== 200 || !data.services) {
        message.error(data.message);
      } else {
        setServices(data.services);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getServiceStatuses = async () => {
    try {
      const response = await fetchAPI(
        `/service-statuses?user=${user}&populate=service`,
        "GET"
      );
      const data = response.data;
      if (!data.serviceStatuses) {
        message.error(data.message);
      } else {
        setServiceStatuses(data.serviceStatuses);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderServices = (serviceStatuses: ServiceStatusType[] | never[]) => {
    return serviceStatuses.map((serviceStatus) => (
      <Service
        id={serviceStatus.service._id}
        key={serviceStatus._id}
        name={serviceStatus.serviceName}
        route={serviceStatus.service.route}
        isConnected={serviceStatus.isConnected}
        isActivated={false}
      />
    ));
  };

  const getWorkflows = async () => {
    try {
      const response = await fetchAPI(
        `/workflows?relativeUser=${user}`,
        "GET"
      );
      const data = response.data;
      if (response.status !== 200 || !data.workflows) {
        message.error(data.message);
      } else {
        setWorkflows(data.workflows);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderWorkflows = (toRender: WorkflowType[] | never[]) => {
    return toRender.map((workflow) => (
      <Workflow
        id={workflow._id}
        key={workflow._id}
        name={workflow.name}
        isActivated={workflow.isActivated}
        preview={workflow.preview}
        service1="time"
        service2="spotify"
      />
    ));
  };

  useEffect(() => {
    getServices();
    getWorkflows();
    getServiceStatuses();
  }, []);

  return (
    <div className="background">
      <User />
      <div className="base">
        <Menu />
        <div className="content">
          <h1 className="title">Workflow</h1>
          <div className="squareWorkflow">
            <Workflow
              id="1"
              name=""
              isActivated="False"
              preview="Add a new workflow"
              service1=""
              service2=""
            />
            {renderWorkflows(workflows)}
          </div>

          <h1 className="title">Services</h1>
          <div className="squareService">{renderServices(serviceStatuses)}</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
