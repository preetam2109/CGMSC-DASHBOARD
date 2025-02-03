import { CommonModule, NgFor, NgStyle } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { DashProgressCount, DistrictNameDME, DMEProgressSummary, GetDistrict, MainScheme, WORunningHandDetails } from 'src/app/Model/DashProgressCount';
import { ApiService } from 'src/app/service/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexPlotOptions, ApexXAxis, ApexYAxis, 
  ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexFill, ApexLegend, ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatMenuModule } from '@angular/material/menu';
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
  selector: 'app-infrastructure-home',
  standalone: true,
  imports: [
    NgFor,
    NgStyle,
    MatCardModule,
    MatIconModule,
    MatTabsModule,
    CommonModule, MatFormFieldModule, MatSelectModule, MatOptionModule,
    NgApexchartsModule, MatSortModule, MatPaginatorModule,MatTableModule,
        MatTableExporterModule, MatDialogModule, MatMenuModule,
  ],

  templateUrl: './infrastructure-home.component.html',
  styleUrl: './infrastructure-home.component.css'
})
export class InfrastructureHomeComponent {
  mainscheme: MainScheme[] = [];
  districtData: DashProgressCount[] = [];
  DMEprogresssummary: DMEProgressSummary[] = [];
  DistrictNameDMEData: DistrictNameDME[] = [];
  originalData: DashProgressCount[] = []; // To store the original data for "Total Works"
  GetDistrict: GetDistrict[] = [];
  totalNosWorks: number = 0;
  selectedTabIndex: number = 0;
  distid = 0;
  divisionid:any = 0;
  mainSchemeID = 0;
  id:any
  selectedDistrict: any | null = null;
  name: any;
  isall: boolean = true;
  show:boolean=false;
  hide:boolean=false;
  public showCards: boolean = true; // Control card visibility
  public showDivision: boolean = true; // Control card visibility
  public showDistrict: boolean = true; // Control card visibility
  distname:any;
  public showCardss: boolean = false; // Control card visibility
  cardOrder: string[] = [
    "Completed/Handover",
    "Running Work",
    "Acceptance/Work Order",
    "Land Not Alloted/Land Dispute",
    "Tender in Process",
    "To be Tender",
    "Return to Department",
  ];
  divisions = [
    { id: 'D1004', name: 'Raipur ', color: '#2196F3' },
    { id: 'D1017', name: 'Saruguja ', color: '#4CAF50' },
    { id: 'D1024', name: 'Bilaspur ', color: '#FFC107' },
    { id: 'D1001', name: 'Durg ', color: '#F44336' },
    { id: 'D1031', name: 'Baster ', color: '#9C27B0' },
  ];

  
  //#region DataBase Table
  dataSource!: MatTableDataSource<WORunningHandDetails>;
  // dataSource1!: MatTableDataSource<ASEnteredDetails>;
  // dataSource1!: MatTableDataSource<ASCompletedDetails>;
  // dataSourceDivision!: MatTableDataSource<DivisionWiseASPendingDetails>;
  @ViewChild('itemDetailsModal') itemDetailsModal: any;
          @ViewChild('paginator') paginator!: MatPaginator;
          @ViewChild('paginator1') paginator1!: MatPaginator;
          @ViewChild('paginatorPageSize') paginatorPageSize!: MatPaginator;
          @ViewChild('sort') sort!: MatSort;
          @ViewChild('sort1') sort1!: MatSort;
          @ViewChild('sort2') sort2!: MatSort;
          dispatchData: WORunningHandDetails[] = [];
          // dispatchData1: ASEnteredDetails[] = [];
          // dispatchData1: ASCompletedDetails[] = [];
          // dispatchDataDivision: DivisionWiseASPendingDetails[] = [];
          // ASFileData: ASFile[] = [];
 //#endregion
  // ChartOptions
  @ViewChild('chart') chart: ChartComponent | undefined;
  public cO: Partial<ChartOptions> | undefined;
  // chartOptions: ChartOptions;
  whidMap: { [key: string]: number } = {};
  // dataSource!: MatTableDataSource<DMEProgressSummary>;
  DMEProgressSummary: DMEProgressSummary[] = [];
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;
  chartOptions!: ChartOptions;
  selectedName: any;
  himisDistrictid:any;
  divid:any;
  constructor(public api: ApiService, public spinner: NgxSpinnerService, private cdr: ChangeDetectorRef,private dialog: MatDialog,) {
  this.dataSource = new MatTableDataSource<WORunningHandDetails>([]);
    // this.dataSource1 = new MatTableDataSource<ASCompletedDetails>([]);
    // this.dataSource1 = new MatTableDataSource<ASEnteredDetails>([]);
    // this.dataSourceDivision = new MatTableDataSource<DivisionWiseASPendingDetails>([]);
  }

