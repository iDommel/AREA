import express from 'express';
import controller from '../controllers/gitlab';
import passport from 'passport';
import User from '../models/user';
import ServiceStatus from '../models/serviceStatus';
import Service from '../models/service';
import { getUserIdFromCookie } from '../utils/utils';

const router = express.Router();
const passportGitLab = require('passport-gitlab2');
const GitLabStrategy = passportGitLab.Strategy;

const clientID = process.env.GITLAB_APP_ID as string;
const clientSecret = process.env.GITLAB_APP_SECRET as string;

passport.use(
    new GitLabStrategy (
        {
            clientID,
            clientSecret,
            callbackURL: "http://localhost:8080/gitlab/callback",
            passReqToCallback: true
        },
        async (req: any, accessToken: string, refreshToken: string, profile: any, done: (err: any, user?: any) => void) => {
            try {
                console.log(req);
                const id = getUserIdFromCookie(req);
                const serviceStatus = await ServiceStatus.findOne({ user: id, serviceName: 'GitLab' });
                serviceStatus.auth = {
                    accessToken,
                    refreshToken
                };
                serviceStatus.isConnected = true;
                const service = await Service.findOne({ _id: serviceStatus.service });
                service.route = "/gitlab/logout"
                service.save();
                serviceStatus.save();
                return done(null, {
                    id,
                    accessToken,
                    refreshToken
                });
            } catch (error) {
                console.log(error);
                return done(null, error);
            }
        }
    )
);

router.get('/login', passport.authenticate('gitlab', { scope: ['read_user'] }));
router.get('/callback', passport.authenticate('gitlab', { failureRedirect: '/login' }), async (req, res) => {
    res.redirect('http://localhost:3000/Home');
});

router.get('/logout', controller.logout);

export = router;
