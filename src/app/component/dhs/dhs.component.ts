import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { DistrictService } from 'src/app/service/district.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';

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
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DHSDetailsItemWise } from 'src/app/Model/DHSDetailsItemWise';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DhsSummary } from 'src/app/Model/DhsSummary';
import { ApiService } from 'src/app/service/api.service';

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
  selector: 'app-dhs',
  templateUrl: './dhs.component.html',
  styleUrls: ['./dhs.component.css']
})
export class DHSComponent {
  @ViewChild('chart') chart: ChartComponent | undefined;
  public cO: Partial<ChartOptions> | undefined;
  chartOptions: ChartOptions;

  displayedColumns: string[] = [
    'year',
    'item_id',
    'item_name',
    'nouspo',
    'nosconsignee',
    'poqty',
    'poValue',
    'rQTY',
    'rValue',
    'insqty',
    'iValue',
    'status'
  ];

  columnNames: { [key: string]: string } = {
    year: 'year',
    item_id: 'item_id',
    item_name: 'item_name',
    nouspo: 'nouspo',
    nosconsignee: 'nosconsignee',
    poqty: 'poqty',
    poValue: 'poValue',
    rQTY: 'rQTY',
    rValue: 'rValue',
    insqty: 'insqty',
    iValue: 'iValue',
    status: 'status'
  };

  dataSource!: MatTableDataSource<DHSDetailsItemWise>;
  dispatchPendings: DHSDetailsItemWise[] = [];
  selectedTabIndex: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dateRange: FormGroup;

  constructor(
    private spinner: NgxSpinnerService,
    public api: ApiService,
    private http: HttpClient,
    private breakpointObserver: BreakpointObserver,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    public datePipe: DatePipe 
  ) {
    this.chartOptions = {
      series: [],
      chart: {
        type: 'bar',
        height: 350,
        events: {
          dataPointSelection: (
            event,
            chartContext,
            { dataPointIndex, seriesIndex }
          ) => {
            const selectedCategory =
              this.chartOptions?.xaxis?.categories?.[dataPointIndex];
            const selectedSeries =
              this.chartOptions?.series?.[seriesIndex]?.name;
            if (selectedCategory && selectedSeries) {
              // this.fetchDataBasedOnChartSelection(
              //   selectedCategory,
              //   selectedSeries
              // );
            }
          },
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
        },
      },
      xaxis: {
        categories: []
      },
      yaxis: {
        title: {
          text: undefined
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      title: {
        text: 'Online DHS Summary Report',
        align: 'center'
      },
      tooltip: {
        y: {
          formatter: function (val: any) {
            return val.toString();
          }
        }
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: 'top',
        horizontalAlign: 'center',
        offsetX: 40
      },
    };
    this.dateRange = this.fb.group({
      // examlpe dates 2022-04-01 to 2022-08-30

      start: [new Date('2022-04-01')],
      end: [new Date('2022-08-30')]
    });
    this.dateRange.valueChanges.subscribe(() => {
      this.onDateRangeChange();
    });

    this.dataSource = new MatTableDataSource<DHSDetailsItemWise>([]);
    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.Tablet, Breakpoints.Web])
      .subscribe((result) => {
        if (result.matches) {
          this.displayedColumns = [
            'year',
            'item_id',
            'item_name',
            'nouspo',
            'nosconsignee',
            'poqty',
            'poValue',
            'rQTY',
            'rValue',
            'insqty',
            'iValue',
            'status'
          ];
        }
      });
  }

  ngOnInit(): void {
    this.spinner.show();
    this.getAllDispatchPending();
    this.onDateRangeChange();
  }

  getAllDispatchPending() {
    this.api.getDHSDetailsItemWise().subscribe((res) => {
      this.dispatchPendings = res;
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyTextFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDateRangeChange() {
    // 
    const startDate = this.dateRange.value.start;
    const endDate = this.dateRange.value.end;
  
    if (startDate && endDate) {
      const formattedStartDate = this.datePipe.transform(startDate, 'yyyy-MM-dd') || '';
      const formattedEndDate = this.datePipe.transform(endDate, 'yyyy-MM-dd') || '';
  
      // console.log('Start Date:', formattedStartDate);
      // console.log('End Date:', formattedEndDate);
  
      this.spinner.show();
  
      this.api.getDHSSummaryDateRange(formattedStartDate, formattedEndDate).subscribe((res) => {
        // console.log('API Response:', res);
  
        const filteredData = res.filter(item => {
          const itemDate = new Date(item.year);
          return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
        });
  
        // console.log('Filtered Data:', filteredData);
  
        const year: string[] = [];
        const nosItems: number[] = [];
        const nouspo: number[] = [];
        const poValue: number[] = [];
        const rValue: number[] = [];
        const iValue: number[] = [];
  
        res.forEach((item: { year: string; nosItems:number; nouspo:number; poValue: number; rValue: number; iValue: number; }) => {
          year.push(item.year);
          nosItems.push(item.nosItems);
          nouspo.push(item.nouspo);
          poValue.push(item.poValue);
          rValue.push(item.rValue);
          iValue.push(item.iValue);
        });
  
        // console.log('Categories (year):', year);
        // console.log('POValue:', poValue);
        // console.log('RValue:', rValue);
        // console.log('IValue:', iValue);
  
        this.chartOptions.series = [
          { name: 'POValue', data: poValue },
          { name: 'RValue', data: rValue },
          { name: 'IValue', data: iValue }
        ];
        this.chartOptions.xaxis = {
          categories: year
        };
  
        this.cdr.detectChanges();
        this.spinner.hide();
      }, (error) => {
        console.error('Error fetching data', error);
        this.spinner.hide();
      });
    }
  }
  
  

  loadData(): void {
    this.spinner.show();
    this.api.getDHSSummary().subscribe(
      (data: any) => {
        const year: string[] = [];
        const nosItems: number[] = [];
        const nouspo: number[] = [];
        const poValue: number[] = [];
        const rValue: number[] = [];
        const iValue: number[] = [];

        data.forEach((item: { year: string; nosItems: number; nouspo: number; poValue: number; rValue: number; iValue: number; }) => {
          year.push(item.year);
          nosItems.push(item.nosItems);
          nouspo.push(item.nouspo);
          poValue.push(item.poValue);
          rValue.push(item.rValue);
          iValue.push(item.iValue);
        });

        this.chartOptions.series = [
          {
            name: 'POValue',
            data: poValue
          },
          {
            name: 'RValue',
            data: rValue
          },
          {
            name: 'IValue',
            data: iValue
          }
        ];
        this.chartOptions.xaxis = {
          categories: year
        };
        this.cdr.detectChanges();
        this.spinner.hide();
      },
      (error: any) => {
        console.error('Error fetching data', error);
        this.spinner.hide();
      }
    );
  }

  

  selectedTabValue(event: any): void {
    this.selectedTabIndex = event.index;
  }
}
