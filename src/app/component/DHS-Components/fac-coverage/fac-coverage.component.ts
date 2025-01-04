import { Component, ViewChild, ChangeDetectorRef} from '@angular/core';
import { MatPaginator, MatPaginatorModule,  } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; 
import { ApiService } from 'src/app/service/api.service';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { WarehouseInfo } from 'src/app/Model/WarehouseInfo';
import { FacCoverage } from 'src/app/Model/FacCoverage';


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
  ApexLegend,
  NgApexchartsModule
} from 'ng-apexcharts';
import { IndentPendingWHSummary } from 'src/app/Model/IndentPendingWHSummary';
import { ChartOptions } from '../edl-non-edl-issue-percent-summary/edl-non-edl-issue-percent-summary.component';

@Component({
  selector: 'app-fac-coverage',
  standalone: true,
  imports: [CommonModule,MatButtonModule,MatMenuModule, MatTableExporterModule,MatPaginatorModule, MatTableModule,NgApexchartsModule],


  templateUrl: './fac-coverage.component.html',
  styleUrl: './fac-coverage.component.css'
})
export class FacCoverageComponent {

  @ViewChild('chart') chart: ChartComponent | undefined;
  public cO: Partial<ChartOptions> | undefined;
  chartOptions: ChartOptions;

  dataSource!: MatTableDataSource<FacCoverage>;
  facCoverage: FacCoverage[] = [];
  districtid:any=0


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    
    private spinner: NgxSpinnerService,
    private api: ApiService,
    private cdr: ChangeDetectorRef,
  ) {
    this.chartOptions = {
      series: [],
      chart: {
        type: 'bar',
        stacked: true,
        height: 600,
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: 'top', // top, center, bottom
            
            
          },
          horizontal: true,
        },
      },
      xaxis: {
        // Adjust the maximum x-axis value as per your data
        labels: {
          formatter: function (val: any) {
            return Math.floor(val).toString(); // Ensure integer labels
          },
        },
        categories: [], // Keep your categories if required
      },
      yaxis: {
        min: 0, // Start x-axis at 0
        max: 1200,
        tickAmount: 7, // Determines the number of ticks (0, 10, 20, ... up to max)

        title: {
          text: undefined,
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ['#FF0000'],
        },
      },
      stroke: {
        width: 1,
        colors: ['#fff'],
      },
      title: {
        text: ' ',
        align: 'center',
        style: {
          fontSize: '12px',
          color: '#6e0d25',
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


  }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => this.loadData(), 10000);

    // this.GetWarehouseInfo();
  }
  loadData(): void {
    this.spinner.show();
    this.api.getFacCoverage(this.districtid).subscribe(
      (data: any) => {
        const facilitytypedesc: string[] = [];
        const nosfac: number[] = [];
        // const dhs: number[] = [];
        // const dmefac: number[] = [];
        // const ayush: number[] = [];
        // this.whidMap = {}; // Initialize the mmidMap

        console.log('API Response:', data);


        data.forEach((item:any)=> {
           
          // facilitytypedesc: string;
          // whid: number; 
          // nosfac: number;
          // dhs: number;
          // dmefac: number;
          // ayush: number;
          facilitytypedesc.push(item.facilitytypedesc);
          nosfac.push(item.nosfac);
          // dhs.push(item.dhs);
          // dmefac.push(item.dmefac);
          // ayush.push(item.ayush);

          // console.log('facilitytypedesc:', item.facilitytypedesc, 'whid:', item.warehouseid);
          // if (item.facilitytypedesc && item.warehouseid) {
          //   this.whidMap[item.facilitytypedesc] = item.warehouseid;
          // } else {
          //   console.warn('Missing whid for facilitytypedesc :', item.facilitytypedesc);
          // }

          
        });

        // console.log('whidMap:', this.whidMap); // Log the populated mmidMap

        this.chartOptions.series = [

          { 
          name: 'No of Facility',
          data: nosfac, 
          color:'#eeba0b'
          }
          //  ,
          // { 
          //   name: 'DHS', 
          //   data: dhs 
          // },

          // { 
          //   name: 'DME', 
          //   data: dmefac, 
          //   color:'#00b4d8'
          // },

          // { 
          //   name: 'AYUSH',
          //   data: ayush 

          // },
        ];

        this.chartOptions.xaxis = {categories: facilitytypedesc};
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

 
  // GetWarehouseInfo() {
  //   this.spinner.show();
  //   if(sessionStorage.getItem('roleId')==='482'){
  //     this.districtid=sessionStorage.getItem('districtid')
  //   }
  //   this.api.getFacCoverage(this.districtid).subscribe(
  //     (res) => {
  //       this.facCoverage = res.map((item: any, index: number) => ({
  //         ...item,
  //         sno: index + 1
  //       }));
        

  //       this.dataSource.data = this.facCoverage;
  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort = this.sort;
  //       this.spinner.hide();
  //       this.cdr.detectChanges();
  //     },
  //     (error) => {
  //       console.error('Error fetching data', error);
  //       this.spinner.hide();
  //     }
  //   );
  // }

  // applyTextFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  
  // exportToPDF() {
  //   const doc = new jsPDF('l', 'mm', 'a4');
    
  //   const now = new Date();
  //   const dateString = now.toLocaleDateString();
  //   const timeString = now.toLocaleTimeString();
  
  //   doc.setFontSize(18);
  
  //   const header=''
  //   const title = 'Warehouse Info Report';  
  //   const pageWidth = doc.internal.pageSize.getWidth();
  //   const titleWidth = doc.getTextWidth(title);
  //   const xOffset = (pageWidth - titleWidth) / 2;
  //   const xOffset1 = (pageWidth - titleWidth) / 2;
  
  //   doc.setFontSize(18);
  //     doc.text(header, xOffset1, 10);
  //   doc.setFontSize(15);
       
  //     doc.text(title, xOffset, 20);
  //     doc.setFontSize(15); 
  
  //   doc.setFontSize(10);
  
  //   doc.text(`Date: ${dateString} Time: ${timeString}`, 10, 10); 
    
  //   const columns = [
  //     { title: "S.No", dataKey: "sno" },
  //     { title: "facilitytypecode", dataKey: "facilitytypecode" },
  //     { title: "nosfac", dataKey: "nosfac" },
  //     { title: "facilitytypedesc", dataKey: "facilitytypedesc" },

     
  //   ];
    
  //   const rows = this.facCoverage.map(row => ({
  //     sno: row.sno,
  //     facilitytypecode: row.facilitytypecode,
  //     nosfac: row.nosfac,
  //     facilitytypedesc: row.facilitytypedesc,
    
  //   }));
  
  //   autoTable(doc, {
  //     columns: columns,
  //     body: rows,
  //     startY: 40, 
  //     theme: 'striped',
  //     headStyles: { fillColor: [22, 160, 133] }
  //   });
  
  //   doc.save('facCoverage.pdf');
  // }
  
  


}






 