import { Request, Response } from 'express';
import ServiceStatus from '../models/serviceStatus';
import { getUserIdFromCookie } from '../utils/utils';
import Service from '../models/service';

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

export default { logout };