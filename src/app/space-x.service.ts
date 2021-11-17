import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpaceXService {

  constructor(private http:HttpClient) {

  }

  fetchRockets():Observable<any>{
    return this.http.get<any>("https://api.spacexdata.com/v3/launches?limit=100");
  }
}