  ngOnInit() {
    var roleName = localStorage.getItem('roleName');
    // alert( roleName )
    if (roleName == 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      this.himisDistrictid = 0;
      this.showDivision = false;
      // return; 
      // alert( this.divisionid )
      this.loadInitialData();
    } else if (roleName == 'Collector') {
      this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
      this.showDistrict = false;
      this.showDivision = false;
      // alert( this.himisDistrictid );
      this.loadInitialData();
    } else {
      this.himisDistrictid = 0;
      this.divisionid = 0;
      this.loadInitialData();

    }
    this.GetDistricts();
    this.getDistrictNameDME();
    this.getmain_scheme();
    //  this.GetDMEProgressSummary();
  }
//#region 
  loadInitialData() {
    // Load data for "Total Works" tab on initialization
    this.spinner.show();
    this.divisionid = this.divisionid == 0 ? 0 : this.divisionid;
    this.himisDistrictid = this.himisDistrictid == 0 ? 0 : this.himisDistrictid;
    console.log('1 divisionid=', this.divisionid, 'himisDistrictid=', this.himisDistrictid, 'mainSchemeID=', this.mainSchemeID);
var mainSchemeId=0;
// divisionid= D1024 himisDistrictid= 0 mainSchemeID= 103
// if( this.mainSchemeID != null ){
//   alert('hi');
//   // || this.himisDistrictid != 0 || this.mainSchemeID != 0
//   this.himisDistrictid = 0;//this.divisionid =0;
//   this.mainSchemeID=0;
//   console.log('2 divisionid=', this.divisionid, 'himisDistrictid=', this.himisDistrictid, 'mainSchemeID=', this.mainSchemeID);
// }
// if (this.selectedTabIndex == 0) {
//   this.mainSchemeID=0;
//   this.himisDistrictid = 0;//this.divisionid =0;
// } 
    this.api.DashProgressCount(this.divisionid,mainSchemeId,this.himisDistrictid).subscribe(
      (res: any) => {
        console.log("res=",JSON.stringify(res));
        this.originalData = this.sortDistrictData(res); // Save as original data
        this.districtData = [...this.originalData]; // Set for display
        this.calculateTotalNosWorks();
        this.spinner.hide();
      },
      (error) => {
        console.error('API Error:', error);
      }
    );
  }

