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

  developerName:string;
  previousSelectedYearBtn:any;
  yearBtnClick:any;
  succLanchClick:any;

  constructor(private spaceX: SpaceXService) {
    this.years =[2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020];
    this.rockets=[];
    this.developerName = "Bharath";
    this.previousSelectedYearBtn = 0;
    this.yearBtnClick = [false, false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
    this.succLanchClick = true;
  }

  ngOnInit(): void {
    this.spaceX.fetchRockets().subscribe(data=>{
      this.rockets = data;
    });
  }

  yearFilter(year:any){
    this.yearBtnClick[this.previousSelectedYearBtn] = false;

    this.spaceX.filterByYear(year).subscribe(data=>{
      this.rockets = data;
    })
    this.yearBtnClick[year - 2006] = true;
    this.previousSelectedYearBtn = year - 2006;
  }

  launchSuccessFilter(boolValue:any){
    this.spaceX.filterBySuccLaunch(boolValue).subscribe(data=>{
      this.rockets=data;
    })
  }

  landSuccessFilter(boolValue:any){
    this.spaceX.filterBySuccLand(boolValue).subscribe(data=>{
      this.rockets = data;
    })
  }
}
