import { bindable } from 'aurelia-framework';

export class PoolTableCustomElement {

  constructor() {
  }

  @bindable tableId: string;
  @bindable config: Object;
  @bindable data: Array<Object>;

  attached() {
    window.setTimeout(() => {
      console.log(this.tableId);
      (<any>$(`#${this.tableId}`)).dataTable(this.config);
      (<any>$('input')).addClass("form-control input-sm");
    }, 2000);
  }
}

export class PoolTableConfig {
  Paging: boolean;
  Info: boolean;
  Order: Array<PoolTableOrderDef>;
  ColumnDefs: Array<PoolTableColumnDef>
}

export class PoolTableColumnDef {
  Type: PoolTableAtomicType;
}

export class PoolTableOrderDef {
  ColumnNumber: number;
  OrderBy: PoolTableOrderDef;
}

export type PoolTableAtomicType =
  'num' | 'string';

export type PoolTableOrderType =
  'asc' | 'desc';

export class TableKeysValueConverter {
  toView(value) {
    if(!value){
      return [''];
    }
    return Object.keys(value);
  }
}

export class TableValuesValueConverter {
  toView(obj) {
    if(!obj){
      return [''];
    }
    let temp = [];
    for (let prop in obj) {
      temp.push(obj[prop]);
    }
    return temp;
  }
}