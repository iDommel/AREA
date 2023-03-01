import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/user';
import aqp from 'api-query-params';
import { compare, hash } from 'bcrypt';
import ServiceStatus from '../models/serviceStatus';
import Service from '../models/service';

type ServiceStatus = mongoose.Document & {
    service: string;
    user: string;
    isConnected: boolean;
    token: string;
    isEnabled: boolean;
};

type Service = mongoose.Document & {
    name: string;
    route: string;
    description: string;
    actions: string[];
    reactions: string[];
    globallyEnabled: boolean;
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    let { username, password } = req.body;

    try {
        const user = new User({
            username,
            password: await hash(password, 10)
        });

        const result = await user.save();

        const services = await Service.find();
        services.forEach(async (service: Service) => {
            const serviceStatus = new ServiceStatus({
                service: service._id,
                serviceName: service.name,
                user: result._id,
                isConnected: false,
                token: {},
                isEnabled: service.globallyEnabled
            });
            await serviceStatus.save();
        });
        return res.status(201).json({
            user: result
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            error
        });
    }
};

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    const { filter, skip, limit, sort, projection, population } = aqp(req.query);

    try {
        const users = await User.find(filter).skip(skip).limit(limit).sort(sort).select(projection).populate(population);

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

const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(req.params.id);
        return res.status(200).json({
            user: user
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            error
        });
    }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        return res.status(200).json({
            user: user
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            error
        });
    }
};

const checkPassword = async (username: string, password: string, done: any) => {
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return done(null, false, { message: 'Could not find a user with that email.' });
        }

        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
            return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
    } catch (error) {
        return done(error);
    }
};

export default { createUser, getAllUsers, getUser, updateUser, checkPassword };
