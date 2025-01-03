import { Component, OnInit } from '@angular/core';
import {MatTabsModule,MatTabGroup} from '@angular/material/tabs'; 
import { HttpClient } from '@angular/common/http';
import { ViewChild,ChangeDetectorRef } from '@angular/core';
import { DistrictService } from 'src/app/service/district.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import * as XLSX from 'xlsx';

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexTitleSubtitle,
  ApexYAxis,
  ApexTooltip,
  ApexFill,
  ApexLegend
} from 'ng-apexcharts';
import { Complaints } from 'src/app/Model/Complaints';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import html2canvas from 'html2canvas';
import { ApiService } from 'src/app/service/api.service';
import { HardcodedAuthenticationService } from 'src/app/service/authentication/hardcoded-authentication.service';
import { DistDrugCount } from 'src/app/Model/DistDrugCount';
import { WHDrugCount } from 'src/app/Model/WHDrugCount';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  fill: ApexFill;
  legend: ApexLegend;
};
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  selectedTabIndex: number = 0;
  districtData:DistDrugCount[]=[]
  wHDrugCount:WHDrugCount[]=[]
  districtid=sessionStorage.getItem('districtid')


  selectedTabValue(event: any): void {
    
    this.selectedTabIndex = event.index;
  }
  
 
  constructor(public api:ApiService,public hardcodedAuthemtication:HardcodedAuthenticationService,private cdr:ChangeDetectorRef,private breakpointObserver:BreakpointObserver,private route: Router, private rcapi: ApiService) {
   
  }
  

  ngOnInit() {
    this.getDistDrugCount()
    this.getWHDrugCount()
   
  }
  getDistDrugCount(){
    this.api.getDistDrugCount(this.districtid,1,2).subscribe((res:any)=>{
this.districtData=res
    })
  }
  getWHDrugCount(){
    this.api.WHDrugCount(this.districtid,1,0).subscribe((res:any)=>{
      this.wHDrugCount=res
          })
  }

 
 
}


