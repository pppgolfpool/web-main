import { inject } from "aurelia-framework";
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class ProgressBarCustomElement {
  constructor(ea) {
    this.ea = ea;
    this.ea.subscribe("request", () => {
      this.show = true;
    });
    this.ea.subscribe("response", () =>{
      this.show = false;
    });
  }

  private show: boolean = false;
  private readonly ea: EventAggregator;
}