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
import { AEDistrictEngAllotedWorks,AEEngAllotedWorks, SbuEngAllotedWorks, sbuDistrictEngAllotedWorks, WorkDetailsWithEng } from 'src/app/Model/DashProgressCount';
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
  whidMap: { [key: string]: number } = {};
  // button
  divisions = [
    { id: 'D1004', name: 'Raipur ', color: ' rgb(0, 227, 150)' },
    { id: 'D1017', name: 'Saruguja ', color: 'rgb(0, 143, 251)' },
    { id: 'D1024', name: 'Bilaspur ', color: 'rgb(255, 69, 96)' },
    { id: 'D1001', name: 'Durg ', color: '#f687fa' },
    { id: 'D1031', name: 'Baster ', color: 'rgb(238, 186, 11)' },
  ];
  selectedDivision:any;
  name!: string;
  show: boolean = true;
  visibale: boolean = false;

  // database table
  @ViewChild('itemDetailsModal') itemDetailsModal: any;
  dispatchPendings3:WorkDetailsWithEng[]=[];
  dataSource3!: MatTableDataSource<WorkDetailsWithEng>;
  dispatchPendings1:sbuDistrictEngAllotedWorks[]=[];
  dataSource1!: MatTableDataSource<sbuDistrictEngAllotedWorks>;
  dispatchPendings: AEDistrictEngAllotedWorks[] = [];
  dataSource!: MatTableDataSource<AEDistrictEngAllotedWorks>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
constructor(public api: ApiService, public spinner: NgxSpinnerService,private cdr: ChangeDetectorRef, private fb: FormBuilder,
  public datePipe: DatePipe, private modalService: NgbModal,private dialog: MatDialog, private toastr: ToastrService,){
    this.dataSource = new MatTableDataSource<AEDistrictEngAllotedWorks>([]);
    this.dataSource1 = new MatTableDataSource<sbuDistrictEngAllotedWorks>([]);
    this.dataSource3 = new MatTableDataSource<WorkDetailsWithEng>([]);
    // this.dataSource.paginator = this.paginator;


  }


  ngOnInit() {
    // Initialize dateRange with today and tomorrow
    this.initializeChartOptions();
    this.getSBUENEngAllotedWorks();
    this.GetAEENGEngAllotedWorks();
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
              console.log("apiData",apiData)
              const selectedData = apiData.find((data) => data.engName === selectedCategory);
              console.log("selectedData chart1",selectedData)
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
        text: 'Allotted Works Sub Engineer',
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
        text: 'Allotted Works Assistant Engineer',
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
    this.fetchDataBasedOnChartSelection();
    this.fetchDataBasedOnChartSelectionSbu();
  }

  ngAfterViewInit() {
      this.dataSource1.paginator=this.paginator;

      this.dataSource.paginator = this.paginator;
  }
getSBUENEngAllotedWorks(): void {
  var roleName = localStorage.getItem('roleName');
  if (roleName == 'Division') {
    this.chartOptionsLine.chart.height = '600px';
    this.show=false;
    this.divisionid = sessionStorage.getItem('divisionID');} 
    else {
      if(this.name!= undefined){
        this.chartOptionsLine.chart.height = '600px';
       }else{
        this.chartOptionsLine.chart.height ='1500';
       } this.show=true;}
     this.spinner.show();
  this.api.SbuEngAllotedWorks('Sbu eng',this.divisionid,this.distid).subscribe(
    (data: any) => {
                this.SbuEngAllotedWorks = data;
      // console.log('SbuEngAllotedWorks',this.SbuEngAllotedWorks);
     

      const id: string[] = [];
      const empid: string[] = [];
      const engName: string[] = [];
      const name: any[] = [];
      const totalWorks: number[] = [];
      const tvcValuecr: number[] = [];
      const woIssue: any[] = [];
      const running: any[] = [];
      const ladissue: any[] = [];
      this.whidMap = {}; // Initialize the mmidMap
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

        // console.log('name:', item.name, 'id:', item.id);
        if (item.engName && item.id) {
          this.whidMap[item.engName] = item.id;
        } else {
          console.warn('Missing whid for handover Abstract :', item.engName);
        }
      });
      
      this.chartOptionsLine.series = [
        {name: 'Total Works', data: totalWorks,color:'#eeba0b'} ,
        { name: 'Running', data: running}, 
        { name: 'TVC Value cr',data: tvcValuecr, color: 'rgb(0, 143, 251)'  },
        { name: 'Lad Issue',data: ladissue },
        { name: 'WoIssue',data: woIssue,color: '#db0413'},];

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
    this.show=false;
    this.divisionid = sessionStorage.getItem('divisionID');} else {  
      if(this.name!= undefined){
        this.chartOptionsLine2.chart.height = '600px';
       }else{
        this.chartOptionsLine2.chart.height ='1500';
       } this.show=true;}
       
     
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
      this.whidMap = {}; // Initialize the mmidMap
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

        // console.log('name:', item.name, 'id:', item.id);
        if (item.engName && item.id) {
          this.whidMap[item.engName] = item.id;
        } else {
          console.warn('Missing whid for handover Abstract :', item.engName);
        }
      });
      
      this.chartOptionsLine2.series = [
        {name: 'Total Works', data: totalWorks,color:'#eeba0b'} ,
        { name: 'Running', data: running}, 
        { name: 'TVC Value cr',data: tvcValuecr, color: 'rgb(0, 143, 251)'  },
        { name: 'Lad Issue',data: ladissue },
        { name: 'WoIssue',data: woIssue,color: '#db0413'},];

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

