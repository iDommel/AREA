import express from 'express';
// import controller from '../controllers/github';
import passport from 'passport';
import User from '../models/user';

const router = express.Router();
const passportGitLab = require('passport-gitlab2');
const GitLabStrategy = passportGitLab.Strategy;

const clientID = process.env.GITLAB_APP_ID as string;
const clientSecret = process.env.GITLAB_APP_SECRET as string;

passport.use(new GitLabStrategy ({
    clientID,
    clientSecret,
    callbackURL: "http://localhost:3000/gitlab/callback"
  },
    async (accessToken: string, refreshToken: string, profile: passportGitLab.Profile, done: (err: any, user?: any) => void) => {
    User.findOrCreate({gitlabId: profile.id}, function (err, user) {
      return cb(err, user);
    });
  }
));