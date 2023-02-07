import { useState, useEffect } from "react";
import "./App.css";

import Service from "./Component/Service";
import Workflow from "./Component/Workflow";
import User from "./User";

type ServiceType = {
  _id: string;
  name: string;
  route: string;
  isConnected: string;
};

const App = () => {
  const [services, setServices] = useState<ServiceType[] | never[]>([]);

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
        alert(data.message);
      } else {
        setServices(data.services);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  const renderServices = (toRender: ServiceType[] | never[]) => {
    return toRender.map((service) => (
      <Service
        id={service._id}
        key={service._id}
        name={service.name}
        route={service.route}
        isConnected="True"
        isActivated={false}
      />
    ));
  };

  return (
    <div className="background">
      <User />
      <div className="base">
        <h1 className="title">Workflow</h1>
        <div className="squareWorkflow">
          <Workflow id="1" name="+" isActivated="False" />
          <Workflow id="2" name="Workflow" isActivated="True" />
        </div>

        <h1 className="title">Services</h1>
        <div className="squareService">{renderServices(services)}</div>
      </div>
    </div>
  );
};

export default App;
