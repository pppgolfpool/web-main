import { autoinject } from 'aurelia-dependency-injection';
import { EventAggregator } from 'aurelia-event-aggregator';

@autoinject()
export class EventService {
  constructor(eventAggregator: EventAggregator) {
    this._eventAggregator = eventAggregator;
  }

  private readonly _eventAggregator: EventAggregator;

  publish(eventType: EventType, data: any = null){
    this._eventAggregator.publish(eventType, data);
  }

  subscribe(eventType: EventType, callback: (data) => void){
    this._eventAggregator.subscribe(eventType, callback)
  }
}

export type EventType =
  'login' |
  'logout' |
  'request' |
  'response' |
  'routed' |
  'notAdmin' |
  'adminDetected' |
  'tournamentChanged';