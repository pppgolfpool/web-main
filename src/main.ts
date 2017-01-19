import { Aurelia } from 'aurelia-framework'
import environment from './environment';
import { LogManager } from "aurelia-framework";
import { ConsoleAppender } from "aurelia-logging-console";
import { HttpClient } from 'aurelia-fetch-client';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Container } from 'aurelia-dependency-injection';
import { AuthClient } from './microservices/auth/authClient';
import { EventService } from './resources/services/eventService';
import { RouterService } from './main/shell/routerService';
import { Router, RouterConfiguration } from 'aurelia-router';

//Configure Bluebird Promises.
(<any>Promise).config({
  longStackTraces: environment.debug,
  warnings: {
    wForgottenReturn: false
  }
});

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('resources')
    .feature('microservices/auth')
    .feature('main/shell')
    .feature('pooltables');

  if (environment.debug) {
    LogManager.addAppender(new ConsoleAppender());
    LogManager.setLevel(LogManager.logLevel.debug); // debug, info
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }


  let log = LogManager.getLogger('RestService');
  let ea = aurelia.container.get(EventAggregator);
  let httpClient = aurelia.container.get(HttpClient)
  httpClient.configure(config => {
    config
      .withDefaults({
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'Fetch'
        }
      })
      .withInterceptor({
        request(request) {
          //log.info(`Requesting ${request.method} ${request.url}`);
          log.info(request);
          ea.publish('request');
          return request;
        },
        response(response) {
          //log.info(`Received ${response.status} ${response.url}`);
          log.info(response);
          ea.publish('response');
          return response;
        }
      });
  });

  let authClient = aurelia.container.get(AuthClient);
  
  aurelia.start().then(() => aurelia.setRoot());
}
