import { MatPaginator, MatPaginatorModule,  } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; 
import { ApiService } from 'src/app/service/api.service';
import { EdlNonEdlIssuePercentSummary } from 'src/app/Model/EdlNonEdlIssuePercentSummary';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Component, ViewChild,ChangeDetectorRef } from '@angular/core';

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
import { CommonModule } from '@angular/common';

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
  selector: 'app-edl-non-edl-issue-percent-summary',
  standalone: true,
  imports: [CommonModule, MatButtonModule,MatMenuModule, MatTableExporterModule,MatPaginatorModule, MatTableModule,NgApexchartsModule],
  templateUrl: './edl-non-edl-issue-percent-summary.component.html',
  styleUrl: './edl-non-edl-issue-percent-summary.component.css'
})
export class EdlNonEdlIssuePercentSummaryComponent {


  dataSource!: MatTableDataSource<EdlNonEdlIssuePercentSummary>;
  edlNonEdlIssuePercentSummary: EdlNonEdlIssuePercentSummary[] = [];
  yearid:any=545


   @ViewChild('chart') chart: ChartComponent | undefined 
  public cO: Partial<ChartOptions> | undefined 
  chartOptions:ChartOptions;

  constructor(
    private spinner: NgxSpinnerService,
    private api: ApiService,
    private cdr: ChangeDetectorRef,
  ) {

    this.chartOptions = {
      series: [
        {
          name: 'Indent',
          data: [] // Will be populated dynamically
        },
        {
          name: 'Issue',
          data: [] // Will be populated dynamically
        }
      ],
      chart: {
        type: 'bar',
        height: 350,
        stacked: false // Side-by-side bars
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: 'top', // top, center, bottom
            
            
          },
          horizontal: false, // Vertical bars
          columnWidth: '40%', // Adjust the width of each bar
          // borderRadius: 5 // Rounded bar corners
        },
      },
      xaxis: {
        categories: [], // Will be populated dynamically
        title: {
          text: 'Categories',
        
          

          
        }
      },
      yaxis: {
        title: {
          text: 'No of Items' // Y-axis label 
        }
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ['black'] // Specify the color(s) for the data labels
        },
        
      },
      stroke: {
        width: 1,
        colors: ['#fff'] // Adds a border to the bars
      },
      title: {
        text: '',
        align: 'center'
      },
      tooltip: {
        y: {
          formatter: function (val: any) {
            return `${val}`; // Tooltip values
          }
        }
      },
      fill: {
        opacity: 1 // Fully opaque bars
      },
      legend: {
        position: 'top',
        horizontalAlign: 'center',
        offsetX: 40,
        
        
      }
    };

    
    
    this.loadData(this.yearid);

    this.dataSource = new MatTableDataSource<EdlNonEdlIssuePercentSummary>([]);


  }

  ngOnInit() {
    // this.spinner.show();
    // this.getEdlNonEdlIssuePercentageR();
   

  }

  loadData(yearid:number) {
    
    this.spinner.show();

    this.yearid=yearid
    this.api.getEdlNonEdlIssuePercentSummary(this.yearid).subscribe((data: any) => {
      console.log('data', data);
      const categories: string[] = []; // To hold concatenated and truncated categories
      const ai: number[] = [];
      const nosissue: number[] = [];
  
      data.forEach((item: { edltype: string; mcategory: string; ai: number; nosissue: number; }) => {
        const concatenated = `${item.edltype} / ${item.mcategory}`;
        // Truncate if the length exceeds a certain limit
        const truncated = concatenated.length > 20 ? `${concatenated.substring(0, 17)}...` : concatenated;
        categories.push(truncated);
        ai.push(item.ai);
        nosissue.push(item.nosissue);
      });
  
      this.chartOptions.series = [
        {
          name: 'Indented Items',
          data: ai,
          
          
          
          
          
        },
        {
          name: 'Supplied Items',
          data: nosissue,
        },
      ];
      this.chartOptions.xaxis = {
        categories: categories, // Use truncated categories
      };
      
      this.spinner.hide();
      this.cdr.detectChanges();
    });
  }
  
  

  // getAllDispatchPending() {
  //   this.spinner.show();
  //   this.api.getEmdStatusSummary().subscribe(
  //     (res) => {
  //       Add serial numbers to the data
  //       this.EdlNonEdlIssuePercentSummary = res.map((item, index) => ({
  //         ...item,
  //         sno: index + 1
  //       }));

  //        console.log('Data with serial numbers:', this.EdlNonEdlIssuePercentSummary); 
  //       this.EdlNonEdlIssuePercentSummary = res;
  //       this.dataSource.data = res;
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
//     getEdlNonEdlIssuePercentageR() {
    
