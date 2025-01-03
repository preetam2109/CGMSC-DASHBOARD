import { BreakpointObserver} from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, ChangeDetectorRef} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {  MatTableModule } from '@angular/material/table';

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
  selector: 'app-growth-in-procurment-two',
  standalone: true,
  imports: [FormsModule,CommonModule,MatButtonModule,MatMenuModule, MatTableExporterModule,MatPaginatorModule, MatTableModule,NgApexchartsModule],
  templateUrl: './growth-in-procurment-two.component.html',
  styleUrl: './growth-in-procurment-two.component.css'
})
export class GrowthInProcurmentTwoComponent {
@ViewChild('chart') chart: ChartComponent | undefined;
  public cO: Partial<ChartOptions> | undefined;
  chartOptions: ChartOptions;
  whidMap: { [key: string]: number } = {};
  mcid=1
  hodid = 0;
  districtid:any=0
   HOD:any='All'

  selectedCategory: string = ''; 
  OnChangeTitle:string= 'Category: ' 
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
        text:'Category:  ',
        align: 'center',
        style: {
          fontWeight:'bold',
          fontSize: '16px',
          color:'#FF3C00'
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

    
    // this.loadData(this.mcid,this.hodid,this.HOD);
    // this.loadDataDHS(this.mcid,this.hodid);
    // this.loadDataDME(this.mcid,this.hodid);
    // this.loadDataAYUSH(this.mcid,this.hodid);

  }

  
  

  ngOnInit() {
    if(sessionStorage.getItem('roleId')==='482'){
      this.districtid=sessionStorage.getItem('districtid')
    }
    // this.loadData(this.mcid, this.hodid,this.HOD);
    
  }

