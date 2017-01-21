import { inject } from 'aurelia-dependency-injection';
import { RestService } from '../../resources/services/restService';
import { LogManager } from 'aurelia-framework';
import { AuthService } from '../../resources/services/authService';
let log = LogManager.getLogger('pickClient');

@inject(RestService, AuthService)
export class PickClient {
  constructor(restService: RestService, authService: AuthService) {
    this.restService = restService;
    this.authService = authService;
  }

  private readonly serviceUrl: string = "https://ppppooluserservice.azurewebsites.net"
  private readonly restService: RestService;
  private readonly authService: AuthService;

  async setProfile(profileData: Object): Promise<Object> {
    let response = await this.restService.post(`${this.serviceUrl}/api/setProfile`, null, {
        Authorization: `Bearer ${this.authService.getWebToken().authToken}`
      }, profileData);
    return response.Data;
  }

  // key/value can be userId, name, or email. 'all' ignores value.
  async getProfile(key: string = 'all', value: string): Promise<Object> {
    let response = await this.restService.post(`${this.serviceUrl}/api/getProfile`, {
      key: key, value: value
    }, {
        Authorization: `Bearer ${this.authService.getWebToken().authToken}`
      });
    return response.Data;
  }

  async getRegistration(){
    let response = await this.restService.post(`${this.serviceUrl}/api/getRegistration`, null, {
        Authorization: `Bearer ${this.authService.getWebToken().authToken}`
      });
    return response.Data;    
  }
}