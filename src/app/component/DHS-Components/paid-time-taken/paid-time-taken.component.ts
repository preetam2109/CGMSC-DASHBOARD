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
import { style } from '@angular/animations';
import { color } from 'html2canvas/dist/types/css/types/color';



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
  selector: 'app-paid-time-taken',
  standalone: true,
  imports: [ FormsModule,CommonModule,MatButtonModule,MatMenuModule, MatTableExporterModule,MatPaginatorModule, MatTableModule,NgApexchartsModule],

  templateUrl: './paid-time-taken.component.html',
  styleUrl: './paid-time-taken.component.css'
})
export class PaidTimeTakenComponent {
  @ViewChild('chart') chart: ChartComponent | undefined;
  public cO: Partial<ChartOptions> | undefined;
  chartOptions: ChartOptions;
  whidMap: { [key: string]: number } = {};
  mcid=0
  hodid = 0;
  selectedCategory: string = ''; 
  OnChangeTitle:string= 'Category'
  // Average Time Taken for Supplies: 
  selectedCategoryTitle: string = '';
  selectedTabIndex: number = 0;
  hodname:string=''
  QCRequired:string='Y'
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
        categories:{
          // color:'#d90429'
        },
        labels:{
          style:{
            colors:'#390099',
            fontWeight:'bold',
            fontSize:'30px'
          }
        },

