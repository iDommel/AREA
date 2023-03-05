import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import querystring from 'querystring';
import axios from 'axios';
import User from '../models/user';
import { getUserIdFromCookie } from '../utils/utils';
import SpotifyWebApi from 'spotify-web-api-node';
import ServiceStatus from '../models/serviceStatus';
import Service from '../models/service';

let client_id = 'd21affede3984ecea64c0ebaceff41e3'; // Your client id
let client_secret = '734ebfb934c84261963f5794e5783c9f'; // Your secret
let endpoint = 'http://localhost:8080';
let redirect_uri = `${endpoint}/spotify/callback`; // Your redirect uri

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
let generateRandomString = function (length: number) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

let stateKey = 'spotify_auth_state';

const loginFunction = (req: Request, res: Response, next: NextFunction) => {
    let state = generateRandomString(16);
    res.cookie(stateKey, state);

    res.set('Access-Control-Allow-Origin', req.headers.origin || '*');
    console.log('headers', req.headers);

    // your application requests authorization
    let scope = 'user-read-private user-read-email';
    const url =
        'https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        });
    res.send({ url });
};

const callbackFunction = async (req: Request, res: Response, next: NextFunction) => {
    // your application requests refresh and access tokens
    // after checking the state parameter

    let code = req.query.code || null;
    let state = req.query.state || null;
    let storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
        res.redirect(
            '/#' +
                querystring.stringify({
                    error: 'state_mismatch'
                })
        );
    } else {
        res.clearCookie(stateKey);
        let authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            data: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                Authorization: 'Basic ' + new Buffer(client_id + ':' + client_secret).toString('base64')
            }
        };

        try {
            const response = await axios.post(authOptions.url, authOptions.data, { headers: authOptions.headers });
            if (response.status === 200) {
                let access_token = response.data.access_token,
                    refresh_token = response.data.refresh_token;

                let options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: { Authorization: 'Bearer ' + access_token }
                };

                axios.get(options.url, { headers: options.headers }).then(function (response) {
                    console.log(response.data);
                });

                res.redirect(
                    '/#' +
                        querystring.stringify({
                            access_token: access_token,
                            refresh_token: refresh_token
                        })
                );
            } else {
                res.redirect(
                    '/#' +
                        querystring.stringify({
                            error: 'invalid_token'
                        })
                );
            }
        } catch (error) {
            console.log(error);
        }
    }
};

const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    // requesting access token from refresh token
    let refresh_token = req.query.refresh_token;
    let authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: { Authorization: 'Basic ' + new Buffer(client_id + ':' + client_secret).toString('base64') },
        data: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        }
    };

    try {
        const response = await axios.post(authOptions.url, authOptions.data, { headers: authOptions.headers });
        if (response.status === 200) {
            let access_token = response.data.access_token;
            res.send({
                access_token: access_token
            });
        }
    } catch (error) {
        console.error(error);
    }
};

type ActionType = {
    _id: string;
    name: string;
    description: string;
};

let spotifyApi = new SpotifyWebApi({
    clientId: 'd21affede3984ecea64c0ebaceff41e3',
    clientSecret: '734ebfb934c84261963f5794e5783c9f',
    redirectUri: 'http://localhost:3000/Home'
});

type ServiceType = {
    name: string;
    accessToken: string;
    refreshToken: string;
};

const spotifyReaction = async (relativeUser: string, newName: string) => {
    try {
        const serviceStatus = await ServiceStatus.findOne({ user: relativeUser, serviceName: 'Spotify' });
        if (!serviceStatus) return;
        spotifyApi.setAccessToken(serviceStatus.auth.accessToken);
        const res = await spotifyApi.changePlaylistDetails('4MaF7XxeJ4JTJ5dZPATfGO', {
            name: newName,
            public: false
        });
        console.log('Playlist is now private!');
    } catch (error: any) {
        console.log('Something went wrong!', error);
    }
};

const ifPlaying = async (relativeUser: string) => {
    try {
        const serviceStatus = await ServiceStatus.findOne({ user: relativeUser, serviceName: 'Spotify' });
        if (!serviceStatus) return;
        spotifyApi.setAccessToken(serviceStatus.auth.accessToken);

        const res = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: {
                contentType: 'application/json',
                Authorization: 'Bearer ' + serviceStatus.auth.accessToken
            }
        });
        const isPlaying = res.data.is_playing;
        if (isPlaying) {
            return true
        }
        return false
    } catch (error: any) {
        console.log('Something went wrong!', error);
    }
};  

const logout = async (req: Request, res: Response) => {
    try {
        const logout = await ServiceStatus.findOne({ serviceName: 'Spotify', user: getUserIdFromCookie(req)});
        logout.isConnected = false;
        logout.auth = null;
        const service = await Service.findOne({ _id: logout.service });
        service.route = "/spotify/login"
        logout.save();
        service.save();
        res.redirect('http://localhost:3000/Home');
    } catch (error) {
        console.log(error);
    }
}


export default { loginFunction, callbackFunction, refreshToken, spotifyReaction, ifPlaying, logout };
