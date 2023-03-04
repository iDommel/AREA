import { Request, Response } from 'express';
import ServiceStatus from '../models/serviceStatus';
import { getUserIdFromCookie } from '../utils/utils';
import Service from '../models/service';
import { Client, AuthProviderCallback } from '@microsoft/microsoft-graph-client';

const logout = async (req: Request, res: Response) => {
    try {
        const logout = await ServiceStatus.findOne({ serviceName: 'Microsoft', user: getUserIdFromCookie(req)});
        logout.isConnected = false;
        logout.auth = null;
        const service = await Service.findOne({ _id: logout.service });
        service.route = "/microsoft/login"
        logout.save();
        service.save();
        res.redirect('http://localhost:3000/Home');
    } catch (error) {
        console.log(error);
    }
}

const sendEmail = async (workflow: any) => {
    const microsoft = await ServiceStatus.findOne({ serviceName: 'Microsoft', user: workflow.relativeUser });
    const options = {
        authProvider: (done : AuthProviderCallback) => {
            done(null, microsoft.auth.accessToken);
        }
    };

    console.log(workflow.additionalData[0]);

    try {
        const client = Client.init(options);

        const message = {
            subject: workflow.additionalData[0].subject,
            body: {
                contentType: 'HTML',
                content: workflow.additionalData[0].content,
            },
            toRecipients: [
                {
                    emailAddress: {
                        address: workflow.additionalData[0].to,
                    },
                },
            ],
        };
        const res = await client.api('/me/sendMail').post({ message });

        if (!res.error)
            console.log('Email send');
    } catch (error) {
        console.log(error);
    }
}

const createEvent = async (workflow: any) => {
    const microsoft = await ServiceStatus.findOne({ serviceName: 'Microsoft', user: workflow.relativeUser });
    const options = {
        authProvider: (done : AuthProviderCallback) => {
            done(null, microsoft.auth.accessToken);
        }
    };

    try {
        const client = Client.init(options);

    } catch (error) {
        console.log(error);
    }
}

export default { logout , sendEmail , createEvent };