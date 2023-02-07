import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Workflow from '../models/workflow';
import aqp from 'api-query-params';

const createWorkflow = async (req: Request, res: Response, next: NextFunction) => {
    let { name, description, actions, reactions } = req.body;

    try {
        const workflow = new Workflow({
            _id: new mongoose.Types.ObjectId(),
            name,
            description,
            actions,
            reactions
        });

        const result = await workflow.save();

        return res.status(201).json({
            workflow: result
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            error
        });
    }
};

const getAllWorkflow = async (req: Request, res: Response, next: NextFunction) => {
    const { filter, skip, limit, sort, projection, population } = aqp(req.query);

    try {
        const workflows = await Workflow.find(filter).skip(skip).limit(limit).sort(sort).select(projection).populate(population);

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

const getWorkflow = async (req: Request, res: Response, next: NextFunction) => {
    const { projection, population } = aqp(req.query);
    try {
        const workflow = await Workflow.findById(req.params.id).populate(population).select(projection);
        return res.status(200).json({
            workflow: workflow
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            error
        });
    }
};

const updateWorkflow = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const workflow = await Workflow.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        return res.status(200).json({
            workflow: workflow
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            error
        });
    }
};

const deleteWorkflow = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const workflow = await Workflow.findOneAndDelete({ _id: req.params.id });
        return res.status(200).json({
            workflow: workflow
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            error
        });
    }
};

export default {
    createWorkflow,
    getAllWorkflow,
    getWorkflow,
    updateWorkflow,
    deleteWorkflow
};
