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
import { Router } from '@angular/router';



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
  selector: 'app-drop-app-warehouse-performance',
  standalone: true,
  imports: [ReactiveFormsModule,MatDatepickerModule,MatSelectModule,MatInputModule,MatFormFieldModule,FormsModule,MatButtonModule,MatMenuModule, MatTableExporterModule,MatPaginatorModule, MatTableModule,NgApexchartsModule],
  templateUrl: './drop-app-warehouse-performance.component.html',
  styleUrl: './drop-app-warehouse-performance.component.css'
})

export class DropAppWarehousePerformanceComponent {
  @ViewChild('chart') chart: ChartComponent | undefined;
  public cO: Partial<ChartOptions> | undefined;
  chartOptions: ChartOptions; // For bar chart
  chartOptionsLine: ChartOptions; // For line chart
  chartOptionsLine2: ChartOptions; // For line chart
  dateRange!: FormGroup;

  constructor(
    private spinner: NgxSpinnerService,
    private api: ApiService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    public datePipe: DatePipe,
    private router:Router
  ) {
    // Bar chart configuration for loadData
    this.chartOptions = {
      series: [],
      chart: {
        type: 'bar',
        stacked: true,
        height: 400,
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      xaxis: {
        categories: [],
      },
      yaxis: {
        title: {
          text: 'Warehouses',
        },
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        width: 1,
        colors: ['#fff'],
      },
      title: {
        text: 'Door Delivery Mobile App Uses  ',
        align: 'center',
      },
      fill: {
        opacity: 1,
      },
      legend: {
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
        type: 'line',
        height: 400,
      },
      stroke: {
        width: 4,
        curve: 'smooth',
      },
      plotOptions: {}, // Add an empty plotOptions
      xaxis: {
        categories: [],
      },
      yaxis: {
        title: {
          text: 'Delivered %',
        },
      },
      dataLabels: {
        enabled: true,
      },
      title: {
        text: 'Percentage of Indent Delivered through Mobile App',
        align: 'center',
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'center',
      },
      tooltip: {
        y: {
          formatter: (val: number) => `${val}`,
        },
      },
    };
    this.chartOptionsLine2 = {
      series: [],
      chart: {
        type: 'line',
        height: 400,
      },
      stroke: {
        width: 4,
        curve: 'smooth',
      },
      plotOptions: {}, // Add an empty plotOptions
      xaxis: {
        categories: [],
      },
      yaxis: {
        title: {
          text: 'Days Taken',
        },
      },
      dataLabels: {
        enabled: true,
        
      },
      title: {
        text: 'Average Time Taken Since Indent Received',
        align: 'center',
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'center',
      },
      tooltip: {
        y: {
          formatter: (val: number) => `${val}`,
        },
      },
    };
    

    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    this.dateRange = this.fb.group({
      start: [firstDayOfMonth],
      end: [tomorrow],
    });

    this.dateRange.valueChanges.subscribe(() => {
      this.loadData();
      this.loadData2();
      this.loadData3();
    });
  }

  loadData(): void {
    const startDate = this.dateRange.value.start;
    const endDate = this.dateRange.value.end;
    const formattedStartDate = this.datePipe.transform(startDate, 'dd-MMM-yyyy') || '';
    const formattedEndDate = this.datePipe.transform(endDate, 'dd-MMM-yyyy') || '';

    if (formattedStartDate && formattedEndDate) {
      this.spinner.show();

      this.api.getDropAppWarehousePerformance(formattedStartDate, formattedEndDate).subscribe(
        (data: any) => {
          const warehousename: string[] = [];
          const droPPEr: number[] = [];
          const indentissued: number[] = [];
          const dropindentid: number[] = [];

          data.forEach((item: any) => {
            warehousename.push(item.warehousename);
            droPPEr.push(item.droPPEr);
            indentissued.push(item.indentissued);
            dropindentid.push(item.dropindentid);
          });

          this.chartOptions.series = [
            { name: 'Indent Delivered By App %', data: droPPEr, color: '#00b4d8' },
            { name: 'No of Indent Delivered By App', data: dropindentid },
            { name: 'Total Indent Delivered', data: indentissued, color: '#eeba0b' },
          ];
          this.chartOptions.xaxis = { categories: warehousename };
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

  loadData2(): void {
    
    const startDate = this.dateRange.value.start;
    const endDate = this.dateRange.value.end;
    const formattedStartDate = this.datePipe.transform(startDate, 'dd-MMM-yyyy') || '';
    const formattedEndDate = this.datePipe.transform(endDate, 'dd-MMM-yyyy') || '';

    if (formattedStartDate && formattedEndDate) {
      this.spinner.show();

      this.api.getDropAppWarehousePerformance(formattedStartDate, formattedEndDate).subscribe(
        (data: any) => {
          const warehousename: string[] = [];
          const droPPEr: number[] = [];

          data.forEach((item: any) => {
            warehousename.push(item.warehousename);
            droPPEr.push(item.droPPEr);
          });

          this.chartOptionsLine.series = [
            { name: 'droPPEr', data: droPPEr, color:'#00008B'  },
          ];
          this.chartOptionsLine.xaxis = { categories: warehousename };
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
  }
  loadData3(): void {
    
    const startDate = this.dateRange.value.start;
    const endDate = this.dateRange.value.end;
    const formattedStartDate = this.datePipe.transform(startDate, 'dd-MMM-yyyy') || '';
    const formattedEndDate = this.datePipe.transform(endDate, 'dd-MMM-yyyy') || '';

    if (formattedStartDate && formattedEndDate) {
      this.spinner.show();

      this.api.getDropAppWarehousePerformance(formattedStartDate, formattedEndDate).subscribe(
        (data: any) => {
          const warehousename: string[] = [];
          const avgdaystakensinceindentrec: number[] = [];

          data.forEach((item: any) => {
            warehousename.push(item.warehousename);
            avgdaystakensinceindentrec.push(item.avgdaystakensinceindentrec);
          });

          this.chartOptionsLine2.series = [
            { name: 'Avg Time', data: avgdaystakensinceindentrec, color:'#00008B'  },
          ];
          this.chartOptionsLine2.xaxis = { categories: warehousename };
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
  home(){
    this.router.navigate(['welcome'])

  }
}


