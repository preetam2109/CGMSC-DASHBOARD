import { Component, ViewChild,ChangeDetectorRef } from '@angular/core';
import {  MatPaginatorModule } from '@angular/material/paginator';
import {  MatTableModule } from '@angular/material/table';

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
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';



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
  selector: 'app-cgmsc-current-year',
  standalone: true,
  imports: [ReactiveFormsModule,MatDatepickerModule,MatSelectModule,MatInputModule,MatFormFieldModule,FormsModule,MatButtonModule,MatMenuModule, MatTableExporterModule,MatPaginatorModule, MatTableModule,NgApexchartsModule],

  templateUrl: './cgmsc-current-year.component.html',
  styleUrl: './cgmsc-current-year.component.css'
})
export class CgmscCurrentYearComponent {
@ViewChild('chart') chart: ChartComponent | undefined;
  public cO: Partial<ChartOptions> | undefined;
  chartOptions: ChartOptions; // For bar chart
  chartOptionsLine: ChartOptions; // For line chart
  chartOptions2: ChartOptions; // For bar chart

  chartOptionsLine2: ChartOptions; // For line chart
mcid:any='1';
  constructor(
    private spinner: NgxSpinnerService,
    private api: ApiService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    public datePipe: DatePipe
  ) {
    // Bar chart configuration for loadData
    this.chartOptions = {
      series: [],
      chart: {
        type: 'bar',
        stacked: false,
        height: 400,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 3, // Optional: Add rounded corners for better aesthetics
          columnWidth: '20%', // Control the width of the bars
        },
      },
      xaxis: {
        categories: [],
      },
      yaxis: {
        title: {
          text: '',
        },
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        width: 2,
        colors: ['#fff'],
      },
      title: {
        text: 'Current Financial Year Demand & CGMSC Total Supply',
        align: 'center',
      },
      fill: {
        opacity: 1,
      },
      legend: {
        fontSize:'15px',
        fontWeight:'bold',
        position: 'top',
        horizontalAlign: 'center',
        offsetX: 40,
      },
      tooltip: {
        y: {
          formatter: (val: number) => `${val}`,
        },
      },
    };

    // Line chart configuration for loadData2
    this.chartOptionsLine = {
      series: [],
      chart: {
        type: 'bar',
        stacked: false,
        height: 400,
      },
      stroke: {
        width: 2,
        curve: 'smooth',
      },
      plotOptions: {bar:{
        horizontal: false,
        borderRadius: 3, // Optional: Add rounded corners for better aesthetics
        columnWidth: '20%', // Control the width of the bars
      }}, // Add an empty plotOptions
      xaxis: {
        categories: [],
      },
      yaxis: {
        title: {
          text: '',
        },
      },
      dataLabels: {
        enabled: true,
      },
      title: {
        text: 'DHS Approved Demand Vs CGMSC Supply of Current Financial Year.',
        align: 'center',
      },
      fill: {
        opacity: 1,
      },
      legend: {
        fontSize:'15px',
        fontWeight:'bold',
        position: 'top',
        horizontalAlign: 'center',
      },
      tooltip: {
        y: {
          formatter: (val: number) => `${val}`,
        },
      },
    };
    
