import React from 'react';
import User from './User';
import './App.css';
import { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom"

type WorkflowType = {
    _id: string;
    name: string;
    isActivated: string;
  };

const WorkflowInfo = () => {

    const queryParams = new URLSearchParams(window.location.search);
    const id = window.location.href.split("=").pop();

    const [workflows, setWorkflows] = useState<WorkflowType[] | never[]>([]);

    const getWorkflow = async () => {
        try {
            const response = await fetch("http://localhost:8080/workflows/" + "1", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            if (response.status !== 200 || !data.workflows) {
                alert(data.message);
            } else {
                setWorkflows(data.workflows);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getWorkflow();
    }, []);

    return (
        <div className="background">
            <User />
            <div className="base">
                <h1>{id}</h1>
            </div>
        </div>

    );
};

export default WorkflowInfo;