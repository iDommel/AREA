import express from 'express';
import controller from '../controllers/workflow';

const router = express.Router();

router.post('/', controller.createWorkflow);
router.get('/', controller.getAllWorkflow);

export = router;
