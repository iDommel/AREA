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

const clientID = process.env.SPOTIFY_CLIENT_ID as string;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET as string;
const Home = process.env.WEB_HOSTNAME as string;
const Port = process.env.WEB_PORT as string;

passport.use(
    new SpotifyStrategy(
        {
            clientID,
            clientSecret,
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
            const service = await Service.findOne({ _id: serviceStatus.service });
            service.route = "/spotify/logout"
            service.save();
            serviceStatus.isConnected = true;
            serviceStatus.save();
            return done(null, {
                id,
                accessToken,
                refreshToken
            });
        }
    )
);

router.get('/login', passport.authenticate('spotify', { scope: ['user-read-email', 'user-read-private', 
'playlist-modify-private', 'playlist-modify-public', 'user-read-currently-playing', 'user-read-currently-playing'] }));
router.get('/callback', passport.authenticate('spotify', { failureRedirect: '/login' }), async (req, res) => {
    res.redirect('http://' + Home + ':' + Port + '/');
});
router.post('/refresh_token', controller.refreshToken);
router.get('/ifPlaying', controller.ifPlaying);
router.get('/logout', controller.logout);

export = router;
