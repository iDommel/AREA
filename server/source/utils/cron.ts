import CronJob from 'node-cron';
import timerController from '../controllers/time';
import Workflow from '../models/workflow';
import User from '../models/user';
import spotifyController from '../controllers/spotify';
import weatherController from '../controllers/weather';
import githubController from '../controllers/github';
import Service from '../models/service';
import serviceStatus from '../models/serviceStatus';
import { getUserIdFromCookie } from './utils';
import Action from '../models/action';
import Reaction from '../models/reaction';

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

const checkReaction = async (workflow: any) => {
    const reaction = await Reaction.findOne({ _id: workflow.reactions[0] });
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
            if (reaction.name === 'Create issue')
                githubController.githubReaction(workflow);
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
                console.log(action.name)
                switch (action.name) {
                    case 'isMinuteEven':
                        const isEven = await timerController.isMinuteEven();
                        const timeEnabled = await checkServiceEnabled("Time", workflow.relativeUser);
                        console.log('Is minute even?', isEven);
                        if (isEven && workflow.relativeUser && workflow.relativeUser !== '' && timeEnabled)
                            checkReaction(workflow);
                        break;
                    case 'isTuesday':
                        const isTuesday = await timerController.isTuesday('Europe/Amsterdam');
                        const timeEnabled2 = await checkServiceEnabled("Time", workflow.relativeUser);
                        console.log('Is today Tuesday?', isTuesday);
                        if (isTuesday && workflow.relativeUser && workflow.relativeUser !== '' && timeEnabled2)
                            checkReaction(workflow);
                        break;
                    case 'isNoon':
                        const isNoon = await timerController.isNoon('Europe/Amsterdam');
                        const timeEnabled3 = await checkServiceEnabled("Time", workflow.relativeUser);
                        console.log('Is it noon?', isNoon);
                        if (isNoon && workflow.relativeUser && workflow.relativeUser !== '' && timeEnabled3)
                            checkReaction(workflow);
                        break;
                    case 'IsRaining':
                        const isRaining = await weatherController.isRaining(workflow.additionalData[0].localisation);
                        console.log(workflow.additionalData[0].localisation, isRaining)
                        const serviceEnabled2 = await checkServiceEnabled("Weather", workflow.relativeUser);
                        if (isRaining && workflow.relativeUser && workflow.relativeUser !== '' && serviceEnabled2) {
                            console.log('Is it raining?', isRaining);
                            checkReaction(workflow);
                        }
                        break;
                    case 'IsDay':
                        const isDay = await weatherController.isDay('');
                        const weatherEnabled2 = await checkServiceEnabled("Weather", workflow.relativeUser);
                        console.log('Is it day?', isDay);
                        if (isDay && workflow.relativeUser && workflow.relativeUser !== '' && weatherEnabled2)
                            checkReaction(workflow);
                    case 'IsCold':
                        const isCold = await weatherController.isCold('');
                        const weatherEnabled3 = await checkServiceEnabled("Weather", workflow.relativeUser);
                        console.log('Is it cold?', isCold);
                        if (isCold && workflow.relativeUser && workflow.relativeUser !== '' && weatherEnabled3)
                            checkReaction(workflow);
                    case 'IsPullRequestMerged':
                        const serviceEnabled3 = await checkServiceEnabled("GitHub", workflow.relativeUser);
                        if (serviceEnabled3 === false)
                            return;
                        const isPullRequestMerged = await githubController.checkPullRequestMerged(workflow);
                        if (isPullRequestMerged && workflow.relativeUser && workflow.relativeUser !== '' && serviceEnabled3) {
                            console.log('Is pull request merged?', isPullRequestMerged);
                            checkReaction(workflow);
                        }
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
