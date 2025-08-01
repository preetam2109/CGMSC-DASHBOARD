import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, OnInit, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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
  ApexLegend,
  NgApexchartsModule
} from 'ng-apexcharts';
import { dispatchPending } from 'src/app/Model/dispatchPending';
import { DistrictService } from 'src/app/service/district.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/service/api.service';
import { IndentPendingWH } from 'src/app/Model/IndentPendingWH';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { IndentPendingWHSummary } from 'src/app/Model/IndentPendingWHSummary';
import { IWHPiplineSummary } from 'src/app/Model/IWHPiplineSummary';
import { IWHPiplineDetails } from 'src/app/Model/IWHPiplineDetails';
import { LabIssuePendingDetails } from 'src/app/Model/LabIssuePendingDetails';
import { HODYearWiseIssuanceSummary } from 'src/app/Model/HODYearWiseIssuanceSummary';
import { FormsModule } from '@angular/forms';



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
  selector: 'app-distribution',
  standalone:true,
  imports:[FormsModule,NgApexchartsModule],
  templateUrl: './distribution.component.html',
  styleUrls: ['./distribution.component.css']
})
export class DistributionComponent {
  @ViewChild('chart') chart: ChartComponent | undefined;
  public cO: Partial<ChartOptions> | undefined;
  chartOptions: ChartOptions;
  whidMap: { [key: string]: number } = {};
  mcid=1
  hodid = 0;
  districtid:any=0

