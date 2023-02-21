import { Strategy as LocalStrategy } from 'passport-local';
import userController from './controllers/user';
import User from './models/user';
import { compare } from 'bcrypt';

export const initializePassport = (passport: any) => {
    const authenticateUser = async (username: string, password: string, done: any) => {
        console.log('username', username);
        try {
            const user = await User.findOne({ username: username });
            console.log('user', user);
            if (!user) {
                return done(null, false, { message: 'Could not find a user with that email.' });
            }

            console.log('comparing passwords', password, user.password);

            const passwordMatch = await compare(password, user.password);
            console.log('passwordMatch', passwordMatch);
            if (!passwordMatch) {
                return done(null, false, { message: 'Incorrect password.' });
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    };

    passport.use(new LocalStrategy({ usernameField: 'username', passwordField: 'password' }, authenticateUser));
    passport.serializeUser((user: any, done: any) => {
        console.log('serializeUser', user);
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
