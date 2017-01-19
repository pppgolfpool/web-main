import { inject } from 'aurelia-dependency-injection';
import { CookieService } from './cookieService';
import { LogManager } from 'aurelia-framework';
import { EventService, EventType } from './eventService';
let log = LogManager.getLogger('authService');

@inject(CookieService, EventService)
export class AuthService {
  constructor(cs: CookieService, ea: EventService) {
    this.cookieService = cs;
    this.eventService = ea;
  }

  eventService: EventService;
  cookieService: CookieService;
  adminRequestCallback: (authToken: string) => Promise<boolean> = null;

  login(token: WebToken) {
    log.debug('storing auth cookie');
    this.cookieService.setCookie("authToken", JSON.stringify(token), 1000);
    this.eventService.publish('login');
  }

  isLoggedIn(): boolean {
    let isLoggedIn = this.cookieService.cookieExists("authToken");
    log.debug(`is logged in: ${isLoggedIn}`);
    return isLoggedIn;
  }

  getWebToken() : WebToken {
    if(this.isLoggedIn()){
      let data = JSON.parse(this.cookieService.getCookie("authToken"));
      return new WebToken(data.email, data.authToken, data.userId, data.name);
    }
    return null;
  }

  logout() {
    log.debug(`logging out.`);
    this.cookieService.setCookie("authToken", "", 1);
    window.location.replace("#");
    this.eventService.publish('logout');
  }

  setAdminRequestCallback(adminRequestCallback: (authToken: string) => Promise<boolean>) {
    log.debug("setting admin request callback");
    this.adminRequestCallback = adminRequestCallback;
  }

  async requestAdminAuthorization(): Promise<boolean> {
    if (!this.isLoggedIn()) {
      return;
    }
    log.debug(`Requesting admin authorization`);
    let authToken = this.getWebToken().authToken;
    var isAdmin = await this.adminRequestCallback(authToken);
    log.debug(`Admin authorization: ${isAdmin}`);
    if(isAdmin){
      this.eventService.publish('adminDetected');
    } else {
      this.eventService.publish('notAdmin');
    }
    return isAdmin;
  }
}

export class WebToken{
  constructor(email: string, authToken: string, userId: string, name: string){
    this.email = email;
    this.authToken = authToken;
    this.userId = userId;
    this.name = name;
  }

  readonly email: string;
  readonly authToken: string;
  readonly userId: string;
  readonly name: string;
}