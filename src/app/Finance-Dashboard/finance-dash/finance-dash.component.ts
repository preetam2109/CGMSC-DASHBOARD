import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexPlotOptions, ApexXAxis, ApexYAxis, ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexFill, ApexLegend, NgApexchartsModule } from 'ng-apexcharts';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NgxSpinnerService } from 'ngx-spinner';
import { DropdownModule } from 'primeng/dropdown';
import { config } from 'rxjs';
import { TenderDetails } from 'src/app/Model/DashProgressCount';
import { Fund_Libilities, FundReivedBudgetDetails, FundReivedBudgetID, GetSanctionPrepDetails, GrossPaidDateWiseDetails, LibDetailsbasedOnYearID, PODetailsAgainstIndentYr } from 'src/app/Model/FinanceDash';
import { ApiService } from 'src/app/service/api.service';
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
  selector: 'app-finance-dash',
  standalone: true,
  imports: [MatIconModule,NgSelectModule,SelectDropDownModule,DropdownModule,MatSelectModule,FormsModule,NgSelectModule,
    FormsModule,CommonModule,MatButtonModule,MatMenuModule, MatTableExporterModule,MatPaginatorModule,MatSortModule,MatDialogModule, 
    MatTableModule,NgApexchartsModule],
  
  templateUrl: './finance-dash.component.html',
  styleUrl: './finance-dash.component.css'
})
export class FinanceDashComponent {
exportToPDF() {
throw new Error('Method not implemented.');
}
applyTextFilter // this.LiveTenderDivision = data;
($event: KeyboardEvent) {
throw new Error('Method not implemented.');
}
  FundsDDL:any

  budgetid:any=1;


  PODetailsAgainstIndentYrlist:any
   public cO: Partial<ChartOptions> | undefined;
   chartOptionsPaidLineBar!: ChartOptions; // For bar chart
   chartOptionsPORecPaid!: ChartOptions; // For bar chart
      chartOptionFundLLibility!: ChartOptions; // For bar chart
      chartOptionsPipelineLib!: ChartOptions; // For bar chart
      chartOptionsSanctionPrep5!: ChartOptions; // For bar chart
      chartOptionChequePrep6!: ChartOptions; // For bar chart
      chartOptionsFundInflows!: ChartOptions; // For line chart
      chartOptionsLine3!: ChartOptions; // For line chart
      //#endregion
       //#region DataBase Table
       FundReivedBudgetDetails:FundReivedBudgetDetails[]=[]
        dataSource!: MatTableDataSource<FundReivedBudgetDetails>;
        dataSource2!: MatTableDataSource<GrossPaidDateWiseDetails>;
        dataSource3!: MatTableDataSource<LibDetailsbasedOnYearID>;
        dataSource4!: MatTableDataSource<GetSanctionPrepDetails>;
        @ViewChild('paginator') paginator!: MatPaginator;
        @ViewChild('sort') sort!: MatSort;
        @ViewChild('paginator2') paginator2!: MatPaginator;
        @ViewChild('sort2') sort2!: MatSort;
        @ViewChild('paginator3') paginator3!: MatPaginator;
        @ViewChild('sort3') sort3!: MatSort;
        @ViewChild('paginator4') paginator4!: MatPaginator;
        @ViewChild('sort3') sort4!: MatSort;
        grossPaidDateWiseDetails:GrossPaidDateWiseDetails[]=[]
        PaidYearwise_Budget:any
        fundReivedBudgetID:FundReivedBudgetID[]=[];
        pODetailsAgainstIndentYr:PODetailsAgainstIndentYr[]=[];
        LibDetailsbasedOnYearID:LibDetailsbasedOnYearID[]=[];
        Fund_Libilities:Fund_Libilities[]=[];
        
