import { Octokit } from "octokit";
import { Request, Response } from "express";
import ServiceStatus from '../models/serviceStatus';
import {getUserIdFromCookie} from '../utils/utils';
import Service from '../models/service';

// const octokit = new Octokit({
//     auth: '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'
// });

const get_issues = async (req: Request, res: Response) => {
    try {
        console.log('octokit')
        // const issues = await octokit.request("GET /repos/{owner}/{repo}/issues", {
        //     owner: "iDommel",
        //     repo: "AREA",
        // });
        // console.log('issues', issues);
        // res.status(200).json(issues);
    } catch (error) {
        console.log(error);
    }
}

const create_issue = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        console.log(req.body)
        const octokit = new Octokit({
            auth: token
        });
        const new_issue = await octokit.request("POST /repos/{owner}/{repo}/issues", {
            owner: "Mfolio2004",
            repo: "RoG",
            title: req.body.title,
            body: req.body.body,
            labels: req.body.labels
        });
        console.log('new_issue', new_issue);
        res.status(200).json(new_issue);
    } catch (error) {
        console.log(error);
    }
}

const checkPullRequestMerged = async (user : string) => {
    try {
        const Github = await ServiceStatus.findOne({ serviceName: 'GitHub', user: user});
        const octokit = new Octokit({
            auth: Github.auth.accessToken
        });
        const result = await octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}/merge', {
            owner: 'IDommel',
            repo: 'AREA',
            pull_number: 12,
            });
        if (result.status === 204)
            return (true);
        return (false);
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

const githubReaction = async (relativeUser: string, newName: string) => {
    try {
        const Github = await ServiceStatus.findOne({ serviceName: 'GitHub', user: relativeUser});

        const res = await fetch('http://localhost:8080/github/issues', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'token ' + Github.auth.accessToken
            },
            body: JSON.stringify({
                title: newName,
                body: 'This is a test issue',
                labels: ['bug']
            })
        });
        const data = await res.json();
        if (res.status !== 200) {
            console.log('Something went wrong with github reaction! ' + data.message);
        } else {
            console.log('Github issue created!');
        }
    } catch (error: any) {
        console.log('Something went wrong with github reaction!', error);
    }
}

export default { get_issues, create_issue, logout, checkPullRequestMerged , githubReaction};