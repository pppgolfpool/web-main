import { inject } from "aurelia-framework";
import { bindable, bindingMode } from 'aurelia-framework';
import { EventService } from '../resources/services/eventService';
import { AuthService, WebToken } from '../resources/services/authService';

@inject(AuthService, EventService)
export class TopBarCustomElement {
  private title: string = "PPP PGA Pool 2017";
  private currentRoute: string = 'statistics';
  private loggedIn: boolean = false;

  constructor(authService, eventService) {
    this.authService = authService;
    this.eventService = eventService;
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
  }

  private readonly authService: AuthService;
  private readonly eventService: EventService;

  logout() {
    this.authService.logout();
  }

}