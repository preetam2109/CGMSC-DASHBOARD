import { CommonModule, DatePipe, NgFor, NgStyle } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgSelectModule } from '@ng-select/ng-select';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { ConnectableObservable, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ProjectTimeline, ProjectTimelineNew, WorkBillStatus, WorkDetails, WorkFill,ASFile } from 'src/app/Model/DashProgressCount';
import { ApiService } from 'src/app/service/api.service';
import html2canvas from 'html2canvas';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexPlotOptions, ApexXAxis, ApexYAxis, ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexFill, ApexLegend, ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatMenuModule } from '@angular/material/menu';
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
  selector: 'app-searching-work',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    NgFor,
    NgSelectModule,
    SelectDropDownModule,
    CommonModule,
    NgApexchartsModule,
    NgStyle,
    DatePipe, MatSortModule, MatPaginatorModule,MatTableModule,
            MatTableExporterModule,MatMenuModule
  ],
  templateUrl: './searching-work.component.html',
  styleUrl: './searching-work.component.css',
})
export class SearchingWorkComponent {
  base64Data!: string ;
  workdetails: WorkDetails[] = [];
  workfill: WorkFill[] = [];
  ProjectTimelinedata: ProjectTimeline[] = [];
  ProjectTimelinedata1: ProjectTimelineNew[] = [];
    dataSource!: MatTableDataSource<WorkBillStatus>;
     @ViewChild(MatPaginator) paginator!: MatPaginator;
     @ViewChild(MatSort) sort!: MatSort;
     dispatchData: WorkBillStatus[] = [];
      ASFileData: ASFile[] = [];
  items = null;
  // searchTerm: string = '';
  // selectedItem: string | null = null;
  // filterControl = new FormControl();
  workID: any;
  sr: any;
  ImageName: any;
  himisDistrictid: any;
  divisionid: any;

  //#region chart
  // public chartOptions!: Partial<ChartOptions> | any;
  chartOptions: any = {};
  @ViewChild('chart') chart: ChartComponent | undefined;
  diff: any;
  //#endregion
  seriesData: any;
  constructor(
    public api: ApiService,
    public spinner: NgxSpinnerService,
    public DatePipe: DatePipe,private cdr: ChangeDetectorRef
    
  ) {this.dataSource = new MatTableDataSource<WorkBillStatus>([]);}

  ngOnInit(): void {
    this.getworkfill(); // Fetch data on initialization
    this.initializeChartOptions();
    // this.GetProjectTimeline(0);
    // this.GetProjectTimelineNEW();
    // this.GetWorkBillStatus(0);
    this.spinner.show();
  }

