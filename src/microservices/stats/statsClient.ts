import { inject } from 'aurelia-dependency-injection';
import { RestService } from '../../resources/services/restService';
import { LogManager } from 'aurelia-framework';
import { AuthService } from '../../resources/services/authService';
let log = LogManager.getLogger('authClient');

@inject(RestService, AuthService)
export class StatsClient {
  constructor(restService: RestService, authService: AuthService) {
    this.restService = restService;
    this.authService = authService;
  }

  private readonly serviceUrl: string = "https://ppppoolstatsservice.azurewebsites.net"
  private readonly restService: RestService;
  private readonly authService: AuthService;

  async getTournamentStats(
    season: string = 'current', 
    tour: string = 'PGA TOUR', 
    key: string = 'current', 
    value: string = ''): Promise<Object> {
    let response = await this.restService.post(`${this.serviceUrl}/api/getTournament`, {
      season, tour, key, value
    }, {
      Authorization: `Bearer ${this.authService.getWebToken().authToken}`
    });    
    return response.Data;
  }
}