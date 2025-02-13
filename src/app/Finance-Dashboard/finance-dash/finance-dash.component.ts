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
import { FundReivedBudgetDetails, FundReivedBudgetID, GrossPaidDateWiseDetails, PODetailsAgainstIndentYr } from 'src/app/Model/FinanceDash';
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
      chartOptions!: ChartOptions; // For bar chart
      chartOptions2!: ChartOptions; // For bar chart
      chartOptions3!: ChartOptions; // For bar chart
      chartOptions4!: ChartOptions; // For bar chart
      chartOptions5!: ChartOptions; // For bar chart
      chartOptionsLine2!: ChartOptions; // For line chart
      chartOptionsLine3!: ChartOptions; // For line chart
      //#endregion
       //#region DataBase Table
       FundReivedBudgetDetails:FundReivedBudgetDetails[]=[]
        dataSource!: MatTableDataSource<FundReivedBudgetDetails>;
        dataSource2!: MatTableDataSource<GrossPaidDateWiseDetails>;
        @ViewChild('paginator') paginator!: MatPaginator;
        @ViewChild('sort') sort!: MatSort;
        @ViewChild('paginator2') paginator2!: MatPaginator;
        @ViewChild('sort2') sort2!: MatSort;
        grossPaidDateWiseDetails:GrossPaidDateWiseDetails[]=[]

        fundReivedBudgetID:FundReivedBudgetID[]=[];
        pODetailsAgainstIndentYr:PODetailsAgainstIndentYr[]=[];
        yrid:any=0;
  selectedSeries: string = '';


@ViewChild('FundDetailsModal') FundDetailsModal: any;
@ViewChild('grossPaidDateWiseDetailsModal') grossPaidDateWiseDetailsModal: any;


