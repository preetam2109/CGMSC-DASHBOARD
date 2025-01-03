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
  selector: 'app-indent-pending-wh',
  templateUrl: './indent-pending-wh.component.html',
  styleUrls: ['./indent-pending-wh.component.css']
})
export class  IndentPendingWHComponent {
  @ViewChild('chart') chart: ChartComponent | undefined;
  public cO: Partial<ChartOptions> | undefined;
  chartOptions: ChartOptions;
  whidMap: { [key: string]: number } = {};



  dataSource!: MatTableDataSource<IndentPendingWH>;
  dispatchPendings: IndentPendingWH[] = [];
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
        text: 'Drugs/Consumables Indent Pending at Warehouse',
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
    this.dataSource = new MatTableDataSource<IndentPendingWH>([]);

  }

  ngOnInit(){
    
    this.spinner.show();
    this.getAllDispatchPending();
    setTimeout(() => this.loadData(), 10000);
    // this.loadData()
  }
  getAllDispatchPending() {
    
    this.spinner.show();
    this.api.getIndentPendingAtWHDetails(-1,1,0).subscribe(
      (res) => {

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
  showAllData(){
    this.spinner.show();
    this.api.getIndentPendingAtWHDetails(0,1,0).subscribe(
      (res) => {

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
  showAllDataGreaterthan15days(){
    this.spinner.show();
    this.api.getIndentPendingAtWHDetails(0,4,0).subscribe(
      (res) => {

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
    this.api.getIndentPendingAtWHDetails(0,3,0).subscribe(
      (res) => {

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
    this.api.getIndentPendingAtWHDetails(0,2,0).subscribe(
      (res) => {

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
    this.api.getIndentPendingAtWHData().subscribe(
      (data: IndentPendingWHSummary[]) => {
        const warehousename: string[] = [];
        const nosindent: number[] = [];
        const dhs: number[] = [];
        const dmefac: number[] = [];
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
          warehousename.push(item.warehousename);
          nosindent.push(item.nosindent);
          dhs.push(item.dhs);
          dmefac.push(item.dmefac);
          ayush.push(item.ayush);

          console.log('warehousename:', item.warehousename, 'whid:', item.warehouseid);
          if (item.warehousename && item.warehouseid) {
            this.whidMap[item.warehousename] = item.warehouseid;
          } else {
            console.warn('Missing whid for warehousename :', item.warehousename);
          }

          
        });

        console.log('whidMap:', this.whidMap); // Log the populated mmidMap

        this.chartOptions.series = [

          { 
          name: 'Total Indent',
          data: nosindent, 
          color:'#eeba0b'
          }
           ,
          { 
            name: 'DHS', 
            data: dhs 
          },

          { 
            name: 'DME', 
            data: dmefac, 
            color:'#00b4d8'
          },

          { 
            name: 'AYUSH',
            data: ayush 

          },
        ];

        this.chartOptions.xaxis = {categories: warehousename};
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
    this.api.getIndentPendingAtWHDetails(whid,1,0).subscribe(
      (res) => {

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

  exportToPDF() {
    const doc = new jsPDF('l', 'mm', 'a4');
    const columns = [
      { title: "S.No", dataKey: "sno" },
      { title: "nocnumber", dataKey: "nocnumber" },
      { title: "warehousename", dataKey: "warehousename" },
      { title: "facilityname", dataKey: "facilityname" },
      { title: "nositems", dataKey: "nositems" },
      { title: "inddt", dataKey: "inddt" },
      { title: "pendingday", dataKey: "pendingday" }
    ];
    const rows = this.dispatchPendings.map(row => ({
      sno: row.sno,
      nocnumber: row.nocnumber,
      warehousename: row.warehousename,
      facilityname: row.facilityname,
      nositems: row.nositems,
      inddt: row.inddt,
      pendingday: row.pendingday
    }));

    autoTable(doc, {
      columns: columns,
      body: rows,
      startY: 20,
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] }
    });

    doc.save('IndentPending.pdf');
  }
  selectedTabValue(event: any): void {
    this.selectedTabIndex = event.index;
  }
}
