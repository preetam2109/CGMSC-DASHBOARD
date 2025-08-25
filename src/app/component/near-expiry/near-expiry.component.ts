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
import { Router } from '@angular/router';
import { Observable, catchError, finalize, forkJoin, map, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { InsertUserPageViewLogmodal} from 'src/app/Model/DashLoginDDL';
import { Location } from '@angular/common';


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
  selectedCategoryRadio:any='Drugs';
 


  dataSource!: MatTableDataSource<NearExpReportbatch>;
  dispatchPendings: NearExpReportbatch[] = [];
  selectedTabIndex: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  InsertUserPageViewLogdata: InsertUserPageViewLogmodal = new InsertUserPageViewLogmodal();
  pageName: string = '';
  fullUrl: string = '';
  constructor(
    public toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private api: ApiService,
    private http: HttpClient,
    private breakpointObserver: BreakpointObserver,
    private cdr: ChangeDetectorRef,
    private router:Router,private location: Location,
  ) {
    this.pageName = this.location.path();
    this.fullUrl = window.location.href;
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
    
    // this.getAllDispatchPending();
    // setTimeout(() => this.loadData(), 10000);
    // this.loadData()
    
    this.spinner.show();
    forkJoin([
      this.getAllDispatchPending().pipe(catchError(() => of(null))),
      this.loadData().pipe(catchError(() => of(null))),
    ]).pipe(
      finalize(() => this.spinner.hide())
    ).subscribe({
      error: () => this.toastr.error('Some data failed to load')
    });
    this.InsertUserPageViewLog();

  }
  getAllDispatchPending(): Observable<any[]> {
    
    this.spinner.show();
    return this.api.NearExpReportbatch(this.mcid, this.nexppara, this.expmonth).pipe(
      map((res: NearExpReportbatch[]) => {
        this.dispatchPendings = res.map((item, index) => ({
          ...item,
          sno: index + 1
        }));
        this.dataSource.data = this.dispatchPendings;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.cdr.detectChanges();
        this.spinner.hide();
        return res;
      }),
      catchError((error) => {
        console.error('Error fetching data', error);
        this.spinner.hide();
        return of([]);
      })
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

  loadData(): Observable<any[]> {
    this.spinner.show();
  
    return this.api.getNearExpReport(this.mcid, 8).pipe(
      map((data: NearExpReport[]) => {
        const expirymonth: string[] = [];
        const barLabels: string[] = [];
        const barValues: number[] = [];
  
        data.forEach((item) => {
          expirymonth.push(item.expirymonth);
          barLabels.push(`${item.noofitems} Items, ${item.noofbatches} Batches, ${item.nearexpvalue} Lacs`);
          barValues.push(item.noofitems); // ✅ Use actual item count for bar height
        });
  
        this.chartOptions.series = [
          {
            name: 'Number of Items',
            data: barValues
          }
        ];
  
        this.chartOptions.xaxis = {
          categories: expirymonth
        };
  
        // ✅ Label inside the bar
        this.chartOptions.dataLabels = {
          enabled: true,
          formatter: function (_val: any, opts: any) {
            return barLabels[opts.dataPointIndex];
          },
          style: {
            fontSize: '12px',
            colors: ['#fff'] // or ['#000'] depending on bar color
          }
        };
  
        // ✅ Tooltip (optional): show the full combined label or just value
        this.chartOptions.tooltip = {
          y: {
            formatter: function (_val: any, opts: any) {
              return barLabels[opts.dataPointIndex]; // or just return _val.toString() to show number
            }
          }
        };
  
        this.cdr.detectChanges();
        this.spinner.hide();
        return data;
      }),
      catchError((error) => {
        console.error('Error fetching Near Expiry Report:', error);
        this.toastr.error('Failed to load expiry data');
        this.spinner.hide();
        return of([]);
      })
    );
  }
  
  
  
  fetchDataBasedOnChartSelection(selectedCategory: string, seriesName: string): void {
    
    this.spinner.show();
    
    this.expmonth=selectedCategory;
    this.api.NearExpReportbatch(this.mcid, this.nexppara, this.expmonth).subscribe(
      (res: NearExpReportbatch[]) => {
        const [month, year] = selectedCategory.split('-');
        const targetYear = parseInt(year, 10);
        const targetMonth = parseInt(month, 10) - 1;
    
        let filteredData: NearExpReportbatch[] = res.filter((item) => {
          const expDateParts = item.expdate.split('-'); // Format: DD-MMM-YY
          const expMonth = new Date(Date.parse(expDateParts[1] + " 1, 2020")).getMonth();
          const expYear = 2000 + parseInt(expDateParts[2], 10);
          return expYear === targetYear && expMonth === targetMonth;
        });
    
        // ✅ Add serial number
        filteredData = filteredData.map((item, index) => ({
          ...item,
          sno: index + 1
        }));
    
        this.dataSource.data = filteredData;
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

    doc.save('NearExpReport.pdf');
  }
  selectedTabValue(event: any): void {
    this.selectedTabIndex = event.index;
  }
  home(){
    this.router.navigate(['welcome'])

  }

  updateSelectedHodid(): void {
    
      
    this.spinner.show(); // Show the spinner before making API calls
  
    if (this.selectedCategoryRadio === 'Drugs') {
      this.mcid = 1;
    } else if (this.selectedCategoryRadio === 'Consumables') {
      this.mcid = 2;
    } else if (this.selectedCategoryRadio === 'Reagent') {
      this.mcid = 3;
    } else if (this.selectedCategoryRadio === 'AYUSH') {
      this.mcid = 4;
    }
  
    // Create an array of API calls to execute
    forkJoin([
      // this.getAllDispatchPending(),
      this.loadData()
   
    ]).subscribe(
      () => {
        // Add a slight delay to ensure the spinner is visible
        setTimeout(() => {
          this.spinner.hide();
        }, 2000); // Adjust delay as needed (1000ms = 1 second)
      },
      (error) => {
        console.error("Error loading data:", error);
        this.spinner.hide(); // Hide the spinner even if an error occurs
      }
    );
  }



  InsertUserPageViewLog() {
    try {
      // debugger
      const roleIdName = localStorage.getItem('roleName') || '';
      const userId = Number(sessionStorage.getItem('userid') || 0);
      const roleId = Number(sessionStorage.getItem('roleId') || 0);
      // const userName = sessionStorage.getItem('firstname') || '';
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
      //console.log('InsertUserPageViewLogdata=',this.InsertUserPageViewLogdata);
  // if(localStorage.getItem('Log Saved')|| ''!){

  // }
      // API call
      this.api.InsertUserPageViewLogPOST(this.InsertUserPageViewLogdata).subscribe({
        next: (res: any) => {
          console.log('Page View Log Saved:',res);
          // const LogSaved='Log Saved'
          // localStorage.setItem('Log Saved', LogSaved);
        },
        error: (err: any) => {
          console.error('Backend Error:', JSON.stringify(err.message));
        }
      });
  
    } catch (err: any) {
      console.error('Error:', err.message);
    }
  }


}
