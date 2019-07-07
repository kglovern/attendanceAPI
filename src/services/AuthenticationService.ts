import {compare} from 'bcrypt';
import {NextFunction, Request, Response} from 'express';
import * as jwt from 'jsonwebtoken';
import User from '../models/UserModel';

export interface CredentialSet {
    username: string;
    password: string;
}

export interface TokenPayload {
    id: number;
    username: string;
}

export interface AuthenticationResponse {
    authenticated: boolean;
    message: string;
    payload?: object;
}

export class AuthenticationService {
    public static async isAuthorized(req: Request, res: Response, next: NextFunction) {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];

        if (token) {
            const result = await jwt.verify(token, process.env.JWT_SECRET);
            console.log(result);
            if (result) {
                // TODO: Add required info to request
                next();
            }
            return res.status(401)
                .send({
                   error: true,
                   message: 'Unable to validate token',
                });
        }
        return res.status(401)
            .send({
               error: true,
                message: 'Must be authenticated to use this route',
            });
    }
  public async login(credentials: CredentialSet): Promise<AuthenticationResponse> {
      const user = await User.query()
          .where('username', credentials.username)
          .first();
      if (!user) {
          return {
              authenticated: false,
              message: 'User not found',
          };
      } else {
        const result = await compare(credentials.password, user.password);
        if (result) {
            const token = await this.createToken(user);
            return {
                authenticated: true,
                message: 'Successfully logged in',
                payload: {
                    id: user.id,
                    token,
                    user: user.username,
                },
            };
        } else {
            return {
                authenticated: false,
                message: 'Invalid Password',
            };
        }
      }
  }
  private async createToken(user: User): Promise<string> {
      // TODO: This should probably return a role vs the username when roles are implemented
      const payload: TokenPayload = {
          id: user.id,
          username: user.username,
      };
      return jwt.sign({payload}, process.env.JWT_SECRET, { expiresIn: '30m' });
  }
}
