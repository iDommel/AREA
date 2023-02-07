import serviceStatus from '../controllers/serviceStatus';
import express from 'express';

const router = express.Router();

router.post('/', serviceStatus.createServiceStatus);
router.get('/', serviceStatus.getServiceStatuses);
router.get('/:id', serviceStatus.getServiceStatus);
router.patch('/:id', serviceStatus.updateServiceStatus);
router.delete('/:id', serviceStatus.deleteServiceStatus);

export default router;
