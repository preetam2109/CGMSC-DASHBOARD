import { CommonModule, DatePipe, NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexLegend, ApexPlotOptions, ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AEDistrictEngAllotedWorks,AEEngAllotedWorks, SbuEngAllotedWorks, sbuDistrictEngAllotedWorks, WorkDetailsWithEng, ASFile } from 'src/app/Model/DashProgressCount';
import { ApiService } from 'src/app/service/api.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
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
  selector: 'app-engineer-works',
  standalone: true,
  imports: [NgApexchartsModule,MatSortModule, MatPaginatorModule,MatTableModule,MatTableExporterModule, MatInputModule,MatDialogModule,
    MatFormFieldModule,NgbModule, MatMenuModule,CommonModule,NgFor],
  templateUrl: './engineer-works.component.html',
  styleUrl: './engineer-works.component.css'
})
export class EngineerWorksComponent {
  engtype='Sube';
  // engtype=
// divisionid='D1004';
divisionid:any;
distid=0;
  @ViewChild('chart') chart: ChartComponent | undefined;
  public cO: Partial<ChartOptions> | undefined;
  chartOptions!: ChartOptions; // For bar chart
  chartOptions2!: ChartOptions; // For bar chart
  chartOptionsLine!: ChartOptions; // For bar chart
  chartOptionsLine2!: ChartOptions; // For bar chart
  SbuEngAllotedWorks:SbuEngAllotedWorks[]=[];
  AeengAllotedWorks:AEEngAllotedWorks[]=[];
  ASFileData: ASFile[] = [];
  // button
  divisions = [
    { id: 'D1004', name: 'Raipur ', color: ' rgb(0, 227, 150)' },
    { id: 'D1017', name: 'Saruguja ', color: 'rgb(0, 143, 251)' },
    { id: 'D1024', name: 'Bilaspur ', color: '#8f5ced' },
    { id: 'D1001', name: 'Durg ', color: '#f687fa' },
    { id: 'D1031', name: 'Baster ', color: 'rgb(238, 186, 11)' },
  ];
  selectedDivision:any;
  name!: string;
  showw: boolean = true;
  show1: boolean = true;
  visibale: boolean = false;

  // database table
  @ViewChild('itemDetailsModal') itemDetailsModal: any;
  dispatchPendings3:WorkDetailsWithEng[]=[];
  dataSource3!: MatTableDataSource<WorkDetailsWithEng>;
  sbuDistrictEngAllotedWorks:sbuDistrictEngAllotedWorks[]=[];
  dataSource1!: MatTableDataSource<sbuDistrictEngAllotedWorks>;

  AEDistrictEngAllotedWorks: AEDistrictEngAllotedWorks[] = [];
  dataSource!: MatTableDataSource<AEDistrictEngAllotedWorks>;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('paginatorPageSize') paginatorPageSize!: MatPaginator;
  @ViewChild('sort1') sort1!: MatSort;
  @ViewChild('sort2') sort2!: MatSort;
  @ViewChild('paginator1') paginator1!: MatPaginator;
  @ViewChild('sort') sort!: MatSort;
  

constructor(public api: ApiService, public spinner: NgxSpinnerService,private cdr: ChangeDetectorRef, private fb: FormBuilder,
  public datePipe: DatePipe,private dialog: MatDialog, private toastr: ToastrService,){
    this.dataSource = new MatTableDataSource<AEDistrictEngAllotedWorks>([]);
    this.dataSource1 = new MatTableDataSource<sbuDistrictEngAllotedWorks>([]);
    this.dataSource3 = new MatTableDataSource<WorkDetailsWithEng>([]);
 

  }


