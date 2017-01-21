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

  private readonly serviceUrl: string = "https://ppppoolpicksservice.azurewebsites.net"
  private readonly restService: RestService;
  private readonly authService: AuthService;

  async getCurrentPickInfo(userId: string = null): Promise<Object> {
    let response = await this.restService.post(`${this.serviceUrl}/api/getGolfers`, userId ? { userId: userId } : null, {
      Authorization: `Bearer ${this.authService.getWebToken().authToken}`
    });
    return response.Data;
  }

  async getPickForCurrent(tournamentIndex: string): Promise<Object> {
    let response = await this.restService.post(`${this.serviceUrl}/api/getPicks`, {
      season: 'current', tour: 'PGA TOUR', tournamentIndex: tournamentIndex, user: 'true'
    }, {
        Authorization: `Bearer ${this.authService.getWebToken().authToken}`
      });
    return response.Data;
  }

  async pickGolfer(playerId: string, playerName: string) {
    let response = await this.restService.post(`${this.serviceUrl}/api/pickGolfer`, {
      tour: 'PGA TOUR', playerId: playerId, playerName: playerName
    }, {
        Authorization: `Bearer ${this.authService.getWebToken().authToken}`
      });
    return response.Data;
  }

  async emergencyPick(playerId: string, playerName: string, email: string, userId: string) {
    let response = await this.restService.post(`${this.serviceUrl}/api/emergencyPick`, {
      tour: 'PGA TOUR', playerId: playerId, playerName: playerName, email: email, userId: userId
    }, {
        Authorization: `Bearer ${this.authService.getWebToken().authToken}`
      });
  }

  async getUsers(): Promise<any> {
    let response = await this.restService.post(`${this.serviceUrl}/api/getUsers`, null, {
        Authorization: `Bearer ${this.authService.getWebToken().authToken}`
      });
    return response.Data;
  }
}