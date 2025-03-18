import { NgFor, CommonModule, DatePipe, NgStyle } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexLegend, ApexPlotOptions, ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/service/api.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { MatTabChangeEvent } from '@angular/material/tabs';
import {  ASFile, PriceEvaluation, TenderEvaluation, TenderEvaluationDetails, TenderStatus, TobeTenderAppliedZonalPermission, TobeTenderDetailsAS, TobeTenderDetailsCancelled, TobeTenderDetailsProposedCancelled, TobeTenderRejection } from 'src/app/Model/DashProgressCount';
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
  selector: 'app-to-be-tender',
  standalone: true,
  imports: [
    NgApexchartsModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatTableExporterModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    MatMenuModule,
    NgFor,
    CommonModule,
    NgFor,
    NgStyle,
    MatCardModule,
    MatIconModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
  ],
  templateUrl: './to-be-tender.component.html',
  styleUrl: './to-be-tender.component.css',
})
export class ToBeTenderComponent {
  //#region chart
  @ViewChild('chart') chart: ChartComponent | undefined;
  @ViewChild('itemDetailsModal') itemDetailsModal: any;
  public cO: Partial<ChartOptions> | undefined;
  chartOptions!: ChartOptions; // For bar chart
  chartOptions2!: ChartOptions; // For bar charta
  chartOptionsLine!: ChartOptions; // For line chart
  chartOptionsLine2!: ChartOptions; // For line chart
  //#endregion
  //#region DataBase Table
  dataSource!: MatTableDataSource<TobeTenderDetailsAS>;
  dataSourceCancelled!: MatTableDataSource<TobeTenderDetailsCancelled>;
  dataSourceProposedCancelled!: MatTableDataSource<TobeTenderDetailsProposedCancelled>;
  dataSource1!: MatTableDataSource<TobeTenderRejection>;
  dataSourceZonal!: MatTableDataSource<TobeTenderAppliedZonalPermission>;
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('paginatorPageSize') paginatorPageSize!: MatPaginator;
  @ViewChild('paginator1') paginator1!: MatPaginator;
  @ViewChild('paginatorcan') paginatorcan!: MatPaginator;
  @ViewChild('paginatorProcan') paginatorProcan!: MatPaginator;
  @ViewChild('sort1') sort1!: MatSort;
  @ViewChild('sort2') sort2!: MatSort;
  @ViewChild('sort3') sort3!: MatSort;
  @ViewChild('sort4') sort4!: MatSort;
  @ViewChild('sort') sort!: MatSort;
  dispatchData: TobeTenderDetailsAS[] = [];
  dispatchDataCancelled: TobeTenderDetailsCancelled[] = [];
  dispatchDataProposedCancelled: TobeTenderDetailsProposedCancelled[] = [];
  dispatchData1: TobeTenderRejection[] = [];
  dispatchDataZonal: TobeTenderAppliedZonalPermission[] = [];

  //#endregion

  TobetenderGTotal: TenderStatus[] = [];
  TobetenderProgress: TenderStatus[] = [];
  tValues: number[] = []; // Declare tValues as a class property
  ASFileData: ASFile[] = [];
  Visible: boolean = false;
  isVisible: boolean = false;
  onVisible: boolean = false;
  VisibleCAN: boolean = false;
  VisiblePROCAN: boolean = false;

  name: any;
  divisionid: any;
  himisDistrictid: any;
  mainschemeid: any;
  constructor(
    public api: ApiService,
    public spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    public datePipe: DatePipe
  ) {
    this.dataSource = new MatTableDataSource<TobeTenderDetailsAS>([]);
    this.dataSourceCancelled =
      new MatTableDataSource<TobeTenderDetailsCancelled>([]);
    this.dataSourceProposedCancelled =
      new MatTableDataSource<TobeTenderDetailsProposedCancelled>([]);
    this.dataSource = new MatTableDataSource<TobeTenderDetailsAS>([]);
    this.dataSource1 = new MatTableDataSource<TobeTenderRejection>([]);
    this.dataSourceZonal =
      new MatTableDataSource<TobeTenderAppliedZonalPermission>([]);
  }