  ngOnInit() {
    // Initialize dateRange with today and tomorrow
    
    this.initializeChartOptions();
    this.GetAEENGEngAllotedWorks();
    this.getSBUENEngAllotedWorks();
   this.fetchDataBasedOnChartAE();
   this.fetchDataBasedOnChartSbu();


    // this.getSBUENEngAllotedWorks();
    // this.GetAEENGEngAllotedWorks();
    // this.fetchDataBasedOnChartAE();
    // this.fetchDataBasedOnChartSbu();

   
  }
  initializeChartOptions() {
    this.chartOptionsLine = {
      series: [],
      chart: {
        type: 'bar',
        stacked: true,
        // height: 'auto',
        // height: '1500',
        events: {
          dataPointSelection: (
            event,
            chartContext,
            { dataPointIndex, seriesIndex }
          ) => {
            const selectedCategory = this.chartOptionsLine?.xaxis?.categories?.[dataPointIndex];  // This is likely just the category name (a string)
            const selectedSeries = this.chartOptionsLine?.series?.[seriesIndex]?.name;
            // Ensure the selectedCategory and selectedSeries are valid
            if (selectedCategory && selectedSeries) {
              const apiData = this.SbuEngAllotedWorks; 
              // console.log("apiData",apiData)
              const selectedData = apiData.find((data) => data.engName === selectedCategory);
              // console.log("selectedData chart1",selectedData)
              if (selectedData) {
                const empid = selectedData.empid; 
                const empname=selectedData.engName; // Extract the id from the matching entry
                this.fetchDataBasedWorkDetailsWithEng(empid, selectedSeries,empname);
  
              } else {
                console.log(`No data found for selected category: ${selectedCategory}`);
              }
            } else {
              console.log('Selected category or series is invalid.');
            }
          }
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
          colors: ['#000']
        }
      },
      stroke: {
        width: 1,
        // colors: ['#000'],
        colors: ['#fff'],
      },
      title: {
        text: 'Sub Engineer',
        align: 'center',
        style: {
          fontSize: '12px',
          // color: '#000'
          color: '#6e0d25'
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
        type: 'bar',
        stacked: true,
        // height: 'auto',
        // height: '1500',
        events: {
          dataPointSelection: (
            event,
            chartContext,
            { dataPointIndex, seriesIndex }
          ) => {
            const selectedCategory = this.chartOptionsLine2?.xaxis?.categories?.[dataPointIndex];  // This is likely just the category name (a string)
            const selectedSeries = this.chartOptionsLine2?.series?.[seriesIndex]?.name;
            // Ensure the selectedCategory and selectedSeries are valid
            if (selectedCategory && selectedSeries) {
              const apiData = this.AeengAllotedWorks;  // Replace with the actual data source or API response
              // Find the data in your API response that matches the selectedCategory
              const selectedData = apiData.find((data) => data.engName === selectedCategory);
              // console.log("selectedData chart1",selectedData)
              if (selectedData) {
                const empid = selectedData.empid;  // Extract the id from the matching entry
                const engName = selectedData.engName;  // Extract the id from the matching entry

                this.fetchDataBasedWorkDetailsWithEngAE(empid, selectedSeries,engName);
  
              } else {
                console.log(`No data found for selected category: ${selectedCategory}`);
              }
            } else {
              console.log('Selected category or series is invalid.');
            }
          }
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
          colors: ['#000']
        }
      },
      stroke: {
        width: 1,
        // colors: ['#000'],
        colors: ['#fff'],
      },
      title: {
        text: 'Assistant Engineer',
        align: 'center',
        style: {
          fontSize: '12px',
          // color: '#000'
          color: '#6e0d25'
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
   
  }

  

  ngAfterViewInit() {
    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort1;
    this.dataSource1.paginator = this.paginatorPageSize;
    this.dataSource1.sort = this.sort2;
    this.dataSource3.paginator = this.paginator1;
    this.dataSource3.sort = this.sort;
  }

getSBUENEngAllotedWorks(): void {
  var roleName = localStorage.getItem('roleName');
  if (roleName == 'Division') {
    this.chartOptionsLine.chart.height = '600px';
    this.showw=false;
    this.divisionid = sessionStorage.getItem('divisionID');} 
    else {
      if(this.name!= undefined){
        this.chartOptionsLine.chart.height = '2000';
       }else{
        this.chartOptionsLine.chart.height ='4000';
       }
       this.divisionid=0;
       this.showw=true;
      }
     this.spinner.show();
  this.api.SbuEngAllotedWorks('Sbu eng',this.divisionid,this.distid).subscribe(
    (data: any) => {
                this.SbuEngAllotedWorks = data;
      console.log('SbuEngAllotedWorks',this.SbuEngAllotedWorks);
     

      const id: string[] = [];
      const empid: string[] = [];
      const engName: string[] = [];
      const name: any[] = [];
      const totalWorks: number[] = [];
      const tvcValuecr: number[] = [];
      const woIssue: any[] = [];
      const running: any[] = [];
      const ladissue: any[] = [];
      data.forEach((item: {
        engName: string; id: any; totalWorks: any; districtID: any;
        empid: any;name:any;tvcValuecr:any;woIssue:any;running:any;ladissue:any;
      }) => {
        id.push(item.id);
        engName.push(item.engName);
        totalWorks.push(item.totalWorks);
        tvcValuecr.push(item.tvcValuecr);
        empid.push(item.empid);
        name.push(item.name);
        woIssue.push(item.woIssue);
        running.push(item.running);
        ladissue.push(item.ladissue);
      });
      
      this.chartOptionsLine.series = [
        {name: 'Total Alloted Works', data: totalWorks,color:'#eeba0b'} ,
        { name: 'Contract Value (in Cr)',data: tvcValuecr, color: 'rgb(0, 143, 251)'  },
        { name: 'Running Works', data: running,color:'rgb(0, 227, 150)' }, 
        { name: 'Work Order Issued',data: woIssue,color: '#8f5ced'},
        { name: 'Land Issue Works',data: ladissue,color:'#f687fa' },
      ];

      this.chartOptionsLine.xaxis = { categories: engName };
      this.cO = this.chartOptionsLine;
      this.cdr.detectChanges();

      this.spinner.hide();

    },
    (error: any) => {
      console.error('Error fetching data', error);
    }
  );
}
GetAEENGEngAllotedWorks(): void {
  var roleName = localStorage.getItem('roleName');
  if (roleName == 'Division') {
    this.chartOptionsLine2.chart.height = '600px';
    this.showw=false;
    this.divisionid = sessionStorage.getItem('divisionID');} else {  
      this.showw=true;
      this.divisionid=0;
      if(this.name!= undefined){
        this.chartOptionsLine2.chart.height = '600px';
       }else{
        this.chartOptionsLine2.chart.height ='1500';
       } }
       
     
  this.spinner.show();
  this.api.AEEngAllotedWorks('AE',this.divisionid,this.distid).subscribe(
    (data: any) => {
                this.AeengAllotedWorks = data;
      console.log('AeengAllotedWorks',this.AeengAllotedWorks);
      const id: string[] = [];
      const empid: string[] = [];
      const engName: string[] = [];
      const name: any[] = [];
      const totalWorks: number[] = [];
      const tvcValuecr: number[] = [];
      const woIssue: any[] = [];
      const running: any[] = [];
      const ladissue: any[] = [];
      // console.log('API Response total:', data);
      data.forEach((item: {
        engName: string; id: any; totalWorks: any; districtID: any;
        empid: any;name:any;tvcValuecr:any;woIssue:any;running:any;ladissue:any;
      }) => {
        id.push(item.id);
        engName.push(item.engName);
        totalWorks.push(item.totalWorks);
        tvcValuecr.push(item.tvcValuecr);
        empid.push(item.empid);
        name.push(item.name);
        woIssue.push(item.woIssue);
        running.push(item.running);
        ladissue.push(item.ladissue);
      });
      
      this.chartOptionsLine2.series = [
        // {name: 'Total Works', data: totalWorks,color:'#eeba0b'} ,
        // { name: 'Running', data: running}, 
        // { name: 'TVC Value cr',data: tvcValuecr, color: 'rgb(0, 143, 251)'  },
        // { name: 'Lad Issue',data: ladissue },
        // { name: 'WoIssue',data: woIssue,color: '#db0413'},
        {name: 'Total Alloted Works', data: totalWorks,color:'#eeba0b'} ,
        { name: 'Contract Value (in Cr)',data: tvcValuecr, color: 'rgb(0, 143, 251)'  },
        { name: 'Running Works', data: running,color:'rgb(0, 227, 150)' }, 
        { name: 'Work Order Issued',data: woIssue,color: '#8f5ced'},
        { name: 'Land Issue Works',data: ladissue,color:'#f687fa' },
      ];

      this.chartOptionsLine2.xaxis = { categories: engName };
      this.cO = this.chartOptionsLine2;
      this.cdr.detectChanges();

      this.spinner.hide();

    },
    (error: any) => {
      console.error('Error fetching data', error);
    }
  );
}
fetchDataBasedOnChartSbu(): void {
  var roleName = localStorage.getItem('roleName');
  if (roleName == 'Division') {
    this.divisionid = sessionStorage.getItem('divisionID');} else {this.divisionid=0;this.showw=true;}
  const  distid=0;
  this.spinner.show();
  this.api.SubeDistrictEngAllotedWorks('Sube', this.divisionid,distid).subscribe(
    (res) => {
     this.sbuDistrictEngAllotedWorks = res.map((item: sbuDistrictEngAllotedWorks, index: number) => ({
        ...item,
        sno: index + 1
      }));
      this.dataSource1.data = this.sbuDistrictEngAllotedWorks
      this.dataSource1.paginator = this.paginatorPageSize;
      this.dataSource1.sort = this.sort2;
      this.cdr.detectChanges();
      this.spinner.hide();
    },
    (error) => {
      console.error('Error fetching data', error);
    }
  );
}
fetchDataBasedOnChartAE(): void {
  var roleName = localStorage.getItem('roleName');
  if (roleName == 'Division') {
    this.divisionid = sessionStorage.getItem('divisionID');} else {this.divisionid=0;this.showw=true;}
  const  distid=0;
  this.spinner.show();
  // AE&divisionid=D1004&distid=0
  this.api.AEDistrictEngAllotedWorks('AE', this.divisionid,distid).subscribe(
    (res) => {
      this.AEDistrictEngAllotedWorks = res.map((item: AEDistrictEngAllotedWorks, index: number) => ({
        ...item,
        sno: index + 1
      }));
      this.dataSource.data = this.AEDistrictEngAllotedWorks;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort1;
      this.cdr.detectChanges();
      this.spinner.hide();
    },
    (error) => {
      console.error('Error fetching data', error);
    }
  );
}

distidd:any;empname:any;
fetchDataBasedWorkDetailsWithEng(empcode:any, selectedSeries:any,empname:any): void {
  this.empname=empname;
  // var roleName = localStorage.getItem('roleName');
  // if (roleName == 'Division') {
  //   this.divisionid = sessionStorage.getItem('divisionID'); } else {this.divisionid=0;this.show=true;}
    // this.distidd = sessionStorage.getItem('himisDistrictid')==0?0:this.distidd;
    // this.divisionid = this.divisionid == 0 ? 0 : this.divisionid;
  const  distid=0;
  this.divisionid = 0;
  this.spinner.show();
  // dahid:any,divisionId:any,mainSchemeId:any,distid:any,engtype:any,empcode:any
  // dahid=0&divisionId=D1004&mainSchemeId=0&distid=0&engtype=SubE&empcode=Empcode0000157
  const engtype='SubE', dahid=0, mainSchemeId=0;
  this.api.GetWorkDetailsWithEng(dahid,this.divisionid,mainSchemeId,distid,engtype,empcode).subscribe(
    (res) => {
      this.dispatchPendings3 = res.map((item: WorkDetailsWithEng, index: number) => ({
        ...item,
        sno: index + 1
      }));
      this.dataSource3.data = this.dispatchPendings3;
        console.log(" this.dataSource3.data= ",JSON.stringify( this.dataSource3.data))
      this.dataSource3.paginator = this.paginator1;
      this.dataSource3.sort = this.sort;
      this.cdr.detectChanges();
      // this.modalService.open(this.itemDetailsModal, { centered: true,backdrop:false, });
      this.spinner.hide();
    },
    (error) => {
      console.error('Error fetching data', error);
    }
  );
  this.openDialog();

}
fetchDataBasedWorkDetailsWithEngAE(empcode:any, selectedSeries:any,empname:any): void {

  this.empname=empname;
  // var roleName = localStorage.getItem('roleName');
  // if (roleName == 'Division') {
  //   this.divisionid = sessionStorage.getItem('divisionID'); } else {this.divisionid=0;this.show=true;}
    // this.distidd = sessionStorage.getItem('himisDistrictid')==0?0:this.distidd;
    // this.divisionid = this.divisionid == 0 ? 0 : this.divisionid;
  const  distid=0;
  this.divisionid = 0;
  this.spinner.show();
  // dahid:any,divisionId:any,mainSchemeId:any,distid:any,engtype:any,empcode:any
  // dahid=0&divisionId=D1004&mainSchemeId=0&distid=0&engtype=SubE&empcode=Empcode0000157
  const engtype='AE', dahid=0,mainSchemeId=0;
  this.api.GetWorkDetailsWithEng(dahid,this.divisionid,mainSchemeId,distid,engtype,empcode).subscribe(
    (res) => {
      this.dispatchPendings3 = res.map((item: WorkDetailsWithEng, index: number) => ({
        ...item,
        sno: index + 1
      }));
      this.dataSource3.data = this.dispatchPendings3;
        console.log(" this.dataSource4= ",JSON.stringify( this.dataSource3.data))
      this.dataSource3.paginator = this.paginator1;
      this.dataSource3.sort = this.sort;
      this.cdr.detectChanges();
      // this.modalService.open(this.itemDetailsModal, { centered: true,backdrop:false, });
      this.spinner.hide();
    },
    (error) => {
      console.error('Error fetching data', error);
    }
  );
  this.openDialog();

}

applyTextFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
SapplyTextFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource1.filter = filterValue.trim().toLowerCase();
  if (this.dataSource1.paginator) {
    this.dataSource1.paginator.firstPage();
  }
}
subAEapplyTextFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource3.filter = filterValue.trim().toLowerCase();
  if (this.dataSource3.paginator) {
    this.dataSource3.paginator.firstPage();
  }
}

exportToPDF() {
  const doc = new jsPDF('l', 'mm', 'a4');
  const columns = [

    { title: "S.No", dataKey: "sno" },
    { title: "engName", dataKey: "engName" },
    { title: "empid", dataKey: "empid" },
    { title: "districtName", dataKey: "districtName" },
    { title: "totalWorks", dataKey: "totalWorks" },
    { title: "tvcValuecr", dataKey: "tvcValuecr" },
    { title: "running", dataKey: "running" },
    { title: "woIssue", dataKey: "woIssue" },
    { title: "ladissue", dataKey: "ladissue" },
    { title: "districtID", dataKey: "districtID" },
    { title: "id", dataKey: "id" }
  ];
  const rows = this.AEDistrictEngAllotedWorks.map(row => ({
    sno: row.sno,
    engName: row.engName,
    empid: row.empid,
    districtName: row.districtName,
    totalWorks: row.totalWorks,
    tvcValuecr: row.tvcValuecr,
    running: row.running,
    woIssue: row.woIssue,
    ladissue: row.ladissue,
    districtID: row.districtID,
    id: row.id,
  }));

  autoTable(doc, {
    columns: columns,
    body: rows,
    startY: 20,
    theme: 'striped',
    headStyles: { fillColor: [22, 160, 133] }
  });

  doc.save('DistrictEngAllotedWorks.pdf');
}
SexportToPDF() {
  const doc = new jsPDF('l', 'mm', 'a4');
  const columns = [

    { title: "S.No", dataKey: "sno" },
    { title: "engName", dataKey: "engName" },
    { title: "empid", dataKey: "empid" },
    { title: "districtName", dataKey: "districtName" },
    { title: "totalWorks", dataKey: "totalWorks" },
    { title: "tvcValuecr", dataKey: "tvcValuecr" },
    { title: "running", dataKey: "running" },
    { title: "woIssue", dataKey: "woIssue" },
    { title: "ladissue", dataKey: "ladissue" },
    { title: "districtID", dataKey: "districtID" },
    { title: "id", dataKey: "id" }
  ];
  const rows = this.sbuDistrictEngAllotedWorks.map(row => ({
    sno: row.sno,
    engName: row.engName,
    empid: row.empid,
    districtName: row.districtName,
    totalWorks: row.totalWorks,
    tvcValuecr: row.tvcValuecr,
    running: row.running,
    woIssue: row.woIssue,
    ladissue: row.ladissue,
    districtID: row.districtID,
    id: row.id,
  }));

  autoTable(doc, {
    columns: columns,
    body: rows,
    startY: 20,
    theme: 'striped',
    headStyles: { fillColor: [22, 160, 133] }
  });

  doc.save('SbuDistrictEngAllotedWorks.pdf');
}
subAEexportToPDF() {
  const doc = new jsPDF('l', 'mm', 'a4');
  const columns = [
    // 'sno','letterNo', 'head','aaDate','totalAmountOfContract','district','work','aaamt','tsamt','work_id',
    { title: "S.No", dataKey: "sno" },
    { title: "letterNo", dataKey: "letterNo" },
    { title: "head", dataKey: "head" },
    { title: "aaDate", dataKey: "aaDate" },
    { title: "totalAmountOfContract", dataKey: "totalAmountOfContract" },
    { title: "district", dataKey: "district" },
    { title: "work", dataKey: "work" },
    { title: "aaamt", dataKey: "aaamt" },
    { title: "tsamt", dataKey: "tsamt" },
    { title: "work_id", dataKey: "work_id" },
    // { title: "id", dataKey: "id" }
  ];
  const rows = this.dispatchPendings3.map(row => ({
    sno: row.sno,
    letterNo: row.letterNo,
    head: row.head,
    aaDate: row.aaDate,
    totalAmountOfContract: row.totalAmountOfContract,
    district: row.district,
    work: row.work,
    aaamt: row.aaamt,
    tsamt: row.tsamt,
    work_id: row.work_id,
    // id: row.id,
  }));

  autoTable(doc, {
    columns: columns,
    body: rows,
    startY: 20,
    theme: 'striped',
    headStyles: { fillColor: [22, 160, 133] }
  });

  doc.save('WorkDetailsWithEng.pdf');
}
  // mat-dialog box
  openDialog() {
    const dialogRef = this.dialog.open(this.itemDetailsModal, {
      width: '100%',
      height: '100%',
      maxWidth: '100%',
      panelClass: 'full-screen-dialog', // Optional for additional styling
      data: { /* pass any data here */ }
      // width: '100%',
      // maxWidth: '100%', // Override default maxWidth
      // maxHeight: '100%', // Override default maxHeight
      // panelClass: 'full-screen-dialog' ,// Optional: Custom class for additional styling
      // height: 'auto',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
    });

  }
selectDivision(division: { id: string, name: string }): void {
  // this.chartOptionsLine.chart.height ='2000';
  this.selectedDivision = division.id;
  this.divisionid = division.id;
  this.name = division.name;
  this.visibale=true;
  this.showw=true
  this.GetAEENGEngAllotedWorks();
  this.getSBUENEngAllotedWorks();
 this.fetchDataBasedOnChartAE();
 this.fetchDataBasedOnChartSbu();

  //  var roleName = localStorage.getItem('roleName');
  //               if (roleName == 'Division'||name!=this.name) {
  //                 this.chartOptionsLine2.chart.height = '500px';
    
  //                 // this.showDivision=false;
  //               } else {
  //                  this.chartOptionsLine2.chart.height ='1500';
  //                  this.GetAEENGEngAllotedWorks();
  //                  this.getSBUENEngAllotedWorks();
  //               }
}

onButtonClick2(ASID: any, workid: any): void {
  //  this.value='Active';
  // window.open('https://cgmsc.gov.in/himisr/Upload/W3900002AS2.pdf', '_blank');
  // alert(ASID);
  // alert(this.value);
  // return;
  // asLetterName
  // filename
  this.spinner.show();
  this.api.GETASFile(ASID, workid).subscribe(
    (res) => {
      // this.ASFileData=res;
      const filename = res[0]?.filename; // Ensure `res[0]` exists
      const URL = res[0]?.asLetterName;

      if (filename) {
        window.open(URL, '_blank');
      } else {
        alert(
          '⚠️ Alert: AS Letter Not Found!\n\nThe requested document is missing.\nPlease try again later or contact support.'
        );
        // alert("⚠️ Alert: AS Letter Not Found!\n\nThe requested document (AS Letter) is not available at this moment.\nPlease check again later or contact support for further assistance.");
      }
      //  const URL =this.ASFileData[0].asLetterName;
      // window.open('https://cgmsc.gov.in/himisr/Upload/W3900002AS2.pdf', '_blank');

      // console.log('res:', res);
      console.log('ASFileData:', this.ASFileData);
      this.spinner.hide();
    },
    (error) => {
      this.spinner.hide();
      alert(`Error fetching data: ${error.message}`);
    }
  );
}

}

