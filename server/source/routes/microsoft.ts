import express from 'express';
// import controller from '../controllers/microsoft';
import passport from 'passport';
import User from '../models/user';

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
            callbackURL: "http://localhost:8080/microsoft/callback"
        },
        async (accessToken: string, refreshToken: string, profile: any, done: (err: any, user?: any) => void) => {
            try {
                const user = await User.findById(profile.id);
                user.services = [{ name: 'microsoft', accessToken, refreshToken }];
                user.save();
                return done(null, {
                    accessToken,
                    refreshToken,
                    profile
                });
            } catch (error) {
                console.log(error);
                return done(null, error);
            }
        }
    )
);

router.get('/login', passport.authenticate('microsoft', { scope: ['openid'] }));
router.get('/callback', passport.authenticate('microsoft', { failureRedirect: '/login' }), async (req, res) => {
    res.redirect('http://localhost:3000/Home');
});

export = router;