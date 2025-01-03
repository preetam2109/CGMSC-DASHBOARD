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
import { IWHPiplineSummary } from 'src/app/Model/IWHPiplineSummary';
import { IWHPiplineDetails } from 'src/app/Model/IWHPiplineDetails';



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
  selector: 'app-iwh-pending-tab-two',
  templateUrl: './iwh-pending-tab-two.component.html',
  styleUrls: ['./iwh-pending-tab-two.component.css']
})
export class IwhPendingTabTwoComponent {
  @ViewChild('chart') chart: ChartComponent | undefined;
  public cO: Partial<ChartOptions> | undefined;
  chartOptions: ChartOptions;
  whidMap: { [key: string]: number } = {};



  dataSource!: MatTableDataSource<IWHPiplineDetails>;
  dispatchPendings: IWHPiplineDetails[] = [];
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
              const whid = this.whidMap[selectedCategory]; // Get whid using towarehousename
              if (whid) {
                this.fetchDataBasedOnChartSelection(whid, selectedSeries); // Pass whid instead of towarehousename
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
        text: 'IWH Receipt Pending By 2nd Warehouse',
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
    this.dataSource = new MatTableDataSource<IWHPiplineDetails>([]);

  }

  ngOnInit(){
    
    this.spinner.show();
    // this.getAllDispatchPending();
    setTimeout(() => this.loadData(), 10000);
    // this.loadData()
  }
  getAllDispatchPending() {
    
    this.spinner.show();
    this.api.getIWHPiplineDetails(0,-1,'Y',0).subscribe(
      (res:any) => {

        this.dispatchPendings = res.map((item:IWHPiplineDetails,index:number) => ({
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
    this.api.getIWHPiplineDetails(0,0,'Y',0).subscribe(
      (res:any) => {

        this.dispatchPendings = res.map((item:IWHPiplineDetails,index:number) => ({
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
    this.api.getIWHPiplineDetails(0,0,'Y',0).subscribe(
      (res:any) => {

        this.dispatchPendings = res.map((item:IWHPiplineDetails,index:number) => ({
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
    this.api.getIWHPiplineDetails(0,0,'Y',0).subscribe(
      (res:any) => {

        this.dispatchPendings = res.map((item:IWHPiplineDetails,index:number) => ({
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
    this.api.getIWHPiplineDetails(0,0,'Y',0).subscribe(
      (res:any) => {

        this.dispatchPendings = res.map((item:IWHPiplineDetails,index:number) => ({
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
    this.api.getIWHPiplineSummary('Y',0).subscribe(
      (data: any) => {
        const towarehousename: string[] = [];
        const noSwhiSSUED: number[] = [];
        const nositems: number[] = [];
        const towhstockout: number[] = [];
        const avgDaysDel: number[] = [];
        this.whidMap = {}; // Initialize the mmidMap

        console.log('API Response:', data);


        data.forEach((item:any)=> {
           
          // towarehousename: string;
          // whid: number; 
          // noSwhiSSUED: number;
          // nositems: number;
          // towhstockout: number;
          // avgDaysDel: number;
          towarehousename.push(item.towarehousename);
          noSwhiSSUED.push(item.noSwhiSSUED);
          nositems.push(item.nositems);
          towhstockout.push(item.towhstockout);
          avgDaysDel.push(item.avgDaysDel);

          console.log('towarehousename:', item.towarehousename, 'whid:', item.towarehouseid);
          if (item.towarehousename && item.towarehouseid) {
            this.whidMap[item.towarehousename] = item.towarehouseid;
          } else {
            console.warn('Missing whid for towarehousename :', item.towarehousename);
          }

          
        });

        console.log('whidMap:', this.whidMap); // Log the populated mmidMap

        this.chartOptions.series = [

          // { 
          // name: 'noSwhiSSUED',
          // data: noSwhiSSUED, 
          // color:'#eeba0b'
          // }
           
          { 
            name: 'Nos Of Items', 
            data: nositems 
          },

          { 
            name: 'Stock-Out in Warehouse ', 
            data: towhstockout, 
            color:'#00b4d8'
          },

          { 
            name: 'Pending Since',
            data: avgDaysDel 

          },
        ];

        this.chartOptions.xaxis = {categories: towarehousename};
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
    if(seriesName==='Nos Of Items'){
      
      this.api.getIWHPiplineDetails(whid,0,'Y',0).subscribe(
        (res:any) => {
  
            this.dispatchPendings = res.map((item:IWHPiplineDetails,index:number) => ({
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
    else{

      this.api.getIWHPiplineDetails(whid,1,'Y',0).subscribe(
        (res:any) => {
  
            this.dispatchPendings = res.map((item:IWHPiplineDetails,index:number) => ({
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
      { title: "Transfer Date", dataKey: "transferdate" }
    ];
  
    const rows = this.dispatchPendings.map((row, index) => ({
      sno: index + 1, // Serial Number
      itemcode: row.itemcode,
      itemname: row.itemname,
      unit: row.unit,
      transferqty: row.transferqty,
      fromwarehousename: row.fromwarehousename,
      towarehousename: row.towarehousename,
      pendingsince: row.pendingsince,
      transferdate: row.transferdate
    }));
  
    autoTable(doc, {
      columns: columns,
      body: rows,
      startY: 20,
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] } // Header color
    });
  
    doc.save('IWHPending.pdf'); // Save with a new name
  
  }
  selectedTabValue(event: any): void {
    this.selectedTabIndex = event.index;
  }
}
