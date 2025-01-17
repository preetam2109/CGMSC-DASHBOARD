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
    this.GetProjectTimeline();
    this.spinner.show();
  }
  

  initializeChartOptions() {
    this.chartOptions = {
      series: [],
      chart: {
        type: 'bar',
        // type: 'rangeBar',
        stacked: true,
        height: 'auto',
        // height:400,
        // height: 200,
        // width:600,
        events: {
          dataPointSelection: (
            event: any,
            chartContext: any,
            { dataPointIndex, seriesIndex }: any
          ) => {
            const selectedCategory = this.chartOptions?.xaxis?.categories?.[dataPointIndex];  // This is likely just the category name (a string)
            const selectedSeries = this.chartOptions?.series?.[seriesIndex]?.name;
            // Ensure the selectedCategory and selectedSeries are valid
           
          }
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
          colors: ['#000']
        }
      },
      stroke: {
        width: 1,
        // colors: ['#000'],
        colors: ['#fff'],
      },
      title: {
        text: ' Project Timeline',
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
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
    } catch (ex: any) {
      console.error('Exception:', ex.message);
    }
  }

 


GetProjectTimeline() {
  debugger;
  this.api.GetProjectTimeline('W4100398').subscribe(
    (res) => {
      this.ProjectTimelinedata = res;
      if (Array.isArray(res) && res.length > 0) {
        const ppId: number[] = [];
        const level: any[] = [];
        const pdate: string[] = [];
        const sinceAS: any[] = [];
        const sinceLastProg: any[] = [];

        res.forEach((item: any) => {
          if (item) {
            ppId.push(item.ppId ?? 0);
            level.push(item.level ?? '');
            pdate.push(item.pdate ?? ''); // Ensure pdate is a string
            sinceAS.push(item.sinceAS ?? 0);
            sinceLastProg.push(item.sinceLastProg ?? 0);
          }
       

        });

        const seriesData = res.map(item => ({
                  y: item.pdate,
                  x: [item.sinceAS, item.sinceAS + item.sinceLastProg], // Ensure y is an array with two values
                  level: item.level // Include level for tooltip
                }));
        if (pdate.length > 0) {
          this.chartOptions.series = [
            // { name: 'level', data: level, color: '#eeba0b' },
            { name: 'sinceAS', data: sinceAS, color: 'rgb(0, 143, 251)' },
            { name: 'sinceLastProg', data: sinceLastProg }
          ];

          console.log(' this.chartOptions.series=', this.chartOptions.series);
          console.log(' categories: pdate=', {categories:pdate});
          this.chartOptions.xaxis = { categories: pdate };
          // this.chartOptions.yaxis = { categories: pdate };
        }
      } else {
        console.warn('API returned empty or invalid data');
      }
    },
    (error) => {
      console.error('Error fetching project timeline', error);
    }
  );
}


}


