import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import querystring from 'querystring';
import axios from 'axios';

let endpoint = 'http://localhost:8080';

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

const isHourOdd = async (timeZone: String) => {
    const apiEndpoint = 'https://www.timeapi.io/';
    const apiRoute = 'api/Time/current/zone';
    const apiParams = `?timeZone=${timeZone || 'Europe/Amsterdam'}`;
    try {
        const response = await axios.get(`${apiEndpoint}${apiRoute}${apiParams}`);
        if (response.data.hour % 2 === 0) {
            return false;
        } else {
            return true;
        }
    } catch (error: any) {
        return undefined;
    }
};

export default { getTime, isHourOdd };
