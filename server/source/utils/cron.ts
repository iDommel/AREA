import CronJob from 'node-cron';
import timerController from '../controllers/time';
import Workflow from '../models/workflow';
import User from '../models/user';
import spotifyController from '../controllers/spotify';

const checkActions = async () => {
    try {
        const workflows = await Workflow.find({}).sort({ createdAt: -1 }).limit(10).populate('actions');
        //TODO: talk to Lucas about these any types
        workflows.forEach((workflow: any) => {
            workflow.actions.forEach(async (action: any) => {
                if (action.name === 'isMinuteEven') {
                    const isEven = await timerController.isMinuteEven('Europe/Amsterdam');
                    if (isEven && workflow.relativeUser && workflow.relativeUser !== '') {
                        console.log('Is minute even?', isEven);
                        console.log('workflow?', workflow);
                        await spotifyController.spotifyReaction(workflow.relativeUser, workflow.description);
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
