import { BreakpointObserver} from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild,  ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

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
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/service/api.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableExporterModule } from 'mat-table-exporter';
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
  selector: 'app-time-taken-by-supplier',
  standalone: true,
  imports: [ FormsModule,CommonModule,MatButtonModule,MatMenuModule, MatTableExporterModule,MatPaginatorModule, MatTableModule,NgApexchartsModule],

  templateUrl: './time-taken-by-supplier.component.html',
  styleUrl: './time-taken-by-supplier.component.css'
})
export class TimeTakenBySupplierComponent {
  @ViewChild('chart') chart: ChartComponent | undefined;
  public cO: Partial<ChartOptions> | undefined;
  chartOptions: ChartOptions;
  whidMap: { [key: string]: number } = {};
  mcid=0
  hodid = 0;
  duration = 0;
  selectedCategory: string = 'All'; 
  OnChangeTitle:string= 'Category'
  // Average Time Taken for Supplies: 
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
        text:'Category',
        align: 'center',
        style: {
          fontWeight:'bold',
          fontSize: '16px',
          color:'rgb(50, 50, 164)'
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
    
    this.loadData(this.mcid, this.hodid);
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
      this.chartOptions.title.text = this.OnChangeTitle +':'+  this.selectedCategory+',  Minimum Supply Days:'+this.duration;
    } else if (this.selectedCategory==='Consumables') {
      this.mcid = 2;
      this.chartOptions.title.text = this.OnChangeTitle +':'+ this.selectedCategory+',   Minimum Supply Days:'+this.duration;
    } else if(this.selectedCategory==='All'){

      this.mcid = 0;
      this.chartOptions.title.text = this.OnChangeTitle+':'+ this.selectedCategory+',   Minimum Supply Days:'+this.duration;

    }
    else if (this.selectedCategory==='Reagent') {
      this.mcid = 3;
      this.chartOptions.title.text = this.OnChangeTitle +':'+ this.selectedCategory+ ',  Minimum Supply Days:'+this.duration;
    } else if (this.selectedCategory==='AYUSH') {
      this.mcid = 4;
      this.chartOptions.title.text =this.OnChangeTitle +':'+    this.selectedCategory+',  Minimum Supply Days:'+this.duration;
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
    
    this.duration=mcid;
    this.updateSelectedHodid()
    this.spinner.show();
    this.api.getPOSuppyTimeTakenYear(hodid,mcid,0).subscribe(
      (data:any) => {
        const accyear: string[] = [];
        const nositems: number[] = [];
        const timetakenSupply: number[] = [];
        console.log('API Response:', data);


        data.forEach((item:any)=> {
           
          accyear.push(item.accyear);
          nositems.push(item.nositems);
          timetakenSupply.push(item.timetakenSupply);
         

          // console.log('accyear:', item.accyear, 'delayparA1:', item.delayparA1);
          // if (item.delaypara && item.delayparA1) {
          //   this.whidMap[item.delaypara] = item.delayparA1;
          // } else {
          //   console.warn('Missing whid for delayparaA1 :', item.delayparaA1);
          // }

          
        });


        this.chartOptions.series = [

           
          // { 
          //   name: 'No of Items',
          //   data: nositems ,
          //   color:'#00008B'

          // },
          { 
            name: 'Time Taken to Supply', 
            data: timetakenSupply,
             color:'#00008B'
          }


          
        ];

        this.chartOptions.xaxis = {categories: accyear};
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
    this.api.getPOSuppyTimeTakenYear(hodid,mcid,0).subscribe(
      (data: any) => {
        const accyear: string[] = [];
        const nositems: number[] = [];
        const timetakenSupply: number[] = [];
        console.log('API Response:', data);


        data.forEach((item:any)=> {
           
          accyear.push(item.accyear);
          nositems.push(item.nositems);
          timetakenSupply.push(item.timetakenSupply);

          // console.log('accyear:', item.accyear, 'delayparA1:', item.delayparA1);
          // if (item.delaypara && item.delayparA1) {
          //   this.whidMap[item.delaypara] = item.delayparA1;
          // } else {
          //   console.warn('Missing whid for delayparaA1 :', item.delayparaA1);
          // }

          
        });


        this.chartOptions.series = [

           
          { 
            name: 'Time Taken to Supply', 
            data: timetakenSupply,
             color:'#00008B'
          }
          
        ];

        this.chartOptions.xaxis = {categories: accyear};
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
    this.api.getPOSuppyTimeTakenYear(hodid,mcid,0).subscribe(
      (data: any) => {
        const accyear: string[] = [];
        const nositems: number[] = [];
        const timetakenSupply: number[] = [];
        // console.log('API Response:', data);


        data.forEach((item:any)=> {
           
          accyear.push(item.accyear);
          nositems.push(item.nositems);
          timetakenSupply.push(item.timetakenSupply);

          // console.log('accyear:', item.accyear, 'delayparA1:', item.delayparA1);
          // if (item.delaypara && item.delayparA1) {
          //   this.whidMap[item.delaypara] = item.delayparA1;
          // } else {
          //   console.warn('Missing whid for delayparaA1 :', item.delayparaA1);
          // }

          
        });


        this.chartOptions.series = [

           
          { 
            name: 'Time Taken to Supply', 
            data: timetakenSupply,
             color:'#00008B'
          }
          
        ];

        this.chartOptions.xaxis = {categories: accyear};
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
    this.api.getPOSuppyTimeTakenYear(hodid,mcid,0).subscribe(
      (data: any) => {
        const accyear: string[] = [];
        const nositems: number[] = [];
        const timetakenSupply: number[] = [];
        // console.log('API Response:', data);


        data.forEach((item:any)=> {
           
          accyear.push(item.accyear);
          nositems.push(item.nositems);
          timetakenSupply.push(item.timetakenSupply);

          // console.log('accyear:', item.accyear, 'delayparA1:', item.delayparA1);
          // if (item.delaypara && item.delayparA1) {
          //   this.whidMap[item.delaypara] = item.delayparA1;
          // } else {
          //   console.warn('Missing whid for delayparaA1 :', item.delayparaA1);
          // }

          
        });


        this.chartOptions.series = [

           
          { 
            name: 'Time Taken to Supply', 
            data: timetakenSupply,
             color:'#00008B'
          }
          
        ];

        this.chartOptions.xaxis = {categories: accyear};
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



