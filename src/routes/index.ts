import {Request, Response, Router} from 'express';
import {Loggifyr, LogLevel} from '../Utils/Loggifyr';
import {AttendRouter} from './AttendsRoutes';
import {ClassOfferingRouter} from './ClassOfferingRoutes';
import {EventsRouter} from './EventsRoutes';
import {LoginRouter} from './LoginRoutes';
import {StudentRouter} from './StudentRoutes';

const router: Router = Router();

/*
 * Health Check - no actual check of the health but easy to ping for uptime
 */
router.get('/_health', async (req: Request, res: Response) => {
  await Loggifyr.log('Health Check initiated', LogLevel.DEBUG);
  return res.status(200).send({
    code: 200,
    message: 'Healthy',
  });
});

/**
 * Imports routes for available Student entity actions
 * URL Prefix: /students
 */
router.use('/students', StudentRouter);

/**
 * Imports routes for available ClassOffering entity actions
 * URL Prefix: /class_offerings
 */
router.use('/class_offerings', ClassOfferingRouter);

/**
 * Imports routes for available Attend entity actions
 * URL Prefix: /attend
 */
router.use('/attend', AttendRouter);

/**
 * Imports routes for available Event entity actions
 * URL Prefix: /events
 */
router.use('/events', EventsRouter);

/**
 * Imports route for authentication
 * URL Prefix: /login
 */
router.use('/login', LoginRouter);

/**
 * Catch-all route - If it doesn't match the above, throw a 405
 */
router.get('*', async (req: Request, res: Response) => {
  await Loggifyr.log(`Invalid URL requested: ${req.url}`, LogLevel.ERROR);
  res.sendStatus(405);
});

export const MainRoutes: Router = router;
