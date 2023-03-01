import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import userController from '../controllers/user';
import JWT from 'jsonwebtoken';
const router = express.Router();

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
        'local',
        {
            failureFlash: false
        },
        function (err: any, user: any, info: any, status: any) {
            console.log('err', err);
            console.log('user', user);
            console.log('info', info);
            console.log('status', status);
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(400).json({
                    message: info.message || 'Login failed'
                });
            }

            res.status(200).json({
                ...user,
                redirect: '/Home'
            });
        }
    )(req, res, next);
});

router.post('/register', userController.createUser);

router.get('/logout', (req: Request, res: Response, next: NextFunction) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
    });
    res.redirect('http://localhost:3000/Login');
});

router.get('/refresh', (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            message: 'No token provided'
        });
    }
    const decoded = JWT.verify(token, 'secret');
    if (!decoded || !decoded.sub || typeof decoded.sub !== 'string') {
        return res.status(401).json({
            message: 'Invalid token'
        });
    }

    const id = JWT.sign({}, 'secret', {
        algorithm: 'HS256',
        expiresIn: '2 days',
        subject: decoded.sub
    });

    res.status(200).json({
        token: id,
        user: decoded.sub,
        redirect: '/Home'
    });
});

export = router;
