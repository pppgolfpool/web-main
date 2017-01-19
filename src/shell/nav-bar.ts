import { inject } from 'aurelia-framework';
import { EventService } from '../resources/services/eventService';
import { AuthService } from '../resources/services/authService';

@inject(EventService, AuthService)
export class NavBarCustomElement {
  constructor(es: EventService, as: AuthService){
    this.eventService = es;
    this.authService = as;
    this.eventService.subscribe('routed', (data) => {
      this.currentRoute = data;
    });
    this.eventService.subscribe('adminDetected', async () => {
      this.isAdmin = true;
    });
    this.eventService.subscribe('notAdmin', async () => {
      this.isAdmin = false;
    });    
    this.eventService.subscribe('logout', () => {
      this.isAdmin = false;
    });
  }

  private currentRoute: string = 'statistics';
  private isAdmin: boolean;
  private readonly eventService: EventService;
  private readonly authService: AuthService;
}