        sanctionPrepDetails:GetSanctionPrepDetails[]=[];
        yrid:any=0;
  selectedSeries: string = '';


@ViewChild('FundDetailsModal') FundDetailsModal: any;
@ViewChild('grossPaidDateWiseDetailsModal') grossPaidDateWiseDetailsModal: any;

@ViewChild('LibDetailsModal') LibDetailsModal: any;

constructor(private cdr: ChangeDetectorRef,public api:ApiService,private spinner: NgxSpinnerService,private dialog: MatDialog){
  this.dataSource = new MatTableDataSource<any>([]);
  this.dataSource2 = new MatTableDataSource<any>([]);
  this.dataSource3 = new MatTableDataSource<any>([]);
  this.dataSource4 = new MatTableDataSource<any>([]);

  
    this.chartOptionsPaidLineBar = {
      series: [],
      chart: {
        type: 'line',
        stacked: true,
        // height: 'auto',
        // height:400,
        // height: 200,
        // width:600,
        events: {
          markerClick: (
            
            event,
            chartContext,
            { dataPointIndex, seriesIndex }
          ) => {
            
            const selectedCategory = this.chartOptionsPaidLineBar?.xaxis?.categories?.[dataPointIndex];
            const selectedSeries = this.chartOptionsPaidLineBar?.series?.[seriesIndex]?.name;
            // Ensure the selectedCategory and selectedSeries are valid
            if (selectedCategory && selectedSeries) {
              
              const apiData = this.fundReivedBudgetID; // Replace with the actual data source or API response
              // Find the data in your API response that matches the selectedCategory
              const selectedData = apiData.find(
                (data) => data.accyear === selectedCategory
              );
              // console.log("selectedData chart1",selectedData)
              if (selectedData) {
                const id = selectedData.accyrsetid; // Extract the id from the matching entry

                this.fetchDataBasedOnChart2SelectionYrid(id, selectedSeries);
              } else {
                console.log(
                  `No data found for selected category: ${selectedCategory}`
                );
              }
            } else {
              console.log('Selected category or series is invalid.');
            }
          },
        },
      
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      xaxis: {
        categories: [],
      },
      
      yaxis: {
        title: {
          text: undefined,
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          // colors: ['#FF0000']
          fontWeight:'bold',
            fontSize:'15px',
          colors: ['#000'],
        },
      },
      stroke: {
        width: 4,
        // colors: ['#000'],
        colors: ['#fff'],
      },
      title: {
        text: 'F.Y.-wise Payment Status(in Cr)',
        align: 'center',
        style: {
          // fontSize: '12px',
          fontSize: '15px',
          // color: '#000'
          color: '#6e0d25',
        },
      },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
          debugger
          const dataPoint = w.config.series[seriesIndex].data[dataPointIndex];
           console.log("dataPoint=",dataPoint)

          return `<div class="tooltip-box">
                    <div><strong>amountPaid:</strong> ${dataPoint.amountPaid}</div>
                    <div><strong>noofPO:</strong> ${dataPoint.noofPO}</div>
                  </div>`;
                 
        }
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


    this.chartOptionsPORecPaid = {
      series: [],
      chart: {
        type: 'bar',
        stacked: false,
        // height: 'auto',
        // height:400,
        // height: 200,
        // width:600,
        events: {
          dataPointSelection: (
            event: any,
            chartContext: any,
            config: { dataPointIndex: number; seriesIndex: number }
          ) => {
            ;
            
            const selectedCategory = this.chartOptionsPORecPaid?.xaxis?.categories?.[config.dataPointIndex];
        
            const selectedSeries =
              config.seriesIndex === 0 ? 'PO Value' :
              (config.seriesIndex === 1 ? 'Received Value' : 'Total Paid');
        
            this.selectedSeries = selectedSeries;
        
       
        
            // Ensure the selectedCategory and selectedSeries are valid
            if (selectedCategory && selectedSeries) {
              ;
              const apiData = this.pODetailsAgainstIndentYr; // Replace with the actual data source or API response
        
              // Find the data in your API response that matches the selectedCategory
              const selectedData = apiData.find(
                (data) => data.accyear === selectedCategory
              );
        
              if (selectedData) {
                const id = selectedData.aifinyear; // Extract the id from the matching entry
                ;
                if (selectedSeries === 'Total Paid') {
                  // Handle totalpaid logic
                this.fetchDataBasedOnaifinyearSelectionYrid(id, selectedSeries);

                } else if (selectedSeries === 'Received Value') {
                  // Handle recValue logic
                } else if (selectedSeries === 'PO Value') {
                  // Handle poValue logic
                }


              } else {
                console.log(`No data found for selected category: ${selectedCategory}`);
              }
            } else {
              console.log('Selected category or series is invalid.');
            }
          },
        },
        
      
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
      },
      dataLabels: {
        enabled: true,
        style: {
          // colors: ['#FF0000']
          fontWeight:'bold',
            fontSize:'15px',
          colors: ['#000'],
        },
      },
      stroke: {
        width: 4,
        // colors: ['#000'],
        colors: ['#fff'],
      },
      title: {
        text: 'Annual PO Value Analysis: Ordered vs. Received (in Cr)',
        align: 'center',
        style: {
          // fontSize: '12px',
          fontSize: '15px',
          // color: '#000'
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

    this.chartOptionsSanctionPrep5 = {
      series: [],
      chart: {
        type: 'bar',
        stacked: false,

      
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
      },
      dataLabels: {
        enabled: true,
        style: {
          // colors: ['#FF0000']
          fontWeight:'bold',
            fontSize:'15px',
          colors: ['#000'],
        },
      },
      stroke: {
        width: 4,
        // colors: ['#000'],
        colors: ['#fff'],
      },
      title: {
        text: 'Sanction Prepared on Fund Libilities [Awaiting Payment]',
        align: 'center',
        style: {
          // fontSize: '12px',
          fontSize: '15px',
          // color: '#000'
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


    
    this.chartOptionChequePrep6 = {
      series: [],
      chart: {
        type: 'bar',
        stacked: false,

      
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
      },
      dataLabels: {
        enabled: true,
        style: {
          // colors: ['#FF0000']
          fontWeight:'bold',
            fontSize:'15px',
          colors: ['#000'],
        },
      },
      stroke: {
        width: 4,
        // colors: ['#000'],
        colors: ['#fff'],
      },
      title: {
        text: 'Cheque Prepared on Fund Libilities [Awaiting Payment]',
        align: 'center',
        style: {
          // fontSize: '12px',
          fontSize: '15px',
          // color: '#000'
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

    this.chartOptionsPipelineLib = {
      series: [],
      chart: {
        type: 'bar',
        stacked: false,
        // height: 'auto',
        // height:400,
        // height: 200,
        // width:600,
      
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
      },
      dataLabels: {
        enabled: true,
        style: {
          // colors: ['#FF0000']
          fontWeight:'bold',
            fontSize:'15px',
          colors: ['#000'],
        },
      },
      stroke: {
        width: 4,
        // colors: ['#000'],
        colors: ['#fff'],
      },
      title: {
        text: 'Upcoming Supply (Pipeline) Libilities',
        align: 'center',
        style: {
          // fontSize: '12px',
          fontSize: '15px',
          // color: '#000'
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
  
  
    this.chartOptionsFundInflows = {
      series: [],
      chart: {
        type: 'line',
        stacked: false,
        // height: 'auto',
        // height:400,
        // height: 200,
        // width:500,
        events: {
          markerClick: (
            
            event,
            chartContext,
            { dataPointIndex, seriesIndex }
          ) => {
            
            const selectedCategory = this.chartOptionsFundInflows?.xaxis?.categories?.[dataPointIndex];
            const selectedSeries = this.chartOptionsFundInflows?.series?.[seriesIndex]?.name;
            // Ensure the selectedCategory and selectedSeries are valid
            
            if (selectedCategory && selectedSeries) {
              
              const apiData = this.fundReivedBudgetID; // Replace with the actual data source or API response
              // Find the data in your API response that matches the selectedCategory
              const selectedData = apiData.find(
                (data) => data.accyear === selectedCategory
              );
              // console.log("selectedData chart1",selectedData)
              if (selectedData) {
                const id = selectedData.accyrsetid; // Extract the id from the matching entry

                this.fetchDataBasedOnChartSelectionYrid(id, selectedSeries);
              } else {
                console.log(
                  `No data found for selected category: ${selectedCategory}`
                );
              }
            } else {
              console.log('Selected category or series is invalid.');
            }
          },
        },
      
      },
      plotOptions: {
        bar: {
          horizontal: false,
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        },
      },
      xaxis: {
        categories: [],
        // position: 'top',
      },
      
      yaxis: {
        title: {
          text: undefined,
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          // colors: ['#FF0000']
          fontWeight:'bold',
            fontSize:'15px',
          colors: ['#000'],
        },
      },
      stroke: {
        width: 4,
        // colors: ['#000'],
        colors: ['#fff'],
      },
      title: {
        text: 'Fund Inflows – Past 3 F.Y.(in Cr)',
        align: 'center',
        style: {
          // fontSize: '12px',
          fontSize: '15px',
          // color: '#000'
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

    this.chartOptionFundLLibility = {
      series: [],
      chart: {
        type: 'line',
        stacked: false,
        // height: 'auto',
        // height:400,
        // height: 200,
        // width:500,

        events: {
          markerClick: (
            event,
            chartContext,
            { dataPointIndex, seriesIndex }
          ) => {
            ;
            
            console.log('dataPointIndex:', dataPointIndex);
            console.log('seriesIndex:', seriesIndex);
            console.log('Categories:', this.chartOptionFundLLibility?.xaxis?.categories);
            
            const categories = this.chartOptionFundLLibility?.xaxis?.categories;
            if (!categories || categories.length === 0) {
              console.error('xaxis.categories is not defined or empty.');
              return;
            }
        
            const selectedCategory = categories[dataPointIndex];
            const selectedSeries = this.chartOptionFundLLibility?.series?.[seriesIndex]?.name;
        
            console.log('Selected Category:', selectedCategory);
            console.log('Selected Series:', selectedSeries);
        
            if (selectedCategory && selectedSeries) {
              const apiData = this.Fund_Libilities; // Ensure this is properly initialized
              const selectedData = apiData.find((data) => data.name  === selectedCategory);
        
              if (selectedData) {
                const id = selectedData.id;
                ;
                this.fetchDataBasedOnchartOptionFundLLibility(id, selectedSeries);
              } else {
                console.warn(`No data found for selected category: ${selectedCategory}`);
              }
            } else {
              console.warn('Selected category or series is invalid.');
            }
          },
        },


      
      },
      plotOptions: {
        bar: {
          horizontal: false,
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        },
      },
      xaxis: {
        categories: [],
        // position: 'top',
      },
      
      yaxis: {
        title: {
          text: undefined,
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          // colors: ['#FF0000']
          fontWeight:'bold',
            fontSize:'15px',
          colors: ['#000'],
        },
      },
      stroke: {
        width: 4,
        // colors: ['#000'],
        colors: ['#fff'],
      },
      title: {
        text: 'Fund Libilities against P.O. (in Cr)',
        align: 'center',
        style: {
          // fontSize: '12px',
          fontSize: '15px',
          // color: '#000'
          color: '#6e0d25',
        },
      },
      
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
          const dataPoint = w.config.series[seriesIndex].data[dataPointIndex];
           console.log("dataPoint=",dataPoint)

          return `<div class="tooltip-box">
                    <div><strong>nospo:</strong> ${dataPoint.nospo}</div>
                    <div><strong>libvalue:</strong> ${dataPoint.libvalue}</div>
                  </div>`;
                 
        }
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

  }



ngOnInit(): void {
  const roleID =sessionStorage.getItem('roleId')
  if(roleID=='485'){
this.budgetid=2
  }else if(roleID=='459'){
    this.budgetid=1

  }
 
  this.GetFundsDDL()
  this.GetFundReivedBudgetID();
  this.getPaidYearwise_Budget();
  this.getPODetailsAgainstIndentYr();
  this.GetFund_Libilities();
  this.GetPipeline_Libilities();
  this.getSanc_Cheque();
  this.getChequePrep();
}

getSanc_Cheque(){
  
        this.api.Sanc_Cheque('Sanction',this.budgetid).subscribe((data:any[])=>{
        console.log('Sanction',JSON.stringify(data));
          const budgetname: any[] = [];
          const nosPo: any[] = [];
          const nossupplier: any[] = [];
          const sncamtcr: any[] = [];
        

          data.forEach(
            (item: {
              budgetname: string;
              nosPo: any;
              nossupplier: any;
              sncamtcr: any;
           
            }) => {
              budgetname.push(item.budgetname);
              nosPo.push(item.nosPo);
              nossupplier.push(item.nossupplier);
              sncamtcr.push(item.sncamtcr);
     
            }
          );

          this.chartOptionsSanctionPrep5.series = [
          
            {
              name: 'No of PO',
              data: nosPo,
              // color: '#38b000',
            },
            {
              name: 'No of Supplier ',
              data: nossupplier,
              // color: '#38b000',
            },
            {
              name: 'Sanction Value (in Cr)',
              data: sncamtcr,
              // color: '#38b000',
            }
         
        
          
          ];

      
              
              

          this.chartOptionsSanctionPrep5.xaxis = {
            categories: budgetname,
            labels:{
              style:{
                // colors:'#390099',
                fontWeight:'bold',
                fontSize:'15px'
              }
            }
            
  
            
           };
          this.cO = this.chartOptionsSanctionPrep5;
          this.cdr.detectChanges();
          this.spinner.hide();
        },
        (error: any) => {
          console.error('Error fetching data', error);
          this.spinner.hide();
        }
      );
    }

    getChequePrep(){
      
      this.api.Sanc_Cheque('Cheque',this.budgetid).subscribe((data:any[])=>{
      console.log('Cheque pep data',data);
        const budgetname: any[] = [];
        const nosPo: any[] = [];
        const nossupplier: any[] = [];
        const sncamtcr: any[] = [];
      

        data.forEach(
          (item: {
            budgetname: string;
            nosPo: any;
            nossupplier: any;
            sncamtcr: any;
         
          }) => {
            budgetname.push(item.budgetname);
            nosPo.push(item.nosPo);
            nossupplier.push(item.nossupplier);
            sncamtcr.push(item.sncamtcr);
   
          }
        );

        this.chartOptionChequePrep6.series = [
        
          {
            name: 'No of PO',
            data: nosPo,
            // color: '#38b000',
          },
          {
            name: 'No of Supplier ',
            data: nossupplier,
            // color: '#38b000',
          },
          {
            name: 'Cheque Prepared Value (in Cr)',
            data: sncamtcr,
            // color: '#38b000',
          }
       
      
        
        ];

    
            
            

        this.chartOptionChequePrep6.xaxis = {
          categories: budgetname,
          labels:{
            style:{
              // colors:'#390099',
              fontWeight:'bold',
              fontSize:'15px'
            }
          }
          

          
         };
        this.cO = this.chartOptionChequePrep6;
        this.cdr.detectChanges();
        this.spinner.hide();
      },
      (error: any) => {
        console.error('Error fetching data', error);
        this.spinner.hide();
      }
    );
  }
getPODetailsAgainstIndentYr(){
  
        this.api.PODetailsAgainstIndentYr(this.budgetid,0,2).subscribe((data:any[])=>{
        
          this.pODetailsAgainstIndentYr=data
          
          const accyear: string[] = [];
          const aifinyear:any[]=[];
          const noofPO: any[] = [];
          const poValue: any[] = [];
          const recValue: any[] = [];
          const totalpaid: any[] = [];

          data.forEach(
            (item: {
              accyear: string;
              aifinyear:string;
              noofPO: any;
              poValue: any;
              recValue: any;
              totalpaid: any;
            }) => {
              accyear.push(item.accyear);
              aifinyear.push(item.aifinyear);
              noofPO.push(item.noofPO);
              poValue.push(item.poValue);
              recValue.push(item.recValue);
              totalpaid.push(item.totalpaid);
            }
          );

          this.chartOptionsPORecPaid.series = [
            // {
            //   name: 'No of PO',
            //   data: noofPO,
            //   color: '#38b000',
            // },
            {
              name: 'PO Value',
              data: poValue,
              // color: '#38b000',
            },
            {
              name: 'Received Value',
              data: recValue,
              // color: '#38b000',
            },
            {
              name: 'Total Paid',
              data: totalpaid,
              // color: '#38b000',
            }
         
        
          
          ];

              // Add `totalSample` to tooltip manually
              // this.chartOptions2.tooltip = {
              //   shared: true,
              //   custom: function({ series, seriesIndex, dataPointIndex, w }) {
              //     const POValue = w.globals.series[0][dataPointIndex];  
              //     const recValue = w.globals.series[1][dataPointIndex];  
              //     const NoofPO = noofPO[dataPointIndex];  
              
              //     return `
              //     <div style="
              //       padding: 10px; 
              //       border-radius: 8px; 
              //       box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
              //       background: linear-gradient(135deg, #ffffff, #f9f9f9); 
              //       font-family: Arial, sans-serif; 
              //       color: #333;
              //     ">
              //       <strong style="display: block; font-size: 14px; margin-bottom: 8px;">Details</strong>
              //       <div style="font-size: 13px; line-height: 1.8;">
              //         <span style="color: #008B8B; font-weight: bold;">No of PO:</span> ${NoofPO}<br>
              //         <span style="color: #00008B; font-weight: bold;">PO Value:</span> ${POValue}<br>
              //         <span style="color:rgb(250, 18, 6); font-weight: bold;">Received Value:</span> ${recValue}<br>
              //       </div>
              //     </div>`;
              //   }
              // };
              
              

          this.chartOptionsPORecPaid.xaxis = {
            categories: accyear,
            labels:{
              style:{
                // colors:'#390099',
                fontWeight:'bold',
                fontSize:'15px'
              }
            }
            
  
            
           };
          this.cO = this.chartOptionsPORecPaid;
          this.cdr.detectChanges();
          this.spinner.hide();
        },
        (error: any) => {
          console.error('Error fetching data', error);
          this.spinner.hide();
        }
      );
    }
GetPipeline_Libilities(){
  
        this.api.Pipeline_Libilities(this.budgetid).subscribe((data:any[])=>{
        
          const name: string[] = [];
          const nositems: any[] = [];
          const nospo: any[] = [];
          const pipeLIvalue: any[] = [];

          data.forEach(
            (item: {
              name: string;
              nositems: any;
              nospo: any;
              pipeLIvalue: any;
            }) => {
              name.push(item.name);
              nositems.push(item.nositems);
              nospo.push(item.nospo);
              pipeLIvalue.push(item.pipeLIvalue);
            }
          );

          this.chartOptionsPipelineLib.series = [
            // {
            //   name: 'No of PO',
            //   data: noofPO,
            //   color: '#38b000',
            // },
            {
              name: 'No of Items',
              data: nositems,
              // color: '#38b000',
            },
            
            {
              name: 'No of PO',
              data: nospo,
              // color: '#38b000',
            },
            {
              name: 'Pipeline Value',
              data: pipeLIvalue,
              // color: '#38b000',
            }
        
          
          ];

              // Add `totalSample` to tooltip manually
              // this.chartOptions2.tooltip = {
              //   shared: true,
              //   custom: function({ series, seriesIndex, dataPointIndex, w }) {
              //     const POValue = w.globals.series[0][dataPointIndex];  
              //     const recValue = w.globals.series[1][dataPointIndex];  
              //     const NoofPO = noofPO[dataPointIndex];  
              
              //     return `
              //     <div style="
              //       padding: 10px; 
              //       border-radius: 8px; 
              //       box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
              //       background: linear-gradient(135deg, #ffffff, #f9f9f9); 
              //       font-family: Arial, sans-serif; 
              //       color: #333;
              //     ">
              //       <strong style="display: block; font-size: 14px; margin-bottom: 8px;">Details</strong>
              //       <div style="font-size: 13px; line-height: 1.8;">
              //         <span style="color: #008B8B; font-weight: bold;">No of PO:</span> ${NoofPO}<br>
              //         <span style="color: #00008B; font-weight: bold;">PO Value:</span> ${POValue}<br>
              //         <span style="color:rgb(250, 18, 6); font-weight: bold;">Received Value:</span> ${recValue}<br>
              //       </div>
              //     </div>`;
              //   }
              // };
              
              

          this.chartOptionsPipelineLib.xaxis = {
            categories: name,
            labels:{
              style:{
                // colors:'#390099',
                fontWeight:'bold',
                fontSize:'15px'
              }
            }
            
  
            
           };
          this.cO = this.chartOptionsPipelineLib;
          this.cdr.detectChanges();
          this.spinner.hide();
        },
        (error: any) => {
          console.error('Error fetching data', error);
          this.spinner.hide();
        }
      );
    }


GetFundReivedBudgetID(): void {
  
  this.spinner.show();
  debugger
    this.api.getFundReivedBudgetID(this.budgetid,0)
      .subscribe(
        (data: any) => {
          console.log('sdkokokokokokoksdadsd'+data);
          this.fundReivedBudgetID=data;
          
          console.log('sdkokokokokokoksdadsd'+this.fundReivedBudgetID);
        
          const accyear: string[] = [];
          const recAmt: number[] = [];
          const refund: number[] = [];
          const adjust: number[] = [];

          data.forEach(
            (item: {
              accyear: string;
              recAmt: number;
              refund: number;
              adjust: number;
            }) => {
              accyear.push(item.accyear);
              recAmt.push(item.recAmt);
              refund.push(item.refund);
              adjust.push(item.adjust);
            }
          );

          this.chartOptionsFundInflows.series = [
            {
              name: 'Received Fund',
              data: recAmt,
              color: '#38b000',
            }
         
        
          
          ];
          this.chartOptionsFundInflows.xaxis = {
            categories: accyear,
            labels:{
              style:{
                // colors:'#390099',
                fontWeight:'bold',
                fontSize:'15px'
              }
            }
            
  
            
           };
          this.cO = this.chartOptionsFundInflows;
          this.cdr.detectChanges();
          this.spinner.hide();
        },
        (error: any) => {
          console.error('Error fetching data', error);
          this.spinner.hide();
        }
      );
    }


GetFund_Libilities(): void {
  this.spinner.show();

  this.api.Fund_Libilities(this.budgetid).subscribe(
    (data: any) => {
      ;
      this.Fund_Libilities = data;
      console.log('Show fund liabilities:', JSON.stringify(this.Fund_Libilities));

      // Extracting necessary data
      const categories: string[] = [];
      const seriesData: { x: string; y: number; extra: { nospo: number; libvalue: number } }[] = [];

      data.forEach((item: { name: string; id: number; nospo: number; libility: number }) => {
        categories.push(item.name);
        seriesData.push({
          x: item.name, // X-axis category
          y: item.libility, // Y-axis value
          extra: {
            nospo: item.nospo, // Extra property
            libvalue: item.libility,
          },
        });
      });

      // ✅ Ensure `xaxis.categories` is explicitly set
      this.chartOptionFundLLibility = {
        ...this.chartOptionFundLLibility, // Preserve existing properties
        series: [
          {
            name: 'libility',
            data: seriesData,
            color: '#38b000',
          },
        ],
        xaxis: {
          categories: categories, // ✅ Now explicitly setting categories
          labels: {
            style: {
              fontWeight: 'bold',
              fontSize: '15px',
            },
          },
        },
        tooltip: {
          custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
            const dataPoint = w.config.series[seriesIndex].data[dataPointIndex]; // Get full object
            return `<div class="tooltip-box">
                      <div><strong>nospo:</strong> ${dataPoint.extra.nospo}</div>
                      <div><strong>libvalue:</strong> ${dataPoint.extra.libvalue}</div>
                    </div>`;
          },
        },
      };

      this.cO = this.chartOptionFundLLibility;
      this.cdr.detectChanges();
      this.spinner.hide();
    },
    (error: any) => {
      console.error('Error fetching data', error);
      this.spinner.hide();
    }
  );
}


getPaidYearwise_Budget(): void {
  this.spinner.show();

  this.api.PaidYearwise_Budget(this.budgetid, 0).subscribe(
    (data: any) => {
      this.PaidYearwise_Budget = data;
      console.log('Show Paid Yearwise Budget:', JSON.stringify(this.PaidYearwise_Budget));

      // Extracting necessary data
      const categories: string[] = [];
      const seriesData: { x: string; y: number; extra: { nospo: number; paidvalue: number } }[] = [];

      data.forEach((item: { accyear: string; noofPO: number; amountPaid: number }) => {
        categories.push(item.accyear);
        seriesData.push({
          x: item.accyear, // X-axis category
          y: item.amountPaid, // Y-axis value
          extra: {
            nospo: item.noofPO, // Extra property
            paidvalue: item.amountPaid,
          },
        });
      });

      // ✅ Ensure `xaxis.categories` is explicitly set
      this.chartOptionsPaidLineBar = {
        ...this.chartOptionsPaidLineBar, // Preserve existing properties
        series: [
          {
            name: 'Gross Paid (in Cr)',
            data: seriesData,
            color: '#38b000',
          },
        ],
        xaxis: {
          categories: categories, // ✅ Now explicitly setting categories
          labels: {
            style: {
              fontWeight: 'bold',
              fontSize: '15px',
            },
          },
        },
        tooltip: {
          custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
            const dataPoint = w.config.series[seriesIndex].data[dataPointIndex]; // Get full object
            return `<div class="tooltip-box">
                      <div><strong>No. of PO:</strong> ${dataPoint.extra.nospo}</div>
                      <div><strong>Paid Amount:</strong> ${dataPoint.extra.paidvalue}</div>
                    </div>`;
          },
        },
      };

      this.cO = this.chartOptionsPaidLineBar;
      this.cdr.detectChanges();
      this.spinner.hide();
    },
    (error: any) => {
      console.error('Error fetching data', error);
      this.spinner.hide();
    }
  );
}


GetFundsDDL(){
  
  this.api.getFundsDDL(sessionStorage.getItem('roleId')).subscribe((res:any[])=>{
    // console.log(' Vehicle API dropdown Response:', res);
    if (res && res.length > 0) {
      this.FundsDDL = res.map(item => ({
        budgetid: item.budgetid, // Adjust key names if needed
        budgetname : item.budgetname,
        
        
      }));
    } else {
      console.error('No nameText found or incorrect structure:', res);
    }
  });  
}
  onISelectChange(event: Event): void {
    
    const selectedUser = this.FundsDDL.find((user: { budgetid: string }) => user.budgetid === this.budgetid); 
  
    if (selectedUser) {
      this.budgetid=selectedUser.budgetid || null;
      this.GetFundReivedBudgetID();
      this.getPaidYearwise_Budget();
      this.getPODetailsAgainstIndentYr();
  
    } else {
      console.error('Selected budgetid not found in the list.');
    }
  }


    GetFundReivedBudgetDetails(){
    
          this.api.FundReivedBudgetDetails(this.budgetid,this.yrid).subscribe((res:any[])=>{
            if (res && res.length > 0) {
             this.spinner.show();
  
              this.FundReivedBudgetDetails =res.map((item: any, index: number) => ({
              
                ...item,
                sno: index + 1,
              }));
              console.log('FundReivedBudgetDetails List:', this.FundReivedBudgetDetails);
              this.dataSource.data = this.FundReivedBudgetDetails; // Ensure this line executes properly
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              this.spinner.hide();
            } else {
              console.error('No nameText found or incorrect structure:', res);
              this.spinner.hide();
  
            }
          });  
        }

        
        GrossPaidDateWiseDetails(){
    
          this.api.GrossPaidDateWiseDetails(this.budgetid,0,0,0,this.yrid).subscribe((res:any[])=>{
            if (res && res.length > 0) {
             this.spinner.show();
  
              this.grossPaidDateWiseDetails =res.map((item: any, index: number) => ({
              
                ...item,
                sno: index + 1,
              }));
              console.log('grossPaidDateWiseDetails List:', this.grossPaidDateWiseDetails);
              this.dataSource2.data = [...this.grossPaidDateWiseDetails];
              console.log('datasource2 List:', this.grossPaidDateWiseDetails);

              this.dataSource2.data = this.grossPaidDateWiseDetails; // Ensure this line executes properly
              this.dataSource2.paginator = this.paginator2;
              this.dataSource2.sort = this.sort2;
              this.spinner.hide();
            } else {
              console.error('No nameText found or incorrect structure:', res);
              this.spinner.hide();
  
            }
          });  
        }

        getLibDetails(){
    
          this.api.GetLibDetails('Year',this.yrid,this.budgetid,0).subscribe((res:any[])=>{
            if (res && res.length > 0) {
             this.spinner.show();
  
              this.LibDetailsbasedOnYearID =res.map((item: any, index: number) => ({
              
                ...item,
                sno: index + 1,
              }));
              console.log('LibDetailsbasedOnYearID List:', this.LibDetailsbasedOnYearID);
              this.dataSource3.data = [...this.LibDetailsbasedOnYearID];
              console.log('datasource2 List:', this.LibDetailsbasedOnYearID);

              this.dataSource3.data = this.LibDetailsbasedOnYearID; // Ensure this line executes properly
              this.dataSource3.paginator = this.paginator3;
              this.dataSource3.sort = this.sort3;
              this.spinner.hide();
            } else {
              console.error('No nameText found or incorrect structure:', res);
              this.spinner.hide();
  
            }
          });  
        }

        getSanctionPrepDetails(){
    
          this.api.SanctionPrepDetails(this.budgetid,0).subscribe((res:any[])=>{
            if (res && res.length > 0) {
             this.spinner.show();
  
              this.sanctionPrepDetails =res.map((item: any, index: number) => ({
              
                ...item,
                sno: index + 1,
              }));
              console.log('LibDetailsbasedOnYearID List:', this.sanctionPrepDetails);
              this.dataSource4.data = [...this.sanctionPrepDetails];
              // console.log('datasource4 List:', this.sanctionPrepDetails);

              this.dataSource4.data = this.sanctionPrepDetails; // Ensure this line executes properly
              this.dataSource4.paginator = this.paginator4;
              this.dataSource4.sort = this.sort4;
              this.spinner.hide();
            } else {
              console.error('No nameText found or incorrect structure:', res);
              this.spinner.hide();
  
            }
          });  
        }
        GrossPaidDateWiseDetails2(){
    
          this.api.GrossPaidDateWiseDetails2(this.budgetid,0,0,0,0,this.yrid).subscribe((res:any[])=>{
            if (res && res.length > 0) {
             this.spinner.show();
  
              this.grossPaidDateWiseDetails =res.map((item: any, index: number) => ({
              
                ...item,
                sno: index + 1,
              }));
              console.log('grossPaidDateWiseDetails List:', this.grossPaidDateWiseDetails);
              this.dataSource2.data = [...this.grossPaidDateWiseDetails];
              console.log('datasource2 List:', this.grossPaidDateWiseDetails);

              this.dataSource2.data = this.grossPaidDateWiseDetails; // Ensure this line executes properly
              this.dataSource2.paginator = this.paginator2;
              this.dataSource2.sort = this.sort2;
              this.spinner.hide();
            } else {
              console.error('No nameText found or incorrect structure:', res);
              this.spinner.hide();
  
            }
          });  
        }


  openDialogGrossPaidDateWiseDetails(){
    
    const dialogRef = this.dialog.open(this.grossPaidDateWiseDetailsModal, {
     width: '100%',
     height: '100%',
     maxWidth: '100%',
     panelClass: 'full-screen-dialog', // Optional for additional styling
     data: {
       /* pass any data here */
     },
     // width: '100%',
     // maxWidth: '100%', // Override default maxWidth
     // maxHeight: '100%', // Override default maxHeight
     // panelClass: 'full-screen-dialog' ,// Optional: Custom class for additional styling
     // height: 'auto',
    });
    
    dialogRef.afterClosed().subscribe((result) => {
     console.log('Dialog closed');
    });
    }
  openDialogLiblityDetails(){
    
    const dialogRef = this.dialog.open(this.LibDetailsModal, {
     width: '100%',
     height: '100%',
     maxWidth: '100%',
     panelClass: 'full-screen-dialog', // Optional for additional styling
     data: {
       /* pass any data here */
     },
     // width: '100%',
     // maxWidth: '100%', // Override default maxWidth
     // maxHeight: '100%', // Override default maxHeight
     // panelClass: 'full-screen-dialog' ,// Optional: Custom class for additional styling
     // height: 'auto',
    });
    
    dialogRef.afterClosed().subscribe((result) => {
     console.log('Dialog closed');
    });
    }
  openDialogBudgetDetails(){
    
    const dialogRef = this.dialog.open(this.FundDetailsModal, {
     width: '100%',
     height: '100%',
     maxWidth: '100%',
     panelClass: 'full-screen-dialog', // Optional for additional styling
     data: {
       /* pass any data here */
     },
     // width: '100%',
     // maxWidth: '100%', // Override default maxWidth
     // maxHeight: '100%', // Override default maxHeight
     // panelClass: 'full-screen-dialog' ,// Optional: Custom class for additional styling
     // height: 'auto',
    });
    
    dialogRef.afterClosed().subscribe((result) => {
     console.log('Dialog closed');
    });
    }




    fetchDataBasedOnChartSelectionYrid(  yrid: any, seriesName: string ): void {
      
      console.log(`Selected ID: ${yrid}, Series: ${seriesName}`);
   this.yrid=yrid;
      this.spinner.show();
      this.GetFundReivedBudgetDetails();
      // getTenderDetails?divisionId=D1004&mainSchemeId=0&distid=0&TimeStatus=Live
      // alert(this.TimeStatus);
      // this.api.GETTenderDetails(divisionID,mainSchemeId,distid,this.TimeStatus)
      //   .subscribe(
      //     (res) => {
      //       this.dispatchData = res.map(
      //         (item: TenderDetails, index: number) => ({
      //           ...item,
      //           sno: index + 1,
      //         })
      //       );
      //       console.log('res:', res);
      //       console.log('dispatchData=:', this.dispatchData);
      //       this.dataSource.data = this.dispatchData;
      //       this.dataSource.paginator = this.paginator;
      //       this.dataSource.sort = this.sort;
      //       this.cdr.detectChanges();
      //       this.spinner.hide();
      //     },
      //     (error) => {
      //       console.error('Error fetching data', error);
      //     }
      //   );

      this.openDialogBudgetDetails();
    }
    fetchDataBasedOnChart2SelectionYrid(  yrid: any, seriesName: string ): void {
      
      console.log(`Selected ID: ${yrid}, Series: ${seriesName}`);
   this.yrid=yrid;
      this.spinner.show();
      this.GrossPaidDateWiseDetails();
      // getTenderDetails?divisionId=D1004&mainSchemeId=0&distid=0&TimeStatus=Live
      // alert(this.TimeStatus);
      // this.api.GETTenderDetails(divisionID,mainSchemeId,distid,this.TimeStatus)
      //   .subscribe(
      //     (res) => {
      //       this.dispatchData = res.map(
      //         (item: TenderDetails, index: number) => ({
      //           ...item,
      //           sno: index + 1,
      //         })
      //       );
      //       console.log('res:', res);
      //       console.log('dispatchData=:', this.dispatchData);
      //       this.dataSource.data = this.dispatchData;
      //       this.dataSource.paginator = this.paginator;
      //       this.dataSource.sort = this.sort;
      //       this.cdr.detectChanges();
      //       this.spinner.hide();
      //     },
      //     (error) => {
      //       console.error('Error fetching data', error);
      //     }
      //   );

      this.openDialogGrossPaidDateWiseDetails();
    }
    fetchDataBasedOnchartOptionFundLLibility(yrid: any, seriesName: string ): void {
      
      console.log(`Selected ID: ${yrid}, Series: ${seriesName}`);
   this.yrid=yrid;
      this.spinner.show();
      this.getLibDetails();
      // getTenderDetails?divisionId=D1004&mainSchemeId=0&distid=0&TimeStatus=Live
      // alert(this.TimeStatus);
      // this.api.GETTenderDetails(divisionID,mainSchemeId,distid,this.TimeStatus)
      //   .subscribe(
      //     (res) => {
      //       this.dispatchData = res.map(
      //         (item: TenderDetails, index: number) => ({
      //           ...item,
      //           sno: index + 1,
      //         })
      //       );
      //       console.log('res:', res);
      //       console.log('dispatchData=:', this.dispatchData);
      //       this.dataSource.data = this.dispatchData;
      //       this.dataSource.paginator = this.paginator;
      //       this.dataSource.sort = this.sort;
      //       this.cdr.detectChanges();
      //       this.spinner.hide();
      //     },
      //     (error) => {
      //       console.error('Error fetching data', error);
      //     }
      //   );

      this.openDialogLiblityDetails();
    }
    fetchDataBasedOnaifinyearSelectionYrid(  yrid: any, seriesName: string ): void {
      
        // let filteredData: PODetailsAgainstIndentYr[] = [];
        //       if (seriesName === 'totalpaid') {
        //         // filteredData = res.filter((item) => item.supplier === supplier);
        //       } else if (seriesName === 'poValue') {
        //         // filteredData = res.filter((item) => item.supplier === supplier);
        //       }else{
        //         // filteredData = res.filter((item) => item.supplier === supplier);
        //       }

      console.log(`Selected ID: ${yrid}, Series: ${seriesName}`);
   this.yrid=yrid;
      this.spinner.show();
      this.GrossPaidDateWiseDetails2();
      // getTenderDetails?divisionId=D1004&mainSchemeId=0&distid=0&TimeStatus=Live
      // alert(this.TimeStatus);
      // this.api.GETTenderDetails(divisionID,mainSchemeId,distid,this.TimeStatus)
      //   .subscribe(
      //     (res) => {
      //       this.dispatchData = res.map(
      //         (item: TenderDetails, index: number) => ({
      //           ...item,
      //           sno: index + 1,
      //         })
      //       );
      //       console.log('res:', res);
      //       console.log('dispatchData=:', this.dispatchData);
      //       this.dataSource.data = this.dispatchData;
      //       this.dataSource.paginator = this.paginator;
      //       this.dataSource.sort = this.sort;
      //       this.cdr.detectChanges();
      //       this.spinner.hide();
      //     },
      //     (error) => {
      //       console.error('Error fetching data', error);
      //     }
      //   );

      this.openDialogGrossPaidDateWiseDetails();
    }

}
