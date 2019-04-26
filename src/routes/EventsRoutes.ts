import { Request, Response, Router } from 'express';
import {EventController} from '../controllers/EventController';

const router: Router = Router();

router.get('/limit/:limit', EventController.getRecentEvents);

export const EventsRouter: Router = router;
