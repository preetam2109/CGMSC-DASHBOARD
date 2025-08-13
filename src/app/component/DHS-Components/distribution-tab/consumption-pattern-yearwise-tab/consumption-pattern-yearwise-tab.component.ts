import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { NgSelectModule } from '@ng-select/ng-select';

import { NgApexchartsModule, ChartComponent, ApexOptions } from 'ng-apexcharts';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MontlyItemDemography } from 'src/app/Model/HODYearWiseIssuance';
import { DistributionComponent } from 'src/app/component/distribution/distribution.component';
import { ConversationHodCgmscComponent } from 'src/app/component/tender-status/conversation-hod-cgmsc/conversation-hod-cgmsc.component';
import { ApiService } from 'src/app/service/api.service';
import { DiswiseIssuanceComponent } from '../../diswise-issuance/diswise-issuance.component';
import { ChartOptions } from '../../edl-non-edl-issue-percent-summary/edl-non-edl-issue-percent-summary.component';
import { MonthwiseIssuanceComponent } from '../../monthwise-issuance/monthwise-issuance.component';
import { ConsumptionPatternTabComponent } from '../consumption-pattern-tab/consumption-pattern-tab.component';
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-consumption-pattern-yearwise-tab',
  standalone: true,
  imports: [NgSelectModule,FormsModule,CommonModule,NgApexchartsModule, MatTabsModule, DistributionComponent, MonthwiseIssuanceComponent, DiswiseIssuanceComponent, ConversationHodCgmscComponent, ConsumptionPatternTabComponent],
  templateUrl: './consumption-pattern-yearwise-tab.component.html',
  styleUrl: './consumption-pattern-yearwise-tab.component.css'
})
export class ConsumptionPatternYearwiseTabComponent {
  role=sessionStorage.getItem('roleName')
  @ViewChild('chart') chart: ChartComponent | undefined;
  public cO: Partial<ChartOptions> | undefined;

  chartOptions1!: Partial<ApexOptions>;
  chartOptions2!: Partial<ApexOptions>;
  chartOptions3!: Partial<ApexOptions>;
  
  yearCharts: Partial<ApexOptions>[] = [];

  whidMap: { [key: string]: number } = {};
  mcid=1
  hodid = 0;
  districtid:any=0
  MasIndentitemslist:any
  itemid:any
  roleName:any = localStorage.getItem('roleName')



  selectedCategory: string = 'Drugs'; 
  OnChangeTitle:string= 'Growth in Disribution Category:' 
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
     

    // this.chartOptions = {
    //   series: [],
    //   chart: {
    //     type: 'line',
    //     stacked: true,
    //     height: 600
    //   },
    //   plotOptions: {
    //     bar: {
    //       horizontal: false,
    //     },
    //   },
    //   xaxis: {
    //     categories: [],
        
        
    //   },
    //   yaxis: {
        
    //     title: {
    //       text: undefined,
    //     },
    //     labels:{
    //       formatter: function (value) {
    //         return value.toFixed(0); // This will show the values without decimals
    //       }
    //     },
        
        
        
        
    //   },
    //   dataLabels: {
    //     enabled: true,
    //     style: {
    //       // colors: ['#FF0000'] 
    //     }
    //   },
    //   stroke: {
    //     width: 4,
    //     // colors: ['#fff'],
    //   },
    //   title: {
    //     text:'Growth in Disribution Category: Drugs',
    //     align: 'center',
    //     style: {
    //       fontWeight:'bold',
    //       fontSize: '16px',
    //       color:'#FF3C00'
    //     },
    //   },
    //   tooltip: {
    //     y: {
    //       formatter: function (val: any) {
    //         return val.toString();
    //       },
    //     },
    //   },
    //   fill: {
    //     opacity: 1,
    //   },
    //   legend: {
    //     position: 'right',
    //     horizontalAlign: 'center',
    //     offsetX: 40,
    //   },
    // };

    
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

      // this.loadData(this.mcid, this.hodid);
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

