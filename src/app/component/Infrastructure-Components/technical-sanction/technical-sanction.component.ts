import { NgFor, CommonModule, NgStyle } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill,
   ApexLegend, ApexPlotOptions, ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexXAxis, 
   ApexYAxis, ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/service/api.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ASFile, TSDetail, TSDetailallData } from 'src/app/Model/DashProgressCount';
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
  selector: 'app-technical-sanction',
  standalone: true,
  imports: [NgApexchartsModule, MatTableModule, MatTableExporterModule, MatInputModule, MatDialogModule,
    MatFormFieldModule, MatMenuModule, NgFor, CommonModule, MatSortModule, MatPaginatorModule,
    NgStyle],
  templateUrl: './technical-sanction.component.html',
  styleUrl: './technical-sanction.component.css'
})
export class TechnicalSanctionComponent {
   //#region chart Variable Declarations
  @ViewChild('chart') chart: ChartComponent | undefined;
  public cO: Partial<ChartOptions> | undefined;
  chartOptions!: ChartOptions; // For bar chart
  chartOptions2!: ChartOptions; // For bar chart
  chartOptions3!: ChartOptions; // For bar chart
  //#endregion
   //#region data Table
   @ViewChild('itemDetailsModal')itemDetailsModal: any;
  //  dispatchPendings: TSDetailallData[] = [];
   dataSource!: MatTableDataSource<TSDetailallData>;
   @ViewChild(MatPaginator) paginator!: MatPaginator;
   @ViewChild(MatSort) sort!: MatSort;
   //#endregion
  TSDetailTotal:TSDetail[]=[];
  TSDetailScheme:TSDetail[]=[];
  TSDetailDistrict:TSDetail[]=[];
     ASFileData: ASFile[] = [];
  
  divisionid:any;
  districtid:any;
  mainschemeid=0;
  resultsLength = 0;
  TSDetailallData: TSDetailallData[]=[] ;
  constructor(public api: ApiService, public spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<TSDetailallData>([]);
  }

