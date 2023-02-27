import express from 'express';
import controller from '../controllers/spotify';
import passport from 'passport';
import passportSpotify from 'passport-spotify';
import User from '../models/user';
import config from '../config/config';

const router = express.Router();
const SpotifyStrategy = passportSpotify.Strategy;

passport.use(
    new SpotifyStrategy(
        {
            clientID: config.spotify.client_id,
            clientSecret: config.spotify.client_secret,
            callbackURL: 'http://localhost:8080/spotify/callback',
            passReqToCallback: true
        },
        async (req: any, accessToken: string, refreshToken: string, expires_in: number, profile: passportSpotify.Profile, done: passportSpotify.VerifyCallback) => {
            console.log('accessToken', accessToken);
            console.log('refreshToken', refreshToken);
            console.log('expires_in', expires_in);
            console.log('profile', profile);
            console.log('cookies', req.cookies);

            const user = await User.findById(profile.id);
            if (!user) {
                return done(Error('User not found'));
            }
            user.services = [{ name: 'spotify', accessToken, refreshToken }];
            user.save();
            return done(null, {
                id: user._id
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
