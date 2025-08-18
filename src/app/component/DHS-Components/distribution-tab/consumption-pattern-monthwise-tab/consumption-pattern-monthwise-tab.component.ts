import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, OnInit, ChangeDetectorRef, SimpleChanges } from '@angular/core';
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
  ApexLegend,
  NgApexchartsModule
} from 'ng-apexcharts';
import { dispatchPending } from 'src/app/Model/dispatchPending';
import { DistrictService } from 'src/app/service/district.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/service/api.service';
import { IndentPendingWH } from 'src/app/Model/IndentPendingWH';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { IndentPendingWHSummary } from 'src/app/Model/IndentPendingWHSummary';
import { IWHPiplineSummary } from 'src/app/Model/IWHPiplineSummary';
import { IWHPiplineDetails } from 'src/app/Model/IWHPiplineDetails';
import { LabIssuePendingDetails } from 'src/app/Model/LabIssuePendingDetails';
import { HODYearWiseIssuanceSummary } from 'src/app/Model/HODYearWiseIssuanceSummary';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { NgSelectModule } from '@ng-select/ng-select';
import { DistributionComponent } from 'src/app/component/distribution/distribution.component';
import { ConversationHodCgmscComponent } from 'src/app/component/tender-status/conversation-hod-cgmsc/conversation-hod-cgmsc.component';
import { DiswiseIssuanceComponent } from '../../diswise-issuance/diswise-issuance.component';
import { MonthwiseIssuanceComponent } from '../../monthwise-issuance/monthwise-issuance.component';
import { ConsumptionPatternTabComponent } from '../consumption-pattern-tab/consumption-pattern-tab.component';
import { ToastrService } from 'ngx-toastr';
import { YearWiseIssueReport } from 'src/app/Model/HODYearWiseIssuance';



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
  selector: 'app-consumption-pattern-monthwise-tab',
  standalone: true,
  imports:[FormsModule,NgApexchartsModule,NgSelectModule,FormsModule,CommonModule,NgApexchartsModule, MatTabsModule, DistributionComponent, MonthwiseIssuanceComponent, DiswiseIssuanceComponent, ConversationHodCgmscComponent,ConsumptionPatternTabComponent],

  templateUrl: './consumption-pattern-monthwise-tab.component.html',
  styleUrl: './consumption-pattern-monthwise-tab.component.css'
})
export class ConsumptionPatternMonthwiseTabComponent {
  @ViewChild('chart') chart: ChartComponent | undefined;
  public cO: Partial<ChartOptions> | undefined;
  chartOptions: ChartOptions;
  whidMap: { [key: string]: number } = {};
  mcid=1
  hodid = 0;
  districtid:any=0

  MasIndentitemslist:any
  itemid:any
  roleName:any = localStorage.getItem('roleName')

