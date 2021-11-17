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

  filterByYear(year:any):Observable<any>{
    return this.http.get<any>("https://api.spacexdata.com/v3/launches?limit=100&launch_year="+year);
  }

  filterBySuccLaunch(succLaunch:any):Observable<any>{
    return this.http.get<any>("https://api.spacexdata.com/v3/launches?limit=100&launch_success="+succLaunch);
  }


  filterBySuccLand(succLand:any):Observable<any>{
    return this.http.get<any>("https://api.spacexdata.com/v3/launches?limit=100&land_success="+succLand);
  }
}
