import React from "react";
import { useState } from "react";
import "./App.css";
import User from "./User";

type select = {
    type: string;
    options: string[];
};

const Select = ({ type, options }: select) => {
  const [value, setValue] = useState("0");
  const base = "Choisissez une " + type;

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  return (
    <div className="select">
      <select
        value={value}
        onChange={(event) => handleChange(event)}
        className="SelectOption"
      >
        <option value="0">{base}</option>
        <option value="1">{options[0]}</option>
        <option value="2">{options[1]}</option>
      </select>
    </div>
  );
};

type type = {
    type: string;
}; 

const Area = ({ type }: type) => {
  const [service] = useState("0");
  const [action] = useState("0");

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
      alert("Le service sélectionné est : " + service + " et la réaction sélectionnée est : " + action);
    else
      alert("Le service sélectionné est : " + service + " et l'action sélectionnée est : " + action);
    event.preventDefault();
  };

  return (
    <div className="action">
      <form
        onSubmit={(e) => handleSubmit(e)}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label>
          <Select
            type="service"
            options={["Service 1", "Service 2"]}
          />
          <Select type={type} options={["Action 1", "Action 2"]} />
          <input
            type="text"
            className="ActionInput"
            placeholder="Entrez une description"
          />
        </label>
      </form>
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