import { BreakpointObserver,  } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

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
import { DirectorateAIDetails } from 'src/app/Model/DirectorateAIDetails';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableExporterModule } from 'mat-table-exporter';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GroupWiseAI_PODetails } from 'src/app/Model/GroupWiseAI_PODetails';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';



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
  selector: 'app-directorate-aidetails',
  standalone: true,
  
  imports: [MatSelectModule,MatInputModule,MatFormFieldModule,FormsModule,MatButtonModule,MatMenuModule, MatTableExporterModule,MatPaginatorModule, MatTableModule,NgApexchartsModule],
  templateUrl: './directorate-aidetails.component.html',
  styleUrl: './directorate-aidetails.component.css'
})

export class DirectorateAIDetailsComponent {
  @ViewChild('chart') chart: ChartComponent | undefined;
  public cO: Partial<ChartOptions> | undefined;
  chartOptions: ChartOptions;
  groupidMap: { [key: string]: number } = {};
  groupid:any=0;


  dataSource!: MatTableDataSource<DirectorateAIDetails>;
  dispatchPendings: DirectorateAIDetails[] = [];
  selectedTabIndex: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  hodid: any;
  pogiven:any=0;

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
        type: 'bar',
        stacked: true,
        height: 900,
        events: {
          dataPointSelection: (event, chartContext, config) => {
            const dataPointIndex = config.dataPointIndex;
            const seriesIndex = config.seriesIndex;
    
            const selectedCategory = this.chartOptions?.xaxis?.categories?.[dataPointIndex];
            const selectedSeries = this.chartOptions?.series?.[seriesIndex]?.name;
    
            if (selectedCategory && selectedSeries) {
              const groupid = this.groupidMap[selectedCategory]; // Get group ID using category name
              if (groupid) {
                console.log(`Fetching data for Group ID: ${groupid}, Series: ${selectedSeries}`);
                this.fetchDataBasedOnChartSelection(groupid, selectedSeries); // Call your method
              } else {
                console.warn('Group ID not found for selected category:', selectedCategory);
              }
            } else {
              console.warn('Invalid selection:', { selectedCategory, selectedSeries });
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
        min: 0,
        max: 100,
        title: {
          text: undefined,
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ['#FF0000'],
        },
      },
      stroke: {
        width: 1,
        colors: ['#fff'],
      },
      title: {
        text: 'Drugs GroupWise Indent vs Orders Current Financial Year',
        align: 'center',
        style: {
          fontSize: '12px',
          color: '#6e0d25',
        },
      },
      tooltip: {
        y: {
          formatter: (val: any) => val.toString(),
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
    
    this.loadData();
    this.dataSource = new MatTableDataSource<DirectorateAIDetails>([]);

  }

  ngOnInit(){
    
    this.spinner.show();
    // this.getAllDispatchPending();
    setTimeout(() => this.loadData(), 10000);
    // this.loadData()
  }
  getAllDispatchPending() {
    
    this.spinner.show();
    this.api.DirectorateAIDetails(0,1,367,0,0,this.pogiven).subscribe(
      (res) => {

        this.dispatchPendings = res.map((item:DirectorateAIDetails,index:number) => ({
          ...item,
          sno: index + 1
        }));
        this.dataSource.data = this.dispatchPendings;
        // console.log('Data with serial numbers:', this.dispatchPendings); 
        // console.log("Welcome ",JSON.stringify(res))
        // this.dispatchPendings = res;
        // console.log("Welcome ",JSON.stringify(this.dispatchPendings))
        // this.dataSource.data = res;
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
  showAllData(){
    this.spinner.show();
    this.api.DirectorateAIDetails(0,1,367,0,0,0).subscribe(
      (res) => {

        this.dispatchPendings = res.map((item:DirectorateAIDetails,index:number) => ({
          ...item,
          sno: index + 1
        }));
        this.dataSource.data = this.dispatchPendings;
        // console.log('Data with serial numbers:', this.dispatchPendings); 
        // console.log("Welcome ",JSON.stringify(res))
        // this.dispatchPendings = res;
        // console.log("Welcome ",JSON.stringify(this.dispatchPendings))
        // this.dataSource.data = res;
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
  showAllDataGreaterthan15days(){
    this.spinner.show();
    this.api.DirectorateAIDetails(0,1,0,0,0,0).subscribe(
      (res) => {

        this.dispatchPendings = res.map((item:DirectorateAIDetails,index:number) => ({
          ...item,
          sno: index + 1
        }));
        this.dataSource.data = this.dispatchPendings;
        // console.log('Data with serial numbers:', this.dispatchPendings); 
        // console.log("Welcome ",JSON.stringify(res))
        // this.dispatchPendings = res;
        // console.log("Welcome ",JSON.stringify(this.dispatchPendings))
        // this.dataSource.data = res;
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
  showAllData7to15days(){
    this.spinner.show();
    this.api.DirectorateAIDetails(0,1,0,0,0,0).subscribe(
      (res) => {

        this.dispatchPendings = res.map((item:DirectorateAIDetails,index:number) => ({
          ...item,
          sno: index + 1
        }));
        this.dataSource.data = this.dispatchPendings;
        // console.log('Data with serial numbers:', this.dispatchPendings); 
        // console.log("Welcome ",JSON.stringify(res))
        // this.dispatchPendings = res;
        // console.log("Welcome ",JSON.stringify(this.dispatchPendings))
        // this.dataSource.data = res;
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
  showAllData7days(){
    this.spinner.show();
    this.api.DirectorateAIDetails(0,1,0,0,0,0).subscribe(
      (res) => {

        this.dispatchPendings = res.map((item:DirectorateAIDetails,index:number) => ({
          ...item,
          sno: index + 1
        }));
        this.dataSource.data = this.dispatchPendings;
        // console.log('Data with serial numbers:', this.dispatchPendings); 
        // console.log("Welcome ",JSON.stringify(res))
        // this.dispatchPendings = res;
        // console.log("Welcome ",JSON.stringify(this.dispatchPendings))
        // this.dataSource.data = res;
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

  loadData(): void {
    
    this.spinner.show();
    if(localStorage.getItem('roleName')=='CME'){
       this.hodid=364
    }else if(localStorage.getItem('roleName')=='DHS'){
      this.hodid=367
    }else{
      this.hodid=0

    }
    // this.api.GroupWiseAI_PODetails(0,1,367).subscribe(
    this.api.GroupWiseAI_PODetails(0,1,this.hodid).subscribe(
      (data: GroupWiseAI_PODetails[]) => {
        const groupid: number[] = [];
        const groupname: string[] = [];
        const nosindent: number[] = [];
        const pogiven: number[] = [];
        const povalue: number[] = [];
        // const itemsreceived: number[] = [];
        // const rvalue: number[] = [];
        this.groupidMap = {}; // Initialize the mmidMap

        console.log('API Response:', data);


        data.forEach((item:any)=> {
           
         
          groupname.push(item.groupname);
          nosindent.push(item.nosindent);
          pogiven.push(item.pogiven);
          povalue.push(item.povalue);
          groupid.push(item.groupid);
          // itemsreceived.push(item.s);
          // rvalue.push(item.rvalue);


          // Map groupname to groupid
  if (item.groupname && item.groupid) {
    this.groupidMap[item.groupname] = item.groupid; // Use groupname as the key
  } else {
    console.warn('Missing groupid for groupname:', item.groupname);
  }
});

console.log('groupidMap:', this.groupidMap); 


        this.chartOptions.series = [

          { 
          name: 'No of Items',
          data: nosindent, 
          // color:'#eeba0b'
          }
           ,
          { 
            name: 'PO Items', 
            data: pogiven 
          },

          { 
            name: 'PO Value(in Cr)', 
            data: povalue, 
            // color:'#00b4d8'
          },

        ];



            // // Add `totalSample` to tooltip manually
            // this.chartOptions.tooltip = {
            //   shared: true,
            //   custom: ({ series, seriesIndex, dataPointIndex, w }) => {
            //     const nosindent = series[0][dataPointIndex]; // QC Time Taken
            //     const pogiven = series[1][dataPointIndex]; // QC Time Taken
            //     const povalue = series[2][dataPointIndex]; // Use the hidden totalSample array
            
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
            //         <span style="color: #00008B; font-weight: bold;">No of Items:</span> ${nosindent}<br>
            //         <span style="color:rgb(250, 18, 6); font-weight: bold;">Order Value(in Cr):</span> ${pogiven}<br>
            //         <span style="color: #008B8B; font-weight: bold;">Received Value (in Cr):</span> ${povalue}
            //       </div>
            //     </div>`;
            // },
            // };
            
            
            
            




        this.chartOptions.xaxis = {categories: groupname};
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
    
    debugger
    console.log(`Selected WHID: ${whid}, Series: ${seriesName}`);
    this.groupid=whid
    // Add your logic to fetch data based on selected warehouse (whid)
    this.spinner.show();
    if(seriesName==='PO Items'){
      this.pogiven=1;
    }else{
      this.pogiven=0;
    }
    this.api.DirectorateAIDetails(0,1,0,this.groupid,0,this.pogiven).subscribe(
      (res) => {

          this.dispatchPendings = res.map((item:DirectorateAIDetails,index:number) => ({
          ...item,
          sno: index + 1
        }));
        this.dataSource.data = this.dispatchPendings;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.cdr.detectChanges();
        this.spinner.hide();
      },
      (error) => {
        console.error('Error fetching data', error);
        this.spinner.hide();
      }
    );
  }

  exportToPDF() {
    const doc = new jsPDF('l', 'mm', 'a4');
    const columns = [
      { title: "S.No", dataKey: "sno" },
      { title: "Code", dataKey: "itemcode" },
      { title: "Item", dataKey: "itemname" },
      { title: "Strength", dataKey: "strength1" },
      { title: "Unit", dataKey: "unit" },
      { title: "AI", dataKey: "dhsai" },
      { title: "PO QTY", dataKey: "poqty" },
      { title: "Rec QTY", dataKey: "rqty" },
      { title: "PO Value(in Cr)", dataKey: "povalue" },
      { title: "Rec Value(in Cr)", dataKey: "rvalue" },
      { title: "Rec %", dataKey: "rPercentage" },
      { title: "Type", dataKey: "itemtypename" },
      { title: "Group", dataKey: "groupname" },
      { title: "Edl Type", dataKey: "edltype" },
    ];
    const rows = this.dispatchPendings.map(row => ({
      sno: row.sno,
      itemcode: row.itemcode,
      itemname: row.itemname,
      strength1: row.strength1,
      unit: row.unit,
      dhsai: row.dhsai,
      poqty: row.poqty,
      rqty: row.rqty,
      povalue: row.povalue,
      rvalue: row.rvalue,
      rPercentage: row.rPercentage,
      itemtypename: row.itemtypename,
      groupname: row.groupname,
      edltype: row.edltype,
    }));

    autoTable(doc, {
      columns: columns,
      body: rows,
      startY: 20,
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] }
    });

    doc.save('DHSindentDetails.pdf');
  }
  selectedTabValue(event: any): void {
    this.selectedTabIndex = event.index;
  }
}
