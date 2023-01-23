import express from 'express';
import controller from '../controllers/mobile-apk';

const router = express.Router();

router.get('/download', controller.getApk);
router.get('/', controller.test);

export = router;
