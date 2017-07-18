import { autoinject } from 'aurelia-dependency-injection';
import { HttpClient } from "aurelia-fetch-client";

@autoinject()
export class RestService {
  constructor(http: HttpClient) {
    this.http = http;
  }

  private http: HttpClient

  public async post(url: string, query: Object = null, headers: Object = {}, body: Object = {}): Promise<Response> {
    let urlQuery = this.getQueryUrl(url, query);
    this.requestDiagnostic();
    if(!headers){
      headers = {}
    }
    headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    let response = await this.http.fetch(urlQuery, {
      method: 'post',
      headers: headers ? headers : {},
      body: body ? JSON.stringify(body) : JSON.stringify({empty: true})
    });
    this.responseDiagnostic();
    let content = {};
    try {
      content = await response.json();
    } catch (err) {
      content = {};
      console.log(err);
    }
    return new Response(content["Status"] ? content["Status"] : response.status , content["StatusText"] ? content["StatusText"] : response.statusText, content);
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
  }

  private responseDiagnostic() {
  }

}

export class Response {
  constructor(status: number, statusText: string, data: Object = null){
    this.Status = status;
    this.StatusText = statusText;
    this.Data = data;
    this.IsError = status != 200;
  }

  StatusText: string;
  Status: number;
  Data: any;
  IsError: Boolean;
}
