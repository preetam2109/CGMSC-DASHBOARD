import { CommonModule, DatePipe, NgFor, NgStyle } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import {
  ASFile,
  DashProgressCount,
  DetailProgressTinP,
  DistrictNameDME,
  TotalWorksAbstract,
  DMEProgressSummary,
  GetDistrict,
  LandIssue_RetToDeptDetatails,
  MainScheme,
  TenderInProcess,
  WORunningHandDetails,
  RunningWork,
  HandoverAbstract,
  GetHandoverDetails,
  PaidSummary,
  UnPaidSummary,
  UnPaidDetails,
  PaidDetails,
  LiveTenderdata,
  TenderDetails,
  TenderEvaluation,
  TenderEvaluationDetails,
  WOpendingScheme,
  WOpendingTotal,
  LIPendingTotal,
  WorkOrderPendingDetailsNew,
  LandIssueDetails,
  WorkOrderIssued,
  WorkGenDetails,
  TenderStatus,
} from 'src/app/Model/DashProgressCount';
import { ApiService } from 'src/app/service/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexXAxis,
  ApexYAxis,
  ApexStroke,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexFill,
  ApexLegend,
  ChartComponent,
  NgApexchartsModule,
} from 'ng-apexcharts';
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
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { DropdownModule } from 'primeng/dropdown';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-scheme-wise-details',
  standalone: true,
  imports: [
    NgFor,
    NgStyle,
    MatCardModule,
    MatIconModule,
    MatTabsModule,
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    NgApexchartsModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    ReactiveFormsModule,
    MatTableExporterModule,
    MatDialogModule,
    MatMenuModule,
    NgSelectModule,
    FormsModule,
    SelectDropDownModule,
    DropdownModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],

  templateUrl: './scheme-wise-details.component.html',
  styleUrl: './scheme-wise-details.component.css',
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
  distid: any = 0;
  // distid = 0;
  divisionid: any = 0;
  mainSchemeID = 0;
  id: any;
  buid = 1;
  selectedDistrict: any | null = null;
  name: any;
  isall: boolean = true;
  show: boolean = false;
  hide: boolean = false;
  public showCards: boolean = true; // Control card visibility
  public showDivision: boolean = true; // Control card visibility
  public showDistrict: boolean = true; // Control card visibility
  distname: any;
  // mainSchemeID:any;

  public showCardss: boolean = false; // Control card visibility
  cardOrder: string[] = [
    'Completed/Handover',
    'Running Work',
    // "Acceptance/Work Order",
    'Acceptance/Work Order Generated',
    'Land Not Alloted/Land Dispute',
    'Tender in Process',
    'To be Tender',
    'Return to Department',
  ];

  budgetOptions = [
    { buid: 0, label: 'All', value: 'All' },
    { buid: 1, label: 'Above 2 Cr', value: 'above_2_cr' },
    { buid: 2, label: '>=50 lacs & <2 cr', value: '50_lacs_to_2_cr' },
    { buid: 3, label: '>=20 lacs & <50 lacs', value: '20_lacs_to_50_lacs' },
    { buid: 4, label: 'Below 20 Lacs', value: 'below_20_lacs' },
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

  // Running Works
  RunningWorkDataGTotal: RunningWork[] = [];
  RunningWorkDataDivision: RunningWork[] = [];
  RunningWorkDataScheme: RunningWork[] = [];
  RunningWorkDataDistrict: RunningWork[] = [];
  RunningWorkDataContractor: RunningWork[] = [];
  selectedName: any;
  himisDistrictid: any;
  divid: any;
  roleName: any;
  contractorid = 0;
  dashname: any;
  nosworks: any;
  ASAmount = 1;

  dateRange!: FormGroup;
  dateRange1!: FormGroup;
  dateRange2!: FormGroup;

  // new running workr

  selectedvalue: any;
  selectedParameter: any;
  // divisionid: any;
  // himisDistrictid: any;
  mainschemeid: any;

  // Handover
  dashid = 4001;
  // divisionid: any;
  totalWorks: any;
  districtid: any;
  SWId = 0;
  fromdt: any;
  todt: any;
  fromdt1: any;
  todt1: any;
  fromdt3: any;
  todt3: any;
  @ViewChild('sortHandover') sortHandover!: MatSort;
  @ViewChild('paginatorHandover') paginatorHandover!: MatPaginator;
  @ViewChild('itemDetailsModalHandover') itemDetailsModalHandover: any;
  dataSourceHanover!: MatTableDataSource<GetHandoverDetails>;
  chartHandover!: ChartOptions;
  chartHandover1!: ChartOptions;
  chartHandover2!: ChartOptions;
  chartHandover3!: ChartOptions;
  // chartHandover4!: ChartOptions;
  dispatchDataHandover: GetHandoverDetails[] = [];
  HandoverAbstractTotalData: HandoverAbstract[] = [];
  HandoverAbstractSchemeData: HandoverAbstract[] = [];
  HandoverAbstractDistrictData: HandoverAbstract[] = [];
  HandoverAbstractWorkTypeData: HandoverAbstract[] = [];
  // unpaid
  chartUnPaid!: ChartOptions; // For bar chart
  chartUnPaid1!: ChartOptions; // For bar charta
  chartUnPaid2!: ChartOptions; // For line chart
  chartUnPaid3!: ChartOptions; // For line chart

  chartPaid!: ChartOptions; // For bar chart
  chartPaid1!: ChartOptions; // For bar charta
  chartPaid2!: ChartOptions; // For line chart
  chartPaid3!: ChartOptions; // For line chart
  dataSourcePaid!: MatTableDataSource<PaidDetails>;
  dataSourceUnPaid!: MatTableDataSource<UnPaidDetails>;

  @ViewChild('sortUnPaid') sortUnPaid!: MatSort;
  @ViewChild('paginatorUnPaid') paginatorUnPaid!: MatPaginator;
  @ViewChild('itemDetailsModalUnPaid') itemDetailsModalUnPaid: any;
  @ViewChild('sortPaid') sortPaid!: MatSort;
  @ViewChild('paginatorPaid') paginatorPaid!: MatPaginator;
  @ViewChild('itemDetailsModalPaid') itemDetailsModalPaid: any;
  dispatchDataPaid: PaidDetails[] = [];
  dispatchDataUnPaid: UnPaidDetails[] = [];

  PaidSummaryTotal: PaidSummary[] = [];
  PaidSummaryDivision: PaidSummary[] = [];
  PaidSummaryScheme: PaidSummary[] = [];
  PaidSummaryDistrict: PaidSummary[] = [];

  UnPaidSummaryTotal: UnPaidSummary[] = [];
  UnPaidSummaryDivision: UnPaidSummary[] = [];
  UnPaidSummaryScheme: UnPaidSummary[] = [];
  UnPaidSummaryDesignation: UnPaidSummary[] = [];

  // Live Tender
  dataSourceLiveTender!: MatTableDataSource<TenderDetails>;
  @ViewChild('paginatorLivet') paginatorLivet!: MatPaginator;
  @ViewChild('sortLivet') sortLivet!: MatSort;
  @ViewChild('itemDetailsModalLT') itemDetailsModalLT: any;
  dispatchDataLiveTender: TenderDetails[] = [];
  LiveTenderScheme: LiveTenderdata[] = [];
  LiveTenderDivision: LiveTenderdata[] = [];
  chartliveTenderTO!: ChartOptions; // For bar chart
  chartliveTenderDiv!: ChartOptions; // For bar chart
  // Tender Evalution
  @ViewChild('itemDetailsModalTE') itemDetailsModalTE: any;
  chartOptionsTEScheme!: ChartOptions; // For bar chart
  chartOptionsTESDivision!: ChartOptions; // For bar chart
  TenderEvaluationDivision: TenderEvaluation[] = [];
  TenderEvaluationScheme: TenderEvaluation[] = [];
  dataSourceTenderE!: MatTableDataSource<TenderEvaluationDetails>;
  dispatchDataTenderE: TenderEvaluationDetails[] = [];

  @ViewChild('paginatorTenderE') paginatorTenderE!: MatPaginator;
  @ViewChild('sortTenderE') sortTenderE!: MatSort;

  // Work order
  @ViewChild('paginatorWOP') paginatorWOP!: MatPaginator;
  @ViewChild('sortWOP') sortWOP!: MatSort;
  @ViewChild('itemDetailsModalWOP') itemDetailsModalWOP: any;
  dataSourceWorkP!: MatTableDataSource<WorkOrderPendingDetailsNew>;
  dispatchDataWOP: WorkOrderPendingDetailsNew[] = [];
  chartOptionsWOPScheme!: ChartOptions; // For bar chart
  chartOptionsWOPDivision!: ChartOptions; // For bar chart
  wOpendingDivision: WOpendingTotal[] = [];
  wOpendingScheme: WOpendingScheme[] = [];

  WoIssuedTotal: WorkOrderIssued[] = [];
  chartOptionsWOI!: ChartOptions; // For bar chart
  dataSourceWOGD!: MatTableDataSource<WorkGenDetails>;
  @ViewChild('paginatorWGD') paginatorWGD!: MatPaginator;
  @ViewChild('sortWGD') sortWGD!: MatSort;
  dispatchWOGD: WorkGenDetails[] = [];
  nosWorks: any;
  TimeStatus: any;
  visibale: boolean = false;
  noofWorksGreater7Days: any;
  // land Issued

  LIPendingTotalData: LIPendingTotal[] = [];
  LIPendingSchemeData: LIPendingTotal[] = [];
  LIPendingDistrictData: LIPendingTotal[] = [];
  dispatchPendingsLI: LandIssueDetails[] = [];
  chartOptionsLITotal!: ChartOptions; // For bar chart
  chartOptionsLIScheme!: ChartOptions; // For bar chart
  chartOptionsLIDistrict!: ChartOptions; // For bar chart
  @ViewChild('itemDetailsModalLI') itemDetailsModalLI: any;
  @ViewChild('itemDetailsModalWOGD') itemDetailsModalWOGD: any;
  dataSourceLI!: MatTableDataSource<LandIssueDetails>;
  @ViewChild('paginatorLI') paginatorLI!: MatPaginator;
  @ViewChild('sortLI') sortLI!: MatSort;
  // Tobe Tender
  chartOptionsTbetender!: ChartOptions; // For bar chart
  TobetenderGTotal: TenderStatus[] = [];
  // TobetenderProgress: TenderStatus[] = [];
  // tValues: number[] = []; // Declare tValues as a class property

  //#endregion
  constructor(
    public api: ApiService,
    public spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private fb: FormBuilder,
    public datePipe: DatePipe
  ) {
    this.dataSource = new MatTableDataSource<WORunningHandDetails>([]);
    this.dataSourceCom_Han = new MatTableDataSource<WORunningHandDetails>([]);
    this.dataSourceRun_Work = new MatTableDataSource<WORunningHandDetails>([]);
    this.dataSource1 = new MatTableDataSource<LandIssue_RetToDeptDetatails>([]);
    this.dataSourceLand_isu =
      new MatTableDataSource<LandIssue_RetToDeptDetatails>([]);
    this.dataSource2 = new MatTableDataSource<DetailProgressTinP>([]);
    this.dataSource3 = new MatTableDataSource<TenderInProcess>([]);
    this.dataSource4 = new MatTableDataSource<TotalWorksAbstract>([]);
    this.dataSourceHanover = new MatTableDataSource<GetHandoverDetails>([]);
    this.dataSourcePaid = new MatTableDataSource<PaidDetails>([]);
    this.dataSourceUnPaid = new MatTableDataSource<UnPaidDetails>([]);
    this.dataSourceLiveTender = new MatTableDataSource<TenderDetails>([]);
    this.dataSourceTenderE = new MatTableDataSource<TenderEvaluationDetails>( [] );
    this.dataSourceLI = new MatTableDataSource<LandIssueDetails>([]);
    this.dataSourceWOGD = new MatTableDataSource<WorkGenDetails>([]);
    this.dataSourceWorkP = new MatTableDataSource<WorkOrderPendingDetailsNew>([]);
  }

  ngOnInit() {
    const today = new Date();
    const firstDayOfMonthLastYear = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      1
    );

    this.dateRange = this.fb.group({
      start: [firstDayOfMonthLastYear],
      end: [today],
    });
    this.dateRange1 = this.fb.group({
      start: [firstDayOfMonthLastYear],
      end: [today],
    });
    this.dateRange2 = this.fb.group({
      start: [firstDayOfMonthLastYear],
      end: [today],
    });

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
    this.initializeChartOptionsHandover();
    this.initializeChartOptionsUnPaid();
    this.initializeChartOptionsPaid();
    this.initializeChartOptionsLiveTender();
    this.initializeChartOptionsTenderE();
    this.initializeChartOptionsWOP();
    this.initializeChartOptionsLI();
    this.initializeChartOptionsTobeTender();
    this.dateRange.valueChanges.subscribe(() => {
      this.HandoverAbstractRPTypeTotal();
      this.handoverAbstractRPTypeScheme();
      // this.handoverAbstractRPTypeDistrict();
      // this.handoverAbstractRPTypeWorkType();
    });
    this.dateRange1.valueChanges.subscribe(() => {
      // this.GETPaidSummaryTotal();
      this.GETPaidSummaryDivision();
      this.GETPaidSummaryScheme();
    });
    this.dateRange2.valueChanges.subscribe(() => {
      this.GetWOIssueTotal();
    });
  }
  //#region Scheme-Wise Work Abstract
  loadInitialData() {
    this.spinner.show();
    this.divisionid = this.divisionid == 0 ? 0 : this.divisionid;
    this.himisDistrictid = this.himisDistrictid == 0 ? 0 : this.himisDistrictid;
    // console.log('1 divisionid=', this.divisionid, 'himisDistrictid=', this.himisDistrictid, 'mainSchemeID=', this.mainSchemeID);
    var mainSchemeId = 0;
    var ASID = 0;
    var GrantID = 0;
    this.api
      .DashProgressCount(
        this.divisionid,
        mainSchemeId,
        this.himisDistrictid,
        ASID,
        GrantID,
        this.ASAmount
      )
      .subscribe(
        (res: any) => {
          console.log('res=', JSON.stringify(res));
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
        this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
        // this.himisDistrictid = this.distid;
        if (this.distid != 0) {
          this.himisDistrictid = this.distid;
          // alert(this.himisDistrictid);
        }
      }
      if (this.selectedTabIndex === 1) {
        this.himisDistrictid = 0;
      }
      // else{
      //   this.himisDistrictid =0;
      // }
      // this.distid = this.distid == 0 ? 0 : this.distid;
      var ASID = 0;
      var GrantID = 0;
      this.divisionid = this.divisionid == 0 ? 0 : this.divisionid;
      this.mainSchemeID = this.mainSchemeID == 0 ? 0 : this.mainSchemeID;
      this.himisDistrictid =
        this.himisDistrictid == 0 ? 0 : this.himisDistrictid;
      // console.error('dist id:', this.himisDistrictid  );
      // console.error('mainSchemeID:', this.mainSchemeID);
      // console.log('divisionid=', this.divisionid, 'himisDistrictid=', this.himisDistrictid, 'mainSchemeID=', this.mainSchemeID);
      // divisionId: any, mainSchemeId: number, distid: number,ASID:any,ASAmount:any
      this.api
        .DashProgressCount(
          this.divisionid,
          this.mainSchemeID,
          this.himisDistrictid,
          ASID,
          GrantID,
          this.ASAmount
        )
        .subscribe(
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
    this.divid = id;
    this.show = true;
    this.divisionid = id;
    this.distid = 0;
    this.mainSchemeID = this.mainSchemeID;
    this.name = name;
    this.selectedDistrict = id;
    if (this.selectedName == null) {
      this.hide = false;
    } else {
      this.hide = true;
    }
    this.DashProgressCount();
    // console.error('onButtonClick',this.divisionid);
  }

  sortDistrictData(data: DashProgressCount[]): DashProgressCount[] {
    return data.sort(
      (a, b) =>
        this.cardOrder.indexOf(a.dashname || '') -
        this.cardOrder.indexOf(b.dashname || '')
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
    } else if (did == 4001) {
      return '#62f562';
      // return '#008000';
    } else if (did == 5001) {
      return '#e7fa57'; //#4CAF50
      // return '#90EE90';//#4CAF50
    } else if (did == 6001) {
      return '#fa5795';
      // return '#FF0000';
    } else if (did == 7001) {
      return '#FFA500';
    } else if (did == 8001) {
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
  TotalWorksAbstract() {
    // ;
    this.spinner.show();
    this.roleName = localStorage.getItem('roleName');
    if (this.roleName == 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      this.showDivision = false;
    } else if (this.roleName == 'Collector') {
      this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
      if (this.distid != 0) {
        this.himisDistrictid = this.distid;
        // this.himisDistrictid = this.distid;
      }
    }
    // this.distid = this.distid == 0 ? 0 : this.distid;
    const contractorid = 0;
    this.divisionid = this.divisionid == 0 ? 0 : this.divisionid;
    this.mainSchemeID = this.mainSchemeID == 0 ? 0 : this.mainSchemeID;
    this.himisDistrictid = this.himisDistrictid == 0 ? 0 : this.himisDistrictid;
    // console.log('divisionid=', this.divisionid, 'himisDistrictid=', this.himisDistrictid, 'mainSchemeID=', this.mainSchemeID);
    // ?divisionid=0&districtid=0&mainschemeid=116&contractorid=0&ASAmount=1
    this.api
      .GET_TotalWorksAbstract(
        this.divisionid,
        this.himisDistrictid,
        this.mainSchemeID,
        contractorid,
        this.ASAmount
      )
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

  DetailProgress(did: any, dashname: any, nosworks: any): void {
    //
    this.dashname = dashname;
    this.nosworks = nosworks;
    this.spinner.show();
    this.roleName = localStorage.getItem('roleName');
    if (this.roleName == 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      this.showDivision = false;
    } else if (this.roleName == 'Collector') {
      this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
      if (this.distid != 0) {
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
      this.api
        .GETTobeTenderAll(
          did,
          this.divisionid,
          this.himisDistrictid,
          this.mainSchemeID,
          this.ASAmount
        )
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
      console.log('2001=: ', did);
      this.api
        .GETDetailProgress(
          did,
          this.divisionid,
          this.himisDistrictid,
          this.mainSchemeID,
          this.ASAmount
        )
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
    } else if (did == 4001) {
      console.log('4001=: ', did);
      this.api
        .GETWORunningHandDetails(
          did,
          this.divisionid,
          this.himisDistrictid,
          this.mainSchemeID,
          this.contractorid,
          this.ASAmount
        )
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
      this.api
        .GETWORunningHandDetails(
          did,
          this.divisionid,
          this.himisDistrictid,
          this.mainSchemeID,
          this.contractorid,
          this.ASAmount
        )
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
      console.log('6001 =: ', did);
      this.api
        .GETLandIssueRetToDeptDetatails(
          did,
          this.divisionid,
          this.himisDistrictid,
          this.mainSchemeID,
          this.ASAmount
        )
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
    } else if (did == 8001) {
      console.log(' 8001 =: ', did);
      this.api
        .GETLandIssueRetToDeptDetatails(
          did,
          this.divisionid,
          this.himisDistrictid,
          this.mainSchemeID,
          this.ASAmount
        )
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
      this.api
        .GETWORunningHandDetails(
          did,
          this.divisionid,
          this.himisDistrictid,
          this.mainSchemeID,
          this.contractorid,
          this.ASAmount
        )
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
  applyTextFilterretunToD(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();
    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
  }
  expor_PDFRturntoD() {
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
    const rows = this.dispatchData1.map((row) => ({
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
      head: [columns.map(col => col.title)], 
      body: rows.map(row => columns.map(col => row[col.dataKey as keyof typeof row] || '')), 
      startY: 20,
      theme: 'grid',
      styles: { fontSize: 6, cellPadding: 0.5, overflow: 'linebreak' },
      headStyles: { fillColor: [22, 160, 133], textColor: 255, fontSize: 7, fontStyle: 'bold' },
      columnStyles: {
        8: { cellWidth: 'wrap' },  
        33: { cellWidth: 'wrap' }, 
      },
      tableWidth: 'auto',
      margin: { top: 20, left: 5, right: 5 },
    
      // didDrawPage: function (data) {
      //   doc.setFontSize(8);
      //   doc.text('Land Issue Report', data.settings.margin.left, 10);
      // }
    });
    
    
        doc.save('RturnTODReport.pdf');
  }
  exportToPDF() {
    const doc = new jsPDF('l', 'mm', 'a3');
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
      {
        title: 'Amount Of Contract(In Lacs)',
        dataKey: 'totalAmountOfContract',
      },
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
      divName_En: row.divName_En,
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
      totalpaid: row.totalpaid,
      totalunpaid: row.totalunpaid,
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

    // autoTable(doc, {
    //   columns: columns,
    //   body: rows,
    //   startY: 20,
    //   theme: 'striped',
    //   headStyles: { fillColor: [22, 160, 133] },
    // });
    // autoTable(doc, {
    //   head: [columns.map(col => col.title)],
    //   body: rows.map(row => columns.map(col => row[col.dataKey as keyof typeof row] || '')),
    //   startY: 20,
    //   theme: 'grid',
    //   styles: { fontSize: 6, cellPadding: 0.5, overflow: 'linebreak' },
    //   headStyles: { fillColor: [22, 160, 133], textColor: 255, fontSize: 7, fontStyle: 'bold' },
    //   columnStyles: {
    //     8: { cellWidth: 'wrap' },
    //     33: { cellWidth: 'wrap' },
    //   },
    //   tableWidth: 'auto',
    //   margin: { top: 20, left: 5, right: 5 },
    // });
    autoTable(doc, {
      head: [columns.map((col) => col.title)],
      body: rows.map((row) =>
        columns.map((col) => row[col.dataKey as keyof typeof row])
      ),
      startY: 20,
      theme: 'grid',
      styles: { fontSize: 6, cellPadding: 0.5, overflow: 'linebreak' },
      headStyles: {
        fillColor: [22, 160, 133],
        textColor: 255,
        fontSize: 7,
        fontStyle: 'bold',
      },
      columnStyles: {
        8: { cellWidth: 'auto' }, // Adjust width for long text columns
        33: { cellWidth: 'auto' },
      },
      tableWidth: 'auto',
      margin: { top: 20, left: 5, right: 5 },
      pageBreak: 'auto', // Ensures all rows are included across multiple pages
    });
    doc.save('Acceptance_WOrderDetail.pdf');
  }
  exportToPDFCom_Han() {
    const doc = new jsPDF('l', 'mm', 'a3');
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
      {
        title: 'Amount Of Contract(In Lacs)',
        dataKey: 'totalAmountOfContract',
      },
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
      divName_En: row.divName_En,
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
      totalpaid: row.totalpaid,
      totalunpaid: row.totalunpaid,
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

    // autoTable(doc, {
    //   columns: columns,
    //   body: rows,
    //   startY: 20,
    //   theme: 'striped',
    //   headStyles: { fillColor: [22, 160, 133] },
    // });
    autoTable(doc, {
      head: [columns.map((col) => col.title)],
      body: rows.map((row) =>
        columns.map((col) => row[col.dataKey as keyof typeof row])
      ),
      startY: 20,
      theme: 'grid',
      styles: { fontSize: 6, cellPadding: 0.5, overflow: 'linebreak' },
      headStyles: {
        fillColor: [22, 160, 133],
        textColor: 255,
        fontSize: 7,
        fontStyle: 'bold',
      },
      columnStyles: {
        8: { cellWidth: 'auto' }, // Adjust width for long text columns
        33: { cellWidth: 'auto' },
      },
      tableWidth: 'auto',
      margin: { top: 20, left: 5, right: 5 },
      pageBreak: 'auto', // Ensures all rows are included across multiple pages
    });
    // autoTable(doc, {
    //   head: [columns.map(col => col.title)],
    //   body: rows.map(row => columns.map(col => row[col.dataKey as keyof typeof row] || '')),
    //   startY: 20,
    //   theme: 'grid',
    //   styles: { fontSize: 6, cellPadding: 0.5, overflow: 'linebreak' },
    //   headStyles: { fillColor: [22, 160, 133], textColor: 255, fontSize: 7, fontStyle: 'bold' },
    //   columnStyles: {
    //     // 8: { cellWidth: 'wrap' },
    //     // 33: { cellWidth: 'wrap' },
    //     0: { cellWidth: 8 },   // S.No
    //     1: { cellWidth: 15 },  // Head No
    //     2: { cellWidth: 20 },  // Head
    //     3: { cellWidth: 20 },  // Division
    //     4: { cellWidth: 18 },  // District
    //     5: { cellWidth: 18 },  // Block
    //     6: { cellWidth: 20 },  // AS Letter No
    //     7: { cellWidth: 18 },  // Approver
    //     8: { cellWidth: 30 },  // Work
    //     9: { cellWidth: 18 },  // AS Date
    //     10: { cellWidth: 18 }, // AS Amount
    //     11: { cellWidth: 18 }, // TS Date
    //     12: { cellWidth: 18 }, // TS Amount
    //     13: { cellWidth: 18 }, // Tender Type
    //     14: { cellWidth: 22 }, // NIT Reference
    //     15: { cellWidth: 22 }, // NIT/Sanction DT
    //     16: { cellWidth: 22 }, // Acceptance Letter RefNo
    //     17: { cellWidth: 18 }, // Accepted DT
    //     18: { cellWidth: 12 }, // Rate%
    //     19: { cellWidth: 22 }, // Sanction
    //     20: { cellWidth: 22 }, // Contract Amount
    //     21: { cellWidth: 22 }, // Total Paid
    //     22: { cellWidth: 22 }, // Total Unpaid
    //     23: { cellWidth: 22 }, // Work Order DT
    //     24: { cellWidth: 18 }, // Time Allowed
    //     25: { cellWidth: 22 }, // Due DT Time PerAdded
    //     26: { cellWidth: 22 }, // Work Order RefNo
    //     27: { cellWidth: 15 }, // Contractor ID/Class
    //     28: { cellWidth: 22 }, // Contractor
    //     29: { cellWidth: 18 }, // Contractor Mobile No
    //     30: { cellWidth: 15 }, // Last Progress
    //     31: { cellWidth: 18 }, // Progress DT
    //     32: { cellWidth: 18 }, // Exp.Comp DT
    //     33: { cellWidth: 30 }, // Delay Reason
    //     34: { cellWidth: 15 }, // Remarks
    //     35: { cellWidth: 15 }, // Sub Engineer
    //     36: { cellWidth: 15 }, // Asst. Eng
    //     37: { cellWidth: 15 }, // Work ID
    //     38: { cellWidth: 22 }, // AS Letter
    //   },
    //   tableWidth: 'auto',
    //   margin: { top: 20, left: 5, right: 5 },

    //   // didDrawPage: function (data) {
    //   //   doc.setFontSize(8);
    //   //   doc.text('Land Issue Report', data.settings.margin.left, 10);
    //   // }
    // });

    doc.save('Completed_Handover.pdf');
  }
  exportToPDFTW() {
    const doc = new jsPDF('l', 'mm', 'a3');

    // Define table columns
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
      {
        title: 'Amount Of Contract(In Lacs)',
        dataKey: 'totalAmountOfContract',
      },
      { title: 'Total paid(In Lacs)', dataKey: 'totalpaid' },
      { title: 'Total unpaid(In Lacs)', dataKey: 'totalunpaid' },
      { title: 'Work Order DT', dataKey: 'workOrderDT' },
      { title: 'Time Allowed', dataKey: 'timeAllowed' },
      { title: 'Due DT Time PerAdded', dataKey: 'dueDTTimePerAdded' },
      { title: 'Work Order RefNo', dataKey: 'agreementRefNo' },
      { title: 'Contractor ID/Class', dataKey: 'cid' },
      { title: 'Contractor', dataKey: 'contractorName' },
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

    // Format data rows
    const rows = this.dispatchData4.map((row) => ({
      sno: row.sno,
      grantNo: row.grantNo,
      head: row.head,
      divName_En: row.divName_En,
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
      totalpaid: row.totalpaid,
      totalunpaid: row.totalunpaid,
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

    // Generate table in PDF
    autoTable(doc, {
      head: [columns.map((col) => col.title)],
      body: rows.map((row) =>
        columns.map((col) => row[col.dataKey as keyof typeof row] || '')
      ),
      startY: 20,
      theme: 'grid',
      headStyles: {
        fillColor: [44, 62, 80],
        textColor: 255,
        fontSize: 7,
        fontStyle: 'bold',
      },
      styles: {
        textColor: [0, 0, 0],
        fontSize: 6,
        cellPadding: 0.5,
        overflow: 'linebreak',
      },
      columnStyles: {
        0: { cellWidth: 8 }, // S.No
        1: { cellWidth: 15 }, // Head No
        2: { cellWidth: 20 }, // Head
        3: { cellWidth: 20 }, // Division
        4: { cellWidth: 18 }, // District
        5: { cellWidth: 18 }, // Block
        6: { cellWidth: 20 }, // AS Letter No
        7: { cellWidth: 18 }, // Approver
        8: { cellWidth: 30 }, // Work
        9: { cellWidth: 18 }, // AS Date
        10: { cellWidth: 18 }, // AS Amount
        11: { cellWidth: 18 }, // TS Date
        12: { cellWidth: 18 }, // TS Amount
        13: { cellWidth: 18 }, // Tender Type
        14: { cellWidth: 22 }, // NIT Reference
        15: { cellWidth: 22 }, // NIT/Sanction DT
        16: { cellWidth: 22 }, // Acceptance Letter RefNo
        17: { cellWidth: 18 }, // Accepted DT
        18: { cellWidth: 12 }, // Rate%
        19: { cellWidth: 22 }, // Sanction
        20: { cellWidth: 22 }, // Contract Amount
        21: { cellWidth: 22 }, // Total Paid
        22: { cellWidth: 22 }, // Total Unpaid
        23: { cellWidth: 22 }, // Work Order DT
        24: { cellWidth: 18 }, // Time Allowed
        25: { cellWidth: 22 }, // Due DT Time PerAdded
        26: { cellWidth: 22 }, // Work Order RefNo
        27: { cellWidth: 15 }, // Contractor ID/Class
        28: { cellWidth: 22 }, // Contractor
        29: { cellWidth: 18 }, // Contractor Mobile No
        30: { cellWidth: 15 }, // Last Progress
        31: { cellWidth: 18 }, // Progress DT
        32: { cellWidth: 18 }, // Exp.Comp DT
        33: { cellWidth: 30 }, // Delay Reason
        34: { cellWidth: 15 }, // Remarks
        35: { cellWidth: 15 }, // Sub Engineer
        36: { cellWidth: 15 }, // Asst. Eng
        37: { cellWidth: 15 }, // Work ID
        38: { cellWidth: 22 }, // AS Letter
        // 8: { cellWidth: 'wrap' },  // Adjust width for long text columns
        // 33: { cellWidth: 'wrap' }
      },
      tableWidth: 'wrap',
      margin: { top: 20, left: 2, right: 2 },
      pageBreak: 'auto',
    });

    doc.save('WorksAbstractD.pdf');
  }

  exportToPDFRun_Work() {
    const doc = new jsPDF('l', 'mm', 'a3');
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
      {
        title: 'Amount Of Contract(In Lacs)',
        dataKey: 'totalAmountOfContract',
      },
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
      divName_En: row.divName_En,
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
      totalpaid: row.totalpaid,
      totalunpaid: row.totalunpaid,
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

    // autoTable(doc, {
    //   columns: columns,
    //   body: rows,
    //   startY: 20,
    //   theme: 'striped',
    //   headStyles: { fillColor: [22, 160, 133] },
    // });
    autoTable(doc, {
      head: [columns.map((col) => col.title)],
      body: rows.map((row) =>
        columns.map((col) => row[col.dataKey as keyof typeof row] || '')
      ),
      startY: 20,
      theme: 'grid',
      styles: { fontSize: 6, cellPadding: 0.5, overflow: 'linebreak' },
      headStyles: {
        fillColor: [22, 160, 133],
        textColor: 255,
        fontSize: 7,
        fontStyle: 'bold',
      },
      columnStyles: {
        8: { cellWidth: 'wrap' },
        33: { cellWidth: 'wrap' },
      },
      tableWidth: 'auto',
      margin: { top: 20, left: 5, right: 5 },
    });
    doc.save('Running_Work.pdf');
  }
  exportobeTenderAll_PDFT() {
    const doc = new jsPDF('l', 'mm', 'a3');
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
      divName_En: row.divName_En,
      district: row.district,
      blockname: row.blockname,
      letterNo: row.letterNo,
      grantNo: row.grantNo,
      head: row.head,
      approver: row.approver,
      type_name: row.type_name,
      work: row.work,
      asAmt: row.asAmt,
      totalpaid: row.totalpaid,
      totalunpaid: row.totalunpaid,
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

    // autoTable(doc, {
    //   columns: columns,
    //   body: rows,
    //   startY: 20,
    //   theme: 'striped',
    //   headStyles: { fillColor: [22, 160, 133] },
    // });
    autoTable(doc, {
      head: [columns.map((col) => col.title)],
      body: rows.map((row) =>
        columns.map((col) => row[col.dataKey as keyof typeof row] || '')
      ),
      startY: 20,
      theme: 'grid',
      styles: { fontSize: 6, cellPadding: 0.5, overflow: 'linebreak' },
      headStyles: {
        fillColor: [22, 160, 133],
        textColor: 255,
        fontSize: 7,
        fontStyle: 'bold',
      },
      columnStyles: {
        8: { cellWidth: 'wrap' },
        33: { cellWidth: 'wrap' },
      },
      tableWidth: 'auto',
      margin: { top: 20, left: 5, right: 5 },
    });
    doc.save('DetailProgress.pdf');
  }
  expor_TenderInProcess_PDFT() {
    const doc = new jsPDF('l', 'mm', 'a3');
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
      sno: row.sno,
      grantNo: row.grantNo,
      head: row.head,
      divName_En: row.divName_En,
      district: row.district,
      blockname: row.blockname,
      letterNo: row.letterNo,
      approver: row.approver,
      work: row.work,
      // type_name: row.type_name,
      aadt: row.aadt,
      asAmt: row.asAmt,
      totalpaid: row.totalpaid,
      totalunpaid: row.totalunpaid,
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

    // autoTable(doc, {
    //   columns: columns,
    //   body: rows,
    //   startY: 20,
    //   theme: 'striped',
    //   headStyles: { fillColor: [22, 160, 133] },
    // });
    autoTable(doc, {
      head: [columns.map((col) => col.title)],
      body: rows.map((row) =>
        columns.map((col) => row[col.dataKey as keyof typeof row] || '')
      ),
      startY: 20,
      theme: 'grid',
      styles: { fontSize: 6, cellPadding: 0.5, overflow: 'linebreak' },
      headStyles: {
        fillColor: [22, 160, 133],
        textColor: 255,
        fontSize: 7,
        fontStyle: 'bold',
      },
      columnStyles: {
        8: { cellWidth: 'wrap' },
        33: { cellWidth: 'wrap' },
      },
      tableWidth: 'auto',
      margin: { top: 20, left: 5, right: 5 },
    });
    doc.save('TenderInProcess_Detail.pdf');
  }
  expor_PDFLand_isu() {
    const doc = new jsPDF('l', 'mm', 'a3'); // Landscape orientation for better width allocation

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
      { title: 'AS Amount (Lacs)', dataKey: 'asAmt' },
      { title: 'TS Date', dataKey: 'tsDate' },
      { title: 'TS Amount (Lacs)', dataKey: 'tsamt' },
      { title: 'Tender Type', dataKey: 'tType' },
      { title: 'NIT Reference', dataKey: 'tenderReference' },
      { title: 'NIT/Sanction DT', dataKey: 'dateOfIssueNIT' },
      { title: 'Acceptance Letter RefNo', dataKey: 'acceptanceLetterRefNo' },
      { title: 'Accepted DT', dataKey: 'acceptLetterDT' },
      { title: 'Rate%', dataKey: 'sanctionRate' },
      { title: 'Sanction', dataKey: 'sanctionDetail' },
      { title: 'Contract Amount (Lacs)', dataKey: 'totalAmountOfContract' },
      { title: 'Total Paid (Lacs)', dataKey: 'totalpaid' },
      { title: 'Total Unpaid (Lacs)', dataKey: 'totalunpaid' },
      { title: 'Work Order DT', dataKey: 'wrokOrderDT' }, // (Consider renaming in data)
      { title: 'Time Allowed', dataKey: 'timeAllowed' },
      { title: 'Due DT Time PerAdded', dataKey: 'dueDTTimePerAdded' },
      { title: 'Work Order RefNo', dataKey: 'agreementRefNo' },
      { title: 'Contractor ID/Class', dataKey: 'cid' },
      { title: 'Contractor', dataKey: 'contractorNAme' },
      { title: 'Contractor Mobile No', dataKey: 'mobNo' },
      { title: 'Last Progress', dataKey: 'lProgress' },
      { title: 'Progress DT', dataKey: 'progressDT' },
      { title: 'Exp. Comp DT', dataKey: 'expcompdt' },
      { title: 'Delay Reason', dataKey: 'delayreason' },
      { title: 'Sub Engineer', dataKey: 'subengname' },
      { title: 'Asst. Eng', dataKey: 'aeName' },
      { title: 'Work ID', dataKey: 'work_id' },
      { title: 'AS Letter', dataKey: 'asLetter' },
    ];

    // Assuming 'landIssueData' holds the array of objects with the required data
    const rows = this.dispatchDataLand_isu.map((row) => ({
      sno: row.sno,
      grantNo: row.grantNo,
      head: row.head,
      divName_En: row.divName_En,
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
      totalpaid: row.totalpaid,
      totalunpaid: row.totalunpaid,
      wrokOrderDT: row.wrokOrderDT, // (Consider fixing typo in your data)
      timeAllowed: row.timeAllowed,
      dueDTTimePerAdded: row.dueDTTimePerAdded,
      agreementRefNo: row.agreementRefNo,
      cid: row.cid,
      contractorNAme: row.contractorNAme, // Possible typo in data field
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

    // autoTable(doc, {
    //   head: [columns.map(col => col.title)], // Table headers
    //   body: rows.map(row => columns.map(col => row[col.dataKey as keyof typeof row] || '')), // Table rows
    //   startY: 20,
    //   theme: 'grid',
    //   headStyles: { fillColor: [22, 160, 133], textColor: 255, fontSize: 10, fontStyle: 'bold' },
    //   styles: { textColor: [0, 0, 0], fontSize: 8, cellPadding: 1, overflow: 'linebreak' },
    //   columnStyles: {
    //     0: { cellWidth: 10 },  // S.No
    //     1: { cellWidth: 20 },  // Head No
    //     2: { cellWidth: 25 },  // Head
    //     3: { cellWidth: 25 },  // Division
    //     4: { cellWidth: 25 },  // District
    //     5: { cellWidth: 25 },  // Block
    //     6: { cellWidth: 25 },  // AS Letter No
    //     7: { cellWidth: 20 },  // Approver
    //     8: { cellWidth: 40 },  // Work (Long Text)
    //     9: { cellWidth: 20 },  // AS Date
    //     10: { cellWidth: 20 }, // AS Amount
    //     11: { cellWidth: 20 }, // TS Date
    //     12: { cellWidth: 20 }, // TS Amount
    //     13: { cellWidth: 20 }, // Tender Type
    //     14: { cellWidth: 30 }, // NIT Reference
    //     15: { cellWidth: 30 }, // NIT/Sanction DT
    //     16: { cellWidth: 30 }, // Acceptance Letter RefNo
    //     17: { cellWidth: 20 }, // Accepted DT
    //     18: { cellWidth: 15 }, // Rate%
    //     19: { cellWidth: 30 }, // Sanction
    //     20: { cellWidth: 30 }, // Amount Of Contract
    //     21: { cellWidth: 30 }, // Total Paid
    //     22: { cellWidth: 30 }, // Total Unpaid
    //     23: { cellWidth: 30 }, // Work Order DT
    //     24: { cellWidth: 20 }, // Time Allowed
    //     25: { cellWidth: 30 }, // Due DT Time PerAdded
    //     26: { cellWidth: 30 }, // Work Order RefNo
    //     27: { cellWidth: 20 }, // Contractor ID/Class
    //     28: { cellWidth: 30 }, // Contractor
    //     29: { cellWidth: 20 }, // Contractor Mobile No
    //     30: { cellWidth: 20 }, // Last Progress
    //     31: { cellWidth: 20 }, // Progress DT
    //     32: { cellWidth: 20 }, // Exp.Comp DT
    //     33: { cellWidth: 40 }, // Delay Reason
    //     34: { cellWidth: 20 }, // Sub Engineer
    //     35: { cellWidth: 20 }, // Asst. Eng
    //     36: { cellWidth: 20 }, // Work ID
    //     37: { cellWidth: 30 }, // AS Letter
    //   },
    //   tableWidth: 'wrap', // Auto fit table width
    //   margin: { top: 20, left: 5, right: 5 },

    //   // didDrawPage: function (data) {
    //   //   ;
    //   //   doc.setFontSize(8);
    //   //   doc.text('Land Issue Report', data.settings.margin.left, 10);
    //   // }
    // });

    autoTable(doc, {
      head: [columns.map((col) => col.title)],
      body: rows.map((row) =>
        columns.map((col) => row[col.dataKey as keyof typeof row] || '')
      ),
      startY: 20,
      theme: 'grid',
      styles: { fontSize: 6, cellPadding: 0.5, overflow: 'linebreak' },
      headStyles: {
        fillColor: [22, 160, 133],
        textColor: 255,
        fontSize: 7,
        fontStyle: 'bold',
      },
      columnStyles: {
        8: { cellWidth: 'wrap' },
        33: { cellWidth: 'wrap' },
      },
      tableWidth: 'auto',
      margin: { top: 20, left: 5, right: 5 },

      // didDrawPage: function (data) {
      //   doc.setFontSize(8);
      //   doc.text('Land Issue Report', data.settings.margin.left, 10);
      // }
    });

    doc.save('LandIssueReport.pdf');
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
  //#endregion

  getmain_scheme() {
    try {
      //
      this.api.getMainScheme(this.isall).subscribe((res: any) => {
        if (res && res.length > 0) {
          this.mainscheme = res.map(
            (item: { mainSchemeID: any; name: any }) => ({
              mainSchemeID: item.mainSchemeID, // Adjust key names if needed
              name: item.name,
            })
          );
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

  onselect_databudgetOptions(event: Event): void {
    // this.ASAmount=event.buid

    // alert( this.ASAmount);
    const selectedUser = this.budgetOptions.find(
      (user: { buid: any }) => user.buid === this.buid
    );
    if (selectedUser) {
      this.ASAmount = selectedUser?.buid;
      this.DashProgressCount();

      // alert( this.ASAmount);
    } else {
      alert('Selected budget_ID not found in the list.');
    }
  }

  onselect_mainscheme_data(event: Event): void {
    // console.log('event',event);
    const selectedUser = this.mainscheme.find(
      (user: { mainSchemeID: any }) => user.mainSchemeID === this.mainSchemeID
    );

    if (selectedUser) {
      //  const MID  =selectedUser.mainSchemeID || null;
      this.mainSchemeID = selectedUser?.mainSchemeID;
      this.visibale = true;
      this.hide = true;
      const selectedName = selectedUser?.name;
      this.selectedName = selectedName;
      // console.log('selectedName',selectedName);
      //  this.mainSchemeID = mainSchemeID;
      // this.divisionid = 0;
      this.distid = 0;
      this.showCards = true;
      if (this.name || this.distname == null) {
        this.show = false;
      } else {
        this.show = true;
      }
      // this.GETRunningWorkTotal();

      // this.GETRunningWorkDistrict();
      // this.GETRunningWorkContractor();
      // alert(this.mainSchemeID);
      // alert(selectedName);
      // this.GETUnPaidSummaryTotal();

      // this.GETPaidSummaryTotal();

      // this.GetWOPendingScheme();

      if (this.mainSchemeID != null) {
        this.DashProgressCount();

        this.GETRunningWorksDivision();
        this.GETRunningWorkScheme();
        this.HandoverAbstractRPTypeTotal();
        this.handoverAbstractRPTypeScheme();
        this.GetWOPendingTotal();
        this.GETPaidSummaryDivision();
        this.GETPaidSummaryScheme();
        this.GETUnPaidSummaryDivision();
        this.GETUnPaidSummaryScheme();
        this.GETLiveTenderScheme();
        this.GETLiveTenderDivision();
        this.GETTenderEvaluationScheme();
        this.GETTenderEvaluationDivision();
        this.GetWOIssueTotal();
        this.LIPendingTotal();
        this.LOPendingDistrict();
        this.TenderStatusTotal();
        // chart  method
        this.initializeChartOptionsLI();
        this.initializeChartOptionsWOP();
        this.initializeChartOptionsTobeTender();
      }

      // this.
    } else {
      alert('Selected districT_ID not found in the list.');
    }
  }

  //#region Get API data Running Works
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
            const selectedCategory =
              this.chartOptions?.xaxis?.categories?.[dataPointIndex]; // This is likely just the category name (a string)
            const selectedSeries =
              this.chartOptions?.series?.[seriesIndex]?.name;
            // Ensure the selectedCategory and selectedSeries are valid
            if (selectedCategory && selectedSeries) {
              const apiData = this.RunningWorkDataScheme; // Replace with the actual data source or API response
              // const apiData = this.RunningWorkDataGTotal; // Replace with the actual data source or API response
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
          columnWidth: '40%',
          borderRadius: 5,
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
        width: 5,
        // colors: ['#000'],
        colors: ['#fff'],
      },
      title: {
        // text: 'Running Works Summary',
        // text: 'Scheme-wise Running Works',
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
            const selectedCategory =
              this.chartOptions1?.xaxis?.categories?.[dataPointIndex]; // This is likely just the category name (a string)
            const selectedSeries =
              this.chartOptions1?.series?.[seriesIndex]?.name;
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
        // text: 'Division-wise Running Works',
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
 
  GETRunningWorksDivision(): void {
    this.spinner.show();
    var roleName = localStorage.getItem('roleName');
    if (roleName == 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      // var RPType ='Division';
      this.chartOptions1.chart.height = '300px';
      this.himisDistrictid = 0;
      this.mainschemeid = 0;
    } else if (roleName == 'Collector') {
      this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
      // var RPType="District";
      this.divisionid = 0;
      this.mainschemeid = 0;
      this.chartOptions1.chart.height = '400px';
    } else {
      this.divisionid = 0;
      this.himisDistrictid = 0;
      this.mainschemeid = 0;
      this.chartOptions1.chart.height = '400';
    }
    var RPType = 'Division';
    const contractid = 0;
    console.log(
      'RPType=',
      RPType,
      ' this.divisionid',
      this.divisionid,
      'himisDistrictid',
      this.himisDistrictid,
      'mainSchemeID',
      this.mainSchemeID,
      'contractid',
      contractid
    );

    this.api
      .GETRunningWorkSummary(
        RPType,
        this.divisionid,
        this.himisDistrictid,
        this.mainSchemeID,
        contractid
      )
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
              paidTillcr: any;
              grossPendingcr: any;
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
            {
              name: 'Bill Generated & Unpaid Value(in Cr)',
              data: grossPendingcr,
              color: 'rgba(250, 199, 161, 0.85)',
            },
          ];
          this.chartOptions1.xaxis = { categories: name };
          this.chartOptions1.title = {
            text: `Division-wise Running Works: ${this.selectedName}`,
            align: 'center',
            style: {
              fontSize: '12px',
              // color: '#000'
              color: '#6e0d25',
            },
          };
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
      this.chartOptions.chart.height = '400';
      this.himisDistrictid = 0;
      this.mainschemeid = 0;
    } else if (roleName == 'Collector') {
      this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
      this.divisionid = 0;
      this.mainschemeid = 0;
      this.chartOptions.chart.height = '400';
    } else {
      this.divisionid = 0;
      this.himisDistrictid = 0;
      this.mainschemeid = 0;

      if (this.mainSchemeID == 0) {
        this.chartOptions.chart.height = '600';
      } else {
        this.chartOptions.chart.height = '400';
      }
    }
    var RPType = 'Scheme';
    const contractid = 0;
    console.log(
      'RPType=',
      RPType,
      ' this.divisionid',
      this.divisionid,
      'himisDistrictid',
      this.himisDistrictid,
      'mainSchemeID',
      this.mainSchemeID,
      'contractid',
      contractid
    );

    this.api
      .GETRunningWorkSummary(
        RPType,
        this.divisionid,
        this.himisDistrictid,
        this.mainSchemeID,
        contractid
      )
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
              paidTillcr: any;
              grossPendingcr: any;
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
            {
              name: 'Bill Generated & Unpaid Value(in Cr)',
              data: grossPendingcr,
              color: 'rgba(250, 199, 161, 0.85)',
            },
          ];
          this.chartOptions.xaxis = { categories: name };
          this.chartOptions.title = {
            text: `Total Running Works: ${this.selectedName}`,
            align: 'center',
            style: {
              fontSize: '12px',
              // color: '#000'
              color: '#6e0d25',
            },
          };
          this.cO = this.chartOptions;
          this.cdr.detectChanges();

          this.spinner.hide();
        },
        (error: any) => {
          console.error('Error fetching data', error);
        }
      );
  }

  // #endregion
  // #region Get API data for Handover
  initializeChartOptionsHandover() {
    this.chartHandover1 = {
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
            const selectedCategory =
              this.chartHandover1?.xaxis?.categories?.[dataPointIndex]; // This is likely just the category name (a string)
            const selectedSeries =
              this.chartHandover1?.series?.[seriesIndex]?.name;
            // Ensure the selectedCategory and selectedSeries are valid
            if (selectedCategory && selectedSeries) {
              const apiData = this.HandoverAbstractSchemeData;
              const selectedData = apiData.find(
                (data) => data.name === selectedCategory
              );
              // console.log("selectedData chart1",selectedData)
              if (selectedData) {
                const id = selectedData.id; // Extract the id from the matching entry
                this.name = selectedData.name;
                this.totalWorks = selectedData.totalWorks;
                this.fetchDataBasedOnChartSelectionScheme(id, selectedSeries);
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
          columnWidth: '20%',
          borderRadius: 5,
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
        width: 5,
        // colors: ['#000'],
        colors: ['#fff'],
      },
      title: {
        // text: 'Scheme  Wise Handover',
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
    this.chartHandover = {
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
            const selectedCategory =
              this.chartHandover?.xaxis?.categories?.[dataPointIndex]; // This is likely just the category name (a string)
            const selectedSeries =
              this.chartHandover?.series?.[seriesIndex]?.name;
            // Ensure the selectedCategory and selectedSeries are valid
            if (selectedCategory && selectedSeries) {
              const apiData = this.HandoverAbstractTotalData; // Replace with the actual data source or API response
              // Find the data in your API response that matches the selectedCategory
              const selectedData = apiData.find(
                (data) => data.name === selectedCategory
              );
              // console.log("selectedData chart1",selectedData)
              if (selectedData) {
                const id = selectedData.id; // Extract the id from the matching entry
                this.name = selectedData.name;
                this.totalWorks = selectedData.totalWorks;

                this.fetchDataBasedOnChartSelection(id, selectedSeries);
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
        // text: 'Total Handover',
        // text: 'Division wise Handover',
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
    this.fromdt = startDate
      ? this.datePipe.transform(startDate, 'dd-MMM-yyyy')
      : '';
    this.todt = endDate ? this.datePipe.transform(endDate, 'dd-MMM-yyyy') : '';
    // if (roleName == 'Division') {
    //   this.chartOptions.chart.height = '300px';
    // } else {
    //   this.chartOptions.chart.height = '400';
    // }

    // alert( roleName )
    if (roleName == 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      this.chartHandover.chart.height = '400px';
      this.districtid = 0;
    } else if (roleName == 'Collector') {
      this.districtid = sessionStorage.getItem('himisDistrictid');
      this.chartHandover.chart.height = '400px';

      this.divisionid = 0;
    } else {
      this.districtid = 0;
      this.divisionid = 0;
      this.chartHandover.chart.height = '400';
    }
    var RPType = 'Total';
    // RPType=Total/Scheme/District/WorkType
    if (this.fromdt && this.todt) {
      this.api
        .HandoverAbstract(
          RPType,
          this.dashid,
          this.divisionid,
          this.districtid,
          this.SWId,
          this.fromdt,
          this.todt,
          this.mainSchemeID
        )
        .subscribe(
          (data: any) => {
            this.HandoverAbstractTotalData = data;
            // console.log('HandoverAbstractTotalData', this.HandoverAbstractTotalData);

            const id: string[] = [];
            const name: string[] = [];
            const totalWorks: any[] = [];
            const tvcValuecr: number[] = [];
            const avgMonthTaken: any[] = [];
            // console.log('API Response total:', data);
            data.forEach(
              (item: {
                name: string;
                id: any;
                totalWorks: any;
                tvcValuecr: number;
                avgMonthTaken: any;
              }) => {
                id.push(item.id);
                name.push(item.name);
                totalWorks.push(item.totalWorks);
                tvcValuecr.push(item.tvcValuecr);
                avgMonthTaken.push(item.avgMonthTaken);

                // console.log('name:', item.name, 'id:', item.id);
                if (item.name && item.id) {
                } else {
                  console.warn(
                    'Missing whid for handover Abstract :',
                    item.name
                  );
                }
              }
            );

            this.chartHandover.series = [
              { name: 'Nos of Works', data: totalWorks, color: '#eeba0b' },
              { name: 'Contract Value (in cr)', data: tvcValuecr },
              // { name: 'Avg Month Taken', data: avgMonthTaken, color: '#3afce6' },];
              // {
              //   name: 'Avg Month Taken',
              //   data: avgMonthTaken,
              //   color: 'rgb(0, 143, 251)',
              // },
            ];

            this.chartHandover.xaxis = { categories: name };
            this.chartHandover.title = {
              text: `Division-wise Handover: ${this.selectedName}`,
              align: 'center',
              style: {
                fontSize: '12px',
                // color: '#000'
                color: '#6e0d25',
              },
            };
            this.cO = this.chartHandover;
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
      this.chartHandover1.chart.height = '400';
      this.districtid = 0;
    } else if (roleName == 'Collector') {
      this.districtid = sessionStorage.getItem('himisDistrictid');
      this.chartHandover1.chart.height = '400';
      this.divisionid = 0;
    } else {
      this.districtid = 0;
      this.divisionid = 0;
      this.chartHandover1.chart.height = '400';
    }
    // this.divisionid = roleName === 'Division' ? sessionStorage.getItem('divisionID') : 0;
    // https://cgmsc.gov.in/HIMIS_APIN/api/Handover/HandoverAbstract?RPType=Total&dashid=4001&
    // divisionid=0&districtid=0&SWId=0&fromdt=01-04-2023&todt=0&mainSchemeId=142
    var RPType = 'Scheme';
    if (this.fromdt && this.todt) {
      this.api
        .HandoverAbstract(
          RPType,
          this.dashid,
          this.divisionid,
          this.districtid,
          this.SWId,
          this.fromdt,
          this.todt,
          this.mainSchemeID
        )
        .subscribe(
          (data: any) => {
            this.HandoverAbstractSchemeData = data;
            // console.log('HandoverAbstractSchemeData', this.HandoverAbstractSchemeData);
            const id: string[] = [];
            const name: string[] = [];
            const totalWorks: any[] = [];
            const tvcValuecr: number[] = [];
            const avgMonthTaken: any[] = [];
            // console.log('API Response total:', data);
            data.forEach(
              (item: {
                name: string;
                id: any;
                totalWorks: any;
                tvcValuecr: number;
                avgMonthTaken: any;
              }) => {
                id.push(item.id);
                name.push(item.name);
                totalWorks.push(item.totalWorks);
                tvcValuecr.push(item.tvcValuecr);
                avgMonthTaken.push(item.avgMonthTaken);

                // console.log('name:', item.name, 'id:', item.id);
                if (item.name && item.id) {
                } else {
                  console.warn(
                    'Missing whid for handover Abstract :',
                    item.name
                  );
                }
              }
            );

            this.chartHandover1.series = [
              // { name: 'Total Works', data: totalWorks, color: '#eeba0b' },
              // { name: 'TVC Value cr', data: tvcValuecr },
              // { name: 'AVG Month Taken', data: avgMonthTaken, color: 'rgb(0, 143, 251)' },];
              { name: 'Nos of Works', data: totalWorks, color: '#eeba0b' },
              { name: 'Contract Value (in cr)', data: tvcValuecr },
              // {
              //   name: 'Avg Month Taken',
              //   data: avgMonthTaken,
              //   color: 'rgb(0, 143, 251)',
              // },
            ];

            this.chartHandover1.xaxis = { categories: name };
            this.chartHandover1.title = {
              text: `Total Handover: ${this.selectedName}`,
              align: 'center',
              style: {
                fontSize: '12px',
                // color: '#000'
                color: '#6e0d25',
              },
            };
            this.cO = this.chartHandover1;
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
      this.chartHandover2.chart.height = '600px';
      this.districtid = 0;
    } else if (roleName == 'Collector') {
      this.districtid = sessionStorage.getItem('himisDistrictid');
      this.chartHandover2.chart.height = '300px';
      this.divisionid = 0;
    } else {
      this.districtid = 0;
      this.divisionid = 0;
      this.chartHandover2.chart.height = '1500';
    }
    // this.divisionid = roleName === 'Division' ? sessionStorage.getItem('divisionID') : 0;
    var RPType = 'District';
    if (this.fromdt && this.todt) {
      this.api
        .HandoverAbstract(
          RPType,
          this.dashid,
          this.divisionid,
          this.districtid,
          this.SWId,
          this.fromdt,
          this.todt,
          this.mainSchemeID
        )
        .subscribe(
          (data: any) => {
            this.HandoverAbstractDistrictData = data;
            console.log(
              'HandoverAbstractSchemeData',
              this.HandoverAbstractDistrictData
            );
            const id: string[] = [];
            const name: string[] = [];
            const totalWorks: any[] = [];
            const tvcValuecr: number[] = [];
            const avgMonthTaken: any[] = [];
            // console.log('API Response total:', data);
            data.forEach(
              (item: {
                name: string;
                id: any;
                totalWorks: any;
                tvcValuecr: number;
                avgMonthTaken: any;
              }) => {
                id.push(item.id);
                name.push(item.name);
                totalWorks.push(item.totalWorks);
                tvcValuecr.push(item.tvcValuecr);
                avgMonthTaken.push(item.avgMonthTaken);

                // console.log('name:', item.name, 'id:', item.id);
                if (item.name && item.id) {
                } else {
                  console.warn(
                    'Missing whid for handover Abstract :',
                    item.name
                  );
                }
              }
            );

            this.chartHandover2.series = [
              // { name: 'Total Works', data: totalWorks, color: '#eeba0b' },
              // { name: 'TVC Value cr', data: tvcValuecr },
              // { name: 'AVG Month Taken', data: avgMonthTaken, color: 'rgb(0, 143, 251)' },];
              { name: 'Nos of Works', data: totalWorks, color: '#eeba0b' },
              { name: 'Contract Value (in cr)', data: tvcValuecr },
              {
                name: 'Avg Month Taken',
                data: avgMonthTaken,
                color: 'rgb(0, 143, 251)',
              },
            ];

            this.chartHandover2.xaxis = { categories: name };
            this.cO = this.chartHandover2;
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
    const SWId = 0;
    const dashid = 4001;
    const startDate = this.dateRange.value.start;
    const endDate = this.dateRange.value.end;
    // const datePipe = new DatePipe('en-US');
    // this.fromdt = startDate ? datePipe.transform(new Date(startDate), 'dd-MM-yyyy') : '';
    // this.todt = endDate ? datePipe.transform(new Date(endDate), 'dd-MM-yyyy') : '';
    this.fromdt = startDate
      ? this.datePipe.transform(startDate, 'dd-MMM-yyyy')
      : '';
    this.todt = endDate ? this.datePipe.transform(endDate, 'dd-MMM-yyyy') : '';
    this.spinner.show();
    // dashid=4001&divisionId=D1004&mainSchemeId=145&distid=0&SWId=0
    this.api
      .GetHandoverDetails(
        dashid,
        divisionID,
        this.mainSchemeID,
        distid,
        SWId,
        this.fromdt,
        this.todt
      )
      .subscribe(
        (res) => {
          this.dispatchDataHandover = res.map(
            (item: GetHandoverDetails, index: number) => ({
              ...item,
              sno: index + 1,
            })
          );
          this.dataSourceHanover.data = this.dispatchDataHandover;
          // console.log(this.dataSource.data);
          // @ViewChild('sortHandover') sortHandover!: MatSort;
          // @ViewChild('paginatorHandover') paginatorHandover!: MatPaginator;
          this.dataSourceHanover.paginator = this.paginatorHandover;
          this.dataSourceHanover.sort = this.sortHandover;
          this.cdr.detectChanges();
          this.spinner.hide();
        },
        (error) => {
          console.error('Error fetching data', error);
        }
      );
    this.openDialogHandover();
  }
  fetchDataBasedOnChartSelectionScheme(
    mainSchemeId: any,
    seriesName: string
  ): void {
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
    const SWId = 0;
    const dashid = 4001;
    const startDate = this.dateRange.value.start;
    const endDate = this.dateRange.value.end;
    // const datePipe = new DatePipe('en-US');
    // this.fromdt = startDate ? datePipe.transform(new Date(startDate), 'dd-MM-yyyy') : '';
    // this.todt = endDate ? datePipe.transform(new Date(endDate), 'dd-MM-yyyy') : '';
    this.fromdt = startDate
      ? this.datePipe.transform(startDate, 'dd-MMM-yyyy')
      : '';
    this.todt = endDate ? this.datePipe.transform(endDate, 'dd-MMM-yyyy') : '';
    // const roleName = localStorage.getItem('roleName');
    // this.divisionid = roleName === 'Division' ? sessionStorage.getItem('divisionID') : 0;
    this.spinner.show();
    // dashid=4001&divisionId=D1004&mainSchemeId=145&distid=0&SWId=0
    this.api
      .GetHandoverDetails(
        dashid,
        this.divisionid,
        mainSchemeId,
        this.districtid,
        SWId,
        this.fromdt,
        this.todt
      )
      .subscribe(
        (res) => {
          this.dispatchDataHandover = res.map(
            (item: GetHandoverDetails, index: number) => ({
              ...item,
              sno: index + 1,
            })
          );
          this.dataSourceHanover.data = this.dispatchDataHandover;
          // console.log(this.dataSource.data);

          this.dataSourceHanover.paginator = this.paginatorHandover;
          this.dataSourceHanover.sort = this.sortHandover;
          this.cdr.detectChanges();
          this.spinner.hide();
        },
        (error) => {
          console.error('Error fetching data', error);
        }
      );
    this.openDialogHandover();
  }
  fetchDataBasedOnChartSelectionDistrict(
    distid: any,
    seriesName: string
  ): void {
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
    const SWId = 0;
    const dashid = 4001;
    const startDate = this.dateRange.value.start;
    const endDate = this.dateRange.value.end;
    // const datePipe = new DatePipe('en-US');
    // this.fromdt = startDate ? datePipe.transform(new Date(startDate), 'dd-MM-yyyy') : '';
    // this.todt = endDate ? datePipe.transform(new Date(endDate), 'dd-MM-yyyy') : '';
    this.fromdt = startDate
      ? this.datePipe.transform(startDate, 'dd-MMM-yyyy')
      : '';
    this.todt = endDate ? this.datePipe.transform(endDate, 'dd-MMM-yyyy') : '';
    // const roleName = localStorage.getItem('roleName');
    // this.divisionid = roleName === 'Division' ? sessionStorage.getItem('divisionID') : 0;
    this.spinner.show();
    // dashid=4001&divisionId=D1004&mainSchemeId=145&distid=0&SWId=0
    this.api
      .GetHandoverDetails(
        dashid,
        this.divisionid,
        mainSchemeId,
        distid,
        SWId,
        this.fromdt,
        this.todt
      )
      .subscribe(
        (res) => {
          this.dispatchDataHandover = res.map(
            (item: GetHandoverDetails, index: number) => ({
              ...item,
              sno: index + 1,
            })
          );
          this.dataSourceHanover.data = this.dispatchDataHandover;
          // console.log(this.dataSource.data);

          this.dataSourceHanover.paginator = this.paginatorHandover;
          this.dataSourceHanover.sort = this.sortHandover;
          this.cdr.detectChanges();
          this.spinner.hide();
        },
        (error) => {
          console.error('Error fetching data', error);
        }
      );
    this.openDialogHandover();
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
    const dashid = 4001;
    const startDate = this.dateRange.value.start;
    const endDate = this.dateRange.value.end;
    // const datePipe = new DatePipe('en-US');
    // this.fromdt = startDate ? datePipe.transform(new Date(startDate), 'dd-MM-yyyy') : '';
    // this.todt = endDate ? datePipe.transform(new Date(endDate), 'dd-MM-yyyy') : '';
    this.fromdt = startDate
      ? this.datePipe.transform(startDate, 'dd-MMM-yyyy')
      : '';
    this.todt = endDate ? this.datePipe.transform(endDate, 'dd-MMM-yyyy') : '';
    // const roleName = localStorage.getItem('roleName');
    // this.divisionid = roleName === 'Division' ? sessionStorage.getItem('divisionID') : 0;
    this.spinner.show();
    // dashid=4001&divisionId=D1004&mainSchemeId=145&distid=0&SWId=0
    this.api
      .GetHandoverDetails(
        dashid,
        this.divisionid,
        mainSchemeId,
        this.districtid,
        SWId,
        this.fromdt,
        this.todt
      )
      .subscribe(
        (res) => {
          this.dispatchDataHandover = res.map(
            (item: GetHandoverDetails, index: number) => ({
              ...item,
              sno: index + 1,
            })
          );
          this.dataSourceHanover.data = this.dispatchDataHandover;
          // console.log(this.dataSource.data);

          this.dataSourceHanover.paginator = this.paginatorHandover;
          this.dataSourceHanover.sort = this.sortHandover;
          this.cdr.detectChanges();
          this.spinner.hide();
        },
        (error) => {
          console.error('Error fetching data', error);
        }
      );
    this.openDialogHandover();
  }

  // data filter
  applyTextFilterHandover(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceHanover.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceHanover.paginator) {
      this.dataSourceHanover.paginator.firstPage();
    }
  }
  exportToPDFHandover() {
    const doc = new jsPDF('l', 'mm', 'a4');
    const columns = [
      { title: 'S.No', dataKey: 'sno' },
      { title: 'letterNo', dataKey: 'letterNo' },
      { title: 'head', dataKey: 'head' },
      { title: 'acceptLetterDT', dataKey: 'acceptLetterDT' },
      { title: 'totalAmountOfContract', dataKey: 'totalAmountOfContract' },
      { title: 'district', dataKey: 'district' },
      { title: 'work', dataKey: 'work' },
      { title: 'contractorNAme', dataKey: 'contractorNAme' },
      { title: 'work_id', dataKey: 'work_id' },
    ];
    const rows = this.dispatchDataHandover.map((row) => ({
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
      headStyles: { fillColor: [22, 160, 133] },
    });

    doc.save('HandoverDetails.pdf');
  }
  // mat-dialog box
  openDialogHandover() {
    const dialogRef = this.dialog.open(this.itemDetailsModalHandover, {
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
  // #endregion
  //#region Get API data in UnPaidSummary
  initializeChartOptionsUnPaid() {
    this.chartUnPaid = {
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
            const selectedCategory =
              this.chartUnPaid?.xaxis?.categories?.[dataPointIndex]; // This is likely just the category name (a string)
            const selectedSeries =
              this.chartUnPaid?.series?.[seriesIndex]?.name;
            // Ensure the selectedCategory and selectedSeries are valid
            if (selectedCategory && selectedSeries) {
              const apiData = this.UnPaidSummaryDivision; // Replace with the actual data source or API response
              // Find the data in your API response that matches the selectedCategory
              const selectedData = apiData.find(
                (data) => data.name === selectedCategory
              );
              // console.log("selectedData chart1",selectedData)
              if (selectedData) {
                const id = selectedData.id; // Extract the id from the matching entry
                this.name = selectedData.name;
                this.fetchDataBasedOnChartSelectiondivisionUNP(
                  id,
                  selectedSeries
                );
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
        // text: 'Division-wise Payment Due',
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
   
   
    this.chartUnPaid3 = {
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
            const selectedCategory =
              this.chartUnPaid3?.xaxis?.categories?.[dataPointIndex]; // This is likely just the category name (a string)
            const selectedSeries =
              this.chartUnPaid3?.series?.[seriesIndex]?.name;
            // Ensure the selectedCategory and selectedSeries are valid
            if (selectedCategory && selectedSeries) {
              const apiData = this.UnPaidSummaryScheme; // Replace with the actual data source or API response
              // const apiData = this.UnPaidSummaryTotal; // Replace with the actual data source or API response
              const selectedData = apiData.find(
                (data) => data.name === selectedCategory
              );
              // console.log("selectedData chart1",selectedData)
              if (selectedData) {
                const id = selectedData.id; // Extract the id from the matching entry
                this.name = selectedData.name; // Extract the id from the matching entry
                this.fetchDataBasedOnChartSelectionmainSchemeUNP(
                  id,
                  selectedSeries
                );
                // this.fetchDataBasedOnChartSelectionTotalUNP(0, selectedSeries);
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
          columnWidth: '20%',
          borderRadius: 5,
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        },
      },
      // plotOptions: {
      //   bar: {
      //     horizontal: false,
      //     dataLabels: {
      //       position: 'top', // top, center, bottom
      //     },
      //   },
      // },
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
        width: 5,
        // colors: ['#000'],
        colors: ['#fff'],
      },
      title: {
        // text: 'Total Payment Pending',
        // text: 'Scheme-wise Payment Due',
        // text: 'Payment Due Summary',
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

 
  GETUnPaidSummaryDivision(): void {
    this.spinner.show();
    var roleName = localStorage.getItem('roleName');
    if (roleName == 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      var RPType = 'Division';
      this.himisDistrictid = 0;
      this.mainschemeid = 0;
      this.chartUnPaid.chart.height = '200px';
    }
    // else if (roleName == 'Collector') {
    //  this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
    // var RPType="District";
    //  this.divisionid = 0;
    //  this.mainschemeid=0;
    //  this.chartOptions.chart.height = '400px';
    // }
    else {
      this.divisionid = 0;
      this.himisDistrictid = 0;
      this.mainschemeid = 0;
      var RPType = 'Division';
      this.chartUnPaid.chart.height = '300';
    }
    console.log(
      'unPaidSummaryDivision RPType=',
      RPType,
      ' this.divisionid',
      this.divisionid,
      'himisDistrictid',
      this.himisDistrictid,
      'mainSchemeID',
      this.mainSchemeID
    );
    this.api
      .GETUnPaidSummary(
        RPType,
        this.divisionid,
        this.himisDistrictid,
        this.mainSchemeID
      )
      .subscribe(
        (data: any) => {
          this.UnPaidSummaryDivision = data;
          console.log('API Response division:', this.UnPaidSummaryDivision);
          // console.log('API Response data:', data);

          const id: string[] = [];
          const name: string[] = [];
          const noofWorks: any[] = [];
          const unpaidcr: number[] = [];
          const avgDaySinceM: number[] = [];

          data.forEach(
            (item: {
              name: string;
              id: any;
              noofWorks: any;
              unpaidcr: number;
              avgDaySinceM: any;
            }) => {
              id.push(item.id);
              name.push(item.name);
              noofWorks.push(item.noofWorks);
              unpaidcr.push(item.unpaidcr);
              avgDaySinceM.push(item.avgDaySinceM);
            }
          );

          this.chartUnPaid.series = [
            {
              name: 'No of Works',
              data: noofWorks,
              color: '#eeba0b',
            },
            {
              name: 'Un-paid Value(in Cr),',
              data: unpaidcr,
              color: 'rgb(0, 227, 150)',
              // color: 'rgb(0, 143, 251)',
            },
            // {
            //   name: 'Total Value in Cr',
            //   data: avgDaySinceM,
            //   color: 'rgba(93, 243, 174, 0.85)',
            // },
            // {
            //   name: 'Avg Days Pending Since Measurement',
            //   data: avgDaySinceM,
            //   color: 'rgba(250, 199, 161, 0.85)',
            // },
          ];
          this.chartUnPaid.xaxis = { categories: name };
          this.chartUnPaid.title = {
            text: `Division-wise Payment Pending : ${this.selectedName}`,
            align: 'center',
            style: {
              fontSize: '12px',
              // color: '#000'
              color: '#6e0d25',
            },
          };
          this.cO = this.chartUnPaid;
          this.cdr.detectChanges();

          this.spinner.hide();
        },
        (error: any) => {
          console.error('Error fetching data', error);
        }
      );
  }
  GETUnPaidSummaryScheme(): void {
    this.spinner.show();
    var roleName = localStorage.getItem('roleName');
    if (roleName == 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      var RPType = 'Scheme';
      this.chartUnPaid3.chart.height = '600';
      this.himisDistrictid = 0;
      this.mainschemeid = 0;
    }
    //  else if (roleName == 'Collector') {
    //  this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
    // var RPType="District";
    //  this.divisionid = 0;
    //  this.mainschemeid=0;
    //  this.chartOptions2.chart.height = '400px';
    // }
    else {
      this.divisionid = 0;
      this.himisDistrictid = 0;
      this.mainschemeid = 0;
      var RPType = 'Scheme';
      this.chartUnPaid3.chart.height = '600';
    }
    console.log(
      'mainScheme RPType=',
      RPType,
      ' this.divisionid',
      this.divisionid,
      'himisDistrictid',
      this.himisDistrictid,
      'mainSchemeID',
      this.mainSchemeID
    );
    this.api
      .GETUnPaidSummary(
        RPType,
        this.divisionid,
        this.himisDistrictid,
        this.mainSchemeID
      )
      .subscribe(
        (data: any) => {
          this.UnPaidSummaryScheme = data;
          // console.log('API Response total:', this.WoIssuedTotal);
          // console.log('API Response data:', data);

          const id: string[] = [];
          const name: string[] = [];
          const noofWorks: any[] = [];
          const unpaidcr: number[] = [];
          const avgDaySinceM: number[] = [];

          data.forEach(
            (item: {
              name: string;
              id: any;
              noofWorks: any;
              unpaidcr: number;
              avgDaySinceM: any;
            }) => {
              id.push(item.id);
              name.push(item.name);
              noofWorks.push(item.noofWorks);
              unpaidcr.push(item.unpaidcr);
              avgDaySinceM.push(item.avgDaySinceM);
            }
          );

          this.chartUnPaid3.series = [
            {
              name: 'No of Works',
              data: noofWorks,
              color: '#eeba0b',
            },
            {
              name: 'Un-paid Value(in Cr),',
              data: unpaidcr,
              color: 'rgb(0, 227, 150)',
              // color: 'rgb(0, 143, 251)',
            },
            // {
            //   name: 'Total Value in Cr',
            //   data: avgDaySinceM,
            //   color: 'rgba(93, 243, 174, 0.85)',
            // },
            // {
            //   name: 'Avg Days Pending Since Measurement',
            //   data: avgDaySinceM,
            //   color: 'rgba(250, 199, 161, 0.85)',
            // },
          ];
          this.chartUnPaid3.xaxis = { categories: name };
          this.chartUnPaid3.title = {
            text: `Total Payment Pending : ${this.selectedName}`,
            align: 'center',
            style: {
              fontSize: '12px',
              // color: '#000'
              color: '#6e0d25',
            },
          };
          this.cO = this.chartUnPaid3;
          this.cdr.detectChanges();

          this.spinner.hide();
        },
        (error: any) => {
          console.error('Error fetching data', error);
        }
      );
  }

  fetchDataBasedOnChartSelectionTotalUNP(
    divisionID: any,
    seriesName: string
  ): void {
    // ;
    // console.log(`Selected ID: ${divisionID}, Series: ${seriesName}`);
    // var roleName = localStorage.getItem('roleName');
    // if (roleName == 'Division') {
    //   this.divisionid = sessionStorage.getItem('divisionID');
    //   this.himisDistrictid = 0;
    //   this.mainschemeid = 0;
    // }
    //  else {
    //   this.divisionid = 0;
    //   this.himisDistrictid = 0;
    //   this.mainschemeid = 0;
    // }
    this.himisDistrictid = 0;
    this.mainschemeid = 0;
    const designame = 0;
    const OfficerID = 0;
    this.spinner.show();
    // Payment/UnPaidDetails?divisionId=D1004&mainSchemeId=0&distid=0
    this.api
      .GETUnPaidDetails(
        divisionID,
        this.mainSchemeID,
        this.himisDistrictid,
        designame,
        OfficerID
      )
      .subscribe(
        (res) => {
          this.dispatchDataUnPaid = res.map(
            (item: UnPaidDetails, index: number) => ({
              ...item,
              sno: index + 1,
            })
          );
          // console.log('PaidDetailsTotal:', res);
          // console.log('PaidDetails2=:',  this.dispatchData);
          this.dataSourceUnPaid.data = this.dispatchDataUnPaid;
          this.dataSourceUnPaid.paginator = this.paginatorUnPaid;
          this.dataSourceUnPaid.sort = this.sortUnPaid;
          this.cdr.detectChanges();
          this.spinner.hide();
        },
        (error) => {
          console.error('Error fetching data', error);
        }
      );
    this.openDialogUnpaid();
  }
  fetchDataBasedOnChartSelectiondivisionUNP(
    divisionID: any,
    seriesName: string
  ): void {
    // console.log(`Selected ID: ${divisionID}, Series: ${seriesName}`);
    const distid = 0;
    const mainSchemeId = 0;
    const contractid = 0;
    const designame = 0;
    const OfficerID = 0;
    // const fromdt="01-jan-2024";
    // const todt="01-jan-2025";
    //     this.fromdt = startDate ? this.datePipe.transform(startDate, 'dd-MMM-yyyy') : '';
    // this.todt  = endDate ? this.datePipe.transform(endDate, 'dd-MMM-yyyy') : '';
    this.spinner.show();
    // Payment/UnPaidDetails?divisionId=D1004&mainSchemeId=0&distid=0
    this.api
      .GETUnPaidDetails(
        divisionID,
        this.mainSchemeID,
        distid,
        designame,
        OfficerID
      )
      .subscribe(
        (res) => {
          this.dispatchDataUnPaid = res.map(
            (item: UnPaidDetails, index: number) => ({
              ...item,
              sno: index + 1,
            })
          );
          // console.log('PaidDetailsTotal:', res);
          // console.log('PaidDetails2=:',  this.dispatchData);
          this.dataSourceUnPaid.data = this.dispatchDataUnPaid;
          this.dataSourceUnPaid.paginator = this.paginatorUnPaid;
          this.dataSourceUnPaid.sort = this.sortUnPaid;
          this.cdr.detectChanges();
          this.spinner.hide();
        },
        (error) => {
          console.error('Error fetching data', error);
        }
      );
    this.openDialogUnpaid();
  }
  fetchDataBasedOnChartSelectionmainSchemeUNP(
    mainSchemeId: any,
    seriesName: string
  ): void {
    console.log(`Selected ID: ${mainSchemeId}, Series: ${seriesName}`);
    var roleName = localStorage.getItem('roleName');
    if (roleName == 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      this.himisDistrictid = 0;
      // this.mainschemeid = 0;
    } else {
      this.divisionid = 0;
      this.himisDistrictid = 0;
      // this.mainschemeid = 0;
    }
    const designame = 0;
    const OfficerID = 0;
    this.spinner.show();
    // Payment/UnPaidDetails?divisionId=D1004&mainSchemeId=0&distid=0
    console.log(
      'this.divisionid=',
      this.divisionid,
      'mainSchemeId=',
      mainSchemeId,
      'this.himisDistrictid=',
      this.himisDistrictid,
      'designame=',
      designame,
      'OfficerID=',
      OfficerID
    );
    this.api
      .GETUnPaidDetails(
        this.divisionid,
        mainSchemeId,
        this.himisDistrictid,
        designame,
        OfficerID
      )
      .subscribe(
        (res) => {
          this.dispatchDataUnPaid = res.map(
            (item: UnPaidDetails, index: number) => ({
              ...item,
              sno: index + 1,
            })
          );
          // console.log('PaidDetailsTotal:', res);
          // console.log('PaidDetails2=:',  this.dispatchData);
          this.dataSourceUnPaid.data = this.dispatchDataUnPaid;
          this.dataSourceUnPaid.paginator = this.paginatorUnPaid;
          this.dataSourceUnPaid.sort = this.sortUnPaid;
          this.cdr.detectChanges();
          this.spinner.hide();
        },
        (error) => {
          console.error('Error fetching data', error);
        }
      );
    this.openDialogUnpaid();
  }
  fetchDataBasedOnChartSelectionmainDesignationUNP(
    designame: any,
    seriesName: string
  ): void {
    // console.log(`Selected ID: ${designame}, Series: ${seriesName}`);
    var roleName = localStorage.getItem('roleName');
    if (roleName == 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      this.himisDistrictid = 0;
      this.mainschemeid = 0;
    } else {
      this.divisionid = 0;
      this.himisDistrictid = 0;
      this.mainschemeid = 0;
    }

    const OfficerID = 0;
    this.spinner.show();
    // Payment/UnPaidDetails?divisionId=D1004&mainSchemeId=0&distid=0
    this.api
      .GETUnPaidDetails(
        this.divisionid,
        this.mainSchemeID,
        this.himisDistrictid,
        designame,
        OfficerID
      )
      .subscribe(
        (res) => {
          this.dispatchDataUnPaid = res.map(
            (item: UnPaidDetails, index: number) => ({
              ...item,
              sno: index + 1,
            })
          );
          // console.log('PaidDetailsTotal:', res);
          // console.log('PaidDetails2=:',  this.dispatchData);
          this.dataSourceUnPaid.data = this.dispatchDataUnPaid;
          this.dataSourceUnPaid.paginator = this.paginatorUnPaid;
          this.dataSourceUnPaid.sort = this.sortUnPaid;
          this.cdr.detectChanges();
          this.spinner.hide();
        },
        (error) => {
          console.error('Error fetching data', error);
        }
      );
    this.openDialogUnpaid();
  }

  // data filter

  UNapplyTextFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceUnPaid.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceUnPaid.paginator) {
      this.dataSourceUnPaid.paginator.firstPage();
    }
  }

  UNexportToPDF() {
    const doc = new jsPDF('l', 'mm', 'a4');
    const columns = [
      { title: 'S.No', dataKey: 'sno' },
      // { title: 'letterno', dataKey: 'letterno' },
      { title: 'Head', dataKey: 'head' },
      { title: 'Division', dataKey: 'division' },
      { title: 'District', dataKey: 'district' },
      { title: 'Work', dataKey: 'workname' },
      { title: 'Wrok Order DT', dataKey: 'wrokOrderDT' },
      { title: 'Bill No.', dataKey: 'billno' },
      { title: 'Bill Type', dataKey: 'agrbillstatus' },
      { title: 'Contract Value (In lacs)', dataKey: 'totalamountofcontract' },
      { title: 'Gross Amount Due(In lacs)', dataKey: 'grossAmtNew' },
      { title: 'Total Paid Till(In lacs)', dataKey: 'totalpaidtillinlac' },
      // { title: 'ChequeDT', dataKey: 'chequeDT' },
      { title: 'Measurement DT', dataKey: 'mesurementDT' },
      { title: 'WorK ID', dataKey: 'worK_ID' },
    ];
    const rows = this.dispatchDataUnPaid.map((row) => ({
      sno: row.sno,
      // letterno: row.letterno,
      head: row.head,
      division: row.division,
      district: row.district,
      workname: row.workname,
      wrokOrderDT: row.wrokOrderDT,
      billno: row.billno,
      // billdate:row.billdate,
      agrbillstatus: row.agrbillstatus,
      totalamountofcontract: row.totalamountofcontract,
      grossAmtNew: row.grossAmtNew,
      totalpaidtillinlac: row.totalpaidtillinlac,
      // chequeDT: row.chequeDT,
      mesurementDT: row.mesurementDT,
      // dayssincemeasurement: row.dayssincemeasurement,
      // workStatus: row.workStatus,
      worK_ID: row.worK_ID,
      // designation: row.designation,
      // engName: row.engName,
    }));

    autoTable(doc, {
      columns: columns,
      body: rows,
      startY: 20,
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] },
    });

    doc.save('UnPaidDetails.pdf');
  }
  // mat-dialog box
  openDialogUnpaid() {
    const dialogRef = this.dialog.open(this.itemDetailsModalUnPaid, {
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

  // #endregion
  //#region Get API data in PaidSummary
  initializeChartOptionsPaid() {
    this.chartPaid1 = {
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
              this.chartPaid1?.xaxis?.categories?.[dataPointIndex]; // This is likely just the category name (a string)
            const selectedSeries = this.chartPaid1?.series?.[seriesIndex]?.name;
            // Ensure the selectedCategory and selectedSeries are valid
            if (selectedCategory && selectedSeries) {
              const apiData = this.PaidSummaryDivision; // Replace with the actual data source or API response
              // Find the data in your API response that matches the selectedCategory
              const selectedData = apiData.find(
                (data) => data.name === selectedCategory
              );
              // console.log("selectedData chart1",selectedData)
              if (selectedData) {
                const id = selectedData.id; // Extract the id from the matching entry
                this.name = selectedData.name;
                this.fetchDataBasedOnChartSelectionDivisionPaid(
                  id,
                  selectedSeries
                );
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
        // text: 'Division-wise',
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
   
    this.chartPaid = {
      // animationEnabled: true,
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
              this.chartPaid?.xaxis?.categories?.[dataPointIndex]; // This is likely just the category name (a string)
            const selectedSeries = this.chartPaid?.series?.[seriesIndex]?.name;
            // Ensure the selectedCategory and selectedSeries are valid
            if (selectedCategory && selectedSeries) {
              const apiData = this.PaidSummaryScheme; // Replace with the actual data source or API response
              // const apiData = this.PaidSummaryTotal; // Replace with the actual data source or API response
              // Find the data in your API response that matches the selectedCategory
              const selectedData = apiData.find(
                (data) => data.name === selectedCategory
              );
              // console.log("selectedData chart1",selectedData)
              if (selectedData) {
                const id = selectedData.id; // Extract the id from the matching entry
                this.name = selectedData.name;
                this.fetchDataBasedOnChartSelectionSchemePaid(
                  id,
                  selectedSeries
                );
                // this.fetchDataBasedOnChartSelectionTotalPaid(id, selectedSeries);
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
          columnWidth: '20%',
          borderRadius: 5,
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
        width: 5,
        // colors: ['#000'],
        colors: ['#fff'],
      },
      title: {
        // text: 'Summary: Payment Completed',
        // text: 'Scheme-wise',
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
  GETPaidSummaryDivision(): void {
    this.spinner.show();
    var roleName = localStorage.getItem('roleName');
    if (roleName == 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      var RPType = 'Division';
      this.himisDistrictid = 0;
      // this.mainschemeid = 0;
      this.chartPaid1.chart.height = '200px';
    }
    // else if (roleName == 'Collector') {
    //  this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
    // var RPType="District";
    //  this.divisionid = 0;
    //  this.mainschemeid=0;
    //  this.chartOptions.chart.height = '400px';
    // }
    else {
      this.divisionid = 0;
      this.himisDistrictid = 0;
      // this.mainschemeid = 0;
      var RPType = 'Division';
      this.chartPaid1.chart.height = '300';
    }
    const startDate = this.dateRange1.value.start;
    const endDate = this.dateRange1.value.end;
    this.fromdt1 = startDate
      ? this.datePipe.transform(startDate, 'dd-MMM-yyyy')
      : '';
    this.todt1 = endDate ? this.datePipe.transform(endDate, 'dd-MMM-yyyy') : '';
    
    this.api
      .GETPaidSummary(
        RPType,
        this.divisionid,
        this.himisDistrictid,
        this.mainSchemeID,
        this.fromdt1,
        this.todt1
      )
      .subscribe(
        (data: any) => {
          this.PaidSummaryDivision = data;
          // console.log('API Response total:', this.PaidSummaryDivision);
          // console.log('API Response data:', data);

          const id: string[] = [];
          const name: string[] = [];
          const noofWorks: number[] = [];
          const avgDaysSinceMeasurement: any[] = [];
          const grossPaidcr: number[] = [];

          data.forEach(
            (item: {
              name: string;
              id: any;
              avgDaysSinceMeasurement: any;
              grossPaidcr: any;
              noofWorks: number;
            }) => {
              id.push(item.id);
              name.push(item.name);
              avgDaysSinceMeasurement.push(item.avgDaysSinceMeasurement);
              grossPaidcr.push(item.grossPaidcr);
              noofWorks.push(item.noofWorks);
            }
          );

          this.chartPaid1.series = [
            {
              name: 'No. of Works',
              data: noofWorks,
              color: '#eeba0b',
            },
            // {
            //   name: 'No. of Works',
            //   data: avgDaysSinceMeasurement,
            //   color: '#eeba0b',
            // },
            {
              name: 'Paid Value(in Cr)',
              data: grossPaidcr,
              color: 'rgb(0, 143, 251)',
            },
            // {
            //   name: 'Total Numbers of Works',
            //   data: avgDaysSinceMeasurement,
            //   color: '#eeba0b',
            // },
            
          ];
          this.chartPaid1.xaxis = { categories: name };
          this.chartPaid1.title = {
            text: `Division-wise Payment Processed: ${this.selectedName}`,
            align: 'center',
            style: {
              fontSize: '12px',
              // color: '#000'
              color: '#6e0d25',
            },
          };
          this.cO = this.chartPaid1;
          this.cdr.detectChanges();

          this.spinner.hide();
        },
        (error: any) => {
          console.error('Error fetching data', error);
        }
      );
  }
  GETPaidSummaryScheme(): void {
    this.spinner.show();
    var roleName = localStorage.getItem('roleName');
    if (roleName == 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      var RPType = 'Scheme';
      this.chartPaid.chart.height = '400';
      this.himisDistrictid = 0;
      // this.mainschemeid = 0;
    }
    //  else if (roleName == 'Collector') {
    //  this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
    // var RPType="District";
    //  this.divisionid = 0;
    //  this.mainschemeid=0;
    //  this.chartOptions2.chart.height = '400px';
    // }
    else {
      this.divisionid = 0;
      this.himisDistrictid = 0;
      // this.mainschemeid = 0;

      this.chartPaid.chart.height = '500';
      var RPType = 'Scheme';
    }
    const startDate = this.dateRange1.value.start;
    const endDate = this.dateRange1.value.end;
    this.fromdt1 = startDate
      ? this.datePipe.transform(startDate, 'dd-MMM-yyyy')
      : '';
    this.todt1 = endDate ? this.datePipe.transform(endDate, 'dd-MMM-yyyy') : '';
    // console.log('this.fromdt=', this.fromdt, 'this.todt=', this.todt);
    // alert( this.TimeStatus)
    // RPType=Total&divisionid=0&districtid=0&mainschemeid=0&TimeStatus=0
    // console.log(
    //   'PaidSummaryScheme RPType=',
    //   RPType,
    //   ' this.divisionid',
    //   this.divisionid,
    //   'himisDistrictid',
    //   this.himisDistrictid,
    //   'mainSchemeID',
    //   this.mainSchemeID
    // );
    this.api
      .GETPaidSummary(
        RPType,
        this.divisionid,
        this.himisDistrictid,
        this.mainSchemeID,
        this.fromdt1,
        this.todt1
      )
      .subscribe(
        (data: any) => {
          this.PaidSummaryScheme = data;
          console.log(
            'API Response PaidSummaryScheme:',
            this.PaidSummaryScheme
          );
          const id: string[] = [];
          const name: string[] = [];
          const noofWorks: number[] = [];
          const avgDaysSinceMeasurement: any[] = [];
          const grossPaidcr: number[] = [];

          data.forEach(
            (item: {
              name: string;
              id: any;
              avgDaysSinceMeasurement: any;
              grossPaidcr: any;
              noofWorks: number;
            }) => {
              id.push(item.id);
              name.push(item.name);
              avgDaysSinceMeasurement.push(item.avgDaysSinceMeasurement);
              grossPaidcr.push(item.grossPaidcr);
              noofWorks.push(item.noofWorks);
            }
          );
          this.chartPaid.series = [
            {
              name: 'No. of Works',
              data: noofWorks,
              color: '#eeba0b',
            },
            // {
            //   name: 'No. of Works',
            //   data: avgDaysSinceMeasurement,
            //   color: '#eeba0b',
            // },
            {
              name: 'Paid Value(in Cr)',
              data: grossPaidcr,
              color: 'rgb(0, 143, 251)',
            },
            // {
            //   name: 'Total Numbers of Works',
            //   data: avgDaysSinceMeasurement,
            //   color: '#eeba0b',
            // },
            
          ];
          this.chartPaid.xaxis = { categories: name };
          this.chartPaid.title = {
            text: `Total Payment Processed: ${this.selectedName}`,
            align: 'center',
            style: {
              fontSize: '12px',
              // color: '#000'
              color: '#6e0d25',
            },
          };
          this.cO = this.chartPaid;
          this.cdr.detectChanges();

          this.spinner.hide();
        },
        (error: any) => {
          console.error('Error fetching data', error);
        }
      );
  }

  fetchDataBasedOnChartSelectionDivisionPaid(
    divisionID: any,
    seriesName: string
  ): void {
    console.log(`Selected ID: ${divisionID}, Series: ${seriesName}`);
    const distid = 0;
    // const mainSchemeId = 0;
    const contractid = 0;
    // const fromdt="01-jan-2024";
    // const todt="01-jan-2025";
    //     this.fromdt = startDate ? this.datePipe.transform(startDate, 'dd-MMM-yyyy') : '';
    // this.todt  = endDate ? this.datePipe.transform(endDate, 'dd-MMM-yyyy') : '';
    this.spinner.show();
    console.log('this.mainSchemeID,=', this.mainSchemeID);
    // t/PaidDetails?divisionId=0&mainSchemeId=0&distid=0&fromdt=0&todt=0
    this.api
      .GETPaidDetails(
        divisionID,
        this.mainSchemeID,
        distid,
        this.fromdt,
        this.todt
      )
      .subscribe(
        (res) => {
          this.dispatchDataPaid = res.map(
            (item: PaidDetails, index: number) => ({
              ...item,
              sno: index + 1,
            })
          );
          // console.log('PaidDetails:', res);
          // console.log('PaidDetails2=:',  this.dispatchData);
          this.dataSourcePaid.data = this.dispatchDataPaid;
          this.dataSourcePaid.paginator = this.paginatorPaid;
          this.dataSourcePaid.sort = this.sortPaid;
          this.cdr.detectChanges();
          this.spinner.hide();
        },
        (error) => {
          console.error('Error fetching data', error);
        }
      );
    this.openDialogPaid();
  }

  fetchDataBasedOnChartSelectionSchemePaid(
    mainSchemeId: any,
    seriesName: string
  ): void {
    console.log(`Selected ID: ${mainSchemeId}, Series: ${seriesName}`);
    var roleName = localStorage.getItem('roleName');
    if (roleName == 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      this.himisDistrictid = 0;
      // this.mainschemeid = 0;
    } else {
      this.divisionid = 0;
      this.himisDistrictid = 0;
      // this.mainschemeid = 0;
    }
    // const fromdt="01-jan-2024";
    // const todt="01-jan-2025";
    //     this.fromdt = startDate ? this.datePipe.transform(startDate, 'dd-MMM-yyyy') : '';
    // this.todt  = endDate ? this.datePipe.transform(endDate, 'dd-MMM-yyyy') : '';
    this.spinner.show();
    // t/PaidDetails?divisionId=0&mainSchemeId=0&distid=0&fromdt=0&todt=0
    // console.log( 'this.mainSchemeID,=', this.mainSchemeID,)
    this.api
      .GETPaidDetails(
        this.divisionid,
        mainSchemeId,
        this.himisDistrictid,
        this.fromdt,
        this.todt
      )
      .subscribe(
        (res) => {
          this.dispatchDataPaid = res.map(
            (item: PaidDetails, index: number) => ({
              ...item,
              sno: index + 1,
            })
          );
          // console.log('PaidDetails:', res);
          // console.log('PaidDetails2=:',  this.dispatchData);
          // @ViewChild('sortPaid') sortPaid!: MatSort;
          // @ViewChild('paginatorUnPaid') paginatorPaid!: MatPaginator;

          this.dataSourcePaid.data = this.dispatchDataPaid;
          this.dataSourcePaid.paginator = this.paginatorPaid;
          this.dataSourcePaid.sort = this.sortPaid;
          this.cdr.detectChanges();
          this.spinner.hide();
        },
        (error) => {
          console.error('Error fetching data', error);
        }
      );
    this.openDialogPaid();
  }
  applyTextFilterPaid(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcePaid.filter = filterValue.trim().toLowerCase();
    if (this.dataSourcePaid.paginator) {
      this.dataSourcePaid.paginator.firstPage();
    }
  }
  exportToPDFPaid() {
    const doc = new jsPDF('l', 'mm', 'a4');
    const columns = [
      // 'sno', 'head','district','division','workname','wrokOrderDT','billno','agrbillstatus',
      // 'totalamountofcontract','grosspaid','totalpaidtillinlac','chequeDT','mesurementDT','worK_ID'
      { title: 'S.No', dataKey: 'sno' },
      // { title: 'letterno', dataKey: 'letterno' },
      { title: 'Head', dataKey: 'head' },
      { title: 'Division', dataKey: 'division' },
      { title: 'District', dataKey: 'district' },
      { title: 'Work', dataKey: 'workname' },
      { title: 'Work Order DT', dataKey: 'wrokOrderDT' },
      { title: 'Bill No.', dataKey: 'billno' },
      { title: 'AGR Bill Status', dataKey: 'agrbillstatus' },
      { title: 'Contract Value (In lacs)', dataKey: 'totalamountofcontract' },
      { title: 'Gross Paid Value (In lacs)', dataKey: 'grosspaid' },
      { title: 'Total Paid Till(In lacs)', dataKey: 'totalpaidtillinlac' },
      { title: 'Cheque DT.', dataKey: 'chequeDT' },
      { title: 'Measurement DT', dataKey: 'mesurementDT' },
      { title: 'WorK ID', dataKey: 'worK_ID' },
    ];
    const rows = this.dispatchDataPaid.map((row) => ({
      sno: row.sno,
      head: row.head,
      district: row.district,
      division: row.division,
      workname: row.workname,
      wrokOrderDT: row.wrokOrderDT,
      billno: row.billno,
      agrbillstatus: row.agrbillstatus,
      totalamountofcontract: row.totalamountofcontract,
      grosspaid: row.grosspaid,
      totalpaidtillinlac: row.totalpaidtillinlac,
      chequeDT: row.chequeDT,
      mesurementDT: row.mesurementDT,
      worK_ID: row.worK_ID,
    }));

    autoTable(doc, {
      columns: columns,
      body: rows,
      startY: 20,
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] },
    });

    doc.save('PaymentDetail.pdf');
  }
  openDialogPaid() {
    const dialogRef = this.dialog.open(this.itemDetailsModalPaid, {
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
  // #endregion
  // #region Get APT data Live Tender
  initializeChartOptionsLiveTender() {
    this.chartliveTenderTO = {
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
            const selectedCategory =
              this.chartliveTenderTO?.xaxis?.categories?.[dataPointIndex]; // This is likely just the category name (a string)
            const selectedSeries =
              this.chartliveTenderTO?.series?.[seriesIndex]?.name;
            // Ensure the selectedCategory and selectedSeries are valid
            if (selectedCategory && selectedSeries) {
              const apiData = this.LiveTenderScheme; // Replace with the actual data source or API response
              // Find the data in your API response that matches the selectedCategory
              const selectedData = apiData.find(
                (data) => data.name === selectedCategory
              );
              // console.log("selectedData chart1",selectedData)
              if (selectedData) {
                const id = selectedData.id; // Extract the id from the matching entry
                this.name = selectedData.name;
                this.nosWorks = selectedData.nosWorks;
                this.fetchDataBasedOnChartSelectionSchemeLIT(
                  id,
                  selectedSeries
                );
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
          columnWidth: '30%',
          borderRadius: 5,
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
        width: 4,
        // colors: ['#000'],
        colors: ['#fff'],
      },
      title: {
        // text: 'Live Tenders ',
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

    this.chartliveTenderDiv = {
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
            const selectedCategory =
              this.chartliveTenderDiv?.xaxis?.categories?.[dataPointIndex]; // This is likely just the category name (a string)
            const selectedSeries =
              this.chartliveTenderDiv?.series?.[seriesIndex]?.name;
            // Ensure the selectedCategory and selectedSeries are valid
            if (selectedCategory && selectedSeries) {
              const apiData = this.LiveTenderDivision; // Replace with the actual data source or API response
              // Find the data in your API response that matches the selectedCategory
              const selectedData = apiData.find(
                (data) => data.name === selectedCategory
              );
              // console.log("selectedData chart1",selectedData)
              if (selectedData) {
                const id = selectedData.id; // Extract the id from the matching entry
                this.name = selectedData.name;
                this.nosWorks = selectedData.nosWorks;
                this.fetchDataBasedOnChartSelectionDivisionLIT(
                  id,
                  selectedSeries
                );
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
        // text: 'Division-wise Live Tenders',
        align: 'center',
        style: {
          // fontSize: '12px',
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

  GETLiveTenderDivision(): void {
    this.spinner.show();
    var roleName = localStorage.getItem('roleName');
    if (roleName == 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      // var RPType ='Division';
      var RPType = 'Division';
      this.chartliveTenderDiv.chart.height = '200px';
      this.himisDistrictid = 0;
      // this.mainschemeid=0;
    } else if (roleName == 'Collector') {
      this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
      //  var RPType="District";
      var RPType = 'Division';
      this.divisionid = 0;
      // this.mainschemeid=0;
      this.chartliveTenderDiv.chart.height = '400px';
    } else {
      this.divisionid = 0;
      this.himisDistrictid = 0;
      // this.mainschemeid=0;
      var RPType = 'Division';
      this.chartliveTenderDiv.chart.height = '300';
    }
    this.TimeStatus = this.selectedTabIndex == 0 ? 'Live' : 'Timeover';

    // RPType=Total&divisionid=0&districtid=0&mainschemeid=0&TimeStatus=0
    this.api
      .GETLiveTender(
        RPType,
        this.divisionid,
        this.himisDistrictid,
        this.mainSchemeID,
        this.TimeStatus
      )
      .subscribe(
        (data: any) => {
          this.LiveTenderDivision = data;
          // console.log('API Response total:', this.WoIssuedTotal);
          // console.log('API Response data:', data);

          const id: string[] = [];
          const name: string[] = [];
          const nosWorks: any[] = [];
          const nosTender: number[] = [];
          const totalValuecr: number[] = [];

          data.forEach(
            (item: {
              name: string;
              id: any;
              nosWorks: any;
              nosTender: number;
              totalValuecr: any;
            }) => {
              id.push(item.id);
              name.push(item.name);
              nosWorks.push(item.nosWorks);
              nosTender.push(item.nosTender);
              totalValuecr.push(item.totalValuecr);
            }
          );

          this.chartliveTenderDiv.series = [
            {
              name: 'No of Works ',
              data: nosWorks,
              color: '#eeba0b',
            },
            {
              name: 'No of Tenders',
              data: nosTender,
              // color: 'rgb(0, 143, 251)',
              color: '#6a6afd',
            },
            {
              name: 'Tender Value(in Cr)',
              data: totalValuecr,
              color: 'rgba(93, 243, 174, 0.85)',
            },
          ];
          this.chartliveTenderDiv.xaxis = { categories: name };
          // this.chartliveTenderDiv.title.text = `Technical Evaluation Summary: ${this.selectedName}`;
          this.cO = this.chartliveTenderDiv;
          // if(this.selectedTabIndex == 0){
          this.chartliveTenderDiv.title = {
            // text: 'Division-wise Live Tenders ',
            text: `Division-wise Live Tenders: ${this.selectedName}`,
            align: 'center',
            style: {
              fontSize: '12px',
              // color: '#000'
              color: '#6e0d25',
            },
          };

          // }else{
          //   this.chartliveTenderDiv.title={text: 'Division-wise Live Tenders',

          //     // text: 'Live Tenders ',
          //     align: 'center',
          //     style: {
          //       fontSize: '12px',
          //       // color: '#000'
          //       color: '#6e0d25',
          //     },
          //   }
          // }
          this.cdr.detectChanges();

          this.spinner.hide();
        },
        (error: any) => {
          console.error('Error fetching data', error);
        }
      );
  }
  GETLiveTenderScheme(): void {
    this.spinner.show();
    var roleName = localStorage.getItem('roleName');
    if (roleName == 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      // var RPType ='Division';
      var RPType = 'Scheme';

      this.chartliveTenderTO.chart.height = '200px';
      this.himisDistrictid = 0;
      // this.mainschemeid=0;
    } else if (roleName == 'Collector') {
      this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
      //  var RPType="District";
      var RPType = 'Scheme';

      this.divisionid = 0;
      // this.mainschemeid=0;
      this.chartliveTenderTO.chart.height = '400px';
    } else {
      this.divisionid = 0;
      this.himisDistrictid = 0;
      // this.mainschemeid=0;
      this.chartliveTenderTO.chart.height = '300';
      var RPType = 'Scheme';
    }
    this.TimeStatus = this.selectedTabIndex == 0 ? 'Live' : 'Timeover';
    // alert( this.TimeStatus)
    // RPType=Total&divisionid=0&districtid=0&mainschemeid=0&TimeStatus=0
    this.api
      .GETLiveTender(
        RPType,
        this.divisionid,
        this.himisDistrictid,
        this.mainSchemeID,
        this.TimeStatus
      )
      .subscribe(
        (data: any) => {
          this.LiveTenderScheme = data;
          // console.log('API Response total:', this.WoIssuedTotal);
          // console.log('API Response data:', data);

          const id: string[] = [];
          const name: string[] = [];
          const nosWorks: any[] = [];
          const nosTender: number[] = [];
          const totalValuecr: number[] = [];

          data.forEach(
            (item: {
              name: string;
              id: any;
              nosWorks: any;
              nosTender: number;
              totalValuecr: any;
            }) => {
              id.push(item.id);
              name.push(item.name);
              nosWorks.push(item.nosWorks);
              nosTender.push(item.nosTender);
              totalValuecr.push(item.totalValuecr);
            }
          );

          this.chartliveTenderTO.series = [
            {
              name: 'No of Works ',
              data: nosWorks,
              color: '#eeba0b',
            },
            {
              name: 'No of Tenders',
              data: nosTender,
              // color: 'rgb(0, 143, 251)',
              color: '#6a6afd',
            },
            {
              name: 'Tender Value(in Cr)',
              data: totalValuecr,
              color: 'rgba(93, 243, 174, 0.85)',
            },
          ];
          this.chartliveTenderTO.xaxis = { categories: name };
          // this.chartliveTenderTO.title.text = `Technical Evaluation Summary: ${this.selectedName}`;
          this.cO = this.chartliveTenderTO;
          // if(this.selectedTabIndex == 0){
          this.chartliveTenderTO.title = {
            // text: 'Scheme-wise Live Tenders ',
            text: `Scheme-wise Live Tenders: ${this.selectedName}`,
            align: 'center',
            style: {
              fontSize: '12px',
              // color: '#000'
              color: '#6e0d25',
            },
          };

          // }else{
          //   this.chartliveTenderTO.title={text: 'Scheme-wise Pending To Open Tenders',

          //     // text: 'Live Tenders ',
          //     align: 'center',
          //     style: {
          //       fontSize: '12px',
          //       // color: '#000'
          //       color: '#6e0d25',
          //     },
          //   }
          // }
          this.cdr.detectChanges();

          this.spinner.hide();
        },
        (error: any) => {
          console.error('Error fetching data', error);
        }
      );
  }

  fetchDataBasedOnChartSelectionDivisionLIT(
    divisionID: any,
    seriesName: string
  ): void {
    // console.log(`Selected ID: ${divisionID}, Series: ${seriesName}`);
    const distid = 0;
    // const mainSchemeId = 0;
    const TimeStatus = 'Live';
    this.spinner.show();
    // getTenderDetails?divisionId=D1004&mainSchemeId=0&distid=0&TimeStatus=Live
    this.TimeStatus = this.selectedTabIndex == 0 ? 'Live' : 'Timeover';
    // alert(this.TimeStatus);
    this.api
      .GETTenderDetails(divisionID, this.mainSchemeID, distid, this.TimeStatus)
      .subscribe(
        (res) => {
          this.dispatchDataLiveTender = res.map(
            (item: TenderDetails, index: number) => ({
              ...item,
              sno: index + 1,
            })
          );
          // console.log('res:', res);
          // console.log('dispatchData=:', this.dispatchData);

          this.dataSourceLiveTender.data = this.dispatchDataLiveTender;
          this.dataSourceLiveTender.paginator = this.paginatorLivet;
          this.dataSourceLiveTender.sort = this.sortLivet;
          this.cdr.detectChanges();
          this.spinner.hide();
        },
        (error) => {
          console.error('Error fetching data', error);
        }
      );
    this.openDialogLiT();
  }

  fetchDataBasedOnChartSelectionSchemeLIT(
    mainSchemeId: any,
    seriesName: string
  ): void {
    // console.log(`Selected ID: ${mainSchemeId}, Series: ${seriesName}`);
    const divisionID = 0;
    const distid = 0;
    const TimeStatus = 'Live';
    this.spinner.show();
    // getTenderDetails?divisionId=D1004&mainSchemeId=0&distid=0&TimeStatus=Live
    this.TimeStatus = this.selectedTabIndex == 0 ? 'Live' : 'Timeover';
    // alert(this.TimeStatus);
    this.api
      .GETTenderDetails(divisionID, mainSchemeId, distid, this.TimeStatus)
      .subscribe(
        (res) => {
          this.dispatchDataLiveTender = res.map(
            (item: TenderDetails, index: number) => ({
              ...item,
              sno: index + 1,
            })
          );
          // console.log('res:', res);
          // console.log('dispatchData=:', this.dispatchData);
          this.dataSourceLiveTender.data = this.dispatchDataLiveTender;
          this.dataSourceLiveTender.paginator = this.paginatorLivet;
          this.dataSourceLiveTender.sort = this.sortLivet;
          this.cdr.detectChanges();
          this.spinner.hide();
        },
        (error) => {
          console.error('Error fetching data', error);
        }
      );
    this.openDialogLiT();
  }

  applyTextFilterLIT(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceLiveTender.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceLiveTender.paginator) {
      this.dataSourceLiveTender.paginator.firstPage();
    }
  }
  exportToPDFLIT() {
    const doc = new jsPDF('l', 'mm', 'a4');
    const columns = [
      { title: 'S.No', dataKey: 'sno' },
      { title: 'AS Letter No', dataKey: 'letterno' },
      { title: 'Head', dataKey: 'head' },
      { title: 'AS Date', dataKey: 'aA_RAA_Date' },
      { title: 'AS Amount', dataKey: 'asAmt' },
      { title: 'District', dataKey: 'district' },
      { title: 'Work ID', dataKey: 'work_id' },
      { title: 'Work Name', dataKey: 'workname' },
      { title: 'Start Dt', dataKey: 'startdt' },
      { title: 'End Dt', dataKey: 'enddt' },
      { title: 'NO of Calls', dataKey: 'noofcalls' },
      { title: 'e-Procno', dataKey: 'eprocno' },
      { title: 'NIT NO', dataKey: 'tenderno' },
    ];
    const rows = this.dispatchDataLiveTender.map((row) => ({
      sno: row.sno,
      letterNo: row.letterno,
      head: row.head,
      aA_RAA_Date: row.aA_RAA_Date,
      asAmt: row.asAmt,
      district: row.district,
      work_id: row.work_id,
      workname: row.workname,
      startdt: row.startdt,
      enddt: row.enddt,
      noofcalls: row.noofcalls,
      tenderno: row.tenderno,
      eprocno: row.eprocno,
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
  // mat-dialog box
  openDialogLiT() {
    const dialogRef = this.dialog.open(this.itemDetailsModalLT, {
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

  // #endregion
  // #region Get APT data Tender Evatuation
  initializeChartOptionsTenderE() {
    this.chartOptionsTESDivision = {
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
            const selectedCategory =
              this.chartOptionsTESDivision?.xaxis?.categories?.[dataPointIndex]; // This is likely just the category name (a string)
            const selectedSeries =
              this.chartOptionsTESDivision?.series?.[seriesIndex]?.name;
            // Ensure the selectedCategory and selectedSeries are valid
            if (selectedCategory && selectedSeries) {
              const apiData = this.TenderEvaluationDivision; // Replace with the actual data source or API response
              // Find the data in your API response that matches the selectedCategory
              const selectedData = apiData.find(
                (data) => data.name === selectedCategory
              );
              // console.log("selectedData chart1",selectedData)
              if (selectedData) {
                const id = selectedData.id; // Extract the id from the matching entry
                this.selectedName = selectedData.name;
                this.nosWorks = selectedData.nosWorks;
                this.fetchDataBasedOnChartSelectionDivisionTenderE(
                  id,
                  selectedSeries
                );
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
        // text: 'Division-wise Technical Evaluation',
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
    this.chartOptionsTEScheme = {
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
            const selectedCategory =
              this.chartOptionsTEScheme?.xaxis?.categories?.[dataPointIndex]; // This is likely just the category name (a string)
            const selectedSeries =
              this.chartOptionsTEScheme?.series?.[seriesIndex]?.name;
            // Ensure the selectedCategory and selectedSeries are valid
            if (selectedCategory && selectedSeries) {
              const apiData = this.TenderEvaluationScheme; // Replace with the actual data source or API response
              // Find the data in your API response that matches the selectedCategory
              const selectedData = apiData.find(
                (data) => data.name === selectedCategory
              );
              // console.log("selectedData chart1",selectedData)
              if (selectedData) {
                const id = selectedData.id; // Extract the id from the matching entry
                this.selectedName = selectedData.name;
                this.nosWorks = selectedData.nosWorks;
                this.fetchDataBasedOnChartSelectionSchemeTenderE(
                  id,
                  selectedSeries
                );
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
          columnWidth: '30%',
          borderRadius: 5,
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
        width: 5,
        // colors: ['#000'],
        colors: ['#fff'],
      },
      title: {
        // text: 'Technical Evaluation Summary',
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

  GETTenderEvaluationDivision(): void {
    this.spinner.show();
    var roleName = localStorage.getItem('roleName');
    if (roleName == 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      var RPType = 'Division';
      this.chartOptionsTESDivision.chart.height = '200px';
      this.himisDistrictid = 0;
      this.mainschemeid = 0;
    } else if (roleName == 'Collector') {
      this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
      var RPType = 'District';
      this.divisionid = 0;
      this.mainschemeid = 0;
      this.chartOptionsTESDivision.chart.height = '400px';
    } else {
      this.divisionid = 0;
      this.himisDistrictid = 0;
      this.mainschemeid = 0;
      this.chartOptionsTESDivision.chart.height = '300';
    }
    this.TimeStatus = this.selectedTabIndex == 0 ? 'Live' : 'Timeover';
    var RPType = 'Division';
    // RPType=Total&divisionid=0&districtid=0&mainschemeid=0&TimeStatus=0
    this.api
      .GETTenderEvaluation(
        RPType,
        this.divisionid,
        this.himisDistrictid,
        this.mainSchemeID
      )
      .subscribe(
        (data: any) => {
          this.TenderEvaluationDivision = data;
          // console.log('API Response total:', this.WoIssuedTotal);
          // console.log('API Response data:', data);

          const id: string[] = [];
          const name: string[] = [];
          const nosWorks: any[] = [];
          const nosTender: number[] = [];
          const totalValuecr: number[] = [];
          const avgDaysSince: number[] = [];

          data.forEach(
            (item: {
              name: string;
              id: any;
              nosWorks: any;
              nosTender: number;
              totalValuecr: any;
              avgDaysSince: any;
            }) => {
              id.push(item.id);
              name.push(item.name);
              nosWorks.push(item.nosWorks);
              nosTender.push(item.nosTender);
              totalValuecr.push(item.totalValuecr);
              avgDaysSince.push(item.avgDaysSince);
            }
          );

          this.chartOptionsTESDivision.series = [
            {
              name: 'No. of Works',
              data: nosWorks,
              color: '#eeba0b',
            },
            {
              name: 'No. of Tender',
              data: nosTender,
              //  color: 'rgb(0, 143, 251)',
              color: '#6a6afd',
            },
            {
              name: 'Value(in Cr)',
              data: totalValuecr,
              color: 'rgba(93, 243, 174, 0.85)',
            },
            //  { name: 'Avg Days Since', data: avgDaysSince, color:' rgba(181, 7, 212, 0.85)' },
            // { name: 'Avg Days Since Opened Date', data: avgDaysSince,color:'rgba(250, 199, 161, 0.85)'},
          ];
          this.chartOptionsTESDivision.xaxis = { categories: name };
          this.chartOptionsTESDivision.title.text = `Division-wise Technical Evaluation: ${this.selectedName}`;
          this.cO = this.chartOptionsTESDivision;
          this.cdr.detectChanges();

          this.spinner.hide();
        },
        (error: any) => {
          console.error('Error fetching data', error);
        }
      );
  }
  GETTenderEvaluationScheme(): void {
    this.spinner.show();
    var roleName = localStorage.getItem('roleName');
    if (roleName == 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      var RPType = 'Division';
      this.chartOptionsTEScheme.chart.height = '200px';
      this.himisDistrictid = 0;
      this.mainschemeid = 0;
    } else if (roleName == 'Collector') {
      this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
      var RPType = 'District';
      this.divisionid = 0;
      this.mainschemeid = 0;
      this.chartOptionsTEScheme.chart.height = '400px';
    } else {
      this.divisionid = 0;
      this.himisDistrictid = 0;
      this.mainschemeid = 0;
      this.chartOptionsTEScheme.chart.height = '300';
    }
    this.TimeStatus = this.selectedTabIndex == 0 ? 'Live' : 'Timeover';
    // alert( this.TimeStatus)
    var RPType = 'Scheme';
    // RPType=Total&divisionid=0&districtid=0&mainschemeid=0&TimeStatus=0
    this.api
      .GETTenderEvaluation(
        RPType,
        this.divisionid,
        this.himisDistrictid,
        this.mainSchemeID
      )
      .subscribe(
        (data: any) => {
          this.TenderEvaluationScheme = data;
          // console.log('API Response total:', this.WoIssuedTotal);
          // console.log('API Response data:', data);

          const id: string[] = [];
          const name: string[] = [];
          const nosWorks: any[] = [];
          const nosTender: number[] = [];
          const totalValuecr: number[] = [];
          const avgDaysSince: number[] = [];

          data.forEach(
            (item: {
              name: string;
              id: any;
              nosWorks: any;
              nosTender: number;
              totalValuecr: any;
              avgDaysSince: any;
            }) => {
              id.push(item.id);
              name.push(item.name);
              nosWorks.push(item.nosWorks);
              nosTender.push(item.nosTender);
              totalValuecr.push(item.totalValuecr);
              avgDaysSince.push(item.avgDaysSince);
            }
          );

          this.chartOptionsTEScheme.series = [
            {
              name: 'No. of Works',
              data: nosWorks,
              color: '#eeba0b',
            },
            {
              name: 'No. of Tender',
              data: nosTender,
              //  color: 'rgb(0, 143, 251)',
              color: '#6a6afd',
            },
            {
              name: 'Value(in Cr)',
              data: totalValuecr,
              color: 'rgba(93, 243, 174, 0.85)',
            },
            //  { name: 'Avg Days Since', data: avgDaysSince, color:' rgba(181, 7, 212, 0.85)' },
            // { name: 'Avg Days Since Opened Date', data: avgDaysSince,color:'rgba(250, 199, 161, 0.85)'},
          ];
          this.chartOptionsTEScheme.xaxis = { categories: name };
          this.chartOptionsTEScheme.title.text = `Technical Evaluation Summary: ${this.selectedName}`;
          this.cO = this.chartOptionsTEScheme;
          this.cdr.detectChanges();

          this.spinner.hide();
        },
        (error: any) => {
          console.error('Error fetching data', error);
        }
      );
  }

  fetchDataBasedOnChartSelectionSchemeTenderE(
    mainSchemeId: any,
    seriesName: string
  ): void {
    //  console.log(`Selected ID: ${mainSchemeId}, Series: ${seriesName}`);
    const divisionID = 0;
    const distid = 0;
    const TimeStatus = 'Live';
    this.spinner.show();
    // getTenderDetails?divisionId=D1004&mainSchemeId=0&distid=0&TimeStatus=Live
    this.TimeStatus = this.selectedTabIndex == 0 ? 'Live' : 'Timeover';
    // alert(this.TimeStatus);
    this.api
      .GETTenderEvaluationDetails(divisionID, mainSchemeId, distid)
      .subscribe(
        (res) => {
          this.dispatchDataTenderE = res.map(
            (item: TenderEvaluationDetails, index: number) => ({
              ...item,
              sno: index + 1,
            })
          );
          //  console.log('res:', res);
          //  console.log('dispatchData=:', this.dispatchData);

          this.dataSourceTenderE.data = this.dispatchDataTenderE;
          this.dataSourceTenderE.paginator = this.paginatorTenderE;
          this.dataSourceTenderE.sort = this.sortTenderE;
          this.cdr.detectChanges();
          this.spinner.hide();
        },
        (error) => {
          console.error('Error fetching data', error);
        }
      );
    this.openDialogTE();
  }

  fetchDataBasedOnChartSelectionDivisionTenderE(
    divisionID: any,
    seriesName: string
  ): void {
    //  console.log(`Selected ID: ${divisionID}, Series: ${seriesName}`);
    const distid = 0;
    //  const mainSchemeId = 0;
    const TimeStatus = 'Live';
    this.spinner.show();
    // getTenderDetails?divisionId=D1004&mainSchemeId=0&distid=0&TimeStatus=Live
    this.TimeStatus = this.selectedTabIndex == 0 ? 'Live' : 'Timeover';
    // alert(this.TimeStatus);
    this.api
      .GETTenderEvaluationDetails(divisionID, this.mainSchemeID, distid)
      .subscribe(
        (res) => {
          this.dispatchDataTenderE = res.map(
            (item: TenderEvaluationDetails, index: number) => ({
              ...item,
              sno: index + 1,
            })
          );
          //  console.log('res:', res);
          //  console.log('dispatchData=:', this.dispatchData);
          this.dataSourceTenderE.data = this.dispatchDataTenderE;
          this.dataSourceTenderE.paginator = this.paginatorTenderE;
          this.dataSourceTenderE.sort = this.sortTenderE;
          this.cdr.detectChanges();
          this.spinner.hide();
        },
        (error) => {
          console.error('Error fetching data', error);
        }
      );
    this.openDialogTE();
  }

  applyTextFilterTE(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceTenderE.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceTenderE.paginator) {
      this.dataSourceTenderE.paginator.firstPage();
    }
  }
  exportToPDFTE() {
    const doc = new jsPDF('l', 'mm', 'a4');
    const columns = [
      { title: 'S.No', dataKey: 'sno' },
      { title: 'AS Letter No', dataKey: 'letterno' },
      { title: 'Head', dataKey: 'head' },
      { title: 'AS Date', dataKey: 'aA_RAA_Date' },
      { title: 'AS Amount', dataKey: 'asAmt' },
      { title: 'District', dataKey: 'district' },
      { title: 'Work ID', dataKey: 'work_id' },
      { title: 'Work Name', dataKey: 'workname' },
      { title: 'Start Dt', dataKey: 'startdt' },
      { title: 'End Dt', dataKey: 'enddt' },
      { title: 'NO of Calls', dataKey: 'noofcalls' },
      { title: 'NIT NO', dataKey: 'tenderno' },
      { title: 'Cover A Opened DT', dataKey: 'tOpnedDT' },
      { title: 'Cover B Opened DT', dataKey: 'topnedbdt' },
      { title: 'Days Since Cov A/B Opned', dataKey: 'daysSinceOpen' },
      { title: 'e-Procno', dataKey: 'eprocno' },
    ];
    const rows = this.dispatchDataTenderE.map((row) => ({
      sno: row.sno,
      letterNo: row.letterno,
      head: row.head,
      aA_RAA_Date: row.aA_RAA_Date,
      asAmt: row.asAmt,
      district: row.district,
      work_id: row.work_id,
      workname: row.workname,
      startdt: row.startdt,
      enddt: row.enddt,
      noofcalls: row.noofcalls,
      tenderno: row.tenderno,
      tOpnedDT: row.tOpnedDT,
      topnedbdt: row.topnedbdt,
      daysSinceOpen: row.daysSinceOpen,
      eprocno: row.eprocno,
    }));

    autoTable(doc, {
      columns: columns,
      body: rows,
      startY: 20,
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] },
    });

    doc.save('TechnicalEvaluation.pdf');
  }

  openDialogTE() {
    const dialogRef = this.dialog.open(this.itemDetailsModalTE, {
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
  // #endregion
  // #region Get APT data Work Order Pending

  initializeChartOptionsWOP() {
    
    this.chartOptionsWOPDivision = {
      series: [],
      chart: {
        type: 'bar',
        stacked: true,
        events: {
          dataPointSelection: (
            event,
            chartContext,
            { dataPointIndex, seriesIndex }
          ) => {
            if (dataPointIndex !== undefined && seriesIndex !== undefined) {
              const selectedCategory =
                this.chartOptionsWOPDivision?.xaxis?.categories?.[
                  dataPointIndex
                ];
              const selectedSeries =
                this.chartOptionsWOPDivision?.series?.[seriesIndex]?.name;

              if (selectedCategory && selectedSeries) {
                const apiData = this.wOpendingDivision;
                // console.log('datasch:', apiData);

                if (Array.isArray(apiData)) {
                  // const selectedData = apiData.find((data) =>
                  //   data.name.trim().toLowerCase() === selectedCategory.trim().toLowerCase()   );
                  const selectedData = apiData.find(
                    (data) => data.name === selectedCategory
                  );
                  // console.log("selectedData chart1",selectedData);

                  if (selectedData) {
                    const id = selectedData.id;
                    this.name = selectedData.name;
                    this.noofWorksGreater7Days =
                      selectedData.noofWorksGreater7Days;
                    this.fetchDataBasedOnChartSelectionDivisionWP( id, selectedSeries);
                    // this.fetchDataBasedOnChartSelectionmainSchemeWOP( id, selectedSeries);
                  } else {
                    console.error(
                      `No data found for selected category: ${selectedCategory}`
                    );
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
        // text: 'Division-wise Work Order Pending',
        // text: 'Scheme-wise Pending Work Order Pending',
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

    this.chartOptionsWOI = {
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
              const selectedCategory =
                this.chartOptionsWOI?.xaxis?.categories?.[dataPointIndex];
              const selectedSeries =
                this.chartOptionsWOI?.series?.[seriesIndex]?.name;

              if (selectedCategory && selectedSeries) {
                const apiData = this.WoIssuedTotal;
                // console.log('datasch:', apiData);

                if (Array.isArray(apiData)) {
                  // const selectedData = apiData.find((data) =>
                  //   data.name.trim().toLowerCase() === selectedCategory.trim().toLowerCase()   );
                  const selectedData = apiData.find(
                    (data) => data.name === selectedCategory
                  );
                  // console.log("selectedData chart1",selectedData);

                  if (selectedData) {
                    const id = selectedData.id;
                    this.name = selectedData.name;
                    this.totalWorks = selectedData.totalWorks;
                    this.fetchDataBasedOnChartSelectionTotalWOGD(
                      id,
                      selectedSeries
                    );
                  } else {
                    console.error(
                      `No data found for selected category: ${selectedCategory}`
                    );
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
        // text: 'Division-wise Work Order Issued',
        // text: 'RP Type Total Pending Works wise Progress',
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

  

  GetWOPendingTotal(): void {
    this.spinner.show();
    var roleName = localStorage.getItem('roleName');
    if (roleName == 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      this.chartOptionsWOPDivision.chart.height = '200px';
      this.himisDistrictid = 0;
    } else if (roleName == 'Collector') {
      this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
      this.divisionid = 0;
      this.chartOptionsWOPDivision.chart.height = '400px';
    } else {
      this.divisionid = 0;
      this.himisDistrictid = 0;
      this.chartOptionsWOPDivision.chart.height = 'auto';
    }
    var RPType = 'Total';
    // this.divisionid = this.divisionid == 0 ? 0 : this.divisionid;
    // ?RPType=Scheme&divisionid=0&districtid=0&fromdt=0&todt=0
    var fromdt = 0, todt = 0;
    this.api.WOPendingTotal(
        RPType,
        this.divisionid,
        this.himisDistrictid,
        this.mainSchemeID
      )
      .subscribe(
        // this.api.WOPendingTotal(RPType,this.divisionid,this.himisDistrictid,this.mainSchemeID).subscribe(
        (data: any) => {
          this.wOpendingDivision = data;
          const name: string[] = [];
          const id: string[] = [];
          const pendingWork: any[] = [];
          const contrctValuecr: number[] = [];
          const noofWorksGreater7Days: any[] = [];
          data.forEach(
            (item: {
              name: string;
              id: any;
              pendingWork: any;
              contrctValuecr: number;
              noofWorksGreater7Days: any;
            }) => {
              id.push(item.id);
              name.push(item.name);
              pendingWork.push(item.pendingWork);
              contrctValuecr.push(item.contrctValuecr);
              noofWorksGreater7Days.push(item.noofWorksGreater7Days);
            }
          );
          this.chartOptionsWOPDivision.series = [
            // {name: 'Total Pending Works', data: pendingWork,color:'#eeba0b'} ,
            { name: ' No of Works', data: pendingWork, color: '#eeba0b' },
            { name: 'Contact Value(in Cr)', data: contrctValuecr },
            // { name: 'Pending more than 7 Days', data: noofWorksGreater7Days, color: '#fc7c84' },
          ];

          this.chartOptionsWOPDivision.xaxis = { categories: name };
          this.chartOptionsWOPDivision.title.text = `Division-wise Work Order Pending: ${this.selectedName}`;
          this.cO = this.chartOptionsWOPDivision;
          this.cdr.detectChanges();

          this.spinner.hide();
        },
        (error: any) => {
          console.error('Error fetching data', error);
        }
      );
  }

  GetWOIssueTotal(): void {
    this.spinner.show();
    var roleName = localStorage.getItem('roleName');
    if (roleName == 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      this.chartOptionsWOI.chart.height = '200px';
      this.himisDistrictid = 0;
    } else if (roleName == 'Collector') {
      this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
      this.divisionid = 0;
      this.chartOptionsWOI.chart.height = '400px';
    } else {
      this.divisionid = 0;
      this.himisDistrictid = 0;
      this.chartOptionsWOI.chart.height = 'auto';
    }
    const startDate = this.dateRange2.value.start;
    const endDate = this.dateRange2.value.end;
    this.fromdt3 = startDate
      ? this.datePipe.transform(startDate, 'dd-MMM-yyyy')
      : '';
    this.todt3 = endDate ? this.datePipe.transform(endDate, 'dd-MMM-yyyy') : '';
    var RPType = 'Total';
    // console.log('fromdt=',this.fromdt,'todt=',this.todt)
    // this.divisionid = this.divisionid == 0 ? 0 : this.divisionid;
    // https://cgmsc.gov.in/HIMIS_APIN/api/WorkOrder/WorkOrderGenerated?RPType=Total&divisionid=0&districtid=0&fromdt=01-01-2024&todt=0
    if (this.fromdt3 && this.todt3) {
      this.api
        .GETWorkOrderGenerated(
          RPType,
          this.divisionid,
          this.himisDistrictid,
          this.fromdt3,
          this.todt3,
          this.mainSchemeID
        )
        .subscribe(
          (data: any) => {
            this.WoIssuedTotal = data;
            // console.log('WoIssuedTotal:', this.WoIssuedTotal);
            // console.log('API Response data:', data);
            const id: string[] = [];
            const name: string[] = [];
            const totalWorks: any[] = [];
            const totalTVC: number[] = [];
            const avgDaysSinceAcceptance: number[] = [];
            const zonalWorks: number[] = [];
            const tenderWorks: number[] = [];
            const totalZonalTVC: number[] = [];
            const totalNormalTVC: number[] = [];

            data.forEach(
              (item: {
                name: string;
                id: any;
                totalWorks: any;
                totalTVC: number;
                avgDaysSinceAcceptance: any;
                zonalWorks: any;
                tenderWorks: any;
                totalZonalTVC: any;
                totalNormalTVC: any;
              }) => {
                id.push(item.id);
                name.push(item.name);
                totalWorks.push(item.totalWorks);
                totalTVC.push(item.totalTVC);
                avgDaysSinceAcceptance.push(item.avgDaysSinceAcceptance);
                zonalWorks.push(item.zonalWorks);
                tenderWorks.push(item.tenderWorks);
                totalZonalTVC.push(item.totalZonalTVC);
                totalNormalTVC.push(item.totalNormalTVC);
              }
            );

            this.chartOptionsWOI.series = [
              {
                name: 'No of Works',
                data: totalWorks,
                color: '#eeba0b',
              },
              {
                name: 'Contract Value (in Cr)',
                data: totalTVC,
                color: 'rgba(93, 243, 174, 0.85)',
              },
              // {
              //   name: 'Avg Days Since Acceptance',
              //   data: avgDaysSinceAcceptance,
              //   color:  'rgba(250, 199, 161, 0.85)',
              // },
            ];
            this.chartOptionsWOI.xaxis = { categories: name };
            this.chartOptionsWOI.title.text = `Division-wise Work Order Issued: ${this.selectedName}`;
            this.cO = this.chartOptionsWOI;
            this.cdr.detectChanges();

            this.spinner.hide();
          },
          (error: any) => {
            console.error('Error fetching data', error);
          }
        );
    }
  }
  fetchDataBasedOnChartSelectionTotalWOGD(
    divisionID: any,
    seriesName: string
  ): void {
    ;
    console.log(`Selected ID 11: ${divisionID}, Series: ${seriesName}`);
    const distid = 0;
    // const mainSchemeId = 0;
    const contractid = 0;
    const work_id = 0;
    // const fromdt="01-jan-2024";
    // const todt="01-jan-2025";
    //     this.fromdt = startDate ? this.datePipe.transform(startDate, 'dd-MMM-yyyy') : '';
    // this.todt  = endDate ? this.datePipe.transform(endDate, 'dd-MMM-yyyy') : '';
    this.spinner.show();
    // divisionId: any,mainSchemeId:any,distid: any,work_id:any,fromdt: any,todt: any
    this.api
      .GETWorkGenDetails(
        divisionID,
        this.mainSchemeID,
        distid,
        work_id,
        this.fromdt,
        this.todt
      )
      .subscribe(
        (res) => {
          this.dispatchWOGD = res.map(
            (item: WorkGenDetails, index: number) => ({
              ...item,
              sno: index + 1,
            })
          );
          // console.log('res:', res);
          this.dataSourceWOGD.data = this.dispatchWOGD;
          this.dataSourceWOGD.paginator = this.paginatorWGD;
          this.dataSourceWOGD.sort = this.sortWGD;
          this.cdr.detectChanges();
          this.spinner.hide();
        },
        (error) => {
          console.error('Error fetching data', error);
        }
      );
    this.openDialogWOGD();
  }
  fetchDataBasedOnChartSelectionDivisionWP(
    divisionID: any,
    seriesName: string
  ): void {
    ;
    console.log(`Selected ID2: ${divisionID}, Series: ${seriesName}`);
    const distid = 0;
    // const mainSchemeId=0;
    const contractid = 0;
    this.spinner.show();

    this.api.GetWorkOrderPendingDetailsNew(
        divisionID,
        this.mainSchemeID,
        distid,
        contractid
      )
      .subscribe(
        (res) => {
          this.dispatchDataWOP = res.map(
            (item: WorkOrderPendingDetailsNew, index: number) => ({
              ...item,
              sno: index + 1,
            })
          );
          // @ViewChild('paginatorWOP') paginatorWOP!: MatPaginator;
          // @ViewChild('sortWOP') sortWOP!: MatSort;
          // @ViewChild('itemDetailsModalWOP') itemDetailsModalWOP: any;

          this.dataSourceWorkP.data = this.dispatchDataWOP;
          this.dataSourceWorkP.paginator = this.paginatorWOP;
          this.dataSourceWorkP.sort = this.sortWOP;
          this.cdr.detectChanges();
          this.spinner.hide();
        },
        (error) => {
          console.error('Error fetching data', error);
        }
      );
    this.openDialogWOP();
  }

  // data filter
  applyTextFilterWOP(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceWorkP.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceWorkP.paginator) {
      this.dataSourceWorkP.paginator.firstPage();
    }
  }
  exportToPDFWOP() {
    const doc = new jsPDF('l', 'mm', 'a4');
    const columns = [
      // ['sno','letterNo', 'head','acceptLetterDT','totalAmountOfContract','district','work','contractorNAme','work_id',];
      { title: 'S.No', dataKey: 'sno' },
      { title: 'letterNo', dataKey: 'letterNo' },
      { title: 'head', dataKey: 'head' },
      { title: 'acceptLetterDT', dataKey: 'acceptLetterDT' },
      { title: 'totalAmountOfContract', dataKey: 'totalAmountOfContract' },
      { title: 'district', dataKey: 'district' },
      { title: 'work', dataKey: 'work' },
      { title: 'contractorNAme', dataKey: 'contractorNAme' },
      { title: 'work_id', dataKey: 'work_id' },
    ];
    const rows = this.dispatchDataWOP.map((row) => ({
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
      headStyles: { fillColor: [22, 160, 133] },
    });

    doc.save('WorkOrderPending.pdf');
  }
  // mat-dialog box
  openDialogWOP() {
    const dialogRef = this.dialog.open(this.itemDetailsModalWOP, {
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
  applyTextFilterWGD(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceWOGD.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceWOGD.paginator) {
      this.dataSourceWOGD.paginator.firstPage();
    }
  }
  exportToPDFWGD() {
    const doc = new jsPDF('l', 'mm', 'a4');
    const columns = [
      // ['sno','letterNo', 'head','acceptLetterDT','totalAmountOfContract','district','work','contractorNAme','work_id',];
      { title: 'S.No', dataKey: 'sno' },
      { title: 'letterNo', dataKey: 'letterNo' },
      { title: 'head', dataKey: 'head' },
      { title: 'acceptLetterDT', dataKey: 'acceptLetterDT' },
      { title: 'totalAmountOfContract', dataKey: 'totalAmountOfContract' },
      { title: 'district', dataKey: 'district' },
      { title: 'work', dataKey: 'work' },
      { title: 'contractorNAme', dataKey: 'contractorNAme' },
      { title: 'work_id', dataKey: 'work_id' },
    ];
    const rows = this.dispatchWOGD.map((row) => ({
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
      headStyles: { fillColor: [22, 160, 133] },
    });

    doc.save('WorkOrderIssued.pdf');
  }
  openDialogWOGD() {
    const dialogRef = this.dialog.open(this.itemDetailsModalWOGD, {
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
  // #endregion

  // #region Get APT data Land Issuance
  initializeChartOptionsLI() {
    this.chartOptionsLITotal = {
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
            const selectedCategory =
              this.chartOptionsLITotal?.xaxis?.categories?.[dataPointIndex]; // This is likely just the category name (a string)
            const selectedSeries =
              this.chartOptionsLITotal?.series?.[seriesIndex]?.name;
            // Ensure the selectedCategory and selectedSeries are valid
            if (selectedCategory && selectedSeries) {
              const apiData = this.LIPendingTotalData; // Replace with the actual data source or API response
              // Find the data in your API response that matches the selectedCategory
              const selectedData = apiData.find(
                (data) => data.name === selectedCategory
              );
              // console.log("selectedData chart1",selectedData)
              if (selectedData) {
                const id = selectedData.id; // Extract the id from the matching entry
                this.name = selectedData.name;
                this.totalWorks = selectedData.totalWorks;
                this.fetchDataBasedOnChartSelectionTotalLI(id, selectedSeries);
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
        // text: 'Land Issue Overview',
        // text: `Overview of Land Issue: ${this.selectedName}`,
        // text: 'Land Issuance Overview',
        // text: 'RP Type Total Pending Works wise Progress',
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
   
    this.chartOptionsLIDistrict = {
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
              const selectedCategory =
                this.chartOptionsLIDistrict?.xaxis?.categories?.[
                  dataPointIndex
                ];
              const selectedSeries =
                this.chartOptionsLIDistrict?.series?.[seriesIndex]?.name;

              if (selectedCategory && selectedSeries) {
                const apiData = this.LIPendingDistrictData;
                // console.log('datasch:', apiData);

                if (Array.isArray(apiData)) {
                  const selectedData = apiData.find(
                    (data) => data.name === selectedCategory
                  );
                  // console.log("selectedData chart1",selectedData);
                  if (selectedData) {
                    const id = selectedData.id;
                    this.name = selectedData.name;
                    this.totalWorks = selectedData.totalWorks;
                    this.fetchDataBasedOnChartSelectionDistrictLI(
                      id,
                      selectedSeries
                    );
                  } else {
                    console.error(
                      `No data found for selected category: ${selectedCategory}`
                    );
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
        // text: 'District-wise Land Issuance',
        // text: 'RP Type Total Pending Works wise Progress',
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
  LIPendingTotal(): void {
    var roleName = localStorage.getItem('roleName');
    // alert( roleName )
    if (roleName == 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      this.chartOptionsLITotal.chart.height = '200px';
      this.districtid = 0;
    } else if (roleName == 'Collector') {
      this.districtid = sessionStorage.getItem('himisDistrictid');
      this.chartOptionsLITotal.chart.height = '400px';
      this.divisionid = 0;
    } else {
      this.districtid = 0;
      this.divisionid = 0;
      this.chartOptionsLITotal.chart.height = '400';
    }
    const RPtype = 'Total';
    this.spinner.show();

    this.api
      .GetLIPendingTotal(
        RPtype,
        this.divisionid,
        this.districtid,
        this.mainSchemeID
      )
      .subscribe(
        (data: any) => {
          if (Array.isArray(data) && data.length > 0) {
            this.LIPendingTotalData = data;
            const name: string[] = [];
            const totalWorks: any[] = [];
            const valuecr: number[] = [];
            const tvcValuecr: any[] = [];
            const month2Above: any[] = [];
            const woIssued: any[] = [];

            data.forEach((item: any) => {
              if (item) {
                name.push(item.name ?? '');
                totalWorks.push(item.totalWorks ?? 0);
                valuecr.push(item.valuecr ?? 0);
                tvcValuecr.push(item.tvcValuecr ?? 0);
                month2Above.push(item.month2Above ?? 0);
                woIssued.push(item.woIssued ?? 0);
              }
            });

            if (name.length > 0) {
              this.chartOptionsLITotal.series = [
                { name: 'No. of Works', data: totalWorks, color: '#eeba0b' },
                { name: 'Value of Work (In cr)', data: valuecr },
                // { name: 'Contrct value(In cr)', data: tvcValuecr, color: '#6a6afd' },
                { name: 'Work Order Issued', data: woIssued, color: '#6a6afd' },
                {
                  name: 'Land Issue > 2 Month',
                  data: month2Above,
                  color: 'rgb(255, 69, 96)',
                },
              ];
              this.chartOptionsLITotal.title.text = `Overview of Land Issue: ${this.selectedName}`;
              // text: `Overview of Land Issue: ${this.selectedName}`;
              this.chartOptionsLITotal.xaxis = { categories: name };

              // text: `Overview of Land Issue: ${this.selectedName || ''}`,
              this.cdr.detectChanges(); // Trigger view update
            }
          } else {
            console.warn('API returned empty or invalid data');
          }

          this.spinner.hide();
        },
        (error: any) => {
          console.error('Error fetching data', error);
          this.spinner.hide();
        }
      );
  }

  LOPendingDistrict(): void {
    this.spinner.show();
    var roleName = localStorage.getItem('roleName');
    if (roleName == 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      this.chartOptionsLIDistrict.chart.height = '500px';
      this.districtid = 0;
    } else if (roleName == 'Collector') {
      this.districtid = sessionStorage.getItem('himisDistrictid');
      this.chartOptionsLIDistrict.chart.height = '200px';
      this.divisionid = 0;
    } else {
      this.districtid = 0;
      this.divisionid = 0;
      this.chartOptionsLIDistrict.chart.height = '800';
    }
    const RPtype = 'District';
    this.api
      .GetLIPendingTotal(
        RPtype,
        this.divisionid,
        this.districtid,
        this.mainSchemeID
      )
      .subscribe(
        (data: any) => {
          if (Array.isArray(data) && data.length > 0) {
            this.LIPendingDistrictData = data;
            // console.log('LIPendingDistrictData', this.LIPendingDistrictData);
            const name: string[] = [];
            const totalWorks: any[] = [];
            const valuecr: number[] = [];
            const tvcValuecr: any[] = [];
            const month2Above: any[] = [];
            const woIssued: any[] = [];

            data.forEach((item: any) => {
              if (item) {
                name.push(item.name ?? '');
                totalWorks.push(item.totalWorks ?? 0);
                valuecr.push(item.valuecr ?? 0);
                tvcValuecr.push(item.tvcValuecr ?? 0);
                month2Above.push(item.month2Above ?? 0);
                woIssued.push(item.woIssued ?? 0);
              }
            });

            if (name.length > 0) {
              this.chartOptionsLIDistrict.series = [
                // { name: 'Total Pending Works', data: totalWorks, color: '#eeba0b' },
                // { name: 'Value cr', data: valuecr },
                // { name: 'TVC Value cr', data: tvcValuecr, color: 'rgb(0, 143, 251)' },
                // { name: 'Month 2 Above', data: month2Above },
                // { name: 'Wo Issued', data: woIssued, color: 'rgb(0, 143, 251)' },
                { name: 'No. of Works', data: totalWorks, color: '#eeba0b' },
                { name: 'Value of Work (In cr)', data: valuecr },
                // { name: 'Contrct value(In cr)', data: tvcValuecr, color: '#6a6afd' },
                { name: 'Work Order Issued', data: woIssued, color: '#6a6afd' },
                {
                  name: 'Land Issue > 2 Month',
                  data: month2Above,
                  color: 'rgb(255, 69, 96)',
                },
              ];
             
              this.chartOptionsLIDistrict.xaxis = { categories: name };
              this.chartOptionsLIDistrict.title.text = `District-wise Land Issue: ${this.selectedName}`;
              this.cdr.detectChanges(); // Trigger view update
            }
          } else {
            console.warn('API returned empty or invalid data');
          }

          this.spinner.hide();
        },
        (error: any) => {
          console.error('Error fetching data', error);
          this.spinner.hide();
        }
      );
  }
  fetchDataBasedOnChartSelectionTotalLI(
    divisionID: any,
    seriesName: string
  ): void {
    console.log(`Selected ID: ${divisionID}, Series: ${seriesName}`);
    const distid = 0;
    // const mainSchemeId = 0;
    // var roleName = localStorage.getItem('roleName');
    // if (roleName == 'Division') {
    //   this.chartOptions.chart.height = '50px';
    //   alert("divi")
    //   // this.divisionid = sessionStorage.getItem('divisionID');
    // } else {
    //       this.chartOptions.chart.height ='1500';
    //      }
    this.spinner.show();
    this.api
      .GetLandIssueDetails(divisionID, this.mainSchemeID, distid)
      .subscribe(
        (res) => {
          this.dispatchPendingsLI = res.map((item: any, index: any) => ({
            ...item,
            sno: index + 1,
          }));
          this.dataSourceLI.data = this.dispatchPendingsLI;
          this.dataSourceLI.paginator = this.paginatorLI;
          this.dataSourceLI.sort = this.sortLI;
          // console.log(' this.dataSource.data =', this.dataSource.data );
          // console.log('this.dataSource1.paginator ', this.paginator );
          // console.log(' this.dataSource.sort', this.sort );

          this.cdr.detectChanges();
          this.spinner.hide();
        },
        (error) => {
          console.error('Error fetching data', error);
        }
      );
    this.openDialogLI();
  }
  fetchDataBasedOnChartSelectionDistrictLI(
    distid: any,
    seriesName: string
  ): void {
    // const mainSchemeId = 0;
    const roleName = localStorage.getItem('roleName');
    this.divisionid =
      roleName === 'Division' ? sessionStorage.getItem('divisionID') : 0;

    this.spinner.show();
    this.api
      .GetLandIssueDetails(this.divisionid, this.mainSchemeID, distid)
      .subscribe(
        (res) => {
          this.dispatchPendingsLI = res.map((item: any, index: any) => ({
            ...item,
            sno: index + 1,
          }));
          this.dataSourceLI.data = this.dispatchPendingsLI;
          this.dataSourceLI.paginator = this.paginatorLI;
          this.dataSourceLI.sort = this.sortLI;
          // console.log(' this.dataSource.data =', this.dataSource.data );
          // console.log('this.dataSource1.paginator ', this.paginator );
          // console.log(' this.dataSource.sort', this.sort );

          this.cdr.detectChanges();
          this.spinner.hide();
        },
        (error) => {
          console.error('Error fetching data', error);
        }
      );
    this.openDialogLI();
  }

  // data filter
  applyTextFilterLI(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceLI.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceLI.paginator) {
      this.dataSourceLI.paginator.firstPage();
    }
  }
  exportToPDFLI() {
    const doc = new jsPDF('l', 'mm', 'a4');
    const columns = [
      { title: 'S.No', dataKey: 'sno' },
      { title: 'letterNo', dataKey: 'letterNo' },
      { title: 'head', dataKey: 'head' },
      { title: 'acceptLetterDT', dataKey: 'acceptLetterDT' },
      { title: 'totalAmountOfContract', dataKey: 'totalAmountOfContract' },
      { title: 'district', dataKey: 'district' },
      { title: 'work', dataKey: 'work' },
      { title: 'contractorNAme', dataKey: 'contractorNAme' },
      { title: 'work_id', dataKey: 'work_id' },
    ];
    const rows = this.dispatchPendingsLI.map((row) => ({
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
      headStyles: { fillColor: [22, 160, 133] },
    });

    doc.save('LandIssued.pdf');
  }
  // mat-dialog box
  openDialogLI() {
    const dialogRef = this.dialog.open(this.itemDetailsModalLI, {
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

  // #endregion
  // #region Get APT data To be tender
  initializeChartOptionsTobeTender() {
    this.chartOptionsTbetender = {
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
              this.chartOptionsTbetender?.xaxis?.categories?.[dataPointIndex]; // This is likely just the category name (a string)
            const selectedSeries =
              this.chartOptionsTbetender?.series?.[seriesIndex]?.name;
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
          columnWidth: '20%',
          borderRadius: 5,
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
        width: 5,
        // colors: ['#000'],
        colors: ['#fff'],
      },
      title: {
        // text: 'Summary of To be Tender Works',
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
      this.chartOptionsTbetender.chart.height = '200px';
      this.himisDistrictid = 0;
      this.mainschemeid = 0;
    } else if (roleName == 'Collector') {
      this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
      // var RPType = 'GTotal';
      this.divisionid = 0;
      this.mainschemeid = 0;
      this.chartOptionsTbetender.chart.height = '400px';
    } else {
      this.divisionid = 0;
      this.himisDistrictid = 0;
      this.mainschemeid = 0;
      this.chartOptionsTbetender.chart.height = '300';
    }
    // alert(this.mainSchemeID)
    this.api
      .GETTenderStatus(
        'GTotal',
        this.divisionid,
        this.himisDistrictid,
        this.mainSchemeID
      )
      // .GETTenderStatus('GTotal',this.divisionid, this.himisDistrictid, this.mainschemeid)
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

          this.chartOptionsTbetender.series = [
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
          this.chartOptionsTbetender.xaxis = { categories: name };
          this.chartOptionsTbetender.title.text = `Summary of To be Tender Works : ${this.selectedName}`;
          this.cO = this.chartOptionsTbetender;
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
