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
  selector: 'app-lab-time-taken',
  standalone: true,
  imports: [ FormsModule,CommonModule,MatButtonModule,MatMenuModule, MatTableExporterModule,MatPaginatorModule, MatTableModule,NgApexchartsModule],
  templateUrl: './lab-time-taken.component.html',
  styleUrl: './lab-time-taken.component.css'
})
export class LabTimeTakenComponent {
  @ViewChild('chart') chart: ChartComponent | undefined;
  public cO: Partial<ChartOptions> | undefined;
  chartOptions: ChartOptions;
  whidMap: { [key: string]: number } = {};
  selectedCategory: string = 'All'; 
  OnChangeTitle:string= 'Category'
  yearid:any=0
  
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
        type: 'bar',
        stacked: true,
        height: 600,
      },
      plotOptions: {
        bar: {
      
          horizontal: true,
          dataLabels: {
            position: 'center',
          },
        },
      },
      xaxis: {
        title: {
          text: 'Average Time Taken',
        },
        labels: {
          formatter: (val) => `${val} `,
        },
      },
      yaxis: {
        
        title: {
          text: 'Labs',
        },
      },
      dataLabels: {
        enabled: true,
        formatter: (val) => `${val} `,
        style: {
          colors: ['#000'],
        },
      },
      stroke: {
        width: 1,
      },
      title: {
        text: 'Empanelled Lab wise Time Taken:'+  this.selectedCategory,
        align: 'center',
        style: {
          fontSize: '18px',
          color: 'rgb(50, 50, 164)'
        },
      },
      tooltip: {
        y: {
          formatter: (val) => `${val} `,
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: 'right',
        
      },
      

      
    };
    
    
    this.loadData(this.yearid);
   

  }

  
  

  ngOnInit() {
    
    this.loadData(this.yearid);
  }

  

  


  loadData(yearid: any): void {

    if(yearid===0){
      this.selectedCategory='ALL'
      this.chartOptions.title.text='Period:'  +  this.selectedCategory
    }else if(yearid===545){
      this.selectedCategory='24-25'
      this.chartOptions.title.text='Period:'  +  this.selectedCategory

    }else if(yearid===544){
      this.selectedCategory='23-24'
      this.chartOptions.title.text='Period:'  +  this.selectedCategory

    }else if(yearid===542){
      this.chartOptions.title.text='Period:'  +  this.selectedCategory
      this.selectedCategory='22-23'

    }
    this.yearid=yearid
    this.spinner.show();
    this.api.getQCLabYearAvgTime(yearid).subscribe(
      (data: any) => {
        const labname: string[] = [];
        const avgTimeTaken: number[] = [];
        const nossamples: number[] = [];
        console.log('API Response:', data);
  
        data.forEach((item: any) => {
          labname.push(item.labname);
          avgTimeTaken.push(item.avgTimeTaken);
          nossamples.push(item.nossamples);
        });
  
        // Generate dynamic colors for Avg Time Taken based on the value
  
        this.chartOptions.series = [
          {
            name: 'No of Samples',
            data: nossamples,
          },
          {
            name: 'Avg Time Taken Days',
            data: avgTimeTaken,
          }
        ];
  
  
        this.chartOptions.xaxis = { categories: labname };
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
  
  
  

 
 
  
  
  

 
}