        title: {
          text: 'Year',

        },

        
        
        
      },
      yaxis: {
        
        title: {
          text: 'No of Days Taken' ,
          style:{
            color:'#d90429'
          }
        },
        labels:{
          style:{
          fontWeight:'bold',
          fontSize:'15px'
          },
          formatter: function (value) {
            return value.toFixed(0); // This will show the values without decimals
          }
        },
        
        
        
        
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ['#000814'] 
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
        fontWeight:'bold'
      },
    };

    
    this.loadData(this.mcid,this.hodid,this.QCRequired,this.hodname);
    // this.loadDataDHS(this.mcid,this.hodid);
    // this.loadDataDME(this.mcid,this.hodid);
    // this.loadDataAYUSH(this.mcid,this.hodid);

  }

  
  

  ngOnInit() {
    console.log('Initial hodname:', this.hodname);
    // this.loadData(this.mcid, this.hodid,this.QCRequired,this.hodname);
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
      this.chartOptions.title.text = this.OnChangeTitle +':'+  this.selectedCategory+ ',Directorate: '+this.hodname;
    } else if (this.selectedCategory==='Consumables') {
      this.mcid = 2;
      this.chartOptions.title.text = this.OnChangeTitle +':'+ this.selectedCategory+ ' ,Directorate: '+this.hodname;
    } else if(this.selectedCategory==='All Category'){

      this.mcid = 0;
      this.chartOptions.title.text = this.OnChangeTitle+':'+ this.selectedCategory+ ' ,Directorate: '+this.hodname;

    }
    else if(this.selectedCategory==='All'){

      this.mcid = 0;
      this.chartOptions.title.text = this.OnChangeTitle+':'+ this.selectedCategory+ ' ,Directorate: '+this.hodname;

    }
    else if (this.selectedCategory==='Reagent') {
      this.mcid = 3;
      this.chartOptions.title.text = this.OnChangeTitle +':'+ this.selectedCategory+ ', Directorate: '+this.hodname;
    } else if (this.selectedCategory==='AYUSH') {
      this.mcid = 4;
      this.chartOptions.title.text =this.OnChangeTitle +':'+ this.selectedCategory+ ', Directorate: '+this.hodname;
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

  loadData(mcid: any, hodid: any, QCRequired: any, hodname: string): void {
    ;
    this.hodname = hodname;
    this.QCRequired = QCRequired;
  
    this.updateSelectedHodid();
  
    this.spinner.show();
    ;
    this.api.getPaidTimeTaken(mcid, hodid, this.QCRequired).subscribe(
      (data: any) => {
        const yr: string[] = [];
        const avgdayssincerec: number[] = [];
        const avgdayssinceQC: number[] = [];
        console.log('API Response:', data);
  
        data.forEach((item: any) => {
          yr.push(item.yr);
          avgdayssincerec.push(item.avgdayssincerec);
          avgdayssinceQC.push(item.avgdayssinceQC);
        });
  
        // Conditional logic for series
        const series = [];
  
        if (QCRequired === 'Y') {
          series.push({
            name: 'Since QC Passed',
            data: avgdayssinceQC,
            color: '#006400',
            show: false, // Hide bars but show legend
            dataLabels: {
              enabled: false, // Ensure no data labels appear
            },
          });
        }
  
        series.push({
          name: 'Since Received in Warehouse',
          data: avgdayssincerec,
          color: '#fb8500',
        });
  
        // Assign the series and x-axis categories
        this.chartOptions.series = series;
        this.chartOptions.xaxis = {
          categories: yr,
          labels: {
            style: {
              // colors:'#390099',
              fontWeight: 'bold',
              fontSize: '15px',
            },
          },
        };
  
        // Trigger change detection and hide spinner
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
  

  loadDataDHS(mcid:any,hodid:any,QCRequired:any): void {
    
    this.QCRequired=QCRequired
    //  let wheretitle=this.updateSelectedCategory();
    // this.updateSelectedCategory('DHS');
    // this.updateSelectedCategory()

    
    this.spinner.show();
    this.api.getPaidTimeTaken(mcid,hodid,this.QCRequired).subscribe(
      (data: any) => {
        const yr: string[] = [];
        const avgdayssincerec: number[] = [];
        const avgdayssinceqc: number[] = [];
        console.log('API Response:', data);


        data.forEach((item:any)=> {
           
          yr.push(item.yr);
          avgdayssincerec.push(item.avgdayssincerec);
          avgdayssinceqc.push(item.avgdayssinceqc);

          // console.log('yr:', item.yr, 'delayparA1:', item.delayparA1);
          // if (item.delaypara && item.delayparA1) {
          //   this.whidMap[item.delaypara] = item.delayparA1;
          // } else {
          //   console.warn('Missing whid for delayparaA1 :', item.delayparaA1);
          // }

          
        });


        this.chartOptions.series = [

           
          { 
            name: 'Since QC Passed ',
            data: avgdayssinceqc ,
            color:'#006400'


          },
          { 
            name: 'Since Received in Warehouse', 
            data: avgdayssincerec ,
            color:'#fb8500'
          }


          
        ];

        this.chartOptions.xaxis = {categories: yr,
          
        };
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
  loadDataDME(mcid:any,hodid:any): void {
    
    // this.updateSelectedCategory('DME');
    this.spinner.show();
    this.api.getPaidTimeTaken(mcid,hodid,this.QCRequired).subscribe(
      (data: any) => {
        const yr: string[] = [];
        const dmeissueitems: number[] = [];
        const dmeissuevalue: number[] = [];
        // console.log('API Response:', data);


        data.forEach((item:any)=> {
           
          yr.push(item.yr);
          dmeissueitems.push(item.dmeissueitems);
          dmeissuevalue.push(item.dmeissuevalue);

          // console.log('yr:', item.yr, 'delayparA1:', item.delayparA1);
          // if (item.delaypara && item.delayparA1) {
          //   this.whidMap[item.delaypara] = item.delayparA1;
          // } else {
          //   console.warn('Missing whid for delayparaA1 :', item.delayparaA1);
          // }

          
        });


        this.chartOptions.series = [

           
          { 
            name: ' DME Items', 
            data: dmeissueitems,
            color:'#fb8500' 
          },


          { 
            name: ' DME Value',
            data: dmeissuevalue ,
            color:'#006400'

          }
          
        ];

        this.chartOptions.xaxis = {categories: yr};
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
  loadDataAYUSH(mcid:any,hodid:any): void {
    
    // this.updateSelectedCategory('AYUSH');
    this.spinner.show();
    this.api.getPaidTimeTaken(mcid,hodid,this.QCRequired).subscribe(
      (data: any) => {
        const yr: string[] = [];
        const ayIssueitems: number[] = [];
        const ayissueval: number[] = [];
        // console.log('API Response:', data);


        data.forEach((item:any)=> {
           
          yr.push(item.yr);
          ayIssueitems.push(item.ayIssueitems);
          ayissueval.push(item.ayissueval);

          // console.log('yr:', item.yr, 'delayparA1:', item.delayparA1);
          // if (item.delaypara && item.delayparA1) {
          //   this.whidMap[item.delaypara] = item.delayparA1;
          // } else {
          //   console.warn('Missing whid for delayparaA1 :', item.delayparaA1);
          // }

          
        });


        this.chartOptions.series = [

           
          { 
            name: ' AYUSH Issued Items', 
            data: ayIssueitems ,
            color:'#fb8500'

          },


          { 
            name: ' AYUSH Issued Value',
            data: ayissueval ,
            color:'#006400'

          }
          
        ];

        this.chartOptions.xaxis = {categories: yr};
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

