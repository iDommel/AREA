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
        const octokit = new Octokit({
            auth: token
        });
        console.log(req.body);
        const new_issue = await octokit.request("POST /repos/{owner}/{repo}/issues", {
            owner: req.body.repoOwner,
            repo: req.body.repoName,
            title: req.body.title,
            body: req.body.body,
            labels: req.body.labels
        });
        // console.log('new_issue', new_issue);
        res.status(200).json(new_issue);
    } catch (error) {
        console.log(error);
    }
}

const checkPullRequestMerged = async (workflow : any) => {
    try {
        const info = workflow.additionalData[0];
        const Github = await ServiceStatus.findOne({ serviceName: 'GitHub', user: workflow.relativeUser});
        const octokit = new Octokit({
            auth: Github.auth.accessToken
        });
        const result = await octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}/merge', {
            owner: info.repoOwner,
            repo: info.repoName,
            pull_number: info.prNumber
            });
        if (result.status === 204)
            return (true);
        return (false);
    } catch (error) {
        console.log(error);
    }
}

const addReaction = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const octokit = new Octokit({
            auth: token
        });
        console.log(req.body);
        const new_issue = await octokit.request('POST /repos/{owner}/{repo}/issues/{issue_number}/reactions', {
            owner: req.body.repoOwner,
            repo: req.body.repoName,
            issue_number: req.body.issueNb,
            content: req.body.body
        });
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

const githubReaction = async (workflow: any) => {
    try {
        const info = workflow.additionalData[0];
        const Github = await ServiceStatus.findOne({ serviceName: 'GitHub', user: workflow.relativeUser});

        const res = await fetch('http://localhost:8080/github/issues', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'token ' + Github.auth.accessToken
            },
            body: JSON.stringify({
                title: info.titleIssue,
                body: info.bodyIssue,
                labels: ['bug'],
                repoOwner: info.repoOwner2,
                repoName: info.repoName2
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

const githubReaction2 = async (workflow: any) => {
    try {
        const info = workflow.additionalData[0];
        const Github = await ServiceStatus.findOne({ serviceName: 'GitHub', user: workflow.relativeUser});

        const res = await fetch('http://localhost:8080/github/reaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'token ' + Github.auth.accessToken
            },
            body: JSON.stringify({
                issueNb: '42',
                content: 'heart',
                repoOwner: info.repoOwner2,
                repoName: info.repoName2
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

export default { get_issues, create_issue, logout, checkPullRequestMerged , githubReaction, githubReaction2, addReaction};