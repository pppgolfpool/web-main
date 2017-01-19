import { inject } from 'aurelia-dependency-injection';
import { EventService } from '../../resources/services/eventService';
import { AuthService } from '../../resources/services/authService';
import { RouterService } from './routerService';
import { Router } from "aurelia-router";

@inject(EventService, AuthService, RouterService, Router)
export class ShellCustomElement {
  constructor(es: EventService, as: AuthService, rs: RouterService, r: Router) {
    this.eventService = es;
    this.authService = as;
    this.routerService = rs;
    this.router = r;
    this.eventService.subscribe('routed', (data) => {
      this.currentRoute = data;
    });
    this.eventService.subscribe('login', () => {
      this.loggedIn = true;
    });
    this.eventService.subscribe('logout', () => {
      this.loggedIn = false;
    });
    this.loggedIn = this.authService.isLoggedIn();
    //this.router.configure(this.routerService.configureRouter);
  }

  private loggedIn: boolean;
  private currentRoute: string = 'statistics';
  private readonly eventService: EventService;
  private readonly authService: AuthService;
  private readonly routerService: RouterService;
  private readonly router: Router;

  async attached(){
    await this.authService.requestAdminAuthorization();
  }

}