import ServiceStatus from '../models/serviceStatus';
import mongoose from 'mongoose';
import { NextFunction, Request, Response } from 'express';

const createServiceStatus = async (req: Request, res: Response, next: NextFunction) => {
    let { service, user } = req.body;

    try {
        const serviceStatus = new ServiceStatus({
            _id: new mongoose.Types.ObjectId(),
            service,
            user
        });
        const result = await serviceStatus.save();
        return res.status(201).json({
            serviceStatus: result
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            error
        });
    }
};

const getServiceStatuses = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const serviceStatuses = await ServiceStatus.find();

        return res.status(200).json({
            serviceStatuses: serviceStatuses,
            count: serviceStatuses.length
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            error
        });
    }
};

const getServiceStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const serviceStatus = await ServiceStatus.findById(req.params.id);
        return res.status(200).json({
            serviceStatus: serviceStatus
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            error
        });
    }
};

const updateServiceStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const service = await ServiceStatus.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
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

const deleteServiceStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const serviceStatus = await ServiceStatus.findOneAndDelete({ _id: req.params.id });
        return res.status(200).json({
            serviceStatus: serviceStatus
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            error
        });
    }
};

export default { createServiceStatus, getServiceStatuses, getServiceStatus, updateServiceStatus, deleteServiceStatus };
