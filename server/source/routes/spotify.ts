import express from 'express';
import controller from '../controllers/spotify';
import passport from 'passport';
import passportSpotify from 'passport-spotify';
import User from '../models/user';
import config from '../config/config';
import { getUserIdFromCookie } from '../utils/utils';
import ServiceStatus from '../models/serviceStatus';
import Service from '../models/service';
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
            const id = getUserIdFromCookie(req);

            const serviceStatus = await ServiceStatus.findOne({ user: id, serviceName: 'Spotify' });
            if (!serviceStatus) {
                return done(Error('User not found'));
            }

            serviceStatus.auth = {
                accessToken,
                refreshToken,
                expires_in
            };
            serviceStatus.save();
            return done(null, {
                id
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
