import { inject } from 'aurelia-dependency-injection';
import { RestService } from '../../resources/services/restService';
import { LogManager } from 'aurelia-framework';
import { AuthService } from '../../resources/services/authService';
let log = LogManager.getLogger('statsClient');

@inject(RestService, AuthService)
export class TournamentsClient {
  constructor(restService: RestService, authService: AuthService) {
    this.restService = restService;
    this.authService = authService;
  }

  private readonly serviceUrl: string = "https://ppppooltournamentservice.azurewebsites.net"
  private readonly restService: RestService;
  private readonly authService: AuthService;

  async getSeason(): Promise<Object> {
    let response = await this.restService.post(`${this.serviceUrl}/api/Season`, {
      Authorization: `Bearer ${this.authService.getWebToken().authToken}`
    });    
    return response.Data;
  }

  async getTournaments(
    season: string = 'current',
    tour: string = 'PGA TOUR',
    key: string = "all"
    ): Promise<Object>{
      let response = await this.restService.post(`${this.serviceUrl}/api/getTournaments`, {
        season: season, tour: tour, key: key
      }, {
        Authorization: `Bearer ${this.authService.getWebToken().authToken}`
      });
      return response.Data;
    }

  async getAvailableTournaments() : Promise<Array<Object>>{
    let tournaments = <Array<Object>>await this.getTournaments();
    let filtered = [];
    for(let tournament of tournaments){
      if(tournament["Used"] && tournament["State"] != 'future'){
        filtered.push(tournament);
      }
    }
    return filtered;
  }
}