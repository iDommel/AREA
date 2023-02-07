import express from 'express';
import controller from '../controllers/reaction';

const router = express.Router();

router.get('/:id', controller.getReaction);
router.patch('/:id', controller.updateReaction);
router.delete('/:id', controller.deleteReaction);
router.post('/', controller.createReaction);
router.get('/', controller.getReactions);

export default router;
