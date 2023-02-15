import express from 'express';
import controller from '../controllers/github';

const router = express.Router();

router.get('/issues', controller.get_issues);
router.post('/issues/create', controller.create_issue);

export = router;