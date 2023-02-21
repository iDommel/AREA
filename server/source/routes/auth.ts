import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import userController from '../controllers/user';
const router = express.Router();

router.post(
    '/login',
    passport.authenticate('local', {
        successRedirect: 'http://localhost:3000/Home',
        failureRedirect: 'http://localhost:3000/Login',
        failureFlash: false
    })
);
router.post('/register', userController.createUser);

router.get('/logout', (req: Request, res: Response, next: NextFunction) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('http://localhost:3000/Login');
    });
    res.redirect('http://localhost:3000/Login');
});

export = router;
