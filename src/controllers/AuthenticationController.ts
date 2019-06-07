import {Request, Response} from 'express';
import {AuthenticationService, CredentialSet} from '../services/AuthenticationService';

export class AuthenticationController {
    public static async login(req: Request, res: Response): Promise<Response> {
        const credentials: CredentialSet = req.body;
        const authenticationInstance = new AuthenticationService();
        const authResponse = await authenticationInstance.login(credentials);
        if (!authResponse.authenticated) {
            return res.status(401)
                .send(authResponse);
        }
        return res.send(authResponse);
    }
}
