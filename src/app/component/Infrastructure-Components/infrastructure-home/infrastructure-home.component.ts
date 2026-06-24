import { CommonModule, NgFor, NgStyle, Location } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import {
  ASFile, DashProgressCount, DetailProgressTinP, DistrictNameDME, TotalWorksAbstract,
  DMEProgressSummary, GetDistrict, LandIssue_RetToDeptDetatails, MainScheme,
  TenderInProcess, WORunningHandDetails
} from 'src/app/Model/DashProgressCount';
import { ApiService } from 'src/app/service/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexPlotOptions, ApexXAxis, ApexYAxis,
  ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexFill, ApexLegend, ChartComponent, NgApexchartsModule
} from 'ng-apexcharts';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatMenuModule } from '@angular/material/menu';
import { InsertUserPageViewLogmodal } from 'src/app/Model/DashLoginDDL';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { DropdownModule } from 'primeng/dropdown';

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
    NgApexchartsModule, MatSortModule, MatPaginatorModule, MatTableModule,
    MatTableExporterModule, MatDialogModule, MatMenuModule, NgSelectModule, FormsModule, SelectDropDownModule, DropdownModule,
  ],
  templateUrl: './infrastructure-home.component.html',
  styleUrl: './infrastructure-home.component.css'
})
export class InfrastructureHomeComponent implements OnInit {
  mainscheme: MainScheme[] = [];
  districtData: DashProgressCount[] = [];
  DMEprogresssummary: DMEProgressSummary[] = [];
  DistrictNameDMEData: DistrictNameDME[] = [];
  originalData: DashProgressCount[] = [];
  GetDistrict: GetDistrict[] = [];
  totalNosWorks: number = 0;
  selectedTabIndex: number = 0;
  distid: any = 0;

  divisionid: any = 0;
  mainSchemeID = 0;
  id: any;
  buid = 0;
  selectedDistrict: any | null = null;
  name: any;
  isall: boolean = true;
  show: boolean = false;
  hide: boolean = false;
  public showCards: boolean = true;
  public showDivision: boolean = true;
  public showDistrict: boolean = true;
  distname: any;
  formdate: any;
  todate: any;