    this.chartOptions2 = {
      series: [],
      chart: {
        type: 'bar',
        stacked: false,
        height: 400,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 3, // Optional: Add rounded corners for better aesthetics
          columnWidth: '20%', // Control the width of the bars
        },
      },
      xaxis: {
        categories: [],
      },
      yaxis: {
        title: {
          text: '',
        },
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        width:2,
        colors: ['#fff'],
      },
      title: {
        text: 'Current Financial Year Demand & CGMSC Total Supply',
        align: 'center',
      },
      fill: {
        opacity: 1,
      },
      legend: {
        fontSize:'15px',
        fontWeight:'bold',
        position: 'top',
        horizontalAlign: 'center',
        offsetX: 40,
      },
      tooltip: {
        y: {
          formatter: (val: number) => `${val}`,
        },
      },
    };

    // Line chart configuration for loadData2
    this.chartOptionsLine2 = {
      series: [],
      chart: {
        type: 'bar',
        stacked: false,
        height: 400,
      },
      stroke: {
        width: 2,
        curve: 'smooth',
      },
      plotOptions: {bar:{
        horizontal: false,
        borderRadius: 3, // Optional: Add rounded corners for better aesthetics
        columnWidth: '20%', // Control the width of the bars
      }}, // Add an empty plotOptions
      xaxis: {
        categories: [],
      },
      yaxis: {
        title: {
          text: '',
        },
      },
      dataLabels: {
        enabled: true,
      },
      title: {
        text: 'DHS Approved Demand Vs CGMSC Supply  of Current Financial Year.',
        align: 'center',
      },
      fill: {
        opacity: 1,
      },
      legend: {
        fontSize:'15px',
        fontWeight:'bold',
        position: 'top',
        horizontalAlign: 'center',
      },
      tooltip: {
        y: {
          formatter: (val: number) => `${val}`,
        },
      },
    };
    
    

  

    
      this.loadData();
      this.loadData2();
      this.loadData3();
      this.loadData4();
 
  }

  loadData(): void {



      this.spinner.show();

      this.api.getDistCGMSCSupplyDHS(sessionStorage.getItem('districtid'), this.mcid).subscribe(
        (data: any) => {
         
          const dhsaiFixed: number[] = [];
          const totalIssuedCGMSCitems: number[] = [];
          const totalPEr: number[] = [];

          data.forEach((item: any) => {
           
            dhsaiFixed.push(item.dhsaiFixed);
            totalIssuedCGMSCitems.push(item.totalIssuedCGMSCitems);
            totalPEr.push(item.totalPEr);
          });

          // Assign default bar names if warehousename is not available
          const defaultBarNames = data.map((_: any, index: number) => ``);

          this.chartOptions.series = [
            { name: 'No of Approved Drugs', data: dhsaiFixed,color:'#0077b6'  },
            { name: 'No of Total Supplied Drugs', data: totalIssuedCGMSCitems,color:'#007200'  },
            { name: 'Total Supplied %', data: totalPEr,color:'#e85d04' }
          ];

          this.chartOptions.xaxis = { categories: defaultBarNames };
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

  loadData2(): void {
    
   


      this.spinner.show();

      this.api.getDistCGMSCSupplyDHS(sessionStorage.getItem('districtid'), this.mcid).subscribe(
        (data: any) => {
         
          const dhsaiFixed: number[] = [];
          const issueaainstIndent: number[] = [];
          const aginAI_Perc: number[] = [];
      
          data.forEach((item: any, index: number) => {
            
            dhsaiFixed.push(item.dhsaiFixed);
            issueaainstIndent.push(item.issueaainstIndent);
            aginAI_Perc.push(item.aginAI_Perc);
          });
      
          // Assign default bar names if warehousename is not available
          const defaultBarNames = data.map((_: any, index: number) => ``);
      
          this.chartOptionsLine.series = [
            { name: 'No of Approved Drugs', data: dhsaiFixed,color:'#0077b6'  },
            { name: 'No of Supplied Drugs ', data: issueaainstIndent,color:'#007200'  },
            { name: 'Supplied %', data: aginAI_Perc,color:'#e85d04' }
          ];
      
          // Use defaultBarNames if warehousename is null or undefined
          this.chartOptionsLine.xaxis = { categories: defaultBarNames };
          this.cO = this.chartOptionsLine;
          this.cdr.detectChanges();
          this.spinner.hide();
        },
        (error: any) => {
          console.error('Error fetching data', error);
          this.spinner.hide();
        }
      );
      
    
  }
  loadData3(): void {



      this.spinner.show();

      this.api.getDistCGMSCSupplyDHS(sessionStorage.getItem('districtid'), 2).subscribe(
        (data: any) => {
         
          const dhsaiFixed: number[] = [];
          const totalIssuedCGMSCitems: number[] = [];
          const totalPEr: number[] = [];

          data.forEach((item: any) => {
           
            dhsaiFixed.push(item.dhsaiFixed);
            totalIssuedCGMSCitems.push(item.totalIssuedCGMSCitems);
            totalPEr.push(item.totalPEr);
          });

          // Assign default bar names if warehousename is not available
          const defaultBarNames = data.map((_: any, index: number) => ``);

          this.chartOptions2.series = [
            { name: 'No of Approved Consumables', data: dhsaiFixed,color:'#0077b6' },
            { name: 'No of Total Supplied Consumables ', data: totalIssuedCGMSCitems,color:'#007200'  },
            { name: 'Total Supplied %', data: totalPEr,color:'#e85d04' }
          ];
          this.chartOptions2.xaxis = { categories: defaultBarNames };
          this.cO = this.chartOptions2;
          this.cdr.detectChanges();
          this.spinner.hide();
        },
        (error: any) => {
          console.error('Error fetching data', error);
          this.spinner.hide();
        }
      );
    
  }

  loadData4(): void {
    
   


      this.spinner.show();

      this.api.getDistCGMSCSupplyDHS(sessionStorage.getItem('districtid'), 2).subscribe(
        (data: any) => {
         
          const dhsaiFixed: number[] = [];
          const issueaainstIndent: number[] = [];
          const aginAI_Perc: number[] = [];
      
          data.forEach((item: any, index: number) => {
            
            dhsaiFixed.push(item.dhsaiFixed);
            issueaainstIndent.push(item.issueaainstIndent);
            aginAI_Perc.push(item.aginAI_Perc);
          });
      
          // Assign default bar names if warehousename is not available
          const defaultBarNames = data.map((_: any, index: number) => ``);
      
          this.chartOptionsLine2.series = [
            { name: 'No of Approved Consumables', data: dhsaiFixed ,color:'#0077b6'},
            { name: 'No of Supplied Consumables', data: issueaainstIndent,color:'#007200' },
            { name: 'Supplied %', data: aginAI_Perc,color:'#e85d04' },
          ];
      
          // Use defaultBarNames if warehousename is null or undefined
          this.chartOptionsLine2.xaxis = { categories: defaultBarNames };
          this.cO = this.chartOptionsLine2;
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