  selectedCategory: string = 'Drugs'; 
  OnChangeTitle:string= 'Consumption Pattern:' 
  selectedCategoryTitle: string = '';
  selectedTabIndex: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public toastr: ToastrService,

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
        text:'Consumption Pattern: Drugs',
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

    
    // this.loadData(this.mcid,this.hodid);
    // this.loadDataDHS(this.mcid,this.hodid);
    // this.loadDataDME(this.mcid,this.hodid);
    // this.loadDataAYUSH(this.mcid,this.hodid);

  }


  
  

  ngOnInit() {


    this.getItemNoDropDown()


    // if(sessionStorage.getItem('roleId')==='482'){
    //   this.districtid=sessionStorage.getItem('districtid')
    // }
    
    // if(localStorage.getItem('roleName')==='CME' ||'DME1' ){

    //   this.loadDataDME(this.mcid, this.hodid);
    // }else{

    //   this.loadData(this.mcid, this.hodid);
    // }
  }

  
 getItemNoDropDown() {
    this.api.MasIndentitems(this.mcid, 0, 0, 0).subscribe({
      next: (res: any[]) => {
        if (res && res.length > 0) {
          this.MasIndentitemslist = res.map(item => ({
            itemid: item.itemid,
            nameText: item.nameText
          }));
          console.log('list', this.MasIndentitemslist);
        } else {
          console.error('No nameText found or incorrect structure:', res);
          this.MasIndentitemslist = [];
        }
      },
      error: (err) => {
        console.error('Error fetching dropdown items:', err);
        this.toastr.error('Failed to load item dropdown');
        this.MasIndentitemslist = [];
      }
    });
  }

  onISelectChange(event: Event): void {
    

    const selectedUser = this.MasIndentitemslist.find((user: { itemid: string }) => user.itemid === this.itemid); 
  
    if (selectedUser) {
      this.itemid=selectedUser.itemid || null;
      // this.getTravelVouchers()
  
    } else {
      console.error('Selected itemid not found in the list.');
    }
  }

  searchItem() {
        
    this.spinner.show();
    const itemid=this.itemid
    this.loadData(itemid,this.mcid );

    // this.loadData(itemid,this.mcid);

    // this.getMasitems(); 
    // this.GetPartiIndent(); 
    // this.getPartPOsSince1920();
    
    // this.getPartiItemsissue();
    // this.getPartiItemsRC();
    // this.openDialog();
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
      this.chartOptions.title.text = this.OnChangeTitle +  this.selectedCategory;
    } else if (this.selectedCategory==='Consumables') {
      this.mcid = 2;
      this.chartOptions.title.text = this.OnChangeTitle + this.selectedCategory;
    } else if (this.selectedCategory==='Reagent') {
      this.mcid = 3;
      this.chartOptions.title.text = this.OnChangeTitle +  this.selectedCategory;
    } else if (this.selectedCategory==='AYUSH') {
      this.mcid = 4;
      this.chartOptions.title.text =this.OnChangeTitle +  this.selectedCategory;
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

  loadData(itemId:any,mcid:any): void {
    
    this.spinner.show();
   
    this.api.YearWiseIssueReport(itemId,mcid).subscribe(
      (data:YearWiseIssueReport[]) => {
        const accyear: string[] = [];
        const iss_qty: number[] = [];
        const issuevalue: number[] = [];
        console.log('API Response:', data);


        data.forEach((item:any)=> {
           
          accyear.push(item.accyear);
          iss_qty.push(item.iss_qty);
          issuevalue.push(item.issuevalue);
         

          // console.log('shaccyear:', item.shaccyear, 'delayparA1:', item.delayparA1);
          // if (item.delaypara && item.delayparA1) {
          //   this.whidMap[item.delaypara] = item.delayparA1;
          // } else {
          //   console.warn('Missing whid for delayparaA1 :', item.delayparaA1);
          // }

          
        });


        this.chartOptions.series = [

           
          { 
            name: ' Issued QTY (in Lacs)', 
            data: iss_qty,
            color:'#800000' 
          },
          { 
            name: 'Issued Value (in Cr)',
            data: issuevalue ,
            color:'#00008B'

          }


          
        ];

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
  
  
  loadDataDHS(mcid:any,hodid:any): void {
    
    //  let wheretitle=this.updateSelectedCategory();
    // this.updateSelectedCategory('DHS');
    // this.updateSelectedCategory()

    
    this.spinner.show();
    this.api.getHODYearWiseIssuanceSummary(mcid,hodid).subscribe(
      (data: any) => {
        const shaccyear: string[] = [];
        const dhsissueitems: number[] = [];
        const dhsissuevalue: number[] = [];
        console.log('API Response:', data);


        data.forEach((item:any)=> {
           
          shaccyear.push(item.shaccyear);
          dhsissueitems.push(item.dhsissueitems);
          dhsissuevalue.push(item.dhsissuevalue);

          // console.log('shaccyear:', item.shaccyear, 'delayparA1:', item.delayparA1);
          // if (item.delaypara && item.delayparA1) {
          //   this.whidMap[item.delaypara] = item.delayparA1;
          // } else {
          //   console.warn('Missing whid for delayparaA1 :', item.delayparaA1);
          // }

          
        });


        this.chartOptions.series = [

           
          { 
            name: ' DHS Issued Items', 
            data: dhsissueitems ,
            color:'#800000'
          },


          { 
            name: ' DHS Issued Value',
            data: dhsissuevalue ,
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
  loadDataDME(mcid:any,hodid:any): void {
    
    // this.updateSelectedCategory('DME');
    this.spinner.show();
    this.api.getHODYearWiseIssuanceSummary(mcid,hodid).subscribe(
      (data: any) => {
        const shaccyear: string[] = [];
        const dmeissueitems: number[] = [];
        const dmeissuevalue: number[] = [];
        // console.log('API Response:', data);


        data.forEach((item:any)=> {
           
          shaccyear.push(item.shaccyear);
          dmeissueitems.push(item.dmeissueitems);
          dmeissuevalue.push(item.dmeissuevalue);

          // console.log('shaccyear:', item.shaccyear, 'delayparA1:', item.delayparA1);
          // if (item.delaypara && item.delayparA1) {
          //   this.whidMap[item.delaypara] = item.delayparA1;
          // } else {
          //   console.warn('Missing whid for delayparaA1 :', item.delayparaA1);
          // }

          
        });


        this.chartOptions.series = [

           
          { 
            // name: ' DME Items', 
            name: ' CME Issued Items', 
            data: dmeissueitems,
            color:'#800000' 
          },


          { 
            // name: ' DME Value',
            name: ' CME Issued Value(in Cr)',
            data: dmeissuevalue ,
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
  loadDataAYUSH(mcid:any,hodid:any): void {
    
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
            name: ' AYUSH Issued Items', 
            data: ayIssueitems ,
            color:'#800000'

          },


          { 
            name: ' AYUSH Issued Value',
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


}



