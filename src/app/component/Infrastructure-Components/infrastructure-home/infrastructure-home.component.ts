import { CommonModule, NgFor, NgStyle } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { ASFile, DashProgressCount, DetailProgressTinP, DistrictNameDME, DMEProgressSummary, GetDistrict, LandIssue_RetToDeptDetatails, MainScheme, TenderInProcess, WORunningHandDetails } from 'src/app/Model/DashProgressCount';
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
  dataSource1!: MatTableDataSource<LandIssue_RetToDeptDetatails>;
  dataSource2!: MatTableDataSource<DetailProgressTinP>;
  dataSource3!: MatTableDataSource<TenderInProcess>;
  // dataSourceDivision!: MatTableDataSource<DivisionWiseASPendingDetails>;
  @ViewChild('itemDetailsModal') itemDetailsModal: any;
  @ViewChild('itemDetailsModal1') itemDetailsModal1: any;
  @ViewChild('itemDetailsModal2') itemDetailsModal2: any;
  @ViewChild('itemDetailsModal3') itemDetailsModal3: any;
          @ViewChild('paginator') paginator!: MatPaginator;
          @ViewChild('paginator1') paginator1!: MatPaginator;
          @ViewChild('paginator2') paginator2!: MatPaginator;
          @ViewChild('paginator3') paginator3!: MatPaginator;
          @ViewChild('sort') sort!: MatSort;
          @ViewChild('sort1') sort1!: MatSort;
          @ViewChild('sort2') sort2!: MatSort;
          @ViewChild('sort3') sort3!: MatSort;
          dispatchData: WORunningHandDetails[] = [];
          dispatchData1: LandIssue_RetToDeptDetatails[] = [];
          dispatchData2: DetailProgressTinP[] = [];
          dispatchData3: TenderInProcess[] = [];
          // ASFileData: ASFile[] = [];
          ASFileData: ASFile[] = [];
 //#endregion
  // ChartOptions
  @ViewChild('chart') chart: ChartComponent | undefined;
  public cO: Partial<ChartOptions> | undefined;
  // chartOptions: ChartOptions;
  whidMap: { [key: string]: number } = {};
  DMEProgressSummary: DMEProgressSummary[] = [];
  chartOptions!: ChartOptions;
  selectedName: any;
  himisDistrictid:any;
  divid:any;
  roleName:any;
  contractorid=0;
  dashname:any;
  nosworks:any;
  constructor(public api: ApiService, public spinner: NgxSpinnerService, private cdr: ChangeDetectorRef,private dialog: MatDialog,) {
  this.dataSource = new MatTableDataSource<WORunningHandDetails>([]);
    this.dataSource1 = new MatTableDataSource<LandIssue_RetToDeptDetatails>([]);
    this.dataSource2 = new MatTableDataSource<DetailProgressTinP>([]);
    this.dataSource3 = new MatTableDataSource<TenderInProcess>([]);
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
      return '#faf557';
      // return '#ADFF2F';
      // return '#FF9800'; 
    } else if (did == 3001) {
      // return '#ADD8E6';
      return '#FF8C00';
    }
    else if (did == 4001) {
      return '#62f562';
      // return '#008000';
    }
    else if (did == 5001) {
      return '#e7fa57';//#4CAF50
      // return '#90EE90';//#4CAF50
    }
    else if (did == 6001) {
      return '#fa5795';
      // return '#FF0000';
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
  


  //#region Data table GETTobeTenderAll
//   DetailProgress2(did:any): void {
//     // console.log( divisionId , mainSchemeId )
//     alert(did);
//   this.spinner.show();
//   // var did=3001;
  
//   var roleName = localStorage.getItem('roleName');
//   if (roleName == 'Division') {
//     this.divisionid = sessionStorage.getItem('divisionID');
//     this.showDivision = false;
//     // if(this.divid != 0){
//     //   this.divisionid  = this.divid ;
//     //   alert(this.divisionid );
//     // }
//     // alert( this.divisionid )
//     // return
//   } else if (roleName == 'Collector') {
//     this.himisDistrictid=sessionStorage.getItem('himisDistrictid');
//     // this.himisDistrictid = this.distid;
//     if(this.distid!=0){
//       this.himisDistrictid = this.distid;
//       // alert(this.himisDistrictid);
//     }
//   }
//   // 
//   // this.distid = this.distid == 0 ? 0 : this.distid;
//   this.divisionid = this.divisionid == 0 ? 0 : this.divisionid;
//   this.mainSchemeID = this.mainSchemeID == 0 ? 0 : this.mainSchemeID;
//   this.himisDistrictid = this.himisDistrictid == 0 ? 0 : this.himisDistrictid;
//   console.log('divisionid=', this.divisionid, 'himisDistrictid=', this.himisDistrictid, 'mainSchemeID=', this.mainSchemeID);
//   const divisionid=0; 
//   const districtid=0;
//   const mainschemeid=0
//   this.api.GETTobeTenderAll(did,divisionid,districtid,mainschemeid)
//     .subscribe(
//       (res) => {
//         this.dispatchData2 = res.map(
//           (item: DetailProgressTinP, index: number) => ({
//             ...item,
//             sno: index + 1,
//           })
//         );
//         console.log('dispatchData2=:', this.dispatchData2);
//         this.dataSource2.data = this.dispatchData2;
//         this.dataSource2.paginator = this.paginator2;
//         this.dataSource2.sort = this.sort2;
//         this.cdr.detectChanges();
//         this.spinner.hide();
//       },
//       (error) => {
//         this.spinner.hide();
//         alert(`Error fetching data: ${error.message}`);
//       }
//     );
//   this.openDialog2();
//  }
//   DetailProgress1(did:any): void {
//     // console.log( divisionId , mainSchemeId )
//     // alert(did);
//   this.spinner.show();
//   // var did=3001;
  
//   var roleName = localStorage.getItem('roleName');
//   if (roleName == 'Division') {
//     this.divisionid = sessionStorage.getItem('divisionID');
//     this.showDivision = false;
//     // if(this.divid != 0){
//     //   this.divisionid  = this.divid ;
//     //   alert(this.divisionid );
//     // }
//     // alert( this.divisionid )
//     // return
//   } else if (roleName == 'Collector') {
//     this.himisDistrictid=sessionStorage.getItem('himisDistrictid');
//     // this.himisDistrictid = this.distid;
//     if(this.distid!=0){
//       this.himisDistrictid = this.distid;
//       // alert(this.himisDistrictid);
//     }
//   }
//   // 
//   // this.distid = this.distid == 0 ? 0 : this.distid;
//   this.divisionid = this.divisionid == 0 ? 0 : this.divisionid;
//   this.mainSchemeID = this.mainSchemeID == 0 ? 0 : this.mainSchemeID;
//   this.himisDistrictid = this.himisDistrictid == 0 ? 0 : this.himisDistrictid;
//   console.log('divisionid=', this.divisionid, 'himisDistrictid=', this.himisDistrictid, 'mainSchemeID=', this.mainSchemeID);
//   const divisionid=0; 
//   const districtid=0;
//   const mainschemeid=0
//   this.api.GETLandIssueRetToDeptDetatails(did,divisionid,districtid,mainschemeid)
//     .subscribe(
//       (res) => {
//         this.dispatchData1 = res.map(
//           (item: LandIssue_RetToDeptDetatails, index: number) => ({
//             ...item,
//             sno: index + 1,
//           })
//         );
//         console.log('dispatchData1=:', this.dispatchData1);
//         this.dataSource1.data = this.dispatchData1;
//         this.dataSource1.paginator = this.paginator1;
//         this.dataSource1.sort = this.sort1;
//         this.cdr.detectChanges();
//         this.spinner.hide();
//       },
//       (error) => {
//         this.spinner.hide();
//         alert(`Error fetching data: ${error.message}`);
//       }
//     );
//   this.openDialog1();
//  }
  DetailProgress(did:any,dashname:any,nosworks:any): void {
  //  debugger
  this.dashname=dashname;
  this.nosworks=nosworks;
  this.spinner.show();
this.roleName = localStorage.getItem('roleName');
  if (this.roleName == 'Division') {
    this.divisionid = sessionStorage.getItem('divisionID');
    this.showDivision = false;
  } else if (this.roleName == 'Collector') {
    this.himisDistrictid=sessionStorage.getItem('himisDistrictid');
    if(this.distid!=0){
      this.himisDistrictid = this.distid;
      // this.himisDistrictid = this.distid;
    }
  }
  // this.distid = this.distid == 0 ? 0 : this.distid;
  this.divisionid = this.divisionid == 0 ? 0 : this.divisionid;
  this.mainSchemeID = this.mainSchemeID == 0 ? 0 : this.mainSchemeID;
  this.himisDistrictid = this.himisDistrictid == 0 ? 0 : this.himisDistrictid;
  console.log('divisionid=', this.divisionid, 'himisDistrictid=', this.himisDistrictid, 'mainSchemeID=', this.mainSchemeID);

  if (did == 1001) {
    console.log('1001 =: ',did);
    this.api.GETTobeTenderAll(did,this.divisionid,this.himisDistrictid,this.mainSchemeID)
    .subscribe(
      (res) => {
        this.dispatchData2 = res.map(
          (item: DetailProgressTinP, index: number) => ({
            ...item,
            sno: index + 1,
          })
        );
        console.log('DetailProgressTinP=:', this.dispatchData2);
        this.dataSource2.data = this.dispatchData2;
        this.dataSource2.paginator = this.paginator2;
        this.dataSource2.sort = this.sort2;
        this.cdr.detectChanges();
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        alert(`Error fetching data: ${error.message}`);
      }
    );
  this.openDialog2();

    // return 
  }
   else if (did == 2001) {
    console.log('2001=: ',did);
    this.api.GETDetailProgress(did,this.divisionid,this.himisDistrictid,this.mainSchemeID)
    .subscribe(
      (res) => {
        this.dispatchData3 = res.map(
          (item: TenderInProcess, index: number) => ({
            ...item,
            sno: index + 1,
          })
        );
        console.log('TenderInProcess=:', this.dispatchData3);
        this.dataSource3.data = this.dispatchData3;
        this.dataSource3.paginator = this.paginator3;
        this.dataSource3.sort = this.sort3;
        this.cdr.detectChanges();
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        alert(`Error fetching data: ${error.message}`);
      }
    );
  this.openDialog3();

    // return 
  } 
   else if (did === 6001 || did === 8001) {
    console.log('6001 to 8001 =: ',did);
    this.api.GETLandIssueRetToDeptDetatails(did,this.divisionid,this.himisDistrictid,this.mainSchemeID)
    .subscribe(
      (res) => {
        this.dispatchData1 = res.map(
          (item: LandIssue_RetToDeptDetatails, index: number) => ({
            ...item,
            sno: index + 1,
          })
        );
        console.log('LandIssue_RetToDeptDetatails=:', this.dispatchData1);
        this.dataSource1.data = this.dispatchData1;
        this.dataSource1.paginator = this.paginator1;
        this.dataSource1.sort = this.sort1;
        this.cdr.detectChanges();
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        alert(`Error fetching data: ${error.message}`);
      }
    );
  this.openDialog1();
    // return '#FF0000';
  }
  // else if (did == 3001) {
  //   // return '#ADD8E6';
  //   return '#FF8C00';
  // }
  // else if (did == 4001) {
  //   return '#62f562';
  //   // return '#008000';
  // }
  // else if (did == 5001) {
  //   return '#e7fa57';//#4CAF50
  //   // return '#90EE90';//#4CAF50
  // }
  // else if (did == 6001) {
  //   return '#fa5795';
  //   // return '#FF0000';
  // }
  // else if (did == 7001) {
  //   return '#FFA500';
  // }
  // else if (did == 8001) {
  //   return '#9E9E9E';
  // } 
  else {
    console.log('3001,4001,to 5001=: ',did);
    this.api.GETWORunningHandDetails(did,this.divisionid,this.himisDistrictid,this.mainSchemeID,this.contractorid)
    .subscribe(
      (res) => {
        this.dispatchData = res.map(
          (item: WORunningHandDetails, index: number) => ({
            ...item,
            sno: index + 1,
          })
        );
        console.log('WORunningHandDetails=:', this.dispatchData);
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
    // return '#9E9E9E';
  }


  // const divisionid=0; 
  // const districtid=0;
  // const mainschemeid=0
 
 }

 applyTextFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

 applyTextFilter_tobeTenderAll(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource2.filter = filterValue.trim().toLowerCase();
  if (this.dataSource2.paginator) {
    this.dataSource2.paginator.firstPage();
  }
}
applyTextFilter_TenderInProcess(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource3.filter = filterValue.trim().toLowerCase();
  if (this.dataSource3.paginator) {
    this.dataSource3.paginator.firstPage();
  }
}
exportToPDF() {
  const doc = new jsPDF('l', 'mm', 'a4');
  const columns = [
    { title: 'S.No', dataKey: 'sno' },
    { title: 'Head', dataKey: 'head' },
    { title: 'Division', dataKey: 'divName_En' },
    { title: 'District', dataKey: 'district' },
    { title: 'Block', dataKey: 'blockname' },
    { title: 'AS Letter No', dataKey: 'letterNo' },
    { title: 'Approver', dataKey: 'approver' },
    { title: 'AS Date', dataKey: 'asDate' },
    { title: 'Works', dataKey: 'work' },
    // { title: 'TS Date', dataKey: 'tsDate' },
    { title: 'TS Amount', dataKey: 'tsamt' },
    { title: 'T Type', dataKey: 'tType' },
    { title: 'Division', dataKey: 'division' },
    { title: 'ID', dataKey: 'id' },
    { title: 'A A DT', dataKey: 'aadt' },
    { title: 'AS Amount', dataKey: 'asAmt' },
    { title: 'Tender Reference', dataKey: 'tenderReference' },
    { title: 'Tender Reference NO.', dataKey: 'acceptanceLetterRefNo' },
    { title: 'Accept Letter DT', dataKey: 'acceptLetterDT' },
    { title: 'Total Amount Of Contract', dataKey: 'totalAmountOfContract' },
    { title: 'Work id', dataKey: 'work_id' },
  ];
  const rows = this.dispatchData.map((row) => ({
    // 'sno','head','divName_En','district','blockname','letterNo','approver','asDate','work',
    // 'tsDate','tsamt','tType','aadt','asAmt','tenderReference','acceptanceLetterRefNo',
    // 'acceptLetterDT','totalAmountOfContract','work_id'
    sno: row.sno,
    head: row.head,
    divName_En:row.divName_En,
    district: row.district,
    blockname: row.blockname,
    letterNo: row.letterNo,
    approver: row.approver,
    // asDate: row.asDate,
    work: row.work,
    tsDate: row.tsDate,
    tsamt: row.tsamt,
    tType: row.tType,
    aadt: row.aadt,
    asAmt: row.asAmt,
    tenderReference: row.tenderReference,
    acceptanceLetterRefNo: row.acceptanceLetterRefNo,
    acceptLetterDT: row.acceptLetterDT,
    totalAmountOfContract: row.totalAmountOfContract,
    work_id: row.work_id,
  }));

  autoTable(doc, {
    columns: columns,
    body: rows,
    startY: 20,
    theme: 'striped',
    headStyles: { fillColor: [22, 160, 133] },
  });

  doc.save('DetailProgress.pdf');
}
exportobeTenderAll_PDFT() {
  const doc = new jsPDF('l', 'mm', 'a4');
  const columns = [
   

    { title: 'S.No', dataKey: 'sno' },
    { title: 'Head', dataKey: 'head' },
    { title: 'Division', dataKey: 'divName_En' },
    { title: 'District', dataKey: 'district' },
    { title: 'Block', dataKey: 'blockname' },
    { title: 'AS Letter No', dataKey: 'letterNo' },
    { title: 'Approver', dataKey: 'approver' },
    { title: 'Type', dataKey: 'type_name' },
    { title: 'Works', dataKey: 'work' },
    { title: 'AS Amount', dataKey: 'asAmt' },
    { title: 'TS Amount', dataKey: 'tsamt' },
    { title: 'TS Date', dataKey: 'tsDate' },
    { title: 'AS DT', dataKey: 'aadt' },
    { title: 'lProgress', dataKey: 'lProgress' },
    { title: 'Progress DT', dataKey: 'progressDT' },
    { title: 'Remarks', dataKey: 'remarks' },
    { title: 'Group', dataKey: 'groupName' },
    { title: 'Dash', dataKey: 'dashName' },
    { title: 'AS Path', dataKey: 'asPath' },
    { title: 'AS Letter', dataKey: 'asLetter' },
    { title: 'Descri ID', dataKey: 'descri' },
    { title: 'Fmr code', dataKey: 'fmrcode' },
    { title: 'startdt', dataKey: 'startdt' },
    { title: 'End DT', dataKey: 'enddt' },
    { title: 'AS ID', dataKey: 'asid' },
    { title: 'NO. of Calls', dataKey: 'noofcalls' },
    { title: 'Tender NO.', dataKey: 'tenderno' },
    { title: 'Eproc NO.', dataKey: 'eprocno' },
    { title: 'COV Opened DT', dataKey: 'covOpenedDT' },
    { title: 'Topned price DT', dataKey: 'topnedpricedt' },
    { title: 'Work id', dataKey: 'worK_ID' },
  ];
  const rows = this.dispatchData2.map((row) => ({
    sno: row.sno,
    divName_En:row.divName_En,
    district: row.district,
    blockname: row.blockname,
    letterNo: row.letterNo,
    head: row.head,
    approver: row.approver,
    type_name: row.type_name,
    work: row.work,
    asAmt: row.asAmt,
    tsamt: row.tsamt,
    tsDate: row.tsDate,
    aadt: row.aadt,
    lProgress: row.lProgress,
    progressDT: row.progressDT,
    remarks: row.remarks,
    groupName: row.groupName,
    dashName: row.dashName,
    asPath: row.asPath,
    asLetter: row.asLetter,
    asid: row.asid,
    descri: row.descri,
    fmrcode: row.fmrcode,
    startdt: row.startdt,
    enddt: row.enddt,
    noofcalls: row.noofcalls,
    tenderno: row.tenderno,
    eprocno: row.eprocno,
    covOpenedDT: row.covOpenedDT,
    topnedpricedt: row.topnedpricedt,
    worK_ID: row.worK_ID,

  }));

  autoTable(doc, {
    columns: columns,
    body: rows,
    startY: 20,
    theme: 'striped',
    headStyles: { fillColor: [22, 160, 133] },
  });

  doc.save('DetailProgress.pdf');
}
expor_TenderInProcess_PDFT() {
  const doc = new jsPDF('l', 'mm', 'a4');
  const columns = [
    { title: 'S.No', dataKey: 'sno' },
    { title: 'Head', dataKey: 'head' },
    { title: 'Division', dataKey: 'divName_En' },
    { title: 'District', dataKey: 'district' },
    { title: 'Block', dataKey: 'blockname' },
    { title: 'AS Letter No', dataKey: 'letterNo' },
    { title: 'Approver', dataKey: 'approver' },
    { title: 'Type', dataKey: 'type_name' },
    { title: 'Works', dataKey: 'work' },
    { title: 'AS Amount', dataKey: 'asAmt' },
    { title: 'TS Amount', dataKey: 'tsamt' },
    { title: 'TS Date', dataKey: 'tsDate' },
    { title: 'AS DT', dataKey: 'aadt' },
    { title: 'lProgress', dataKey: 'lProgress' },
    { title: 'Progress DT', dataKey: 'progressDT' },
    { title: 'Remarks', dataKey: 'remarks' },
    { title: 'Group', dataKey: 'groupName' },
    { title: 'Dash', dataKey: 'dashName' },
    { title: 'AS Path', dataKey: 'asPath' },
    { title: 'AS Letter', dataKey: 'asLetter' },
    { title: 'Descri ID', dataKey: 'descri' },
    { title: 'Fmr code', dataKey: 'fmrcode' },
    { title: 'startdt', dataKey: 'startdt' },
    { title: 'End DT', dataKey: 'enddt' },
    { title: 'AS ID', dataKey: 'asid' },
    { title: 'NO. of Calls', dataKey: 'noofcalls' },
    { title: 'Tender NO.', dataKey: 'tenderno' },
    { title: 'Eproc NO.', dataKey: 'eprocno' },
    { title: 'COV Opened DT', dataKey: 'covOpenedDT' },
    { title: 'Topned price DT', dataKey: 'topnedpricedt' },
    { title: 'Work id', dataKey: 'work_id' },
  ];
  const rows = this.dispatchData3.map((row) => ({
    sno: row.sno,
    divName_En:row.divName_En,
    district: row.district,
    blockname: row.blockname,
    letterNo: row.letterNo,
    head: row.head,
    approver: row.approver,
    type_name: row.type_name,
    work: row.work,
    asAmt: row.asAmt,
    tsamt: row.tsamt,
    tsDate: row.tsDate,
    aadt: row.aadt,
    lProgress: row.lProgress,
    progressDT: row.progressDT,
    remarks: row.remarks,
    groupName: row.groupName,
    dashName: row.dashName,
    asPath: row.asPath,
    asLetter: row.asLetter,
    asid: row.asid,
    descri: row.descri,
    fmrcode: row.fmrcode,
    startdt: row.startdt,
    enddt: row.enddt,
    noofcalls: row.noofcalls,
    tenderno: row.tenderno,
    eprocno: row.eprocno,
    covOpenedDT: row.covOpenedDT,
    topnedpricedt: row.topnedpricedt,
    // work_id: row.work_id,
    worK_ID: row.worK_ID,

  }));

  autoTable(doc, {
    columns: columns,
    body: rows,
    startY: 20,
    theme: 'striped',
    headStyles: { fillColor: [22, 160, 133] },
  });

  doc.save('DetailProgress.pdf');
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
  openDialog1() {
  
    const dialogRef = this.dialog.open(this.itemDetailsModal1, {
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
  openDialog2() {
  
    const dialogRef = this.dialog.open(this.itemDetailsModal2, {
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
  openDialog3() {
  
    const dialogRef = this.dialog.open(this.itemDetailsModal3, {
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

  onButtonClick2(ASID:any,workid:any): void {
    //  this.value='Active';
    // window.open('https://cgmsc.gov.in/himisr/Upload/W3900002AS2.pdf', '_blank');
      // alert(ASID);
      // alert(this.value);
      // return;
      
      this.spinner.show();
      this.api.GETASFile(ASID,workid)
        .subscribe(
          (res) => {
           this.ASFileData=res;
           const URL=res[0].asLetterName;
          //  const URL =this.ASFileData[0].asLetterName;
           window.open(URL, '_blank');
          // window.open('https://cgmsc.gov.in/himisr/Upload/W3900002AS2.pdf', '_blank');
  
            // console.log('res:', res);
            console.log('ASFileData:',this.ASFileData);
            this.spinner.hide();
          },
          (error) => {
            this.spinner.hide();
            alert(`Error fetching data: ${error.message}`);
          }
        );
     }
  //#endregion
}

