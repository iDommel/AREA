import express from 'express';
import controller from '../controllers/github';
import passport from 'passport';
import passportGithub from 'passport-github2';
import User from '../models/user';
import ServiceStatus from '../models/serviceStatus';
import Service from '../models/service';

import { getUserIdFromCookie } from '../utils/utils';

const router = express.Router();
const GitHubStrategy = passportGithub.Strategy;

const clientID = process.env.GITHUB_CLIENT_ID as string;
const clientSecret = process.env.GITHUB_CLIENT_SECRET as string;

passport.use(
    new GitHubStrategy(
        {
            clientID,
            clientSecret,
            callbackURL: "http://localhost:8080/github/callback",
            passReqToCallback: true
        },
        async (req: any, accessToken: string, refreshToken: string, profile: passportGithub.Profile, done: (err: any, user?: any) => void) => {
            try {
                const id = getUserIdFromCookie(req);
                const serviceStatus = await ServiceStatus.findOne({ user: id, serviceName: 'GitHub' });
                serviceStatus.auth = {
                    accessToken,
                    refreshToken
                };
                serviceStatus.isConnected = true;
                const service = await Service.findOne({ _id: serviceStatus.service });
                service.route = "/github/logout"
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

router.get('/login', passport.authenticate('github', { scope: ['user:email repo'] }));
router.get('/callback', passport.authenticate('github', { failureRedirect: '/login' }), async (req, res) => {
    res.redirect('http://localhost:3000/Home');
});
router.get('/issues', controller.get_issues);
router.post('/issues', controller.create_issue);
router.get('/logout', controller.logout);

export = router;