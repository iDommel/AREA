import express from 'express';
import controller from '../controllers/service';

const router = express.Router();

router.post('/', controller.createService);
router.get('/', controller.getServices);
router.get('/:id', controller.getService);
router.patch('/:id', controller.updateService);
router.delete('/:id', controller.deleteService);

export = router;
