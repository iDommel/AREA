import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Service from '../models/service';
import aqp from 'api-query-params';

const createService = async (req: Request, res: Response, next: NextFunction) => {
    let { name, description, actions, reactions, globallyEnabled } = req.body;

    try {
        const service = new Service({
            _id: new mongoose.Types.ObjectId(),
            name,
            description,
            actions,
            reactions,
            globallyEnabled
        });

        const result = await service.save();

        return res.status(201).json({
            service: result
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            error
        });
    }
};

const getServices = async (req: Request, res: Response, next: NextFunction) => {
    const { filter, skip, limit, sort, projection, population } = aqp(req.query);

    try {
        const users = await Service.find(filter).skip(skip).limit(limit).sort(sort).select(projection).populate(population);

        return res.status(200).json({
            users: users,
            count: users.length
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            error
        });
    }
};

const getService = async (req: Request, res: Response, next: NextFunction) => {
    const { projection, population } = aqp(req.query);

    try {
        const service = await Service.findById(req.params.id).select(projection).populate(population);
        return res.status(200).json({
            service: service
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            error
        });
    }
};

const updateService = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const service = await Service.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        return res.status(200).json({
            service: service
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            error
        });
    }
};

const deleteService = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const service = await Service.findOneAndDelete({ _id: req.params.id });
        return res.status(200).json({
            service: service
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            error
        });
    }
};

export default { createService, getServices, getService, updateService, deleteService };
