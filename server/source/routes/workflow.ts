import express from 'express';
import controller from '../controllers/workflow';

const router = express.Router();

router.post('/create', controller.createWorkflow);
router.get('/get/workflows', controller.getAllWorkflow);

export = router;
