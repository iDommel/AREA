import express from 'express';
import controller from '../controllers/weather';

const router = express.Router();

router.get('/', controller.getWeather);

export = router;
