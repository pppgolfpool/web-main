import {EventService, EventType} from '../../../src/resources/services/eventService';
import { EventAggregator } from 'aurelia-event-aggregator';

describe('the event service', () => {
  it('publishes the login event', () => {
    let es = new EventService(new EventAggregator());
    es.subscribe('login', (data) =>{
      expect(data.login).toBeTruthy();
    });
    es.publish('login', {login: true});
  });
  it('publishes the logout event', () => {
    let es = new EventService(new EventAggregator());
    es.subscribe('logout', (data) =>{
      expect(data.logout).toBeTruthy();
    });
    es.publish('logout', {logout: true});
  });
  it('publishes the request event', () => {
    let es = new EventService(new EventAggregator());
    es.subscribe('request', (data) =>{
      expect(data.request).toBeTruthy();
    });
    es.publish('request', {request: true});
  });
  it('publishes the response event', () => {
    let es = new EventService(new EventAggregator());
    es.subscribe('response', (data) =>{
      expect(data.response).toBeTruthy();
    });
    es.publish('response', {response: true});
  });  
  it('publishes the routed event', () => {
    let es = new EventService(new EventAggregator());
    es.subscribe('routed', (data) =>{
      expect(data.routed).toBeTruthy();
    });
    es.publish('routed', {routed: true});
  });    
});
