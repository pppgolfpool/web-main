import { inject } from 'aurelia-framework';
import { StatsClient } from '../statsClient';

@inject(StatsClient)
export class CurrentStatsCustomElement {
  constructor(sc: StatsClient) {
    this.statsClient = sc;
  }

  private readonly statsClient: StatsClient;
  private tournament: Object = null;
  private course: Object = {};
  private golfers: Array<any> = [];
  private poolies: Array<any> = [];
  private golfersConfig: Object;
  private pooliesConfig: Object;
  private maxPoints: number;

  async attached() {
    await this.getData();
    window.setTimeout(() => {
      (<any>$('#pooliestable')).dataTable(this.getPooliesConfig());
      (<any>$('#golferstable')).dataTable(this.getGolfersConfig());
      (<any>$('input')).addClass("form-control input-sm");
    }, 1000);

  }

  async getData() {
    this.tournament = await this.statsClient.getTournamentStats();
    this.course = this.tournament["Course"];
    this.poolies = <Array<any>>this.tournament["Poolies"];
    this.golfers = <Array<any>>this.tournament["Golfers"];
    let points = [];
    this.golfers.forEach(golfer => {
      points.push(golfer.Points);
    });
    this.maxPoints = Math.max.apply(null, points);
  }

  getPooliesConfig() {
    return {
      columnDefs: [
        { type: "num" },
        { type: "num" },
        { type: "string" },
        { type: "string" }
      ],
      order: [[1, 'asc']],
      paging: false,
      info: false
    };
  }

  getGolfersConfig() {
    return {
      columnDefs: [
        { type: "string" },
        { type: "num" },
        { type: "num" },
        { type: "num" },
        { type: "num" },
        { type: "num" }
      ],
      order: [[1, 'desc']],
      paging: false,
      info: false
    };
  }
}