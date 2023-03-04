import express from 'express';
import controller from '../controllers/time';

const router = express.Router();

router.get("/login", controller.login);
router.get("/logout", controller.logout);
router.get('/', controller.getTime);

export = router;
