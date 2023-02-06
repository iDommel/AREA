import express from 'express';
import controller from '../controllers/spotify';

const router = express.Router();

router.post('/login', controller.loginFunction);
router.get('/callback', controller.callbackFunction);
router.post('/refresh_token', controller.refreshToken);

export = router;
