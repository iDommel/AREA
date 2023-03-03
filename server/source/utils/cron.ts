import CronJob from 'node-cron';
import timerController from '../controllers/time';
import Workflow from '../models/workflow';
import User from '../models/user';
import spotifyController from '../controllers/spotify';
import weatherController from '../controllers/weather';
import Service from '../models/service';
import serviceStatus from '../models/serviceStatus';
import { getUserIdFromCookie } from './utils';
import Action from '../models/action';

const githubReaction = async (newName: string) => {
    try {
        const res = await fetch('http://localhost:8080/github/issues', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: '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'
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
};

const checkServiceEnabled = async (serviceName: string, userID: string) => {
    try {
        const services = await serviceStatus.findOne({ user: userID, serviceName: serviceName });
        if (services.isConnected) {
            console.log('Service ' + services.serviceName + ' is connected');
            return true;
        } else {
            console.log('Service ' + services.serviceName + ' is not connected');
            return false;
        }
    } catch (error: any) {
        console.log(error);
    }
};

const IsEvenReaction = async (workflow: any) => {
    switch (workflow.serviceReaction) {
        case 'spotify':
            const serviceEnabled = await checkServiceEnabled("Spotify", workflow.relativeUser);
            if (serviceEnabled === false)
                return;
            console.log('spotify bug fetch user');
            spotifyController.spotifyReaction(workflow.relativeUser, workflow.description);
            break;
        case 'github':
            const serviceEnabled2 = await checkServiceEnabled("GitHub", workflow.relativeUser);
            if (serviceEnabled2 === false)
                return;
            console.log('github bug 401 bad credentials');
            githubReaction(workflow.description);
            break;
        default:
            break;
    }
};

const checkActions = async () => {
    try {
        const workflowsAction = await Workflow.find({}).sort({ createdAt: -1 }).populate('actions');
        //TODO: talk to Lucas about these any types
        workflowsAction.forEach((workflow: any) => {
            workflow.actions.forEach(async (action: any) => {
                switch (action.name) {
                    case 'isMinuteEven':
                        const isEven = await timerController.isMinuteEven('Europe/Amsterdam');
                        const timeEnabled = await checkServiceEnabled("Time", workflow.relativeUser);
                        console.log('Is minute even?', isEven);
                        if (isEven && workflow.relativeUser && workflow.relativeUser !== '' && timeEnabled)
                            IsEvenReaction(workflow);
                        break;
                    case 'IsRaining':
                        const isRaining = await weatherController.isRaining('');
                        const weatherEnabled = await checkServiceEnabled("Weather", workflow.relativeUser);
                        console.log('Is it raining?', isRaining);
                        if (isRaining && workflow.relativeUser && workflow.relativeUser !== '' && weatherEnabled)
                            IsEvenReaction(workflow);
                    case 'IsDay':
                        const isDay = await weatherController.isDay('');
                        const weatherEnabled2 = await checkServiceEnabled("Weather", workflow.relativeUser);
                        console.log('Is it day?', isDay);
                        if (isDay && workflow.relativeUser && workflow.relativeUser !== '' && weatherEnabled2)
                            IsEvenReaction(workflow);
                    case 'IsCold':
                        const isCold = await weatherController.isCold('');
                        const weatherEnabled3 = await checkServiceEnabled("Weather", workflow.relativeUser);
                        console.log('Is it cold?', isCold);
                        if (isCold && workflow.relativeUser && workflow.relativeUser !== '' && weatherEnabled3)
                            IsEvenReaction(workflow);
                }
            });
        });
    } catch (error: any) {
        console.log(error);
    }
};

const initScheduledJobs = () => {
    const scheduledJobFunction = CronJob.schedule('* * * * *', checkActions);

    scheduledJobFunction.start();
    // checkActions();
};

export { initScheduledJobs };
