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
import { InitiatedNotIssueSummary } from 'src/app/Model/InitiatedNotIssueSummary';
import { InitiatedNotIssueDetaqils } from 'src/app/Model/InitiatedNotIssueDetaqils';



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
  selector: 'app-iwh-pending-tab-one',
  templateUrl: './iwh-pending-tab-one.component.html',
  styleUrls: ['./iwh-pending-tab-one.component.css']
})
export class IwhPendingTabOneComponent {
  @ViewChild('chart') chart: ChartComponent | undefined;
  public cO: Partial<ChartOptions> | undefined;
  chartOptions: ChartOptions;
  whidMap: { [key: string]: number } = {};



  dataSource!: MatTableDataSource<InitiatedNotIssueDetaqils>;
  dispatchPendings: InitiatedNotIssueDetaqils[] = [];
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
              const whid = this.whidMap[selectedCategory]; // Get whid using fromwarehousename
              if (whid) {
                this.fetchDataBasedOnChartSelection(whid, selectedSeries); // Pass whid instead of fromwarehousename
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
        min:0,
        max:100,
        title: {
          text: undefined,
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ['#dee2ff'] 
        }
      },
      stroke: {
        width: 1,
        colors: ['#fff'],
      },
      title: {
        text: 'IWH Transfer Pending from 1st Warehouse',
        align: 'center',
        style: {
          fontSize: '12px',
          color:'#6e0d25'
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
    this.dataSource = new MatTableDataSource<InitiatedNotIssueDetaqils>([]);

  }

  ngOnInit(){
    
    this.spinner.show();
    this.getAllDispatchPending();
    setTimeout(() => this.loadData(), 10000);
    // this.loadData()
  }
  getAllDispatchPending() {
    
    this.spinner.show();
    this.api.getIInitiatedNotIssueDetaqils(0,0,'Y',0).subscribe(
      (res:any) => {

        this.dispatchPendings = res.map((item:InitiatedNotIssueDetaqils,index:number) => ({
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
  showAllData(){
    this.spinner.show();
    this.api.getIInitiatedNotIssueDetaqils(0,0,'Y',0).subscribe(
      (res:any) => {

        this.dispatchPendings = res.map((item:InitiatedNotIssueDetaqils,index:number) => ({
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
  showAllDataGreaterthan15days(){
    this.spinner.show();
    this.api.getIInitiatedNotIssueDetaqils(0,0,'Y',0).subscribe(
      (res:any) => {

        this.dispatchPendings = res.map((item:IndentPendingWH,index:number) => ({
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
  showAllData7to15days(){
    this.spinner.show();
    this.api.getIInitiatedNotIssueDetaqils(0,0,'Y',0).subscribe(
      (res:any) => {

        this.dispatchPendings = res.map((item:IndentPendingWH,index:number) => ({
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
  showAllData7days(){
    this.spinner.show();
    this.api.getIInitiatedNotIssueDetaqils(0,0,'Y',0).subscribe(
      (res:any) => {

        this.dispatchPendings = res.map((item:IndentPendingWH,index:number) => ({
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
    this.api.getInitiatedNotIssueSummary('Y',0).subscribe(
      (data: any) => {
        const fromwarehousename: string[] = [];
        const nostowh: number[] = [];
        const nositems: number[] = [];
        const towhstockout: number[] = [];
        const nostno: number[] = [];
        const avgdaysdel: number[] = [];
        this.whidMap = {}; // Initialize the mmidMap

        console.log('API Response:', data);


        data.forEach((item:any)=> {
           
          // fromwarehousename: string;
          // whid: number; 
          // nostowh: number;
          // nositems: number;
          // towhstockout: number;
          // nostno: number;
          fromwarehousename.push(item.fromwarehousename);
          nostowh.push(item.nostowh);
          nositems.push(item.nositems);
          towhstockout.push(item.towhstockout);
          nostno.push(item.nostno);
          avgdaysdel.push(item.avgdaysdel);


          console.log('fromwarehousename:', item.fromwarehousename, 'whid:', item.fromwarehouseid);
          if (item.fromwarehousename && item.fromwarehouseid) {
            this.whidMap[item.fromwarehousename] = item.fromwarehouseid;
          } else {
            console.warn('Missing whid for fromwarehousename :', item.fromwarehousename);
          }

          
        });

        console.log('whidMap:', this.whidMap); // Log the populated mmidMap

        this.chartOptions.series = [

          // { 
          // name: 'nostowh',
          // data: nostowh , 
          // color:'#eeba0b'
          // }
           
          { 
            name: 'Items', 
            data: nositems,
            color: '#70e000' 
          },

          { 
            name: 'Stock-out in to WH', 
            data: towhstockout, 
            color:'#b21e35'
          },

          // { 
          //   name: 'nostno',
          //   data: nostno 

          // },
          { 
            name: 'AVG Delay Days',
            data: avgdaysdel ,
            color:'#42a5f5'

          }
        ];

        this.chartOptions.xaxis = {categories: fromwarehousename};
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
    if(seriesName==='Stock-out in to WH'){

      this.spinner.show();
      this.api.getIInitiatedNotIssueDetaqils(whid,1,'Y',0).subscribe(
        (res:any) => {
  
            this.dispatchPendings = res.map((item:IndentPendingWH,index:number) => ({
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
    }else{
      this.spinner.show();
      this.api.getIInitiatedNotIssueDetaqils(whid,0,'Y',0).subscribe(
        (res:any) => {
  
            this.dispatchPendings = res.map((item:IndentPendingWH,index:number) => ({
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
  }

  exportToPDF() {
    const doc = new jsPDF('l', 'mm', 'a4'); // Landscape, A4 size
    const columns = [
      { title: "S.No", dataKey: "sno" },
      { title: "Item Code", dataKey: "itemcode" },
      { title: "Item Name", dataKey: "itemname" },
      { title: "Unit", dataKey: "unit" },
      { title: "Transfer Qty", dataKey: "transferqty" },
      { title: "From Warehouse", dataKey: "fromwarehousename" },
      { title: "To Warehouse", dataKey: "towarehousename" },
      { title: "Pending Since", dataKey: "pendingsince" },
      { title: "Initiated Date", dataKey: "initiateddt" },
      { title: "Transfer No", dataKey: "transferno" }
    ];
  
    const rows = this.dispatchPendings.map((row, index) => ({
      sno: index + 1, // Generate serial number
      itemcode: row.itemcode,
      itemname: row.itemname,
      unit: row.unit,
      transferqty: row.transferqty,
      fromwarehousename: row.fromwarehousename,
      towarehousename: row.towarehousename,
      pendingsince: row.pendingsince,
      initiateddt: row.initiateddt,
      transferno: row.transferno
    }));
  
    autoTable(doc, {
      columns: columns,
      body: rows,
      startY: 20,
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] } // Customize the header style
    });
  
    doc.save('IwhPending.pdf'); // Save PDF with a relevant name
  }
  
  selectedTabValue(event: any): void {
    this.selectedTabIndex = event.index;
  }
}
