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
import {  PriceEvaluation, TenderEvaluation, TenderEvaluationDetails, TenderStatus, TobeTenderAppliedZonalPermission, TobeTenderDetailsAS, TobeTenderRejection } from 'src/app/Model/DashProgressCount';
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
  dataSource1!: MatTableDataSource<TobeTenderRejection>;
  dataSourceZonal!: MatTableDataSource<TobeTenderAppliedZonalPermission>;
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('paginatorPageSize') paginatorPageSize!: MatPaginator;
  @ViewChild('paginator1') paginator1!: MatPaginator;
  @ViewChild('sort1') sort1!: MatSort;
  @ViewChild('sort2') sort2!: MatSort;
  @ViewChild('sort') sort!: MatSort;
  dispatchData: TobeTenderDetailsAS[] = [];
  dispatchData1: TobeTenderRejection[] = [];
  dispatchDataZonal: TobeTenderAppliedZonalPermission[] = [];
  TobeTenderAppliedZonalPermission:TobeTenderAppliedZonalPermission[]=[];
  //#endregion
  
  TobetenderGTotal: TenderStatus[] = [];
  TobetenderProgress: TenderStatus[] = [];
  tValues: number[] = []; // Declare tValues as a class property
  Visible:boolean=false;
  isVisible:boolean=false;
  onVisible:boolean=false;

  name:any;
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
     this.dataSource1 = new MatTableDataSource<TobeTenderRejection>([]);
     this.dataSourceZonal = new MatTableDataSource<TobeTenderAppliedZonalPermission>([]);
  }

  ngOnInit() {
    this.initializeChartOptions();
    this.TenderStatusTotal();
    this.TenderStatusProgress();
  }
  initializeChartOptions() {
    console.log('dispatchData1:', this.dispatchData);
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
            const selectedCategory = this.chartOptions?.xaxis?.categories?.[dataPointIndex]; // This is likely just the category name (a string)
            const selectedSeries = this.chartOptions?.series?.[seriesIndex]?.name;
            if (selectedCategory && selectedSeries) {
              const apiData = this.TobetenderProgress; // Replace with the actual data source or API response
              const selectedData = apiData.find(
                (data) => data.name === selectedCategory
              );
              if (selectedData) {
                const id = selectedData.id; // Extract the id from the matching entry
                this.name = selectedData.name; // Extract the id from the matching entry
                // this.fetchDataBasedOnChartSelectionTotal(id, selectedSeries);
                if(selectedData.id == '1'){
                  this.Visible=true;
                  this. isVisible=false;
                  this.onVisible=false;
                  // alert("AS")
                this.fetchDataBasedOnChartSelectionTotal(id, selectedSeries);
                }else if (selectedData.id == '19') {
                  // alert("19")
                  this.Visible=true;
                  this. isVisible=false;
                  this.onVisible=false;
                 this.GETTobeTenderDetailsWOCancelled(id, selectedSeries);
                }else if(selectedData.id == '34') {
                  // alert("34")
                  this.Visible=true;
                  this. isVisible=false;
                  this.onVisible=false;
                  this.GETTobeTenderDetailsWOCancelled(id, selectedSeries);
                }else if(selectedData.id == '23') {
                  // alert("reject")
                  this.Visible=false;
                  this. isVisible=true;
                  this.onVisible=false;
                  this.GETTobeTenderRejection(id, selectedSeries);
                }else if(selectedData.id == '25') {
                  // alert("25")
                  this.Visible=false;
                  this. isVisible=false;
                  this.onVisible=true;
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
          fontSize: '8px',
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
        text: ' Stage-wise To be Tender',
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
        text: 'To be Tender',
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
      .GETTenderStatus('GTotal',this.divisionid,this.himisDistrictid,this.mainschemeid)
      .subscribe(
        (data: any) => {
          this.TobetenderGTotal = data;
          console.log('API Response total:', this.TobetenderGTotal);

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
      .GETTenderStatus('Progress', this.divisionid, this.himisDistrictid, this.mainschemeid)
      .subscribe(
        (data: any) => {
          this.TobetenderProgress = data;

          const id: string[] = [];
          const name: string[] = [];
          const nosWorks: number[] = [];
          this.tValues = []; // Initialize tValues

          data.forEach((item: { id: any; name: string; nosWorks: number; tValue: number }) => {
            id.push(item.id);
            name.push(item.name);
            nosWorks.push(item.nosWorks);
            this.tValues.push(item.tValue); // Populate tValues
          });

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
fetchDataBasedOnChartSelectionTotal(id: any, seriesName: string ): void {
  // console.log(`Selected ID: ${id}, Series: ${seriesName}`);
  const distid = 0;
  const mainSchemeId = 0;
  const divisionID = 0;
  this.spinner.show();
  this.api.GETTobeTenderDetailsAS1(divisionID,mainSchemeId,distid)
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
GETTobeTenderDetailsWOCancelled(ppid: any, seriesName: string ): void {
  console.log(`Selected ID: ${ppid}, Series: ${seriesName}`);
  const distid = 0;
  const mainSchemeId = 0;
  const divisionID = 0;
  this.spinner.show();
  this.api.GETTobeTenderDetailsWOCancelled(divisionID,mainSchemeId,distid,ppid)
    .subscribe(
      (res) => {
        this.dispatchData = res.map(
          (item: TobeTenderDetailsAS, index: number) => ({
            ...item,
            sno: index + 1,
          })
        );
        // console.log('res:', res);
        console.log('dispatchData=:', this.dispatchData);
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
GETTobeTenderRejection(ppid: any, seriesName: string ): void {
  console.log(`Selected ID: ${ppid}, Series: ${seriesName}`);
  const distid = 0;
  const mainSchemeId = 0;
  const divisionID = 0;
  this.spinner.show();
  this.api.GETTobeTenderRejection23(divisionID,mainSchemeId,distid)
    .subscribe(
      (res) => {
        this.dispatchData1 = res.map(
          (item: TobeTenderRejection, index: number) => ({
            ...item,
            sno: index + 1,
          })
        );
        // console.log('res:', res);
        console.log('dispatchDatareject =:', this.dispatchData1);
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
GETTobeTenderAppliedZonalPermission(ppid: any, seriesName: string ): void {
  console.log(`Selected ID: ${ppid}, Series: ${seriesName}`);
  const distid = 0;
  const mainSchemeId = 0;
  const divisionID = 0;
  this.spinner.show();
  this.api.GETTobeTenderAppliedZonalPermission25(divisionID,mainSchemeId,distid)
    .subscribe(
      (res) => {
        this.TobeTenderAppliedZonalPermission=res;
        this.dispatchDataZonal = res.map(
          (item: TobeTenderAppliedZonalPermission, index: number) => ({
            ...item,
            sno: index + 1,
          })
        );
        // console.log('res:', res);
        console.log('GETTobeTenderAppliedZonalPermission25 =:', this.dispatchDataZonal);
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
   { title: 'block_Name_En', dataKey: 'block_Name_En' },
   { title: 'Work ID', dataKey: 'work_id' },
   { title: 'Work Name', dataKey: 'workname' },
   { title: 'detailS_ENG', dataKey: 'detailS_ENG' },
   { title: 'valueWorks', dataKey: 'valueWorks' },
   { title: 'asDate', dataKey: 'asDate' },
   { title: 'parentprogress', dataKey: 'parentprogress' },
   { title: 'dashName', dataKey: 'dashName' },
   { title: 'groupName', dataKey: 'groupName' },
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
   parentprogress: row.parentprogress,
   dashName: row.dashName,
   groupName: row.groupName,
  }));
  
  autoTable(doc, {
   columns: columns,
   body: rows,
   startY: 20,
   theme: 'striped',
   headStyles: { fillColor: [22, 160, 133] },
  });
  
  doc.save('TenderDetails.pdf');
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
      { title: 'detailS_ENG', dataKey: 'detailS_ENG' },
      { title: 'valueWorks', dataKey: 'valueWorks' },
      { title: 'asDate', dataKey: 'asDate' },
      { title: 'parentprogress', dataKey: 'parentprogress' },
      { title: 'dashName', dataKey: 'dashName' },
      { title: 'groupName', dataKey: 'groupName' },
    ];
    const rows = this.dispatchData1.map(row => ({
      
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
   dashName: row.dashName,
   groupName: row.groupName,
    }));
  
    autoTable(doc, {
      columns: columns,
      body: rows,
      startY: 20,
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] }
    });
  
    doc.save('SbuDistrictEngAllotedWorks.pdf');
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
