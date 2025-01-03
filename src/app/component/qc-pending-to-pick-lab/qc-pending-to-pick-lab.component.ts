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
import { LabIssuePendingDetails } from 'src/app/Model/LabIssuePendingDetails';
import { InTransitHOtoLab } from 'src/app/Model/InTransitHOtoLab';
import { InTransitHOtoLabDetails } from 'src/app/Model/InTransitHOtoLabDetails';



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
  selector: 'app-qc-pending-to-pick-lab',
  templateUrl: './qc-pending-to-pick-lab.component.html',
  styleUrls: ['./qc-pending-to-pick-lab.component.css']
})
export class QcPendingToPickLabComponent {
  @ViewChild('chart') chart: ChartComponent | undefined;
  public cO: Partial<ChartOptions> | undefined;
  chartOptions: ChartOptions;
  whidMap: { [key: string]: number } = {};
  mcid=1;



  dataSource!: MatTableDataSource<InTransitHOtoLabDetails>;
  dispatchPendings: InTransitHOtoLabDetails[] = [];
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
              const mcid = this.whidMap[selectedCategory]; 
              if (mcid) {
                this.fetchDataBasedOnChartSelection(mcid, selectedSeries); 
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
        // min:0,
        // max:100
        
      },
      yaxis: {
        title: {
          text: undefined,
        },
        // min:0,
        // max:100,
        
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
        text: 'Pending to Pick for Lab',
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

    
    this.loadData(this.mcid);
    this.dataSource = new MatTableDataSource<InTransitHOtoLabDetails>([]);

  }
  

  ngOnInit(){
    
    this.spinner.show();
     this.getAllDispatchPending();
    setTimeout(() => this.loadData(this.mcid), 10000);
    // this.loadData()
  }


  getAllDispatchPending() {
    
    this.spinner.show();
    this.api.getInTransitHOtoLabDetails('PP',0,1,0,0).subscribe(
      (res:any) => {

        this.dispatchPendings = res.map((item:InTransitHOtoLabDetails,index:number) => ({
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
    this.api.getInTransitHOtoLabDetails('PP',0,1,0,0).subscribe(
      (res:any) => {

        this.dispatchPendings = res.map((item:InTransitHOtoLabDetails,index:number) => ({
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
    this.api.getInTransitHOtoLabDetails('PP',0,1,0,0).subscribe(
      (res:any) => {

        this.dispatchPendings = res.map((item:InTransitHOtoLabDetails,index:number) => ({
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
    this.api.getInTransitHOtoLabDetails('PP',0,1,0,0).subscribe(
      (res:any) => {

        this.dispatchPendings = res.map((item:InTransitHOtoLabDetails,index:number) => ({
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
    this.api.getInTransitHOtoLabDetails('PP',0,1,0,0).subscribe(
      (res:any) => {

        this.dispatchPendings = res.map((item:InTransitHOtoLabDetails,index:number) => ({
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

  loadData(mcid:any): void {
    this.mcid = mcid;
    
    this.spinner.show();
    
    this.api.getnTransitHOtoLab(mcid,'PP').subscribe(
      (data: any) => {
        const labname: string[] = [];
        const beT2_5: number[] = [];
        const betW6_15: number[] = [];
        const abovE15: number[] = [];
        const nosbatch: number[] = [];
        this.whidMap = {}; 
        // Initialize the mmidMap
        // const delayparA1: number[] = [];


        console.log('API Response:', data);


        data.forEach((item:any)=> {
           
          // towarehousename: string;
          // whid: number; 
          // mcategory: number;
          // betW6_15": number;
          // betW6_15": number;
          // avgDaysDel: number;
          // mcategory.push(item.mcategory);
          labname.push(item.labname);
          beT2_5.push(item.beT2_5);
          betW6_15.push(item.betW6_15);
          abovE15.push(item.abovE15);
          nosbatch.push(item.nosbatch);
          

          // console.log('labname:', item.labname, 'delayparA1:', item.labname);
          // if (item.labname && item.labname) {
          //   this.whidMap[item.labname] = item.labname;
            

          // } else {
            // console.warn('beT2_5 for labname:', item.labname);
          // }

          
        });
        // console.log('whidMap:', this.whidMap); // Log the populated whidMap

        this.chartOptions.series = [

          
           
          { 
            name: 'Nos Of Batch',
            data: nosbatch 

          },
          { 
            name: 'Bet 2 to 5 days', 
            data: beT2_5 
          },
          { 
            name: 'Bet 6 to 15 days', 
            data: betW6_15 
          },
          { 
            name: 'Above 15 days', 
            data: abovE15 
          }

          
          
        ];

        this.chartOptions.xaxis = {categories: labname};
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
  fetchDataBasedOnChartSelection(mcid: number, seriesName: string): void {
    
    console.log(`Selected mcid: ${mcid}, Series: ${seriesName}`);
    // Add your logic to fetch data based on selected warehouse (whid)
    this.spinner.show();
    if(seriesName==='Nos Of Items'){
      
      this.api.getInTransitHOtoLabDetails('PP',0,1,0,0).subscribe(
        (res:any) => {
  
            this.dispatchPendings = res.map((item:InTransitHOtoLabDetails,index:number) => ({
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
    else if(seriesName==='Nos Of Batch'){

      this.api.getInTransitHOtoLabDetails('PP',0,1,0,0).subscribe(
        (res:any) => {
  
            this.dispatchPendings = res.map((item:InTransitHOtoLabDetails,index:number) => ({
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
      // unit: row.unit,
      // transferqty: row.transferqty,
      // fromwarehousename: row.fromwarehousename,
      // towarehousename: row.towarehousename,
      // pendingsince: row.pendingsince,
      // transferdate: row.transferdate
    }));
  
    autoTable(doc, {
      columns: columns,
      body: rows,
      startY: 20,
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] } // Header color
    });
  
    doc.save('TransferPendingDetails.pdf'); // Save with a new name
  
  }
  selectedTabValue(event: any): void {
    this.selectedTabIndex = event.index;
  }
}