//     this.spinner.show();
//     this.api.getEdlNonEdlIssuePercentSummary().subscribe(
//       (res) => {
//         // Add serial numbers to the data
//         this.edlNonEdlIssuePercentSummary = res.map((item: any, index: number) => ({
//           ...item,
//           sno: index + 1
//         }));
        
//         // console.log('Data with serial numbers:', this.edlNonEdlIssuePercentSummary); 
// // console.log(JSON.stringify(res))
//         // this.edlNonEdlIssuePercentSummary = res;
//         this.dataSource.data = this.edlNonEdlIssuePercentSummary;
//         this.dataSource.paginator = this.paginator;
//         this.dataSource.sort = this.sort;
//         this.spinner.hide();
//         this.cdr.detectChanges();
//       },
//       (error) => {
//         console.error('Error fetching data', error);
//         this.spinner.hide();
//       }
//     );
//   }

  // applyTextFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  
  // exportToPDF() {
  //   const doc = new jsPDF('l', 'mm', 'a4');
    
  //   // Get current date and time
  //   const now = new Date();
  //   const dateString = now.toLocaleDateString();
  //   const timeString = now.toLocaleTimeString();
  
  //   // Set font size for the title
  //   doc.setFontSize(18);
  
  //   // Calculate the position to center the title
  //   const header='edlNonEdlIssuePercentSummary Report'
  //   const title = 'Facility: ' + (sessionStorage.getItem('firstname') || 'Current Stock Report');  
  //     // (sessionStorage.getItem('firstname') || 'Indent Details');
  //   const pageWidth = doc.internal.pageSize.getWidth();
  //   const titleWidth = doc.getTextWidth(title);
  //   const xOffset = (pageWidth - titleWidth) / 2;
  //   const xOffset1 = (pageWidth - titleWidth) / 2;
  
  //   // Add centered title with some space above the table
  //   doc.setFontSize(18);
  //     doc.text(header, xOffset1, 10);
  //      // Centered title at position Y=20
  //   doc.setFontSize(15);
       
  //     doc.text(title, xOffset, 20);
  //     doc.setFontSize(15); // Centered title at position Y=20
  
  //   // Set font size for the date and time
  //   doc.setFontSize(10);
  
  //   // Add the date and time to the top-left corner
  //   doc.text(`Date: ${dateString} Time: ${timeString}`, 10, 10); // Top-left at position X=10, Y=10
    
  //   const columns = [
  //     { title: "S.No", dataKey: "sno" },
  //     { title: "edltype", dataKey: "edltype" },
  //     { title: "mcategory", dataKey: "mcategory" },
  //     { title: "ai", dataKey: "ai" },
  //     { title: "nosissue", dataKey: "nosissue" },
  //     { title: "per", dataKey: "per" },
     
  //   ];
    
  //   const rows = this.edlNonEdlIssuePercentSummary.map(row => ({
  //     sno: row.sno,
  //     edltype: row.edltype,
  //     mcategory: row.mcategory,
  //     ai: row.ai,
  //     nosissue: row.nosissue,
  //     per: row.per,
    
  //   }));
  
  //   autoTable(doc, {
  //     columns: columns,
  //     body: rows,
  //     startY: 40, // Start table a little further down to account for the title and date/time
  //     theme: 'striped',
  //     headStyles: { fillColor: [22, 160, 133] }
  //   });
  
  //   doc.save('getEdlNonEdlIssuePercentSummary.pdf');
  // }
  
  


}






