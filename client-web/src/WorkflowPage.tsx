import { useState } from "react";
import "./App.css";
import User from "./User";

const WorkflowPage = () => {
  const [action, setAction] = useState("0");
  const [service, setService] = useState("0");
  const [description, setDescription] = useState("");
  const [reaction, setReaction] = useState("0");
  const [service2, setService2] = useState("0");
  const [description2, setDescription2] = useState("");

  const handleChangeService = (event: any, id: number) => {
    if (id === 1)
      setService(event.target.value);
    else
      setService2(event.target.value);
  };

  const handleChangeAction = (event: any, id: number) => {
    if (id === 1)
      setAction(event.target.value);
    else
      setReaction(event.target.value);
  };

  const handleChangeDescription = (event: any, id: number) => {
    if (id === 1)
      setDescription(event.target.value);
    else
      setDescription2(event.target.value);
  };

  const send = async (service: string, action: string, description: string, reaction: string, service2: string, description2: string) => {
    let endpoint = "http://localhost:8080";
    let route = "/workflow/create";
    const response = await fetch(endpoint + route, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service1: service,
        action: action,
        description: description,
        service2: service2,
        reaction: reaction,
        description2: description2,
      }),
    });
    const data = await response.json();
    console.log(data);
  };

  const handleSubmit = (event: any) => {
    if (service === "0" || action === "0" || reaction === "0" || service2 === "0" || description === "" || description2 === "") {
      alert("Veuillez remplir tous les champs");
      event.preventDefault();
    } else {
      send(service, action, description, reaction, service2, description2);
      event.preventDefault();
    }
  };

  return (
    <div className="background">
      <User />
      <div className="base">
        <h1 className="title">Création de workflow</h1>
        <h2 className="subTitle">Les actions</h2>
        <form onSubmit={(e) => handleSubmit(e)}
        style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", width: "100%", height: "100%" }}>
          <div className="action">
            <select
              value={service}
              onChange={(event) => handleChangeService(event, 1)}
              className="SelectOption"
            >
              <option value="0">Choisissez un service</option>
              <option value="1">Service1</option>
              <option value="2">Service2</option>
            </select>
            <select
              value={action}
              onChange={(event) => handleChangeAction(event, 1)}
              className="SelectOption"
            >
              <option value="0">Choisissez une action</option>
              <option value="1">Action1</option>
              <option value="2">Action2</option>
            </select>
            <input type="text" className="ActionInput" placeholder="Entrez une description" onChange={(event) => handleChangeDescription(event, 1)} />
          </div>
          <h2 className="subTitle">Les réactions</h2>
          <div className="action">
            <select
              value={service2}
              onChange={(event) => handleChangeService(event, 2)}
              className="SelectOption"
            >
              <option value="0">Choisissez un service</option>
              <option value="1">Service1</option>
              <option value="2">Service2</option>
            </select>
            <select
              value={reaction}
              onChange={(event) => handleChangeAction(event, 2)}
              className="SelectOption"
            >
              <option value="0">Choisissez une action</option>
              <option value="1">Action1</option>
              <option value="2">Action2</option>
            </select>
            <input type="text" className="ActionInput" placeholder="Entrez une description" onChange={(event) => handleChangeDescription(event, 2)} />
          </div>
          <input type="submit" value="Sauvegarder" className="SubmitButton" />
        </form>
      </div>
    </div>
  );
};

export default WorkflowPage;