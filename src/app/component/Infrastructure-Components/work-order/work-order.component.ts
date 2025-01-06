import { ChangeDetectorRef, Component, Input, TemplateRef, ViewChild } from '@angular/core';
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
import { DashProgressDistCount, WOpendingTotal, WorkOrderPendingDetailsNew } from 'src/app/Model/DashProgressCount';
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
  selector: 'app-work-order',
  standalone: true,
  imports: [NgApexchartsModule,MatSortModule, MatPaginatorModule,MatTableModule,MatTableExporterModule, MatInputModule,
    MatFormFieldModule,NgbModule, MatMenuModule],
  templateUrl: './work-order.component.html',
  styleUrl: './work-order.component.css'
})
export class WorkOrderComponent {
  @ViewChild('chart') chart: ChartComponent | undefined;
  // @ViewChild('itemDetailsModal') itemDetailsModal: any;
  // @ViewChild('itemDetailsModal', { static: true }) itemDetailsModal: any;
  @Input() public user: any;
  // @ViewChild('itemDetailsModal') itemDetailsModal!: TemplateRef<any>;
  @ViewChild('itemDetailsModal') itemDetailsModal: any; 
  public cO: Partial<ChartOptions> | undefined;
  chartOptions: ChartOptions; // For bar chart
  chartOptions2: ChartOptions; // For bar chart
  chartOptionsLine: ChartOptions; // For line chart
  chartOptionsLine2: ChartOptions; // For line chart
  whidMap: { [key: string]: number } = {};
  divisionIDMap: { [key: string]: number } = {};
  dataSource!: MatTableDataSource<WorkOrderPendingDetailsNew>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  wOpendingTotal:WOpendingTotal[]=[];
  WorkorderpendingdetailsNew:WorkOrderPendingDetailsNew[]=[];
  dispatchPendings: WorkOrderPendingDetailsNew[] = [];

  // divisionid='D1024';
  divisionid=0;
  Scheme='Scheme';
  Total='Total';
  Contractor='Contractor';
  District='District'
  idMap: { [key: string]: number } = {};

  displayedColumns: string[] = ['sno','letterNo', 'head','acceptLetterDT','totalAmountOfContract','district','work','contractorNAme','work_id',];
  // displayedColumns: string[] = [
  //   'sno', 'work_id', 'letterNo', 'head', 'approver', 'type_name', 'district',
  //   'blockname', 'work', 'aaamt', 'tsamt', 'aaDate', 'tsDate', 'acceptanceLetterRefNo',
  //   'acceptLetterDT', 'pac', 'totalAmountOfContract', 'sanctionRate', 'sanctionDetail',
  //   'timeAllowed', 'dateOfSanction', 'dateOfIssueNIT', 'cid', 'contractorNAme', 'regType',
  //   'class', 'englishAddress', 'mobNo', 'asPath', 'asLetter', 'groupName', 'lProgress',
  //   'pdate', 'pRemarks', 'remarks', 'tenderReference'
  // ];

