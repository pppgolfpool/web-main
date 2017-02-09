import { inject } from 'aurelia-framework';
import { PickClient } from './pickClient';
import { observable } from 'aurelia-framework';

@inject(PickClient)
export class PickSummary {
  constructor(pc: PickClient) {
    this.pickClient = pc;
  }

  private readonly pickClient: PickClient;
  private picks: Object;
  private pooliePicks: Object;
  private golferPicks: Object;
  @observable search: string = '';
  @observable golfer: string = '';

  async attached() {
    this.picks = await this.pickClient.getPickSummary();
    this.pooliePicks = this.picks;
    this.golferPicks = this.pooliePicks;
    console.log(this.picks);
  }

  searchChanged() {
    if (this.search === '') {
      this.pooliePicks = this.picks;
      this.golferPicks = this.pooliePicks;
    } else {
      this.pooliePicks = {};
      let names = Object.getOwnPropertyNames(this.picks);
      for (let rawName of names) {
        let name = rawName.substr(0, rawName.indexOf(':'))
        if (name.toLowerCase().includes(this.search.toLowerCase())) {
          this.pooliePicks[rawName] = this.picks[rawName];
        }
      }
      this.golferPicks = this.pooliePicks;
    }
    
    if (this.golfer === '') {
      return;
    }
    this.golferPicks = {};
    for (let property in this.pooliePicks) {
      if (this.pooliePicks.hasOwnProperty(property)) {
        let golfers = this.pooliePicks[property] as Array<string>;
        for (let player of golfers) {
          if (player["PlayerName"].toLowerCase().includes(this.golfer.toLowerCase())) {
            this.golferPicks[property] = this.pooliePicks[property];
          }
        }
      }
    }
  }

  golferChanged() {
    this.searchChanged();
  }
}

