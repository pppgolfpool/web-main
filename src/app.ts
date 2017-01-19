import { inject } from 'aurelia-dependency-injection';
import { EventService } from './resources/services/eventService';
import { RouterService } from './main/shell/routerService';
import { Router } from 'aurelia-router';

@inject(EventService, Router, RouterService)
export class App {
  constructor(eventService: EventService, router: Router, routerService: RouterService) {
    this.eventService = eventService;
    this.router = router;
    this.routerService = routerService;
    this.data = [
      {
        dataOne: 1,
        dataTwo: 2,
      },
      {
        dataOne: 3,
        dataTwo: 4,
      }
    ]
  }

  eventService: EventService;
  routerService: RouterService;
  router: Router;
  data: any;

  async activate() {
    
    window.setInterval(() => {
      this.data =  [
      {
        dataOne: 5,
        dataTwo: 6,
      },
      {
        dataOne: 7,
        dataTwo: 8,
      }
    ];
    }, 5000)
    await this.router.configure(this.routerService.configure);  }
}