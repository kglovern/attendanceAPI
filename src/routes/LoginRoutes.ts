import { Request, Response, Router } from 'express';
import {AuthenticationController} from '../controllers/AuthenticationController';

const router: Router = Router();

router.post('/', AuthenticationController.login);

export const LoginRouter: Router = router;
