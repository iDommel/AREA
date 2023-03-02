import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import querystring from 'querystring';
import axios from 'axios';

const message = {
    subject: 'Area 51 raid',
    body: {
        contentType: 'text',
        content: 'Come at 3AM'
    },
    toRecipients: [
        {
            emailAddress: {
                address: 'antoine.penot@epitech.eu'
            }
        }
    ]
};

const send_message = async (req: Request, res: Response, next: NextFunction) => {
    const apiEndpoint = 'https://graph.microsoft.com/v1.0/me/sendMail';

    try {
        const response = await axios.post(`${apiEndpoint}`, message);
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