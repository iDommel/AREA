import express from 'express';
// import controller from '../controllers/github';
import passport from 'passport';
import User from '../models/user';

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
            callbackURL: "http://localhost:8080/gitlab/callback"
        },
        async (accessToken: string, refreshToken: string, profile: any, done: (err: any, user?: any) => void) => {
            try {
                const user = await User.findById(profile.id);
                user.services = [{ name: 'gitlab', accessToken, refreshToken }];
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

router.get('/login', passport.authenticate('gitlab', { scope: ['email'] }));
router.get('/callback', passport.authenticate('gitlab', { failureRedirect: '/login' }), async (req, res) => {
    res.redirect('http://localhost:3000/Home');
});

export = router;