constructor(private cdr: ChangeDetectorRef,public api:ApiService,private spinner: NgxSpinnerService,private dialog: MatDialog){
  this.dataSource = new MatTableDataSource<any>([]);
  this.dataSource2 = new MatTableDataSource<any>([]);

  
    this.chartOptions = {
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
            debugger
            const selectedCategory = this.chartOptions?.xaxis?.categories?.[dataPointIndex];
            const selectedSeries = this.chartOptions?.series?.[seriesIndex]?.name;
            // Ensure the selectedCategory and selectedSeries are valid
            if (selectedCategory && selectedSeries) {
              debugger
              const apiData = this.fundReivedBudgetID; // Replace with the actual data source or API response
              // Find the data in your API response that matches the selectedCategory
              const selectedData = apiData.find(
                (data) => data.accyear === selectedCategory
              );
              // console.log("selectedData chart1",selectedData)
              if (selectedData) {
                const id = selectedData.accyrsetid; // Extract the id from the matching entry
debugger
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


    this.chartOptions2 = {
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
            debugger;
            
            const selectedCategory = this.chartOptions?.xaxis?.categories?.[config.dataPointIndex];
        
            const selectedSeries =
              config.seriesIndex === 0 ? 'PO Value' :
              (config.seriesIndex === 1 ? 'Received Value' : 'Total Paid');
        
            this.selectedSeries = selectedSeries;
        
       
        
            // Ensure the selectedCategory and selectedSeries are valid
            if (selectedCategory && selectedSeries) {
              debugger;
              const apiData = this.pODetailsAgainstIndentYr; // Replace with the actual data source or API response
        
              // Find the data in your API response that matches the selectedCategory
              const selectedData = apiData.find(
                (data) => data.accyear === selectedCategory
              );
        
              if (selectedData) {
                const id = selectedData.aifinyear; // Extract the id from the matching entry
                debugger;
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

    this.chartOptions5 = {
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
        text: 'Sanction Prepared',
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

    this.chartOptions4 = {
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
  
  
    this.chartOptionsLine2 = {
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
            debugger
            const selectedCategory = this.chartOptions?.xaxis?.categories?.[dataPointIndex];
            const selectedSeries = this.chartOptions?.series?.[seriesIndex]?.name;
            // Ensure the selectedCategory and selectedSeries are valid
            if (selectedCategory && selectedSeries) {
              debugger
              const apiData = this.fundReivedBudgetID; // Replace with the actual data source or API response
              // Find the data in your API response that matches the selectedCategory
              const selectedData = apiData.find(
                (data) => data.accyear === selectedCategory
              );
              // console.log("selectedData chart1",selectedData)
              if (selectedData) {
                const id = selectedData.accyrsetid; // Extract the id from the matching entry
debugger
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

    this.chartOptions3 = {
      series: [],
      chart: {
        type: 'line',
        stacked: false,
        // height: 'auto',
        // height:400,
        // height: 200,
        // width:500,
      
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
  this.GetFundsDDL()
  this.GetFundReivedBudgetID();
  this.getPaidYearwise_Budget();
  this.getPODetailsAgainstIndentYr();
  this.GetFund_Libilities();
  this.GetPipeline_Libilities();
  this.getSanc_Cheque();
}

getSanc_Cheque(){
  debugger
        this.api.Sanc_Cheque('Sanction',this.budgetid).subscribe((data:any[])=>{
        console.log('fefefeffefe',data);
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

          this.chartOptions5.series = [
          
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
              name: 'sncamtcr',
              data: sncamtcr,
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
              
              

          this.chartOptions5.xaxis = {
            categories: budgetname,
            labels:{
              style:{
                // colors:'#390099',
                fontWeight:'bold',
                fontSize:'15px'
              }
            }
            
  
            
           };
          this.cO = this.chartOptions5;
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
  debugger
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

          this.chartOptions2.series = [
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
              
              

          this.chartOptions2.xaxis = {
            categories: accyear,
            labels:{
              style:{
                // colors:'#390099',
                fontWeight:'bold',
                fontSize:'15px'
              }
            }
            
  
            
           };
          this.cO = this.chartOptions2;
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
  debugger
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

          this.chartOptions4.series = [
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
              
              

          this.chartOptions4.xaxis = {
            categories: name,
            labels:{
              style:{
                // colors:'#390099',
                fontWeight:'bold',
                fontSize:'15px'
              }
            }
            
  
            
           };
          this.cO = this.chartOptions4;
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
  debugger
  this.spinner.show();
  
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

          this.chartOptionsLine2.series = [
            {
              name: 'Received Fund',
              data: recAmt,
              color: '#38b000',
            }
         
        
          
          ];
          this.chartOptionsLine2.xaxis = {
            categories: accyear,
            labels:{
              style:{
                // colors:'#390099',
                fontWeight:'bold',
                fontSize:'15px'
              }
            }
            
  
            
           };
          this.cO = this.chartOptionsLine2;
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
  debugger
  this.spinner.show();
  
    this.api.Fund_Libilities(this.budgetid)
      .subscribe(
        (data: any) => {

          const name: string[] = [];
          const nospo: number[] = [];
          const libility: number[] = [];
         

          data.forEach(
            (item:{
              name: string;
              nospo: number;
              libility: number;
              
            }) => {
              name.push(item.name);
              nospo.push(item.nospo);
              libility.push(item.libility);
              
            }
          );

          // this.chartOptions3.series = [
          //   {
          //     name: 'libvalue',
          //     data: libvalue,
          //     color: '#38b000',
          //   }
         
        
          
          // ];
          this.chartOptions3.series = [
            {
              name: 'libility',
              data: data.map((item: { name: string; nospo: number; libility: number }) => ({
                x: item.name, // X-axis category
                y: item.libility, // Y-axis value
                extra: {
                  nospo: item.nospo, // Store extra properties inside an object
                  libvalue: item.libility,
                },
              })),
              color: '#38b000',
            }
          ];
          


          


          // this.chartOptions3.series = [
          //   {
          //     name: 'libvalue',
          //     data: libvalue,
          //     color: '#38b000',

            
          //   },
           
          // ];

          this.chartOptions3.tooltip = {
            custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
              const dataPoint = w.config.series[seriesIndex].data[dataPointIndex]; // Get full object
          
              console.log("dataPoint=", dataPoint); // Debugging
          
              return `<div class="tooltip-box">
                        <div><strong>nospo:</strong> ${dataPoint.extra.nospo}</div>
                        <div><strong>libvalue:</strong> ${dataPoint.extra.libvalue}</div>
                      </div>`;
            }
          };
          
          
          
      //  this.chartOptions3.xaxis.categories = 
      //  data.map((item: { name: any;nospo:any;libvalue:any}) => item.name); 

     
          // this.chartOptions3.xaxis = {
          //   categories: name,
          //   labels:{
          //     style:{
          //       // colors:'#390099',
          //       fontWeight:'bold',
          //       fontSize:'15px'
          //     }
          //   }
            
  
            
          //  };
          this.cO = this.chartOptions3;
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
      
      
      // RPType=Total&divisionid=0&districtid=0&mainschemeid=0&TimeStatus=0
        this.api.PaidYearwise_Budget(this.budgetid,0)
          .subscribe(
            (data: any) => {
              // this.LiveTenderDivision = data;
              // console.log('API Response total:', this.WoIssuedTotal);
              // console.log('API Response data:', data);
    
              const accyear: string[] = [];
              const noofPO: any[] = [];
              const amountPaid: number[] = [];
    
              data.forEach(
                (item: {
                  accyear: string;
                  noofPO: any;
                  amountPaid: any;
               
                }) => {
                  accyear.push(item.accyear);
                  noofPO.push(item.noofPO);
                  amountPaid.push(item.amountPaid);
                }
              );
    
              this.chartOptions.series = [
                {
                  name: 'No of PO',
                  data: noofPO,
                  color: '#023e8a',

                },
                {
                  name: 'Gross Paid (in Cr)',
                  data: amountPaid,
                  // color: 'rgb(0, 143, 251)',
                  color: '#38b000',
                },
                
              
              ];
              this.chartOptions.xaxis = {
                categories: accyear,
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

GetFundsDDL(){
  
  this.api.getFundsDDL().subscribe((res:any[])=>{
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
    debugger
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
    debugger
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
    debugger
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
        GrossPaidDateWiseDetails2(){
    debugger
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
    debugger
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
    debugger
    dialogRef.afterClosed().subscribe((result) => {
     console.log('Dialog closed');
    });
    }
  openDialogBudgetDetails(){
    debugger
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
    debugger
    dialogRef.afterClosed().subscribe((result) => {
     console.log('Dialog closed');
    });
    }




    fetchDataBasedOnChartSelectionYrid(  yrid: any, seriesName: string ): void {
      debugger
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
      debugger
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
    fetchDataBasedOnaifinyearSelectionYrid(  yrid: any, seriesName: string ): void {
      debugger
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