fetchDataBasedOnChartSelection(): void {
  var roleName = localStorage.getItem('roleName');
  if (roleName == 'Division') {
    this.divisionid = sessionStorage.getItem('divisionID');} else {this.divisionid=0;this.show=true;}
  const  distid=0;
  this.spinner.show();
  // AE&divisionid=D1004&distid=0
  this.api.AEDistrictEngAllotedWorks('AE', this.divisionid,distid).subscribe(
    (res) => {
      this.dispatchPendings = res.map((item: AEDistrictEngAllotedWorks, index: number) => ({
        ...item,
        sno: index + 1
      }));
      // // Add serial numbers to the data
      //   this.dispatchPendings = res.map((item, index) => ({
      //     ...item,
      //     sno: index + 1
      //   }));
      this.dataSource.data = this.dispatchPendings;
      // this.dataSource.data = this.dispatchPendings;
      // console.log(this.dataSource.data);
      // console.log(this.dispatchPendings);
      // console.log(this.dataSource);
      // console.log('Data with serial numbers:', this.dispatchPendings); 
        // console.log("res ",JSON.stringify(res))
        // this.dispatchPendings = res;
        // console.log("Welcome ",JSON.stringify(this.dispatchPendings))
        // this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.cdr.detectChanges();
      // this.modalService.open(this.itemDetailsModal, { centered: true,backdrop:false, });
      this.spinner.hide();
    },
    (error) => {
      console.error('Error fetching data', error);
    }
  );
}
fetchDataBasedOnChartSelectionSbu(): void {
  var roleName = localStorage.getItem('roleName');
  if (roleName == 'Division') {
    this.divisionid = sessionStorage.getItem('divisionID');} else {this.divisionid=0;this.show=true;}
  const  distid=0;
  this.spinner.show();
  this.api.SubeDistrictEngAllotedWorks('Sube', this.divisionid,distid).subscribe(
    (res) => {
      this.dispatchPendings1 = res.map((item: sbuDistrictEngAllotedWorks, index: number) => ({
        ...item,
        sno: index + 1
      }));
      this.dataSource1.data = this.dispatchPendings1;
        // console.log("dispatchPendings1= ",JSON.stringify(this.dispatchPendings1))
      this.dataSource1.paginator = this.paginator;
      this.dataSource1.sort = this.sort;
      this.cdr.detectChanges();
      // this.modalService.open(this.itemDetailsModal, { centered: true,backdrop:false, });
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
  var roleName = localStorage.getItem('roleName');
  if (roleName == 'Division') {
    this.divisionid = sessionStorage.getItem('divisionID'); } else {this.divisionid=0;this.show=true;}
    // this.distidd = sessionStorage.getItem('himisDistrictid')==0?0:this.distidd;
    // this.divisionid = this.divisionid == 0 ? 0 : this.divisionid;
  const  distid=0;
  this.spinner.show();
  // dahid:any,divisionId:any,mainSchemeId:any,distid:any,engtype:any,empcode:any
  // dahid=0&divisionId=D1004&mainSchemeId=0&distid=0&engtype=SubE&empcode=Empcode0000157
  const engtype='SubE', dahid=0,mainSchemeId=0;
  this.api.GetWorkDetailsWithEng(dahid,this.divisionid,mainSchemeId,distid,engtype,empcode).subscribe(
    (res) => {
      this.dispatchPendings3 = res.map((item: WorkDetailsWithEng, index: number) => ({
        ...item,
        sno: index + 1
      }));
      this.dataSource3.data = this.dispatchPendings3;
        // console.log(" this.dataSource3.data= ",JSON.stringify( this.dataSource3.data))
      this.dataSource3.paginator = this.paginator;
      this.dataSource3.sort = this.sort;
      this.cdr.detectChanges();
      this.openDialog();
      // this.modalService.open(this.itemDetailsModal, { centered: true,backdrop:false, });
      this.spinner.hide();
    },
    (error) => {
      console.error('Error fetching data', error);
    }
  );
}
fetchDataBasedWorkDetailsWithEngAE(empcode:any, selectedSeries:any,empname:any): void {

  this.empname=empname;
  var roleName = localStorage.getItem('roleName');
  if (roleName == 'Division') {
    this.divisionid = sessionStorage.getItem('divisionID'); } else {this.divisionid=0;this.show=true;}
    // this.distidd = sessionStorage.getItem('himisDistrictid')==0?0:this.distidd;
    // this.divisionid = this.divisionid == 0 ? 0 : this.divisionid;
  const  distid=0;
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
      this.dataSource3.paginator = this.paginator;
      this.dataSource3.sort = this.sort;
      this.cdr.detectChanges();
      this.openDialog();
      // this.modalService.open(this.itemDetailsModal, { centered: true,backdrop:false, });
      this.spinner.hide();
    },
    (error) => {
      console.error('Error fetching data', error);
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
  const rows = this.dispatchPendings.map(row => ({
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
  const rows = this.dispatchPendings1.map(row => ({
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
  this.visibale=true;
  this.selectedDivision = division.id;
  this.divisionid = division.id;
  this.name = division.name;
  this.GetAEENGEngAllotedWorks();
  this.getSBUENEngAllotedWorks();
 this.fetchDataBasedOnChartSelection();
 this.fetchDataBasedOnChartSelectionSbu();
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
}

