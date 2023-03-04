import { NextFunction, request, Request, Response } from 'express';
import mongoose from 'mongoose';
import Workflow from '../models/workflow';
import Service from '../models/service';
import aqp from 'api-query-params';
import JWT, { decode } from 'jsonwebtoken';

const createWorkflow = async (req: Request, res: Response, next: NextFunction) => {
    let { name, description, actions, reactions, serviceAction, serviceReaction, additionalData } = req.body;

    try {
        // retrieve the token that matcher the "Bearer token" regex
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).send('Authorization header missing');
        }

        const tokenRegex = /^Bearer\s+([^\s]+)$/;

        const match = authHeader.match(tokenRegex);

        if (!match) {
            return res.status(401).send('Invalid Authorization header format');
        }

        const token = match[1];

        console.log('token', token);
        const decoded = JWT.decode(token);
        console.log('decoded', decoded);
        if (!decoded || !decoded.sub || typeof decoded.sub !== 'string') {
            return res.status(401).json({
                message: 'Invalid token'
            });
        }
        const relativeUser = decoded.sub;
        const workflow = new Workflow({
            _id: new mongoose.Types.ObjectId(),
            name,
            description,
            actions,
            reactions,
            relativeUser,
            serviceAction,
            serviceReaction,
            additionalData
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
        const services = await Service.find({ actions: { $in: workflow?.actions } });
        const reactions = await Service.find({ reactions: { $in: workflow?.reactions } });
        return res.status(200).json({
            services: services,
            reactions: reactions
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            error
        });
    }
};

const getWorkflowbyUser = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send('Authorization header missing');
    }

    const tokenRegex = /^Bearer\s+([^\s]+)$/;

    const match = authHeader.match(tokenRegex);

    if (!match) {
        return res.status(401).send('Invalid Authorization header format');
    }

    const token = match[1];
    const decodedToken = JWT.decode(token);
    const id = decodedToken?.sub;
    if (!id || typeof id !== 'string')
        return res.status(500).json({
            message: 'Invalid token',
            error: 'Invalid token'
        });
    try {
        const workflows = await Workflow.find({ relativeUser: id });

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
