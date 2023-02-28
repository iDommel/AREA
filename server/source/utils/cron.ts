import CronJob from 'node-cron';
import controller from '../controllers/time';
import Workflow from '../models/workflow';
import User from '../models/user';
import SpotifyWebApi from 'spotify-web-api-node';
import Service from '../models/service';

type ActionType = {
    _id: string;
    name: string;
    description: string;
};

let spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
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

const githubReaction = async (newName: string) => {
    try {
        const res = await fetch("http://localhost:8080/github/issues", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "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"
            },
            body: JSON.stringify({
                title: newName,
                body: 'This is a test issue',
                labels: ['bug']
            }),
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
            console.log('Service ' +  services.name + ' is globally enabled');
            return true;
        } else {
            console.log('Service ' +  services.name + ' is not globally enabled');
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
            console.log('Service ' +  services.name + ' is globally enabled');
            return true;
        } else {
            console.log('Service ' +  services.name + ' is not globally enabled');
            return false;
        }
    } catch (error: any) {
        console.log(error);
    }
};

const IsEvenReaction = async (workflow: any) => {
    const isEven = await controller.isMinuteEven('Europe/Amsterdam');
    if (isEven) {
        console.log('Is minute even?', isEven);
        const serviceEnabled = await checkReactionServiceEnabled(workflow.reactions[0]);
        if (serviceEnabled === false) {
            return;
        }
        switch (workflow.serviceReaction) {
            case 'spotify':
                console.log('spotify bug fetch user');
                // spotifyReaction(workflow.description);
                break;
            case 'github':
                console.log('github bug 401 bad credentials');
                // githubReaction(workflow.description);
                break;
            default:
                break;
        }
    }
}

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
};

export { initScheduledJobs };
