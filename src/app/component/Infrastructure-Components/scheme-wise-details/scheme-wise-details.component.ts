import { CommonModule, NgFor, NgStyle } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { ASFile, DashProgressCount, DetailProgressTinP, DistrictNameDME,TotalWorksAbstract,
   DMEProgressSummary, GetDistrict, LandIssue_RetToDeptDetatails, MainScheme,
    TenderInProcess, WORunningHandDetails, 
    RunningWork} from 'src/app/Model/DashProgressCount';
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
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { DropdownModule } from 'primeng/dropdown';


@Component({
  selector: 'app-scheme-wise-details',
  standalone: true,
  imports: [
    NgFor,
    NgStyle,
    MatCardModule,
    MatIconModule,
    MatTabsModule,
    CommonModule, MatFormFieldModule, MatSelectModule, MatOptionModule,
    NgApexchartsModule, MatSortModule, MatPaginatorModule,MatTableModule,
        MatTableExporterModule, MatDialogModule, MatMenuModule,NgSelectModule,FormsModule,SelectDropDownModule,DropdownModule,
  ],

  templateUrl: './scheme-wise-details.component.html',
  styleUrl: './scheme-wise-details.component.css'
})
export class SchemeWiseDetailsComponent {
  mainscheme: MainScheme[] = [];
  districtData: DashProgressCount[] = [];
  DMEprogresssummary: DMEProgressSummary[] = [];
  DistrictNameDMEData: DistrictNameDME[] = [];
  originalData: DashProgressCount[] = []; // To store the original data for "Total Works"
  GetDistrict: GetDistrict[] = [];
  totalNosWorks: number = 0;
  selectedTabIndex: number = 0;
  distid:any = 0;
  // distid = 0;
  divisionid:any = 0;
  mainSchemeID = 0;
  id:any;
  buid=1;
  selectedDistrict: any | null = null;
  name: any;
  isall: boolean = true;
  show:boolean=false;
  hide:boolean=false;
  public showCards: boolean = true; // Control card visibility
  public showDivision: boolean = true; // Control card visibility
  public showDistrict: boolean = true; // Control card visibility
  distname:any;
  // mainSchemeID:any;

  public showCardss: boolean = false; // Control card visibility
  cardOrder: string[] = [
    "Completed/Handover",
    "Running Work",
    // "Acceptance/Work Order",
    "Acceptance/Work Order Generated",
    "Land Not Alloted/Land Dispute",
    "Tender in Process",
    "To be Tender",
    "Return to Department",
  ];
 
  budgetOptions = [
    { buid: 0 ,label: 'All', value: 'All' },
    { buid: 1 ,label: 'Above 2 Cr', value: 'above_2_cr' },
    {  buid: 2 ,label: '>=50 lacs & <2 cr', value: '50_lacs_to_2_cr' },
    {  buid: 3 ,label: '>=20 lacs & <50 lacs', value: '20_lacs_to_50_lacs'},
    { buid: 4 , label: 'Below 20 Lacs', value: 'below_20_lacs' },
  ];
  
  //#region DataBase Table
  dataSource!: MatTableDataSource<WORunningHandDetails>;
  dataSourceCom_Han!: MatTableDataSource<WORunningHandDetails>;
  dataSourceRun_Work!: MatTableDataSource<WORunningHandDetails>;
  dataSource1!: MatTableDataSource<LandIssue_RetToDeptDetatails>;
  dataSourceLand_isu!: MatTableDataSource<LandIssue_RetToDeptDetatails>;
  dataSource2!: MatTableDataSource<DetailProgressTinP>;
  dataSource3!: MatTableDataSource<TenderInProcess>;
  dataSource4!: MatTableDataSource<TotalWorksAbstract>;
  
  // dataSourceDivision!: MatTableDataSource<DivisionWiseASPendingDetails>;
  @ViewChild('itemDetailsModal') itemDetailsModal: any;
  @ViewChild('itemDetailsModal1') itemDetailsModal1: any;
  @ViewChild('itemDetailsModal2') itemDetailsModal2: any;
  @ViewChild('itemDetailsModal3') itemDetailsModal3: any;
  @ViewChild('itemDetailsModalCom_Han') itemDetailsModalCom_Han: any;
  @ViewChild('itemDetailsModalRun_Work') itemDetailsModalRun_Work: any;
  @ViewChild('itemDetailsModalLand_isu') itemDetailsModalLand_isu: any;
  @ViewChild('itemDetailsModalTW') itemDetailsModalTW: any;
          @ViewChild('paginator') paginator!: MatPaginator;
          @ViewChild('paginator1') paginator1!: MatPaginator;
          @ViewChild('paginator2') paginator2!: MatPaginator;
          @ViewChild('paginator3') paginator3!: MatPaginator;
          @ViewChild('paginatorCom_Han') paginatorCom_Han!: MatPaginator;
          @ViewChild('paginatorRun_Work') paginatorRun_Work!: MatPaginator;
          @ViewChild('paginatorLand_isu') paginatorLand_isu!: MatPaginator;
          @ViewChild('paginatorTW') paginatorTW!: MatPaginator;
          @ViewChild('sort') sort!: MatSort;
          @ViewChild('sort1') sort1!: MatSort;
          @ViewChild('sort2') sort2!: MatSort;
          @ViewChild('sort3') sort3!: MatSort;
          @ViewChild('sortCom_Han') sortCom_Han!: MatSort;
          @ViewChild('sortRun_Work') sortRun_Work!: MatSort;
          @ViewChild('sortLand_isu') sortLand_isu!: MatSort;
          @ViewChild('sortTW') sortTW!: MatSort;
          dispatchData: WORunningHandDetails[] = [];
          dispatchDataCom_Han: WORunningHandDetails[] = [];
          dispatchDataRun_Work: WORunningHandDetails[] = [];
          dispatchData1: LandIssue_RetToDeptDetatails[] = [];
          dispatchDataLand_isu: LandIssue_RetToDeptDetatails[] = [];
          dispatchData2: DetailProgressTinP[] = [];
          dispatchData3: TenderInProcess[] = [];
          dispatchData4: TotalWorksAbstract[] = [];
          // ASFileData: ASFile[] = [];
          ASFileData: ASFile[] = [];
 //#endregion
  // ChartOptions
  @ViewChild('chart') chart: ChartComponent | undefined;
  public cO: Partial<ChartOptions> | undefined;
  // chartOptions: ChartOptions;
  chartOptions!: ChartOptions; // For bar chart
  chartOptions1!: ChartOptions; // For line chart
  chartOptions2!: ChartOptions; // For bar charta
  chartOptions3!: ChartOptions; // For line chart
  chartOptions4!: ChartOptions; // For line chart
  // whidMap: { [key: string]: number } = {};
  // Running Works 
    RunningWorkDataGTotal:RunningWork[]=[];
    RunningWorkDataDivision:RunningWork[]=[];
    RunningWorkDataScheme:RunningWork[]=[];
    RunningWorkDataDistrict:RunningWork[]=[];
    RunningWorkDataContractor:RunningWork[]=[];
  selectedName: any;
  himisDistrictid:any;
  divid:any;
  roleName:any;
  contractorid=0;
  dashname:any;
  nosworks:any;
  ASAmount=1;



// new running workr

  selectedvalue:any;
  selectedParameter:any;
// divisionid: any;
// himisDistrictid: any;
mainschemeid:any;
  constructor(public api: ApiService, public spinner: NgxSpinnerService, private cdr: ChangeDetectorRef,private dialog: MatDialog,) {
  this.dataSource = new MatTableDataSource<WORunningHandDetails>([]);
  this.dataSourceCom_Han = new MatTableDataSource<WORunningHandDetails>([]);
  this.dataSourceRun_Work = new MatTableDataSource<WORunningHandDetails>([]);
    this.dataSource1 = new MatTableDataSource<LandIssue_RetToDeptDetatails>([]);
    this.dataSourceLand_isu= new MatTableDataSource<LandIssue_RetToDeptDetatails>([]);
    this.dataSource2 = new MatTableDataSource<DetailProgressTinP>([]);
    this.dataSource3 = new MatTableDataSource<TenderInProcess>([]);
    this.dataSource4 = new MatTableDataSource<TotalWorksAbstract>([]);
  }

