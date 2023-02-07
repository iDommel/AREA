import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Action from '../models/action';
import aqp from 'api-query-params';

const createAction = async (req: Request, res: Response, next: NextFunction) => {
    let { name, description, enabled } = req.body;

    try {
        const action = new Action({
            _id: new mongoose.Types.ObjectId(),
            name,
            description,
            enabled
        });

        const result = await action.save();

        return res.status(201).json({
            action: result
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            error
        });
    }
};

const getActions = async (req: Request, res: Response, next: NextFunction) => {
    const { filter, skip, limit, sort, projection, population } = aqp(req.query);

    try {
        const actions = await Action.find(filter).skip(skip).limit(limit).sort(sort).select(projection).populate(population);

        return res.status(200).json({
            actions: actions,
            count: actions.length
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            error
        });
    }
};

const getAction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const action = await Action.findById(req.params.id);
        return res.status(200).json({
            action: action
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            error
        });
    }
};

const updateAction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const update = await Action.updateOne({ _id: req.params.id }, req.body);
        return res.status(200).json({
            message: 'Action updated successfully',
            update
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            error
        });
    }
};

const deleteAction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deleteResult = await Action.deleteOne({ _id: req.params.id });
        return res.status(200).json({
            message: 'Action deleted successfully',
            deleteResult
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            error
        });
    }
};

export default {
    createAction,
    getActions,
    getAction,
    updateAction,
    deleteAction
};
