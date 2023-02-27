import { useState, useEffect } from "react";
import "./App.css";

import Service from "./Component/Service";
import Workflow from "./Component/Workflow";
import User from "./User";
import Menu from "./Component/Menu";

import { message } from "antd";

type ServiceType = {
  _id: string;
  name: string;
  route: string;
  globallyEnabled: boolean;
  isConnected: string;
};

type WorkflowType = {
  _id: string;
  name: string;
  isActivated: string;
  preview: string;
  serviceAction: string;
  serviceReaction: string;
};

const App = () => {
  const [services, setServices] = useState<ServiceType[] | never[]>([]);
  const [workflows, setWorkflows] = useState<WorkflowType[] | never[]>([]);

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
        setServices(data.services);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderServices = (toRender: ServiceType[] | never[]) => {
    return toRender.map((service) => (
      <Service
        id={service._id}
        key={service._id}
        name={service.name}
        route={service.route}
        isConnected="True"
        globallyEnabled={service.globallyEnabled}
      />
    ));
  };

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
        service1={workflow.serviceAction}
        service2={workflow.serviceReaction}
      />
    ));
  };

  useEffect(() => {
    getServices();
    getWorkflows();
  }, []);

  return (
    <div className="background">
      <User />
      <div className="base">
        <Menu />
        <div className="content">
          <h1 className="title">Workflow</h1>
          <div className="squareWorkflow">
            <Workflow id="1" name="" isActivated="False" preview="Add a new workflow" service1="" service2="" />
            {renderWorkflows(workflows)}
          </div>

          <h1 className="title">Services</h1>
          <div className="squareService">{renderServices(services)}</div>
        </div>
      </div>
    </div>
  );
};

export default App;
