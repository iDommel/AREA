import React from 'react';
import User from './User';
import './App.css';
import { useState, useEffect } from 'react';
import { Typography, Descriptions } from 'antd';

const { Title } = Typography;

const WorkflowInfo = () => {

    const id = window.location.href.split("=").pop();

    const [workflow, setWorkflow] = useState({
        _id: "",
        name: "",
        actions: "",
        reactions : "",
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
                alert(data.message);
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
                alert(data.message);
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
                alert(data.message);
            } else {
                setWorkflow(data.workflow);
                getAction(data.workflow.actions[0]);
                getReaction(data.workflow.reactions[0]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getWorkflow(id);
    }, []);

    return (
        <div className="background">
            <User />
            <div className="base">
                <div>
                    <Title level={1}> {workflow.name} </Title>
                    <h1>Description: {workflow.description}</h1>
                </div>
                <div>
                    <h1>Action: {action.name}</h1>
                    <h2>Description: {action.description}</h2>
                </div>
                <div>
                    <h1>Reaction: {reaction.name}</h1>
                    <h2>Description: {reaction.description}</h2>
                </div>
            </div>
        </div>

    );
};

export default WorkflowInfo;