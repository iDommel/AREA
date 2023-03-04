import express from 'express';
import controller from '../controllers/weather';

const router = express.Router();

router.get('/', controller.getWeather);
router.get("/login", controller.login);
router.get("/logout", controller.logout);

export = router;
