import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import querystring from 'querystring';
import axios from 'axios';
import ServiceStatus from '../models/serviceStatus';
import { getUserIdFromCookie } from '../utils/utils';
import Service from '../models/service';

const apiKey = process.env.WEATHER_API_KEY as string;
const Home = process.env.WEB_HOSTNAME as string;
const Port = process.env.WEB_PORT as string;

const getWeather = async (req: Request, res: Response, next: NextFunction) => {
    const apiEndpoint = 'http://api.weatherapi.com/v1/';
    const apiRoute = 'current.json?key=';
    const apiParams = '&q=Toulouse';

    try {
        const response = await axios.get(`${apiEndpoint}${apiRoute}${apiKey}${apiParams}`);
        if (response.status === 200) {
            return res.status(200).json({
                weather: response.data
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

const isRaining = async (location: string) => {
    const apiEndpoint = 'http://api.weatherapi.com/v1/';
    const apiRoute = 'current.json?key=';
    const apiParams = `&q=${location || 'London'}`;

    try {
        const response = await axios.get(`${apiEndpoint}${apiRoute}${apiKey}${apiParams}`);
        if (response.data.current.condition.text === 'Light rain') {
            return true;
        } else {
            return false;
        }
    } catch (error: any) {
        return error;
    }
};

const isDay = async (location: string) => {
    const apiEndpoint = 'http://api.weatherapi.com/v1/';
    const apiRoute = 'current.json?key=';
    const apiParams = `&q=${location || 'Tokyo'}`;

    try {
        const response = await axios.get(`${apiEndpoint}${apiRoute}${apiKey}${apiParams}`);
        if (response.data.current.is_day === 1) {
            return true;
        } else {
            return false;
        }
    } catch (error: any) {
        return error;
    }
};

const isCold = async (location: string) => {
    const apiEndpoint = 'http://api.weatherapi.com/v1/';
    const apiRoute = 'current.json?key=';
    const apiParams = `&q=${location || 'Toulouse'}`;

    try {
        const response = await axios.get(`${apiEndpoint}${apiRoute}${apiKey}${apiParams}`);
        if (response.data.current.temp_c <= 10) {
            return true;
        } else {
            return false;
        }
    } catch (error: any) {
        return error;
    }
};

const login = async (req: Request, res: Response) => {
    try {
        const logout = await ServiceStatus.findOne({ serviceName: 'Weather', user: getUserIdFromCookie(req)});
        logout.isConnected = true;
        const service = await Service.findOne({ _id: logout.service });
        service.route = "/weather/logout"
        logout.save();
        service.save();
        res.redirect('http://' + Home + ':' + Port + '/');
    } catch (error) {
        console.log(error);
    }
}

const logout = async (req: Request, res: Response) => {
    try {
        const logout = await ServiceStatus.findOne({ serviceName: 'Weather', user: getUserIdFromCookie(req)});
        logout.isConnected = false;
        logout.auth = null;
        const service = await Service.findOne({ _id: logout.service });
        service.route = "/weather/login"
        logout.save();
        service.save();
        res.redirect('http://' + Home + ':' + Port + '/');
    } catch (error) {
        console.log(error);
    }
}


export default { getWeather, isRaining, isDay, isCold, login, logout };
