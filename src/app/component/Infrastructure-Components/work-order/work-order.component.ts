import { CommonModule, NgFor, NgStyle } from '@angular/common';
import { ChangeDetectorRef, Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexLegend, ApexPlotOptions, ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { NgxSpinnerService } from 'ngx-spinner';
import { ASFile, DashProgressDistCount, WOpendingScheme, WOpendingTotal, WorkOrderPendingDetailsNew } from 'src/app/Model/DashProgressCount';
import { ApiService } from 'src/app/service/api.service';
import { WorkOrderGeneratedComponent } from '../work-order-generated/work-order-generated.component';
// import {MatDialog, MatDialogConfig} from "@angular/material";
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
  selector: 'app-work-order',
  standalone: true,
  imports: [NgApexchartsModule, MatSortModule, MatPaginatorModule, MatTableModule,
     MatTableExporterModule, MatInputModule, MatDialogModule,
    MatFormFieldModule, NgbModule, MatMenuModule, NgFor, CommonModule,
    NgFor,
    NgStyle,
    MatCardModule,
    MatIconModule,
    MatTabsModule,
    MatFormFieldModule, MatSelectModule, MatOptionModule, WorkOrderGeneratedComponent
  ],
  templateUrl: './work-order.component.html',
  styleUrl: './work-order.component.css'
})
export class WorkOrderComponent {
  @ViewChild('chart') chart: ChartComponent | undefined;
  @ViewChild('itemDetailsModal') itemDetailsModal: any; 
  // @ViewChild('itemDetailsModals') itemDetailsModals: any; 
  public cO: Partial<ChartOptions> | undefined;
  chartOptions!: ChartOptions; // For bar chart
  chartOptions2!: ChartOptions; // For bar chart
  chartOptionsLine!: ChartOptions; // For line chart
  chartOptionsLine2!: ChartOptions; // For line chart
  whidMap: { [key: string]: number } = {};
  // divisionIDMap: { [key: string]: number } = {};
  dataSource!: MatTableDataSource<WorkOrderPendingDetailsNew>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  wOpendingTotal:WOpendingTotal[]=[];
  wOpendingContractor:WOpendingTotal[]=[];
  wOpendingDistrict:WOpendingTotal[]=[];
  wOpendingScheme:WOpendingScheme[]=[];
  WorkorderpendingdetailsNew:WorkOrderPendingDetailsNew[]=[];
  dispatchPendings: WorkOrderPendingDetailsNew[] = [];
  ASFileData: ASFile[] = [];
  name:any;
  noofWorksGreater7Days:any;
  // divisionid='D1024';
  divisionid:any;
  mainSchemeID:any;
  Scheme='Scheme';
  Total='Total';
  Contractor='Contractor';
  District='District'
  displayedColumns: string[] = ['sno','letterNo', 'head','acceptLetterDT','totalAmountOfContract','district','work','contractorNAme','work_id',];
  himisDistrictid: any;
  // displayedColumns: string[] = [
  //   'sno', 'work_id', 'letterNo', 'head', 'approver', 'type_name', 'district',
  //   'blockname', 'work', 'aaamt', 'tsamt', 'aaDate', 'tsDate', 'acceptanceLetterRefNo',
  //   'acceptLetterDT', 'pac', 'totalAmountOfContract', 'sanctionRate', 'sanctionDetail',
  //   'timeAllowed', 'dateOfSanction', 'dateOfIssueNIT', 'cid', 'contractorNAme', 'regType',
  //   'class', 'englishAddress', 'mobNo', 'asPath', 'asLetter', 'groupName', 'lProgress',
  //   'pdate', 'pRemarks', 'remarks', 'tenderReference'
  // ];

  constructor(public api: ApiService, public spinner: NgxSpinnerService,private cdr: ChangeDetectorRef,private dialog: MatDialog){
  
    this.dataSource = new MatTableDataSource<WorkOrderPendingDetailsNew>([]);
  }
 
