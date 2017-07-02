import { Router } from 'express';
import SessionsController from './controllers/sessions';
import EventsController from './controllers/events';

const router = Router();

router.post('/session', SessionsController.create);

router.post('/events', EventsController.create);
router.get('/events/:eventId', EventsController.get);
router.get('/events', EventsController.index);
router.put('/events/:eventId', EventsController.findAndUpdate);

export default router;
