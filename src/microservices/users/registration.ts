import { inject } from 'aurelia-framework';
import { UsersClient } from './usersClient';

@inject(UsersClient)
export class RegistrationCustomElement {
  constructor(uc: UsersClient) {
    this.usersClient = uc;
  }

  private readonly usersClient: UsersClient;
  private registrations: Array<Object>;

  async attached() {
    this.registrations = await this.usersClient.getRegistration();
    window.setTimeout(() => {
      (<any>$('#regtable')).dataTable(this.getRegTableConfig());
      (<any>$('input')).addClass("form-control input-sm");
    }, 1000);
  }

  getRegTableConfig() {
    return {
      columnDefs: [
        { type: "string" },
        { type: "string" },
        { type: "num" }
      ],
      order: [[0, 'asc']],
      paging: false,
      info: false
    };
  }

}