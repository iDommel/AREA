import express from 'express';
import controller from '../controllers/spotify';
import passport from 'passport';
import passportSpotify from 'passport-spotify';
import User from '../models/user';

const router = express.Router();
const SpotifyStrategy = passportSpotify.Strategy;

passport.use(
    new SpotifyStrategy(
        {
            clientID: 'd21affede3984ecea64c0ebaceff41e3',
            clientSecret: '734ebfb934c84261963f5794e5783c9f',
            callbackURL: 'http://localhost:8080/spotify/callback'
        },
        async (accessToken, refreshToken, expires_in, profile, done) => {
            console.log('accessToken', accessToken);
            console.log('refreshToken', refreshToken);
            console.log('expires_in', expires_in);
            console.log('profile', profile);

            const user = await User.findById('63e1714e0670f95f5af133f7');

            user.services = [{ name: 'spotify', accessToken, refreshToken }];
            user.save();
            return done(null, {
                accessToken,
                refreshToken,
                profile
            });
        }
    )
);

router.get('/login', passport.authenticate('spotify', { scope: ['user-read-email', 'user-read-private', 'playlist-modify-private', 'playlist-modify-public'] }));
router.get('/callback', passport.authenticate('spotify', { failureRedirect: '/login' }), async (req, res) => {
    res.redirect('http://localhost:3000/Home');
});
router.post('/refresh_token', controller.refreshToken);

export = router;