  ngOnInit() {
    var roleName = localStorage.getItem('roleName');
    if (roleName == 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      this.himisDistrictid = 0;
      this.showDivision = false;
      this.loadInitialData();
    } else if (roleName == 'Collector') {
      this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
      this.showDistrict = false;
      this.showDivision = false;
      this.loadInitialData();
    

    } else {
      this.himisDistrictid = 0;
      this.divisionid = 0;
      this.loadInitialData();

    }
    this.getmain_scheme();
    this.initializeChartOptions();
    this.GETRunningWorkTotal();
    this.GETRunningWorksDivision();
    this.GETRunningWorkScheme();
    this.GETRunningWorkDistrict();
    this.GETRunningWorkContractor();
  }
//#region 
  loadInitialData() {

    this.spinner.show();
    this.divisionid = this.divisionid == 0 ? 0 : this.divisionid;
    this.himisDistrictid = this.himisDistrictid == 0 ? 0 : this.himisDistrictid;
    // console.log('1 divisionid=', this.divisionid, 'himisDistrictid=', this.himisDistrictid, 'mainSchemeID=', this.mainSchemeID);
      var mainSchemeId=0;
      var ASID=0;
      var GrantID=0;
    this.api.DashProgressCount(this.divisionid,mainSchemeId,this.himisDistrictid,ASID,GrantID,this.ASAmount).subscribe(
      (res: any) => {
        console.log("res=",JSON.stringify(res));
        this.originalData = this.sortDistrictData(res); // Save as original data
        this.districtData = [...this.originalData]; // Set for display
        this.calculateTotalNosWorks();
        this.spinner.hide();
      },
      (error) => {
        // console.error('API Error:', error);
        alert(`API Error: ${JSON.stringify(error)}`);
      }
    );
  }

 
  
  DashProgressCount() {
    try {
      this.spinner.show();

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
      if (this.selectedTabIndex === 1) {
        this.himisDistrictid =0;
      }
      // else{
      //   this.himisDistrictid =0;
      // }
      // this.distid = this.distid == 0 ? 0 : this.distid;
     var ASID=0;
     var GrantID=0;
      this.divisionid = this.divisionid == 0 ? 0 : this.divisionid;
      this.mainSchemeID = this.mainSchemeID == 0 ? 0 : this.mainSchemeID;
      this.himisDistrictid = this.himisDistrictid == 0 ? 0 : this.himisDistrictid;
      // console.error('dist id:', this.himisDistrictid  );
      // console.error('mainSchemeID:', this.mainSchemeID);
      // console.log('divisionid=', this.divisionid, 'himisDistrictid=', this.himisDistrictid, 'mainSchemeID=', this.mainSchemeID);
      // divisionId: any, mainSchemeId: number, distid: number,ASID:any,ASAmount:any
      this.api.DashProgressCount(this.divisionid, this.mainSchemeID, this.himisDistrictid,ASID,GrantID,this.ASAmount).subscribe(
        (res: any) => {
          if (this.selectedTabIndex === 0) {
            // Do not overwrite the original data for "Total Works"
            this.districtData = [...this.originalData];
            if (this.mainSchemeID !== 0) {
              // alert("scheme ");
              this.districtData = this.sortDistrictData(res);
              // console.log(' on bug reotalwork1=', JSON.stringify(this.districtData));

            }
            //  else if (){

            // }
            
            else {
              // alert("ather ");
              this.districtData = this.sortDistrictData(res);
              // this.districtData = [...this.originalData];

              // console.log(' on bug reotalwork2=', JSON.stringify(this.districtData));
            }
          } else {
            this.districtData = res;
            // console.log('re1=', JSON.stringify(this.districtData));
            this.districtData = this.sortDistrictData(res);
            // console.log('re2=', JSON.stringify(this.districtData));
          }
          // console.log('new on bug reotalwork3=', this.districtData);

          this.calculateTotalNosWorks();
          this.spinner.hide();

        },
        (error) => {
          // console.error('API Error:', error);
          alert(`API Error:: ${JSON.stringify(error)}`);
        }
      );
    } catch (ex: any) {
      alert(`Exception:: ${JSON.stringify(ex.message)}`);
      // console.error('Exception:', ex.message);
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
    this.DashProgressCount();
    // console.error('onButtonClick',this.divisionid);

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
 
//#endregion
  


  //#region Data table GETTobeTenderAll
TotalWorksAbstract(){
  // ;
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
const contractorid=0;
  this.divisionid = this.divisionid == 0 ? 0 : this.divisionid;
  this.mainSchemeID = this.mainSchemeID == 0 ? 0 : this.mainSchemeID;
  this.himisDistrictid = this.himisDistrictid == 0 ? 0 : this.himisDistrictid;
  // console.log('divisionid=', this.divisionid, 'himisDistrictid=', this.himisDistrictid, 'mainSchemeID=', this.mainSchemeID);
  // ?divisionid=0&districtid=0&mainschemeid=116&contractorid=0&ASAmount=1
  this.api.GET_TotalWorksAbstract(this.divisionid,this.himisDistrictid,this.mainSchemeID,contractorid,this.ASAmount)
  .subscribe(
    (res) => {
      this.dispatchData4 = res.map(
        (item: TotalWorksAbstract, index: number) => ({
          ...item,
          sno: index + 1,
        })
      );
      // console.log('TotalWorksAbstract 1=:', this.dispatchData4);
      this.dataSource4.data = this.dispatchData4;
      this.dataSource4.paginator = this.paginatorTW;
      this.dataSource4.sort = this.sortTW;
      this.cdr.detectChanges();
      this.spinner.hide();
    },
    (error) => {
      this.spinner.hide();
      // alert(`Error fetching data: ${error.message}`);
      alert(`API Error:: ${JSON.stringify(error.message)}`);
    }
  );
this.openDialogTW();

}

  DetailProgress(did:any,dashname:any,nosworks:any): void {
  //  
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
  // console.log('divisionid=', this.divisionid, 'himisDistrictid=', this.himisDistrictid, 'mainSchemeID=', this.mainSchemeID);
// Icon for "To be Tender"
  if (did == 1001) {
    // console.log('1001 =: ',did);
    this.api.GETTobeTenderAll(did,this.divisionid,this.himisDistrictid,this.mainSchemeID,this.ASAmount)
    .subscribe(
      (res) => {
        this.dispatchData2 = res.map(
          (item: DetailProgressTinP, index: number) => ({
            ...item,
            sno: index + 1,
          })
        );
        // console.log('DetailProgressTinP=:', this.dispatchData2);
        this.dataSource2.data = this.dispatchData2;
        this.dataSource2.paginator = this.paginator2;
        this.dataSource2.sort = this.sort2;
        this.cdr.detectChanges();
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        // alert(`Error fetching data: ${error.message}`);
        alert(`API Error:: ${JSON.stringify(error.message)}`);
      }
    );
  this.openDialog2();

    // return 
  }
  // Icon for "Tender in Process"
   else if (did == 2001) {
    // 
    console.log('2001=: ',did);
    this.api.GETDetailProgress(did,this.divisionid,this.himisDistrictid,this.mainSchemeID,this.ASAmount)
    .subscribe(
      (res) => {
        this.dispatchData3 = res.map(
          (item: TenderInProcess, index: number) => ({
            ...item,
            sno: index + 1,
          })
        );
        // console.log('TenderInProcess=:', this.dispatchData3);
        this.dataSource3.data = this.dispatchData3;
        this.dataSource3.paginator = this.paginator3;
        this.dataSource3.sort = this.sort3;
        this.cdr.detectChanges();
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        alert(`Error fetching data: ${JSON.stringify(error.message)}`);
      }
    );
  this.openDialog3();

    // return 
  } 
   else if (did == 4001) {
    console.log('4001=: ',did);
    this.api.GETWORunningHandDetails(did,this.divisionid,this.himisDistrictid,this.mainSchemeID,this.contractorid,this.ASAmount)
    .subscribe(
      (res) => {
        this.dispatchDataCom_Han = res.map(
          (item: WORunningHandDetails, index: number) => ({
            ...item,
            sno: index + 1,
          })
        );
        console.log('WORunningHandDetails=:', this.dispatchDataCom_Han);
        this.dataSourceCom_Han.data = this.dispatchDataCom_Han;
        this.dataSourceCom_Han.paginator = this.paginatorCom_Han;
        this.dataSourceCom_Han.sort = this.sortCom_Han;
        this.cdr.detectChanges();
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        alert(`Error fetching data: ${JSON.stringify(error.message)}`);
      }
    );
  this.openDialogCom_Han();
    // return '#9E9E9E';
  }
  //  Running Work
  else if (did == 5001) {
    // console.log('5001=: ',did);
    this.api.GETWORunningHandDetails(did,this.divisionid,this.himisDistrictid,this.mainSchemeID,this.contractorid,this.ASAmount)
    .subscribe(
      (res) => {
        this.dispatchDataRun_Work = res.map(
          (item: WORunningHandDetails, index: number) => ({
            ...item,
            sno: index + 1,
          })
        );
        console.log('Run_Work=:', this.dispatchDataRun_Work);
        this.dataSourceRun_Work.data = this.dispatchDataRun_Work;
        this.dataSourceRun_Work.paginator = this.paginatorRun_Work;
        this.dataSourceRun_Work.sort = this.sortRun_Work;
        this.cdr.detectChanges();
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        alert(`Error fetching data: ${error.message}`);
      }
    );
  this.openDialogRun_Work();
  }
  // Land Not Alloted/Land Dispute
   else if (did === 6001) {
    console.log('6001 =: ',did);
    this.api.GETLandIssueRetToDeptDetatails(did,this.divisionid,this.himisDistrictid,this.mainSchemeID,this.ASAmount)
    .subscribe(
      (res) => {
        this.dispatchDataLand_isu = res.map(
          (item: LandIssue_RetToDeptDetatails, index: number) => ({
            ...item,
            sno: index + 1,
          })
        );
        console.log('LandIssue=:', this.dispatchDataLand_isu);
        this.dataSourceLand_isu.data = this.dispatchDataLand_isu;
        this.dataSourceLand_isu.paginator = this.paginatorLand_isu;
        this.dataSourceLand_isu.sort = this.sortLand_isu;
        this.cdr.detectChanges();
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        alert(`Error fetching data: ${JSON.stringify(error.message)}`);
      }
    );
  this.openDialogLand_isu();
    // return '#FF0000';|| did === 8001
  }

    else if (did == 8001) {
      console.log(' 8001 =: ',did);
      this.api.GETLandIssueRetToDeptDetatails(did,this.divisionid,this.himisDistrictid,this.mainSchemeID,this.ASAmount)
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
          alert(`Error fetching data: ${JSON.stringify(error.message)}`);
        }
      );
    this.openDialog1();
  } 
  // else if (did == 3001) {
  //   // return '#ADD8E6';
  //   return '#FF8C00';
  // }

  // else if (did == 6001) {
  //   return '#fa5795';
  //   // return '#FF0000';
  // }
  // else if (did == 7001) {
  //   return '#FFA500';
  // }

  else {
    // console.log('3001=: ',did);
    this.api.GETWORunningHandDetails(did,this.divisionid,this.himisDistrictid,this.mainSchemeID,this.contractorid,this.ASAmount)
    .subscribe(
      (res) => {
        this.dispatchData = res.map(
          (item: WORunningHandDetails, index: number) => ({
            ...item,
            sno: index + 1,
          })
        );
        // console.log('WORunningHandDetails=:', this.dispatchData);
        this.dataSource.data = this.dispatchData;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.cdr.detectChanges();
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        alert(`Error fetching data: ${JSON.stringify(error.message)}`);
      }
    );
  this.openDialog();
  }
 }

