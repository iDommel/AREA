import { Request, Response } from 'express';
import ServiceStatus from '../models/serviceStatus';
import { getUserIdFromCookie } from '../utils/utils';
import Service from '../models/service';
import axios, { AxiosRequestConfig } from "axios";

interface AdditionalData {
    // repoOwner: string
    // repoName: string
    // prNumber: string
    // repoOwner2: string
    // repoName2: string
    // titleIssue: string
    // bodyIssue: string
    // issueNb : string
    // content : string
    projectId: string
    branch: string
    commitMessage: string
    filePath: string
}

interface Workflow {
    additionalData: AdditionalData[];
    relativeUser: string;
}

interface GitlabCommitResponse {
    success: boolean;
    message?: string;
}

const create_commit = async (req: Request, res: Response) => {
    try {
        const projectId = req.body.projectId;
        const access_token = req.headers.authorization?.split(" ")[1];
        const branch = req.body.branch;
        const commit_message = req.body.message;
        const file_path = req.body.file_path;

        const axiosConfig: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        };

        // Get latest commit sha of the branch
        const { data: latestCommit } = await axios.get(
            `https://gitlab.com/api/v4/projects/${projectId}/repository/branches/${branch}`,
            axiosConfig
        );

        const commitPayload = {
            branch,
            commit_message,
            actions: [
                {
                    action: "create",
                    file_path,
                },
            ],
        };

        const { data: new_commit } = await axios.post(
            `https://gitlab.com/api/v4/projects/${projectId}/repository/commits`,
            commitPayload,
            axiosConfig
        );

        res.status(200).json(new_commit);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
};

const gitlabCommit = async (workflow: Workflow): Promise<GitlabCommitResponse> => {
    try {
        const info = workflow.additionalData[0];
        const gitlab = await ServiceStatus.findOne({ serviceName: 'GitLab', user: workflow.relativeUser });

        const response = await axios.post(`https://gitlab.com/api/v4/projects/${info.projectId}/repository/commits`, {
            branch: info.branch,
            commit_message: info.commitMessage,
            actions: [
                {
                    action: 'create',
                    file_path: info.filePath,
                }
            ]
        }, {
            headers: {
                'Content-Type': 'application/json',
                'PRIVATE-TOKEN': gitlab.auth.accessToken
            }
        });

        if (response.status !== 201) {
            console.log(`Something went wrong with GitLab commit! ${response.data.message}`);
            return { success: false, message: response.data.message };
        } else {
            console.log('GitLab commit created!');
            return { success: true };
        }
    } catch (error: any) {
        console.log('Something went wrong with GitLab commit!', error);
        return { success: false, message: error.message };
    }
};

const logout = async (req: Request, res: Response) => {
    try {
        const logout = await ServiceStatus.findOne({ serviceName: 'GitLab', user: getUserIdFromCookie(req)});
        logout.isConnected = false;
        logout.auth = null;
        const service = await Service.findOne({ _id: logout.service });
        service.route = "/gitlab/login"
        logout.save();
        service.save();
        res.redirect('http://localhost:3000/Home');
    } catch (error) {
        console.log(error);
    }
}

export default { logout };