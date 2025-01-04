import { BreakpointObserver} from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild,  ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

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
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/service/api.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableExporterModule } from 'mat-table-exporter';
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
  selector: 'app-qctime-taken-yearwise',
  standalone: true,
  imports: [ FormsModule,CommonModule,MatButtonModule,MatMenuModule, MatTableExporterModule,MatPaginatorModule, MatTableModule,NgApexchartsModule],

  templateUrl: './qctime-taken-yearwise.component.html',
  styleUrl: './qctime-taken-yearwise.component.css'
})
export class QCTimeTakenYearwiseComponent {
  @ViewChild('chart') chart: ChartComponent | undefined;
  public cO: Partial<ChartOptions> | undefined;
  chartOptions: ChartOptions;
  whidMap: { [key: string]: number } = {};
  mcid=0
  hodid = 0;
  duration = 0;
  selectedCategory: string = 'All'; 
  OnChangeTitle:string= 'Category'
  // Average Time Taken for Supplies: 
  selectedCategoryTitle: string = '';
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
        type: 'line',
        stacked: true,
        height: 600
      },
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      xaxis: {
        categories: [],
        
        
      },
      yaxis: {
        
        title: {
          text: undefined,
        },
        labels:{
          formatter: function (value) {
            return value.toFixed(0); // This will show the values without decimals
          }
        },
        
        
        
        
      },
      dataLabels: {
        enabled: true,
        style: {
          // colors: ['#FF0000'] 
        }
      },
      stroke: {
        width: 4,
        // colors: ['#fff'],
      },
      title: {
        text:'Category',
        align: 'center',
        style: {
          fontWeight:'bold',
          fontSize: '16px',
          color:'rgb(50, 50, 164)'
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
        position: 'right',
        horizontalAlign: 'center',
        offsetX: 40,
      },
    };

    
    this.loadData(this.mcid);
    // this.loadDataDHS(this.mcid,this.hodid);
    // this.loadDataDME(this.mcid,this.hodid);
    // this.loadDataAYUSH(this.mcid,this.hodid);

  }

  
  

  ngOnInit() {
    
    this.loadData(this.mcid);
  }

  

  

  // Update and reflect the selected category in the chart title and data
  

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['selectedCategory']) {
  //     this.wheretitle = this.updateSelectedCategory();
  //     this.chartOptions.title.text = this.wheretitle;
  //     this.cO = this.chartOptions;  // Update chart options
  //     this.cdr.detectChanges();  // Trigger change detection to reflect changes
  //   }
  // }

  updateSelectedHodid(): void {
    
    // Reset hodid to 0 initially
    this.mcid = 0;

    // Map the selected category to the corresponding mcid value
    if (this.selectedCategory==='Drugs') {
      this.mcid = 1;
      this.chartOptions.title.text = this.OnChangeTitle +':'+  this.selectedCategory;
      this.loadData(this.mcid)
    } else if (this.selectedCategory==='Consumables') {
      this.mcid = 2;
      this.chartOptions.title.text = this.OnChangeTitle +':'+ this.selectedCategory;
      this.loadData(this.mcid)
    } else if(this.selectedCategory==='All'){

      this.mcid = 0;
      this.chartOptions.title.text = this.OnChangeTitle+':'+ this.selectedCategory;
      this.loadData(this.mcid)
    }
    else if (this.selectedCategory==='Reagent') {
      this.mcid = 3;
      this.chartOptions.title.text = this.OnChangeTitle +':'+ this.selectedCategory;
      this.loadData(this.mcid)
    } else if (this.selectedCategory==='AYUSH') {
      this.mcid = 4;
      this.chartOptions.title.text =this.OnChangeTitle +':'+    this.selectedCategory;
      this.loadData(this.mcid)
    }

    // console.log('Selected Hod ID:', this.mcid);
  }
  // updateSelectedCategory(): string {
  //   
  //   if (this.selectedCategory === 'Drugs') {
  //     return 'Drugs Category';
  //   } else if (this.selectedCategory === 'Consumables') {
  //     return 'Consumables Category';
  //   } else if (this.selectedCategory === 'Reagent') {
  //     return 'Reagent Category';
  //   } else if (this.selectedCategory === 'AYUSH') {
  //     return 'AYUSH Category';
  //   } else {
  //     return 'ALL';
  //   }
  // }

  loadData(mcid:any): void {
    
    // this.updateSelectedHodid()
    this.spinner.show();
    this.api.getQCTimeTakenYearwise(mcid).subscribe(
      (data:any) => {
        const accyear: string[] = [];
        const totalsample: number[] = [];
        const qctimetaken: number[] = [];
        const totalrecvalue: number[] = [];
        console.log('API Response:', data);


        data.forEach((item:any)=> {
           
          accyear.push(item.accyear);
          totalsample.push(item.totalsample);
          qctimetaken.push(item.qctimetaken);
          totalrecvalue.push(item.totalrecvalue);
         

          // console.log('accyear:', item.accyear, 'delayparA1:', item.delayparA1);
          // if (item.delaypara && item.delayparA1) {
          //   this.whidMap[item.delaypara] = item.delayparA1;
          // } else {
          //   console.warn('Missing whid for delayparaA1 :', item.delayparaA1);
          // }

          
        });


        this.chartOptions.series = [

           
            { 
            name: 'QC Time Taken', 
            data: qctimetaken,
             color:'#00008B',
            }
          //   { 
          //     name: 'Total Sample',
          //     data: totalsample ,
          //     color:'#00008B',
          //     show:false

          // }


          
        ];

        // Add `totalSample` to tooltip manually
this.chartOptions.tooltip = {
  shared: true,
  custom: ({ series, seriesIndex, dataPointIndex, w }) => {
    const qcTimeTaken = series[0][dataPointIndex]; // QC Time Taken
    const totalSample = totalsample[dataPointIndex]; // Use the hidden totalSample array

    return `
    <div style="
      padding: 10px; 
      border-radius: 8px; 
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
      background: linear-gradient(135deg, #ffffff, #f9f9f9); 
      font-family: Arial, sans-serif; 
      color: #333;
    ">
      <strong style="display: block; font-size: 14px; margin-bottom: 8px;">Details</strong>
      <div style="font-size: 13px; line-height: 1.6;">
        <span style="color: #00008B; font-weight: bold;">QC Time Taken:</span> ${qcTimeTaken}<br>
        <span style="color: #008B8B; font-weight: bold;">Total Sample:</span> ${totalSample}
      </div>
    </div>`;
},
};
        

        this.chartOptions.xaxis = {categories: accyear};
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

 
 
  
  
   fetchDataBasedOnChartSelection(whid: number, seriesName: string): void {
  
   }

 
}