  selectedTabValue(event: any): void {
    this.selectedTabIndex = event.index;
    // alert(this.selectedTabIndex )
    if (this.selectedTabIndex === 0) {
      // Restore original data for "Total Works"
      this.districtData = [...this.originalData];
      this.loadInitialData();
      this.showCards = true;
    } else {
      this.showCards = false;
    }
  }
  // District-wise Tab 
  GetDistricts() {
    try {
      var roleName  = localStorage.getItem('roleName');
  if(roleName == 'Division'){
    this.divisionid = sessionStorage.getItem('divisionID');
  } else {
    this.divisionid =0;
  }
  this.divisionid = this.divisionid == 0 ? 0 : this.divisionid;
      this.api.GetDistrict(false,this.divisionid).subscribe(
        (res: any) => {
          this.GetDistrict = res;
        },
        (error) => {
          alert(JSON.stringify(error));
        }
      );
    } catch (ex: any) {
      alert(ex.message);
    }
  }
  getDistrictNameDME() {
    try {
      // showCardss
  var roleName = localStorage.getItem('roleName');
  if (roleName == 'Division') {
    this.divisionid = sessionStorage.getItem('divisionID');this.himisDistrictid=0;
  } else if (roleName == 'Collector') {
    this.himisDistrictid = sessionStorage.getItem('himisDistrictid');this.divisionid=0;
  } else{
    this.himisDistrictid=0;
    this.divisionid =0;
  }
  // this.divisionid = this.divisionid == 0 ? 0 : this.divisionid;
  console.log('divisionid1=', this.divisionid, 'himisDistrictid1=', this.himisDistrictid);

      this.api.GetDistrictNameDME(this.divisionid,this.himisDistrictid).subscribe(
        (res: any) => {
          this.DistrictNameDMEData = res;
          // console.log('DistrictNameDME1=', this.DistrictNameDMEData);
        },
        (error) => {
          alert(JSON.stringify(error));
        }
      );
    } catch (ex: any) {
      alert(ex.message);
    }
  }
  DashProgressCount() {
    try {
      this.spinner.show();
      // const distid = this.distid || 0;
      // const divisionid = this.divisionid || 0;

      var roleName = localStorage.getItem('roleName');
      if (roleName == 'Division') {
        this.divisionid = sessionStorage.getItem('divisionID');
        this.showDivision = false;
        // if(this.divid != 0){
        //   this.divisionid  = this.divid ;
        //   alert(this.divisionid );
        // }
        // alert( this.divisionid )
        // return
      } else if (roleName == 'Collector') {
        this.himisDistrictid=sessionStorage.getItem('himisDistrictid');
        // this.himisDistrictid = this.distid;
        if(this.distid!=0){
          this.himisDistrictid = this.distid;
          // alert(this.himisDistrictid);
        }
      }
      // 
      // this.distid = this.distid == 0 ? 0 : this.distid;
      this.divisionid = this.divisionid == 0 ? 0 : this.divisionid;
      this.mainSchemeID = this.mainSchemeID == 0 ? 0 : this.mainSchemeID;
      this.himisDistrictid = this.himisDistrictid == 0 ? 0 : this.himisDistrictid;
      // console.error('dist id:', this.himisDistrictid  );
      // console.error('mainSchemeID:', this.mainSchemeID);
      // console.log('divisionid=', this.divisionid, 'himisDistrictid=', this.himisDistrictid, 'mainSchemeID=', this.mainSchemeID);
      this.api.DashProgressCount(this.divisionid, this.mainSchemeID, this.himisDistrictid).subscribe(
        (res: any) => {
          if (this.selectedTabIndex === 0) {
            // Do not overwrite the original data for "Total Works"
            this.districtData = [...this.originalData];
            if (this.mainSchemeID !== 0) {

              this.districtData = this.sortDistrictData(res);
            } else {
              // this.districtData = [...this.originalData];

            }
            // console.log('retotalwork=', JSON.stringify(this.districtData));
          } else {
            this.districtData = res;
            // console.log('re1=', JSON.stringify(this.districtData));
            this.districtData = this.sortDistrictData(res);
            // console.log('re2=', JSON.stringify(this.districtData));
          }
          // console.log('res =', JSON.stringify(this.districtData));

          this.calculateTotalNosWorks();
          this.spinner.hide();

        },
        (error) => {
          console.error('API Error:', error);
        }
      );
    } catch (ex: any) {
      console.error('Exception:', ex.message);
    }
  }
  onButtonClick(name: string, id: any): void {
    this.showCards = true;
    // this.hide=false;
    this.divid=id;
    this.show=true;
    this.divisionid = id;
    this.distid = 0;
    this.mainSchemeID = this.mainSchemeID;
    this.name = name;
    this.selectedDistrict = id;
    if(this.selectedName==null){
      this.hide=false;
    }else{
      this.hide=true;
    }
    // this.DashProgressCount();
    // console.error('onButtonClick',this.divisionid);

  }
  onGetDistrictsSelect(districT_ID: any,distname:any): void {
    // Make cards visible on district selection
    this.distname=distname;
    this.showCards = true;
    this.distid = districT_ID;
    this.himisDistrictid = districT_ID;
    // this.mainSchemeID = 0;
    this.mainSchemeID = this.mainSchemeID;
    this.divisionid = 0;
    this.show=true;
    if(this.selectedName==null){
      this.hide=false;
    }else{
      this.hide=true;
    }
    this.DashProgressCount();

    // console.error('onGetDistrictsSelect', this.distid  );
    if (this.selectedTabIndex === 3) {
      this.showCards = false;
      // this.GetDMEProgressSummary();
      this.DashProgressCount();

    }



  }
  onselectDistrictsDME(districT_ID: any,distname:any){
    var roleName = localStorage.getItem('roleName');
    if (roleName == 'Division') {
      // this.divisionid = sessionStorage.getItem('divisionID');
      if (this.selectedTabIndex === 2) {
        this.distid = districT_ID;
        // this.himisDistrictid = districT_ID;
        this.showCards = false;
        this.showCardss=true;
        this.GetDMEProgressSummary();
        // this.DashProgressCount();
  
      }
    } 
    // else if (roleName == 'Collector') {
    //   this.himisDistrictid = sessionStorage.getItem('himisDistrictid');this.divisionid=0;
    // } 
    else{
      this.distid = districT_ID;
      this.GetDMEProgressSummary();
      this.showCardss=true;
    }
  }

