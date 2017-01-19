import { inject } from 'aurelia-framework';
import { StatsClient } from '../statsClient';

@inject(StatsClient)
export class CurrentStatsCustomElement {
  constructor(sc: StatsClient) {
    this.statsClient = sc;
    this.golfersConfig = this.getGolfersConfig();
    this.pooliesConfig = this.getPooliesConfig();
  }

  private readonly statsClient: StatsClient;
  private golfersData: Array<any> = [];
  private pooliesData: Array<any> = [];
  private golfersConfig: Object;
  private pooliesConfig: Object;

  async attached() {
    await this.getData();
  }

  async getData(){
    let tournament = await this.statsClient.getTournamentStats();
    this.pooliesData = this.getPooliesFromData(tournament);
    this.golfersData = this.getGolfersFromData(tournament);
    console.log(this.golfersData);
  }

  getPooliesFromData(tournament: Object): Array<any>{
    let poolies = <Array<any>>tournament["Poolies"];
    let select : Array<any> = [];
    poolies.forEach((element,index) => {
      select.push({
        "Start Rank": element.Rank,
        "Curr. Rank": element.ProjectedRank,
         Poolie: element.LastFirst,
         Golfer: element.GolferName,
      })
    });
    return select;
  }

  getGolfersFromData(tournament: Object): Array<any>{
    let golfers = <Array<any>>tournament["Golfers"];
    let select : Array<any> = [];
    golfers.forEach((element,index) => {
      select.push({
        Name: element.Name,
        "Pick Count": element.PickCount,
         Position: element.Rank,
         Par: element.ParTotal,
         Thru: element.Thru,
         Points: element.Points
      })
    });
    return select;
  }

  getPooliesConfig(){
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
      order: [[2, 'desc']],
      paging: false,
      info: false
    };
  }
}