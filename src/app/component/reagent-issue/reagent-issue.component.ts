import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexTitleSubtitle,
  ApexYAxis,
  ApexTooltip,
  ApexFill,
  ApexLegend
} from 'ng-apexcharts';
import { dispatchPending } from 'src/app/Model/dispatchPending';
import { DistrictService } from 'src/app/service/district.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/service/api.service';
import { IndentPendingWH } from 'src/app/Model/IndentPendingWH';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { IndentPendingWHSummary } from 'src/app/Model/IndentPendingWHSummary';
import { ReagIndentIssueDetails } from 'src/app/Model/ReagIndentIssueDetails';
import { ReagIndentIssueMMID } from 'src/app/Model/ReagIndentIssueMMID';



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
  selector: 'app-reagent-issue',
  templateUrl: './reagent-issue.component.html',
  styleUrls: ['./reagent-issue.component.css']
})
export class ReagentIssueComponent {
  @ViewChild('chart') chart: ChartComponent | undefined;
  public cO: Partial<ChartOptions> | undefined;
  chartOptions: ChartOptions;
  whidMap: { [key: string]: number } = {};



  dataSource!: MatTableDataSource<ReagIndentIssueDetails>;
  dispatchPendings: ReagIndentIssueDetails[] = [];
  selectedTabIndex: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private spinner: NgxSpinnerService,
    private api: ApiService,
    private http: HttpClient,
    private breakpointObserver: BreakpointObserver,
    private cdr: ChangeDetectorRef
  ) {
    this.chartOptions = {
      series: [],
      chart: {
        type: 'bar',
        stacked: true,
        height: 400,
        events: {
          dataPointSelection: (
            event,
            chartContext,
            { dataPointIndex, seriesIndex }
          ) => {
            const selectedCategory = this.chartOptions?.xaxis?.categories?.[dataPointIndex];
            const selectedSeries = this.chartOptions?.series?.[seriesIndex]?.name;

            if (selectedCategory && selectedSeries) {
              const whid = this.whidMap[selectedCategory]; // Get whid using warehousename
              if (whid) {
                this.fetchDataBasedOnChartSelection(whid, selectedSeries); // Pass whid instead of warehousename
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
          colors: ['#FF0000'] 
        }
      },
      stroke: {
        width: 1,
        colors: ['#fff'],
      },
      title: {
        text: 'Reagent Issue Summary Report',
        align: 'center',
        style: {
          fontSize: '12px',
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
    this.dataSource = new MatTableDataSource<ReagIndentIssueDetails>([]);

  }

  ngOnInit(){
    
    this.spinner.show();
    this.getAllDispatchPending();
    setTimeout(() => this.loadData(), 10000);
    // this.loadData()
  }
  getAllDispatchPending() {
    
    this.spinner.show();
    this.api.getReagIndentIssueDetails(0).subscribe(
      (res) => {

        this.dispatchPendings = res.map((item:ReagIndentIssueDetails,index:number) => ({
          ...item,
          sno: index + 1
        }));
        this.dataSource.data = this.dispatchPendings;
        // console.log('Data with serial numbers:', this.dispatchPendings); 
        // console.log("Welcome ",JSON.stringify(res))
        // this.dispatchPendings = res;
        // console.log("Welcome ",JSON.stringify(this.dispatchPendings))
        // this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.spinner.hide();
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error fetching data', error);
        this.spinner.hide();
      }
    );
  }

  applyTextFilter(event: Event) {
    ;
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadData(): void {
    this.spinner.show();
    this.api.getReagIndentIssueMMID().subscribe(
      (data: ReagIndentIssueMMID[]) => {
        const eqpname: string[] = [];
        const nosreagent: number[] = [];
        const nosfac: number[] = [];
        const issuevaluesincE3SEP: number[] = [];
        const ayush: number[] = [];
        this.whidMap = {}; // Initialize the mmidMap

        console.log('API Response:', data);


        data.forEach((item)=> {
           
          // warehousename: string;
          // whid: number; 
          // nosindent: number;
          // dhs: number;
          // dmefac: number;
          // ayush: number;
          eqpname.push(item.eqpname);
          nosreagent.push(item.nosreagent);
          nosfac.push(item.nosfac);
          issuevaluesincE3SEP.push(item.issuevaluesincE3SEP);
          // ayush.push(item.ayush);

          console.log('warehousename:', item.eqpname, 'whid:', item.mmid);
          if (item.eqpname && item.mmid) {
            this.whidMap[item.eqpname] = item.mmid;
          } else {
            console.warn('Missing whid for warehousename :', item.eqpname);
          }

          
        });

        console.log('whidMap:', this.whidMap); // Log the populated mmidMap

        this.chartOptions.series = [
          { name: 'No Reagent', data: nosreagent },
          { name: 'Nos facility', data: nosfac },
          { name: 'Issue values (in Lakhs) ', data: issuevaluesincE3SEP }
          // { name: 'Ayush', data: ayush },
        ];

        this.chartOptions.xaxis = {categories: eqpname};
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
  // fetchDataBasedOnChartSelection(supplier: string, seriesName: string): void {
  //   
  //   this.spinner.show();
  //   this.api.getDispatchPending().subscribe(
  //     (res) => {
  //       let filteredData: dispatchPending[] = [];
  //       if (seriesName === 'nositems') {
  //         filteredData = res.filter((item) => item.supplier === supplier );
  //       } else if (seriesName === 'nospo') {
  //         filteredData = res.filter((item) => item.supplier === supplier);
  //       }
  //       this.dataSource.data = filteredData;
  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort = this.sort;
  //       
  //       this.spinner.hide();
  //     },
  //     (error) => {
  //       console.error('Error fetching data', error);
  //       this.spinner.hide();
  //     }
  //   );
  // }
  fetchDataBasedOnChartSelection(whid: number, seriesName: string): void {
    console.log(`Selected WHID: ${whid}, Series: ${seriesName}`);
    // Add your logic to fetch data based on selected warehouse (whid)
    this.spinner.show();
    this.api.getReagIndentIssueDetails(whid).subscribe(
      (res) => {

          this.dispatchPendings = res.map((item:ReagIndentIssueDetails,index:number) => ({
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
        this.spinner.hide();
      }
    );
  }

  exportToPDF() {
    const doc = new jsPDF('l', 'mm', 'a4');
    const columns = [
      { title: "S.No", dataKey: "sno" },
      { title: "warehousename", dataKey: "warehousename" },
      { title: "districtname", dataKey: "districtname" },
      { title: "facilityname", dataKey: "facilityname" },
      { title: "eqpname", dataKey: "eqpname" },
      { title: "make", dataKey: "make" },
      { title: "model", dataKey: "model" },
      { title: "indentdt", dataKey: "indentdt" },
      { title: "whissuedate", dataKey: "whissuedate" },
      { title: "nositems", dataKey: "nositems" },
      { title: "inddt", dataKey: "inddt" },
      { title: "pendingday", dataKey: "pendingday" }
    ];
    const rows = this.dispatchPendings.map(row => ({
      sno: row.sno,
      warehousename: row.warehousename,
      districtname: row.districtname,
      facilityname: row.facilityname,
      eqpname:row.eqpname,
      model:row.model,
      indentdt:row.indentdt,
      whissuedate:row.whissuedate,
      nositems: row.nositems,
      indentvalue: row.indentvalue
    }));

    autoTable(doc, {
      columns: columns,
      body: rows,
      startY: 20,
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] }
    });

    doc.save('ReagentIssue.pdf');
  }
  selectedTabValue(event: any): void {
    this.selectedTabIndex = event.index;
  }
}
