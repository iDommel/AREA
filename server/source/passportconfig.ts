import { Strategy as LocalStrategy, IVerifyOptions } from 'passport-local';
import userController from './controllers/user';
import User from './models/user';
import { compare } from 'bcrypt';
import JWT from 'jsonwebtoken';

type doneFunctionType = (error: any, user?: Express.User | false, options?: IVerifyOptions) => void;
export const initializePassport = (passport: any) => {
    const authenticateUser = async (username: string, password: string, done: doneFunctionType) => {
        try {
            const user = await User.findOne({ username: username });
            if (!user) {
                return done(null, false, { message: 'Could not find a user with that email.' });
            }

            const passwordMatch = await compare(password, user.password);
            if (!passwordMatch) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            const id = JWT.sign({}, 'secret', {
                algorithm: 'HS256',
                expiresIn: '2 days',
                subject: user._id.toString()
            });
            const finalUser = {
                user: user._id.toString(),
                token: id
            };
            return done(null, finalUser, { message: 'Logged in successfully.' });
        } catch (error) {
            return done(error, false, { message: 'Could not log in.' });
        }
    };

    passport.use(new LocalStrategy({ usernameField: 'username', passwordField: 'password' }, authenticateUser));
    passport.serializeUser((user: any, done: any) => {
        return done(null, user);
    });

    passport.deserializeUser((id: any, done: any) => {
        return done(null, async (user: any) => {
            try {
                const bob = await User.findById(user._id);
                done(null, bob);
            } catch (error) {
                done(error);
            }
        });
    });
};
