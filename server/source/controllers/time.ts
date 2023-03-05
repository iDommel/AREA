import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import querystring from 'querystring';
import axios from 'axios';
import ServiceStatus from '../models/serviceStatus';
import { getUserIdFromCookie } from '../utils/utils';
import Service from '../models/service';

let endpoint = 'http://localhost:8080';
const Home = process.env.WEB_HOSTNAME as string;
const Port = process.env.WEB_PORT as string;

const getTime = async (req: Request, res: Response, next: NextFunction) => {
    const apiEndpoint = 'https://www.timeapi.io/';
    const apiRoute = 'api/Time/current/zone';
    const apiParams = '?timeZone=Europe/Amsterdam';
    try {
        const response = await axios.get(`${apiEndpoint}${apiRoute}${apiParams}`);
        if (response.status === 200) {
            return res.status(200).json({
                time: response.data
            });
        } else {
            return res.status(500).json({
                message: 'Something went wrong'
            });
        }
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            error
        });
    }
};

const isMinuteEven = async () => {
    const apiEndpoint = 'https://www.timeapi.io/';
    const apiRoute = 'api/Time/current/zone';
    const apiParams = '?timeZone=Europe/Amsterdam';
    try {
        const response = await axios.get(`${apiEndpoint}${apiRoute}${apiParams}`);
        if (response.data.minute % 2 === 0) {
            return true;
        } else {
            return false;
        }
    } catch (error: any) {
        return undefined;
    }
};

const isTuesday = async (timeZone: String) => {
    const apiEndpoint = 'https://www.timeapi.io/';
    const apiRoute = 'api/Time/current/zone';
    const apiParams = `?timeZone=${timeZone || 'Europe/Amsterdam'}`;
    try {
        const response = await axios.get(`${apiEndpoint}${apiRoute}${apiParams}`);
        if (response.data.dayOfWeek === 'Sunday') {
            return true;
        } else {
            return false;
        }
    } catch (error: any) {
        return undefined;
    }
};

const isNoon = async (timeZone: String) => {
    const apiEndpoint = 'https://www.timeapi.io/';
    const apiRoute = 'api/Time/current/zone';
    const apiParams = `?timeZone=${timeZone || 'Europe/Amsterdam'}`;
    try {
        const response = await axios.get(`${apiEndpoint}${apiRoute}${apiParams}`);
        if (response.data.hour === 12 && response.data.minute <= 5) {
            return true;
        } else {
            return false;
        }
    } catch (error: any) {
        return undefined;
    }
};

const login = async (req: Request, res: Response) => {
    try {
        const logout = await ServiceStatus.findOne({ serviceName: 'Time', user: getUserIdFromCookie(req)});
        logout.isConnected = true;
        const service = await Service.findOne({ _id: logout.service });
        service.route = "/time/logout"
        logout.save();
        service.save();
        res.redirect('http://' + Home + ':' + Port + '/');
    } catch (error) {
        console.log(error);
    }
}

const logout = async (req: Request, res: Response) => {
    try {
        const logout = await ServiceStatus.findOne({ serviceName: 'Time', user: getUserIdFromCookie(req)});
        logout.isConnected = false;
        logout.auth = null;
        const service = await Service.findOne({ _id: logout.service });
        service.route = "/Time/login"
        logout.save();
        service.save();
        res.redirect('http://' + Home + ':' + Port + '/');
    } catch (error) {
        console.log(error);
    }
}


export default { getTime, isMinuteEven, isTuesday, isNoon, login, logout };
