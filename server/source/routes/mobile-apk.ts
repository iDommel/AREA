import express from 'express';
import controller from '../controllers/mobile-apk';

const router = express.Router();

router.get('/', controller.getApk);

export = router;
