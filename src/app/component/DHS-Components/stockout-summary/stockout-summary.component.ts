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
import { Router } from '@angular/router';



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
  selector: 'app-stockout-summary',
  standalone: true,
  imports: [ FormsModule,CommonModule,MatButtonModule,MatMenuModule, MatTableExporterModule,MatPaginatorModule, MatTableModule,NgApexchartsModule],

  templateUrl: './stockout-summary.component.html',
  styleUrl: './stockout-summary.component.css'
})
export class StockoutSummaryComponent {
  @ViewChild('chart') chart: ChartComponent | undefined;
  public cO: Partial<ChartOptions> | undefined;
  chartOptions: ChartOptions;
  whidMap: { [key: string]: number } = {};
  mcid=1
  yrid = 0;
  selectedCategory: string = ''; 
  OnChangeTitle:string= 'Category'
  // drugs edl category 1
  // Average Time Taken for Supplies: 
  selectedCategoryTitle: string = '';
  selectedTabIndex: number = 0;
  hodname:string=''
  EdlNonEdl:string='Y'
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private spinner: NgxSpinnerService,
    private api: ApiService,
    private http: HttpClient,
    private breakpointObserver: BreakpointObserver,
    private cdr: ChangeDetectorRef,
    private router:Router
  ) {
     

    this.chartOptions = {
      series: [],
      chart: {
        type: 'bar',
        stacked: true,
        height: 600
      },
      plotOptions: {
        bar: {
          horizontal: true,
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
          text: 'Warehouse',
          style:{
            color:'#d90429'
          }
        },
        labels:{
          style:{
          fontWeight:'bold',
          fontSize:'15px',
          // colors:'#0000F'
          },
          // formatter: function (value) {
          //   return value.toFixed(0); // This will show the values without decimals
          // }
        },
        
        
        
        
      },
      dataLabels: {
        enabled: true,
        style: {
          // colors: ['#000814'] 
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

    
    this.loadData(this.mcid,this.yrid,this.EdlNonEdl,this.hodname);
    // this.loadDataDHS(this.mcid,this.yrid);
    // this.loadDataDME(this.mcid,this.yrid);
    // this.loadDataAYUSH(this.mcid,this.yrid);

  }

  
  

  ngOnInit() {
    console.log('Initial hodname:', this.hodname);
    // this.loadData(this.mcid, this.yrid,this.EdlNonEdl,this.hodname);
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
    
    // Reset yrid to 0 initially
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

  loadData(mcid:any,yrid:any,EdlNonEdl:any,hodname:string): void {
    
this.hodname=hodname;
    this.EdlNonEdl=EdlNonEdl
    
      this.updateSelectedHodid()
    
    
    this.spinner.show();
    this.api.getStockoutSummary(yrid,this.EdlNonEdl,mcid).subscribe(
      (data:any) => {
        const warehousename: string[] = [];
        const stockoutP: number[] = [];
        const stockout: number[] = [];
        const nosdrugs: number[] = [];
        console.log('API Response:', data);


        data.forEach((item:any)=> {
           
          warehousename.push(item.warehousename);
          stockoutP.push(item.stockoutP);
          stockout.push(item.stockout);
          nosdrugs.push(item.nosdrugs);
         

          // console.log('warehousename:', item.warehousename, 'delayparA1:', item.delayparA1);
          // if (item.delaypara && item.delayparA1) {
          //   this.whidMap[item.delaypara] = item.delayparA1;
          // } else {
          //   console.warn('Missing whid for delayparaA1 :', item.delayparaA1);
          // }

          
        });


        this.chartOptions.series = [

           
        
          // { 
          //   name: 'nosdrugs',
          //   data: nosdrugs ,
          //   // color:'#fb8500'

          // },
          { 
          name: 'No of Stock-Out Items ', 
          data: stockout,
           color:'#ca6702'
        },
          { 
            name: 'Stock-Out %',
            data: stockoutP ,
            color:'#9e2a2b'

          }


          
        ];

        this.chartOptions.xaxis = {
          categories: warehousename,
          labels:{
            style:{
              // colors:'#390099',
              fontWeight:'bold',
              fontSize:'15px'
            }
          }
          

          
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

  // loadDataDHS(mcid:any,yrid:any,EdlNonEdl:any): void {
    
  //   this.EdlNonEdl=EdlNonEdl
  //   //  let wheretitle=this.updateSelectedCategory();
  //   // this.updateSelectedCategory('DHS');
  //   // this.updateSelectedCategory()

    
  //   this.spinner.show();
  //   this.api.getStockoutSummary(yrid,this.EdlNonEdl,mcid).subscribe(
  //     (data: any) => {
  //       const warehousename: string[] = [];
  //       const stockoutP: number[] = [];
  //       const stockout: number[] = [];
  //       console.log('API Response:', data);


  //       data.forEach((item:any)=> {
           
  //         warehousename.push(item.warehousename);
  //         stockoutP.push(item.stockoutP);
  //         stockout.push(item.stockout);

  //         // console.log('warehousename:', item.warehousename, 'delayparA1:', item.delayparA1);
  //         // if (item.delaypara && item.delayparA1) {
  //         //   this.whidMap[item.delaypara] = item.delayparA1;
  //         // } else {
  //         //   console.warn('Missing whid for delayparaA1 :', item.delayparaA1);
  //         // }

          
  //       });


  //       this.chartOptions.series = [

           
  //         { 
  //           name: 'Since QC Passed ',
  //           data: stockout ,
  //           color:'#f18701'


  //         },
  //         { 
  //           name: 'Since Received in Warehouse', 
  //           data: stockoutP ,
  //           color:'#ef476f'
  //         }


          
  //       ];

  //       this.chartOptions.xaxis = {categories: warehousename,
          
  //       };
  //       this.cO = this.chartOptions;
  //       this.cdr.detectChanges();
  //       this.spinner.hide();
  //     },
  //     (error: any) => {
  //       console.error('Error fetching data', error);
  //       this.spinner.hide();
  //     }
  //   );
  // }
  // loadDataDME(mcid:any,yrid:any): void {
    
  //   // this.updateSelectedCategory('DME');
  //   this.spinner.show();
  //   this.api.getStockoutSummary(yrid,this.EdlNonEdl,mcid).subscribe(
  //     (data: any) => {
  //       const warehousename: string[] = [];
  //       const dmeissueitems: number[] = [];
  //       const dmeissuevalue: number[] = [];
  //       // console.log('API Response:', data);


  //       data.forEach((item:any)=> {
           
  //         warehousename.push(item.warehousename);
  //         dmeissueitems.push(item.dmeissueitems);
  //         dmeissuevalue.push(item.dmeissuevalue);

  //         // console.log('warehousename:', item.warehousename, 'delayparA1:', item.delayparA1);
  //         // if (item.delaypara && item.delayparA1) {
  //         //   this.whidMap[item.delaypara] = item.delayparA1;
  //         // } else {
  //         //   console.warn('Missing whid for delayparaA1 :', item.delayparaA1);
  //         // }

          
  //       });


  //       this.chartOptions.series = [

           
  //         { 
  //           name: ' DME Items', 
  //           data: dmeissueitems,
  //           color:'#fb8500' 
  //         },


  //         { 
  //           name: ' DME Value',
  //           data: dmeissuevalue ,
  //           color:'#006400'

  //         }
          
  //       ];

  //       this.chartOptions.xaxis = {categories: warehousename};
  //       this.cO = this.chartOptions;
  //       this.cdr.detectChanges();
  //       this.spinner.hide();
  //     },
  //     (error: any) => {
  //       console.error('Error fetching data', error);
  //       this.spinner.hide();
  //     }
  //   );
  // }
  // loadDataAYUSH(mcid:any,yrid:any): void {
    
  //   // this.updateSelectedCategory('AYUSH');
  //   this.spinner.show();
  //   this.api.getStockoutSummary(yrid,this.EdlNonEdl,mcid).subscribe(
  //     (data: any) => {
  //       const warehousename: string[] = [];
  //       const ayIssueitems: number[] = [];
  //       const ayissueval: number[] = [];
  //       // console.log('API Response:', data);


  //       data.forEach((item:any)=> {
           
  //         warehousename.push(item.warehousename);
  //         ayIssueitems.push(item.ayIssueitems);
  //         ayissueval.push(item.ayissueval);

  //         // console.log('warehousename:', item.warehousename, 'delayparA1:', item.delayparA1);
  //         // if (item.delaypara && item.delayparA1) {
  //         //   this.whidMap[item.delaypara] = item.delayparA1;
  //         // } else {
  //         //   console.warn('Missing whid for delayparaA1 :', item.delayparaA1);
  //         // }

          
  //       });


  //       this.chartOptions.series = [

           
  //         { 
  //           name: ' AYUSH Issued Items', 
  //           data: ayIssueitems ,
  //           color:'#fb8500'

  //         },


  //         { 
  //           name: ' AYUSH Issued Value',
  //           data: ayissueval ,
  //           color:'#006400'

  //         }
          
  //       ];

  //       this.chartOptions.xaxis = {categories: warehousename};
  //       this.cO = this.chartOptions;
  //       this.cdr.detectChanges();
  //       this.spinner.hide();
  //     },
  //     (error: any) => {
  //       console.error('Error fetching data', error);
  //       this.spinner.hide();
  //     }
  //   );
  // }
  
  //  fetchDataBasedOnChartSelection(whid: number, seriesName: string): void {
  
  //  }

  home(){
    this.router.navigate(['welcome'])

  }

 
}

