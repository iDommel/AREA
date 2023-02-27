import CronJob from 'node-cron';
import timeController from '../controllers/time';
import weatherController from '../controllers/weather';
import Workflow from '../models/workflow';
import User from '../models/user';
import SpotifyWebApi from 'spotify-web-api-node';

type ActionType = {
    _id: string;
    name: string;
    description: string;
};

let spotifyApi = new SpotifyWebApi({
    clientId: 'd21affede3984ecea64c0ebaceff41e3',
    clientSecret: '734ebfb934c84261963f5794e5783c9f',
    redirectUri: 'http://localhost:3000/Home'
});

const spotifyReaction = async (newName: string) => {
    try {
        const user = await User.findById('63e1714e0670f95f5af133f7');

        spotifyApi.setAccessToken(user.services[0].accessToken);
        const res = await spotifyApi.changePlaylistDetails('0y0zkkH8WQCCKSXbG39dOa', {
            name: newName,
            public: false
        });
        console.log('Playlist is now private!');
    } catch (error: any) {
        console.log('Something went wrong!', error);
    }
};

const checkActions = async () => {
    try {
        const workflows = await Workflow.find({}).sort({ createdAt: -1 }).limit(1).populate('actions');
        //TODO: talk to Lucas about these any types
        workflows.forEach((workflow: any) => {
            workflow.actions.forEach(async (action: any) => {
                if (action.name === 'isMinuteEven') {
                    const isEven = await timeController.isMinuteEven('Europe/Amsterdam');
                    if (isEven) {
                        console.log('Is minute even?', isEven);
                        spotifyReaction(workflow.description);
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