  ngOnInit() {
    // Initialize dateRange with today and tomorrow
    this.initializeChartOptions();
    this.TSPendingTotal();
    this.TSPendingScheme();
    this.TSPendingDistrict();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  
  
  
  initializeChartOptions() {
    this.chartOptions = {
      series: [],
      chart: {
        type: 'bar',
        stacked: true,
        // height: 'auto',
        // height:400,
        // height: 200,
        // width:600,
        events: {
          dataPointSelection: (
            event,
            chartContext,
            { dataPointIndex, seriesIndex }
          ) => {
            const selectedCategory = this.chartOptions?.xaxis?.categories?.[dataPointIndex];  // This is likely just the category name (a string)
            const selectedSeries = this.chartOptions?.series?.[seriesIndex]?.name;
            // Ensure the selectedCategory and selectedSeries are valid
            if (selectedCategory && selectedSeries) {
              const apiData = this.TSDetailTotal;  // Replace with the actual data source or API response
              // Find the data in your API response that matches the selectedCategory
              const selectedData = apiData.find((data) => data.name === selectedCategory);
              // console.log("selectedData chart1",selectedData)
              if (selectedData) {
                const id = selectedData.id;  // Extract the id from the matching entry

                this.fetchDataBasedOnChartSelection(id, selectedSeries);

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
        text: 'Technical Sanction Pending  Works Total wise Progress',
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
    this.chartOptions2 = {
      series: [],
      chart: {
        type: 'bar',
        stacked: true,
        // height: 'auto',
        // height:400,
        // height: 200,
        // width:600,
        events: {
          dataPointSelection: (
            event,
            chartContext,
            { dataPointIndex, seriesIndex }
          ) => {
            const selectedCategory = this.chartOptions2?.xaxis?.categories?.[dataPointIndex];  // This is likely just the category name (a string)
            const selectedSeries = this.chartOptions2?.series?.[seriesIndex]?.name;
            // Ensure the selectedCategory and selectedSeries are valid
            if (selectedCategory && selectedSeries) {
              const apiData = this.TSDetailScheme;  // Replace with the actual data source or API response
              // Find the data in your API response that matches the selectedCategory
              const selectedData = apiData.find((data) => data.name === selectedCategory);
              // console.log("selectedData chart1",selectedData)
              if (selectedData) {
                const id = selectedData.id;  // Extract the id from the matching entry

                this.fetchDataBasedOnChartSelection2(id, selectedSeries);

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
        text: 'Technical Sanction Pending  Works Scheme wise Progress',
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
    this.chartOptions3 = {
      series: [],
      chart: {
        type: 'bar',
        stacked: true,
        // height: 'auto',
        // height:400,
        // height: 200,
        // width:600,
        events: {
          dataPointSelection: (
            event,
            chartContext,
            { dataPointIndex, seriesIndex }
          ) => {
            const selectedCategory = this.chartOptions3?.xaxis?.categories?.[dataPointIndex];  // This is likely just the category name (a string)
            const selectedSeries = this.chartOptions3?.series?.[seriesIndex]?.name;
            // Ensure the selectedCategory and selectedSeries are valid
            if (selectedCategory && selectedSeries) {
              const apiData = this.TSDetailDistrict;  // Replace with the actual data source or API response
              // Find the data in your API response that matches the selectedCategory
              const selectedData = apiData.find((data) => data.name === selectedCategory);
              console.log("selectedData chart1",selectedData)
              if (selectedData) {
                const id = selectedData.id;  // Extract the id from the matching entry

                this.fetchDataBasedOnChartSelection3(id, selectedSeries);

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
        text: 'Technical Sanction Pending  Works District wise Progress',
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
 
 //#region API get DATA
 TSPendingTotal(): void {
  var roleName = localStorage.getItem('roleName');
  if (roleName == 'Division') {
    this.divisionid = sessionStorage.getItem('divisionID');
    this.chartOptions.chart.height = '200px';
    this.districtid = 0;
  } else if (roleName == 'Collector') {
   this.districtid = sessionStorage.getItem('himisDistrictid');
   this.chartOptions.chart.height = '400px';
    this.divisionid=0;
  }
  else {
    this.districtid = 0;
    this.divisionid=0;
    this.chartOptions.chart.height = 'auto';
  }

  this.spinner.show();
var RPType='Total'
  this.api.GetTSDetail(RPType, this.divisionid,this.districtid,this.mainschemeid).subscribe(
    (data: any) => {
      if (Array.isArray(data) && data.length > 0) {
        this.TSDetailTotal = data;
        const name: string[] = [];
        const id: any[] = [];
        const nosWorks: number[] = [];
        const asValuecr: any[] = [];
        const above2crWork: any[] = [];
        const below2crWork: any[] = [];
        data.forEach((item: any) => {
          if (item) {
            name.push(item.name ?? '');
            nosWorks.push(item.nosWorks ?? 0);
            asValuecr.push(item.asValuecr ?? 0);
            above2crWork.push(item.above2crWork ?? 0);
            below2crWork.push(item.below2crWork ?? 0);
          }
        });
console.log('res data Total=',data);
        if (name.length > 0) {
          this.chartOptions.series = [
            { name: 'Total Pending Works', data: nosWorks, color: '#eeba0b' },
            { name: 'Value In CR', data: asValuecr },
            // { name: 'TVC Value cr', data: above2crWork, color: 'rgb(0, 143, 251)' },
            { name: 'Above 2 CR Works', data: above2crWork },
            { name: 'Below 2 CR Works', data: below2crWork, color: 'rgb(0, 143, 251)' },
          ];

          this.chartOptions.xaxis = { categories: name };
          this.cdr.detectChanges(); // Trigger view update
        }
      } else {
        console.warn('API returned empty or invalid data');
      }

      this.spinner.hide();
    },
    (error: any) => {
      console.error('Error fetching data', error);
      this.spinner.hide();
    }
  );
}
 TSPendingScheme(): void {
  var roleName = localStorage.getItem('roleName');
  if (roleName == 'Division') {
    this.divisionid = sessionStorage.getItem('divisionID');
    this.chartOptions2.chart.height = '200px';
    this.districtid = 0;
  } else if (roleName == 'Collector') {
   this.districtid = sessionStorage.getItem('himisDistrictid');
   this.chartOptions2.chart.height = '400px';
    this.divisionid=0;
  }
  else {
    this.districtid = 0;
    this.divisionid=0;
    this.chartOptions2.chart.height = 'auto';
  }

  this.spinner.show();
  // Scheme = 'Scheme';
  // Total = 'Total';
  // Contractor = 'Contractor';
  // District = 'District'
var RPType='Scheme'
  this.api.GetTSDetail(RPType, this.divisionid,this.districtid,this.mainschemeid).subscribe(
    (data: any) => {
      if (Array.isArray(data) && data.length > 0) {
        this.TSDetailScheme = data;
        const name: string[] = [];
        const id: any[] = [];
        const nosWorks: number[] = [];
        const asValuecr: any[] = [];
        const above2crWork: any[] = [];
        const below2crWork: any[] = [];
        data.forEach((item: any) => {
          if (item) {
            name.push(item.name ?? '');
            nosWorks.push(item.nosWorks ?? 0);
            asValuecr.push(item.asValuecr ?? 0);
            above2crWork.push(item.above2crWork ?? 0);
            below2crWork.push(item.below2crWork ?? 0);
          }
        });
console.log('res data=',data);
        if (name.length > 0) {
          this.chartOptions2.series = [
            { name: 'Total Pending Works', data: nosWorks, color: '#eeba0b' },
            { name: 'Value In CR', data: asValuecr },
            // { name: 'TVC Value cr', data: above2crWork, color: 'rgb(0, 143, 251)' },
            { name: 'Above 2 CR Works', data: above2crWork },
            { name: 'Below 2 CR Works', data: below2crWork, color: 'rgb(0, 143, 251)' },
          ];

          this.chartOptions2.xaxis = { categories: name };
          this.cdr.detectChanges(); // Trigger view update
        }
      } else {
        console.warn('API returned empty or invalid data');
      }

      this.spinner.hide();
    },
    (error: any) => {
      console.error('Error fetching data', error);
      this.spinner.hide();
    }
  );
}
 TSPendingDistrict(): void {
  var roleName = localStorage.getItem('roleName');
  if (roleName == 'Division') {
    this.divisionid = sessionStorage.getItem('divisionID');
    this.chartOptions3.chart.height = '200px';
    this.districtid = 0;
  } else if (roleName == 'Collector') {
   this.districtid = sessionStorage.getItem('himisDistrictid');
   this.chartOptions3.chart.height = '400px';
    this.divisionid=0;
  }
  else {
    this.districtid = 0;
    this.divisionid=0;
    this.chartOptions3.chart.height = '2000';
  }

  this.spinner.show();
  // Scheme = 'Scheme';
  // Total = 'Total';
  // Contractor = 'Contractor';
  // District = 'District'
  var RPType='District'
  console.log('division =', this.divisionid ,'this.districtid =',this.districtid,'mainschemeid',this.mainschemeid )
  this.api.GetTSDetail(RPType, this.divisionid,this.districtid,this.mainschemeid).subscribe(
    (data: any) => {
      if (Array.isArray(data) && data.length > 0) {
        this.TSDetailDistrict = data;
        const name: string[] = [];
        const id: any[] = [];
        const nosWorks: number[] = [];
        const asValuecr: any[] = [];
        const above2crWork: any[] = [];
        const below2crWork: any[] = [];
        data.forEach((item: any) => {
          if (item) {
            name.push(item.name ?? '');
            nosWorks.push(item.nosWorks ?? 0);
            asValuecr.push(item.asValuecr ?? 0);
            above2crWork.push(item.above2crWork ?? 0);
            below2crWork.push(item.below2crWork ?? 0);
          }
        });
        console.log('res data rptDistrict=',data);
        if (name.length > 0) {
          this.chartOptions3.series = [
            { name: 'Total Pending Works', data: nosWorks, color: '#eeba0b' },
            { name: 'Value In CR', data: asValuecr },
            // { name: 'TVC Value cr', data: above2crWork, color: 'rgb(0, 143, 251)' },
            { name: 'Above 2 CR Works', data: above2crWork },
            { name: 'Below 2 CR Works', data: below2crWork, color: 'rgb(0, 143, 251)' },
          ];

          this.chartOptions3.xaxis = { categories: name };
          this.cdr.detectChanges(); // Trigger view update
        }
      } else {
        console.warn('API returned empty or invalid data');
      }

      this.spinner.hide();
    },
    (error: any) => {
      console.error('Error fetching data', error);
      this.spinner.hide();
    }
  );
}
//#region  add database table form 
// fetchDataBasedOnChartSelection(id: string, selectedSeries: string) {
//  console.log(`Selected ID: ${id}, Series: ${selectedSeries}`);
//  const distid = 0;
//  const mainSchemeId = 0;
//  this.spinner.show();
// //  getTSDetails?divisionId=D1004&mainSchemeId=0&distid=0
//  this.api.GetTSDetailall(id, mainSchemeId, distid).subscribe(
//    (res) => {
//      this.dispatchPendings = res.map((item: TSDetailallData, index: any) => ({
//        ...item,
//        sno: index + 1
//      }));
//      ;
//           this.dataSource.data = this.dispatchPendings;
//           this.dataSource.paginator = this.paginator;
//           this.dataSource.sort = this.sort;
//           this.cdr.detectChanges(); // Trigger change detection
//      console.log(' this.dataSource.data =', this.dataSource.data );
//      console.log('this.dataSource.paginator ', this.dataSource.paginator );
//      console.log(' this.dataSource.sort', this.dataSource.sort );

//      this.openDialog();
//      this.spinner.hide();
//    },
//    (error) => {
//      console.error('Error fetching data', error);
//    }
//  );
// }

  // data filter
  

  fetchDataBasedOnChartSelection(id: string, selectedSeries: string) {
    console.log(`Selected ID: ${id}, Series: ${selectedSeries}`);
    const distid = 0;
    const mainSchemeId = 0;
    this.spinner.show();
    this.api.GetTSDetailall(id, mainSchemeId, distid).subscribe(
      (res) => {
        this.TSDetailallData = res.map((item: TSDetailallData, index: any) => ({
          ...item,
          sno: index + 1
        }));
        
        this.dataSource.data = this.TSDetailallData;
        this.cdr.detectChanges(); // Trigger change detection
  
        // Re-assign paginator and sort after data update
        if (this.paginator && this.sort) {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          console.warn('Paginator or Sort not available at data update time.');
        }
  
        this.spinner.hide();
      },
      (error) => {
        console.error('Error fetching data', error);
        this.spinner.hide();
      }
      );
      this.openDialog();
  }
  fetchDataBasedOnChartSelection2(mainSchemeId: string, selectedSeries: string) {
    console.log(`Selected ID: ${mainSchemeId}, Series: ${selectedSeries}`);
    const distid = 0;
    const divisionid = 0;
    // const mainSchemeId = 0;
    this.spinner.show();
    this.api.GetTSDetailall(divisionid, mainSchemeId, distid).subscribe(
      (res) => {
        this.TSDetailallData = res.map((item: TSDetailallData, index: any) => ({
          ...item,
          sno: index + 1
        }));
        
        this.dataSource.data = this.TSDetailallData;
        this.cdr.detectChanges(); // Trigger change detection
        console.log('TSDetailallData;=',this.TSDetailallData);
  
        // Re-assign paginator and sort after data update
        if (this.paginator && this.sort) {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          console.warn('Paginator or Sort not available at data update time.');
        }
  
        this.spinner.hide();
      },
      (error) => {
        console.error('Error fetching data', error);
        this.spinner.hide();
      }
      );
      this.openDialog();
  }
  fetchDataBasedOnChartSelection3(distid: string, selectedSeries: string) {
    console.log(`Selected ID: ${distid}, Series: ${selectedSeries}`);
    const divisionid = 0;
    const mainSchemeId = 0;
    this.spinner.show();
    this.api.GetTSDetailall(divisionid, mainSchemeId, distid).subscribe(
      (res) => {
        this.TSDetailallData = res.map((item: TSDetailallData, index: any) => ({
          ...item,
          sno: index + 1
        }));
        
        this.dataSource.data = this.TSDetailallData;
        this.cdr.detectChanges(); // Trigger change detection
        console.log('TSDetailallData;=',this.TSDetailallData);
  
        // Re-assign paginator and sort after data update
        if (this.paginator && this.sort) {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          console.warn('Paginator or Sort not available at data update time.');
        }
  
        this.spinner.hide();
      },
      (error) => {
        console.error('Error fetching data', error);
        this.spinner.hide();
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
  exportToPDF() {
    const doc = new jsPDF('l', 'mm', 'a4');
    const columns = [
       // 'sno','letterno', 'head','detailS_ENG','asAmt','aA_RAA_Date','workname','district','division','block_Name_En','work_id',
      { title: "sno", dataKey: "sno" },
      { title: "letterNo", dataKey: "letterno" },
      { title: "head", dataKey: "head" },
      { title: "aA_RAA_Date", dataKey: "aA_RAA_Date" },
      { title: "asAmt", dataKey: "asAmt" },
      { title: "district", dataKey: "district" },
      { title: "division", dataKey: "division" },
      { title: "workname", dataKey: "workname" },
      { title: "block_Name_En", dataKey: "block_Name_En" },
      { title: "detailS_ENG", dataKey: "detailS_ENG" },
      { title: "work_id", dataKey: "work_id" }
    ];
    const rows = this.TSDetailallData.map(row => ({
      sno: row.sno,
      letterNo: row.letterno,
      head: row.head,
      detailS_ENG: row.detailS_ENG,
      aA_RAA_Date: row.aA_RAA_Date,
      asAmt: row.asAmt,
      district: row.district,
      division: row.division,
      workname: row.workname,
      block_Name_En: row.block_Name_En,
      work_id: row.work_id,
    }));

    autoTable(doc, {
      columns: columns,
      body: rows,
      startY: 20,
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] }
    });

    doc.save('TSDetail.pdf');
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
//#endregion
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
