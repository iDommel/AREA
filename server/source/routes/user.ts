import express from 'express';
import controller from '../controllers/user';

const router = express.Router();

router.get('/templogin', controller.tempLogin);
router.get('/:id', controller.getUser);
router.patch('/:id', controller.updateUser);

router.get('/', controller.getAllUsers);
router.post('/', controller.createUser);

export = router;
