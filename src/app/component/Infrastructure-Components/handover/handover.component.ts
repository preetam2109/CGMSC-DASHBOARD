import { CommonModule, DatePipe, NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexLegend, ApexPlotOptions, ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HandoverAbstract, GetHandoverDetails, ASFile } from 'src/app/Model/DashProgressCount';
import { ApiService } from 'src/app/service/api.service';
import { MatIconModule } from '@angular/material/icon';
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
  selector: 'app-handover',
  standalone: true,
  imports: [NgApexchartsModule, MatSortModule, MatPaginatorModule, MatTableModule, MatTableExporterModule, MatInputModule, MatDialogModule,
    MatFormFieldModule, MatMenuModule, MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule, FormsModule, NgFor,MatIconModule, CommonModule,],
  templateUrl: './handover.component.html',
  styleUrl: './handover.component.css'
})
export class HandoverComponent {
  dashid = 4001;
  divisionid: any;
  districtid :any;
  SWId = 0;
      fromdt: any;
      todt: any;
  // fromdt='01-04-2023';
  // todt='01-05-2023';
  @ViewChild('chart') chart: ChartComponent | undefined;
  public cO: Partial<ChartOptions> | undefined;
  chartOptions!: ChartOptions; // For bar chart
  chartOptions2!: ChartOptions; // For bar chart
  chartOptions3!: ChartOptions; // For bar chart
  chartOptions4!: ChartOptions; // For bar chart
  HandoverAbstractTotalData: HandoverAbstract[] = [];
  HandoverAbstractSchemeData: HandoverAbstract[] = [];
  HandoverAbstractDistrictData: HandoverAbstract[] = [];
  HandoverAbstractWorkTypeData: HandoverAbstract[] = [];
  whidMap: { [key: string]: number } = {};
  dateRange!: FormGroup;
  // dateRange1!: FormGroup;
  // dateRange2!: FormGroup;
  // dateRange3!: FormGroup;
  tomorrow = new Date();
  //#region data Table
  @ViewChild('itemDetailsModal') itemDetailsModal: any;
  dispatchPendings: GetHandoverDetails[] = [];
   ASFileData: ASFile[] = [];
  dataSource!: MatTableDataSource<GetHandoverDetails>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //#endregion
  //  GetHandoverDetailsData:GetHandoverDetails[]=[];
  name: any;
  totalWorks: any;
  constructor(public api: ApiService, public spinner: NgxSpinnerService, private cdr: ChangeDetectorRef, private fb: FormBuilder,
    public datePipe: DatePipe, private dialog: MatDialog, private toastr: ToastrService,) {
    this.dataSource = new MatTableDataSource<GetHandoverDetails>([]);
  }


