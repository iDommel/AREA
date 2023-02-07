import CronJob from 'node-cron';

const initScheduledJobs = () => {
    const scheduledJobFunction = CronJob.schedule('*/5 * * * *', () => {
        console.log("I'm executed on a schedule!");
        // Add your custom logic here
    });

    scheduledJobFunction.start();
};

export { initScheduledJobs };
