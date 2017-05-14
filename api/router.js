import { Router } from 'express';
import SessionsController from './controllers/sessions';
import EventsController from './controllers/events';

const router = Router();

router.post('/session', SessionsController.create);
router.get('/events', EventsController.index);

export default router;
