import { Component, ViewChild, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
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
import { StockSummaryBalanceIndentDetails } from 'src/app/Model/StockSummaryBalanceIndentDetails';
import { FormsModule } from '@angular/forms';

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
  selector: 'app-stock-summary-balance-indent',
  standalone: true,
  imports: [ FormsModule,CommonModule,MatButtonModule,MatMenuModule, MatTableExporterModule,MatPaginatorModule, MatTableModule,NgApexchartsModule],
  templateUrl: './stock-summary-balance-indent.component.html',
  styleUrl: './stock-summary-balance-indent.component.css'
})
export class StockSummaryBalanceIndentComponent {

  dataSource!: MatTableDataSource<StockSummaryBalanceIndentDetails>;
  stockSummaryBalanceIndentDetails: StockSummaryBalanceIndentDetails[] = [];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  @ViewChild('chart') chart: ChartComponent | undefined 
  public cO: Partial<ChartOptions> | undefined 
  chartOptions:ChartOptions;
  yearid:any=0;
  mcid:any=1;
  orderid:any
  selectedCategory: string = 'Drugs'; 
  OnChangeTitle:string= '' 
  btype:any


  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private api: ApiService,
    private cdr: ChangeDetectorRef,
  ) {

    this.chartOptions = {
      series: [
        {
          name: 'nous',
          data: [] // Will be populated dynamically
        },
        {
          name: 'btype',
          data: [] // Will be populated dynamically
        }
      ],
      chart: {
        type: 'bar',
        height: 350,
        events: {
          dataPointSelection: (event, chartContext, config) => {
            const dataIndex = config.dataPointIndex; // Index of the selected point
            const selectedData = this.chartOptions.series[0].data[dataIndex] as any; // Access the corresponding data
            console.log('Selected Data:', selectedData); // Debug to see if `btype` and `btypeorder` exist
          
            const btypeorder = selectedData?.btypeorder || 'Unknown Order';
            const btype = selectedData?.x || 'Unknown Type';
          
            if (btype && btypeorder) {
              this.navigateToDetails(btypeorder, btype); // Navigate to the target page
            } else {
              console.error('btype or btypeorder is undefined for the selected data point');
            }
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
          text: 'DHS Lifting vs Stock % ', // Y-axis label 
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
            fontSize: '15px', // Increase font size here
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

   


    this.dataSource = new MatTableDataSource<StockSummaryBalanceIndentDetails>([]);


  }

  loadData(yearid:any) {
    
    this.yearid=yearid;
    
    this.spinner.show();

    
    this.api.getStockSummaryBalanceIndent(this.yearid,this.mcid).subscribe((data: any) => {
      const chartData = data.map((item: any, index: number) => {
        const colors = ['#0466c8', '#0107b8', '#b5e48c', '#249463','#b5e48c','#f8961e','#FFC0CB','#f72585','#FF0000']; // Colors array
        return {
          x: item.btype, // Use the appropriate category or value
          y: item.nous,
          btypeorder: item.btypeorder, // Include `orderdp` for use in navigation

          fillColor: colors[index % colors.length], // Assign color cyclically
        };
      });
    
      this.chartOptions.series = [
        // {
        //   name: 'btype',
        //   data: chartData,
        // },
        {
          name: 'nous',
          data: chartData,
        }
      ];
    
      this.spinner.hide();
      this.cdr.detectChanges();
    });
    
    
  }
  navigateToDetails(btypeorder: number,btype:string) {
    
    this.orderid=btypeorder
    this.btype=btype
    


    // Construct the URL with the query parameter
    // const yearid=this.yearid;
    this.getStockSummaryBalanceIndentDetails();

    // const url = this.router.serializeUrl(
    //   this.router.createUrlTree(['/IssuePerWisePerClick'], { queryParams: { orderdp,yearid } })
    // );
  
    // // Open the URL in a new browser tab
    // window.open(url, '_blank');
  }
  
  ngOnInit() {
    this.spinner.show();
    // this.getStockSummaryBalanceIndentDetails();
    setTimeout(() => this.loadData(this.yearid), 1000); 

  }

 
    getStockSummaryBalanceIndentDetails() {

    
    this.spinner.show();
    this.api.getStockSummaryBalanceIndentDetails(this.yearid,this.mcid,this.orderid).subscribe(
      (res) => {
        // Add serial numbers to the data
        this.stockSummaryBalanceIndentDetails = res.map((item: any, index: number) => ({
          ...item,
          sno: index + 1
        }));
        
        // console.log('Data with serial numbers:', this.stockSummaryBalanceIndentDetails); 
// console.log(JSON.stringify(res))
        // this.stockSummaryBalanceIndentDetails = res;
        this.dataSource.data = this.stockSummaryBalanceIndentDetails;
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
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  
  exportToPDF() {
    const doc = new jsPDF('l', 'mm', 'a4');
    
    // Get current date and time
    const now = new Date();
    const dateString = now.toLocaleDateString();
    const timeString = now.toLocaleTimeString();
  
    // Set font size for the title
    doc.setFontSize(18);
  
    // Calculate the position to center the title
    const header='Stock Summary Balance Indent Details Report'
    const title = '';  
      // (sessionStorage.getItem('firstname') || 'Indent Details');
    const pageWidth = doc.internal.pageSize.getWidth();
    const titleWidth = doc.getTextWidth(title);
    const xOffset = (pageWidth - titleWidth) / 2;
    const xOffset1 = (pageWidth - titleWidth) / 2;
  
    // Add centered title with some space above the table
    doc.setFontSize(18);
      doc.text(header, xOffset1, 10);
       // Centered title at position Y=20
    doc.setFontSize(15);
       
      doc.text(title, xOffset, 20);
      doc.setFontSize(15); // Centered title at position Y=20
  
    // Set font size for the date and time
    doc.setFontSize(10);
  
    // Add the date and time to the top-left corner
    doc.text(`Date: ${dateString} Time: ${timeString}`, 10, 10); // Top-left at position X=10, Y=10
    
    const columns = [
      { title: "S.No", dataKey: "sno" },
      { title: "Code", dataKey: "itemcode" },
      { title: "Item", dataKey: "itemname" },
      { title: "Strength", dataKey: "strengtH1" },
      { title: "Unit", dataKey: "unit" },
      { title: "Rc Status", dataKey: "rcstatus" },
      { title: "AI", dataKey: "ai" },
      { title: "Issued", dataKey: "issued" },
      { title: "Balance Indent", dataKey: "balanceindent" },
      { title: "Issup", dataKey: "issup" },
      { title: "Stock %", dataKey: "stockper" },
      { title: "Ready Stock", dataKey: "readystk" },
      { title: "Total pipeline", dataKey: "totlpipeline" }

     
    ];
    
    const rows = this.stockSummaryBalanceIndentDetails.map(row => ({
      sno: row.sno,
      itemcode: row.itemcode,
      itemname: row.itemname,
      strengtH1: row.strengtH1,
      unit: row.unit,
      rcstatus: row.rcstatus,
      ai: row.ai,
      issued: row.issued,
      balanceindent: row.balanceindent,
      issupt: row.issup,
      stockper: row.stockper,
      readystk: row.readystk,
      totlpipeline: row.totlpipeline,
    
    }));
  
    autoTable(doc, {
      columns: columns,
      body: rows,
      startY: 40, // Start table a little further down to account for the title and date/time
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] }
    });
  
    doc.save('StocksummarybalanceindentR.pdf');
  }
  
  
  updateSelectedHodid(): void {
      
    
    // Reset hodid to 0 initially
    this.mcid = 0;

    // Map the selected category to the corresponding mcid value
    if (this.selectedCategory==='Drugs') {
      this.mcid = 1;
      // this.chartOptions.title.text = this.OnChangeTitle +  this.selectedCategory;
      this.loadData(this.yearid)
    } else if (this.selectedCategory==='Consumables') {
      this.mcid = 2;
      // this.chartOptions.title.text = this.OnChangeTitle + this.selectedCategory;
      this.loadData(this.yearid)

    } else if (this.selectedCategory==='Reagent') {
      this.mcid = 3;
      // this.chartOptions.title.text = this.OnChangeTitle +  this.selectedCategory;
      this.loadData(this.yearid)

    } 
    // else if (this.selectedCategory==='AYUSH') {
    //   this.mcid = 4;
    //   this.chartOptions.title.text =this.OnChangeTitle +  this.selectedCategory;
    // }

    // console.log('Selected Hod ID:', this.mcid);
  }


}






