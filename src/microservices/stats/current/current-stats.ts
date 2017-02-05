import { inject } from 'aurelia-framework';
import { StatsClient } from '../statsClient';
import { EventService } from '../../../resources/services/eventService';

@inject(StatsClient, EventService)
export class CurrentStatsCustomElement {
  constructor(sc: StatsClient, es: EventService) {
    this.statsClient = sc;
    this.eventService = es;
    this.eventService.subscribe('tournamentChanged', async data => {
      console.log(data);
      this.tournament = null;
      if(data == 'Current'){
        await this.getData();
      } else if(data){
        await this.getData(<string>data["Index"]);
      }
      //this.setupTables();
    });
  }

  private readonly statsClient: StatsClient;
  private readonly eventService: EventService;
  private tournament: Object = null;
  private course: Object = {};
  private golfers: Array<any> = [];
  private poolies: Array<any> = [];
  private golfersConfig: Object;
  private pooliesConfig: Object;
  private maxPoints: number;

  async attached() {
    await this.getData();
    this.setupTables();
  }

  setupTables(){
    window.setTimeout(() => {
      (<any>$('#pooliestable')).dataTable(this.getPooliesConfig());
      (<any>$('#golferstable')).dataTable(this.getGolfersConfig());
      (<any>$('input')).addClass("form-control input-sm");
    }, 1000);
  }

  async getData(index: string = null) {
    if(index){
      this.tournament = await this.statsClient.getSpecificTournamentStats(index);
    } else {
      this.tournament = await this.statsClient.getTournamentStats();
    }
    
    this.course = this.tournament["Course"];
    this.poolies = <Array<any>>this.tournament["Poolies"];
    this.golfers = <Array<any>>this.tournament["Golfers"];
    let points = [];
    this.golfers.forEach(golfer => {
      points.push(golfer.Points);
    });
    this.maxPoints = Math.max.apply(null, points);
  }

  padZeros(num, size) {
    var s = "000000000" + num;
    return s.substr(s.length - size);
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
        { type: "string", targets:[0] },
        { type: "num", targets:[1] },
        { type: "num", targets:[2], orderData:[3] },
        { type: "num", targets:[3], visible: false, searchable: false },
        { type: "num", targets:[4] },
        { type: "num", targets:[5] },
        { type: "num", targets:[6] }
      ],
      order: [[1, 'desc']],
      paging: false,
      info: false
    };
  }
}