  public showCardss: boolean = false;
  cardOrder: string[] = [
    "Completed/Handover",
    "Running Work",
    "Acceptance/Work Order Generated",
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
  budgetOptions = [
    { buid: 0, label: 'All', value: 'All' },
    { buid: 1, label: 'Above 2 Cr', value: 'above_2_cr' },
    { buid: 2, label: '>=50 lacs & <2 cr', value: '50_lacs_to_2_cr' },
    { buid: 3, label: '>=20 lacs & <50 lacs', value: '20_lacs_to_50_lacs' },
    { buid: 4, label: 'Below 20 Lacs', value: 'below_20_lacs' },
  ];

  dataSource!: MatTableDataSource<WORunningHandDetails>;
  dataSourceCom_Han!: MatTableDataSource<WORunningHandDetails>;
  dataSourceRun_Work!: MatTableDataSource<WORunningHandDetails>;
  dataSource1!: MatTableDataSource<LandIssue_RetToDeptDetatails>;
  dataSourceLand_isu!: MatTableDataSource<LandIssue_RetToDeptDetatails>;
  dataSource2!: MatTableDataSource<DetailProgressTinP>;
  dataSource3!: MatTableDataSource<TenderInProcess>;
  dataSource4!: MatTableDataSource<TotalWorksAbstract>;

  @ViewChild('openimages') openimages: any;
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
  ASFileData: ASFile[] = [];
  InsertUserPageViewLogdata: InsertUserPageViewLogmodal = new InsertUserPageViewLogmodal();

  @ViewChild('chart') chart: ChartComponent | undefined;
  public cO: Partial<ChartOptions> | undefined;
  whidMap: { [key: string]: number } = {};
  chartOptions!: ChartOptions;
  selectedName: any;
  himisDistrictid: any;
  divid: any;
  roleName: any;
  contractorid = 0;
  dashname: any;
  nosworks: any;
  ASAmount = 0;
  pageName: string = '';
  fullUrl: string = '';

  completedWorks: number = 0;
  returnWorks: number = 0;
  remainingWorks: number = 0;
  tenderInProcess: number = 0;
  acceptanceGenerated: number = 0;
  workOrderGenerated: number = 0;
  landDispute: number = 0;
  runningWork: number = 0;
  toBeTender: number = 0;
  appliedZonal: number = 0;
  zonalPermission: number = 0;
  cancellation: number = 0;

  readonly baseImageUrl = 'https://cgmsc.gov.in/himisr/ProgressImages/';
  selectedWork: any;
  imageUrls: string[] = [];

  constructor(
    public api: ApiService,
    public spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private location: Location
  ) {
    this.pageName = this.location.path();
    this.fullUrl = window.location.href;
    this.dataSource = new MatTableDataSource<WORunningHandDetails>([]);
    this.dataSourceCom_Han = new MatTableDataSource<WORunningHandDetails>([]);
    this.dataSourceRun_Work = new MatTableDataSource<WORunningHandDetails>([]);
    this.dataSource1 = new MatTableDataSource<LandIssue_RetToDeptDetatails>([]);
    this.dataSourceLand_isu = new MatTableDataSource<LandIssue_RetToDeptDetatails>([]);
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
    this.GetDistricts();
    this.getDistrictNameDME();
    this.getmain_scheme();
    this.InsertUserPageViewLog();
  }

  loadInitialData() {
    // debugger
    this.spinner.show();
    var formdate = this.formdate ? this.formdate : 0;
    var todate = this.todate ? this.todate : 0;

    this.divisionid = this.divisionid == 0 ? 0 : this.divisionid;
    this.himisDistrictid = this.himisDistrictid == 0 ? 0 : this.himisDistrictid;
    
    var mainSchemeId = 0;
    var ASID = 0;
    var GrantID = 0;

    this.api.DashProgressCount(this.divisionid, mainSchemeId, this.himisDistrictid, ASID, GrantID, this.ASAmount, formdate, todate).subscribe(
      (res: any) => {
        this.originalData = this.sortDistrictData(res);
        this.districtData = [...this.originalData];
        this.calculateTotalNosWorks();
        this.bindDashboardData();
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        console.error('API Error:', error);
      }
    );
  }

  selectedTabValue(event: any): void {
    // debugger
    this.selectedTabIndex = event.index;
    if (this.selectedTabIndex === 0) {
      this.districtData = [...this.originalData];
      this.divisionid=0;
      this.himisDistrictid=0;
      this.ASAmount=0,
      this.loadInitialData();

      this.showCards = true;
    } else {
      this.showCards = false;
    }
  }

  DashProgressCount() {
    try {
      this.spinner.show();
      var roleName = localStorage.getItem('roleName');
      if (roleName == 'Division') {
        this.divisionid = sessionStorage.getItem('divisionID');
        this.showDivision = false;
      } else if (roleName == 'Collector') {
        this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
        if (this.distid != 0) {
          this.himisDistrictid = this.distid;
        }
      }
      
      if (this.selectedTabIndex === 1) {
        this.himisDistrictid = 0;
      }
      
      var ASID = 0;
      var GrantID = 0;
      this.divisionid = this.divisionid == 0 ? 0 : this.divisionid;
      this.mainSchemeID = this.mainSchemeID == 0 ? 0 : this.mainSchemeID;
      this.himisDistrictid = this.himisDistrictid == 0 ? 0 : this.himisDistrictid;

      var formdate = this.formdate ? this.formdate : 0;
      var todate = this.todate ? this.todate : 0;

      this.api.DashProgressCount(this.divisionid, this.mainSchemeID, this.himisDistrictid, ASID, GrantID, this.ASAmount, formdate, todate).subscribe(
        (res: any) => {
          if (this.selectedTabIndex === 0) {
            this.districtData = [...this.originalData];
            if (this.mainSchemeID !== 0) {
              this.districtData = this.sortDistrictData(res);
            } else {
              this.districtData = this.sortDistrictData(res);
            }
          } else {
            this.districtData = res;
            this.districtData = this.sortDistrictData(res);
          }

          this.calculateTotalNosWorks();
          this.bindDashboardData();
          this.spinner.hide();
        },
        (error) => {
          this.spinner.hide();
          console.error('API Error:', error);
        }
      );
    } catch (ex: any) {
      console.error('Exception:', ex.message);
    }
  }

  onButtonClick(name: string, id: any): void {
    this.showCards = true;
    this.divid = id;
    this.show = true;
    this.divisionid = id;
    this.distid = 0;
    this.name = name;
    this.selectedDistrict = id;
    this.hide = this.selectedName != null;
    this.DashProgressCount();
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
    if (did == 1001) return '#FFC0CB';
    else if (did == 2001) return '#faf557';
    else if (did == 3001) return '#FF8C00';
    else if (did == 4001) return '#62f562';
    else if (did == 5001) return '#e7fa57';
    else if (did == 6001) return '#fa5795';
    else if (did == 7001) return '#FFA500';
    else if (did == 8001) return '#9E9E9E';
    else return '#9E9E9E';
  }

  getIcon(did: any) {
    switch (did) {
      case 1001: return 'notifications_active';
      case 2001: return 'gavel';
      case 3001: return 'import_contacts';
      case 4001: return 'playlist_add_check';
      case 5001: return 'trending_up';
      case 6001: return 'error';
      case 8001: return 'delete_forever';
      default: return 'help';
    }
  }

  GetDMEProgressSummary() {
    this.spinner.show();
    this.showCards = false;
    this.showCardss = true;
    this.chartOptions = {
      series: [],
      chart: { type: 'bar', stacked: true, height: 'auto', events: {} },
      plotOptions: { bar: { horizontal: true } },
      xaxis: { categories: [] },
      yaxis: { title: { text: undefined } },
      dataLabels: { enabled: true, style: { colors: ['#000'] } },
      stroke: { width: 1, colors: ['#fff'] },
      title: { text: 'MedicalCollege Wise work Progress', align: 'center', style: { fontSize: '12px', color: '#6e0d25' } },
      tooltip: { y: { formatter: function (val: any) { return val.toString(); } } },
      fill: { opacity: 1 },
      legend: { position: 'top', horizontalAlign: 'center', offsetX: 40 },
    };
    this.loadData();
    this.spinner.hide();
  }

  loadData(): void {
    var roleName = localStorage.getItem('roleName');
    if (roleName == 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
    } else if (roleName == 'Collector') {
      const Districtid = sessionStorage.getItem('himisDistrictid');
      this.distid = Districtid;
    } else {
      this.divisionid = 0;
      this.mainSchemeID = 0;
    }

    this.spinner.show();
    this.api.DMEProgressSummary(this.divisionid, this.mainSchemeID, this.distid, 0).subscribe(
      (data: any) => {
        this.DMEprogresssummary = data;
        const districtname: string[] = [];
        const accWorkOrder3001: number[] = [];
        const completed4001: number[] = [];
        const tenderProcess2001: number[] = [];
        const running5001: number[] = [];
        const landIssue6001: number[] = [];
        const toBeTender1001: number[] = [];
        const retunDept8001: number[] = [];
        const total: number[] = [];
        this.whidMap = {};

        data.forEach((item: any) => {
          districtname.push(item.districtname);
          accWorkOrder3001.push(item.accWorkOrder3001);
          completed4001.push(item.completed4001);
          tenderProcess2001.push(item.tenderProcess2001);
          running5001.push(item.running5001);
          landIssue6001.push(item.landIssue6001);
          retunDept8001.push(item.retunDept8001);
          toBeTender1001.push(item.toBeTender1001);
          total.push(item.total);

          if (item.districtname && item.district_ID) {
            this.whidMap[item.districtname] = item.district_ID;
          }
        });

        this.chartOptions.series = [
          { name: 'Total Works', data: total, color: '#0000FF' },
          { name: 'Completed/Handover', data: completed4001, color: 'rgb(0, 128, 0)' },
          { name: 'Running Work', data: running5001, color: 'rgb(144, 238, 144)' },
          { name: 'Acceptance/Work Order', data: accWorkOrder3001, color: 'rgb(173, 216, 230)' },
          { name: 'land Issue', data: landIssue6001, color: 'rgb(255, 0, 0)' },
          { name: 'Tender in Process', data: tenderProcess2001, color: 'rgb(255, 140, 0)' },
          { name: 'To be Tender', data: toBeTender1001, color: 'rgb(255, 192, 203)' }
        ];

        this.chartOptions.xaxis = { categories: districtname };
        this.cO = this.chartOptions;
        this.cdr.detectChanges();
        this.spinner.hide();
      },
      (error: any) => {
        this.spinner.hide();
        console.error('Error fetching data', error);
      }
    );
  }

  TotalWorksAbstract() {
    this.spinner.show();
    this.roleName = localStorage.getItem('roleName');
    if (this.roleName == 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      this.showDivision = false;
    } else if (this.roleName == 'Collector') {
      this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
      if (this.distid != 0) {
        this.himisDistrictid = this.distid;
      }
    }
    const contractorid = 0;
    this.divisionid = this.divisionid == 0 ? 0 : this.divisionid;
    this.mainSchemeID = this.mainSchemeID == 0 ? 0 : this.mainSchemeID;
    this.himisDistrictid = this.himisDistrictid == 0 ? 0 : this.himisDistrictid;
    
    var formdate = this.formdate ? this.formdate : 0;
    var todate = this.todate ? this.todate : 0;

    this.api.GET_TotalWorksAbstract(this.divisionid, this.himisDistrictid, this.mainSchemeID, contractorid, this.ASAmount, formdate, todate)
      .subscribe(
        (res) => {
          this.dispatchData4 = res.map((item: TotalWorksAbstract, index: number) => ({
            ...item,
            sno: index + 1,
          }));
          this.dataSource4.data = this.dispatchData4;
          this.dataSource4.paginator = this.paginatorTW;
          this.dataSource4.sort = this.sortTW;
          this.cdr.detectChanges();
          this.spinner.hide();
        },
        (error) => {
          this.spinner.hide();
          console.error(`API Error:: ${error.message}`);
        }
      );
    this.openDialogTW();
  }

  DetailProgress(did: any, dashname: any, nosworks: any): void {
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
      }
    }

    let formdate = this.formdate || 0;
    let todate = this.todate || 0;

