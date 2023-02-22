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
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(400).json({
                    message: 'Could not log in user'
                });
            }
            const id = JWT.sign({}, "secret", {
                algorithm: 'HS256',
                expiresIn: 120,
                subject: user._id.toString()
            });
            console.log("header", id);
            // res.setHeader('Authorization', "Bearer " + id);
            res.status(200).json({
                token: id,
                redirect: 'http://localhost:3000/Home/'
            })
            // res.set('X-My-Custom-Header', "Bearer " + id).status(200).send();
            // res.set({"Authorization": "Bearer " + id});
            // res.send("marche");
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
