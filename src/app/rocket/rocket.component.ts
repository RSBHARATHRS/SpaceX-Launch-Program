import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { SpaceXService } from '../space-x.service';

@Component({
  selector: 'app-rocket',
  templateUrl: './rocket.component.html',
  styleUrls: ['./rocket.component.css']
})
export class RocketComponent implements OnInit {

  years: any;
  rockets: any;

  developerName: string;
  previousSelectedYearBtn: any;
  yearBtnClick: any;
  succLanchClick: any;

  queryArr:any;
  selectedYear:any;
  launchSucc:any;
  landSucc:any;

  launchSuccSeleArr:any;
  landSuccSeleArr:any;

  constructor(private spaceX: SpaceXService) {
    this.years = [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];
    this.rockets = [];
    this.developerName = "Bharath";
    this.previousSelectedYearBtn = -1;
    this.yearBtnClick = [false, false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
    this.succLanchClick = false;

    this.queryArr = [];
    this.selectedYear = 0;
    this.launchSucc = "none";
    this.landSucc = "none";

    this.launchSuccSeleArr=[false,false];
    this.landSuccSeleArr=[false,false];
  }

  ngOnInit(): void {
    this.spaceX.fetchRockets().subscribe(data => {
      this.rockets = data;
    });
  }

  yearFilter(year: any) {
    if(year-2006 == this.previousSelectedYearBtn){
      this.previousSelectedYearBtn = -1;
      this.yearBtnClick[year - 2006] = false;
      this.selectedYear = 0;
      this.makeQuery();
      return;
    }
    this.yearBtnClick[this.previousSelectedYearBtn] = false;

    // this.spaceX.filterByYear(year).subscribe(data => {
    //   this.rockets = data;
    // })
    this.yearBtnClick[year - 2006] = true;
    this.previousSelectedYearBtn = year - 2006;
    this.selectedYear = year;
    this.makeQuery();
  }

   /*----------------Filter For Launch Successfully-------------*/
  launchSuccessFilter(boolValue: any) {

    if(this.launchSucc == boolValue){
      this.launchSuccSeleArr[0]=false;
      this.launchSuccSeleArr[1]=false;
      this.launchSucc = "none";
      this.makeQuery();
      return;
    }
    if(boolValue == "true"){
      this.launchSuccSeleArr[0]=true;
      this.launchSuccSeleArr[1]=false;
    }else if(boolValue == "false"){
      this.launchSuccSeleArr[1] = true;
      this.launchSuccSeleArr[0] = false;
    }

    this.launchSucc = boolValue;
    this.makeQuery();
  }

  /*----------------Filter For land Successfully-------------*/
  landSuccessFilter(boolValue: any) {
    if(this.landSucc == boolValue){
      this.landSuccSeleArr[0]=false;
      this.landSuccSeleArr[1]=false;
      this.landSucc = "none";
      this.makeQuery();
      return;
    }
    if(boolValue == "true"){
      this.landSuccSeleArr[0]=true;
      this.landSuccSeleArr[1]=false;
    }else if(boolValue == "false"){
      this.landSuccSeleArr[1] = true;
      this.landSuccSeleArr[0] = false;
    }

    this.landSucc = boolValue;
    this.makeQuery();
  }

  makeQuery(){
    let queryStr= new String();

    if(this.selectedYear != 0){
      queryStr = "&launch_year="+this.selectedYear;
    }
    if(this.launchSucc != "none"){
      queryStr = queryStr.concat("&launch_success=" +this.launchSucc);
    }
    if(this.landSucc != "none"){
      queryStr = queryStr.concat("&land_success=" +this.landSucc);
    }
    console.log(queryStr);
    this.spaceX.filterByStrQuery(queryStr).subscribe(data => {
      this.rockets = data;
    })
  }
}
