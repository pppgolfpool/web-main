import { inject } from 'aurelia-framework';
import { PickClient } from './pickClient';

@inject(PickClient)
export class EmergencyPickCustomElement {
  constructor(pc: PickClient) {
    this.pickClient = pc;
  }

  private readonly pickClient: PickClient;
  private golfersDataForUser: Object;
  private profiles: Array<Object>;
  private selectedProfile: Object;
  private selectedGolfer: Object;
  private tournament: Object;
  private golfers: Object;

  async attached() {
    this.profiles = await this.pickClient.getProfiles();
  }

  async loadGolfers(){
    if(!this.selectedProfile){
      return;
    }
    this.golfersDataForUser = await this.pickClient.getCurrentPickInfo();
    this.tournament = <Object>this.golfersDataForUser["Tournament"];
    this.golfers = <Array<Object>>this.golfersDataForUser["Golfers"];
  }

  async submit(){
    if(!this.selectedProfile || !this.selectedGolfer){
      return;
    }
    let response = await this.pickClient.emergencyPick(
      <string>this.selectedGolfer["TournamentPlayerId"], <string>this.selectedGolfer["PlayerName"],
      <string>this.selectedProfile["Email"], <string>this.selectedProfile["UserId"]);
    
  }

}