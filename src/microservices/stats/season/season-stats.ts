import { inject } from 'aurelia-framework';
import { StatsClient } from '../statsClient';

@inject(StatsClient)
export class SeasonStatsCustomElement {
  constructor(sc: StatsClient) {
    this.statsClient = sc;
  }

  private readonly statsClient: StatsClient;
  private poolies: Array<Object>;
  private season: number;
  private week: number;
  private tournamentName: string;

  private maxWins: number;
  private maxTop5: number;
  private maxTop10: number;
  private maxCuts: number;
  private maxPlusMinus: number;

  async attached() {
    await this.getData();
    window.setTimeout(() => {
      (<any>$('#seasontable')).dataTable(this.getTableConfig());
      (<any>$('input')).addClass("form-control input-sm");
    }, 1000);
  }

  async getData() {
    let data = await this.statsClient.getSeasonStats();
    this.week = <number>data["Week"];
    this.season = <number>data["Season"];
    this.tournamentName = <string>data["Tournament"]
    this.poolies = <Array<Object>>data["Poolies"];
    this.getMaxValues();
  }

  getTableConfig(): Object {
    return {
      columnDefs: [
        { type: "num" },
        { type: "num" },
        { type: "string" },
        { type: "num" },
        { type: "num" },
        { type: "num" },
        { type: "num" },
        { type: "num" },
        { type: "num" },
        { type: "num" }
      ],
      order: [[0, 'asc']],
      paging: false,
      info: false
    };
  }

  getMaxValues() {
    let array = [];
    this.poolies.forEach(poolie => {
      if(poolie["Wins"]){
        array.push(poolie["Wins"]);
      }
    });
    this.maxWins = Math.max.apply(null, array);

    array = [];
    this.poolies.forEach(poolie => {
      if(poolie["Top5"]){
        array.push(poolie["Top5"]);
      }
    });
    this.maxTop5 = Math.max.apply(null, array);

    array = [];
    this.poolies.forEach(poolie => {
      if(poolie["Top10"]){
        array.push(poolie["Top10"]);
      }
    });
    this.maxTop10 = Math.max.apply(null, array);

    array = [];
    this.poolies.forEach(poolie => {
      if(poolie["Cuts"]){
        array.push(poolie["Cuts"]);
      }
    });
    this.maxCuts = Math.max.apply(null, array);

    array = [];
    this.poolies.forEach(poolie => {
      if(poolie["PlusMinus"]){
        array.push(poolie["PlusMinus"]);
      }
    });
    this.maxPlusMinus = Math.max.apply(null, array);

  }
}