  ngOnInit() {
    this.initializeChartOptions();
    this.GetWOPendingTotal();
    this.GetWOPendingDistrict();
    this.GetWOPendingScheme();
    this.GetWOPendingContractor();
  }
  initializeChartOptions() {
    this.chartOptions = {
      series: [],
      chart: {
        type: 'bar',
        stacked: true,
        // height: 'auto',
        // height:400,
        // height: 200,
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
              const apiData = this.wOpendingTotal;  // Replace with the actual data source or API response
              // Find the data in your API response that matches the selectedCategory
              const selectedData = apiData.find((data) => data.name === selectedCategory);
              // console.log("selectedData chart1",selectedData)
              if (selectedData) {
                const id = selectedData.id;  // Extract the id from the matching entry
                this.name = selectedData.name;
                this.noofWorksGreater7Days = selectedData.noofWorksGreater7Days;
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
        // text: 'Total Pending Total Works wise Progress ',
        text: 'Work Order Pending',
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
        // height: 600,
        // height: 'auto',
        // width:600,
       events: {
          dataPointSelection: (
            event,
            chartContext,
            { dataPointIndex, seriesIndex }
          ) => {
            if (dataPointIndex !== undefined && seriesIndex !== undefined) {
              const selectedCategory = this.chartOptions2?.xaxis?.categories?.[dataPointIndex];
              const selectedSeries = this.chartOptions2?.series?.[seriesIndex]?.name;
          
              if (selectedCategory && selectedSeries) {
                const apiData = this.wOpendingScheme;
                console.log('datasch:', apiData);
              
                if (Array.isArray(apiData)) {
                  // const selectedData = apiData.find((data) =>
                  //   data.name.trim().toLowerCase() === selectedCategory.trim().toLowerCase()   );
                  const selectedData = apiData.find((data) => data.name === selectedCategory);
              // console.log("selectedData chart1",selectedData);
               
              
                  if (selectedData) {
                    const id = selectedData.id;
                    this.name = selectedData.name;
                    this.noofWorksGreater7Days = selectedData.noofWorksGreater7Days;
                    this.fetchDataBasedOnChartSelectionmainScheme(id, selectedSeries);
                  } else {
                    console.error(`No data found for selected category: ${selectedCategory}`);
                  }
                } else {
                  console.error('API Data is not an array:', apiData);
                }
              } else {
                console.error('Selected category or series is invalid.');
              }
              
            } else {
              console.log('Invalid data point or series index.');
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
        // text: 'Total Pending Works Scheme wise Progress District-wise Pending',
        text: 'Scheme-wise Pending Work Order Pending ',
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
    this.chartOptionsLine = {
      series: [],
      chart: {
        type: 'bar',
        stacked: true,
        // height: 600,
        // height: 'auto',

        // width:600,
       
        events: {
          dataPointSelection: (
            event,
            chartContext,
            { dataPointIndex, seriesIndex }
          ) => {
            const selectedCategory = this.chartOptionsLine?.xaxis?.categories?.[dataPointIndex];  // This is likely just the category name (a string)
            const selectedSeries = this.chartOptionsLine?.series?.[seriesIndex]?.name;
            // Ensure the selectedCategory and selectedSeries are valid
            if (selectedCategory && selectedSeries) {
              const apiData = this.wOpendingContractor;  // Replace with the actual data source or API response
              // Find the data in your API response that matches the selectedCategory
              const selectedData = apiData.find((data) => data.name === selectedCategory);
              // console.log("selectedData chart1",selectedData)
              if (selectedData) {
                const id = selectedData.id;  // Extract the id from the matching entry
                this.name = selectedData.name;
                this.noofWorksGreater7Days = selectedData.noofWorksGreater7Days;
                this.fetchDataBasedOnChartSelectionmaincontract(id, selectedSeries);

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
        // text: 'Total Pending Works Contractor  wise Progress',
                text: 'Contractor-wise Pending Work Order Pending',

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
    this.chartOptionsLine2 = {
      series: [],
      chart: {
        type: 'bar',
        stacked: true,
        // height: 400,
        // height: 'auto',

        
        events: {
          
          dataPointSelection: (
            event,
            chartContext,
            { dataPointIndex, seriesIndex }
          ) => {
            const selectedCategory = this.chartOptionsLine2?.xaxis?.categories?.[dataPointIndex];  // This is likely just the category name (a string)
            const selectedSeries = this.chartOptionsLine2?.series?.[seriesIndex]?.name;
            // Ensure the selectedCategory and selectedSeries are valid
            if (selectedCategory && selectedSeries) {
              const apiData = this.wOpendingDistrict;  // Replace with the actual data source or API response
              // Find the data in your API response that matches the selectedCategory
              const selectedData = apiData.find((data) => data.name === selectedCategory);
              // console.log("selectedData chart1",selectedData)
              if (selectedData) {
                const id = selectedData.id;  // Extract the id from the matching entry
                this.name = selectedData.name;
                this.noofWorksGreater7Days = selectedData.noofWorksGreater7Days;
                this.fetchDataBasedOnChartSelectionmainDistrict(id, selectedSeries);

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
        text: 'District-wise Pending Work Order Pending',
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
  //#region API get DATA
  GetWOPendingTotal(): void {
    this.spinner.show();
    // var roleName = localStorage.getItem('roleName');
    // if (roleName == 'Division') {
    //   this.divisionid = sessionStorage.getItem('divisionID');
    //   this.chartOptions.chart.height = '200px';
    // } else {
    //   this.divisionid = 0;
    //   this.chartOptions.chart.height = 'auto';
    // }
    var roleName  = localStorage.getItem('roleName');
  if(roleName == 'Division'){
  this.divisionid = sessionStorage.getItem('divisionID');
  this.chartOptions.chart.height = '200px';
  this.himisDistrictid=0; 
  this.mainSchemeID=0;
  }  else if (roleName == 'Collector') {
  this.himisDistrictid=sessionStorage.getItem('himisDistrictid');
  this.divisionid=0;
  this.mainSchemeID=0;
  this.chartOptions.chart.height = '400px';
  }
  else{
    this.divisionid=0;
    this.himisDistrictid=0; 
    this.mainSchemeID=0;
    this.chartOptions.chart.height = 'auto';
  }
  var RPType ='Total';
    // this.divisionid = this.divisionid == 0 ? 0 : this.divisionid;
    // ?RPType=Scheme&divisionid=0&districtid=0&fromdt=0&todt=0
    var fromdt=0,todt=0;
    this.api.WOPendingTotal(RPType,this.divisionid,this.himisDistrictid,this.mainSchemeID).subscribe(
      (data: any) => {
        this.wOpendingTotal = data;
        const name: string[] = [];
        const id: string[] = [];
        const pendingWork: any[] = [];
        const contrctValuecr: number[] = [];
        const noofWorksGreater7Days: any[] = [];
        this.whidMap = {}; // Initialize the mmidMap
        // console.log('API Response total:', data);
        data.forEach((item: {
          name: string; id: any; pendingWork: any; contrctValuecr: number;
          noofWorksGreater7Days: any
        }) => {
          id.push(item.id);
          name.push(item.name);
          pendingWork.push(item.pendingWork);
          contrctValuecr.push(item.contrctValuecr);
          noofWorksGreater7Days.push(item.noofWorksGreater7Days);
        });
        this.chartOptions.series = [
          // {name: 'Total Pending Works', data: pendingWork,color:'#eeba0b'} ,
          {name: ' No of Works', data: pendingWork,color:'#eeba0b'} ,
          { name: 'Contact Value(in Cr)',data: contrctValuecr },
          { name: 'Pending more than 7 Days', data: noofWorksGreater7Days, color: '#fc7c84' }, ];

        this.chartOptions.xaxis = { categories: name };
        this.cO = this.chartOptions;
        this.cdr.detectChanges();

        this.spinner.hide();

      },
      (error: any) => {
        console.error('Error fetching data', error);
      }
    );
  }
  GetWOPendingDistrict(): void {
    // var roleName = localStorage.getItem('roleName');
    // if (roleName == 'Division') {
    //   this.divisionid = sessionStorage.getItem('divisionID');
    //   this.chartOptionsLine2.chart.height = '500px';
    // } else {
    //   this.divisionid = 0;
    //   this.chartOptionsLine2.chart.height = '1000';

    // }

    var roleName  = localStorage.getItem('roleName');
    if(roleName == 'Division'){
    this.divisionid = sessionStorage.getItem('divisionID');
    this.chartOptionsLine2.chart.height = '500px';
    this.himisDistrictid=0;
    this.mainSchemeID=0; 
    }  else if (roleName == 'Collector') {
    this.himisDistrictid=sessionStorage.getItem('himisDistrictid');
    this.divisionid=0;
    this.mainSchemeID=0;
    this.chartOptionsLine2.chart.height = '1000';
    }
    else{
      this.divisionid=0;
      this.himisDistrictid=0; 
      this.mainSchemeID=0;
      this.chartOptionsLine2.chart.height = '1000';
    }
   var RPType ='District';
   var fromdt=0,todt=0;
    this.api.WOPendingTotal(RPType,this.divisionid,this.himisDistrictid,this.mainSchemeID).subscribe(
      (data: any) => {
        this.wOpendingDistrict = data;
        const name: string[] = [];
        const id: string[] = [];
        const pendingWork: any[] = [];
        const contrctValuecr: number[] = [];
        const noofWorksGreater7Days: any[] = [];
        this.whidMap = {}; // Initialize the mmidMap
        // console.log('API wOpendingDistrict:', this.wOpendingDistrict);
        data.forEach((item: {
          name: string; id: any; pendingWork: any; contrctValuecr: number;
          noofWorksGreater7Days: any
        }) => {
          id.push(item.id);
          name.push(item.name);
          pendingWork.push(item.pendingWork);
          contrctValuecr.push(item.contrctValuecr);
          noofWorksGreater7Days.push(item.noofWorksGreater7Days);

          // console.log('name:', item.name, 'id:', item.id);
          if (item.name && item.id) {
            this.whidMap[item.name] = item.id;
          } else {
            console.warn('Missing whid for warehousename :', item.name);
          } });


        this.chartOptionsLine2.series = [

          {
            name: 'No of Works',
            data: pendingWork,
            // color: '#0000FF'
            color:'#eeba0b'
          }
          ,
          {
            name: 'Contact Value(in Cr)',
            data: contrctValuecr,
            // color:'#00b4d8'
            // color:  'rgb(0, 128, 0)'
            // color: '#eeba0b'
          },
          {
            name: 'Pending more than 7 Days',
            data: noofWorksGreater7Days,
            color: '#fc7c84'
            // color: 'rgb(144, 238, 144)'
            // color: '#90EE90'
           
          },
        ];

        this.chartOptionsLine2.xaxis = { categories: name };
        this.cO = this.chartOptionsLine2;
        this.cdr.detectChanges();
      },
      (error: any) => {
        console.error('Error fetching data', error);
      }
    );
  }
  GetWOPendingContractor(): void {
    this.spinner.show();
    // var roleName = localStorage.getItem('roleName');
    // if (roleName == 'Division') {
    //   this.divisionid = sessionStorage.getItem('divisionID');
    //   this.chartOptionsLine.chart.height = '500px';
    // } else {
    //   this.divisionid = 0;
    //   this.chartOptionsLine.chart.height = '1000';
    // }
    var roleName  = localStorage.getItem('roleName');
    if(roleName == 'Division'){
    this.divisionid = sessionStorage.getItem('divisionID');
    this.chartOptionsLine.chart.height = '500px';
    this.himisDistrictid=0; 
    this.mainSchemeID=0;
    }  else if (roleName == 'Collector') {
    this.himisDistrictid=sessionStorage.getItem('himisDistrictid');
    this.divisionid=0;
    this.mainSchemeID=0;
    this.chartOptionsLine.chart.height = '500px';
    }
    else{
      this.divisionid=0;
      this.himisDistrictid=0; 
      this.mainSchemeID=0;
      this.chartOptionsLine.chart.height = '1000';
    }
   var RPType ='Contractor';
   var fromdt=0,todt=0;
    this.api.WOPendingTotal(RPType,this.divisionid,this.himisDistrictid,this.mainSchemeID).subscribe(
      (data: any) => {
        this.wOpendingContractor = data;
        const name: string[] = [];
        const id: string[] = [];
        const pendingWork: any[] = [];
        const contrctValuecr: number[] = [];
        const noofWorksGreater7Days: any[] = [];
        this.whidMap = {}; // Initialize the mmidMap
        // console.log('API Response:', data);
        data.forEach((item: {
          name: string; id: any; pendingWork: any; contrctValuecr: number;
          noofWorksGreater7Days: any
        }) => {
          id.push(item.id);
          name.push(item.name);
          pendingWork.push(item.pendingWork);
          contrctValuecr.push(item.contrctValuecr);
          noofWorksGreater7Days.push(item.noofWorksGreater7Days);

          // console.log('name:', item.name, 'id:', item.id);
          if (item.name && item.id) {
            this.whidMap[item.name] = item.id;
          } else {
            console.warn('Missing whid for warehousename :', item.name);
          } });


        this.chartOptionsLine.series = [

          {
            name: 'No of Works ',
            data: pendingWork,
            // color: '#0000FF'
            color:'#eeba0b'
          }
          ,
          {
            name: 'Contact Value(in Cr)',
            data: contrctValuecr,
            // color:'#00b4d8'
            // color:  'rgb(0, 128, 0)'
            // color: '#eeba0b'
          },
          {
            name: 'Pending more than 7 Days',
            data: noofWorksGreater7Days,
            color: '#fc7c84'
            // color: 'rgb(144, 238, 144)'
            // color: '#90EE90'
           
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
  GetWOPendingScheme(): void {
    this.spinner.show();
    // var roleName = localStorage.getItem('roleName');
    // if (roleName == 'Division') {
    //   this.divisionid = sessionStorage.getItem('divisionID');
    //   this.chartOptionsLine.chart.height = '500px';

    // } else {
    //   this.divisionid = 0;
    //   this.chartOptionsLine.chart.height = '1000';

    // }

    var roleName  = localStorage.getItem('roleName');
    if(roleName == 'Division'){
    this.divisionid = sessionStorage.getItem('divisionID');
    this.chartOptionsLine.chart.height = '500px';
    this.himisDistrictid=0; 
    this.mainSchemeID=0;
    }  else if (roleName == 'Collector') {
    this.himisDistrictid=sessionStorage.getItem('himisDistrictid');
    this.divisionid=0;
    this.mainSchemeID=0;
    this.chartOptionsLine.chart.height = '500px';
    }
    else{
      this.divisionid=0;
      this.himisDistrictid=0;
      this.mainSchemeID=0; 
      this.chartOptionsLine.chart.height = '1000';
    }
   var RPType ='Scheme';
    // this.divisionid = this.divisionid == 0 ? 0 : this.divisionid;
    var fromdt=0,todt=0;
    this.api.WOPendingTotal(RPType,this.divisionid,this.himisDistrictid,this.mainSchemeID).subscribe(
      (data: any) => {
        this.wOpendingScheme = data;
        // console.log('API Response Scheme:',  this.wOpendingScheme);
        const name: string[] = [];
        const id: string[] = [];
        const pendingWork: any[] = [];
        const contrctValuecr: number[] = [];
        const noofWorksGreater7Days: any[] = [];
        this.whidMap = {}; // Initialize the mmidMap
        
        data.forEach((item: {
          name: string; id: any; pendingWork: any; contrctValuecr: number;
          noofWorksGreater7Days: any
        }) => {
          id.push(item.id);
          name.push(item.name);
          pendingWork.push(item.pendingWork);
          contrctValuecr.push(item.contrctValuecr);
          noofWorksGreater7Days.push(item.noofWorksGreater7Days);

          // console.log('name:', item.name, 'id:', item.id);
          if (item.name && item.id) {
            this.whidMap[item.name] = item.id;
          } else {
            console.warn('Missing whid for warehousename :', item.name);
          } });
        this.chartOptions2.series = [

          {
            name: 'No of Works ',
            data: pendingWork,
            // color: '#0000FF'
            color:'#eeba0b'
          }
          ,
          {
            name: 'Contact Value(in Cr)',
            data: contrctValuecr,
            // color:'#00b4d8'
            // color:  'rgb(0, 128, 0)'
            // color: '#eeba0b'
          },
          {
            name: 'Pending more than 7 Days',
            data: noofWorksGreater7Days,
            color: '#fc7c84'
            // color: 'rgb(144, 238, 144)'
            // color: '#90EE90'
           
          },
        ];

        this.chartOptions2.xaxis = { categories: name };
        this.cO = this.chartOptions2;
        this.cdr.detectChanges();
        this.spinner.hide();
      },
      (error: any) => {
        console.error('Error fetching data', error);
      }
    );
  }
//#endregion
//#region  Fetch Data in table form
fetchDataBasedOnChartSelection(divisionID: any, seriesName: string): void {
  // console.log(`Selected ID: ${divisionID}, Series: ${seriesName}`);
  const  distid=0;
  const mainSchemeId=0;
  const contractid=0;
  this.spinner.show();
 
  this.api.GetWorkOrderPendingDetailsNew(divisionID,mainSchemeId,distid,contractid).subscribe(
    (res) => {
      this.dispatchPendings = res.map((item: WorkOrderPendingDetailsNew, index: number) => ({
        ...item,
        sno: index + 1
      }));
      this.dataSource.data = this.dispatchPendings;
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
fetchDataBasedOnChartSelectionmainScheme(mainSchemeId: any, seriesName: string): void {
  // console.log(`Selected ID: ${mainSchemeId}, Series: ${seriesName}`);
  var roleName  = localStorage.getItem('roleName');
  if(roleName == 'Division'){
  this.divisionid = sessionStorage.getItem('divisionID');
  this.himisDistrictid=0; 
  }  else if (roleName == 'Collector') {
  this.himisDistrictid=sessionStorage.getItem('himisDistrictid');
  this.divisionid=0;
  }
  else{
    this.divisionid=0;
    this.himisDistrictid=0; 
  }
  // const  distid=0;
  // const mainSchemeId=0;
  // const divisionID=0;
  const contractid=0;
  this.spinner.show();
 
  this.api.GetWorkOrderPendingDetailsNew(this.divisionid,mainSchemeId,this.himisDistrictid,contractid).subscribe(
    (res) => {
      this.dispatchPendings = res.map((item: WorkOrderPendingDetailsNew, index: number) => ({
        ...item,
        sno: index + 1
      }));
      console.log('res:',res);
      this.dataSource.data = this.dispatchPendings;
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
fetchDataBasedOnChartSelectionmainDistrict(distid: any, seriesName: string): void {
  // console.log(`Selected ID: ${distid}, Series: ${seriesName}`);
  // const  distid=0;
  const mainSchemeId=0;
  const divisionID=0;
  const contractid=0;
  this.spinner.show();
 
  this.api.GetWorkOrderPendingDetailsNew(divisionID,mainSchemeId,distid,contractid).subscribe(
    (res) => {
      this.dispatchPendings = res.map((item: WorkOrderPendingDetailsNew, index: number) => ({
        ...item,
        sno: index + 1
      }));
      // console.log('wOpendingDistrict table data:',res);
      this.dataSource.data = this.dispatchPendings;
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
fetchDataBasedOnChartSelectionmaincontract(contractid: any, seriesName: string): void {
  // console.log(`Selected ID: ${contractid}, Series: ${seriesName}`);
  var roleName  = localStorage.getItem('roleName');
  if(roleName == 'Division'){
  this.divisionid = sessionStorage.getItem('divisionID');
  this.himisDistrictid=0; 
  }  else if (roleName == 'Collector') {
  this.himisDistrictid=sessionStorage.getItem('himisDistrictid');
  this.divisionid=0;
  }
  else{
    this.divisionid=0;
    this.himisDistrictid=0; 
  }
  const  distid=0;
  const mainSchemeId=0;
  // const divisionID=0;
  // const contractid=0;
  this.spinner.show();
  // wOpendingContractor:WOpendingTotal[]=[];
 
  this.api.GetWorkOrderPendingDetailsNew(this.divisionid,mainSchemeId,distid,contractid).subscribe(
    (res) => {
      this.dispatchPendings = res.map((item: WorkOrderPendingDetailsNew, index: number) => ({
        ...item,
        sno: index + 1
      }));

      // console.log('wOpendingDcontracter table data:',res);
      this.dataSource.data = this.dispatchPendings;
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
    // ['sno','letterNo', 'head','acceptLetterDT','totalAmountOfContract','district','work','contractorNAme','work_id',];
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

  doc.save('WorkOrderPending.pdf');
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

selectedTabIndex: number = 0;

  selectedTabValue(event: any): void {

    this.selectedTabIndex = event.index;
  }
//#endregion
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