    this.loadData(itemid,this.mcid);

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
      // this.chartOptions.title.text = this.OnChangeTitle +  this.selectedCategory;
    } else if (this.selectedCategory==='Consumables') {
      this.mcid = 2;
      // this.chartOptions.title.text = this.OnChangeTitle + this.selectedCategory;
    } else if (this.selectedCategory==='Reagent') {
      this.mcid = 3;
      // this.chartOptions.title.text = this.OnChangeTitle +  this.selectedCategory;
    } else if (this.selectedCategory==='AYUSH') {
      this.mcid = 4;
      // this.chartOptions.title.text =this.OnChangeTitle +  this.selectedCategory;
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

  // loadData(itemid:any,mcid:any): void {
  //   
  //   this.spinner.show();
  //   // if(sessionStorage.getItem('roleId')==='482'){
  //   //   this.districtid=sessionStorage.getItem('districtid')
  //   // }
  //   this.api.MontlyItemDemography(itemid,mcid).subscribe(
  //     (data:any) => {
  //       const issueMonth: string[] = [];
  //       const iss_qty:number[]=[];
  //       const issuevalue: number[] = [];
  //       const noofitems: number[] = [];
  //       console.log('API Response:', data);


  //       data.forEach((item:any)=> {
           
  //         issueMonth.push(item.issueMonth);
  //         iss_qty.push(item.iss_qty);
  //         issuevalue.push(item.issuevalue);
  //         noofitems.push(item.noofitems);
         

  //         // console.log('shaccyear:', item.shaccyear, 'delayparA1:', item.delayparA1);
  //         // if (item.delaypara && item.delayparA1) {
  //         //   this.whidMap[item.delaypara] = item.delayparA1;
  //         // } else {
  //         //   console.warn('Missing whid for delayparaA1 :', item.delayparaA1);
  //         // }

          
  //       });


  //       this.chartOptions.series = [

           
  //         { 
  //           name: ' Issued QTY', 
  //           data: iss_qty,
  //           // color:'#800000' 
  //         },
  //         { 
  //           name: ' Total Issued Items', 
  //           data: noofitems,
  //           // color:'#800000' 
  //         },
  //         { 
  //           name: ' Total Issued Value',
  //           data: issuevalue ,
  //           // color:'#00008B'

  //         }


          
  //       ];

  //       this.chartOptions.xaxis = {categories: issueMonth};
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
  

  loadData(itemid: any, mcid: any): void {
    let yearIds = [
      { id: 541, label: '2021-2022' },
      { id: 542, label: '2022-2023' },
      { id: 544, label: '2023-2024' },
      { id: 545, label: '2024-2025' },
      { id: 546, label: '2025-2026' }
    ];
  
    // Sort descending by starting year
    yearIds = yearIds.sort((a, b) => {
      const startA = parseInt(a.label.split('-')[0], 10);
      const startB = parseInt(b.label.split('-')[0], 10);
      return startB - startA;
    });
  
    this.yearCharts = [];
  
    // Create array of API calls
    const requests = yearIds.map(year =>
      this.api.MontlyItemDemography(itemid, mcid, year.id)
        .pipe(map((data: MontlyItemDemography[]) => ({ year, data })))
    );
  
    forkJoin(requests).subscribe(results => {
      results.forEach(({ year, data }) => {
        const monthMap = new Map<string, number>();
  
        // Group data by month
        data.forEach((item: any) => {
          const month = item.issueMonth;
          const qty = item.iss_qty || 0;
          monthMap.set(month, (monthMap.get(month) || 0) + qty);
        });
  
        const issueMonth = Array.from(monthMap.keys());
        const iss_qty = Array.from(monthMap.values());
  
        this.yearCharts.push({
          chart: {
            type: 'line',
            height: 300,
            zoom: { enabled: true }
          },
          stroke: { curve: 'smooth' },
          markers: { size: 4 },
          dataLabels: {
            enabled: true,
            formatter: (val: number) => val.toString(),
            style: { fontSize: '12px', colors: ['#000'] }
          },
          series: [{ name: 'Issued QTY', data: iss_qty }],
          xaxis: { categories: issueMonth },
          title: {
            text: `Consumption (${year.label})`,
            align: 'center'
          }
        } as Partial<ApexOptions>);
      });
  
      // No need for additional sort, because yearIds was sorted before forkJoin
      this.cdr.detectChanges();
      this.spinner.hide();
    });
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


        this.chartOptions1.series = [

           
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

        this.chartOptions1.xaxis = {categories: shaccyear};
        // this.cO = this.chartOptions1;
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


        this.chartOptions1.series = [

           
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

        this.chartOptions1.xaxis = {categories: shaccyear};
        // this.cO = this.chartOptions1;
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


        this.chartOptions1.series = [

           
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

        this.chartOptions1.xaxis = {categories: shaccyear};
        // this.cO = this.chartOptions1;
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



