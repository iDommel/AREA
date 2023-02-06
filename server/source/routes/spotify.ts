import express from 'express';
import controller from '../controllers/spotify';
import passport from 'passport';
import passportSpotify from 'passport-spotify';

const router = express.Router();
const SpotifyStrategy = passportSpotify.Strategy;

passport.use(
    new SpotifyStrategy(
        {
            clientID: 'd21affede3984ecea64c0ebaceff41e3',
            clientSecret: '734ebfb934c84261963f5794e5783c9f',
            callbackURL: 'http://localhost:8080/spotify/callback'
        },
        (accessToken, refreshToken, expires_in, profile, done) => {
            console.log('accessToken', accessToken);
            console.log('refreshToken', refreshToken);
            console.log('expires_in', expires_in);
            console.log('profile', profile);
            return done(null, {
                accessToken,
                refreshToken,
                profile
            });
        }
    )
);

router.get('/login', passport.authenticate('spotify', { scope: ['user-read-email', 'user-read-private'] }));
router.get('/callback', passport.authenticate('spotify', { failureRedirect: '/login' }), async (req, res) => {
    res.redirect('http://localhost:3000/Home');
});
router.post('/refresh_token', controller.refreshToken);

export = router;
