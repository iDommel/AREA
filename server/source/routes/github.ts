import express from 'express';
import controller from '../controllers/github';
import passport from 'passport';
import passportGithub from 'passport-github2';
import User from '../models/user';

const router = express.Router();
const GitHubStrategy = passportGithub.Strategy;

const clientID = process.env.GITHUB_CLIENT_ID as string;
const clientSecret = process.env.GITHUB_CLIENT_SECRET as string;

passport.use(
    new GitHubStrategy(
        {
            clientID,
            clientSecret,
            callbackURL: "http://localhost:8080/github/callback"
        },
        async (accessToken: string, refreshToken: string, profile: passportGithub.Profile, done: (err: any, user?: any) => void) => {
            const user = await User.findById(profile.id);

            user.services = [{ name: 'github', accessToken, refreshToken }];
            user.save();
            return done(null, {
                accessToken,
                refreshToken,
                profile
            });
        }
));

router.get('/login', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/callback', passport.authenticate('github', { failureRedirect: '/login' }), async (req, res) => {
    res.redirect('/');
});
router.get('/issues', controller.get_issues);
router.post('/issues', controller.create_issue);

export = router;