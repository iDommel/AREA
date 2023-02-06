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

const getAllWorkflow = (req: Request, res: Response, next: NextFunction) => {
    Workflow.find()
        .exec()
        .then((Workflow) => {
            return res.status(200).json({
                Workflow: Workflow,
                count: Workflow.length
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

export default { createWorkflow, getAllWorkflow };
