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
  }

  eventService: EventService;
  routerService: RouterService;
  router: Router;

  async activate() {
    await this.router.configure(this.routerService.configure);  }
}