  sortDistrictData(data: DashProgressCount[]): DashProgressCount[] {

    return data.sort((a, b) =>
      this.cardOrder.indexOf(a.dashname || '') - this.cardOrder.indexOf(b.dashname || '')
    );
  }

  calculateTotalNosWorks() {
    this.totalNosWorks = this.districtData.reduce(
      (sum, district) => sum + (district.nosworks || 0),
      0
    );
  }
  getCardColor(did: any) {
    if (did == 1001) {
      return '#FFC0CB';
    } else if (did == 2001) {
      return '#FF8C00';
      // return '#ADFF2F';
      // return '#FF9800'; 
    } else if (did == 3001) {
      return '#ADD8E6';
    }
    else if (did == 4001) {
      return '#008000';
    }
    else if (did == 5001) {
      return '#90EE90';//#4CAF50
    }
    else if (did == 6001) {
      return '#FF0000';
    }
    else if (did == 7001) {
      return '#FFA500';
    }
    else if (did == 8001) {
      return '#9E9E9E';
    } else {
      return '#9E9E9E';
    }
  }

  getIcon(did: any) {
    switch (did) {
      case 1001:
        return 'notifications_active'; // Icon for "To be Tender"
      case 2001:
        return 'gavel'; // Icon for "To be Tender"
      // return 'hourglass_empty'; // Icon for "Tender in Process"
      case 3001:
        return 'import_contacts'; // Icon for "Acceptance/Work Order"
      // return 'check_circle'; // Icon for "Acceptance/Work Order"
      case 4001:
        return 'playlist_add_check'; // Icon for "Completed/Handover"
      // return 'done_all'; // Icon for "Completed/Handover"
      case 5001:
        return 'trending_up'; // Icon for "Running Work"
      // return 'build'; // Icon for "Running Work"
      case 6001:
        return 'error'; // Icon for "Land Not Allotted/Land Dispute"
      case 8001:
        return 'delete_forever'; // Icon for "Return to Department"
      // return 'reply'; // Icon for "Return to Department"
      default:
        return 'help'; // Default icon
    }
  }
  GetDMEProgressSummary() {
    this.spinner.show();
    this.showCards = false;
    this.showCardss = true;
    this.chartOptions = {
      series: [],
      chart: {
        type: 'bar',
        stacked: true,
        height: 'auto',
        // height: 400,
        // width:600,
        events: {
          dataPointSelection: (
            event,
            chartContext,
            { dataPointIndex, seriesIndex }
          ) => {
            const selectedCategory =
              this.chartOptions?.xaxis?.categories?.[dataPointIndex];
            const selectedSeries = this.chartOptions?.series?.[seriesIndex]?.name;

            if (selectedCategory && selectedSeries) {
              const whid = this.whidMap[selectedCategory];
              if (whid) {
                // this.fetchDataBasedOnChartSelection();
              }
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
        text: 'MedicalCollege Wise work Progress',
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
    this.loadData();
    // this.dataSource = new MatTableDataSource<DMEProgressSummary>([]);
    this.spinner.hide();

  }

  loadData(): void {
    console.log("this.distid=", this.distid)
    this.spinner.show();
    
    this.api.DMEProgressSummary(0, 0, this.distid, 0).subscribe(
      (data: any) => {
        this.DMEprogresssummary = data;
        const hc_id: string[] = [];
        const districtname: string[] = [];
        const accWorkOrder3001: number[] = [];
        const completed4001: number[] = [];
        const tenderProcess2001: number[] = [];
        const running5001: number[] = [];
        const landIssue6001: number[] = [];
        const toBeTender1001: number[] = [];
        const retunDept8001: number[] = [];
        const total: number[] = [];
        this.whidMap = {}; // Initialize the mmidMap
        // console.log('API Response:', data);
        data.forEach((item: {
          districtname: string; completed4001: any; tenderProcess2001: number; running5001: number;
          landIssue6001: number; district_ID: number; retunDept8001: number; total: number; accWorkOrder3001: number; toBeTender1001: number
        }) => {
          districtname.push(item.districtname);
          accWorkOrder3001.push(item.accWorkOrder3001);
          completed4001.push(item.completed4001);
          tenderProcess2001.push(item.tenderProcess2001);
          running5001.push(item.running5001);
          landIssue6001.push(item.landIssue6001);
          retunDept8001.push(item.retunDept8001);
          toBeTender1001.push(item.toBeTender1001);
          total.push(item.total);

          // console.log('districtname:', item.districtname, 'whid:', item.district_ID);
          if (item.districtname && item.district_ID) {
            this.whidMap[item.districtname] = item.district_ID;
          } else {
            console.warn('Missing whid for warehousename :', item.districtname);
          }


        });

        // console.log('whidMap:', this.whidMap); // Log the populated mmidMap

        this.chartOptions.series = [

          {
            name: 'Total Works',
            data: total,
            color: '#0000FF'
          }
          ,
          {
            name: 'Completed/Handover',
            data: completed4001,
            color: 'rgb(0, 128, 0)'
            // color: '#eeba0b'
          },
          {
            name: 'Running Work',
            data: running5001,
            color: 'rgb(144, 238, 144)'
            // color: '#90EE90'
          },
          {
            name: 'Acceptance/Work Order',
            data: accWorkOrder3001,
            color: 'rgb(173, 216, 230)'
            // color: '#008000'
          },
          {
            name: 'land Issue',
            data: landIssue6001,
            color: 'rgb(255, 0, 0)'
            // color: '#FF0000'
          },
          {
            name: 'Tender in Process',
            data: tenderProcess2001,
            color: 'rgb(255, 140, 0)'
            // color: '#ADD8E6'
          },
          {
            name: 'To be Tender',
            data: toBeTender1001,
            color: 'rgb(255, 192, 203)'
            // color: '#FFC0CB'
            // color: '#00b4d8'
          },
          // {
          //   name: 'retunDept',
          //   data: retunDept8001,
          //   color: 'rgb(158, 158, 158)'
          // },
        ];

        this.chartOptions.xaxis = { categories: districtname };
        this.cO = this.chartOptions;
        this.cdr.detectChanges();
        this.spinner.hide();
      },
      (error: any) => {
        console.error('Error fetching data', error);
      }
    );
  }

  getmain_scheme() {
    try {
      this.api.getMainScheme(this.isall).subscribe(
        (res: any) => {
          this.mainscheme = res;
        },
        (error) => {
          alert(JSON.stringify(error));
        }
      );
    } catch (ex: any) {
      alert(ex.message);
    }
  }
  onselect_mainscheme_data(mainSchemeID: any,selectedName: string) {
    // this.showCards = true;
    // alert(mainSchemeID);
    // console.log('Selected ID:', mainSchemeID);
    // console.log('Selected Name:', selectedName);
  //  this.show=false;
   this.hide=true;
   this.selectedName=selectedName
    this.mainSchemeID = mainSchemeID;
    // this.divisionid = 0;
    this.distid = 0;
    this.showCards = true;
    if(this.name||this.distname ==null){
      this.show=false;
    }else{
      this.show=true;
    }
    this.DashProgressCount();

    // alert(this.mainSchemeID);

  }
//#endregion
  // selectdata(data:any ){
  // }


  //#region Data table 
  // 
  DetailProgress(did:any): void {
    // console.log( divisionId , mainSchemeId )
    // alert(did);
  this.spinner.show();
  // var did=3001;
  
  var roleName = localStorage.getItem('roleName');
  if (roleName == 'Division') {
    this.divisionid = sessionStorage.getItem('divisionID');
    this.showDivision = false;
    // if(this.divid != 0){
    //   this.divisionid  = this.divid ;
    //   alert(this.divisionid );
    // }
    // alert( this.divisionid )
    // return
  } else if (roleName == 'Collector') {
    this.himisDistrictid=sessionStorage.getItem('himisDistrictid');
    // this.himisDistrictid = this.distid;
    if(this.distid!=0){
      this.himisDistrictid = this.distid;
      // alert(this.himisDistrictid);
    }
  }
  // 
  // this.distid = this.distid == 0 ? 0 : this.distid;
  this.divisionid = this.divisionid == 0 ? 0 : this.divisionid;
  this.mainSchemeID = this.mainSchemeID == 0 ? 0 : this.mainSchemeID;
  this.himisDistrictid = this.himisDistrictid == 0 ? 0 : this.himisDistrictid;
  console.log('divisionid=', this.divisionid, 'himisDistrictid=', this.himisDistrictid, 'mainSchemeID=', this.mainSchemeID);
  const divisionid=0; 
  const districtid=0;
  const mainschemeid=0
  this.api.GETWORunningHandDetails(did,divisionid,districtid,mainschemeid)
    .subscribe(
      (res) => {
        this.dispatchData = res.map(
          (item: WORunningHandDetails, index: number) => ({
            ...item,
            sno: index + 1,
          })
        );
        console.log('dispatchData=:', this.dispatchData);
        this.dataSource.data = this.dispatchData;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.cdr.detectChanges();
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        alert(`Error fetching data: ${error.message}`);
      }
    );
  this.openDialog();
 }

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
    // 'sno','login_name','head','letterno','asDate','totalWorks','enteredWorks','balanceWork','divisionID','division','id','asid'

    { title: 'S.No', dataKey: 'sno' },
    { title: 'Head', dataKey: 'head' },
    { title: 'AS Letter No', dataKey: 'letterno' },
    { title: 'AS Date', dataKey: 'asDate' },
    { title: 'Total Works', dataKey: 'totalWorks' },
    { title: 'Entered Works', dataKey: 'enteredWorks' },
    { title: 'Balance Work', dataKey: 'balanceWork' },
    { title: 'Division ID', dataKey: 'divisionID' },
    { title: 'Division', dataKey: 'division' },
    { title: 'ID', dataKey: 'id' },
    { title: 'AS ID', dataKey: 'asid' },
  ];
  const rows = this.dispatchData.map((row) => ({

    // sno: row.sno,
    // login_name:row.login_name,
    // head: row.head,
    // letterno: row.letterno,
    // asDate: row.asDate,
    // totalWorks: row.totalWorks,
    // enteredWorks: row.enteredWorks,
    // balanceWork: row.balanceWork,
    // divisionID: row.divisionID,
    // division: row.division,
    // id: row.id,
    // asid: row.asid,
  }));

  autoTable(doc, {
    columns: columns,
    body: rows,
    startY: 20,
    theme: 'striped',
    headStyles: { fillColor: [22, 160, 133] },
  });

  doc.save('ASDivisionDetails.pdf');
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
  //#endregion
}

