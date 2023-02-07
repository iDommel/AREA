import express from 'express';
import controller from '../controllers/time';

const router = express.Router();

router.get('/', controller.getTime);

export = router;
