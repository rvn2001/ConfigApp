import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { stringify } from 'querystring';


@Injectable({
  providedIn: 'root'
})
export class StellarConfigApiService {

  apiUrl = 'http://localhost:51447/api/StellarConfig/';
  constructor(private http: HttpClient) { }

  configure(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  get(url: string, params: HttpParams) {
    return this.http.get(url, {params});
  }

  getClients (searchName: string, index, size): Observable<any> {
    const params = new HttpParams()
          .append('clientName', searchName)
          .append('index', index)
          .append('size', size);
    return this.get(`${this.apiUrl}ClientList`, params);
  }
}