  constructor(public api: ApiService, public spinner: NgxSpinnerService,private cdr: ChangeDetectorRef,private modalService: NgbModal){
    this.chartOptions = {
      series: [],
      chart: {
        type: 'bar',
        stacked: true,
        height: 400,
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
              if (selectedData) {
                const id = selectedData.id;  // Extract the id from the matching entry
                this.fetchDataBasedOnChartSelection(id, selectedSeries);
                //  this.modalService.open(this.itemDetailsModal, { centered: true });

            // this.openModalWithChartData(dataPointIndex, seriesIndex);

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
        text: 'Total Pending Total Works wise Progress',
        // text: 'RP Type Total Pending Works wise Progress',
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
        height: 600,
        // width:600,
        events: {
          dataPointSelection: (
            event,
            chartContext,
            { dataPointIndex, seriesIndex }
          ) => {
            const selectedCategory =
              this.chartOptions2?.xaxis?.categories?.[dataPointIndex];
            const selectedSeries = this.chartOptions2?.series?.[seriesIndex]?.name;

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
        text: 'Total Pending  Works District wise Progress',
        // text: 'RP Type Total Pending Works wise Progress',
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
        height: 600,
        // width:600,
        events: {
          dataPointSelection: (
            event,
            chartContext,
            { dataPointIndex, seriesIndex }
          ) => {
            const selectedCategory =
              this.chartOptionsLine?.xaxis?.categories?.[dataPointIndex];
            const selectedSeries = this.chartOptionsLine?.series?.[seriesIndex]?.name;

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
        text: 'Total Pending Works Contractor  wise Progress',
        // text: 'RP Type Total Pending Works wise Progress',
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
        height: 400,
        // width:600,
        events: {
          dataPointSelection: (
            event,
            chartContext,
            { dataPointIndex, seriesIndex }
          ) => {
            const selectedCategory =
              this.chartOptionsLine2?.xaxis?.categories?.[dataPointIndex];
            const selectedSeries = this.chartOptionsLine2?.series?.[seriesIndex]?.name;

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
        text: 'Total Pending Works Scheme wise Progress',
        // text: 'RP Type Total Pending Works wise Progress',
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
    this.GetWOPendingTotal();
    this.GetWOPendingDistrict();
    this.GetWOPendingScheme();
    this.GetWOPendingContractor();
    this.dataSource = new MatTableDataSource<WorkOrderPendingDetailsNew>([]);

    // this.dataSource = new MatTableDataSource<WOpendingTotal>([]);
  }
 
  ngOnInit() {
    // this.GetWOPendingTotal();
    // this.GetWOPendingDistrict();
    // this.GetWOPendingContractor();
  // this.GetWOPendingScheme();
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

  //#region API get DATA
  GetWOPendingTotal(): void {
    this.spinner.show();
    this.api.WOPendingTotal(this.Total,this.divisionid).subscribe(
      (data: any) => {
        this.wOpendingTotal = data;
        const name: string[] = [];
        const id: string[] = [];
        const pendingWork: any[] = [];
        const contrctValuecr: number[] = [];
        const noofWorksGreater7Days: any[] = [];
        this.whidMap = {}; // Initialize the mmidMap
        console.log('API Response:', data);
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
          }
        });
        this.chartOptions.series = [
          {name: 'Total Pending Works', data: pendingWork,color:'#eeba0b'} ,
          { name: 'Contrct Value cr',data: contrctValuecr },
          { name: 'Noof Works Greater 7 Days', data: noofWorksGreater7Days, color: 'rgb(0, 143, 251)' }, ];

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
    this.api.WOPendingTotal(this.District,this.divisionid).subscribe(
      (data: any) => {
        // this.wOpendingTotal = data;
        const name: string[] = [];
        const id: string[] = [];
        const pendingWork: any[] = [];
        const contrctValuecr: number[] = [];
        const noofWorksGreater7Days: any[] = [];
        this.whidMap = {}; // Initialize the mmidMap
        console.log('API Response:', data);
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
            name: 'Total Pending Works',
            data: pendingWork,
            // color: '#0000FF'
            color:'#eeba0b'
          }
          ,
          {
            name: 'Contrct Value cr',
            data: contrctValuecr,
            // color:'#00b4d8'
            // color:  'rgb(0, 128, 0)'
            // color: '#eeba0b'
          },
          {
            name: 'Noof Works Greater 7 Days',
            data: noofWorksGreater7Days,
            color: 'rgb(0, 143, 251)'
            // color: 'rgb(144, 238, 144)'
            // color: '#90EE90'
           
          },
        ];

        this.chartOptions2.xaxis = { categories: name };
        this.cO = this.chartOptions2;
        this.cdr.detectChanges();
      },
      (error: any) => {
        console.error('Error fetching data', error);
      }
    );
  }
  GetWOPendingContractor(): void {
    // this.spinner.show();
    this.api.WOPendingTotal(this.Contractor,this.divisionid).subscribe(
      (data: any) => {
        // this.wOpendingTotal = data;
        const name: string[] = [];
        const id: string[] = [];
        const pendingWork: any[] = [];
        const contrctValuecr: number[] = [];
        const noofWorksGreater7Days: any[] = [];
        this.whidMap = {}; // Initialize the mmidMap
        console.log('API Response:', data);
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
            name: 'Total Pending Works',
            data: pendingWork,
            // color: '#0000FF'
            color:'#eeba0b'
          }
          ,
          {
            name: 'Contrct Value cr',
            data: contrctValuecr,
            // color:'#00b4d8'
            // color:  'rgb(0, 128, 0)'
            // color: '#eeba0b'
          },
          {
            name: 'Noof Works Greater 7 Days',
            data: noofWorksGreater7Days,
            color: 'rgb(0, 143, 251)'
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
    this.api.WOPendingTotal(this.Scheme,this.divisionid).subscribe(
      (data: any) => {
        // this.wOpendingTotal = data;
        const name: string[] = [];
        const id: string[] = [];
        const pendingWork: any[] = [];
        const contrctValuecr: number[] = [];
        const noofWorksGreater7Days: any[] = [];
        this.whidMap = {}; // Initialize the mmidMap
        console.log('API Response:', data);
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
            name: 'Total Pending Works',
            data: pendingWork,
            // color: '#0000FF'
            color:'#eeba0b'
          }
          ,
          {
            name: 'Contrct Value cr',
            data: contrctValuecr,
            // color:'#00b4d8'
            // color:  'rgb(0, 128, 0)'
            // color: '#eeba0b'
          },
          {
            name: 'Noof Works Greater 7 Days',
            data: noofWorksGreater7Days,
            color: 'rgb(0, 143, 251)'
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
//#endregion
//#region  Fetch Data in table form
fetchDataBasedOnChartSelection(divisionID: any, seriesName: string): void {
  console.log(`Selected WHID: ${divisionID}, Series: ${seriesName}`);
  const  distid=0;
  const mainSchemeId=0;
  const contractid=0;
  this.spinner.show();
 
  this.api.GetWorkOrderPendingDetailsNew(divisionID,mainSchemeId,distid,contractid).subscribe(
    (res) => {
      // this.dispatchPendings = res.map((item: WorkOrderPendingDetailsNew, index: number) => ({
      //   ...item,
      //   sno: index + 1
      // }));
      this.dispatchPendings = res.map((item: WorkOrderPendingDetailsNew, index: number) => ({
        ...item,
        sno: index + 1
      }));
      this.dataSource.data = this.dispatchPendings;
      // this.dataSource.data = this.dispatchPendings;
      console.log(this.dataSource.data);
      // console.log('Data with serial numbers:', this.dispatchPendings); 
        // console.log("res ",JSON.stringify(res))
        // this.dispatchPendings = res;
        // console.log("Welcome ",JSON.stringify(this.dispatchPendings))
        this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.cdr.detectChanges();
      this.modalService.open(this.itemDetailsModal, { centered: true });
      this.spinner.hide();
    },
    (error) => {
      console.error('Error fetching data', error);
    }
  );
}
applyTextFilter(event: Event) {
  
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
//#endregion
}
