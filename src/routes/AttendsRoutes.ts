import { Request, Response, Router } from 'express';
import {AttendController} from '../controllers/AttendController';

const router: Router = Router();

router.get('/', AttendController.getAllAttends);

router.get('/:barcode', AttendController.getAttendsByUPC);

router.get('/:day/:month/:year', AttendController.getAttendsByDate);

router.post('/', AttendController.createAttend);

export const AttendRouter: Router = router;
