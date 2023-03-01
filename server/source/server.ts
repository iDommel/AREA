import http from 'http';
import path from 'path';
import bodyParser from 'body-parser';
import express from 'express';
import logging from './config/logging';
import config from './config/config';
import mongoose from 'mongoose';
import process from 'process';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import { initScheduledJobs } from './utils/cron';
import { initializePassport } from './passportconfig';
import flash from 'express-flash';

import bookRoutes from './routes/book';
import aboutRoutes from './routes/about';
import spotifyRoutes from './routes/spotify';
import workflowRoutes from './routes/workflow';
import apkRoutes from './routes/mobile-apk';
import userRoutes from './routes/user';
import serviceRoutes from './routes/service';
import serviceStatusRoutes from './routes/serviceStatus';
import actionRoutes from './routes/action';
import reactionRoutes from './routes/reaction';
import githubRoutes from './routes/github';
import authRoutes from './routes/auth';
import userController from './controllers/user';
import gitlabRoutes from './routes/gitlab';
import weatherRoutes from './routes/weather';
import timeRoutes from './routes/time';
import microsoftRoutes from './routes/microsoft';

const NAMESPACE = 'Server';
const app = express();

const serverPort = process.env.PORT || 8080;

/** Connect to Mongo */
mongoose
    .connect(config.mongo.url, config.mongo.options)
    .then((result) => {
        logging.info(NAMESPACE, 'Mongo Connected');
    })
    .catch((error) => {
        logging.error(NAMESPACE, error.message, error);
    });

/** Log the request */
app.use((req, res, next) => {
    /** Log the req */
    logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        /** Log the res */
        logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });

    next();
});

/** Parse the body of the request */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/** Rules of our API */
app.use(cors());
app.options('*', cors());
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Headers', 'X-My-Custom-Header');
//     next();
//   });

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(flash());
initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

/** cron */
initScheduledJobs();

/** Routes go here */
app.use('/books', bookRoutes);
app.use('/about.json', aboutRoutes);
app.use('/client.apk', apkRoutes);
app.use('/spotify', spotifyRoutes);
app.use('/workflows', workflowRoutes);
app.use('/users', userRoutes);
app.use('/services', serviceRoutes);
app.use('/service-statuses', serviceStatusRoutes);
app.use('/actions', actionRoutes);
app.use('/reactions', reactionRoutes);
app.use('/github', githubRoutes);
app.use('/auth', authRoutes);
app.use('/gitlab', gitlabRoutes);
app.use('/weather', weatherRoutes);
app.use('/time', timeRoutes);
app.use('/microsoft', microsoftRoutes);

/** Error handling */
app.use((req, res, next) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});

const httpServer = http.createServer(app);

httpServer.listen(serverPort, () => logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${serverPort}`));
