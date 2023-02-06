import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Workflow from '../models/workflow';

const createWorkflow = async (req: Request, res: Response, next: NextFunction) => {
    let { service1, action, description, service2, reaction, description2 } = req.body;

    const workflow = new Workflow({
        _id: new mongoose.Types.ObjectId(),
        service1,
        action,
        description,
        service2,
        reaction,
        description2
    });

    return workflow
        .save()
        .then((result) => {
            return res.status(201).json({
                workflow: result
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getAllWorkflow = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const workflows = await Workflow.find();

        return res.status(200).json({
            workflows,
            count: workflows.length
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            error
        });
    }
};

export default { createWorkflow, getAllWorkflow };
