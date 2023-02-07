import express from 'express';
import controller from '../controllers/action';

const router = express.Router();

router.get('/:id', controller.getAction);
router.patch('/:id', controller.updateAction);
router.delete('/:id', controller.deleteAction);
router.post('/', controller.createAction);
router.get('/', controller.getActions);

export default router;
