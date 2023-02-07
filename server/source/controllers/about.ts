import { NextFunction, Request, Response } from 'express';
import Service from '../models/service';
type ServiceType = {
    name: string;
    actions: Array<{
        name: string;
        description: string;
    }>;
    reactions: Array<{
        name: string;
        description: string;
    }>;
};

const getServiceList = async (): Promise<Array<ServiceType>> => {
    try {
        const result = await Service.find({}).populate('actions reactions').select('-_id name actions reactions').lean();
        result.map((service: ServiceType) => {
            service.actions = service.actions.map((action: any) => {
                return {
                    name: action.name,
                    description: action.description
                };
            });
            service.reactions = service.reactions.map((reaction: any) => {
                return {
                    name: reaction.name,
                    description: reaction.description
                };
            });
            return service;
        });

        return result;
    } catch (error: any) {
        return [];
    }
};

const getAboutFile = async (req: Request, res: Response, next: NextFunction) => {
    const serviceList: Array<ServiceType> = await getServiceList();

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
