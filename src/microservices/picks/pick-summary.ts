import { inject } from 'aurelia-framework';
import { PickClient } from './pickClient';

@inject(PickClient)
export class PickSummary {
  constructor(pc: PickClient) {
    this.pickClient = pc;
  }

  private readonly pickClient: PickClient;
  private picks: Object;

  async attached(){
    this.picks = await this.pickClient.getPickSummary();
  }

}

