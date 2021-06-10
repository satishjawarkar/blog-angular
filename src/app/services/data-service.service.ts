import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { GlobalDataSummary } from '../models/global-data';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  // private globalDataUrl = 'https://api.covid19api.com/live/country/india/status/confirmed/date/2020-03-21T13:13:30Z'

  
  constructor(private http: HttpClient) { }

  getGlobalData(countryName:string) {
    let url= 'https://api.covid19api.com/live/country/' + countryName + '/status/confirmed/date/2020-03-21T13:13:30Z'
    return this.http.get(url);
    
  }
}
