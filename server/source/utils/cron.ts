import CronJob from 'node-cron';
import timerController from '../controllers/time';
import Workflow from '../models/workflow';
import User from '../models/user';
import spotifyController from '../controllers/spotify';
import weatherController from '../controllers/weather';
import Service from '../models/service';

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

const checkActionServiceEnabled = async (action: any) => {
    try {
        const services = await Service.findOne({ actions: action._id });
        // console.log(services)
        if (services.globallyEnabled) {
            console.log('Service ' + services.name + ' is globally enabled');
            return true;
        } else {
            console.log('Service ' + services.name + ' is not globally enabled');
            return false;
        }
    } catch (error: any) {
        console.log(error);
    }
};

const checkReactionServiceEnabled = async (reaction: any) => {
    try {
        const services = await Service.findOne({ reactions: reaction._id });
        if (services.globallyEnabled) {
            console.log('Service ' + services.name + ' is globally enabled');
            return true;
        } else {
            console.log('Service ' + services.name + ' is not globally enabled');
            return false;
        }
    } catch (error: any) {
        console.log(error);
    }
};

const IsEvenReaction = async (workflow: any) => {
    const isEven = await timerController.isMinuteEven('Europe/Amsterdam');
    if (isEven) {
        console.log('Is minute even?', isEven);
        const serviceEnabled = await checkReactionServiceEnabled(workflow.reactions[0]);
        if (serviceEnabled === false) {
            return;
        }
        switch (workflow.serviceReaction) {
            case 'spotify':
                console.log('spotify bug fetch user');
                spotifyController.spotifyReaction(workflow.relativeUser, workflow.description);
                break;
            case 'github':
                console.log('github bug 401 bad credentials');
                // githubReaction(workflow.description);
                break;
            default:
                break;
        }
    }
};

const checkActions = async () => {
    try {
        const workflowsAction = await Workflow.find({}).sort({ createdAt: -1 }).populate('actions');
        //TODO: talk to Lucas about these any types
        workflowsAction.forEach((workflow: any) => {
            workflow.actions.forEach(async (action: any) => {
                const serviceEnabled = await checkActionServiceEnabled(action);
                if (serviceEnabled === false) {
                    return;
                }
                if (action.name === 'isMinuteEven') {
                    const isEven = await timerController.isMinuteEven('Europe/Amsterdam');
                    if (isEven && workflow.relativeUser && workflow.relativeUser !== '') {
                        console.log('Is minute even?', isEven);
                        await spotifyController.spotifyReaction(workflow.relativeUser, workflow.description);
                        IsEvenReaction(workflow);
                    }
                }
                if (action.name === 'isRaining') {
                    const isRaining = await weatherController.isRaining('Toulouse');
                    if (isRaining) {
                        console.log('Is it raining?', isRaining);
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
};

export { initScheduledJobs };
