import { Octokit } from "octokit";
import { Request, Response } from "express";
import ServiceStatus from '../models/serviceStatus';
import {getUserIdFromCookie} from '../utils/utils';
import Service from '../models/service';

const octokit = new Octokit({
    auth: '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'
});

const get_issues = async (req: Request, res: Response) => {
    try {
        console.log('octokit')
        const issues = await octokit.request("GET /repos/{owner}/{repo}/issues", {
            owner: "iDommel",
            repo: "AREA",
        });
        console.log('issues', issues);
        res.status(200).json(issues);
    } catch (error) {
        console.log(error);
    }
}

const create_issue = async (req: Request, res: Response) => {
    try {
        const new_issue = await octokit.request("POST /repos/{owner}/{repo}/issues", {
            owner: "iDommel",
            repo: "AREA",
            title: "Created with the REST API",
            body: "This is a test issue created by the REST API",
        });
        console.log('new_issue', new_issue);
        res.status(200).json(new_issue);
    } catch (error) {
        console.log(error);
    }
}

const logout = async (req: Request, res: Response) => {
    try {
        const logout = await ServiceStatus.findOne({ serviceName: 'GitHub', user: getUserIdFromCookie(req)});
        logout.isConnected = false;
        logout.auth = null;
        const service = await Service.findOne({ _id: logout.service });
        service.route = "/github/login"
        logout.save();
        service.save();
        res.redirect('http://localhost:3000/Home');
    } catch (error) {
        console.log(error);
    }
}

export default { get_issues, create_issue, logout };