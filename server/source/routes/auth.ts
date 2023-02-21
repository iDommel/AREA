import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import userController from '../controllers/user';
const router = express.Router();

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
        'local',
        {
            failureFlash: false
        },
        function (err: any, user: any, info: any, status: any) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(400).json({
                    message: 'Could not log in user'
                });
            }
            res.redirect('http://localhost:3000/Home');
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

export = router;
