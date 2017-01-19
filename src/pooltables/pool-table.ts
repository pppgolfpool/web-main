import { bindable } from 'aurelia-framework';

export class PoolTableCustomElement {

  constructor() {
    this.id = this.generateRandomeId();
  }

  private id: string;
  @bindable data: Array<Object>;

  attached() {
    window.setTimeout(() => {
      (<any>$(`#${this.id}`)).dataTable({
        paging: false,
        info: false
      });
      (<any>$('input')).addClass("form-control input-sm");
    }, 1000);
  }


  generateRandomeId() : string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}

export class TableKeysValueConverter {
  toView(value) {
    return Object.keys(value);
  }
}

export class TableValuesValueConverter {
  toView(obj) {
    let temp = [];
    for (let prop in obj) {
      temp.push(obj[prop]);
    }
    return temp;
  }
}