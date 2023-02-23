import { NextFunction, request, Request, Response } from 'express';
import mongoose from 'mongoose';
import Workflow from '../models/workflow';
import Service from '../models/service';
import aqp from 'api-query-params';
import JWT, { decode } from 'jsonwebtoken';

const createWorkflow = async (req: Request, res: Response, next: NextFunction) => {
    let { name, description, actions, reactions } = req.body;

    try {
        const token = req.headers.authorization?.split(';')[0] as string;
        let id = "";
        JWT.verify(token, 'secret', function(err : any, decoded : any) {
            if (err) {
                console.log(err);
            }
            id = decoded.sub;
        });
        const workflow = new Workflow({
            _id: new mongoose.Types.ObjectId(),
            name,
            description,
            actions,
            reactions,
            relativeUser : "nothing"
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

const getRelatedServices = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const workflow = await Workflow.findById(req.params.id);
        const services = await Service.find({ _id: { $in: workflow?.actions } })
        return res.status(200).json({
            services: services
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            error
        });
    }
};

const getWorkflowbyUser = async (req: Request, res: Response, next: NextFunction) => {
    
        const token = req.params.id.split(";")[0];
        let id = "";
        JWT.verify(token, 'secret', function(err : any, decoded : any) {
            if (err) {
                console.log(err);
            }
            id = decoded.sub;
        });

    try {
        const workflows = await Workflow.where('relativeUser', id);

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

export default {
    createWorkflow,
    getAllWorkflow,
    getWorkflow,
    updateWorkflow,
    deleteWorkflow,
    getRelatedServices,
    getWorkflowbyUser
};
