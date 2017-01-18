import { RestService, Response } from '../../../src/resources/services/restService';
import { HttpClient } from 'aurelia-fetch-client';
import { EventService } from '../../../src/resources/services/eventService';
import { EventAggregator } from 'aurelia-event-aggregator';

//https://jsonplaceholder.typicode.com/

describe('the rest service', () => {
  it('makes http post requests', async (done) => {
    let rest = new RestService(new HttpClient(), new EventService(new EventAggregator()));
    var response = await rest.post('https://jsonplaceholder.typicode.com/posts', null, null, null);
    expect(response.Status).toBe(201);
    done();
  });
});
