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

import bookRoutes from './routes/book';
import aboutRoutes from './routes/about';
import spotifyRoutes from './routes/spotify';
import apkRoutes from './routes/mobile-apk';
import userRoutes from './routes/user';

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

app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user: false | Express.User | null | undefined, done) {
    done(null, user);
});

/** Routes go here */
app.use('/books', bookRoutes);
app.use('/about.json', aboutRoutes);
app.use('/client.apk', apkRoutes);
app.use('/spotify', spotifyRoutes);
app.use('/users', userRoutes);

/** Error handling */
app.use((req, res, next) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});

const httpServer = http.createServer(app);

httpServer.listen(serverPort, () => logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${serverPort}`));
