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
import { ReagIndentPending } from 'src/app/Model/ReagIndentPending';
import { ReagIndentPendingEQSummary } from 'src/app/Model/ReagIndentPendingEQSummary';



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
  selector: 'app-reagent-indent-pending-wh',
  templateUrl: './reagent-indent-pending-wh.component.html',
  styleUrls: ['./reagent-indent-pending-wh.component.css']
})
export class ReagentIndentPendingWhComponent {
  @ViewChild('chart') chart: ChartComponent | undefined;
  public cO: Partial<ChartOptions> | undefined;
  chartOptions: ChartOptions;
  mmidMap: { [key: string]: number } = {}; // Define mmidMap property
  mmid: number = 0;



  dataSource!: MatTableDataSource<ReagIndentPending>;
  dispatchPendings: ReagIndentPending[] = [];
  selectedTabIndex: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  reagentindentpending:ReagIndentPending[] = [];

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
          dataPointSelection: (event, chartContext, { dataPointIndex, seriesIndex }) => {
            const selectedCategory = this.chartOptions?.xaxis?.categories?.[dataPointIndex];
            const selectedMmid = this.mmidMap[selectedCategory]; // Get mmid from the map
      
            if (selectedCategory && selectedMmid) {
              console.log('Selected Category:', selectedCategory);
              console.log('Selected MMID:', selectedMmid);
              this.fetchDataBasedOnChartSelection(selectedCategory, selectedMmid);
            } else {
              console.error('No MMID found for the selected category');
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
        text: 'Reagent Indent Pending at Warehouse ',
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
    this.dataSource = new MatTableDataSource<ReagIndentPending>([]);

  }

  ngOnInit(){
    this.spinner.show();
    this.getAllDispatchPending();
    setTimeout(() => this.loadData(), 10000);
      // console.log('ngOnInit is triggered');
      // console.log("MMID value:", this.mmid); 
      // this.http.get<ReagIndentPending[]>('https://dpdmis.in/CGMSCHO_API2/api/Warehouse/ReagIndentPending?mmid=0').subscribe(
      //   (res:ReagIndentPending[]) => {
      //     this.dispatchPendings = res.map((item:ReagIndentPending,index:number) => ({
      //       ...item,
      //       sno: index + 1
      //     }));
      //     this.dataSource.data = this.dispatchPendings;
      //     this.dataSource.paginator = this.paginator;
      //     this.dataSource.sort = this.sort;
      //     this.spinner.hide();
      //     this.cdr.detectChanges();
      //   },
      //   (error) => {
      //     console.error('API Error:', error); // Logs any error from the API
      //   }
      // );
    }
  

   getAllDispatchPending() {
    this.spinner.show();

     this.http.get<ReagIndentPending[]>('https://dpdmis.in/CGMSCHO_API2/api/Warehouse/ReagIndentPending?mmid=0').subscribe(
    (res:ReagIndentPending[]) => {
      this.dispatchPendings = res.map((item:ReagIndentPending,index:number) => ({
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
      console.error('API Error:', error); // Logs any error from the API
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
    this.api.getReagIndentPendingEQ().subscribe(
      (data: ReagIndentPendingEQSummary[]) => {
        const eqpname: string[] = [];
        const nosfac: number[] = [];
        const indentvalue: number[] = [];
        const noswh: number[] = [];
        
        this.mmidMap = {}; // Initialize the mmidMap
  
        // Log the entire API response for debugging
        console.log('API Response:', data);
  
        data.forEach((item) => {
          eqpname.push(item.eqpname);
          nosfac.push(item.nosfac);
          indentvalue.push(item.indentvalue);
          noswh.push(item.noswh);
          
          // Log eqpname and mmid for each item
          console.log('eqpname:', item.eqpname, 'mmid:', item.mmid);
  
          // Ensure that mmid exists and is correctly mapped
          if (item.eqpname && item.mmid) {
            this.mmidMap[item.eqpname] = item.mmid;
          } else {
            console.warn('Missing mmid for eqpname:', item.eqpname);
          }
        });
  
        console.log('mmidMap:', this.mmidMap); // Log the populated mmidMap
  
        this.chartOptions.series = [
          { name: 'Total Facility', data: nosfac },
          { name: 'Value (in Lakhs)', data: indentvalue },
          { name: 'No Warehouse', data: noswh }
        ];
  
        this.chartOptions.xaxis = { categories: eqpname };
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
  fetchDataBasedOnChartSelection(selectedCategory: string, mmid: number): void {
    
    this.spinner.show();
    
    this.api.getReagIndentPending(mmid).subscribe(
        (res: ReagIndentPending[]) => {
        this.dataSource.data = res.map((item, index) => ({
          ...item,
          sno: index + 1
        }));
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
      { title: "indentvalue", dataKey: "indentvalue" },
      { title: "indentdt", dataKey: "indentdt" },
      { title: "nocnumber", dataKey: "nocnumber" }
    ];
    const rows = this.dispatchPendings.map(row => ({
      sno: row.sno,
      warehousename: row.warehousename,
      districtname: row.districtname,
      facilityname: row.facilityname,
      eqpname: row.eqpname,
      make: row.make,
      model: row.model,
      indentvalue: row.indentvalue,
      indentdt: row.indentdt,
      nocnumber: row.nocnumber
    }));

    autoTable(doc, {
      columns: columns,
      body: rows,
      startY: 20,
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] }
    });

    doc.save('ReagentPending.pdf');
  }
  selectedTabValue(event: any): void {
    this.selectedTabIndex = event.index;
  }
}
