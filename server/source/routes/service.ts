import express from 'express';
import controller from '../controllers/service';

const router = express.Router();

router.get('/:id', controller.getService);
router.patch('/:id', controller.updateService);
router.delete('/:id', controller.deleteService);
router.post('/', controller.createService);
router.get('/', controller.getServices);

export = router;
