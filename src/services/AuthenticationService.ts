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
        console.log('middleware');
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
      // TODO: This should probably return a role vs the username when this is successful
      const payload: TokenPayload = {
          id: user.id,
          username: user.username,
      };
      return jwt.sign({payload}, process.env.JWT_SECRET, { expiresIn: '30m' });
  }
}
