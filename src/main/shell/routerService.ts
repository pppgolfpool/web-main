import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { RouterConfiguration } from "aurelia-router";

@inject(Router)
export class RouterService {

  private currentRoute: string = 'statistics';

  constructor(router) {
    console.log('router ctor');
    router.events.subscribe('router:navigation:complete', data => {
      if (data.instruction.fragment == '/') {
        this.currentRoute = 'statistics';
      } else {
        this.currentRoute = this.determineRoute(data.instruction.fragment);
      }
      console.log("route: " + data.instruction.fragment);
    });    
  }

  configureRouter(config: RouterConfiguration) : RouterConfiguration {
    console.log('configuring router');
    config.title = "ppppool",
      config.map([
        { route: [""], moduleId: "./main/statistics/statistics", title: 'Statistics', nav: true },
        { route: ["picks"], moduleId: "./main/picks/picks", title: 'Picks', nav: true },
        { route: ["feedback"], moduleId: "./main/feedback/feedback", title: 'Feedback' },
        { route: ["admin"], moduleId: "./main/admin/admin", title: 'Admin', nav: true },
        { route: ["settings"], moduleId: "./main/settings/settings", title: 'Settings', nav: true },
      ]);
      return config;
  }

  determineRoute(route) {
    let firstSlash = false;
    let buffer = '';
    for (let c of route) {
      if (!firstSlash) {
        if (c == '/') {
          firstSlash = true;
          continue;
        }
      }
      if (c == '/') {
        return buffer;
      }
      buffer = buffer + c;
    }
    return buffer;
  }
}