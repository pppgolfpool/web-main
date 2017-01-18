import { inject } from 'aurelia-dependency-injection';
import { RestService } from '../../resources/services/restService';
import { LogManager } from 'aurelia-framework';
import { AuthService, WebToken } from '../../resources/services/authService';
let log = LogManager.getLogger('authClient');

@inject(RestService, AuthService)
export class AuthClient {
  constructor(restService: RestService, authService: AuthService) {
    this.restService = restService;
    this.authService = authService;
    this.authService.setAdminRequestCallback(async authToken => {
      let result = await this.authorize("admin", authToken);
      return result;
    });
  }

  private readonly serviceUrl: string = "https://ppppoolauthservice.azurewebsites.net"
  private readonly restService: RestService;
  private readonly authService: AuthService;

  async login(userId, password): Promise<boolean> {
    let response = await this.restService.post(`${this.serviceUrl}/api/login`, {
      userId: userId,
      password: password
    });

    if(!response.IsError){
      let data = response.Data;
      this.authService.login(new WebToken(data["email"], data["authToken"], data["userId"], data["name"]));
    }

    return !response.IsError
  }

  async authorize(role, authToken): Promise<boolean> {
    let response = await this.restService.post(`${this.serviceUrl}/api/authenticate`, {
      role: role,
      authToken: authToken
    });
    return !response.IsError;
  }
}