  ngOnInit() {
    // Initialize dateRange with today and tomorrow
    //  const today = new Date();
    // //  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    //  const firstDayOfMonthLastYear = new Date(today.getFullYear() - 1, today.getMonth(), 1);
    //  const tomorrow = new Date();
    //  tomorrow.setDate(today.getDate() + 1); // Set tomorrow's date
    //  this.dateRange = this.fb.group({
    //      start: [firstDayOfMonthLastYear],    // Set start date to today
    //     //  start: [firstDayOfMonth],    // Set start date to today
    //     //  end: [tomorrow]    // Set end date to tomorrow
    //      end: [today]    // Set end date to tomorrow
    //  });

    const today = new Date();
    const firstDayOfMonthLastYear = new Date(today.getFullYear(), today.getMonth()-1, 1);

    this.dateRange = this.fb.group({
      start: [firstDayOfMonthLastYear],
      end: [today]
    });

    // this.dateRange1 = this.fb.group({
    //   Start: [firstDayOfMonthLastYear],
    //   End: [today]
    // });
    // this.dateRange2 = this.fb.group({
    //   dstart: [firstDayOfMonthLastYear],
    //   dend: [today]
    // });
    // this.dateRange3 = this.fb.group({
    //   wstart: [firstDayOfMonthLastYear],
    //   wend: [today]
    // });
    // this.dateRange1.valueChanges.subscribe(() => {
    //   this.handoverAbstractRPTypeScheme();
    // });
    // this.dateRange2.valueChanges.subscribe(() => {
    //  this.handoverAbstractRPTypeDistrict()
    // });
    // this.dateRange3.valueChanges.subscribe(() => {
    //  this.handoverAbstractRPTypeWorkType();
    // });
    this.dateRange.valueChanges.subscribe(() => {
      this.HandoverAbstractRPTypeTotal();
      this.handoverAbstractRPTypeScheme();
      this.handoverAbstractRPTypeDistrict();
      this.handoverAbstractRPTypeWorkType();
    });
    this.initializeChartOptions();
    this.HandoverAbstractRPTypeTotal();
    this.handoverAbstractRPTypeScheme();
    this.handoverAbstractRPTypeDistrict();
    this.handoverAbstractRPTypeWorkType();
  }
  initializeChartOptions() {
    this.chartOptions = {
      series: [],
      chart: {
        type: 'bar',

        stacked: true,
        // height: 'auto',

        // height: 300,
        // height: '100%' ,
        // width:600,
        events: {
          dataPointSelection: (
            event,
            chartContext,
            { dataPointIndex, seriesIndex }
          ) => {
          
            const selectedCategory = this.chartOptions?.xaxis?.categories?.[dataPointIndex];  // This is likely just the category name (a string)
            const selectedSeries = this.chartOptions?.series?.[seriesIndex]?.name;
            // Ensure the selectedCategory and selectedSeries are valid
            if (selectedCategory && selectedSeries) {
              const apiData = this.HandoverAbstractTotalData;  // Replace with the actual data source or API response
              // Find the data in your API response that matches the selectedCategory
              const selectedData = apiData.find((data) => data.name === selectedCategory);
              // console.log("selectedData chart1",selectedData)
              if (selectedData) {
                const id = selectedData.id;  // Extract the id from the matching entry
                this.name = selectedData.name;
                this.totalWorks = selectedData.totalWorks;

                this.fetchDataBasedOnChartSelection(id, selectedSeries);

              } else {
                console.log(`No data found for selected category: ${selectedCategory}`);
              }
            } else {
              console.log('Selected category or series is invalid.');
            }
          }
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
        style: {
          // colors: ['#FF0000']
          colors: ['#000']
        }
      },
      stroke: {
        width: 1,
        // colors: ['#000'],
        colors: ['#fff'],
      },
      title: {
        // text: 'Total Handover',
        text: 'Division wise Handover',
        align: 'center',
        style: {
          fontSize: '12px',
          // color: '#000'
          color: '#6e0d25'
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
    this.chartOptions2 = {
      series: [],
      chart: {
        type: 'bar',
        stacked: true,
        // height: 'auto',
        // height: 300,
        // width:600,
        events: {
          dataPointSelection: (
            event,
            chartContext,
            { dataPointIndex, seriesIndex }
          ) => {
            const selectedCategory = this.chartOptions2?.xaxis?.categories?.[dataPointIndex];  // This is likely just the category name (a string)
            const selectedSeries = this.chartOptions2?.series?.[seriesIndex]?.name;
            // Ensure the selectedCategory and selectedSeries are valid
            if (selectedCategory && selectedSeries) {
              const apiData = this.HandoverAbstractSchemeData;  // Replace with the actual data source or API response
              // Find the data in your API response that matches the selectedCategory
              const selectedData = apiData.find((data) => data.name === selectedCategory);
              // console.log("selectedData chart1",selectedData)
              if (selectedData) {
                const id = selectedData.id;  // Extract the id from the matching entry
                this.name = selectedData.name;
                this.totalWorks = selectedData.totalWorks;
                this.fetchDataBasedOnChartSelectionScheme(id, selectedSeries);

              } else {
                console.log(`No data found for selected category: ${selectedCategory}`);
              }
            } else {
              console.log('Selected category or series is invalid.');
            }
          }
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
        style: {
          // colors: ['#FF0000']
          colors: ['#000']
        }
      },
      stroke: {
        width: 1,
        // colors: ['#000'],
        colors: ['#fff'],
      },
      title: {
        text: 'Scheme Wise Handover',
        align: 'center',
        style: {
          fontSize: '12px',
          // color: '#000'
          color: '#6e0d25'
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
    this.chartOptions3 = {
      series: [],
      chart: {
        type: 'bar',
        stacked: true,
        // height: 'auto',
        // height: 1000,
        // width:600,
        events: {
          dataPointSelection: (
            event,
            chartContext,
            { dataPointIndex, seriesIndex }
          ) => {
            const selectedCategory = this.chartOptions3?.xaxis?.categories?.[dataPointIndex];  // This is likely just the category name (a string)
            const selectedSeries = this.chartOptions3?.series?.[seriesIndex]?.name;
            // Ensure the selectedCategory and selectedSeries are valid
            if (selectedCategory && selectedSeries) {
              const apiData = this.HandoverAbstractDistrictData;  // Replace with the actual data source or API response
              // Find the data in your API response that matches the selectedCategory
              const selectedData = apiData.find((data) => data.name === selectedCategory);
              // console.log("selectedData chart1",selectedData)
              if (selectedData) {
                const id = selectedData.id;  // Extract the id from the matching entry
                this.name = selectedData.name;
                this.totalWorks = selectedData.totalWorks;
                this.  fetchDataBasedOnChartSelectionDistrict(id, selectedSeries);

              } else {
                console.log(`No data found for selected category: ${selectedCategory}`);
              }
            } else {
              console.log('Selected category or series is invalid.');
            }
          }
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
        style: {
          // colors: ['#FF0000']
          colors: ['#000']
        }
      },
      stroke: {
        width: 1,
        // colors: ['#000'],
        colors: ['#fff'],
      },
      title: {
        text: 'District Wise Handover',
        align: 'center',
        style: {
          fontSize: '12px',
          // color: '#000'
          color: '#6e0d25'
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
    this.chartOptions4 = {
      series: [],
      chart: {
        type: 'bar',
        stacked: true,
        // height: 'auto',
        // height: 1000,
        // width:600,
        events: {
          dataPointSelection: (
            event,
            chartContext,
            { dataPointIndex, seriesIndex }
          ) => {
            const selectedCategory = this.chartOptions4?.xaxis?.categories?.[dataPointIndex];  // This is likely just the category name (a string)
            const selectedSeries = this.chartOptions4?.series?.[seriesIndex]?.name;
            // Ensure the selectedCategory and selectedSeries are valid
            if (selectedCategory && selectedSeries) {
              const apiData = this.HandoverAbstractWorkTypeData;  // Replace with the actual data source or API response
              // Find the data in your API response that matches the selectedCategory
              const selectedData = apiData.find((data) => data.name === selectedCategory);
              // console.log("selectedData chart1",selectedData)
              if (selectedData) {
                const id = selectedData.id;  // Extract the id from the matching entry
                this.name = selectedData.name;
                this.totalWorks = selectedData.totalWorks;
                this.fetchDataBasedOnChartSelectionWorkType(id, selectedSeries);

              } else {
                console.log(`No data found for selected category: ${selectedCategory}`);
              }
            } else {
              console.log('Selected category or series is invalid.');
            }
          }
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
        style: {
          // colors: ['#FF0000']
          colors: ['#000']
        }
      },
      stroke: {
        width: 1,
        // colors: ['#000'],
        colors: ['#fff'],
      },
      title: {
        text: 'WorkType Wise Handover',
        align: 'center',
        style: {
          fontSize: '12px',
          // color: '#000'
          color: '#6e0d25'
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
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  // RPType=Total/Scheme/District/WorkType
  HandoverAbstractRPTypeTotal(): void {
    // const roleName = localStorage.getItem('roleName');
    // this.divisionid = roleName === 'Division' ? sessionStorage.getItem('divisionID') : 0;
    this.spinner.show();

    var roleName = localStorage.getItem('roleName');


    const startDate = this.dateRange.value.start;
    const endDate = this.dateRange.value.end;
    // const datePipe = new DatePipe('en-US');
    // this.fromdt = startDate ? datePipe.transform(new Date(startDate), 'dd-MM-yyyy') : '';
    // this.todt = endDate ? datePipe.transform(new Date(endDate), 'dd-MM-yyyy') : '';
    this.fromdt = startDate ? this.datePipe.transform(startDate, 'dd-MMM-yyyy'): '';
    this.todt = endDate ? this.datePipe.transform(endDate, 'dd-MMM-yyyy') : '';
    // if (roleName == 'Division') {
    //   this.chartOptions.chart.height = '300px';
    // } else {
    //   this.chartOptions.chart.height = '400';
    // }

    // alert( roleName )
    if (roleName == 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      this.chartOptions.chart.height = '400px';
      this.districtid = 0;
    } else if (roleName == 'Collector') {
     this.districtid = sessionStorage.getItem('himisDistrictid');
     this.chartOptions.chart.height = '400px';
     
      this.divisionid=0;
    }
    else {
      this.districtid = 0;
      this.divisionid=0;
      this.chartOptions.chart.height ='400';
    }
    var RPType = 'Total'
    // RPType=Total/Scheme/District/WorkType
    if (this.fromdt && this.todt) {
      this.api.HandoverAbstract(RPType, this.dashid, this.divisionid, this.districtid, this.SWId, this.fromdt, this.todt,0).subscribe(
        (data: any) => {
          this.HandoverAbstractTotalData = data;
          // console.log('HandoverAbstractTotalData', this.HandoverAbstractTotalData);

          const id: string[] = [];
          const name: string[] = [];
          const totalWorks: any[] = [];
          const tvcValuecr: number[] = [];
          const avgMonthTaken: any[] = [];
          this.whidMap = {}; // Initialize the mmidMap
          // console.log('API Response total:', data);
          data.forEach((item: {
            name: string; id: any; totalWorks: any; tvcValuecr: number;
            avgMonthTaken: any
          }) => {
            id.push(item.id);
            name.push(item.name);
            totalWorks.push(item.totalWorks);
            tvcValuecr.push(item.tvcValuecr);
            avgMonthTaken.push(item.avgMonthTaken);

            // console.log('name:', item.name, 'id:', item.id);
            if (item.name && item.id) {
              this.whidMap[item.name] = item.id;
            } else {
              console.warn('Missing whid for handover Abstract :', item.name);
            }
          });

          this.chartOptions.series = [
            { name: 'Nos of Works', data: totalWorks, color: '#eeba0b' },
            { name: 'Contract Value (in cr)', data: tvcValuecr },
            // { name: 'Avg Month Taken', data: avgMonthTaken, color: '#3afce6' },];
            { name: 'Avg Month Taken', data: avgMonthTaken, color: 'rgb(0, 143, 251)' },];

          this.chartOptions.xaxis = { categories: name };
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

  handoverAbstractRPTypeScheme(): void {
    this.spinner.show();

    const startDate = this.dateRange.value.start;
    const endDate = this.dateRange.value.end;
    // const StartDate = this.dateRange.value.Start;
    // const EndDate = this.dateRange.value.End;
    const datePipe = new DatePipe('en-US');
    this.fromdt = endDate ? datePipe.transform(startDate, 'dd-MMM-yyyy') : '';
    this.todt = endDate ? datePipe.transform(endDate, 'dd-MMM-yyyy') : '';
    const roleName = localStorage.getItem('roleName');

    if (roleName == 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      this.chartOptions2.chart.height = '600px';
      this.districtid = 0;
    } else if (roleName == 'Collector') {
     this.districtid = sessionStorage.getItem('himisDistrictid');
     this.chartOptions2.chart.height = '400px';
      this.divisionid=0;
    }
    else {
      this.districtid = 0;
      this.divisionid=0;
      this.chartOptions2.chart.height ='900';
    }
    // this.divisionid = roleName === 'Division' ? sessionStorage.getItem('divisionID') : 0;

    var RPType = 'Scheme'
    if (this.fromdt && this.todt) {
      this.api.HandoverAbstract(RPType, this.dashid, this.divisionid, this.districtid, this.SWId, this.fromdt, this.todt,0).subscribe(
        (data: any) => {
          this.HandoverAbstractSchemeData = data;
          // console.log('HandoverAbstractSchemeData', this.HandoverAbstractSchemeData);
          const id: string[] = [];
          const name: string[] = [];
          const totalWorks: any[] = [];
          const tvcValuecr: number[] = [];
          const avgMonthTaken: any[] = [];
          this.whidMap = {}; // Initialize the mmidMap
          // console.log('API Response total:', data);
          data.forEach((item: {
            name: string; id: any; totalWorks: any; tvcValuecr: number;
            avgMonthTaken: any
          }) => {
            id.push(item.id);
            name.push(item.name);
            totalWorks.push(item.totalWorks);
            tvcValuecr.push(item.tvcValuecr);
            avgMonthTaken.push(item.avgMonthTaken);

            // console.log('name:', item.name, 'id:', item.id);
            if (item.name && item.id) {
              this.whidMap[item.name] = item.id;
            } else {
              console.warn('Missing whid for handover Abstract :', item.name);
            }
          });

          this.chartOptions2.series = [
            // { name: 'Total Works', data: totalWorks, color: '#eeba0b' },
            // { name: 'TVC Value cr', data: tvcValuecr },
            // { name: 'AVG Month Taken', data: avgMonthTaken, color: 'rgb(0, 143, 251)' },];
            { name: 'Nos of Works', data: totalWorks, color: '#eeba0b' },
            { name: 'Contract Value (in cr)', data: tvcValuecr },
            { name: 'Avg Month Taken', data: avgMonthTaken, color: 'rgb(0, 143, 251)' },];

          this.chartOptions2.xaxis = { categories: name };
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
  }
  handoverAbstractRPTypeDistrict(): void {
    // const StartDate = this.dateRange2.value.dstart;
    // const EndDate = this.dateRange2.value.dend;
    this.spinner.show();

    const startDate = this.dateRange.value.start;
    const endDate = this.dateRange.value.end;
    const datePipe = new DatePipe('en-US');
    this.fromdt = startDate ? datePipe.transform(startDate, 'dd-MMM-yyyy') : '';
    this.todt = endDate ? datePipe.transform(endDate, 'dd-MMM-yyyy') : '';

    const roleName = localStorage.getItem('roleName');

    if (roleName == 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      this.chartOptions3.chart.height = '600px';
      this.districtid = 0;
    } else if (roleName == 'Collector') {
     this.districtid = sessionStorage.getItem('himisDistrictid');
     this.chartOptions3.chart.height = '300px';
      this.divisionid=0;
    }
    else {
      this.districtid = 0;
      this.divisionid=0;
      this.chartOptions3.chart.height = '1500';
    }
    // this.divisionid = roleName === 'Division' ? sessionStorage.getItem('divisionID') : 0;
    var RPType = 'District'
    if (this.fromdt && this.todt) {
      this.api.HandoverAbstract(RPType, this.dashid, this.divisionid, this.districtid, this.SWId, this.fromdt, this.todt,0).subscribe(
        (data: any) => {
          this.HandoverAbstractDistrictData = data;
          console.log('HandoverAbstractSchemeData', this.HandoverAbstractDistrictData);
          const id: string[] = [];
          const name: string[] = [];
          const totalWorks: any[] = [];
          const tvcValuecr: number[] = [];
          const avgMonthTaken: any[] = [];
          this.whidMap = {}; // Initialize the mmidMap
          // console.log('API Response total:', data);
          data.forEach((item: {
            name: string; id: any; totalWorks: any; tvcValuecr: number;
            avgMonthTaken: any
          }) => {
            id.push(item.id);
            name.push(item.name);
            totalWorks.push(item.totalWorks);
            tvcValuecr.push(item.tvcValuecr);
            avgMonthTaken.push(item.avgMonthTaken);

            // console.log('name:', item.name, 'id:', item.id);
            if (item.name && item.id) {
              this.whidMap[item.name] = item.id;
            } else {
              console.warn('Missing whid for handover Abstract :', item.name);
            }
          });

          this.chartOptions3.series = [
            // { name: 'Total Works', data: totalWorks, color: '#eeba0b' },
            // { name: 'TVC Value cr', data: tvcValuecr },
            // { name: 'AVG Month Taken', data: avgMonthTaken, color: 'rgb(0, 143, 251)' },];
            { name: 'Nos of Works', data: totalWorks, color: '#eeba0b' },
            { name: 'Contract Value (in cr)', data: tvcValuecr },
            { name: 'Avg Month Taken', data: avgMonthTaken, color: 'rgb(0, 143, 251)' },];

          this.chartOptions3.xaxis = { categories: name };
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
  }
  handoverAbstractRPTypeWorkType(): void {
    this.spinner.show();
    // const StartDate = this.dateRange3.value.wstart;
    // const EndDate = this.dateRange3.value.wend;
    const startDate = this.dateRange.value.start;
    const endDate = this.dateRange.value.end;
    const datePipe = new DatePipe('en-US');
    this.fromdt = startDate ? datePipe.transform(startDate, 'dd-MMM-yyyy') : '';
    this.todt = endDate ? datePipe.transform(endDate, 'dd-MMM-yyyy') : '';

    // const roleName = localStorage.getItem('roleName');
    // this.divisionid = roleName === 'Division' ? sessionStorage.getItem('divisionID') : 0;
    var RPType = 'WorkType'
    const roleName = localStorage.getItem('roleName');

    if (roleName == 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      this.chartOptions4.chart.height = '500';
      this.districtid = 0;
    } else if (roleName == 'Collector') {
     this.districtid = sessionStorage.getItem('himisDistrictid');
     this.chartOptions4.chart.height = '400px';
      this.divisionid=0;
    }
    else {
      this.districtid = 0;
      this.divisionid=0;
      this.chartOptions4.chart.height = '2000';
    }

   
    if (this.fromdt && this.todt) {
      this.api.HandoverAbstract(RPType, this.dashid, this.divisionid, this.districtid, this.SWId, this.fromdt, this.todt,0).subscribe(
        (data: any) => {
          this.HandoverAbstractWorkTypeData = data;
          // console.log('HandoverAbstractWorkTypeData', this.HandoverAbstractWorkTypeData);
          const id: string[] = [];
          const name: string[] = [];
          const totalWorks: any[] = [];
          const tvcValuecr: number[] = [];
          const avgMonthTaken: any[] = [];
          this.whidMap = {}; // Initialize the mmidMap
          // console.log('API Response total:', data);
          data.forEach((item: {
            name: string; id: any; totalWorks: any; tvcValuecr: number;
            avgMonthTaken: any
          }) => {
            id.push(item.id);
            name.push(item.name);
            totalWorks.push(item.totalWorks);
            tvcValuecr.push(item.tvcValuecr);
            avgMonthTaken.push(item.avgMonthTaken);

            // console.log('name:', item.name, 'id:', item.id);
            if (item.name && item.id) {
              this.whidMap[item.name] = item.id;
            } else {
              console.warn('Missing whid for handover Abstract :', item.name);
            }
          });

          this.chartOptions4.series = [
            // { name: 'Total Works', data: totalWorks, color: '#eeba0b' },
            // { name: 'TVC Value cr', data: tvcValuecr },
            // { name: 'AVG Month Taken', data: avgMonthTaken, color: 'rgb(0, 143, 251)' },];
            { name: 'Nos of Works', data: totalWorks, color: '#eeba0b' },
            { name: 'Contract Value (in cr)', data: tvcValuecr },
            { name: 'Avg Month Taken', data: avgMonthTaken, color: 'rgb(0, 143, 251)' },];
          this.chartOptions4.xaxis = { categories: name };
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
  }

  fetchDataBasedOnChartSelection(divisionID: any, seriesName: string): void {
    // console.log(`Selected ID: ${divisionID}, Series: ${seriesName}`);
    const distid = 0;
    const mainSchemeId = 0;
    const SWId=0;
    const dashid=4001;
    this.spinner.show();
    // dashid=4001&divisionId=D1004&mainSchemeId=145&distid=0&SWId=0
    this.api.GetHandoverDetails(dashid,divisionID, mainSchemeId, distid,SWId).subscribe(
      (res) => {
        this.dispatchPendings = res.map((item: GetHandoverDetails, index: number) => ({
          ...item,
          sno: index + 1
        }));
        this.dataSource.data = this.dispatchPendings;
        // console.log(this.dataSource.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.cdr.detectChanges();
        this.spinner.hide();
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
    this.openDialog();

  }
  fetchDataBasedOnChartSelectionScheme(mainSchemeId: any, seriesName: string): void {
    // console.log(`Selected ID: ${mainSchemeId}, Series: ${seriesName}`);
    var roleName = localStorage.getItem('roleName');
    if (roleName == 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      this.districtid = 0;
    } else if (roleName == 'Collector') {
      this.districtid = sessionStorage.getItem('himisDistrictid');
      this.divisionid = 0;
    } else {
      this.districtid = 0;
      this.divisionid = 0;
    }
    // const distid = 0;
    // const mainSchemeId = 0;
    const SWId=0;
    const dashid=4001;
    // const roleName = localStorage.getItem('roleName');
    // this.divisionid = roleName === 'Division' ? sessionStorage.getItem('divisionID') : 0;
    this.spinner.show();
    // dashid=4001&divisionId=D1004&mainSchemeId=145&distid=0&SWId=0
    this.api.GetHandoverDetails(dashid,this.divisionid, mainSchemeId,this.districtid,SWId).subscribe(
      (res) => {
        this.dispatchPendings = res.map((item: GetHandoverDetails, index: number) => ({
          ...item,
          sno: index + 1
        }));
        this.dataSource.data = this.dispatchPendings;
        // console.log(this.dataSource.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.cdr.detectChanges();
        this.spinner.hide();
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
    this.openDialog();

  }
  fetchDataBasedOnChartSelectionDistrict(distid: any, seriesName: string): void {
    
    // console.log(`Selected ID: ${distid}, Series: ${seriesName}`);
    var roleName = localStorage.getItem('roleName');
    if (roleName == 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      this.districtid = 0;
    } else if (roleName == 'Collector') {
      this.districtid = sessionStorage.getItem('himisDistrictid');
      this.divisionid = 0;
    } else {
      this.districtid = 0;
      this.divisionid = 0;
    }
    const mainSchemeId = 0;
    const SWId=0;
    const dashid=4001; 
    // const roleName = localStorage.getItem('roleName');
    // this.divisionid = roleName === 'Division' ? sessionStorage.getItem('divisionID') : 0;
    this.spinner.show();
    // dashid=4001&divisionId=D1004&mainSchemeId=145&distid=0&SWId=0
    this.api.GetHandoverDetails(dashid,this.divisionid, mainSchemeId, distid,SWId).subscribe(
      (res) => {
        this.dispatchPendings = res.map((item: GetHandoverDetails, index: number) => ({
          ...item,
          sno: index + 1
        }));
        this.dataSource.data = this.dispatchPendings;
        // console.log(this.dataSource.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.cdr.detectChanges();
        this.spinner.hide();
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
    this.openDialog();

  }
  fetchDataBasedOnChartSelectionWorkType(SWId: any, seriesName: string): void {
    // console.log(`Selected ID: ${SWId}, Series: ${seriesName}`);
    var roleName = localStorage.getItem('roleName');
    if (roleName == 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      this.districtid = 0;
    } else if (roleName == 'Collector') {
      this.districtid = sessionStorage.getItem('himisDistrictid');
      this.divisionid = 0;
    } else {
      this.districtid = 0;
      this.divisionid = 0;
    }
    // const distid = 0;
    const mainSchemeId = 0;
    // const SWId=0;
    const dashid=4001; 
    // const roleName = localStorage.getItem('roleName');
    // this.divisionid = roleName === 'Division' ? sessionStorage.getItem('divisionID') : 0;
    this.spinner.show();
    // dashid=4001&divisionId=D1004&mainSchemeId=145&distid=0&SWId=0
    this.api.GetHandoverDetails(dashid,this.divisionid, mainSchemeId,this.districtid,SWId).subscribe(
      (res) => {
        this.dispatchPendings = res.map((item: GetHandoverDetails, index: number) => ({
          ...item,
          sno: index + 1
        }));
        this.dataSource.data = this.dispatchPendings;
        // console.log(this.dataSource.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.cdr.detectChanges();
        this.spinner.hide();
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
    this.openDialog();

  }

  // data filter
  applyTextFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  exportToPDF() {
    const doc = new jsPDF('l', 'mm', 'a4');
    const columns = [
      { title: "S.No", dataKey: "sno" },
      { title: "letterNo", dataKey: "letterNo" },
      { title: "head", dataKey: "head" },
      { title: "acceptLetterDT", dataKey: "acceptLetterDT" },
      { title: "totalAmountOfContract", dataKey: "totalAmountOfContract" },
      { title: "district", dataKey: "district" },
      { title: "work", dataKey: "work" },
      { title: "contractorNAme", dataKey: "contractorNAme" },
      { title: "work_id", dataKey: "work_id" }
    ];
    const rows = this.dispatchPendings.map(row => ({
      sno: row.sno,
      letterNo: row.letterNo,
      head: row.head,
      acceptLetterDT: row.acceptLetterDT,
      totalAmountOfContract: row.totalAmountOfContract,
      district: row.district,
      work: row.work,
      contractorNAme: row.contractorNAme,
      work_id: row.work_id,
    }));

    autoTable(doc, {
      columns: columns,
      body: rows,
      startY: 20,
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] }
    });

    doc.save('HandoverDetails.pdf');
  }
 // mat-dialog box
 openDialog() {
  const dialogRef = this.dialog.open(this.itemDetailsModal, {
    width: '100%',
    height: '100%',
    maxWidth: '100%',
    panelClass: 'full-screen-dialog', // Optional for additional styling
    data: { /* pass any data here */ }
    // width: '100%',
    // maxWidth: '100%', // Override default maxWidth
    // maxHeight: '100%', // Override default maxHeight
    // panelClass: 'full-screen-dialog' ,// Optional: Custom class for additional styling
    // height: 'auto',
  });
  dialogRef.afterClosed().subscribe(result => {
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
      console.log('ASFileData:', this.ASFileData);
      this.spinner.hide();
    },
    (error) => {
      this.spinner.hide();
      alert(`Error fetching data: ${error.message}`);
    }
  );
}
}
