import { inject } from 'aurelia-dependency-injection';
import { HttpClient } from 'aurelia-fetch-client';
import { EventService } from './resources/services/eventService';

@inject(HttpClient, EventService)
export class App {
  constructor(http: HttpClient, eventService: EventService) {
    this.http = http;
    this.eventService = eventService;
    eventService.subscribe('response', (data) => {

    });
  }

  http: HttpClient;
  eventService: EventService;

  async activate() {
    let response = await this.http.fetch("https://jsonplaceholder.typicode.com/posts/1")
    window.setTimeout(() => {
      console.log($('#main'));
      (<any>$('#main')).dataTable({
        paging: false,
        info: false
      });
      (<any>$('input')).addClass("form-control input-sm");
    }, 2000);
  }
  message = 'Hello World!';
}
