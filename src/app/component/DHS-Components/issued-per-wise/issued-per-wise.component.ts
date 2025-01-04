import { Component, ViewChild, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
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
import { IssuePerWisePerClick } from 'src/app/Model/IssuePerWisePerClick';
import { IssuedPerWise } from 'src/app/Model/IssuedPerWise';
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
import { Router } from '@angular/router';
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
  selector: 'app-issued-per-wise',
  standalone: true,
  imports: [ CommonModule,MatButtonModule,MatMenuModule, MatTableExporterModule,MatPaginatorModule, MatTableModule,NgApexchartsModule],

  templateUrl: './issued-per-wise.component.html',
  styleUrl: './issued-per-wise.component.css'
})
export class IssuedPerWiseComponent {
  dataSource!: MatTableDataSource<IssuedPerWise>;
  issuedPerWise: IssuedPerWise[] = [];


  @ViewChild('chart') chart: ChartComponent | undefined 
  public cO: Partial<ChartOptions> | undefined 
  chartOptions:ChartOptions;
  yearid:any=545;

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private api: ApiService,
    private cdr: ChangeDetectorRef,
  ) {

    this.chartOptions = {
      series: [
        {
          name: 'nosdrugs',
          data: [] // Will be populated dynamically
        },
        {
          name: 'percentage',
          data: [] // Will be populated dynamically
        }
      ],
      chart: {
        type: 'bar',
        height: 350,
        events: {
          dataPointSelection: (event, chartContext, config) => {
            const dataIndex = config.dataPointIndex; // Get the index of the selected bar
            const selectedData = this.chartOptions.series[0].data[dataIndex] as any; // Access the bar's data
            const orderdp = selectedData.orderdp; // Retrieve the `orderdp` value
            this.navigateToDetails(orderdp); // Navigate to the target page
          },
        },
        stacked: false // Side-by-side bars
      },
      
      plotOptions: {
        bar: {
          dataLabels: {
            position: 'center', // top, center, bottom
            
            
          },
          horizontal: true, // Vertical bars
          columnWidth: '50%', // Adjust the width of each bar
          borderRadius: 5 // Rounded bar corners
        },
      },
      
      xaxis: {
        categories: [], // Will be populated dynamically
        title: {
          text: '',
        
          

          
        },
      },
      yaxis: {
        title: {
          text: 'Supply % against DHS Annual Indent ', // Y-axis label 
          offsetX: 10,
          style: {
            
            // color: 'darkblue',
            // fontSize: '16px',
            // fontWeight: 'bold',
            // fontF?amily: 'Arial, sans-serif'
            // marginLeft: '20px',
        },
        
          
        }
        ,
        labels: {
        
          style: {
            fontSize: '14px', // Increase font size here
            fontWeight: 'bold', // Optional: Make text bold
            colors: ['#000'], // Optional: Change font color
          },
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
        opacity: 1, // Fully opaque bars
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',
        offsetX: 40
      }
    };

    
    
    this.loadData(this.yearid);

   


    this.dataSource = new MatTableDataSource<IssuedPerWise>([]);


  }
  loadData(yearid:any) {
    this.yearid=yearid;
    
    this.spinner.show();

    
    this.api.getIssuedPerWise(this.yearid).subscribe((data: any) => {
      const chartData = data.map((item: any, index: number) => {
        const colors = ['#0466c8', '#249463', '#b5e48c', '#f8961e','#FFC0CB','#FF0000']; // Colors array
        return {
          x: item.percentage, // Use the appropriate category or value
          y: item.nosdrugs,
          orderdp: item.orderdp, // Include `orderdp` for use in navigation
          fillColor: colors[index % colors.length], // Assign color cyclically
        };
      });
    
      this.chartOptions.series = [
        {
          name: 'nosdrugs',
          data: chartData,
        }
      ];
    
      this.spinner.hide();
      this.cdr.detectChanges();
    });
    
    
  }
  navigateToDetails(orderdp: number) {
    // Construct the URL with the query parameter
    const yearid=this.yearid;
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/IssuePerWisePerClick'], { queryParams: { orderdp,yearid } })
    );
  
    // Open the URL in a new browser tab
    window.open(url, '_blank');
  }
  
  ngOnInit() {
    this.spinner.show();
    // this.getEdlNonEdlIssuePercentageR();
    setTimeout(() => this.loadData(this.yearid), 1000); 

  }

 
//     getEdlNonEdlIssuePercentageR() {
    
//     this.spinner.show();
//     this.api.getIssuedPerWise().subscribe(
//       (res) => {
//         // Add serial numbers to the data
//         this.issuedPerWise = res.map((item: any, index: number) => ({
//           ...item,
//           sno: index + 1
//         }));
        
//         // console.log('Data with serial numbers:', this.issuedPerWise); 
// // console.log(JSON.stringify(res))
//         // this.issuedPerWise = res;
//         this.dataSource.data = this.issuedPerWise;
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
  //   const header='IssuedPerWise Report'
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
  //     { title: "percentage", dataKey: "percentage" },
  //     { title: "orderdp", dataKey: "orderdp" },

     
  //   ];
    
  //   const rows = this.issuedPerWise.map(row => ({
  //     sno: row.sno,
  //     percentage: row.percentage,
  //     orderdp: row.orderdp,
    
  //   }));
  
  //   autoTable(doc, {
  //     columns: columns,
  //     body: rows,
  //     startY: 40, // Start table a little further down to account for the title and date/time
  //     theme: 'striped',
  //     headStyles: { fillColor: [22, 160, 133] }
  //   });
  
  //   doc.save('issuedPerWiseR.pdf');
  // }
  
  


}






