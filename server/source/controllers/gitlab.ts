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
    projectID: string
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

const Home = process.env.WEB_HOSTNAME as string;
const Port = process.env.WEB_PORT as string;

const create_commit = async (req: Request, res: Response) => {
    try {
        const access_token = req.headers.authorization?.split(" ")[1];
        const projectID = req.body.projectID;
        const branch = req.body.branch;
        const commit_message = req.body.commit_message;
        const file_path = req.body.actions[0].file_path;

        const axiosConfig: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        };
        
        // Get latest commit sha of the branch
        const { data: latestCommit } = await axios.get(
            `https://gitlab.com/api/v4/projects/${projectID}/repository/branches/${branch}`,
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
            `https://gitlab.com/api/v4/projects/${projectID}/repository/commits`,
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

        const response = await axios.post('http://localhost:8080/gitlab/commit', {
            projectID: info.projectID,
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
                Authorization: `token ${gitlab.auth.accessToken}`
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
        res.redirect('http://' + Home + ':' + Port + '/');
    } catch (error) {
        console.log(error);
    }
}

export default { logout, create_commit, gitlabCommit };