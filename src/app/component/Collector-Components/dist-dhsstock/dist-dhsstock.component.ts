import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

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
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableExporterModule } from 'mat-table-exporter';



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
  selector: 'app-dist-dhsstock',
  standalone: true,
  imports: [CommonModule,MatButtonModule,MatMenuModule, MatTableExporterModule,MatPaginatorModule, MatTableModule,NgApexchartsModule],
  
  templateUrl: './dist-dhsstock.component.html',
  styleUrl: './dist-dhsstock.component.css'
})
export class DistDHSStockComponent {
  @ViewChild('chart') chart: ChartComponent | undefined;
  public cO: Partial<ChartOptions> | undefined;
  chartOptions: ChartOptions;
  whidMap: { [key: string]: number } = {};



  dataSource!: MatTableDataSource<IndentPendingWH>;
  dispatchPendings: IndentPendingWH[] = [];
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
        height: 800,
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: 'top', // top, center, bottom
            
            
          },
          barHeight: '70%', // Increase bar height (percentage or fixed value)
          horizontal: true,
          
        },
      },
      xaxis: {
        // Adjust the maximum x-axis value as per your data
        labels: {
          formatter: function (val: any) {
            return Math.floor(val).toString(); // Ensure integer labels
          },
        },
        categories: [], // Keep your categories if required
      },
      yaxis: {
        // min: 0, // Start x-axis at 0
        // max: 1200,
        // tickAmount: 7, // Determines the number of ticks (0, 10, 20, ... up to max)

        title: {
          text: undefined,
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ['#FF0000'],
        },
      },
      stroke: {
        width: 0,
        colors: ['#fff'],
      },
      title: {
        text: ' ',
        align: 'center',
        style: {
          fontSize: '12px',
          color: '#6e0d25',
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
        position: 'top',
        horizontalAlign: 'center',
        offsetX: 40,
      },
    };
    
    this.loadData();

  }

  ngOnInit(){
    
    this.spinner.show();
    setTimeout(() => this.loadData(), 10000);
  }
  
  
    loadData(): void {
      this.spinner.show();
      this.api.getDistDHSStock(sessionStorage.getItem('districtid'),'Coll',1,0).subscribe(
        (data:any ) => {
          const facilityname: string[] = [];
          const edlstock: number[] = [];
          const nedlstock: number[] = [];
          const totalstock: number[] = [];
  
          console.log('API Response:', data);
  
  
          data.forEach((item:any)=> {
             
          
            facilityname.push(item.facilityname);
            edlstock.push(item.edlstock);
            nedlstock.push(item.nedlstock);
            totalstock.push(item.totalstock);
  
  
            
          });
  
          console.log('whidMap:', this.whidMap); // Log the populated mmidMap
  
          this.chartOptions.series = [
  
            
            { 
            name: 'Total Stock', 
            data: totalstock, 
            // color:'#00b4d8'
            },
            { 
            name: 'EDL Stock',
            data: edlstock, 
            // color:'#eeba0b'
            }
             ,
            { 
              name: 'Non EDL Stock', 
              data: nedlstock 
            },
  
          ];
  
          this.chartOptions.xaxis = {categories: facilityname};
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
