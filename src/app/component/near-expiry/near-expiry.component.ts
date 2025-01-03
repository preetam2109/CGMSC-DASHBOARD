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
import { NearExpReportbatch } from 'src/app/Model/NearExpReportbatch';
import { NearExpReport } from 'src/app/Model/NearExpReport';



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
  selector: 'app-near-expiry',
  templateUrl: './near-expiry.component.html',
  styleUrls: ['./near-expiry.component.css']
})
export class NearExpiryComponent {
  @ViewChild('chart') chart: ChartComponent | undefined;
  public cO: Partial<ChartOptions> | undefined;
  chartOptions: ChartOptions;
  
  mcid:number=1
  nexppara:number=3
  expmonth:string='09-2024'



  dataSource!: MatTableDataSource<NearExpReportbatch>;
  dispatchPendings: NearExpReportbatch[] = [];
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
            const selectedCategory =
              this.chartOptions?.xaxis?.categories?.[dataPointIndex];
            const selectedSeries =
              this.chartOptions?.series?.[seriesIndex]?.name;
            if (selectedCategory && selectedSeries) {
              this.fetchDataBasedOnChartSelection(
                selectedCategory,
                selectedSeries
              );
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
        text: 'Near Expiry (in 9 Months)',
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
    this.dataSource = new MatTableDataSource<NearExpReportbatch>([]);

  }

  ngOnInit(){
    
    this.spinner.show();
    this.getAllDispatchPending();
    setTimeout(() => this.loadData(), 10000);
    // this.loadData()
  }
  getAllDispatchPending() {
    
    this.spinner.show();
    this.api.NearExpReportbatch(this.mcid,this.nexppara,this.expmonth).subscribe(
      (res) => {

        this.dispatchPendings = res.map((item:NearExpReportbatch,index:number) => ({
          ...item,
          sno: index + 1
        }));
        this.dataSource.data = this.dispatchPendings;
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
    this.api.getNearExpReport(1,8).subscribe(
      (data:  NearExpReport[]) => {
        const expirymonth: string[] = [];
        const noofitems: number[] = [];
        const noofbatches: number[] = [];
        var nearexpvalue: number[] = [];
        
        


      
      data.forEach(
        (item: NearExpReport) => { // Specify the type of `item`
          expirymonth.push(item.expirymonth);
          noofitems.push(item.noofitems);
          noofbatches.push(item.noofbatches);
          nearexpvalue.push(item.nearexpvalue);
        }
      );
      
        this.chartOptions.series = [
          {
            name: 'Items',
            data: noofitems,
            // color: '#FF0000',
          },
          {
            name: 'Batches',
            data: noofbatches,
            // color: '#0000FF',
          },
          {
            name: 'Value(in laks)',
            data: nearexpvalue,
            //color: '#00FF00',
          }
          //,
          // {
          //   name: 'Ayush',
          //   data: ayush,
          //   color: '#00FF00',
          // },
        ];
        this.chartOptions.xaxis = {
          categories: expirymonth,
        };
        this.cdr.detectChanges();
        this.spinner.hide();
      },
      (error: any) => {
        console.error('Error fetching data', error);
        this.spinner.hide();
      }
    );
  }
 
  fetchDataBasedOnChartSelection(selectedCategory: string, seriesName: string): void {
    
    this.spinner.show();
    
    this.api.NearExpReportbatch(this.mcid, this.nexppara, this.expmonth).subscribe(
      (res: NearExpReportbatch[]) => {
        
        console.log('API Response:', res);
  
        // Convert the selected category (expiry month) to targetYear and targetMonth
        const [month, year] = selectedCategory.split('-');
        const targetYear = parseInt(year, 10);
        const targetMonth = parseInt(month, 10) - 1; // Month is zero-based
  
        let filteredData: NearExpReportbatch[] = [];
  
        filteredData = res.filter((item: NearExpReportbatch) => {
          const expDateParts = item.expdate.split('-'); // Format is DD-MMM-YY
          const expDay = parseInt(expDateParts[0], 10);
          const expMonth = new Date(Date.parse(expDateParts[1] + " 1, 2020")).getMonth(); // Convert month name to number
          const expYear = 2000 + parseInt(expDateParts[2], 10); // Convert to four-digit year
  
          return expYear === targetYear && expMonth === targetMonth;
        });
  
        console.log('Filtered Data:', filteredData);
        this.dataSource.data = filteredData;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.cdr.detectChanges();
        this.spinner.hide();
      },
      (error: any) => {
        console.error('Error fetching data', error);
        this.spinner.hide();
      }
    );
  }
  
  
 
  exportToPDF() {
    const doc = new jsPDF('l', 'mm', 'a4');
    const columns = [
      { title: "S.No", dataKey: "sno" },
      { title: "itemcode", dataKey: "itemcode" },
      { title: "itemname", dataKey: "itemname" },
      { title: "wh", dataKey: "wh" },
      { title: "batchno", dataKey: "batchno" },
      { title: "expdate", dataKey: "expdate" },
      { title: "nearexpvalue", dataKey: "nearexpvalue" },
      { title: "qty", dataKey: "qty" }
    ];
    const rows = this.dispatchPendings.map(row => ({
      sno: row.sno,
      itemcode: row.itemcode,
      itemname: row.itemname,
      wh: row.wh,
      batchno: row.batchno,
      expdate: row.expdate,
      nearexpvalue: row.nearexpvalue,
      qty: row.qty,

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