  initializeChartOptions() {
    // this.chartOptions = {
    //   series: [],
    //   chart: {
    //     type: 'rangeBar',
    //     height: '300',
    //     // stacked: false,
    //     events: {
    //       dataPointMouseEnter: function (event: any, chartContext: any, config: any) {
    //         const dataPoint = config.w.config.series[config.seriesIndex].data[config.dataPointIndex];
    //         // Custom logic to display data inside the bar on hover
    //       }
    //     }
    //   },
    //   plotOptions: {
    //     bar: {
    //       horizontal: true,
    //       distributed: true,
    //       colors: {
    //         ranges: [],
    //         backgroundBarColors: ['#f8f9fa', '#e9ecef', '#dee2e6'],
    //         backgroundBarOpacity: 1
    //       },
    //       dataLabels: {
    //         hideOverflowingLabels: false,
    //         position: 'center', // Place labels inside the bars
    //       }
    //     }
    //   },
    //   dataLabels: {
    //     enabled: true,
    //     formatter: function (val: any, opts: any) {
    //       const w = opts.w; // Accessing the wider context
    //       const seriesIndex = opts.seriesIndex;
    //       const dataPointIndex = opts.dataPointIndex;

    //       // Ensure we are accessing the correct data structure
    //       if (w.config && w.config.series && w.config.series[seriesIndex] && w.config.series[seriesIndex].data[dataPointIndex]) {
    //         const dataPoint = w.config.series[seriesIndex].data[dataPointIndex];
    //         // console.log('DataPoint:', dataPoint); // Log to verify structure
    //         if (dataPoint && dataPoint.level) {
    //           return dataPoint.level; // Return the `level` value
    //         }
    //       }
    //       return ''; // Default return if `level` is not available
    //     },
    //     style: {
    //       colors: ['#fff']
    //     }
    //   },
    //   xaxis: {
    //     categories: [], // Already set based on `res.map(item => item.pdate)`
    //     labels: {
    //       style: {
    //         fontSize: '12px',
    //         colors: ['#000']
    //       }
    //     },
    //     opposite: true // Ensure larger values appear at the top

    //   },
    //   yaxis: {
    //     // categories: [],
    //     labels: {
    //       style: {
    //         fontSize: '12px',
    //         colors: ['#000']
    //       }
    //     },
    //     categories: [], // Reversed in GetProjectTimeline
    //     // opposite: true // Ensure larger values appear at the top
    //     title: {
    //       text: ' Progress Date ',
    //       align: 'center',
    //       style: {
    //         fontSize: '12px',
    //         // color: '#000'
    //         color: '#6e0d25',

    //       },
    //     },
    //   },
    //   title: {
    //     text: 'Project Timeline Progress',
    //     align: 'center',
    //     style: {
    //       fontSize: '12px',
    //       // color: '#000'
    //       color: '#6e0d25'
    //     },
    //   },
    //   legend: {
    //     position: 'top',
    //     horizontalAlign: 'center',
    //     offsetx: 50,
    //   },
    //   stroke: {
    //     width: 1,
    //     colors: ['#fff'],
    //   },
    //   tooltip: {
    //     custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
    //       const dataPoint = w.config.series[seriesIndex].data[dataPointIndex];
    //       return `<div class="tooltip-box">
    //                 <div><strong>level:</strong> ${dataPoint.level}</div>
    //                 <div><strong>sinceAS:</strong> ${dataPoint.sinceAS}</div>
    //                 <div><strong>sinceLastProg:</strong> ${dataPoint.sinceLastProg}</div>
    //               </div>`;
    //     }
    //   },
    // };

   

    this.chartOptions = {
      series: [],
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 0,
          horizontal: true,
          distributed: true,
          barHeight: "80%",
          isFunnel: true, 
        },
      },
      colors: [
        "#F44F5E", "#E55A89", "#D863B1", "#CA6CD8", 
        "#B57BED", "#8D95EB", "#62ACEA", "#4BC3E6"
      ],
      dataLabels: {
        enabled: true,
        // style: {
        //   fontSize: '13px',
        //   colors: ['#000'] 
        // },
        formatter: function (val: any, opt: any) {
          return opt.w.globals.labels[opt.dataPointIndex];
        },
        dropShadow: { enabled: true },
      },
      title: {
        text: "Progress Timeline Key Dates",
        align: "center",
        style: {
                fontSize: '12px',
                // color: '#000'
                color: '#6e0d25'
              },
      },
      // xaxis: {
      //   categories: [], // Already set based on `res.map(item => item.pdate)`
      //   // labels: {
      //   //   style: {
      //   //     fontSize: "12px",
      //   //     colors: ["#000"], // ✅ Use a string instead of an array if all labels should be black
      //   //   }
      //   // },
      //   // opposite: true // ✅ Ensures larger values appear at the top
      // },
      xaxis: {
        categories: [],
      },
      legend: { show: false },
      tooltip: {
            custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
              const dataPoint = w.config.series[seriesIndex].data[dataPointIndex];
              return`<div style="border-bottom: 1px solid rgba(8, 8, 8, 0.3); border-radius: 6px;  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);  " class="tooltip-box ">
              <div style="background-color:rgb(114, 113, 113); font-size: 16px; color:#ffff">${dataPoint.x}</div>
              <div style="background-color:#ffff; font-size: 15px;">
                <div><strong>Progress Date:</strong> ${dataPoint.dateProgress}</div>
                </div>
                </div>`;
                
            }
          },
    };
  }

  config = {
    displayKey: 'searchname', // Bind label
    search: true,
    height: '300px',
    // height: "auto",
    placeholder: 'Select Works',
    // limitTo: 10, // Limits the displayed options to 10
    limitTo: this.workfill.length,
  };

  getworkfill(): void {
    try {
      
      var roleName = localStorage.getItem('roleName');
      // alert( roleName )
      if (roleName == 'Division') {
        this.divisionid = sessionStorage.getItem('divisionID');
        this.himisDistrictid = 0;
        // return;
        // alert( this.divisionid )
      } else if (roleName == 'Collector') {
        this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
        this.divisionid = 0;
        //  alert( this.himisDistrictid );
      } else {
        this.himisDistrictid = 0;
        this.divisionid = 0;
      }
      // searchtext: any, workid: any,divisionId:any,distid:any,mainSchemeId:any
      this.api
        .WorkFill(0, 0, this.divisionid, this.himisDistrictid, 0)
        .subscribe(
          (res) => {
            // alert('res');
            console.log('res', JSON.stringify(res));
            this.workfill = res; // Bind the API response to workfill

            this.spinner.hide();
          },
          (error) => {
            console.error('Error fetching data:', error);
          }
        );
    } catch (ex: any) {
      console.error('Exception:', ex.message);
    }
  }
  onGetDistrictsSelect(selectedWorkID: any): void {
    // alert(`Selected Work ID: ${selectedWorkID}`);
    this.workID = selectedWorkID.value.worK_ID;
    // alert(`Selected Work ID: ${this.workID}`);

    // console.log('Selected Work ID: ',JSON.stringify(selectedWorkID));
    this.workfill = this.workfill.filter(
      (item) => item.worK_ID !== selectedWorkID
    );
    this.spinner.show();
    // this.dataSource = new MatTableDataSource<WorkBillStatus>([]);
    // this.GetWorkBillStatus(0);
    this.GetWorkDetails();
    // this.GetProjectTimeline(this.workID);
    // this.GetProjectTimelineNEW(this.workID);
    // this.GetWorkBillStatus(this.workID);
 
  }

  GetWorkDetails() {
    try {
      this.api.GetWorkDetails(this.workID).subscribe(
        (res) => {
          this.workdetails = res;
          this.sr = this.workdetails[0]?.sr;
          // alert(this.workdetails[0]?.sr || 'SR not found or is null');
          this.ImageName = this.workdetails[0]?.imageName;
          // alert(this.workdetails[0]?.imageName || 'SR not found or is null');
          // console.log('workdetails: ', JSON.stringify(this.workdetails));
          var ProgressEnterby = new Date(this.workdetails[0]?.progressEnterby);
          var progressEntryTime = new Date(
            this.workdetails[0]?.progressEntryTime
          );
          this.spinner.hide();
          this.GetImageBinary();
    this.GetProjectTimelineNEW(this.workID);

          this.GetWorkBillStatus(this.workID);
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
    } catch (ex: any) {
      console.error('Exception:', ex.message);
    }

   
  }
  ngAfterViewInit() {
    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  // WorkBillStatus 
  GetWorkBillStatus(workID:any) {
    try {
      // alert(this.workID);
      // this.api.GETWorkBillStatus('W4100398').subscribe(
      this.api.GETWorkBillStatus(workID).subscribe(
        // (res) => {
        //   this.WorkBillStatusData = res;
        //   console.log(
        //     'WorkBillStatusData: ',
        //     JSON.stringify(this.WorkBillStatusData)
        //   );
        //   this.spinner.hide();
        // },
         (res) => {
          if(res.length>0){
            this.dispatchData = res.map(
              (item: any, index: number) => ({
                ...item,
                sno: index + 1,
              })
            );
            // console.log('WorkBillStatus =:', this.dispatchData);
            this.dataSource.data = this.dispatchData;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            // console.log('paginator =:', this.paginator);

            this.spinner.hide();
            this.cdr.detectChanges();
          } else {
            // alert("Work Bill Status data Not found.");
          }
               
              },
        (error) => {
          this.spinner.hide();
          console.error('Error fetching data:', error);
        }
      );
    } catch (ex: any) {
      console.error('Exception:', ex.message);
    }

    // try {

    //   this.api.GetWorkDetails(this.workID).subscribe(res => {
    //     this.spinner.show();
    //     this.workdetails = res;
    //     console.log('workdetails: ', JSON.stringify(this.workdetails));
    //     this.spinner.hide();

    //   }, (error) => {
    //     console.error('Error fetching data:', error);
    //   }
    // }catch (ex: any) {
    //     console.error('Exception:', ex.message);
    //   }
  }

  onSearchInput(event: any): void {
    // console.log("event:", event)
    const searchValue = event.target.value.toLowerCase();
    if (searchValue) {
      // Filter workfill array based on searchQuery
      // console.log("searchValue:", searchValue)

      this.workfill = this.workfill.filter((item) =>
        item.searchname.toLowerCase().includes(searchValue)
      );
    } else {
      this.getworkfill(); // Reset to the full list when the input is cleared
    }
  }

  exportAsPDF() {
    const element = document.getElementById('workdetails');
    if (element) {
      // Check if the element is not null
      html2canvas(element, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'landscape',
        });
        pdf.addImage(imgData, 'PNG', 10, 10, 280, 190); // Adjust dimensions as needed
        pdf.save('work_details.pdf');
      });
    } else {
      console.error("Element with ID 'workdetails' not found.");
    }
  }

  GetImageBinary() {
    try {
      // ;
      // const sr = 90691;
      // const img = 'CGMSC WORK.jpg';
      this.api.GetImageBinary(this.sr, this.ImageName).subscribe(
        (res) => {
          this.base64Data = res;
          console.log('Image data: ', this.base64Data);
          // console.log('parse res:',JSON.parse(res));
          // Handle the response (e.g., displaying the image)
          // this.spinner.hide();
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
    } catch (ex: any) {
      console.error('Exception:', ex.message);
      alert(`Error fetching data: ${ ex.message}`);
    }
  }

  GetProjectTimeline(workID: any) {
    // this.workID
    // console.log('workID',workID);
    // this.api.GetProjectTimeline('W4100398').subscribe(
    this.api.GetProjectTimeline(workID).subscribe(
      (res) => {
        this.ProjectTimelinedata = res;
        const seriesData = res.map((item) => ({
          x: item.pdate,
          // y: [item.sinceLastProg, item.sinceLastProg + item.sinceAS],
          y: [item.sinceAS, item.sinceAS + item.sinceLastProg],
          level: item.level,
          sinceAS: item.sinceAS,
          sinceLastProg: item.sinceLastProg,
          fillColor: this.getRandomColor(), // Generate random color for each bar
        }));

        // console.log("seriesData",seriesData);
        this.chartOptions.series = [{ name: 'Progress', data: seriesData }];
        this.chartOptions.xaxis.categories = res
          .map((item) => item.pdate)
          .reverse();
        // this.chartOptions.yaxis.categories = res.map(item => item.pdate);
        // this.chartOptions.xaxis.categories = res.map(item => item.pdate);
        this.chartOptions.yaxis.categories = res
          .map((item) => item.pdate)
          .reverse(); // Reverse the order for y-axis
        this.spinner.hide();
      },
      (error) => {
        alert(`Error fetching data: ${error.message || error}`);
      }
    );
  }

  GetProjectTimelineNEW(workID:any) {
        this.api.GetProjectTimelineNew(workID).subscribe(
    // this.api.GetProjectTimelineNew("W4100398").subscribe(
      (res) => {
        console.log("API Response:", res);

        if (!res || !Array.isArray(res) || res.length === 0) {
          console.error("API returned no valid data.");
          alert("No data available for the selected workID.");
          return;
        }

        const seriesData = res
          .map((item) => ({
            x: item.level, 
            y: item.ppId , 
            dateProgress:item.dateProgress,
            ppId:item.ppId,
            level:item.level,
            fillColor: this.getRandomColor(),
            // ?? 1
          }))
          .reverse(); 

       
        this.chartOptions = {
          ...this.chartOptions, 
          series: [{ name: "Progress ID", data: seriesData }],
          xaxis: {
            categories: res.map((item) => item.level).reverse(),
            // categories: res.map((item) => item.level).reverse(),
            // categories: res.map((item) => item.level +' / '+ item.dateProgress).reverse(),
          },
        };
        // this.chartOptions = {
        //   ...this.chartOptions, // ✅ Keep existing properties
        //   series: [{ name: "Progress ID", data: seriesData }],
        //   xaxis: {
        //     categories: res.map((item) => item.level), // ✅ Ensure categories are set
        //     labels: {
        //       style: {
        //         fontSize: "12px",
        //         colors: res.map(() => "#FF0000") // ✅ Apply red to all labels
        //       }
        //     },
        //     opposite: true
        //   }
        // };
        
        // // ✅ Force Angular to detect changes
        // setTimeout(() => {
        //   this.chartOptions = { ...this.chartOptions };
        // }, 100);
        
        this.spinner.hide();
      },
      (error) => {
        console.error("API Error:", error);
        alert(`Error fetching data: ${error.message || error}`);
      }
    );
  }



  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
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
  //  ['sno','billno','agrbillstatus','mesurementDT','billdate','grossPaid','chequeNo'
  // ,'daysSinceMeasurement','billStatus','billmbno','mbno']">

    const columns = [
      { title: 'S.No', dataKey: 'sno' },
      { title: 'Bill No.', dataKey: 'billno' },
      { title: 'AGR Bill status', dataKey: 'agrbillstatus' },
      { title: 'Measurement DT', dataKey: 'mesurementDT' },
      { title: 'Bill Date', dataKey: 'billdate' },
      { title: 'Gross Paid', dataKey: 'grossPaid' },
      { title: 'Cheque No', dataKey: 'chequeNo' },
      { title: 'Days Since Measurement', dataKey: 'daysSinceMeasurement' },
      { title: 'Bill Status', dataKey: 'billStatus' },
      { title: 'Bill MB No', dataKey: 'billmbno' },
      { title: 'MB No', dataKey: 'mbno' },
    
    ];
    const rows = this.dispatchData.map((row) => ({
      sno: row.sno,
      billno: row.billno,
      agrbillstatus:row.agrbillstatus,
      mesurementDT: row.mesurementDT,
      billdate: row.billdate,
      grossPaid: row.grossPaid,
      chequeNo: row.chequeNo,
      daysSinceMeasurement: row.daysSinceMeasurement,
      billStatus: row.billStatus,
      billmbno: row.billmbno,
      mbno: row.mbno,
     
    }));
  
    autoTable(doc, {
      columns: columns,
      body: rows,
      startY: 20,
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] },
    });
  
    doc.save('Acceptance_WOrderDetail.pdf');
  }

  onButtonClick2(ASID:any,workid:any): void {
    //  this.value='Active';
    // window.open('https://cgmsc.gov.in/himisr/Upload/W3900002AS2.pdf', '_blank');
      // alert(ASID);
      // alert(this.value);
      // return;
      // asLetterName
      // filename
      this.spinner.show();
      this.api.GETASFile(ASID,workid)
        .subscribe(
          (res) => {
            // this.ASFileData=res;
            const filename = res[0]?.filename; // Ensure `res[0]` exists
            const URL = res[0]?.asLetterName;
            
            if (filename) {
              window.open(URL, '_blank');
            } else {
              alert("⚠️ Alert: AS Letter Not Found!\n\nThe requested document is missing.\nPlease try again later or contact support.");
              // alert("⚠️ Alert: AS Letter Not Found!\n\nThe requested document (AS Letter) is not available at this moment.\nPlease check again later or contact support for further assistance.");
            }
          //  const URL =this.ASFileData[0].asLetterName;
          // window.open('https://cgmsc.gov.in/himisr/Upload/W3900002AS2.pdf', '_blank');
  
            // console.log('res:', res);
            console.log('ASFileData:',this.ASFileData);
            this.spinner.hide();
          },
          (error) => {
            this.spinner.hide();
            alert(`Error fetching data: ${error.message}`);
          }
        );
     }
}


