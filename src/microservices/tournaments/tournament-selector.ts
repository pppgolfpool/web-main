import { inject } from 'aurelia-framework';
import { TournamentsClient } from './tournamentsClient';
import { EventService } from '../../resources/services/eventService';

@inject(TournamentsClient, EventService)
export class TournamentSelector{
  constructor(tournamentsClient, eventService){
    this.tournamentsClient = tournamentsClient;
    this.eventService = eventService;
  }

  private readonly tournamentsClient: TournamentsClient;
  private readonly eventService: EventService;
  private tournaments: Array<Object>;
  private selectedTournament: Object;

  async attached(){
    this.tournaments = await this.tournamentsClient.getAvailableTournaments();
  }

  async tournamentChanged(){
    this.eventService.publish('tournamentChanged', this.selectedTournament);
  }

}