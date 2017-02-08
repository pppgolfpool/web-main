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
  private subPicks: Object;
  @observable search: string;

  async attached() {
    this.picks = await this.pickClient.getPickSummary();
    this.subPicks = this.picks;
  }

  searchChanged() {
    if(this.search === ''){
      this.subPicks = this.picks;
      return;
    }
    this.subPicks = {};
    let names = Object.getOwnPropertyNames(this.picks);
    for(let rawName of names){
      let name = rawName.substr(0, rawName.indexOf(':'))
      if(name.toLowerCase().includes(this.search.toLowerCase())){
        this.subPicks[rawName] = this.picks[rawName];
      }
    }
  }
}

