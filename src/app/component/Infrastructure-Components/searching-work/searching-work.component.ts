import { CommonModule, DatePipe, NgFor, NgStyle } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
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
import { ProjectTimeline, WorkDetails, WorkFill } from 'src/app/Model/DashProgressCount';
import { ApiService } from 'src/app/service/api.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexPlotOptions, ApexXAxis, ApexYAxis, ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexFill, ApexLegend, ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
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
  imports: [FormsModule, ReactiveFormsModule, MatSelectModule,
    MatInputModule, MatFormFieldModule, MatAutocompleteModule, NgFor, NgSelectModule,
    SelectDropDownModule, CommonModule,NgApexchartsModule,
    NgStyle, DatePipe
  ],
  templateUrl: './searching-work.component.html',
  styleUrl: './searching-work.component.css'
})
export class SearchingWorkComponent {
  base64Data: string | undefined;
  workdetails: WorkDetails[] = [];
  workfill: WorkFill[] = [];
  ProjectTimelinedata: ProjectTimeline[] = [];
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
  public chartOptions!: Partial<ChartOptions> | any;
  @ViewChild('chart') chart: ChartComponent | undefined;
  diff:any;
  //#endregion
  constructor(public api: ApiService, public spinner: NgxSpinnerService, public DatePipe: DatePipe) {
   

 
    
  }

  ngOnInit(): void {
this.initializeChartOptions();
    this.getworkfill(); // Fetch data on initialization
    // this.GetProjectTimeline(0);
    this.spinner.show();
  }
  

  initializeChartOptions() {
    this.chartOptions = {
      series: [],
      chart: {
        type: 'rangeBar',
        height: '300',
        // stacked: false,
        events: {
          dataPointMouseEnter: function (event: any, chartContext: any, config: any) {
            const dataPoint = config.w.config.series[config.seriesIndex].data[config.dataPointIndex];
            // Custom logic to display data inside the bar on hover
          }
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          distributed: true,
         
          colors: {
            ranges: [],
            backgroundBarColors: ['#f8f9fa', '#e9ecef', '#dee2e6'],
            backgroundBarOpacity: 1
          },
          dataLabels: {
            hideOverflowingLabels: false,
            position: 'center', // Place labels inside the bars
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: any, opts: any) {
          const w = opts.w; // Accessing the wider context
          const seriesIndex = opts.seriesIndex;
          const dataPointIndex = opts.dataPointIndex;
        
          // Ensure we are accessing the correct data structure
          if (w.config && w.config.series && w.config.series[seriesIndex] && w.config.series[seriesIndex].data[dataPointIndex]) {
            const dataPoint = w.config.series[seriesIndex].data[dataPointIndex];
            // console.log('DataPoint:', dataPoint); // Log to verify structure
            if (dataPoint && dataPoint.level) {
              return dataPoint.level; // Return the `level` value
            }
          }
          return ''; // Default return if `level` is not available
        },
        style: {
          colors: ['#fff']
        }
      },
      xaxis: {
        categories: [], // Already set based on `res.map(item => item.pdate)`
        labels: {
          style: {
            fontSize: '12px',
            colors: ['#000']
          }
        },
        opposite: true // Ensure larger values appear at the top

      },
      yaxis: {
        // categories: [], 
        labels: {
          style: {
            fontSize: '12px',
            colors: ['#000']
          }
        },
        categories: [], // Reversed in GetProjectTimeline
        // opposite: true // Ensure larger values appear at the top
        title: {
          text: ' Progress Date ',
          align: 'center',
          style: {
            fontSize: '12px',
            // color: '#000'
            color: '#6e0d25',
            
          },
        },
      },
      title: {
        text: 'Project Timeline Progress',
        align: 'center',
        style: {
          fontSize: '12px',
          // color: '#000'
          color: '#6e0d25'
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'center',
        offsetx: 50,
      },
      stroke: {
        width: 1,
        colors: ['#fff'],
      },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
          const dataPoint = w.config.series[seriesIndex].data[dataPointIndex];
          return `<div class="tooltip-box">
                    <div><strong>level:</strong> ${dataPoint.level}</div>
                    <div><strong>sinceAS:</strong> ${dataPoint.sinceAS}</div>
                    <div><strong>sinceLastProg:</strong> ${dataPoint.sinceLastProg}</div>
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
      }
      else {
        this.himisDistrictid = 0;
        this.divisionid = 0;
      }
      // searchtext: any, workid: any,divisionId:any,distid:any,mainSchemeId:any
      this.api.WorkFill(0, 0, this.divisionid, this.himisDistrictid, 0).subscribe(
        (res) => {
          // alert('res');
          // console.log('res', JSON.stringify(res));
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
    this.workID = selectedWorkID.value.worK_ID
    // alert(`Selected Work ID: ${this.workID}`);

    // console.log('Selected Work ID: ',JSON.stringify(selectedWorkID));
    this.workfill = this.workfill.filter((item) => item.worK_ID !== selectedWorkID);
    this.spinner.show();

    this.GetWorkDetails();
    this.GetProjectTimeline(this.workID);
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
          var progressEntryTime = new Date(this.workdetails[0]?.progressEntryTime);
          this.spinner.hide();
          this.GetImageBinary();
        },
        (error) => {
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
    if (element) { // Check if the element is not null
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
      // const sr = 90691;
      // const img = 'CGMSC WORK.jpg';
      this.api.GetImageBinary(this.sr, this.ImageName).subscribe(
        (res) => {
          this.base64Data = res;
          // console.log('Image data: ', this.base64Data);
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
    }
  }
  



GetProjectTimeline(workID:any) {
  // this.workID
  // console.log('workID',workID);
  // this.api.GetProjectTimeline('W4100398').subscribe(
  this.api.GetProjectTimeline(workID).subscribe(
    (res) => {
     this.ProjectTimelinedata=res;
      const seriesData = res.map(item => ({
        x:item.pdate,
        // y: [item.sinceLastProg, item.sinceLastProg + item.sinceAS],
        y: [item.sinceAS , item.sinceAS + item.sinceLastProg],
        level: item.level,
        sinceAS: item.sinceAS,
        sinceLastProg: item.sinceLastProg,
        fillColor: this.getRandomColor() // Generate random color for each bar
      }));

      // console.log("seriesData",seriesData);
      this.chartOptions.series = [{ name: 'Progress', data: seriesData }];
      this.chartOptions.xaxis.categories = res.map(item => item.pdate).reverse(); 
      // this.chartOptions.yaxis.categories = res.map(item => item.pdate);
      // this.chartOptions.xaxis.categories = res.map(item => item.pdate);
      this.chartOptions.yaxis.categories = res.map(item => item.pdate).reverse(); // Reverse the order for y-axis
      this.spinner.hide();
    },
    (error) => {
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
}