  validate(){
    if(this.selectedCategory==='' ){

    alert("Please Select Category")
 
    }

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
    if (this.selectedCategory==='All') {
      this.mcid = 0;
      this.chartOptions.title.text = this.OnChangeTitle +  this.selectedCategory  + ',HOD : '+this.HOD ;
    }else if(this.selectedCategory==='Drugs'){
      this.mcid = 1;
      this.chartOptions.title.text = this.OnChangeTitle +  this.selectedCategory  + ',HOD :'+this.HOD ;

    }
     else if (this.selectedCategory==='Consumables') {
      this.mcid = 2;
      this.chartOptions.title.text = this.OnChangeTitle + this.selectedCategory  + ',HOD :'+this.HOD ;
    } else if (this.selectedCategory==='Reagent') {
      this.mcid = 3;
      this.chartOptions.title.text = this.OnChangeTitle +  this.selectedCategory  + ',HOD :'+this.HOD ;
    } else if (this.selectedCategory==='AYUSH') {
      this.mcid = 4;
      this.chartOptions.title.text =this.OnChangeTitle +  this.selectedCategory   + ',HOD :'+this.HOD ;
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

  loadData(mcid:any,hodid:any,HOD:any): void {

    if(this.selectedCategory==='' ){

      alert("Please Select Category")
      return
   
      }

    this.HOD=HOD;
    this.updateSelectedHodid()
    this.spinner.show();
    if(sessionStorage.getItem('roleId')==='482'){
      this.districtid=sessionStorage.getItem('districtid')
    }
    this.api.HODPOYear_AgAI(mcid,hodid,'N','Y').subscribe(
      (data:any) => {
        const shaccyear: string[] = [];
        const totalpoitems: number[] = [];
        const totalpovalue: number[] = [];
        const totalrecvalue: number[] = [];
        console.log('API Response:', data);


        data.forEach((item:any)=> {
           
          shaccyear.push(item.shaccyear);
          totalpovalue.push(item.totalpovalue);
          totalpoitems.push(item.totalpoitems);
          totalrecvalue.push(item.totalrecvalue);
         

          // console.log('shaccyear:', item.shaccyear, 'delayparA1:', item.delayparA1);
          // if (item.delaypara && item.delayparA1) {
          //   this.whidMap[item.delaypara] = item.delayparA1;
          // } else {
          //   console.warn('Missing whid for delayparaA1 :', item.delayparaA1);
          // }

          
        });


        this.chartOptions.series = [

           
          { 
            name: ' No of Items', 
            data: totalpoitems,
            color:'#800000' 
          },
          { 
            name: 'Order Value(in Cr)',
            data: totalpovalue ,
            color:'#00008B'

          }


          
        ];



              // Add `totalSample` to tooltip manually
this.chartOptions.tooltip = {
  shared: true,
  custom: ({ series, seriesIndex, dataPointIndex, w }) => {
    const Totalpoitems = series[0][dataPointIndex]; // QC Time Taken
    const totalpovalue = series[1][dataPointIndex]; // QC Time Taken
    const Totalrecvalue = totalrecvalue[dataPointIndex]; // Use the hidden totalSample array

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
      <div style="font-size: 13px; line-height: 1.8;">
        <span style="color: #00008B; font-weight: bold;">No of Items:</span> ${Totalpoitems}<br>
        <span style="color:rgb(250, 18, 6); font-weight: bold;">Order Value(in Cr):</span> ${totalpovalue}<br>
        <span style="color: #008B8B; font-weight: bold;">Received Value (in Cr):</span> ${Totalrecvalue}
      </div>
    </div>`;
},
};






        this.chartOptions.xaxis = {categories: shaccyear};
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

  loadDataDHS(mcid:any,hodid:any,HOD:any): void {
    
    if(this.selectedCategory==='' ){

      alert("Please Select Category")
      return
   
      }
    this.HOD=HOD;
    this.updateSelectedHodid()
    //  let wheretitle=this.updateSelectedCategory();
    // this.updateSelectedCategory('DHS');
    // this.updateSelectedCategory()

    
    this.spinner.show();
    this.api.HODPOYear_AgAI(mcid,hodid,'N','Y').subscribe(
      (data: any) => {
        const shaccyear: string[] = [];
        const dhspoitems: number[] = [];
        const dhspovalue: number[] = [];
        const dhsrecvalue: number[] = [];
        console.log('API Response:', data);


        data.forEach((item:any)=> {
           
          shaccyear.push(item.shaccyear);
          dhspoitems.push(item.dhspoitems);
          dhspovalue.push(item.dhspovalue);
          dhsrecvalue.push(item.dhsrecvalue);

          // console.log('shaccyear:', item.shaccyear, 'delayparA1:', item.delayparA1);
          // if (item.delaypara && item.delayparA1) {
          //   this.whidMap[item.delaypara] = item.delayparA1;
          // } else {
          //   console.warn('Missing whid for delayparaA1 :', item.delayparaA1);
          // }

          
        });


        this.chartOptions.series = [

           
          { 
            name: ' No of Items', 

            data: dhspoitems ,
            color:'#800000'
          },


          { 
            name: 'Order Value(in Cr)',
            data: dhspovalue ,
            color:'#00008B'


          }
          
        ];



              // Add `totalSample` to tooltip manually
              this.chartOptions.tooltip = {
                shared: true,
                custom: ({ series, seriesIndex, dataPointIndex, w }) => {
                  const Totalpoitems = series[0][dataPointIndex]; // QC Time Taken
                  const totalpovalue = series[1][dataPointIndex]; // QC Time Taken
                  const Totalrecvalue = dhsrecvalue[dataPointIndex]; // Use the hidden totalSample array
              
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
                    <div style="font-size: 13px; line-height: 1.8;">
                      <span style="color: #00008B; font-weight: bold;">No of Items:</span> ${Totalpoitems}<br>
                      <span style="color:rgb(250, 18, 6); font-weight: bold;">Order Value(in Cr):</span> ${totalpovalue}<br>
                      <span style="color: #008B8B; font-weight: bold;">Received Value (in Cr):</span> ${Totalrecvalue}
                    </div>
                  </div>`;
              },
              };
              






        this.chartOptions.xaxis = {categories: shaccyear};
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
  loadDataDME(mcid:any,hodid:any,HOD:any): void {
    
    if(this.selectedCategory==='' ){

      alert("Please Select Category")
      return
   
      }
    this.HOD=HOD;
    this.updateSelectedHodid()
    // this.updateSelectedCategory('DME');
    this.spinner.show();
    this.api.HODPOYear_AgAI(mcid,hodid,'N','Y').subscribe(
      (data: any) => {
        const shaccyear: string[] = [];
        const dmepoitems: number[] = [];
        const dmepovalue: number[] = [];
        const dmerecvalue: number[] = [];
        // console.log('API Response:', data);


        data.forEach((item:any)=> {
           
          shaccyear.push(item.shaccyear);
          dmepoitems.push(item.dmepoitems);
          dmepovalue.push(item.dmepovalue);
          dmerecvalue.push(item.dmerecvalue);

          // console.log('shaccyear:', item.shaccyear, 'delayparA1:', item.delayparA1);
          // if (item.delaypara && item.delayparA1) {
          //   this.whidMap[item.delaypara] = item.delayparA1;
          // } else {
          //   console.warn('Missing whid for delayparaA1 :', item.delayparaA1);
          // }

          
        });




        this.chartOptions.series = [

           
          { 
            name: 'dmepoitems', 
            data: dmepoitems,
            color:'#800000' 
          },


          { 
            name: 'dmepovalue',
            data: dmepovalue ,
            color:'#00008B'

          }
          
        ];

             // Add `totalSample` to tooltip manually
              this.chartOptions.tooltip = {
                shared: true,
                custom: ({ series, seriesIndex, dataPointIndex, w }) => {
                  const Totalpoitems = series[0][dataPointIndex]; // QC Time Taken
                  const totalpovalue = series[1][dataPointIndex]; // QC Time Taken
                  const Totalrecvalue = dmerecvalue[dataPointIndex]; // Use the hidden totalSample array
              
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
                    <div style="font-size: 13px; line-height: 1.8;">
                      <span style="color: #00008B; font-weight: bold;">No of Items:</span> ${Totalpoitems}<br>
                      <span style="color:rgb(250, 18, 6); font-weight: bold;">Order Value(in Cr):</span> ${totalpovalue}<br>
                      <span style="color: #008B8B; font-weight: bold;">Received Value (in Cr):</span> ${Totalrecvalue}
                    </div>
                  </div>`;
              },
              };

        this.chartOptions.xaxis = {categories: shaccyear};
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
  loadDataAYUSH(mcid:any,hodid:any,HOD:any): void {
    
    if(this.selectedCategory==='' ){

      alert("Please Select Category")
      return
   
      }
    this.HOD=HOD;
    this.updateSelectedHodid()
    // this.updateSelectedCategory('AYUSH');
    this.spinner.show();
    this.api.getHODYearWiseIssuanceSummary(mcid,hodid).subscribe(
      (data: any) => {
        const shaccyear: string[] = [];
        const ayIssueitems: number[] = [];
        const ayissueval: number[] = [];
        // console.log('API Response:', data);


        data.forEach((item:any)=> {
           
          shaccyear.push(item.shaccyear);
          ayIssueitems.push(item.ayIssueitems);
          ayissueval.push(item.ayissueval);

          // console.log('shaccyear:', item.shaccyear, 'delayparA1:', item.delayparA1);
          // if (item.delaypara && item.delayparA1) {
          //   this.whidMap[item.delaypara] = item.delayparA1;
          // } else {
          //   console.warn('Missing whid for delayparaA1 :', item.delayparaA1);
          // }

          
        });


        this.chartOptions.series = [

           
          { 
            name:' No of Items',  
            data: ayIssueitems ,
            color:'#800000'

          },


          { 
            name: 'Order Value(in Cr)',
            data: ayissueval ,
            color:'#00008B'

          }
          
        ];



        

        this.chartOptions.xaxis = {categories: shaccyear};
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