 applyTextFilterTW(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource4.filter = filterValue.trim().toLowerCase();
  if (this.dataSource4.paginator) {
    this.dataSource4.paginator.firstPage();
  }
}
 applyTextFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
 applyTextFilterCom_Han(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSourceCom_Han.filter = filterValue.trim().toLowerCase();
  if (this.dataSourceCom_Han.paginator) {
    this.dataSourceCom_Han.paginator.firstPage();
  }
}
 applyTextFilterRun_Work(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSourceRun_Work.filter = filterValue.trim().toLowerCase();
  if (this.dataSourceRun_Work.paginator) {
    this.dataSourceRun_Work.paginator.firstPage();
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
applyTextFilterLand_isu(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSourceLand_isu.filter = filterValue.trim().toLowerCase();
  if (this.dataSourceLand_isu.paginator) {
    this.dataSourceLand_isu.paginator.firstPage();
  }
}
exportToPDF() {
  const doc = new jsPDF('l', 'mm', 'a4');
  const columns = [
    { title: 'S.No', dataKey: 'sno' },
    { title: 'Head No', dataKey: 'grantNo' },
    { title: 'Head', dataKey: 'head' },
    { title: 'Division', dataKey: 'divName_En' },
    { title: 'District', dataKey: 'district' },
    { title: 'Block', dataKey: 'blockname' },
    { title: 'AS Letter No', dataKey: 'letterNo' },
    { title: 'Approver', dataKey: 'approver' },
    { title: 'Work', dataKey: 'work' },
    { title: 'AS Date', dataKey: 'aadt' },
    { title: 'AS Amount(in Lacs)', dataKey: 'asAmt' },
    { title: 'TS Date', dataKey: 'tsDate' },
    { title: 'TS Amount(in Lacs)', dataKey: 'tsamt' },
    { title: 'Tender Type', dataKey: 'tType' },
    { title: 'NIT Reference', dataKey: 'tenderReference' },
    { title: 'NIT/Sanction DT', dataKey: 'dateOfIssueNIT' },
    { title: 'Acceptance Letter RefNo', dataKey: 'acceptanceLetterRefNo' },
    { title: 'Accepted DT', dataKey: 'acceptLetterDT' },
    { title: 'Rate%', dataKey: 'sanctionRate' },
    { title: 'Sanction', dataKey: 'sanctionDetail' },
    { title: 'Amount Of Contract(In Lacs)', dataKey: 'totalAmountOfContract' },
    { title: 'Total paid(In Lacs)', dataKey: 'totalpaid' },
    { title: 'Total unpaid(In Lacs)', dataKey: 'totalunpaid' },
    { title: 'Work Order DT', dataKey: 'wrokOrderDT' }, // (Consider renaming in data)
    { title: 'Time Allowed', dataKey: 'timeAllowed' },
    { title: 'Due DT Time PerAdded', dataKey: 'dueDTTimePerAdded' },
    { title: 'Work Order RefNo', dataKey: 'agreementRefNo' },
    { title: 'Contractor ID/Class', dataKey: 'cid' },
    { title: 'Contractor', dataKey: 'contractorNAme' }, // (Possible typo: "contractorNAme" should be "contractorName"?)
    { title: 'Contractor Mobile No', dataKey: 'mobNo' },
    { title: 'Last Progress', dataKey: 'lProgress' },
    { title: 'Sub Engineer', dataKey: 'subengname' },
    { title: 'Asst.Eng', dataKey: 'aeName' },
    { title: 'Work ID', dataKey: 'work_id' },
    { title: 'AS Letter', dataKey: 'asLetter' },
  ];
  const rows = this.dispatchData.map((row) => ({
    sno: row.sno,
      grantNo: row.grantNo,
    head: row.head,
    divName_En:row.divName_En,
    district: row.district,
    blockname: row.blockname,
    letterNo: row.letterNo,
    approver: row.approver,
    work: row.work,
    aadt: row.aadt,
    asAmt: row.asAmt,
    tsDate: row.tsDate,
    tsamt: row.tsamt,
    tType: row.tType,
    tenderReference: row.tenderReference,
    dateOfIssueNIT: row.dateOfIssueNIT,
    acceptanceLetterRefNo: row.acceptanceLetterRefNo,
    acceptLetterDT: row.acceptLetterDT,
    sanctionRate: row.sanctionRate,
    sanctionDetail: row.sanctionDetail,
    totalAmountOfContract: row.totalAmountOfContract,
    totalpaid: row.totalpaid ,
    totalunpaid : row.totalunpaid ,
    wrokOrderDT: row.wrokOrderDT,
    timeAllowed: row.timeAllowed,
    dueDTTimePerAdded: row.dueDTTimePerAdded,
    agreementRefNo: row.agreementRefNo,
    cid: row.cid,
    contractorNAme: row.contractorNAme,
    mobNo: row.mobNo,
    lProgress: row.lProgress,
    subengname: row.subengname,
    aeName: row.aeName,
    work_id: row.work_id,
    asLetter: row.asLetter,
  }));

  autoTable(doc, {
    columns: columns,
    body: rows,
    startY: 20,
    theme: 'striped',
    headStyles: { fillColor: [22, 160, 133] },
  });

  doc.save('Acceptance_WOrderDetail.pdf');
}
exportToPDFCom_Han() {
  const doc = new jsPDF('l', 'mm', 'a4');
  const columns = [
    { title: 'S.No', dataKey: 'sno' },
    { title: 'Head No', dataKey: 'grantNo' },
    { title: 'Head', dataKey: 'head' },
    { title: 'Division', dataKey: 'divName_En' },
    { title: 'District', dataKey: 'district' },
    { title: 'Block', dataKey: 'blockname' },
    { title: 'AS Letter No', dataKey: 'letterNo' },
    { title: 'Approver', dataKey: 'approver' },
    { title: 'Work', dataKey: 'work' },
    { title: 'AS Date', dataKey: 'aadt' },
    { title: 'AS Amount(in Lacs)', dataKey: 'asAmt' },
    { title: 'TS Date', dataKey: 'tsDate' },
    { title: 'TS Amount(in Lacs)', dataKey: 'tsamt' },
    { title: 'Tender Type', dataKey: 'tType' },
    { title: 'NIT Reference', dataKey: 'tenderReference' },
    { title: 'NIT/Sanction DT', dataKey: 'dateOfIssueNIT' },
    { title: 'Acceptance Letter RefNo', dataKey: 'acceptanceLetterRefNo' },
    { title: 'Accepted DT', dataKey: 'acceptLetterDT' },
    { title: 'Rate%', dataKey: 'sanctionRate' },
    { title: 'Sanction', dataKey: 'sanctionDetail' },
    { title: 'Amount Of Contract(In Lacs)', dataKey: 'totalAmountOfContract' },
    { title: 'Total paid(In Lacs)', dataKey: 'totalpaid' },
    { title: 'Total unpaid(In Lacs)', dataKey: 'totalunpaid' },
    { title: 'Work Order DT', dataKey: 'wrokOrderDT' }, // (Consider renaming in data)
    { title: 'Time Allowed', dataKey: 'timeAllowed' },
    { title: 'Due DT Time PerAdded', dataKey: 'dueDTTimePerAdded' },
    { title: 'Work Order RefNo', dataKey: 'agreementRefNo' },
    { title: 'Contractor ID/Class', dataKey: 'cid' },
    { title: 'Contractor', dataKey: 'contractorNAme' }, // (Possible typo: "contractorNAme" should be "contractorName"?)
    { title: 'Contractor Mobile No', dataKey: 'mobNo' },
    { title: 'Last Progress', dataKey: 'lProgress' },
    { title: 'Handover DT', dataKey: 'progressDT' },
    { title: 'Sub Engineer', dataKey: 'subengname' },
    { title: 'Asst.Eng', dataKey: 'aeName' },
    { title: 'Work ID', dataKey: 'work_id' },
    { title: 'AS Letter', dataKey: 'asLetter' },
  ];
  const rows = this.dispatchDataCom_Han.map((row) => ({
    sno: row.sno,
    grantNo: row.grantNo,
    head: row.head,
    divName_En:row.divName_En,
    district: row.district,
    blockname: row.blockname,
    letterNo: row.letterNo,
    approver: row.approver,
    work: row.work,
    aadt: row.aadt,
    asAmt: row.asAmt,
    tsDate: row.tsDate,
    tsamt: row.tsamt,
    tType: row.tType,
    tenderReference: row.tenderReference,
    dateOfIssueNIT: row.dateOfIssueNIT,
    acceptanceLetterRefNo: row.acceptanceLetterRefNo,
    acceptLetterDT: row.acceptLetterDT,
    sanctionRate: row.sanctionRate,
    sanctionDetail: row.sanctionDetail,
    totalAmountOfContract: row.totalAmountOfContract,
    totalpaid: row.totalpaid ,
    totalunpaid : row.totalunpaid ,
    wrokOrderDT: row.wrokOrderDT,
    timeAllowed: row.timeAllowed,
    dueDTTimePerAdded: row.dueDTTimePerAdded,
    agreementRefNo: row.agreementRefNo,
    cid: row.cid,
    contractorNAme: row.contractorNAme,
    mobNo: row.mobNo,
    lProgress: row.lProgress,
    progressDT: row.progressDT,
    subengname: row.subengname,
    aeName: row.aeName,
    work_id: row.work_id,
    asLetter: row.asLetter,
  }));

  autoTable(doc, {
    columns: columns,
    body: rows,
    startY: 20,
    theme: 'striped',
    headStyles: { fillColor: [22, 160, 133] },
  });

  doc.save('Completed_Handover.pdf');
}
exportToPDFTW() {
  const doc = new jsPDF('l', 'mm', 'a4');
  const columns = [
    { title: 'S.No', dataKey: 'sno' },
    { title: 'Head No', dataKey: 'grantNo' },
    { title: 'Head', dataKey: 'head' },
    { title: 'Division', dataKey: 'divName_En' },
    { title: 'District', dataKey: 'district' },
    { title: 'Block', dataKey: 'blockname' },
    { title: 'AS Letter No', dataKey: 'letterNo' },
    { title: 'Approver', dataKey: 'approver' },
    { title: 'Work', dataKey: 'work' },
    { title: 'AS Date', dataKey: 'aadt' },
    { title: 'AS Amount(in Lacs)', dataKey: 'asAmt' },
    { title: 'TS Date', dataKey: 'tsDate' },
    { title: 'TS Amount(in Lacs)', dataKey: 'tsamt' },
    { title: 'Tender Type', dataKey: 'tType' },
    { title: 'NIT Reference', dataKey: 'tenderReference' },
    { title: 'NIT/Sanction DT', dataKey: 'dateOfIssueNIT' },
    { title: 'Acceptance Letter RefNo', dataKey: 'acceptanceLetterRefNo' },
    { title: 'Accepted DT', dataKey: 'acceptLetterDT' },
    { title: 'Rate%', dataKey: 'sanctionRate' },
    { title: 'Sanction', dataKey: 'sanctionDetail' },
    { title: 'Amount Of Contract(In Lacs)', dataKey: 'totalAmountOfContract' },
    { title: 'Total paid(In Lacs)', dataKey: 'totalpaid' },
    { title: 'Total unpaid(In Lacs)', dataKey: 'totalunpaid' },
    { title: 'Work Order DT', dataKey: 'wrokOrderDT' }, // (Consider renaming in data)
    { title: 'Time Allowed', dataKey: 'timeAllowed' },
    { title: 'Due DT Time PerAdded', dataKey: 'dueDTTimePerAdded' },
    { title: 'Work Order RefNo', dataKey: 'agreementRefNo' },
    { title: 'Contractor ID/Class', dataKey: 'cid' },
    { title: 'Contractor', dataKey: 'contractorNAme' }, // (Possible typo: "contractorNAme" should be "contractorName"?)
    { title: 'Contractor Mobile No', dataKey: 'mobNo' },
    { title: 'Last Progress', dataKey: 'lProgress' },
    { title: 'Progress DT', dataKey: 'progressDT' },
    { title: 'Exp.Comp DT', dataKey: 'expcompdt' },
    { title: 'Delay Reason', dataKey: 'delayreason' },
    { title: 'Remarks', dataKey: 'pRemarks' },
    { title: 'Sub Engineer', dataKey: 'subengname' },
    { title: 'Asst.Eng', dataKey: 'aeName' },
    { title: 'Work ID', dataKey: 'work_id' },
    { title: 'AS Letter', dataKey: 'asLetter' },
  ];
  const rows = this.dispatchData4.map((row) => ({
    sno: row.sno,
    grantNo: row.grantNo,
    head: row.head,
    divName_En:row.divName_En,
    district: row.district,
    blockname: row.blockname,
    letterNo: row.letterNo,
    approver: row.approver,
    work: row.work,
    aadt: row.aadt,
    asAmt: row.asAmt,
    tsDate: row.tsDate,
    tsamt: row.tsamt,
    tType: row.tType,
    tenderReference: row.tenderReference,
    dateOfIssueNIT: row.dateOfIssueNIT,
    acceptanceLetterRefNo: row.acceptanceLetterRefNo,
    acceptLetterDT: row.acceptLetterDT,
    sanctionRate: row.sanctionRate,
    sanctionDetail: row.sanctionDetail,
    totalAmountOfContract: row.totalAmountOfContract,
    totalpaid: row.totalpaid ,
    totalunpaid : row.totalunpaid ,
    wrokOrderDT: row.wrokOrderDT,
    timeAllowed: row.timeAllowed,
    dueDTTimePerAdded: row.dueDTTimePerAdded,
    agreementRefNo: row.agreementRefNo,
    cid: row.cid,
    contractorNAme: row.contractorNAme,
    mobNo: row.mobNo,
    lProgress: row.lProgress,
    progressDT: row.progressDT,
     expcompdt: row.expcompdt,
     delayreason: row.delayreason,
     pRemarks: row.pRemarks,
    subengname: row.subengname,
    aeName: row.aeName,
    work_id: row.work_id,
    asLetter: row.asLetter,
  }));

  autoTable(doc, {
    columns: columns,
    body: rows,
    startY: 20,
    theme: 'striped',
    headStyles: { fillColor: [22, 160, 133] },
  });

  doc.save('WorksAbstractD.pdf');
}
exportToPDFRun_Work() {
  const doc = new jsPDF('l', 'mm', 'a4');
  const columns = [
    { title: 'S.No', dataKey: 'sno' },
    { title: 'Head No', dataKey: 'grantNo' },
    { title: 'Head', dataKey: 'head' },
    { title: 'Division', dataKey: 'divName_En' },
    { title: 'District', dataKey: 'district' },
    { title: 'Block', dataKey: 'blockname' },
    { title: 'AS Letter No', dataKey: 'letterNo' },
    { title: 'Approver', dataKey: 'approver' },
    { title: 'Work', dataKey: 'work' },
    { title: 'AS Date', dataKey: 'aadt' },
    { title: 'AS Amount(in Lacs)', dataKey: 'asAmt' },
    { title: 'TS Date', dataKey: 'tsDate' },
    { title: 'TS Amount(in Lacs)', dataKey: 'tsamt' },
    { title: 'Tender Type', dataKey: 'tType' },
    { title: 'NIT Reference', dataKey: 'tenderReference' },
    { title: 'NIT/Sanction DT', dataKey: 'dateOfIssueNIT' },
    { title: 'Acceptance Letter RefNo', dataKey: 'acceptanceLetterRefNo' },
    { title: 'Accepted DT', dataKey: 'acceptLetterDT' },
    { title: 'Rate%', dataKey: 'sanctionRate' },
    { title: 'Sanction', dataKey: 'sanctionDetail' },
    { title: 'Amount Of Contract(In Lacs)', dataKey: 'totalAmountOfContract' },
    { title: 'Total paid(In Lacs)', dataKey: 'totalpaid' },
    { title: 'Total unpaid(In Lacs)', dataKey: 'totalunpaid' },
    { title: 'Work Order DT', dataKey: 'wrokOrderDT' }, // (Consider renaming in data)
    { title: 'Time Allowed', dataKey: 'timeAllowed' },
    { title: 'Due DT Time PerAdded', dataKey: 'dueDTTimePerAdded' },
    { title: 'Work Order RefNo', dataKey: 'agreementRefNo' },
    { title: 'Contractor ID/Class', dataKey: 'cid' },
    { title: 'Contractor', dataKey: 'contractorNAme' }, // (Possible typo: "contractorNAme" should be "contractorName"?)
    { title: 'Contractor Mobile No', dataKey: 'mobNo' },
    { title: 'Last Progress', dataKey: 'lProgress' },
    { title: 'Progress DT', dataKey: 'progressDT' },
    { title: 'Exp.Comp DT', dataKey: 'expcompdt' },
    { title: 'Delay Reason', dataKey: 'delayreason' },
   
    { title: 'Sub Engineer', dataKey: 'subengname' },
    { title: 'Asst.Eng', dataKey: 'aeName' },
    { title: 'Work ID', dataKey: 'work_id' },
    { title: 'AS Letter', dataKey: 'asLetter' },
  ];
  const rows = this.dispatchDataRun_Work.map((row) => ({
    sno: row.sno,
    grantNo: row.grantNo,
    head: row.head,
    divName_En:row.divName_En,
    district: row.district,
    blockname: row.blockname,
    letterNo: row.letterNo,
    approver: row.approver,
    work: row.work,
    aadt: row.aadt,
    asAmt: row.asAmt,
    tsDate: row.tsDate,
    tsamt: row.tsamt,
    tType: row.tType,
    tenderReference: row.tenderReference,
    dateOfIssueNIT: row.dateOfIssueNIT,
    acceptanceLetterRefNo: row.acceptanceLetterRefNo,
    acceptLetterDT: row.acceptLetterDT,
    sanctionRate: row.sanctionRate,
    sanctionDetail: row.sanctionDetail,
    totalAmountOfContract: row.totalAmountOfContract,
    totalpaid: row.totalpaid ,
    totalunpaid : row.totalunpaid ,
    wrokOrderDT: row.wrokOrderDT,
    timeAllowed: row.timeAllowed,
    dueDTTimePerAdded: row.dueDTTimePerAdded,
    agreementRefNo: row.agreementRefNo,
    cid: row.cid,
    contractorNAme: row.contractorNAme,
    mobNo: row.mobNo,
    lProgress: row.lProgress,
    progressDT: row.progressDT,
     expcompdt: row.expcompdt,
     delayreason: row.delayreason,
    subengname: row.subengname,
    aeName: row.aeName,
    work_id: row.work_id,
    asLetter: row.asLetter,
  }));

  autoTable(doc, {
    columns: columns,
    body: rows,
    startY: 20,
    theme: 'striped',
    headStyles: { fillColor: [22, 160, 133] },
  });

  doc.save('Running_Work.pdf');
}
exportobeTenderAll_PDFT() {
  const doc = new jsPDF('l', 'mm', 'a4');
  const columns = [
   

    { title: 'S.No', dataKey: 'sno' },
    { title: 'Head No', dataKey: 'grantNo' },
    { title: 'Head', dataKey: 'head' },
    { title: 'Division', dataKey: 'divName_En' },
    { title: 'District', dataKey: 'district' },
    { title: 'Block', dataKey: 'blockname' },
    { title: 'AS Letter No', dataKey: 'letterNo' },
    { title: 'Approver', dataKey: 'approver' },
    { title: 'Type', dataKey: 'type_name' },
    { title: 'Works', dataKey: 'work' },
    { title: 'AS Amount', dataKey: 'asAmt' },
    { title: 'Total paid(In Lacs)', dataKey: 'totalpaid' },
    { title: 'Total unpaid(In Lacs)', dataKey: 'totalunpaid' },
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
    grantNo: row.grantNo,
    head: row.head,
    approver: row.approver,
    type_name: row.type_name,
    work: row.work,
    asAmt: row.asAmt,
    totalpaid: row.totalpaid ,
    totalunpaid : row.totalunpaid ,
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
    { title: 'Head No', dataKey: 'grantNo' },
    { title: 'Head', dataKey: 'head' },
    { title: 'Division', dataKey: 'divName_En' },
    { title: 'District', dataKey: 'district' },
    { title: 'Block', dataKey: 'blockname' },
    { title: 'AS Letter No', dataKey: 'letterNo' },
    { title: 'Approver', dataKey: 'approver' },
    { title: 'Works', dataKey: 'work' },
    { title: 'AS Date', dataKey: 'aadt' },
    { title: 'AS Amount(in Lacs)', dataKey: 'asAmt' },
    { title: 'Total paid(In Lacs)', dataKey: 'totalpaid' },
    { title: 'Total unpaid(In Lacs)', dataKey: 'totalunpaid' },
    { title: 'TS Date', dataKey: 'tsDate' },
    { title: 'TS Amount(in Lacs)', dataKey: 'tsamt' },
    { title: 'lProgress', dataKey: 'lProgress' },
    { title: 'Progress DT', dataKey: 'progressDT' },
    
    { title: 'FMR code', dataKey: 'fmrcode' },
    { title: 'Start DT', dataKey: 'startdt' },
    { title: 'End DT', dataKey: 'enddt' },
    { title: 'NO. of Calls', dataKey: 'noofcalls' },
    { title: 'Tender NO.', dataKey: 'tenderno' },
    { title: 'Eproc NO.', dataKey: 'eprocno' },
    { title: 'Opened DT', dataKey: 'covOpenedDT' },
    { title: 'Topned price DT', dataKey: 'topnedpricedt' },
    { title: 'Work id', dataKey: 'work_id' },
    { title: 'AS Letter', dataKey: 'asLetter' },
    // { title: 'Type', dataKey: 'type_name' },
    // { title: 'Remarks', dataKey: 'remarks' },
    // { title: 'Group', dataKey: 'groupName' },
    // { title: 'Dash', dataKey: 'dashName' },
    // { title: 'AS Path', dataKey: 'asPath' },
    // { title: 'Descri ID', dataKey: 'descri' },
    // { title: 'AS ID', dataKey: 'asid' },


  ];
  const rows = this.dispatchData3.map((row) => ({
    //  'sno','head','divName_En','district','blockname','letterNo',
    // 'approver','work','aadt','asAmt','tsDate','tsamt',
    // 'lProgress','progressDT','fmrcode', 'startdt','enddt', 'noofcalls',
    // 'tenderno', 'eprocno', 'covOpenedDT', 'topnedpricedt',     'work_id','asLetter','action'
    sno: row.sno,
    grantNo: row.grantNo,
    head: row.head,
    divName_En:row.divName_En,
    district: row.district,
    blockname: row.blockname,
    letterNo: row.letterNo,
    approver: row.approver,
    work: row.work,
    // type_name: row.type_name,
    aadt: row.aadt,
    asAmt: row.asAmt,
    totalpaid: row.totalpaid ,
    totalunpaid : row.totalunpaid ,
    tsDate: row.tsDate,
    tsamt: row.tsamt,
    lProgress: row.lProgress,
    progressDT: row.progressDT,
    fmrcode: row.fmrcode,
    startdt: row.startdt,
    enddt: row.enddt,
    noofcalls: row.noofcalls,
    tenderno: row.tenderno,
    eprocno: row.eprocno,
    covOpenedDT: row.covOpenedDT,
    topnedpricedt: row.topnedpricedt,
    worK_ID: row.worK_ID,
    asLetter: row.asLetter,
    
    // work_id: row.work_id,
    // remarks: row.remarks,
    // groupName: row.groupName,
    // dashName: row.dashName,
    // asPath: row.asPath,
    // asid: row.asid,
    // descri: row.descri,
   

  }));

  autoTable(doc, {
    columns: columns,
    body: rows,
    startY: 20,
    theme: 'striped',
    headStyles: { fillColor: [22, 160, 133] },
  });

  doc.save('TenderInProcess_Detail.pdf');
}
expor_PDFLand_isu() {
  const doc = new jsPDF('l', 'mm', 'a4');
  const columns = [
    { title: 'S.No', dataKey: 'sno' },
    { title: 'Head No', dataKey: 'grantNo' },
    { title: 'Head', dataKey: 'head' },
    { title: 'Division', dataKey: 'divName_En' },
    { title: 'District', dataKey: 'district' },
    { title: 'Block', dataKey: 'blockname' },
    { title: 'AS Letter No', dataKey: 'letterNo' },
    { title: 'Approver', dataKey: 'approver' },
    { title: 'Work', dataKey: 'work' },
    { title: 'AS Date', dataKey: 'aadt' },
    { title: 'AS Amount(in Lacs)', dataKey: 'asAmt' },
    { title: 'TS Date', dataKey: 'tsDate' },
    { title: 'TS Amount(in Lacs)', dataKey: 'tsamt' },
    { title: 'Tender Type', dataKey: 'tType' },
    { title: 'NIT Reference', dataKey: 'tenderReference' },
    { title: 'NIT/Sanction DT', dataKey: 'dateOfIssueNIT' },
    { title: 'Acceptance Letter RefNo', dataKey: 'acceptanceLetterRefNo' },
    { title: 'Accepted DT', dataKey: 'acceptLetterDT' },
    { title: 'Rate%', dataKey: 'sanctionRate' },
    { title: 'Sanction', dataKey: 'sanctionDetail' },
    { title: 'Amount Of Contract(In Lacs)', dataKey: 'totalAmountOfContract' },
    { title: 'Total paid(In Lacs)', dataKey: 'totalpaid' },
    { title: 'Total unpaid(In Lacs)', dataKey: 'totalunpaid' },
    { title: 'Work Order DT', dataKey: 'wrokOrderDT' }, // (Consider renaming in data)
    { title: 'Time Allowed', dataKey: 'timeAllowed' },
    { title: 'Due DT Time PerAdded', dataKey: 'dueDTTimePerAdded' },
    { title: 'Work Order RefNo', dataKey: 'agreementRefNo' },
    { title: 'Contractor ID/Class', dataKey: 'cid' },
    { title: 'Contractor', dataKey: 'contractorNAme' }, // (Possible typo: "contractorNAme" should be "contractorName"?)
    { title: 'Contractor Mobile No', dataKey: 'mobNo' },
    { title: 'Last Progress', dataKey: 'lProgress' },
    { title: 'Progress DT', dataKey: 'progressDT' },
    { title: 'Exp.Comp DT', dataKey: 'expcompdt' },
    { title: 'Delay Reason', dataKey: 'delayreason' },
    { title: 'Sub Engineer', dataKey: 'subengname' },
    { title: 'Asst.Eng', dataKey: 'aeName' },
    { title: 'Work ID', dataKey: 'work_id' },
    { title: 'AS Letter', dataKey: 'asLetter' },
  ];
  const rows = this.dispatchDataLand_isu.map((row) => ({
    sno: row.sno,
    grantNo: row.grantNo,
    head: row.head,
    divName_En:row.divName_En,
    district: row.district,
    blockname: row.blockname,
    letterNo: row.letterNo,
    approver: row.approver,
    work: row.work,
    aadt: row.aadt,
    asAmt: row.asAmt,
    tsDate: row.tsDate,
    tsamt: row.tsamt,
    tType: row.tType,
    tenderReference: row.tenderReference,
    dateOfIssueNIT: row.dateOfIssueNIT,
    acceptanceLetterRefNo: row.acceptanceLetterRefNo,
    acceptLetterDT: row.acceptLetterDT,
    sanctionRate: row.sanctionRate,
    sanctionDetail: row.sanctionDetail,
    totalAmountOfContract: row.totalAmountOfContract,
    totalpaid: row.totalpaid ,
    totalunpaid : row.totalunpaid ,
    wrokOrderDT: row.wrokOrderDT,
    timeAllowed: row.timeAllowed,
    dueDTTimePerAdded: row.dueDTTimePerAdded,
    agreementRefNo: row.agreementRefNo,
    cid: row.cid,
    contractorNAme: row.contractorNAme,
    mobNo: row.mobNo,
    lProgress: row.lProgress,
    progressDT: row.progressDT,
     expcompdt: row.expcompdt,
     delayreason: row.delayreason,
    subengname: row.subengname,
    aeName: row.aeName,
    work_id: row.work_id,
    asLetter: row.asLetter,
  }));

  autoTable(doc, {
    columns: columns,
    body: rows,
    startY: 20,
    theme: 'striped',
    headStyles: { fillColor: [22, 160, 133] },
  });

  doc.save('LandIssue_Detail.pdf');
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
  openDialogCom_Han() {
  
    const dialogRef = this.dialog.open(this.itemDetailsModalCom_Han, {
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
  openDialogRun_Work() {
    const dialogRef = this.dialog.open(this.itemDetailsModalRun_Work, {
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
  openDialogLand_isu() {
    const dialogRef = this.dialog.open(this.itemDetailsModalLand_isu, {
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
  openDialogTW() {
    const dialogRef = this.dialog.open(this.itemDetailsModalTW, {
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
      // asLetterName
      // filename
      this.spinner.show();
      this.api.GETASFile(ASID,workid)
        .subscribe(
          (res) => {
            // this.ASFileData=res;
            const filename = res[0]?.filename; // Ensure `res[0]` exists
            const URL = res[0]?.asLetterName;
            
            if (filename) {
              window.open(URL, '_blank');
            } else {
              alert("⚠️ Alert: AS Letter Not Found!\n\nThe requested document is missing.\nPlease try again later or contact support.");
              // alert("⚠️ Alert: AS Letter Not Found!\n\nThe requested document (AS Letter) is not available at this moment.\nPlease check again later or contact support for further assistance.");
            }
          //  const URL =this.ASFileData[0].asLetterName;
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
 
 
 

 

 


  getmain_scheme() {
    try {
      // 
      this.api.getMainScheme(this.isall).subscribe((res:any)=>{
        if (res && res.length > 0) {
        this.mainscheme = res.map((item: { mainSchemeID: any; name: any; }) => ({
          mainSchemeID: item.mainSchemeID, // Adjust key names if needed
          name : item.name,  
        }));
        // console.log('mainscheme :', this.mainscheme);
        } else {
          console.error('No name found or incorrect structure:', res);
        }
      }); 
       // this.api.getMainScheme(this.isall).subscribe(
      //   (res: any) => {
      //     this.mainscheme = res;
      //   },

      //   // mainSchemeID!: number;
      //   // name: any;
        
      //   (error) => {
      //     alert(JSON.stringify(error));
      //   }
      // );
   
    } catch (ex: any) {
      // alert(ex.message);
      alert(`API Error: ${JSON.stringify(ex.message)}`);
    }
  }


   
  onselect_databudgetOptions(event :Event): void {
    // this.ASAmount=event.buid

    // alert( this.ASAmount);
    const selectedUser = this.budgetOptions.find((user: { buid: any }) => user.buid === this.buid); 
    if (selectedUser) {
      this.ASAmount= selectedUser?.buid;
    this.DashProgressCount();

  // alert( this.ASAmount);
     } else {
    alert('Selected budget_ID not found in the list.');
  }

  }

  onselect_mainscheme_data(event: Event): void {
    // 
  const selectedUser = this.mainscheme.find((user: { mainSchemeID: any }) => user.mainSchemeID === this.mainSchemeID); 
  
  if (selectedUser) {
    //  const MID  =selectedUser.mainSchemeID || null;
    this.mainSchemeID = selectedUser?.mainSchemeID ;
    this.hide=true;
    const selectedName = selectedUser?.name; 
    this.selectedName=selectedName;
    //  this.mainSchemeID = mainSchemeID;
     // this.divisionid = 0;
     this.distid = 0;
     this.showCards = true;
     if(this.name||this.distname ==null){
       this.show=false;
     }else{
       this.show=true;
     }
     this.DashProgressCount();
     this.GETRunningWorkTotal();
     this.GETRunningWorksDivision();
     this.GETRunningWorkScheme();
     this.GETRunningWorkDistrict();
     this.GETRunningWorkContractor();
// alert(this.mainSchemeID);
// alert(selectedName);
  } else {
    alert('Selected districT_ID not found in the list.');
  }
}

initializeChartOptions() {
  this.chartOptions = {
     series: [],
     chart: {
       type: 'bar',
       stacked: false,
       // height: 'auto',
       // height:400,
       // height: 200,
       // width:500,
       events: {
         dataPointSelection: (
           event,
           chartContext,
           { dataPointIndex, seriesIndex }
         ) => {
           const selectedCategory = this.chartOptions?.xaxis?.categories?.[dataPointIndex]; // This is likely just the category name (a string)
           const selectedSeries =this.chartOptions?.series?.[seriesIndex]?.name;
           // Ensure the selectedCategory and selectedSeries are valid
           if (selectedCategory && selectedSeries) {
             const apiData = this.RunningWorkDataGTotal; // Replace with the actual data source or API response
             // Find the data in your API response that matches the selectedCategory
             const selectedData = apiData.find(
               (data) => data.name === selectedCategory
             );
             // console.log("selectedData chart1",selectedData)
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
       text: 'Running Works Summary',
       align: 'center',
       style: {
         fontSize: '14px',
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
   this.chartOptions1 = {
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
           const selectedCategory = this.chartOptions1?.xaxis?.categories?.[dataPointIndex]; // This is likely just the category name (a string)
           const selectedSeries = this.chartOptions1?.series?.[seriesIndex]?.name;
           // Ensure the selectedCategory and selectedSeries are valid
           if (selectedCategory && selectedSeries) {
             const apiData = this.RunningWorkDataDivision; // Replace with the actual data source or API response
             const selectedData = apiData.find(
               (data) => data.name === selectedCategory
             );
             // console.log("selectedData chart1",selectedData)
             if (selectedData) {
               const id = selectedData.id; // Extract the id from the matching entry
  
               // this.fetchDataBasedOnChartSelectionDivision(id, selectedSeries);
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
       text: 'Division-wise Running Works',
       align: 'center',
       style: {
         fontSize: '15px',
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
   this.chartOptions2 = {
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
           const selectedCategory = this.chartOptions2?.xaxis?.categories?.[dataPointIndex]; // This is likely just the category name (a string)
           const selectedSeries =  this.chartOptions2?.series?.[seriesIndex]?.name;
           if (selectedCategory && selectedSeries) {
             const apiData = this.RunningWorkDataScheme; // Replace with the actual data source or API response
             // Find the data in your API response that matches the selectedCategory
             const selectedData = apiData.find(
               (data) => data.name === selectedCategory
             );
             // console.log("selectedData chart1",selectedData)
             if (selectedData) {
               const id = selectedData.id; // Extract the id from the matching entry
  
               // this.fetchDataBasedOnChartSelectionScheme(id, selectedSeries);
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
       text: 'Scheme-wise Running Works',
       align: 'center',
       style: {
         fontSize: '15px',
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
   this.chartOptions3 = {
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
           const selectedCategory = this.chartOptions3?.xaxis?.categories?.[dataPointIndex]; // This is likely just the category name (a string)
           const selectedSeries =  this.chartOptions3?.series?.[seriesIndex]?.name;
           if (selectedCategory && selectedSeries) {
             const apiData = this.RunningWorkDataDistrict; // Replace with the actual data source or API response
             const selectedData = apiData.find(
               (data) => data.name === selectedCategory
             );
             // console.log("selectedData chart1",selectedData)
             if (selectedData) {
               const id = selectedData.id; // Extract the id from the matching entry
  
               // this.fetchDataBasedOnChartSelectionDistrict(id, selectedSeries);
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
       text: 'District-wise Running Works',
       align: 'center',
       style: {
         fontSize: '15px',
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
   this.chartOptions4 = {
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
           const selectedCategory = this.chartOptions4?.xaxis?.categories?.[dataPointIndex]; // This is likely just the category name (a string)
           const selectedSeries =  this.chartOptions4?.series?.[seriesIndex]?.name;
           if (selectedCategory && selectedSeries) {
             const apiData = this.RunningWorkDataContractor; // Replace with the actual data source or API response
             const selectedData = apiData.find(
               (data) => data.name === selectedCategory
             );
             // console.log("selectedData chart1",selectedData)
             if (selectedData) {
               const id = selectedData.id; // Extract the id from the matching entry
  
               // this.fetchDataBasedOnChartSelectionDistrict(id, selectedSeries);
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
       text: 'Contractor-wise Running Works',
       align: 'center',
       style: {
         fontSize: '15px',
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
//#region Get API data Running Works
GETRunningWorkTotal(): void {
  // debugger;
  this.spinner.show();
  var roleName = localStorage.getItem('roleName');
  if (roleName == 'Division') {
   this.divisionid = sessionStorage.getItem('divisionID');
  // var RPType ='Division';
   this.chartOptions.chart.height = '400px';
   this.himisDistrictid = 0;
   this.mainschemeid=0;
  } else if (roleName == 'Collector') {
   this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
  // var RPType="District";
   this.divisionid = 0;
   this.mainschemeid=0;
   this.chartOptions.chart.height = '400px';
  } else {
   this.divisionid = 0;
   this.himisDistrictid = 0;
   this.mainschemeid=0;
   this.chartOptions.chart.height = '400';
  }
  var RPType = 'GTotal';
const contractid=0;
  // ?RPType=GTotal&divisionid=0&districtid=0&mainSchemeId=0&contractid=0
  console.log("RPType=",RPType,' this.divisionid', this.divisionid,'himisDistrictid',this.himisDistrictid,'mainSchemeID',this.mainSchemeID,'contractid',contractid)
   this.api.GETRunningWorkSummary( RPType,this.divisionid,this.himisDistrictid, this.mainSchemeID ,contractid)
     .subscribe(
       (data: any) => {
         this.RunningWorkDataGTotal = data;
        //  console.log('API Response total:', this.RunningWorkDataGTotal);
         const id: string[] = [];
         const name: string[] = [];
         const totalWorks: any[] = [];
         const tvcValuecr: number[] = [];
         const paidTillcr: number[] = [];
         const grossPendingcr: number[] = [];
  
         data.forEach(
           (item: {
             name: string;
             id: any;
             totalWorks: any;
             tvcValuecr: number;
             paidTillcr: any;grossPendingcr:any
           }) => {
             id.push(item.id);
             name.push(item.name);
             totalWorks.push(item.totalWorks);
             tvcValuecr.push(item.tvcValuecr);
             paidTillcr.push(item.paidTillcr);
             grossPendingcr.push(item.grossPendingcr);
           }
         );
  
         this.chartOptions.series = [
          {
            name: 'No. of Works',
            data: totalWorks,
            color: '#eeba0b',
          },
          {
            name: 'Contract Value(in Cr)',
            data: tvcValuecr,
           color: '#6a6afd',
          },
          {
            name: 'Paid-Value(in Cr)',
            data: paidTillcr,
            color: 'rgba(93, 243, 174, 0.85)',
          },
          { name: 'Bill Generated & Unpaid Value(in Cr)', data: grossPendingcr,color:'rgba(250, 199, 161, 0.85)'},
          
           // { name: 'Works Tender Value', data: totalNormalTVC,color:'rgba(208, 156, 205, 0.85)'  },
         ];
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
  GETRunningWorksDivision(): void {
  this.spinner.show();
  var roleName = localStorage.getItem('roleName');
  if (roleName == 'Division') {
   this.divisionid = sessionStorage.getItem('divisionID');
  // var RPType ='Division';
   this.chartOptions1.chart.height = '300px';
   this.himisDistrictid = 0;
   this.mainschemeid=0;
  } else if (roleName == 'Collector') {
   this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
  // var RPType="District";
   this.divisionid = 0;
   this.mainschemeid=0;
   this.chartOptions1.chart.height = '400px';
  } else {
   this.divisionid = 0;
   this.himisDistrictid = 0;
   this.mainschemeid=0;
   this.chartOptions1.chart.height = '400';
  }
  var RPType = 'Division';
  const contractid=0;
  console.log("RPType=",RPType,' this.divisionid', this.divisionid,'himisDistrictid',this.himisDistrictid,'mainSchemeID',this.mainSchemeID,'contractid',contractid)

   this.api.GETRunningWorkSummary(RPType,this.divisionid,this.himisDistrictid,this.mainSchemeID,contractid)
     .subscribe(
       (data: any) => {
         this.RunningWorkDataDivision = data;
        //  console.log('API Response total:', this.RunningWorkDataDivision);
         const id: string[] = [];
         const name: string[] = [];
         const totalWorks: any[] = [];
         const tvcValuecr: number[] = [];
         const paidTillcr: number[] = [];
         const grossPendingcr: number[] = [];
  
         data.forEach(
           (item: {
             name: string;
             id: any;
             totalWorks: any;
             tvcValuecr: number;
             paidTillcr: any;grossPendingcr:any
           }) => {
             id.push(item.id);
             name.push(item.name);
             totalWorks.push(item.totalWorks);
             tvcValuecr.push(item.tvcValuecr);
             paidTillcr.push(item.paidTillcr);
             grossPendingcr.push(item.grossPendingcr);
           }
         );
  
         this.chartOptions1.series = [
          {
            name: 'No. of Works',
            data: totalWorks,
            color: '#eeba0b',
          },
          {
            name: 'Contract Value(in Cr)',
            data: tvcValuecr,
           color: '#6a6afd',
          },
          {
            name: 'Paid-Value(in Cr)',
            data: paidTillcr,
            color: 'rgba(93, 243, 174, 0.85)',
          },
          { name: 'Bill Generated & Unpaid Value(in Cr)', data: grossPendingcr,color:'rgba(250, 199, 161, 0.85)'},
          
         ];
         this.chartOptions1.xaxis = { categories: name };
         this.cO = this.chartOptions1;
         this.cdr.detectChanges();
  
         this.spinner.hide();
       },
       (error: any) => {
         console.error('Error fetching data', error);
       }
     );
  }
  GETRunningWorkScheme(): void {
  this.spinner.show();
  var roleName = localStorage.getItem('roleName');
  if (roleName == 'Division') {
   this.divisionid = sessionStorage.getItem('divisionID');
   this.chartOptions2.chart.height = '400px';
   this.himisDistrictid = 0;
   this.mainschemeid=0;
  } else if (roleName == 'Collector') {
   this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
   this.divisionid = 0;
   this.mainschemeid=0;
   this.chartOptions2.chart.height = '400px';
  } else {
   this.divisionid = 0;
   this.himisDistrictid = 0;
   this.mainschemeid=0;
   
   if(this.mainSchemeID == 0){
    this.chartOptions2.chart.height = '600';
   }else{
    this.chartOptions2.chart.height = '200';

   }
  }
  var RPType = 'Scheme';
  const contractid=0;
  console.log("RPType=",RPType,' this.divisionid', this.divisionid,'himisDistrictid',this.himisDistrictid,'mainSchemeID',this.mainSchemeID,'contractid',contractid)

  this.api.GETRunningWorkSummary(RPType,this.divisionid,this.himisDistrictid,this.mainSchemeID,contractid)
     .subscribe(
       (data: any) => {
         this.RunningWorkDataScheme = data;
        //  console.log('API Response total:', this.RunningWorkDataScheme);
         const id: string[] = [];
         const name: string[] = [];
         const totalWorks: any[] = [];
         const tvcValuecr: number[] = [];
         const paidTillcr: number[] = [];
         const grossPendingcr: number[] = [];
  
         data.forEach(
           (item: {
             name: string;
             id: any;
             totalWorks: any;
             tvcValuecr: number;
             paidTillcr: any;grossPendingcr:any
           }) => {
             id.push(item.id);
             name.push(item.name);
             totalWorks.push(item.totalWorks);
             tvcValuecr.push(item.tvcValuecr);
             paidTillcr.push(item.paidTillcr);
             grossPendingcr.push(item.grossPendingcr);
           }
         );
  
         this.chartOptions2.series = [
          {
            name: 'No. of Works',
            data: totalWorks,
            color: '#eeba0b',
          },
          {
            name: 'Contract Value(in Cr)',
            data: tvcValuecr,
           color: '#6a6afd',
          },
          {
            name: 'Paid-Value(in Cr)',
            data: paidTillcr,
            color: 'rgba(93, 243, 174, 0.85)',
          },
          { name: 'Bill Generated & Unpaid Value(in Cr)', data: grossPendingcr,color:'rgba(250, 199, 161, 0.85)'},
          
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
  GETRunningWorkDistrict(): void {
  this.spinner.show();
  var roleName = localStorage.getItem('roleName');
  if (roleName == 'Division') {
   this.divisionid = sessionStorage.getItem('divisionID');
  // var RPType ='Division';
   this.chartOptions3.chart.height = '400px';
   this.himisDistrictid = 0;
   this.mainschemeid=0;
  } else if (roleName == 'Collector') {
   this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
  // var RPType="District";
   this.divisionid = 0;
   this.mainschemeid=0;
   this.chartOptions3.chart.height = '400px';
  } else {
   this.divisionid = 0;
   this.himisDistrictid = 0;
   this.mainschemeid=0;
   this.chartOptions3.chart.height = '900';
  }
  var RPType = 'District';
  const contractid=0;
  console.log("RPType=",RPType,' this.divisionid', this.divisionid,'himisDistrictid',this.himisDistrictid,'mainSchemeID',this.mainSchemeID,'contractid',contractid)

  this.api.GETRunningWorkSummary(RPType,this.divisionid,this.himisDistrictid,this.mainSchemeID,contractid)
  .subscribe(
    (data: any) => {
      this.RunningWorkDataDistrict = data;
      // console.log('API Response total:', this.RunningWorkDataDistrict);
      const id: string[] = [];
      const name: string[] = [];
      const totalWorks: any[] = [];
      const tvcValuecr: number[] = [];
      const paidTillcr: number[] = [];
      const grossPendingcr: number[] = [];

      data.forEach(
        (item: {
          name: string;
          id: any;
          totalWorks: any;
          tvcValuecr: number;
          paidTillcr: any;grossPendingcr:any
        }) => {
          id.push(item.id);
          name.push(item.name);
          totalWorks.push(item.totalWorks);
          tvcValuecr.push(item.tvcValuecr);
          paidTillcr.push(item.paidTillcr);
          grossPendingcr.push(item.grossPendingcr);
        }
      );

      this.chartOptions3.series = [
        {
          name: 'No. of Works',
          data: totalWorks,
          color: '#eeba0b',
        },
        {
          name: 'Contract Value(in Cr)',
          data: tvcValuecr,
         color: '#6a6afd',
        },
        {
          name: 'Paid-Value(in Cr)',
          data: paidTillcr,
          color: 'rgba(93, 243, 174, 0.85)',
        },
        { name: 'Bill Generated & Unpaid Value(in Cr)', data: grossPendingcr,color:'rgba(250, 199, 161, 0.85)'},
   
      ];
      this.chartOptions3.xaxis = { categories: name };
      this.cO = this.chartOptions3;
      this.cdr.detectChanges();

      this.spinner.hide();
    },
    (error: any) => {
      console.error('Error fetching data', error);
    }
  );
  }
  GETRunningWorkContractor(): void {
  this.spinner.show();
  var roleName = localStorage.getItem('roleName');
  if (roleName == 'Division') {
   this.divisionid = sessionStorage.getItem('divisionID');
  // var RPType ='Division';
   this.chartOptions4.chart.height = '400px';
   this.himisDistrictid = 0;
   this.mainschemeid=0;
  } else if (roleName == 'Collector') {
   this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
  // var RPType="District";
   this.divisionid = 0;
   this.mainschemeid=0;
   this.chartOptions4.chart.height = '400px';
  } else {
   this.divisionid = 0;
   this.himisDistrictid = 0;
   this.mainschemeid=0;
   this.chartOptions4.chart.height = '900';
  }
  var RPType = 'Contractor';
  const contractid=0;
  console.log("RPType=",RPType,' this.divisionid', this.divisionid,'himisDistrictid',this.himisDistrictid,'mainSchemeID',this.mainSchemeID,'contractid',contractid)

  this.api.GETRunningWorkSummary(RPType,this.divisionid,this.himisDistrictid,this.mainSchemeID,contractid)
  .subscribe(
    (data: any) => {
      this.RunningWorkDataContractor = data;
      // console.log('API Response total:', this.RunningWorkDataContractor);
      const id: string[] = [];
      const name: string[] = [];
      const totalWorks: any[] = [];
      const tvcValuecr: number[] = [];
      const paidTillcr: number[] = [];
      const grossPendingcr: number[] = [];

      data.forEach(
        (item: {
          name: string;
          id: any;
          totalWorks: any;
          tvcValuecr: number;
          paidTillcr: any;grossPendingcr:any
        }) => {
          id.push(item.id);
          name.push(item.name);
          totalWorks.push(item.totalWorks);
          tvcValuecr.push(item.tvcValuecr);
          paidTillcr.push(item.paidTillcr);
          grossPendingcr.push(item.grossPendingcr);
        }
      );

      this.chartOptions4.series = [
        {
          name: 'No. of Works',
          data: totalWorks,
          color: '#eeba0b',
        },
        {
          name: 'Contract Value(in Cr)',
          data: tvcValuecr,
         color: '#6a6afd',
        },
        {
          name: 'Paid-Value(in Cr)',
          data: paidTillcr,
          color: 'rgba(93, 243, 174, 0.85)',
        },
        { name: 'Bill Generated & Unpaid Value(in Cr)', data: grossPendingcr,color:'rgba(250, 199, 161, 0.85)'},
     
      ];
      this.chartOptions4.xaxis = { categories: name };
      this.cO = this.chartOptions4;
      this.cdr.detectChanges();

      this.spinner.hide();
    },
    (error: any) => {
      console.error('Error fetching data', error);
    }
  );
  }
  // #endregion
}
