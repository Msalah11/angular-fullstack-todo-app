import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  baseUrl = `${environment.url}/api`;
  header: any;
  constructor(private httpClient: HttpClient) {
    this.header = {
      localization: 'en',
    };
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  public GetItem(endpoint) {
    return this.httpClient.get(`${this.baseUrl}/${endpoint}`);
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  public PostItem(endpoint, data) {
    return this.httpClient.post(`${this.baseUrl}/${endpoint}`, data);
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  public PutItem(endpoint, data) {
    return this.httpClient.put(`${this.baseUrl}/${endpoint}`, data);
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  public DeleteItem(endpoint) {
    return this.httpClient.delete(`${this.baseUrl}/${endpoint}`);
  }
}
