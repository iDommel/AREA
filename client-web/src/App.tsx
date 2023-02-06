import React, { useState, useEffect } from "react";
import "./App.css";

import Service from "./Component/Service";
import Workflow from "./Component/Workflow";
import User from "./User";
type WorkflowType = {
  service1: { type: String; required: true };
  action: { type: String; required: true };
  description: { type: String; required: true };
  service2: { type: String; required: true };
  reaction: { type: String; required: true };
  description2: { type: String; required: true };
};
function App() {
  const [workflow, setWorkflow] = useState<WorkflowType | undefined>(undefined);

  const getLastWorkflow = async () => {
    try {
      const response = await fetch("http://localhost:8080/workflows");
      const data = await response.json();
      console.log(data);
      setWorkflow(data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLastWorkflow();
  }, []);

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
        <div className="squareService">
          <Service
            id="1"
            name="Spotify"
            route="/spotify/login"
            isConnected="True"
            isActivated={false}
          />
          <Service
            id="2"
            name="Twitter"
            route="/twitter"
            isConnected="True"
            isActivated={false}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
