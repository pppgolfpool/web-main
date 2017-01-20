import { inject } from 'aurelia-framework';
import { StatsClient } from '../statsClient';

@inject(StatsClient)
export class MonthlyStatsCustomElement {
  constructor(sc: StatsClient) {
    this.statsClient = sc;
  }

  private readonly statsClient: StatsClient;
  private poolies: Array<Object>;
  private currentMonth: number;
  private monthNames: Array<string>;

  async attached() {
    await this.getData();
    window.setTimeout(() => {
      (<any>$('#monthtable')).dataTable(this.getTableConfig());
      (<any>$('input')).addClass("form-control input-sm");
    }, 1000);
  }

  async getData() {
    let data = await this.statsClient.getMonthlyStats();
    this.poolies = <Array<Object>>data;
    this.currentMonth = (<Array<number>>this.poolies[0]["Points"]).length;
    this.monthNames = [];
    for(var i = 0; i < this.currentMonth; i++){
      this.monthNames.push(this.getMonthName(i + 1));
    }
  }

  getMonthName(month: number): string {
    let date = new Date(`2000-${month}-01`);
    let locale = 'en-us';
    return date.toLocaleString(locale, { month: "long" });
  }

  getTableConfig() {
    let columnDefs = [
      { type: 'string' }
    ]
    for (var i = 0; i < this.currentMonth; i++) {
      columnDefs.push({ type: 'num' });
    }

    return {
      columnDefs: columnDefs,
      order: [[this.currentMonth, 'desc']],
      paging: false,
      info: false
    };
  }

}