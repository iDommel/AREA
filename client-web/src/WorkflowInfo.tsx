import React from "react";
import User from "./User";
import Menu from "./Component/Menu";
import "./App.css";
import { useState, useEffect } from "react";
import { Typography, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const { Title } = Typography;

const WorkflowInfo = () => {
  const { id } = useParams();

  const [workflow, setWorkflow] = useState({
    _id: "",
    name: "",
    actions: "",
    reactions: "",
    description: "",
    isActivated: "",
  });

  const [action, setAction] = useState({
    _id: "",
    name: "",
    description: "",
  });

  const [reaction, setReaction] = useState({
    _id: "",
    name: "",
    description: "",
  });

  const getReaction = async (id: string) => {
    try {
      const response = await fetch("http://localhost:8080/reactions/" + id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.status !== 200) {
        message.error(data.message);
      } else {
        setReaction(data.reaction);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getAction = async (id: string) => {
    try {
      console.log(id);
      const response = await fetch("http://localhost:8080/actions/" + id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.status !== 200) {
        message.error(data.message);
      } else {
        setAction(data.action);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getWorkflow = async (id: string | undefined) => {
    try {
      const response = await fetch("http://localhost:8080/workflows/" + id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.status !== 200) {
        message.error(data.message);
      } else {
        setWorkflow(data.workflow);
        getAction(data.workflow.actions[0]);
        getReaction(data.workflow.reactions[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteWorkflow = async (id: string) => {
    try {
      const response = await fetch("http://localhost:8080/workflows/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.status !== 200) {
        message.error(data.message);
      } else {
        window.location.href = "/Home";
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("reloaded");
    getWorkflow(id);
  }, [id]);

  return (
    <div className="background">
      <User />
      <div className="base">
        <Menu />
        <div className="Info">
          <img
            className="delete"
            src="https://img.icons8.com/windows/64/delete-trash.png"
            onClick={() => deleteWorkflow(workflow._id)}
          />
          <div className="WorkflowInfo">
            <Title level={1}> Nom: {workflow.name} </Title>
            <h1>Description: {workflow.description}</h1>
          </div>
          <div className="ActionInfo">
            <h1>Action: {action.name}</h1>
            <h2>Description: {action.description}</h2>
          </div>
          <div className="ReactionInfo">
            <h1>Reaction: {reaction.name}</h1>
            <h2>Description: {reaction.description}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowInfo;
