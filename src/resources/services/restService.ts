import { autoinject } from 'aurelia-dependency-injection';
import { HttpClient } from "aurelia-fetch-client";
import { EventService } from './eventService';

@autoinject()
export class RestService {
  constructor(http: HttpClient, eventService: EventService) {
    this.http = http;
    this.eventService = eventService;
  }

  private http: HttpClient
  private eventService: EventService

  public async post(url: string, query: Object = null, headers: Object = {}, body: Object = {}): Promise<Response> {
    let urlQuery = this.getQueryUrl(url, query);
    this.requestDiagnostic();
    console.log({ url: urlQuery, headers: headers });
    if(!headers){
      headers = {}
    }
    headers['content-type'] = 'application/json; charset=utf-8';
    let response = await this.http.fetch(urlQuery, {
      method: 'post',
      headers: headers ? headers : {},
      body: body ? body : {}
    });
    this.responseDiagnostic();
    let content = {};
    try {
      content = await response.json();
      console.log(content);
    } catch (err) {
      content = {};
      console.log(err);
    }
    return new Response(response.status, response.statusText, content);
  }


  private getQueryUrl(url: string, query: Object): string {
    return !query ? url : `${url}?${this.serialize(query)}`
  }

  private serialize(obj: Object): string {
    let str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }

  private requestDiagnostic() {
    console.log('request');
    this.eventService.publish('request');
  }

  private responseDiagnostic() {
    console.log('response');
    this.eventService.publish('response');
  }

}

export class Response {
  constructor(status: number, statusText: string, data: Object = null, isError: Boolean = false){
    this.Status = status;
    this.StatusText = statusText;
    this.Data = data;
    this.IsError = isError
  }

  StatusText: string;
  Status: number;
  Data: Object;
  IsError: Boolean;
}