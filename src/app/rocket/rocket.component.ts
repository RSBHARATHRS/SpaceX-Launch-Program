import { Component, OnInit } from '@angular/core';
import { SpaceXService } from '../space-x.service';

@Component({
  selector: 'app-rocket',
  templateUrl: './rocket.component.html',
  styleUrls: ['./rocket.component.css']
})
export class RocketComponent implements OnInit {

  years:any;
  rockets:any;

  constructor(private spaceX: SpaceXService) {
    this.years =[2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020];
    this.rockets=[];
  }

  ngOnInit(): void {
    this.spaceX.fetchRockets().subscribe(data=>{
      this.rockets = data;
    });
  }

  sendYear(year:any){
    console.log("Year:",year);
  }
}