  selectedCategory: string = 'Drugs'; 
  OnChangeTitle:string= 'Growth in Disribution Category:' 
  selectedCategoryTitle: string = '';
  selectedTabIndex: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private spinner: NgxSpinnerService,
    private api: ApiService,
    private http: HttpClient,
    private breakpointObserver: BreakpointObserver,
    private cdr: ChangeDetectorRef
  ) {
     

    this.chartOptions = {
      series: [],
      chart: {
        type: 'line',
        stacked: true,
        height: 600
      },
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      xaxis: {
        categories: [],
        
        
      },
      yaxis: {
        
        title: {
          text: undefined,
        },
        labels:{
          formatter: function (value) {
            return value.toFixed(0); // This will show the values without decimals
          }
        },
        
        
        
        
      },
      dataLabels: {
        enabled: true,
        style: {
          // colors: ['#FF0000'] 
        }
      },
      stroke: {
        width: 4,
        // colors: ['#fff'],
      },
      title: {
        text:'Growth in Disribution Category: Drugs',
        align: 'center',
        style: {
          fontWeight:'bold',
          fontSize: '16px',
          color:'#FF3C00'
        },
      },
      tooltip: {
        y: {
          formatter: function (val: any) {
            return val.toString();
          },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: 'right',
        horizontalAlign: 'center',
        offsetX: 40,
      },
    };

    
    this.loadData(this.mcid,this.hodid);
    // this.loadDataDHS(this.mcid,this.hodid);
    // this.loadDataDME(this.mcid,this.hodid);
    // this.loadDataAYUSH(this.mcid,this.hodid);

  }

  
  

  ngOnInit() {




    if(sessionStorage.getItem('roleId')==='482'){
      this.districtid=sessionStorage.getItem('districtid')
    }
    
    if(localStorage.getItem('roleName')==='CME' ||'DME1' ){

      this.loadDataDME(this.mcid, this.hodid);
    }else{

      this.loadData(this.mcid, this.hodid);
    }
  }

  

  

  // Update and reflect the selected category in the chart title and data
  

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['selectedCategory']) {
  //     this.wheretitle = this.updateSelectedCategory();
  //     this.chartOptions.title.text = this.wheretitle;
  //     this.cO = this.chartOptions;  // Update chart options
  //     this.cdr.detectChanges();  // Trigger change detection to reflect changes
  //   }
  // }

  updateSelectedHodid(): void {
    
    // Reset hodid to 0 initially
    this.mcid = 0;

    // Map the selected category to the corresponding mcid value
    if (this.selectedCategory==='Drugs') {
      this.mcid = 1;
      this.chartOptions.title.text = this.OnChangeTitle +  this.selectedCategory;
    } else if (this.selectedCategory==='Consumables') {
      this.mcid = 2;
      this.chartOptions.title.text = this.OnChangeTitle + this.selectedCategory;
    } else if (this.selectedCategory==='Reagent') {
      this.mcid = 3;
      this.chartOptions.title.text = this.OnChangeTitle +  this.selectedCategory;
    } else if (this.selectedCategory==='AYUSH') {
      this.mcid = 4;
      this.chartOptions.title.text =this.OnChangeTitle +  this.selectedCategory;
    }

    // console.log('Selected Hod ID:', this.mcid);
  }
  // updateSelectedCategory(): string {
  //   
  //   if (this.selectedCategory === 'Drugs') {
  //     return 'Drugs Category';
  //   } else if (this.selectedCategory === 'Consumables') {
  //     return 'Consumables Category';
  //   } else if (this.selectedCategory === 'Reagent') {
  //     return 'Reagent Category';
  //   } else if (this.selectedCategory === 'AYUSH') {
  //     return 'AYUSH Category';
  //   } else {
  //     return 'ALL';
  //   }
  // }

  loadData(mcid:any,hodid:any): void {
    
    this.spinner.show();
    if(sessionStorage.getItem('roleId')==='482'){
      this.districtid=sessionStorage.getItem('districtid')
    }
    this.api.getHODYearWiseIssuanceSummary(mcid,hodid).subscribe(
      (data:any) => {
        const shaccyear: string[] = [];
        const totalissuevalue: number[] = [];
        const totalissueitems: number[] = [];
        console.log('API Response:', data);


        data.forEach((item:any)=> {
           
          shaccyear.push(item.shaccyear);
          totalissuevalue.push(item.totalissuevalue);
          totalissueitems.push(item.totalissueitems);
         

          // console.log('shaccyear:', item.shaccyear, 'delayparA1:', item.delayparA1);
          // if (item.delaypara && item.delayparA1) {
          //   this.whidMap[item.delaypara] = item.delayparA1;
          // } else {
          //   console.warn('Missing whid for delayparaA1 :', item.delayparaA1);
          // }

          
        });


        this.chartOptions.series = [

           
          { 
            name: ' Total Issued Items', 
            data: totalissueitems,
            color:'#800000' 
          },
          { 
            name: ' Total Issued Value',
            data: totalissuevalue ,
            color:'#00008B'

          }


          
        ];

        this.chartOptions.xaxis = {categories: shaccyear};
        this.cO = this.chartOptions;
        this.cdr.detectChanges();
        this.spinner.hide();
      },
      (error: any) => {
        console.error('Error fetching data', error);
        this.spinner.hide();
      }
    );
  }

  loadDataDHS(mcid:any,hodid:any): void {
    
    //  let wheretitle=this.updateSelectedCategory();
    // this.updateSelectedCategory('DHS');
    // this.updateSelectedCategory()

    
    this.spinner.show();
    this.api.getHODYearWiseIssuanceSummary(mcid,hodid).subscribe(
      (data: any) => {
        const shaccyear: string[] = [];
        const dhsissueitems: number[] = [];
        const dhsissuevalue: number[] = [];
        console.log('API Response:', data);


        data.forEach((item:any)=> {
           
          shaccyear.push(item.shaccyear);
          dhsissueitems.push(item.dhsissueitems);
          dhsissuevalue.push(item.dhsissuevalue);

          // console.log('shaccyear:', item.shaccyear, 'delayparA1:', item.delayparA1);
          // if (item.delaypara && item.delayparA1) {
          //   this.whidMap[item.delaypara] = item.delayparA1;
          // } else {
          //   console.warn('Missing whid for delayparaA1 :', item.delayparaA1);
          // }

          
        });


        this.chartOptions.series = [

           
          { 
            name: ' DHS Issued Items', 
            data: dhsissueitems ,
            color:'#800000'
          },


          { 
            name: ' DHS Issued Value',
            data: dhsissuevalue ,
            color:'#00008B'


          }
          
        ];

        this.chartOptions.xaxis = {categories: shaccyear};
        this.cO = this.chartOptions;
        this.cdr.detectChanges();
        this.spinner.hide();
      },
      (error: any) => {
        console.error('Error fetching data', error);
        this.spinner.hide();
      }
    );
  }
  loadDataDME(mcid:any,hodid:any): void {
    
    // this.updateSelectedCategory('DME');
    this.spinner.show();
    this.api.getHODYearWiseIssuanceSummary(mcid,hodid).subscribe(
      (data: any) => {
        const shaccyear: string[] = [];
        const dmeissueitems: number[] = [];
        const dmeissuevalue: number[] = [];
        // console.log('API Response:', data);


        data.forEach((item:any)=> {
           
          shaccyear.push(item.shaccyear);
          dmeissueitems.push(item.dmeissueitems);
          dmeissuevalue.push(item.dmeissuevalue);

          // console.log('shaccyear:', item.shaccyear, 'delayparA1:', item.delayparA1);
          // if (item.delaypara && item.delayparA1) {
          //   this.whidMap[item.delaypara] = item.delayparA1;
          // } else {
          //   console.warn('Missing whid for delayparaA1 :', item.delayparaA1);
          // }

          
        });


        this.chartOptions.series = [

           
          { 
            // name: ' DME Items', 
            name: ' CME Issued Items', 
            data: dmeissueitems,
            color:'#800000' 
          },


          { 
            // name: ' DME Value',
            name: ' CME Issued Value(in Cr)',
            data: dmeissuevalue ,
            color:'#00008B'

          }
          
        ];

        this.chartOptions.xaxis = {categories: shaccyear};
        this.cO = this.chartOptions;
        this.cdr.detectChanges();
        this.spinner.hide();
      },
      (error: any) => {
        console.error('Error fetching data', error);
        this.spinner.hide();
      }
    );
  }
  loadDataAYUSH(mcid:any,hodid:any): void {
    
    // this.updateSelectedCategory('AYUSH');
    this.spinner.show();
    this.api.getHODYearWiseIssuanceSummary(mcid,hodid).subscribe(
      (data: any) => {
        const shaccyear: string[] = [];
        const ayIssueitems: number[] = [];
        const ayissueval: number[] = [];
        // console.log('API Response:', data);


        data.forEach((item:any)=> {
           
          shaccyear.push(item.shaccyear);
          ayIssueitems.push(item.ayIssueitems);
          ayissueval.push(item.ayissueval);

          // console.log('shaccyear:', item.shaccyear, 'delayparA1:', item.delayparA1);
          // if (item.delaypara && item.delayparA1) {
          //   this.whidMap[item.delaypara] = item.delayparA1;
          // } else {
          //   console.warn('Missing whid for delayparaA1 :', item.delayparaA1);
          // }

          
        });


        this.chartOptions.series = [

           
          { 
            name: ' AYUSH Issued Items', 
            data: ayIssueitems ,
            color:'#800000'

          },


          { 
            name: ' AYUSH Issued Value',
            data: ayissueval ,
            color:'#00008B'

          }
          
        ];

        this.chartOptions.xaxis = {categories: shaccyear};
        this.cO = this.chartOptions;
        this.cdr.detectChanges();
        this.spinner.hide();
      },
      (error: any) => {
        console.error('Error fetching data', error);
        this.spinner.hide();
      }
    );
  }
  
   fetchDataBasedOnChartSelection(whid: number, seriesName: string): void {
  
   }

 
}



