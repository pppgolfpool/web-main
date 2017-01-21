import { inject } from 'aurelia-framework';
import { PickClient } from './pickClient';

@inject(PickClient)
export class PicksMainCustomElement {
  constructor(pc: PickClient){
    this.pickClient = pc;
  }

  private readonly pickClient : PickClient;
  private tournament: Object;
  private golfers: Array<Object>;
  private pick: any;
  private selectedPlayer: Object;
  private submitting: boolean = false;

  async attached(){
    let data = await this.pickClient.getCurrentPickInfo();
    this.tournament = data["Tournament"];
    this.golfers = data["Golfers"];
    this.tournament["State"] = 'picking';
    let pickData = await this.pickClient.getPickForCurrent(<string>this.tournament["Index"]);
    if(pickData["empty"]){
      this.pick = 'none';
    } else {
      this.pick = pickData; 
    }
  }

  async submitPick(){
    if(!this.selectedPlayer){
      return;
    }
    this.submitting = true;
    let response = await this.pickClient.pickGolfer(<string>this.selectedPlayer["TournamentPlayerId"], <string>this.selectedPlayer["PlayerName"]);
    console.log(response);
    let pickData = await this.pickClient.getPickForCurrent(<string>this.tournament["Index"]);
    if(pickData["empty"]){
      this.pick = 'none';
    } else {
      this.pick = pickData; 
    }
    this.submitting = false;
  }
}