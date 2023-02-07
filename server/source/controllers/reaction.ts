import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Reaction from '../models/reaction';
import aqp from 'api-query-params';

const createReaction = async (req: Request, res: Response, next: NextFunction) => {
    let { name, description, enabled } = req.body;

    try {
        const reaction = new Reaction({
            _id: new mongoose.Types.ObjectId(),
            name,
            description,
            enabled
        });

        const result = await reaction.save();

        return res.status(201).json({
            reaction: result
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            error
        });
    }
};

const getReactions = async (req: Request, res: Response, next: NextFunction) => {
    const { filter, skip, limit, sort, projection, population } = aqp(req.query);

    try {
        const reactions = await Reaction.find(filter).skip(skip).limit(limit).sort(sort).select(projection).populate(population);

        return res.status(200).json({
            reactions: reactions,
            count: reactions.length
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
        const reaction = await Reaction.findById(req.params.id);
        return res.status(200).json({
            reaction: reaction
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
