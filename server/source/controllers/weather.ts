import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import querystring from 'querystring';
import axios from 'axios';

const apiKey = process.env.WEATHER_API_KEY as string;

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
    const apiParams = `&q=${location || 'Toulouse'}`;

    try {
        const response = await axios.get(`${apiEndpoint}${apiRoute}${apiKey}${apiParams}`);
        if (response.data.text === 'Light rain') {
            console.log('It is raining');
            return true;
        } else {
            console.log('It is not raining');
            return false;
        }
    } catch (error: any) {
        return error;
    }
};


export default { getWeather, isRaining };