  ngOnInit() {
    this.initializeChartOptions();
    this.TenderStatusTotal();
    this.TenderStatusProgress();
  }
  initializeChartOptions() {
    this.chartOptions = {
      series: [],
      chart: {
        type: 'bar',
        stacked: true,
        // height: 'auto',
        events: {
          dataPointSelection: (
            event,
            chartContext,
            { dataPointIndex, seriesIndex }
          ) => {
            const selectedCategory =
              this.chartOptions?.xaxis?.categories?.[dataPointIndex]; // This is likely just the category name (a string)
            const selectedSeries =
              this.chartOptions?.series?.[seriesIndex]?.name;
            if (selectedCategory && selectedSeries) {
              const apiData = this.TobetenderProgress; // Replace with the actual data source or API response
              const selectedData = apiData.find(
                (data) => data.name === selectedCategory
              );
              if (selectedData) {
                const id = selectedData.id; // Extract the id from the matching entry
                this.name = selectedData.name; // Extract the id from the matching entry
                // this.fetchDataBasedOnChartSelectionTotal(id, selectedSeries);
                if (selectedData.id == '1') {
                  this.Visible = true;
                  this.isVisible = false;
                  this.onVisible = false;
                  this.VisibleCAN = false;
                  this.VisiblePROCAN = false;
                  this.fetchDataBasedOnChartSelectionTotal(id, selectedSeries);
                } else if (selectedData.id == '19') {
                  this.VisibleCAN = true;
                  this.Visible = false;
                  this.isVisible = false;
                  this.onVisible = false;
                  this.VisiblePROCAN = false;
                  this.GETTobeTenderDetailsWOCancelled(id, selectedSeries);
                } else if (selectedData.id == '34') {
                  this.VisiblePROCAN = true;
                  this.VisibleCAN = false;
                  this.Visible = false;
                  this.isVisible = false;
                  this.onVisible = false;
                  this.GETTobeTenderDetailsWOCancelled34(id, selectedSeries);
                } else if (selectedData.id == '23') {
                  this.Visible = false;
                  this.VisibleCAN = false;
                  this.isVisible = true;
                  this.onVisible = false;
                  this.VisiblePROCAN = false;

                  this.GETTobeTenderRejection(id, selectedSeries);
                } else if (selectedData.id == '25') {
                  this.Visible = false;
                  this.VisibleCAN = false;
                  this.isVisible = false;
                  this.onVisible = true;
                  this.VisiblePROCAN = false;

                  this.GETTobeTenderAppliedZonalPermission(id, selectedSeries);
                }
                // else {

                // }
              } else {
                console.log(
                  `No data found for selected category: ${selectedCategory}`
                );
              }
            } else {
              console.log('Selected category or series is invalid.');
            }
          },
        },
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
          text: undefined,
        },
      },
      dataLabels: {
        enabled: true,
        formatter: (val: any, { dataPointIndex }: any) => {
          const tValue = this.tValues[dataPointIndex]; // Use class property
          // return `${val}/${tValue}`;
          return `${val}/(${tValue})`;
        },
        style: {
          fontSize: '12px',
          colors: ['#000'],
        },
      },
      tooltip: {
        y: {
          formatter: (val: any, { dataPointIndex }: any) => {
            const tValue = this.tValues[dataPointIndex]; // Use class property
            return `${val}/(${tValue} In Cr)`;
          },
        },
      },
      // dataLabels: {
      //   enabled: true,
      //   style: {
      //     // colors: ['#FF0000']
      //     colors: ['#000'],
      //   },
      // },
      stroke: {
        width: -5,
        // colors: ['#000'],
        colors: ['#fff'],
      },
      title: {
        text: 'Stage-wise To be Tender Works',
        align: 'center',
        style: {
          fontSize: '12px',
          // color: '#000'
          color: '#6e0d25',
        },
      },
      // tooltip: {
      //   y: {
      //     formatter: function (val: any) {
      //       return val.toString();
      //     },
      //   },
      // },
      fill: {
        opacity: 1,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'center',
        offsetX: 40,
      },
    };
    this.chartOptionsLine = {
      series: [],
      chart: {
        type: 'bar',
        stacked: false,
        // height: 'auto',
        events: {
          dataPointSelection: (
            event,
            chartContext,
            { dataPointIndex, seriesIndex }
          ) => {
            const selectedCategory =
              this.chartOptionsLine2?.xaxis?.categories?.[dataPointIndex]; // This is likely just the category name (a string)
            const selectedSeries =
              this.chartOptionsLine2?.series?.[seriesIndex]?.name;
            if (selectedCategory && selectedSeries) {
              const apiData = this.TobetenderGTotal; // Replace with the actual data source or API response
              const selectedData = apiData.find(
                (data) => data.name === selectedCategory
              );
              if (selectedData) {
                const id = selectedData.id; // Extract the id from the matching entry

                // this.fetchDataBasedOnChartSelectionTotal(0, selectedSeries);
              } else {
                console.log(
                  `No data found for selected category: ${selectedCategory}`
                );
              }
            } else {
              console.log('Selected category or series is invalid.');
            }
          },
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth:'20%',
          borderRadius:3,
          distributed: false,
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        },
      },
      xaxis: {
        categories: [],
        // position: 'top',
      },
      yaxis: {
        title: {
          text: undefined,
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          // colors: ['#FF0000']
          colors: ['#000'],
        },
      },
      stroke: {
        width: 1,
        // colors: ['#000'],
        colors: ['#fff'],
      },
      title: {
        text: 'Summary of To be Tender Works',
        align: 'center',
        style: {
          fontSize: '12px',
          // color: '#000'
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
  }

  TenderStatusTotal(): void {
    this.spinner.show();
    var roleName = localStorage.getItem('roleName');
    if (roleName == 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      this.chartOptionsLine.chart.height = '200px';
      this.himisDistrictid = 0;
      this.mainschemeid = 0;
    } else if (roleName == 'Collector') {
      this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
      // var RPType = 'GTotal';
      this.divisionid = 0;
      this.mainschemeid = 0;
      this.chartOptionsLine.chart.height = '400px';
    } else {
      this.divisionid = 0;
      this.himisDistrictid = 0;
      this.mainschemeid = 0;
      this.chartOptionsLine.chart.height = '300';
    }
    this.api
      .GETTenderStatus(
        'GTotal',
        this.divisionid,
        this.himisDistrictid,
        this.mainschemeid
      )
      .subscribe(
        (data: any) => {
          this.TobetenderGTotal = data;
          // console.log('API Response total:', this.TobetenderGTotal);

          const id: string[] = [];
          const name: string[] = [];
          const nosWorks: any[] = [];
          const tValue: number[] = [];

          data.forEach(
            (item: {
              name: string;
              id: any;
              nosWorks: any;
              tValue: number;
            }) => {
              id.push(item.id);
              name.push(item.name);
              nosWorks.push(item.nosWorks);
              tValue.push(item.tValue);
            }
          );

          this.chartOptionsLine.series = [
            {
              name: 'No of Works',
              data: nosWorks,
              color: '#eeba0b',
            },
            {
              name: 'Total Value in Cr',
              data: tValue,
              color: 'rgba(93, 243, 174, 0.85)',
            },
          ];
          this.chartOptionsLine.xaxis = { categories: name };
          this.cO = this.chartOptionsLine;
          this.cdr.detectChanges();

          this.spinner.hide();
        },
        (error: any) => {
          console.error('Error fetching data', error);
        }
      );
  }
  TenderStatusProgress(): void {
    this.spinner.show();
    const roleName = localStorage.getItem('roleName');
    if (roleName === 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      this.himisDistrictid = 0;
      this.mainschemeid = 0;
      this.chartOptions.chart.height = '200px';
    } else if (roleName === 'Collector') {
      this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
      this.divisionid = 0;
      this.mainschemeid = 0;
      this.chartOptions.chart.height = '400px';
    } else {
      this.divisionid = 0;
      this.himisDistrictid = 0;
      this.mainschemeid = 0;
      this.chartOptions.chart.height = '300px';
    }

    this.api
      .GETTenderStatus(
        'Progress',
        this.divisionid,
        this.himisDistrictid,
        this.mainschemeid
      )
      .subscribe(
        (data: any) => {
          this.TobetenderProgress = data;
          // console.log('TobetenderProgress:', this.TobetenderProgress);
          const id: string[] = [];
          const name: string[] = [];
          const nosWorks: number[] = [];
          this.tValues = []; // Initialize tValues

          data.forEach(
            (item: {
              id: any;
              name: string;
              nosWorks: number;
              tValue: number;
            }) => {
              id.push(item.id);
              name.push(item.name);
              nosWorks.push(item.nosWorks);
              this.tValues.push(item.tValue); // Populate tValues
            }
          );

          this.chartOptions.series = [
            {
              name: 'No of Works',
              data: nosWorks,
              color: '#eeba0b',
            },
          ];
          this.chartOptions.xaxis = { categories: name };
          this.cdr.detectChanges();

          this.spinner.hide();
        },
        (error: any) => {
          console.error('Error fetching data', error);
        }
      );
  }

  // #region dataBase
  fetchDataBasedOnChartSelectionTotal(id: any, seriesName: string): void {
    console.log(`Selected ID: ${id}, Series: ${seriesName}`);
    const roleName = localStorage.getItem('roleName');
    if (roleName === 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      this.himisDistrictid = 0;
      this.mainschemeid = 0;
    }
    else {
      this.himisDistrictid 
      this.divisionid = 0;
      this.himisDistrictid = 0;
      this.mainschemeid = 0;
    }
    this.spinner.show();
    this.api
      .GETTobeTenderDetailsAS1(this.divisionid, this.himisDistrictid, this.himisDistrictid,)
      .subscribe(
        (res) => {
          this.dispatchData = res.map(
            (item: TobeTenderDetailsAS, index: number) => ({
              ...item,
              sno: index + 1,
            })
          );
          // console.log('res:', res);
          // console.log('dataSource:', this.dataSource);
          // console.log('dispatchData=:', this.dispatchData);
          this.dataSource.data = this.dispatchData;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.cdr.detectChanges();
          this.spinner.hide();
        },
        (error) => {
          console.error('Error fetching data', error);
        }
      );
    // this.openDialog();
  }
  GETTobeTenderDetailsWOCancelled(ppid: any, seriesName: string): void {
    const roleName = localStorage.getItem('roleName');
    if (roleName === 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      this.himisDistrictid = 0;
      this.mainschemeid = 0;
    }
    else {
      this.himisDistrictid 
      this.divisionid = 0;
      this.himisDistrictid = 0;
      this.mainschemeid = 0;
    }
    // const distid = 0;
    // const mainSchemeId = 0;
    // const divisionID = 0;
    this.spinner.show();
    this.api
      .GETTobeTenderDetailsWOCancelled(this.divisionid, this.himisDistrictid, this.himisDistrictid, ppid)
      .subscribe(
        (res) => {
          this.dispatchDataCancelled = res.map(
            (item: TobeTenderDetailsAS, index: number) => ({
              ...item,
              sno: index + 1,
            })
          );
          // console.log('res:', res);
          // console.log('dispatchData=:', this.dispatchDataCancelled);
          this.dataSourceCancelled.data = this.dispatchDataCancelled;
          this.dataSourceCancelled.paginator = this.paginatorcan;
          this.dataSourceCancelled.sort = this.sort3;
          this.cdr.detectChanges();
          this.spinner.hide();
        },
        (error) => {
          console.error('Error fetching data', error);
        }
      );
    // this.openDialog();
  }
  GETTobeTenderDetailsWOCancelled34(ppid: any, seriesName: string): void {
    // console.log(`Selected ID: ${ppid}, Series: ${seriesName}`);
    // const distid = 0;
    // const mainSchemeId = 0;
    // const divisionID = 0;
    const roleName = localStorage.getItem('roleName');
    if (roleName === 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      this.himisDistrictid = 0;
      this.mainschemeid = 0;
    }
    else {
      this.himisDistrictid 
      this.divisionid = 0;
      this.himisDistrictid = 0;
      this.mainschemeid = 0;
    }
    this.spinner.show();
    this.api
      .GETTobeTenderDetailsWOCancelled(this.divisionid,  this.mainschemeid , this.himisDistrictid , ppid)
      .subscribe(
        (res) => {
          this.dispatchDataProposedCancelled = res.map(
            (item: TobeTenderDetailsAS, index: number) => ({
              ...item,
              sno: index + 1,
            })
          );
          // console.log('res:', res);
          // console.log('dispatchData=:', this.dispatchDataProposedCancelled);
          this.dataSourceProposedCancelled.data =
            this.dispatchDataProposedCancelled;
          this.dataSourceProposedCancelled.paginator = this.paginatorProcan;
          this.dataSourceProposedCancelled.sort = this.sort4;
          this.cdr.detectChanges();
          this.spinner.hide();
        },
        (error) => {
          console.error('Error fetching data', error);
        }
      );
    // this.openDialog();
  }
  GETTobeTenderRejection(ppid: any, seriesName: string): void {
    ;
    // console.log(`Selected ID: ${ppid}, Series: ${seriesName}`);
    const roleName = localStorage.getItem('roleName');
    if (roleName === 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      this.himisDistrictid = 0;
      this.mainschemeid = 0;
    }
    else {
      this.himisDistrictid 
      this.divisionid = 0;
      this.himisDistrictid = 0;
      this.mainschemeid = 0;
    }
    // alert( this.divisionid);
    this.spinner.show();
    this.api
      .GETTobeTenderRejection23(this.divisionid,  this.mainschemeid , this.himisDistrictid)
      .subscribe(
        (res) => {
          this.dispatchData1 = res.map(
            (item: TobeTenderRejection, index: number) => ({
              ...item,
              sno: index + 1,
            })
          );
          // console.log('GETTobeTenderRejection23:', res);
          // console.log('dispatchDatareject =:', this.dispatchData1);
          this.dataSource1.data = this.dispatchData1;
          this.dataSource1.paginator = this.paginatorPageSize;
          this.dataSource1.sort = this.sort1;
          this.cdr.detectChanges();
          this.spinner.hide();
        },
        (error) => {
          console.error('Error fetching data', error);
        }
      );
    // this.openDialog();
  }
  GETTobeTenderAppliedZonalPermission(ppid: any, seriesName: string): void {
    // console.log(`Selected ID: ${ppid}, Series: ${seriesName}`);
    const roleName = localStorage.getItem('roleName');
    if (roleName === 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      this.himisDistrictid = 0;
      this.mainschemeid = 0;
    }
    else {
      this.himisDistrictid 
      this.divisionid = 0;
      this.himisDistrictid = 0;
      this.mainschemeid = 0;
    }
    this.spinner.show();
    this.api
      .GETTobeTenderAppliedZonalPermission25(this.divisionid,  this.mainschemeid , this.himisDistrictid)
      .subscribe(
        (res) => {
          this.dispatchDataZonal = res.map(
            (item: TobeTenderAppliedZonalPermission, index: number) => ({
              ...item,
              sno: index + 1,
            })
          );
          // console.log('res:', res);
          // console.log(
          //   'GETTobeTenderAppliedZonalPermission25 =:',
          //   this.dispatchDataZonal
          // );
          this.dataSourceZonal.data = this.dispatchDataZonal;
          this.dataSourceZonal.paginator = this.paginator1;
          this.dataSourceZonal.sort = this.sort2;
          this.cdr.detectChanges();
          this.spinner.hide();
        },
        (error) => {
          console.error('Error fetching data', error);
        }
      );
    // this.openDialog();
  }
  //#endregion
  // data filter
  CANapplyTextFilter34(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceProposedCancelled.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceProposedCancelled.paginator) {
      this.dataSourceProposedCancelled.paginator.firstPage();
    }
  }
  CANapplyTextFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceCancelled.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceCancelled.paginator) {
      this.dataSourceCancelled.paginator.firstPage();
    }
  }
  applyTextFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  SapplyTextFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();
    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
  }
  ZapplyTextFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceZonal.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceZonal.paginator) {
      this.dataSourceZonal.paginator.firstPage();
    }
  }
  CANexportToPDF34() {
    const doc = new jsPDF('l', 'mm', 'a4');
    const columns = [
      { title: 'S.No', dataKey: 'sno' },
      { title: 'Head', dataKey: 'head' },
      { title: 'Division', dataKey: 'division' },
      { title: 'District', dataKey: 'district' },
      { title: 'Block', dataKey: 'block_Name_En' },
      { title: 'Proposed Letter No', dataKey: 'letterno' },
      { title: 'Health Center', dataKey: 'detailS_ENG' },
      { title: 'Work', dataKey: 'workname' },
      { title: 'AS Amount(In Lacs)', dataKey: 'valueWorks' },
      { title: 'AS DT', dataKey: 'asDate' },
      { title: 'Proposed Letter No', dataKey: 'woCancelProposalLetterNo' },
      { title: 'Proposed DT', dataKey: 'pDate' },
      { title: 'Work ID', dataKey: 'work_id' },
    ];
    const rows = this.dispatchDataProposedCancelled.map((row) => ({
      sno: row.sno,
      head: row.head,
      division: row.division,
      district: row.district,
      block_Name_En: row.block_Name_En,
      letterno: row.letterno,
      detailS_ENG: row.detailS_ENG,
      work_id: row.work_id,
      workname: row.workname,
      valueWorks: row.valueWorks,
      asDate: row.asDate,
      woCancelProposalLetterNo: row.woCancelProposalLetterNo,
      pDate: row.pDate,
    }));

    autoTable(doc, {
      columns: columns,
      body: rows,
      startY: 20,
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] },
    });

    doc.save('ProposedCancelledDetails.pdf');
  }
  CANexportToPDF() {
    const doc = new jsPDF('l', 'mm', 'a4');
    const columns = [
      { title: 'S.No', dataKey: 'sno' },
      { title: 'Head', dataKey: 'head' },
      { title: 'Division', dataKey: 'division' },
      { title: 'District', dataKey: 'district' },
      { title: 'Block', dataKey: 'block_Name_En' },
      { title: 'AS Letter No', dataKey: 'letterno' },
      { title: 'Health Center', dataKey: 'detailS_ENG' },
      { title: 'Work', dataKey: 'workname' },
      { title: 'AS Amount (In Lacs)', dataKey: 'valueWorks' },
      { title: 'AS DT', dataKey: 'asDate' },
      { title: 'Proposed Letter No', dataKey: 'woCancelProposalLetterNo' },
      { title: 'Cancelled LetterNo_HO', dataKey: 'wocancelletterno' },
      { title: 'Cancelled DT', dataKey: 'pDate' },
      { title: 'Work ID', dataKey: 'work_id' },
    ];
    const rows = this.dispatchDataCancelled.map((row) => ({
      //  'sno','head','division','district','block_Name_En','letterno', 'detailS_ENG','workname',
      // 'valueWorks','asDate','woCancelProposalLetterNo','wocancelletterno','pDate','work_id'
      sno: row.sno,
      head: row.head,
      division: row.division,
      district: row.district,
      block_Name_En: row.block_Name_En,
      letterno: row.letterno,
      detailS_ENG: row.detailS_ENG,
      workname: row.workname,
      valueWorks: row.valueWorks,
      asDate: row.asDate,
      woCancelProposalLetterNo: row.woCancelProposalLetterNo,
      wocancelletterno: row.wocancelletterno,
      pDate: row.pDate,
      work_id: row.work_id,
    }));

    autoTable(doc, {
      columns: columns,
      body: rows,
      startY: 20,
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] },
    });

    doc.save('AcceptanceCancelledDetails.pdf');
  }
  exportToPDF() {
    const doc = new jsPDF('l', 'mm', 'a4');
    const columns = [
      //  'sno','head','division','district','block_Name_En','letterno', 'detailS_ENG',
      //  'workname','valueWorks','asDate' ,'parentprogress','dashName','groupName','work_id'
      { title: 'S.No', dataKey: 'sno' },
      { title: 'AS Letter No', dataKey: 'letterno' },
      { title: 'Head', dataKey: 'head' },
      { title: 'Division', dataKey: 'division' },
      { title: 'District', dataKey: 'district' },
      { title: 'Block', dataKey: 'block_Name_En' },
      { title: 'Work ID', dataKey: 'work_id' },
      { title: 'Work Name', dataKey: 'workname' },
      { title: 'Health Center', dataKey: 'detailS_ENG' },
      { title: 'AS Amount (In Lacs)', dataKey: 'valueWorks' },
      { title: 'AS DT', dataKey: 'asDate' },
      //  { title: 'parentprogress', dataKey: 'parentprogress' },
      //  { title: 'dashName', dataKey: 'dashName' },
      //  { title: 'groupName', dataKey: 'groupName' },
    ];
    const rows = this.dispatchData.map((row) => ({
      sno: row.sno,
      head: row.head,
      division: row.division,
      district: row.district,
      block_Name_En: row.block_Name_En,
      letterNo: row.letterno,
      detailS_ENG: row.detailS_ENG,
      work_id: row.work_id,
      workname: row.workname,
      valueWorks: row.valueWorks,
      asDate: row.asDate,
      //  parentprogress: row.parentprogress,
      //  dashName: row.dashName,
      //  groupName: row.groupName,
    }));

    autoTable(doc, {
      columns: columns,
      body: rows,
      startY: 20,
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] },
    });

    doc.save('AdministrativeSanctionDetails.pdf');
  }
  SexportToPDF() {
    const doc = new jsPDF('l', 'mm', 'a4');
    const columns = [
      { title: 'S.No', dataKey: 'sno' },
      { title: 'AS Letter No', dataKey: 'letterno' },
      { title: 'Head', dataKey: 'head' },
      { title: 'Division', dataKey: 'division' },
      { title: 'District', dataKey: 'district' },
      { title: 'block_Name_En', dataKey: 'block_Name_En' },
      { title: 'Work ID', dataKey: 'work_id' },
      { title: 'Work Name', dataKey: 'workname' },
      { title: 'DetailS', dataKey: 'detailS_ENG' },
      { title: 'Value Works', dataKey: 'valueWorks' },
      { title: 'AS Date', dataKey: 'asDate' },
      { title: 'Parent Progress', dataKey: 'parentprogress' },
      { title: 'Dash Name', dataKey: 'dashName' },
      { title: 'Group Name', dataKey: 'groupName' },
      { title: 'P Date', dataKey: 'pDate' },
      { title: 'RejReason', dataKey: 'rejReason' },
      { title: 'RejectedDT', dataKey: 'rejectedDT' },
      { title: 'LastNIT', dataKey: 'lastNIT' },
      { title: 'Ppid', dataKey: 'ppid' },
      { title: 'Last Eprocno', dataKey: 'lastEprocno' },
    ];
    const rows = this.dispatchData1.map((row) => ({
      sno: row.sno,
      head: row.head,
      division: row.division,
      district: row.district,
      block_Name_En: row.block_Name_En,
      letterNo: row.letterno,
      detailS_ENG: row.detailS_ENG,
      work_id: row.work_id,
      workname: row.workname,
      valueWorks: row.valueWorks,
      asDate: row.asDate,
      parentprogress: row.parentprogress,
      pDate: row.pDate,
      dashName: row.dashName,
      groupName: row.groupName,
      rejReason: row.rejReason,
      rejectedDT: row.rejectedDT,
      lastNIT: row.lastNIT,
      ppid: row.ppid,
      lastEprocno: row.lastEprocno,
    }));

    autoTable(doc, {
      columns: columns,
      body: rows,
      startY: 20,
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] },
    });

    doc.save('TobeTenderRejectionDetails.pdf');
  }
  ZexportToPDF() {
    const doc = new jsPDF('l', 'mm', 'a4');
    const columns = [
      { title: 'S.No', dataKey: 'sno' },
      { title: 'AS Letter No', dataKey: 'letterno' },
      { title: 'Head', dataKey: 'head' },
      { title: 'Division', dataKey: 'division' },
      { title: 'District', dataKey: 'district' },
      { title: 'Block Name', dataKey: 'block_Name_En' },
      { title: 'Work ID', dataKey: 'work_id' },
      { title: 'Work Name', dataKey: 'workname' },
      { title: 'DetailS', dataKey: 'detailS_ENG' },
      { title: 'Value', dataKey: 'value' },
      { title: 'AS Date', dataKey: 'asDate' },
      { title: 'lProgress', dataKey: 'lProgress' },
      { title: 'Progress DT', dataKey: 'progressDT' },
      { title: 'Zonal Type', dataKey: 'zonalType' },
      { title: 'Nit No', dataKey: 'nitNo' },
      { title: 'Ppid', dataKey: 'ppid' },
      { title: 'Tender ID', dataKey: 'tenderID' },
      { title: 'Apild', dataKey: 'apild' },
    ];
    const rows = this.dispatchDataZonal.map((row) => ({
      sno: row.sno,
      head: row.head,
      division: row.division,
      district: row.district,
      block_Name_En: row.block_Name_En,
      letterNo: row.letterno,
      detailS_ENG: row.detailS_ENG,
      work_id: row.work_id,
      workname: row.workname,
      value: row.value,
      asDate: row.asDate,
      lProgress: row.lProgress,
      progressDT: row.progressDT,
      zonalType: row.zonalType,
      nitNo: row.nitNo,
      ppid: row.ppid,
      tenderID: row.tenderID,
      apild: row.apild,
    }));

    autoTable(doc, {
      columns: columns,
      body: rows,
      startY: 20,
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] },
    });

    doc.save('AZonalPermissionDetails.pdf');
  }
  // mat-dialog box
  openDialog() {
    const dialogRef = this.dialog.open(this.itemDetailsModal, {
      width: '100%',
      height: '100%',
      maxWidth: '100%',
      panelClass: 'full-screen-dialog', // Optional for additional styling
      data: {
        /* pass any data here */
      },
      // width: '100%',
      // maxWidth: '100%', // Override default maxWidth
      // maxHeight: '100%', // Override default maxHeight
      // panelClass: 'full-screen-dialog' ,// Optional: Custom class for additional styling
      // height: 'auto',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed');
    });
  }

  onButtonClick2(ASID: any, workid: any): void {
    //  this.value='Active';
    // window.open('https://cgmsc.gov.in/himisr/Upload/W3900002AS2.pdf', '_blank');
    // alert(ASID);
    // alert(this.value);
    // return;
    // asLetterName
    // filename
    this.spinner.show();
    this.api.GETASFile(ASID, workid).subscribe(
      (res) => {
        // this.ASFileData=res;
        const filename = res[0]?.filename; // Ensure `res[0]` exists
        const URL = res[0]?.asLetterName;

        if (filename) {
          window.open(URL, '_blank');
        } else {
          alert(
            '⚠️ Alert: AS Letter Not Found!\n\nThe requested document is missing.\nPlease try again later or contact support.'
          );
          // alert("⚠️ Alert: AS Letter Not Found!\n\nThe requested document (AS Letter) is not available at this moment.\nPlease check again later or contact support for further assistance.");
        }
        //  const URL =this.ASFileData[0].asLetterName;
        // window.open('https://cgmsc.gov.in/himisr/Upload/W3900002AS2.pdf', '_blank');

        // console.log('res:', res);
        // console.log('ASFileData:', this.ASFileData);
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        alert(`Error fetching data: ${error.message}`);
      }
    );
  }

  // TenderStatusProgress(): void {
  //   this.spinner.show();
  //   var roleName = localStorage.getItem('roleName');
  //   if (roleName == 'Division') {
  //     this.divisionid = sessionStorage.getItem('divisionID');
  //     var RPType = 'Progress';
  //     this.chartOptions.chart.height = '200px';
  //     this.himisDistrictid = 0;
  //     this.mainschemeid = 0;
  //   } else if (roleName == 'Collector') {
  //     this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
  //     var RPType = 'Progress';
  //     this.divisionid = 0;
  //     this.mainschemeid = 0;
  //     this.chartOptions.chart.height = '400px';
  //   } else {
  //     this.divisionid = 0;
  //     this.himisDistrictid = 0;
  //     this.mainschemeid = 0;
  //     this.chartOptions.chart.height = '300';
  //     var RPType = 'Progress';
  //   }
  //   this.api
  //     .GETTenderStatus(
  //       RPType,
  //       this.divisionid,
  //       this.himisDistrictid,
  //       this.mainschemeid
  //     )
  //     .subscribe(
  //       (data: any) => {
  //         this.TobetenderProgress = data;
  //         console.log('API Response total:', this.TobetenderProgress);

  //         const id: string[] = [];
  //         const name: string[] = [];
  //         const nosWorks: any[] = [];
  //         const tValue: number[] = [];
  //         const nosValue: number[] = [];
  //         this.tValues = [];
  //         // data.forEach((item: { tValue: number }) => {
  //         //  tValues.push(item.tValue);
  //         // });

  //         data.forEach(
  //           (item: {
  //             name: string;
  //             id: any;
  //             nosWorks: any;
  //             tValue: number;
  //             nosValue:number;
  //           }) => {
  //             id.push(item.id);
  //             name.push(item.name);
  //             nosWorks.push(item.nosWorks);
  //             tValue.push(item.tValue);
  //             nosValue.push(item.tValue);
  //           }
  //         );

  //         this.chartOptions.series = [
  //           {
  //             name: 'No of Works',
  //             data: nosWorks,
  //             // data: nosValue,
  //             color: '#eeba0b',
  //           },
  //           // {
  //           //   name: 'Total Value in Cr',
  //           //   data: tValue,
  //           //   color: 'rgba(93, 243, 174, 0.85)',
  //           // },
  //           // {
  //           //   name: 'Total Value in Cr',
  //           //   data: nosValue,
  //           //   color: 'rgba(93, 183, 243, 0.85)',
  //           // },
  //         ];
  //         this.chartOptions.xaxis = { categories: name };
  //         this.cO = this.chartOptions;
  //         this.cdr.detectChanges();

  //         this.spinner.hide();
  //       },
  //       (error: any) => {
  //         console.error('Error fetching data', error);
  //       }
  //     );
  // }
}
