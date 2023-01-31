import React from 'react';
import './App.css';

import Service from './Component/Service';
import Workflow from './Component/Workflow';
import User from './User';

function App() {

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
              isConnected="True"
              isActivated="Désactivé"
            />
            <Service
              id="2"
              name="Twitter"
              isConnected="True"
              isActivated="Désactivé"
            />
          </div>
        </div>
      </div>
  );
}

export default App;
