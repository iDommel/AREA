import { useState } from "react";
import "./App.css";
import User from "./User";

type select = {
    type: string;
    optionsService: string[];
    optionsAction: string[];
};

const Select = ({ type, optionsService, optionsAction }: select) => {
  const [action, setAction] = useState("0");
  const [service, setService] = useState("0");

  const handleChangeService = (event: any) => {
    setService(event.target.value);
  };

  const handleChangeAction = (event: any) => {
    setAction(event.target.value);
  };

  const handleSubmit = (event: any) => {
    if (service === "0" || action === "0") {
      if (type === "action")
        alert("Veuillez sélectionner un service et une action");
      else 
        alert("Veuillez sélectionner un service et une réaction");
      event.preventDefault();
      return;
    }
    if (type === "action")
      alert("Le service sélectionné est : " + service + " et l'action sélectionnée est : " + action);
    else
      alert("Le service sélectionné est : " + service + " et la réaction sélectionnée est : " + action);
    event.preventDefault();
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", width: "100%", height: "100%" }}
    >
      <select
        value={service}
        onChange={(event) => handleChangeService(event)}
        className="SelectOption"
      >
        <option value="0">Choisissez un service</option>
        <option value="1">{optionsService[0]}</option>
        <option value="2">{optionsService[1]}</option>
      </select>
      <select
        value={action}
        onChange={(event) => handleChangeAction(event)}
        className="SelectOption"
      >
        <option value="0">Choisissez une action</option>
        <option value="1">{optionsAction[0]}</option>
        <option value="2">{optionsAction[1]}</option>
      </select>
      <input type="text" className="ActionInput" placeholder="Entrez une description"/>
    </form>
  );
};

type type = {
    type: string;
}; 

const Area = ({ type }: type) => {
  
  return (
    <div className="action">
      <Select
        type={type}
        optionsService={["Service 1", "Service 2"]}
        optionsAction={["Action 1", "Action 2"]}
      />
    </div>
  );
};

const WorkflowPage = () => (
  <div className="background">
    <User />
    <div className="base">
      <h1 className="title">Création de workflow</h1>
      <h2 className="subTitle">Les actions</h2>
      <Area type="action" />
      <h2 className="subTitle">Les réactions</h2>
      <Area type="reaction" />
    </div>
  </div>
);

export default WorkflowPage;