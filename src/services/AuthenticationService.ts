
export interface WebToken {
    token: string;
    expiry: number;
}

export class AuthenticationService {
  public async login() {
      console.log('Logged in');
  }
  public async logout() {
      console.log('Logged Out');
  }
  private async createToken() {
      return {};
  }
}
