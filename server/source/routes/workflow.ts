import express from 'express';
import controller from '../controllers/workflow';

const router = express.Router();

router.get('/:id', controller.getWorkflow);
router.patch('/:id', controller.updateWorkflow);
router.delete('/:id', controller.deleteWorkflow);
router.post('/', controller.createWorkflow);
router.get('/', controller.getAllWorkflow);
router.get('/services/:id', controller.getRelatedServices);
router.get('/user/:id', controller.getWorkflowbyUser);

export = router;
