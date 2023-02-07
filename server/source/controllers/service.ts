import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Service from '../models/service';

const createService = async (req: Request, res: Response, next: NextFunction) => {
    let { name } = req.body;

    try {
        const service = new Service({
            _id: new mongoose.Types.ObjectId(),
            name
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
    try {
        const users = await Service.find();

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
    try {
        const service = await Service.findById(req.params.id);
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
