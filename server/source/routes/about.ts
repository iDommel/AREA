import express from 'express';
import controller from '../controllers/about';

const router = express.Router();

router.get('/', controller.getAboutFile);

export = router;
