import { NextFunction, Request, Response } from 'express';

type Service = {
    name: string;
    actions: Array<{
        name: string;
        description: string;
    }>;
    reaction: Array<{
        name: string;
        description: string;
    }>;
};

const getAboutFile = (req: Request, res: Response, next: NextFunction) => {
    const serviceList: Array<Service> = [];

    const tmp = {
        client: {
            host: req.headers.host
        },
        server: {
            current_time: new Date().getTime(),
            services: serviceList
        }
    };

    return res.status(200).json(tmp);
};

export default { getAboutFile };