    this.divisionid = this.divisionid == 0 ? 0 : this.divisionid;
    this.mainSchemeID = this.mainSchemeID == 0 ? 0 : this.mainSchemeID;
    this.himisDistrictid = this.himisDistrictid == 0 ? 0 : this.himisDistrictid;

    if (did == 1001) {
      let isbelow20 = "N";
      this.api.GETTobeTenderAll(did, this.divisionid, this.himisDistrictid, this.mainSchemeID, this.ASAmount, isbelow20, formdate, todate)
        .subscribe(
          (res) => {
            this.dispatchData2 = res.map((item: DetailProgressTinP, index: number) => ({ ...item, sno: index + 1 }));
            this.dataSource2.data = this.dispatchData2;
            this.dataSource2.paginator = this.paginator2;
            this.dataSource2.sort = this.sort2;
            this.cdr.detectChanges();
            this.spinner.hide();
          },
          (error) => {
            this.spinner.hide();
            console.error(`API Error:: ${error.message}`);
          }
        );
      this.openDialog2();
    } else if (did == 3003) {
      let isbelow20 = "NA";
      this.api.GETTobeTenderAll(did, this.divisionid, this.himisDistrictid, this.mainSchemeID, this.ASAmount, isbelow20, formdate, todate)
        .subscribe(
          (res) => {
            this.dispatchData2 = res.map((item: DetailProgressTinP, index: number) => ({ ...item, sno: index + 1 }));
            this.dataSource2.data = this.dispatchData2;
            this.dataSource2.paginator = this.paginator2;
            this.dataSource2.sort = this.sort2;
            this.cdr.detectChanges();
            this.spinner.hide();
          },
          (error) => {
            this.spinner.hide();
            console.error(`API Error:: ${error.message}`);
          }
        );
      this.openDialog2();
    } else if (did == 1002) {
      let isbelow20 = "Y";
      this.api.GETTobeTenderAll(1001, this.divisionid, this.himisDistrictid, this.mainSchemeID, this.ASAmount, isbelow20, formdate, todate)
        .subscribe(
          (res) => {
            this.dispatchData2 = res.map((item: DetailProgressTinP, index: number) => ({ ...item, sno: index + 1 }));
            this.dataSource2.data = this.dispatchData2;
            this.dataSource2.paginator = this.paginator2;
            this.dataSource2.sort = this.sort2;
            this.cdr.detectChanges();
            this.spinner.hide();
          },
          (error) => {
            this.spinner.hide();
            console.error(`API Error:: ${error.message}`);
          }
        );
      this.openDialog2();
    } else if (did == 6002) {
      let isbelow20 = "NA";
      this.api.GETTobeTenderAll(did, this.divisionid, this.himisDistrictid, this.mainSchemeID, this.ASAmount, isbelow20, formdate, todate)
        .subscribe(
          (res) => {
            this.dispatchData2 = res.map((item: DetailProgressTinP, index: number) => ({ ...item, sno: index + 1 }));
            this.dataSource2.data = this.dispatchData2;
            this.dataSource2.paginator = this.paginator2;
            this.dataSource2.sort = this.sort2;
            this.cdr.detectChanges();
            this.spinner.hide();
          },
          (error) => {
            this.spinner.hide();
            console.error(`API Error:: ${error.message}`);
          }
        );
      this.openDialog2();
    } else if (did == 2001) {
      this.api.GETDetailProgress(did, this.divisionid, this.himisDistrictid, this.mainSchemeID, this.ASAmount, formdate, todate)
        .subscribe(
          (res) => {
            this.dispatchData3 = res.map((item: TenderInProcess, index: number) => ({ ...item, sno: index + 1 }));
            this.dataSource3.data = this.dispatchData3;
            this.dataSource3.paginator = this.paginator3;
            this.dataSource3.sort = this.sort3;
            this.cdr.detectChanges();
            this.spinner.hide();
          },
          (error) => {
            this.spinner.hide();
            console.error(`API Error:: ${error.message}`);
          }
        );
      this.openDialog3();
    } else if (did == 4001) {
      this.api.GETWORunningHandDetails(did, this.divisionid, this.himisDistrictid, this.mainSchemeID, this.contractorid, this.ASAmount, formdate, todate)
        .subscribe(
          (res) => {
            this.dispatchDataCom_Han = res.map((item: WORunningHandDetails, index: number) => ({ ...item, sno: index + 1 }));
            this.dataSourceCom_Han.data = this.dispatchDataCom_Han;
            this.dataSourceCom_Han.paginator = this.paginatorCom_Han;
            this.dataSourceCom_Han.sort = this.sortCom_Han;
            this.cdr.detectChanges();
            this.spinner.hide();
          },
          (error) => {
            this.spinner.hide();
            console.error(`API Error:: ${error.message}`);
          }
        );
      this.openDialogCom_Han();
    } else if (did == 5001) {
      this.api.GETWORunningHandDetails(did, this.divisionid, this.himisDistrictid, this.mainSchemeID, this.contractorid, this.ASAmount, formdate, todate)
        .subscribe(
          (res) => {
            this.dispatchDataRun_Work = res.map((item: WORunningHandDetails, index: number) => ({ ...item, sno: index + 1 }));
            this.dataSourceRun_Work.data = this.dispatchDataRun_Work;
            this.dataSourceRun_Work.paginator = this.paginatorRun_Work;
            this.dataSourceRun_Work.sort = this.sortRun_Work;
            this.cdr.detectChanges();
            this.spinner.hide();
          },
          (error) => {
            this.spinner.hide();
            console.error(`API Error:: ${error.message}`);
          }
        );
      this.openDialogRun_Work();
    } else if (did === 6001) {
      this.api.GETLandIssueRetToDeptDetatails(did, this.divisionid, this.himisDistrictid, this.mainSchemeID, this.ASAmount, formdate, todate)
        .subscribe(
          (res) => {
            this.dispatchDataLand_isu = res.map((item: LandIssue_RetToDeptDetatails, index: number) => ({ ...item, sno: index + 1 }));
            this.dataSourceLand_isu.data = this.dispatchDataLand_isu;
            this.dataSourceLand_isu.paginator = this.paginatorLand_isu;
            this.dataSourceLand_isu.sort = this.sortLand_isu;
            this.cdr.detectChanges();
            this.spinner.hide();
          },
          (error) => {
            this.spinner.hide();
            console.error(`API Error:: ${error.message}`);
          }
        );
      this.openDialogLand_isu();
    } else if (did == 8001) {
      this.api.GETLandIssueRetToDeptDetatails(did, this.divisionid, this.himisDistrictid, this.mainSchemeID, this.ASAmount, formdate, todate)
        .subscribe(
          (res) => {
            this.dispatchData1 = res.map((item: LandIssue_RetToDeptDetatails, index: number) => ({ ...item, sno: index + 1 }));
            this.dataSource1.data = this.dispatchData1;
            this.dataSource1.paginator = this.paginator1;
            this.dataSource1.sort = this.sort1;
            this.cdr.detectChanges();
            this.spinner.hide();
          },
          (error) => {
            this.spinner.hide();
            console.error(`API Error:: ${error.message}`);
          }
        );
      this.openDialog1();
    } else {
      this.api.GETWORunningHandDetails(did, this.divisionid, this.himisDistrictid, this.mainSchemeID, this.contractorid, this.ASAmount, formdate, todate)
        .subscribe(
          (res) => {
            this.dispatchData = res.map((item: WORunningHandDetails, index: number) => ({ ...item, sno: index + 1 }));
            this.dataSource.data = this.dispatchData;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.cdr.detectChanges();
            this.spinner.hide();
          },
          (error) => {
            this.spinner.hide();
            console.error(`API Error:: ${error.message}`);
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

  applyTextFilterreturntoD(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();
    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
  }

  exportToPDF() {
    const doc = new jsPDF('l', 'mm', 'a4');
    const columns = [
      { header: 'S.No', dataKey: 'sno' },
      { header: 'Head No', dataKey: 'grantNo' },
      { header: 'Head', dataKey: 'head' },
      { header: 'Division', dataKey: 'divName_En' },
      { header: 'District', dataKey: 'district' },
      { header: 'Block', dataKey: 'blockname' },
      { header: 'AS Letter No', dataKey: 'letterNo' },
      { header: 'Approver', dataKey: 'approver' },
      { header: 'Work', dataKey: 'work' },
      { header: 'AS Date', dataKey: 'aadt' },
      { header: 'AS Amount(in Lacs)', dataKey: 'asAmt' },
      { header: 'TS Date', dataKey: 'tsDate' },
      { header: 'TS Amount(in Lacs)', dataKey: 'tsamt' },
      { header: 'Tender Type', dataKey: 'tType' },
      { header: 'NIT Reference', dataKey: 'tenderReference' },
      { header: 'NIT/Sanction DT', dataKey: 'dateOfIssueNIT' },
      { header: 'Acceptance Letter RefNo', dataKey: 'acceptanceLetterRefNo' },
      { header: 'Accepted DT', dataKey: 'acceptLetterDT' },
      { header: 'Rate%', dataKey: 'sanctionRate' },
      { header: 'Sanction', dataKey: 'sanctionDetail' },
      { header: 'Amount Of Contract(In Lacs)', dataKey: 'totalAmountOfContract' },
      { header: 'Total paid(In Lacs)', dataKey: 'totalpaid' },
      { header: 'Total unpaid(In Lacs)', dataKey: 'totalunpaid' },
      { header: 'Work Order DT', dataKey: 'wrokOrderDT' },
      { header: 'Time Allowed', dataKey: 'timeAllowed' },
      { header: 'Due DT Time PerAdded', dataKey: 'dueDTTimePerAdded' },
      { header: 'Work Order RefNo', dataKey: 'agreementRefNo' },
      { header: 'Contractor ID/Class', dataKey: 'cid' },
      { header: 'Contractor', dataKey: 'contractorNAme' },
      { header: 'Contractor Mobile No', dataKey: 'mobNo' },
      { header: 'Last Progress', dataKey: 'lProgress' },
      { header: 'Sub Engineer', dataKey: 'subengname' },
      { header: 'Asst.Eng', dataKey: 'aeName' },
      { header: 'Work ID', dataKey: 'work_id' },
      { header: 'AS Letter', dataKey: 'asLetter' },
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

    autoTable(doc, {
      head: [columns.map(col => col.header).filter((h): h is string => h !== undefined)],
      body: rows.map(row => columns.map(col => row[col.dataKey as keyof typeof row])),
      startY: 20,
      theme: 'grid',
      styles: { fontSize: 6, cellPadding: 0.5, overflow: 'linebreak' },
      headStyles: { fillColor: [22, 160, 133], textColor: 255, fontSize: 7, fontStyle: 'bold' },
      columnStyles: {
        8: { cellWidth: 'auto' },
        33: { cellWidth: 'auto' }
      },
      tableWidth: 'auto',
      margin: { top: 20, left: 5, right: 5 },
      pageBreak: 'auto'
    });

    doc.save('Acceptance_WOrderDetail.pdf');
  }

  exportToPDFCom_Han() {
    const doc = new jsPDF('l', 'mm', 'a4');
    const columns = [
      { header: 'S.No', dataKey: 'sno' },
      { header: 'Head No', dataKey: 'grantNo' },
      { header: 'Head', dataKey: 'head' },
      { header: 'Division', dataKey: 'divName_En' },
      { header: 'District', dataKey: 'district' },
      { header: 'Block', dataKey: 'blockname' },
      { header: 'AS Letter No', dataKey: 'letterNo' },
      { header: 'Approver', dataKey: 'approver' },
      { header: 'Work', dataKey: 'work' },
      { header: 'AS Date', dataKey: 'aadt' },
      { header: 'AS Amount(in Lacs)', dataKey: 'asAmt' },
      { header: 'TS Date', dataKey: 'tsDate' },
      { header: 'TS Amount(in Lacs)', dataKey: 'tsamt' },
      { header: 'Tender Type', dataKey: 'tType' },
      { header: 'NIT Reference', dataKey: 'tenderReference' },
      { header: 'NIT/Sanction DT', dataKey: 'dateOfIssueNIT' },
      { header: 'Acceptance Letter RefNo', dataKey: 'acceptanceLetterRefNo' },
      { header: 'Accepted DT', dataKey: 'acceptLetterDT' },
      { header: 'Rate%', dataKey: 'sanctionRate' },
      { header: 'Sanction', dataKey: 'sanctionDetail' },
      { header: 'Amount Of Contract(In Lacs)', dataKey: 'totalAmountOfContract' },
      { header: 'Total paid(In Lacs)', dataKey: 'totalpaid' },
      { header: 'Total unpaid(In Lacs)', dataKey: 'totalunpaid' },
      { header: 'Work Order DT', dataKey: 'wrokOrderDT' },
      { header: 'Time Allowed', dataKey: 'timeAllowed' },
      { header: 'Due DT Time PerAdded', dataKey: 'dueDTTimePerAdded' },
      { header: 'Work Order RefNo', dataKey: 'agreementRefNo' },
      { header: 'Contractor ID/Class', dataKey: 'cid' },
      { header: 'Contractor', dataKey: 'contractorNAme' },
      { header: 'Contractor Mobile No', dataKey: 'mobNo' },
      { header: 'Last Progress', dataKey: 'lProgress' },
      { header: 'Handover DT', dataKey: 'progressDT' },
      { header: 'Sub Engineer', dataKey: 'subengname' },
      { header: 'Asst.Eng', dataKey: 'aeName' },
      { header: 'Work ID', dataKey: 'work_id' },
      { header: 'AS Letter', dataKey: 'asLetter' },
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

    autoTable(doc, {
      head: [columns.map(col => col.header).filter((h): h is string => h !== undefined)],
      body: rows.map(row => columns.map(col => row[col.dataKey as keyof typeof row])),
      startY: 20,
      theme: 'grid',
      styles: { fontSize: 6, cellPadding: 0.5, overflow: 'linebreak' },
      headStyles: { fillColor: [22, 160, 133], textColor: 255, fontSize: 7, fontStyle: 'bold' },
      columnStyles: {
        8: { cellWidth: 'auto' },
        33: { cellWidth: 'auto' }
      },
      tableWidth: 'auto',
      margin: { top: 20, left: 5, right: 5 },
      pageBreak: 'auto'
    });

    doc.save('Completed_Handover.pdf');
  }

  exportToPDFTW() {
    const doc = new jsPDF('l', 'mm', 'a4');
    const columns = [
      { header: 'S.No', dataKey: 'sno' },
      { header: 'Head No', dataKey: 'grantNo' },
      { header: 'Head', dataKey: 'head' },
      { header: 'Division', dataKey: 'divName_En' },
      { header: 'District', dataKey: 'district' },
      { header: 'Block', dataKey: 'blockname' },
      { header: 'AS Letter No', dataKey: 'letterNo' },
      { header: 'Approver', dataKey: 'approver' },
      { header: 'Work', dataKey: 'work' },
      { header: 'AS Date', dataKey: 'aadt' },
      { header: 'AS Amount(in Lacs)', dataKey: 'asAmt' },
      { header: 'TS Date', dataKey: 'tsDate' },
      { header: 'TS Amount(in Lacs)', dataKey: 'tsamt' },
      { header: 'Tender Type', dataKey: 'tType' },
      { header: 'NIT Reference', dataKey: 'tenderReference' },
      { header: 'NIT/Sanction DT', dataKey: 'dateOfIssueNIT' },
      { header: 'Acceptance Letter RefNo', dataKey: 'acceptanceLetterRefNo' },
      { header: 'Accepted DT', dataKey: 'acceptLetterDT' },
      { header: 'Rate%', dataKey: 'sanctionRate' },
      { header: 'Sanction', dataKey: 'sanctionDetail' },
      { header: 'Amount Of Contract(In Lacs)', dataKey: 'totalAmountOfContract' },
      { header: 'Total paid(In Lacs)', dataKey: 'totalpaid' },
      { header: 'Total unpaid(In Lacs)', dataKey: 'totalunpaid' },
      { header: 'Work Order DT', dataKey: 'wrokOrderDT' },
      { header: 'Time Allowed', dataKey: 'timeAllowed' },
      { header: 'Due DT Time PerAdded', dataKey: 'dueDTTimePerAdded' },
      { header: 'Work Order RefNo', dataKey: 'agreementRefNo' },
      { header: 'Contractor ID/Class', dataKey: 'cid' },
      { header: 'Contractor', dataKey: 'contractorNAme' },
      { header: 'Contractor Mobile No', dataKey: 'mobNo' },
      { header: 'Last Progress', dataKey: 'lProgress' },
      { header: 'Progress DT', dataKey: 'progressDT' },
      { header: 'Exp.Comp DT', dataKey: 'expcompdt' },
      { header: 'Delay Reason', dataKey: 'delayreason' },
      { header: 'Remarks', dataKey: 'pRemarks' },
      { header: 'Sub Engineer', dataKey: 'subengname' },
      { header: 'Asst.Eng', dataKey: 'aeName' },
      { header: 'Work ID', dataKey: 'work_id' },
      { header: 'AS Letter', dataKey: 'asLetter' },
    ];
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

    autoTable(doc, {
      head: [columns.map(col => col.header).filter((h): h is string => h !== undefined)],
      body: rows.map(row => columns.map(col => row[col.dataKey as keyof typeof row] || '')),
      startY: 20,
      theme: 'grid',
      headStyles: { fillColor: [44, 62, 80], textColor: 255, fontSize: 7, fontStyle: 'bold' },
      styles: { textColor: [0, 0, 0], fontSize: 6, cellPadding: 0.5, overflow: 'linebreak' },
      columnStyles: {
        0: { cellWidth: 8 },
        1: { cellWidth: 15 },
        2: { cellWidth: 20 },
        3: { cellWidth: 20 },
        4: { cellWidth: 18 },
        5: { cellWidth: 18 },
        6: { cellWidth: 20 },
        7: { cellWidth: 18 },
        8: { cellWidth: 30 },
        9: { cellWidth: 18 },
        10: { cellWidth: 18 },
        11: { cellWidth: 18 },
        12: { cellWidth: 18 },
        13: { cellWidth: 18 },
        14: { cellWidth: 22 },
        15: { cellWidth: 22 },
        16: { cellWidth: 22 },
        17: { cellWidth: 18 },
        18: { cellWidth: 12 },
        19: { cellWidth: 22 },
        20: { cellWidth: 22 },
        21: { cellWidth: 22 },
        22: { cellWidth: 22 },
        23: { cellWidth: 22 },
        24: { cellWidth: 18 },
        25: { cellWidth: 22 },
        26: { cellWidth: 22 },
        27: { cellWidth: 15 },
        28: { cellWidth: 22 },
        29: { cellWidth: 18 },
        30: { cellWidth: 15 },
        31: { cellWidth: 18 },
        32: { cellWidth: 18 },
        33: { cellWidth: 30 },
        34: { cellWidth: 15 },
        35: { cellWidth: 15 },
        36: { cellWidth: 15 },
        37: { cellWidth: 15 },
        38: { cellWidth: 22 },
      },
      tableWidth: 'wrap',
      margin: { top: 20, left: 2, right: 2 },
      pageBreak: 'auto'
    });

    doc.save('WorksAbstractD.pdf');
  }

  exportToPDFRun_Work() {
    const doc = new jsPDF('l', 'mm', 'a4');
    const columns = [
      { header: 'S.No', dataKey: 'sno' },
      { header: 'Head No', dataKey: 'grantNo' },
      { header: 'Head', dataKey: 'head' },
      { header: 'Division', dataKey: 'divName_En' },
      { header: 'District', dataKey: 'district' },
      { header: 'Block', dataKey: 'blockname' },
      { header: 'AS Letter No', dataKey: 'letterNo' },
      { header: 'Approver', dataKey: 'approver' },
      { header: 'Work', dataKey: 'work' },
      { header: 'AS Date', dataKey: 'aadt' },
      { header: 'AS Amount(in Lacs)', dataKey: 'asAmt' },
      { header: 'TS Date', dataKey: 'tsDate' },
      { header: 'TS Amount(in Lacs)', dataKey: 'tsamt' },
      { header: 'Tender Type', dataKey: 'tType' },
      { header: 'NIT Reference', dataKey: 'tenderReference' },
      { header: 'NIT/Sanction DT', dataKey: 'dateOfIssueNIT' },
      { header: 'Acceptance Letter RefNo', dataKey: 'acceptanceLetterRefNo' },
      { header: 'Accepted DT', dataKey: 'acceptLetterDT' },
      { header: 'Rate%', dataKey: 'sanctionRate' },
      { header: 'Sanction', dataKey: 'sanctionDetail' },
      { header: 'Amount Of Contract(In Lacs)', dataKey: 'totalAmountOfContract' },
      { header: 'Total paid(In Lacs)', dataKey: 'totalpaid' },
      { header: 'Total unpaid(In Lacs)', dataKey: 'totalunpaid' },
      { header: 'Work Order DT', dataKey: 'wrokOrderDT' },
      { header: 'Time Allowed', dataKey: 'timeAllowed' },
      { header: 'Due DT Time PerAdded', dataKey: 'dueDTTimePerAdded' },
      { header: 'Work Order RefNo', dataKey: 'agreementRefNo' },
      { header: 'Contractor ID/Class', dataKey: 'cid' },
      { header: 'Contractor', dataKey: 'contractorNAme' },
      { header: 'Contractor Mobile No', dataKey: 'mobNo' },
      { header: 'Last Progress', dataKey: 'lProgress' },
      { header: 'Progress DT', dataKey: 'progressDT' },
      { header: 'Exp.Comp DT', dataKey: 'expcompdt' },
      { header: 'Delay Reason', dataKey: 'delayreason' },
      { header: 'Sub Engineer', dataKey: 'subengname' },
      { header: 'Asst.Eng', dataKey: 'aeName' },
      { header: 'Work ID', dataKey: 'work_id' },
      { header: 'AS Letter', dataKey: 'asLetter' },
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
      { header: 'S.No', dataKey: 'sno' },
      { header: 'Head No', dataKey: 'grantNo' },
      { header: 'Head', dataKey: 'head' },
      { header: 'Division', dataKey: 'divName_En' },
      { header: 'District', dataKey: 'district' },
      { header: 'Block', dataKey: 'blockname' },
      { header: 'AS Letter No', dataKey: 'letterNo' },
      { header: 'Approver', dataKey: 'approver' },
      { header: 'Type', dataKey: 'type_name' },
      { header: 'Works', dataKey: 'work' },
      { header: 'AS Amount', dataKey: 'asAmt' },
      { header: 'Total paid(In Lacs)', dataKey: 'totalpaid' },
      { header: 'Total unpaid(In Lacs)', dataKey: 'totalunpaid' },
      { header: 'TS Amount', dataKey: 'tsamt' },
      { header: 'TS Date', dataKey: 'tsDate' },
      { header: 'AS DT', dataKey: 'aadt' },
      { header: 'lProgress', dataKey: 'lProgress' },
      { header: 'Progress DT', dataKey: 'progressDT' },
      { header: 'Remarks', dataKey: 'remarks' },
      { header: 'Group', dataKey: 'groupName' },
      { header: 'Dash', dataKey: 'dashName' },
      { header: 'AS Path', dataKey: 'asPath' },
      { header: 'AS Letter', dataKey: 'asLetter' },
      { header: 'Descri ID', dataKey: 'descri' },
      { header: 'Fmr code', dataKey: 'fmrcode' },
      { header: 'startdt', dataKey: 'startdt' },
      { header: 'End DT', dataKey: 'enddt' },
      { header: 'AS ID', dataKey: 'asid' },
      { header: 'NO. of Calls', dataKey: 'noofcalls' },
      { header: 'Tender NO.', dataKey: 'tenderno' },
      { header: 'Eproc NO.', dataKey: 'eprocno' },
      { header: 'COV Opened DT', dataKey: 'covOpenedDT' },
      { header: 'Topned price DT', dataKey: 'topnedpricedt' },
      { header: 'Work id', dataKey: 'worK_ID' },
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

    autoTable(doc, {
      head: [columns.map(col => col.header).filter((h): h is string => h !== undefined)],
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
    });

    doc.save('DetailProgress.pdf');
  }

  expor_TenderInProcess_PDFT() {
    const doc = new jsPDF('l', 'mm', 'a4');
    const columns = [
      { header: 'S.No', dataKey: 'sno' },
      { header: 'Head No', dataKey: 'grantNo' },
      { header: 'Head', dataKey: 'head' },
      { header: 'Division', dataKey: 'divName_En' },
      { header: 'District', dataKey: 'district' },
      { header: 'Block', dataKey: 'blockname' },
      { header: 'AS Letter No', dataKey: 'letterNo' },
      { header: 'Approver', dataKey: 'approver' },
      { header: 'Works', dataKey: 'work' },
      { header: 'AS Date', dataKey: 'aadt' },
      { header: 'AS Amount(in Lacs)', dataKey: 'asAmt' },
      { header: 'Total paid(In Lacs)', dataKey: 'totalpaid' },
      { header: 'Total unpaid(In Lacs)', dataKey: 'totalunpaid' },
      { header: 'TS Date', dataKey: 'tsDate' },
      { header: 'TS Amount(in Lacs)', dataKey: 'tsamt' },
      { header: 'lProgress', dataKey: 'lProgress' },
      { header: 'Progress DT', dataKey: 'progressDT' },
      { header: 'FMR code', dataKey: 'fmrcode' },
      { header: 'Start DT', dataKey: 'startdt' },
      { header: 'End DT', dataKey: 'enddt' },
      { header: 'NO. of Calls', dataKey: 'noofcalls' },
      { header: 'Tender NO.', dataKey: 'tenderno' },
      { header: 'Eproc NO.', dataKey: 'eprocno' },
      { header: 'Opened DT', dataKey: 'covOpenedDT' },
      { header: 'Topned price DT', dataKey: 'topnedpricedt' },
      { header: 'Work id', dataKey: 'work_id' },
      { header: 'AS Letter', dataKey: 'asLetter' },
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
    }));

    autoTable(doc, {
      head: [columns.map(col => col.header).filter((h): h is string => h !== undefined)],
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
    });

    doc.save('TenderInProcess_Detail.pdf');
  }

  expor_PDFLand_isu() {
    const doc = new jsPDF('l', 'mm', 'a4');
    const columns = [
      { header: 'S.No', dataKey: 'sno' },
      { header: 'Head No', dataKey: 'grantNo' },
      { header: 'Head', dataKey: 'head' },
      { header: 'Division', dataKey: 'divName_En' },
      { header: 'District', dataKey: 'district' },
      { header: 'Block', dataKey: 'blockname' },
      { header: 'AS Letter No', dataKey: 'letterNo' },
      { header: 'Approver', dataKey: 'approver' },
      { header: 'Work', dataKey: 'work' },
      { header: 'AS Date', dataKey: 'aadt' },
      { header: 'AS Amount(in Lacs)', dataKey: 'asAmt' },
      { header: 'TS Date', dataKey: 'tsDate' },
      { header: 'TS Amount(in Lacs)', dataKey: 'tsamt' },
      { header: 'Tender Type', dataKey: 'tType' },
      { header: 'NIT Reference', dataKey: 'tenderReference' },
      { header: 'NIT/Sanction DT', dataKey: 'dateOfIssueNIT' },
      { header: 'Acceptance Letter RefNo', dataKey: 'acceptanceLetterRefNo' },
      { header: 'Accepted DT', dataKey: 'acceptLetterDT' },
      { header: 'Rate%', dataKey: 'sanctionRate' },
      { header: 'Sanction', dataKey: 'sanctionDetail' },
      { header: 'Amount Of Contract(In Lacs)', dataKey: 'totalAmountOfContract' },
      { header: 'Total paid(In Lacs)', dataKey: 'totalpaid' },
      { header: 'Total unpaid(In Lacs)', dataKey: 'totalunpaid' },
      { header: 'Work Order DT', dataKey: 'wrokOrderDT' },
      { header: 'Time Allowed', dataKey: 'timeAllowed' },
      { header: 'Due DT Time PerAdded', dataKey: 'dueDTTimePerAdded' },
      { header: 'Work Order RefNo', dataKey: 'agreementRefNo' },
      { header: 'Contractor ID/Class', dataKey: 'cid' },
      { header: 'Contractor', dataKey: 'contractorNAme' },
      { header: 'Contractor Mobile No', dataKey: 'mobNo' },
      { header: 'Last Progress', dataKey: 'lProgress' },
      { header: 'Progress DT', dataKey: 'progressDT' },
      { header: 'Exp.Comp DT', dataKey: 'expcompdt' },
      { header: 'Delay Reason', dataKey: 'delayreason' },
      { header: 'Sub Engineer', dataKey: 'subengname' },
      { header: 'Asst.Eng', dataKey: 'aeName' },
      { header: 'Work ID', dataKey: 'work_id' },
      { header: 'AS Letter', dataKey: 'asLetter' },
    ];
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
      head: [columns.map(col => col.header).filter((h): h is string => h !== undefined)],
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
    });

    doc.save('LandIssueReport.pdf');
  }

  expor_PDFRturntoD() {
    const doc = new jsPDF('l', 'mm', 'a4');
    const columns = [
      { header: 'S.No', dataKey: 'sno' },
      { header: 'Head No', dataKey: 'grantNo' },
      { header: 'Head', dataKey: 'head' },
      { header: 'Division', dataKey: 'divName_En' },
      { header: 'District', dataKey: 'district' },
      { header: 'Block', dataKey: 'blockname' },
      { header: 'AS Letter No', dataKey: 'letterNo' },
      { header: 'Approver', dataKey: 'approver' },
      { header: 'Work', dataKey: 'work' },
      { header: 'AS Date', dataKey: 'aadt' },
      { header: 'AS Amount(in Lacs)', dataKey: 'asAmt' },
      { header: 'TS Date', dataKey: 'tsDate' },
      { header: 'TS Amount(in Lacs)', dataKey: 'tsamt' },
      { header: 'Tender Type', dataKey: 'tType' },
      { header: 'NIT Reference', dataKey: 'tenderReference' },
      { header: 'NIT/Sanction DT', dataKey: 'dateOfIssueNIT' },
      { header: 'Acceptance Letter RefNo', dataKey: 'acceptanceLetterRefNo' },
      { header: 'Accepted DT', dataKey: 'acceptLetterDT' },
      { header: 'Rate%', dataKey: 'sanctionRate' },
      { header: 'Sanction', dataKey: 'sanctionDetail' },
      { header: 'Amount Of Contract(In Lacs)', dataKey: 'totalAmountOfContract' },
      { header: 'Total paid(In Lacs)', dataKey: 'totalpaid' },
      { header: 'Total unpaid(In Lacs)', dataKey: 'totalunpaid' },
      { header: 'Work Order DT', dataKey: 'wrokOrderDT' },
      { header: 'Time Allowed', dataKey: 'timeAllowed' },
      { header: 'Due DT Time PerAdded', dataKey: 'dueDTTimePerAdded' },
      { header: 'Work Order RefNo', dataKey: 'agreementRefNo' },
      { header: 'Contractor ID/Class', dataKey: 'cid' },
      { header: 'Contractor', dataKey: 'contractorNAme' },
      { header: 'Contractor Mobile No', dataKey: 'mobNo' },
      { header: 'Last Progress', dataKey: 'lProgress' },
      { header: 'Progress DT', dataKey: 'progressDT' },
      { header: 'Exp.Comp DT', dataKey: 'expcompdt' },
      { header: 'Delay Reason', dataKey: 'delayreason' },
      { header: 'Sub Engineer', dataKey: 'subengname' },
      { header: 'Asst.Eng', dataKey: 'aeName' },
      { header: 'Work ID', dataKey: 'work_id' },
      { header: 'AS Letter', dataKey: 'asLetter' },
    ];
    const rows = this.dispatchData1.map((row) => ({
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

    autoTable(doc, {
      head: [columns.map(col => col.header).filter((h): h is string => h !== undefined)],
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
    });

    doc.save('RturnTODReport.pdf');
  }

  openDialog() {
    const dialogRef = this.dialog.open(this.itemDetailsModal, {
      width: '100%',
      height: '100%',
      maxWidth: '100%',
      panelClass: 'full-screen-dialog',
      data: {},
    });
    dialogRef.afterClosed().subscribe(() => {});
  }

  openDialog1() {
    const dialogRef = this.dialog.open(this.itemDetailsModal1, {
      width: '100%',
      height: '100%',
      maxWidth: '100%',
      panelClass: 'full-screen-dialog',
      data: {},
    });
    dialogRef.afterClosed().subscribe(() => {});
  }

  openDialog2() {
    const dialogRef = this.dialog.open(this.itemDetailsModal2, {
      width: '100%',
      height: '100%',
      maxWidth: '100%',
      panelClass: 'full-screen-dialog',
      data: {},
    });
    dialogRef.afterClosed().subscribe(() => {});
  }

  openDialog3() {
    const dialogRef = this.dialog.open(this.itemDetailsModal3, {
      width: '100%',
      height: '100%',
      maxWidth: '100%',
      panelClass: 'full-screen-dialog',
      data: {},
    });
    dialogRef.afterClosed().subscribe(() => {});
  }

  openDialogCom_Han() {
    const dialogRef = this.dialog.open(this.itemDetailsModalCom_Han, {
      width: '100%',
      height: '100%',
      maxWidth: '100%',
      panelClass: 'full-screen-dialog',
      data: {},
    });
    dialogRef.afterClosed().subscribe(() => {});
  }

  openDialogRun_Work() {
    const dialogRef = this.dialog.open(this.itemDetailsModalRun_Work, {
      width: '100%',
      height: '100%',
      maxWidth: '100%',
      panelClass: 'full-screen-dialog',
      data: {},
    });
    dialogRef.afterClosed().subscribe(() => {});
  }

  openDialogLand_isu() {
    const dialogRef = this.dialog.open(this.itemDetailsModalLand_isu, {
      width: '100%',
      height: '100%',
      maxWidth: '100%',
      panelClass: 'full-screen-dialog',
      data: {},
    });
    dialogRef.afterClosed().subscribe(() => {});
  }

  openDialogTW() {
    const dialogRef = this.dialog.open(this.itemDetailsModalTW, {
      width: '100%',
      height: '100%',
      maxWidth: '100%',
      panelClass: 'full-screen-dialog',
      data: {},
    });
    dialogRef.afterClosed().subscribe(() => {});
  }

  onButtonClick2(ASID: any, workid: any): void {
    this.spinner.show();
    this.api.GETASFile(ASID, workid)
      .subscribe(
        (res) => {
          const filename = res[0]?.filename;
          const URL = res[0]?.asLetterName;

          if (filename) {
            window.open(URL, '_blank');
          } else {
            alert("⚠️ Alert: AS Letter Not Found!\n\nThe requested document is missing.\nPlease try again later or contact support.");
          }
          this.spinner.hide();
        },
        (error) => {
          this.spinner.hide();
          console.error(`API Error:: ${error.message}`);
        }
      );
  }

  getDistrictNameDME() {
    try {
      var roleName = localStorage.getItem('roleName');
      if (roleName == 'Division') {
        this.divisionid = sessionStorage.getItem('divisionID'); this.himisDistrictid = 0;
      } else if (roleName == 'Collector') {
        this.himisDistrictid = sessionStorage.getItem('himisDistrictid'); this.divisionid = 0;
      } else {
        this.himisDistrictid = 0;
        this.divisionid = 0;
      }

      this.api.GetDistrictNameDME(this.divisionid, this.himisDistrictid).subscribe((res: any) => {
        if (res && res.length > 0) {
          this.GetDistrict = res.map((item: { districT_ID: any; districtname: any; diV_ID: any }) => ({
            districT_ID: item.districT_ID,
            districtname: item.districtname,
            diV_ID: item.diV_ID,
          }));
        }
        this.DistrictNameDMEData = res;
      },
        (error) => {
          console.error(`API Error:: ${JSON.stringify(error)}`);
        }
      );
    } catch (ex: any) {
      console.error(`API Error:: ${JSON.stringify(ex.message)}`);
    }
  }

  onselectDistrictsDME(event: any, num: number) {
    const selectedUser = this.GetDistrict.find((user: { districT_ID: any }) => user.districT_ID === this.districT_ID);

    if (selectedUser) {
      const districT_ID = selectedUser?.districT_ID;
      var roleName = localStorage.getItem('roleName');
      if (roleName == 'Division') {
        if (this.selectedTabIndex === 2) {
          this.distid = districT_ID;
          this.showCards = false;
          this.showCardss = true;
          this.GetDMEProgressSummary();
        }
      } else {
        this.distid = districT_ID;
        this.GetDMEProgressSummary();
        this.showCardss = true;
      }
    }
  }

  GetDistricts() {
    try {
      var roleName = localStorage.getItem('roleName');
      if (roleName == 'Division') {
        this.divisionid = sessionStorage.getItem('divisionID');
      } else {
        this.divisionid = 0;
      }
      this.divisionid = this.divisionid == 0 ? 0 : this.divisionid;
      this.api.GetDistrict(false, this.divisionid).subscribe((res: any) => {
        if (res && res.length > 0) {
          this.GetDistrict = res;
        }
      },
        (error) => {
          console.error(`API Error:: ${JSON.stringify(error)}`);
        }
      );
    } catch (ex: any) {
      console.error(`API Error:: ${JSON.stringify(ex.message)}`);
    }
  }

  districT_ID: any;
  onGetDistrictsSelect(event: any, num: number): void {
    const selectedUser = this.GetDistrict.find((user: { districT_ID: any }) => user.districT_ID === this.districT_ID);

    if (selectedUser) {
      const districT_ID = selectedUser?.districT_ID;
      const distname = selectedUser?.districtname;

      this.distname = distname;
      this.showCards = true;
      this.distid = selectedUser?.districtname || null;
      this.himisDistrictid = districT_ID;
      this.mainSchemeID = this.mainSchemeID;
      this.divisionid = 0;
      this.show = true;
      this.hide = this.selectedName != null;
      this.DashProgressCount();

      if (this.selectedTabIndex === 3) {
        this.showCards = false;
        this.DashProgressCount();
      }
    }
  }

  getmain_scheme() {
    try {
      this.api.getMainScheme(this.isall).subscribe((res: any) => {
        if (res && res.length > 0) {
          this.mainscheme = res.map((item: { mainSchemeID: any; name: any; }) => ({
            mainSchemeID: item.mainSchemeID,
            name: item.name,
          }));
        }
      });
    } catch (ex: any) {
      console.error(`API Error:: ${JSON.stringify(ex.message)}`);
    }
  }

  onselect_databudgetOptions(event: Event): void {
    const selectedUser = this.budgetOptions.find((user: { buid: any }) => user.buid === this.buid);
    if (selectedUser) {
      this.ASAmount = selectedUser?.buid;
    }
  }

  onselect_mainscheme_data(event: Event): void {
    const selectedUser = this.mainscheme.find((user: { mainSchemeID: any }) => user.mainSchemeID === this.mainSchemeID);

    if (selectedUser) {
      this.mainSchemeID = selectedUser?.mainSchemeID;
      this.hide = true;
      const selectedName = selectedUser?.name;
      this.selectedName = selectedName;
      this.distid = 0;
      this.showCards = true;
      if (this.name || this.distname == null) {
        this.show = false;
      } else {
        this.show = true;
      }
    }
  }

  InsertUserPageViewLog() {
    try {
      const roleIdName = localStorage.getItem('roleName') || '';
      const userId = Number(sessionStorage.getItem('userid') || 0);
      const roleId = Number(sessionStorage.getItem('roleId') || 0);
      const ipAddress = sessionStorage.getItem('ipAddress') || '';
      const userAgent = navigator.userAgent;
      
      this.InsertUserPageViewLogdata.logId = 0;
      this.InsertUserPageViewLogdata.userId = userId;
      this.InsertUserPageViewLogdata.roleId = roleId;
      this.InsertUserPageViewLogdata.roleIdName = roleIdName;
      this.InsertUserPageViewLogdata.pageName = this.pageName;
      this.InsertUserPageViewLogdata.pageUrl = this.fullUrl;
      this.InsertUserPageViewLogdata.viewTime = new Date().toISOString();
      this.InsertUserPageViewLogdata.ipAddress = ipAddress;
      this.InsertUserPageViewLogdata.userAgent = userAgent;
      
      this.api.InsertUserPageViewLogPOST(this.InsertUserPageViewLogdata).subscribe({
        next: (res: any) => {},
        error: (err: any) => { console.error('Backend Error:', err.message); }
      });
    } catch (err: any) {
      console.error('Error:', err.message);
    }
  }

  onopenimges(element: any) {
    this.selectedWork = element;
    this.imageUrls = [];

    const imageKeys = ['imagename', 'imagenamE2', 'imagenamE3', 'imagenamE4', 'imagenamE5'];

    imageKeys.forEach(key => {
      const imgFile = element[key];
      if (imgFile && imgFile !== 'NA' && imgFile !== 'null') {
        this.imageUrls.push(this.baseImageUrl + imgFile);
      }
    });

    if (this.imageUrls.length === 0) {
      this.imageUrls.push('assets/no-image-placeholder.png');
    }

    this.openimages1();
  }

  openimages1() {
    this.dialog.open(this.openimages, {
      width: '80%',
      maxWidth: '100vw',
      panelClass: 'custom-dialog-container'
    });
  }

  onImageError(event: any) {
    event.target.src = 'https://via.placeholder.com/450x450?text=Image+Not+Found';
  }

  bindDashboardData() {
    this.completedWorks = this.getNosWorks(4001);
    this.returnWorks = this.getNosWorks(8001);
    this.remainingWorks = this.totalNosWorks - (this.completedWorks + this.returnWorks);
    this.tenderInProcess = this.getNosWorks(2001);
    this.acceptanceGenerated = this.getNosWorks(3001);
    this.workOrderGenerated = this.getNosWorks(3002);
    this.landDispute = this.getNosWorks(6001);
    this.runningWork = this.getNosWorks(5001);
    this.toBeTender = this.getNosWorks(1001);
    this.appliedZonal = this.getNosWorks(1002);
    this.zonalPermission = this.getNosWorks(3003);
    this.cancellation = this.getNosWorks(6002);
  }

  getNosWorks(id: number): number {
    const item = this.districtData.find((data: any) => data.did === id);
    return item?.nosworks ?? 0;
  }
}