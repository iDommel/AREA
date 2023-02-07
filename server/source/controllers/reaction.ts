import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Reaction from '../models/reaction';

const createReaction = async (req: Request, res: Response, next: NextFunction) => {
    let { name, description, service, enabled } = req.body;

    try {
        const action = new Reaction({
            _id: new mongoose.Types.ObjectId(),
            name,
            description,
            service,
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

const getReactions = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const actions = await Reaction.find();

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

const getReaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const action = await Reaction.findById(req.params.id);
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

const updateReaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const update = await Reaction.updateOne({ _id: req.params.id }, req.body);
        return res.status(200).json({
            message: 'Reaction updated successfully',
            update
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            error
        });
    }
};

const deleteReaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deleteResult = await Reaction.deleteOne({ _id: req.params.id });
        return res.status(200).json({
            message: 'Reaction deleted successfully',
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
    createReaction,
    getReactions,
    getReaction,
    updateReaction,
    deleteReaction
};
