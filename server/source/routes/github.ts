import express from 'express';
import controller from '../controllers/github';
import passport from 'passport';
import passportGithub from 'passport-github2';
import User from '../models/user';

const router = express.Router();
const GitHubStrategy = passportGithub.Strategy;

passport.use(
    new GitHubStrategy(
        {
            clientID: "5390c6fedef9c51b9845",
            clientSecret: "3b87218c0a1797a5e59496bededf48d1b13f7656",
            callbackURL: "http://localhost:8080/github/callback"
        },
        async (accessToken, refreshToken, profile, done) => {
            User.findOrCreate({ githubId: profile.id }, function (err, user) {
            return done(err, user);
            });
        }
));

app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


router.get('/issues', controller.get_issues);
router.post('/issues', controller.create_issue);

export = router;