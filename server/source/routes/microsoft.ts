import express from 'express';
import controller from '../controllers/microsoft';
import passport from 'passport';
import User from '../models/user';
import ServiceStatus from '../models/serviceStatus';
import Service from '../models/service';
import { getUserIdFromCookie } from '../utils/utils';

const router = express.Router();
const passportMicrosoft = require('passport-microsoft');
const MicrosoftStrategy = passportMicrosoft.Strategy;

const clientID = process.env.MICROSOFT_CLIENT_ID as string;
const clientSecret = process.env.MICROSOFT_CLIENT_SECRET as string;

passport.use(
    new MicrosoftStrategy (
        {
            clientID,
            clientSecret,
            callbackURL: "http://localhost:8080/microsoft/callback",
            passReqToCallback: true
        },
        async (req: any, accessToken: string, refreshToken: string, profile: any, done: (err: any, user?: any) => void) => {
            try {
                const id = getUserIdFromCookie(req);
                const serviceStatus = await ServiceStatus.findOne({ user: id, serviceName: 'Microsoft' });
                serviceStatus.auth = {
                    accessToken,
                    refreshToken
                };
                serviceStatus.isConnected = true;
                const service = await Service.findOne({ _id: serviceStatus.service });
                service.route = "/microsoft/logout"
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

router.get('/login', passport.authenticate('microsoft', { scope: ['User.Read'] }));
router.get('/callback', passport.authenticate('microsoft', { failureRedirect: '/login' }), async (req, res) => {
    res.redirect('http://localhost:3000/Home');
});

router.get('/logout', controller.logout);

export = router;