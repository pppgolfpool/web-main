import { inject } from 'aurelia-dependency-injection';
import { EventService } from './resources/services/eventService';
import { RouterService } from './shell/routerService';
import { Router } from 'aurelia-router';

@inject(EventService, Router, RouterService)
export class App {
  constructor(eventService: EventService, router: Router, routerService: RouterService) {
    this.eventService = eventService;
    this.router = router;
    this.routerService = routerService;
    this.data = [
      {
        colOne: 1,
        colTwo: 2,
      },
      {
        colThree: 3,
        colFour: 4
      }
    ]
  }

  eventService: EventService;
  routerService: RouterService;
  router: Router;
  data: any;

  async activate() {
    await this.router.configure(this.routerService.configure);  }
}






/*

    this.data = [
      {
        colOne: 1,
        colTwo: 2,
      },
      {
        colThree: 3,
        colFour: 4
      }
    ]


*/