import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexLegend, ApexPlotOptions, ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HandoverAbstractDateBY, HandoverAbstractWithoutDate } from 'src/app/Model/DashProgressCount';
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
  selector: 'app-handover',
  standalone: true,
  imports: [NgApexchartsModule,MatSortModule, MatPaginatorModule,MatTableModule,MatTableExporterModule, MatInputModule,MatDialogModule,
    MatFormFieldModule,NgbModule, MatMenuModule, MatDatepickerModule,MatNativeDateModule,ReactiveFormsModule],
  templateUrl: './handover.component.html',
  styleUrl: './handover.component.css'
})
export class HandoverComponent {
  RPType='Total';
  dashid=4001;
  divisionid=0;
  districtid=0;
  SWId=0;
  fromdt:any;
  todt:any;
  // fromdt='01-04-2023';
  // todt='01-05-2023';
  @ViewChild('chart') chart: ChartComponent | undefined;
  public cO: Partial<ChartOptions> | undefined;
  chartOptions: ChartOptions; // For bar chart
  chartOptions2: ChartOptions; // For bar chart
  handoverAbstractDateBY:HandoverAbstractDateBY[]=[];
  WithoutDatehandoverAbstract:HandoverAbstractWithoutDate[]=[];
  whidMap: { [key: string]: number } = {};
  dateRange!: FormGroup;
  tomorrow = new Date();
  constructor(public api: ApiService, public spinner: NgxSpinnerService,private cdr: ChangeDetectorRef, private fb: FormBuilder,
    public datePipe: DatePipe, private modalService: NgbModal,private dialog: MatDialog, private toastr: ToastrService,){
    this.chartOptions = {
      series: [],
      chart: {
        type: 'bar',
        stacked: true,
        height: 'auto',
        // height: 300,
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
            // if (selectedCategory && selectedSeries) {
            //   // const apiData = this.wOpendingTotal;  // Replace with the actual data source or API response
            //   // Find the data in your API response that matches the selectedCategory
            //   // const selectedData = apiData.find((data) => data.name === selectedCategory);
            //   console.log("selectedData chart1",selectedData)
            //   if (selectedData) {
            //     const id = selectedData.id;  // Extract the id from the matching entry

            //     // this.fetchDataBasedOnChartSelection(id, selectedSeries);
            //     //  this.modalService.open(this.itemDetailsModal, { centered: true });

            // // this.openModalWithChartData(dataPointIndex, seriesIndex);

            //   } else {
            //     console.log(`No data found for selected category: ${selectedCategory}`);
            //   }
            // } else {
            //   console.log('Selected category or series is invalid.');
            // }
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
        text: 'Total Handover Abstract From Date to ToDate wise Progress',
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
        height: 'auto',
        // height: 300,
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
            // if (selectedCategory && selectedSeries) {
            //   // const apiData = this.wOpendingTotal;  // Replace with the actual data source or API response
            //   // Find the data in your API response that matches the selectedCategory
            //   // const selectedData = apiData.find((data) => data.name === selectedCategory);
            //   console.log("selectedData chart1",selectedData)
            //   if (selectedData) {
            //     const id = selectedData.id;  // Extract the id from the matching entry

            //     // this.fetchDataBasedOnChartSelection(id, selectedSeries);
            //     //  this.modalService.open(this.itemDetailsModal, { centered: true });

            // // this.openModalWithChartData(dataPointIndex, seriesIndex);

            //   } else {
            //     console.log(`No data found for selected category: ${selectedCategory}`);
            //   }
            // } else {
            //   console.log('Selected category or series is invalid.');
            // }
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
        text: 'Total Work Handover Abstract  Progress',
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
     // Initialize dateRange with today and tomorrow
     const today = new Date();
     const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
     const tomorrow = new Date();
     tomorrow.setDate(today.getDate() + 1); // Set tomorrow's date
 
     this.dateRange = this.fb.group({
         start: [firstDayOfMonth],    // Set start date to today
        //  start: [this.fromdt],    // Set start date to today
        //  end: [tomorrow]    // Set end date to tomorrow
         end: [today]    // Set end date to tomorrow
        //  console.log('startdate:',)
     });
     this.dateRange.valueChanges.subscribe(() => {
       this.HandoverAbstractDateBY();
     });
     this.HandoverAbstractDateBY();
     this.handoverAbstractWithoutDate();
  }
 
  ngOnInit() {
  
  }
  HandoverAbstractDateBY(): void {
    const startDate = this.dateRange.value.start;
    const endDate = this.dateRange.value.end;
    // Only format dates if both start and end dates are selected
    this.fromdt = startDate ? this.datePipe.transform(startDate, 'dd-MMM-yyyy') : '';
    this.todt = endDate ? this.datePipe.transform(endDate, 'dd-MMM-yyyy') : '';
    // this.fromdt ='01-04-2023'

    console.log('enddate:', this.todt)

    console.log('startdate:', this.fromdt)

    // RPType=Total&dashid=4001&divisionid=0&districtid=0&SWId=0&fromdt=01-04-2023&todt=01-05-2023

    if (this.fromdt && this.todt) {
      this.spinner.show();
      this.api.GETHandoverAbstractDateBY(this.RPType, this.dashid, this.divisionid, this.districtid, this.SWId, this.fromdt, this.todt).subscribe(
        (data: any) => {

          if (data.length === 0) {
            this.toastr.info('No data found. Please select another date range.');
            this.handoverAbstractDateBY = data;
            this.spinner.hide();
            return;
          }
          // console.log('this.handoverAbstractDateBY',this.handoverAbstractDateBY);
          const id: string[] = [];
          const name: string[] = [];
          const totalWorks: any[] = [];
          const tvcValuecr: number[] = [];
          const avgMonthTaken: any[] = [];
          this.whidMap = {}; // Initialize the mmidMap
          // console.log('API Response total:', data);
          data.forEach((item: {
            name: string; id: any; totalWorks: any; tvcValuecr: number;
            avgMonthTaken: any
          }) => {
            id.push(item.id);
            name.push(item.name);
            totalWorks.push(item.totalWorks);
            tvcValuecr.push(item.tvcValuecr);
            avgMonthTaken.push(item.avgMonthTaken);

            // console.log('name:', item.name, 'id:', item.id);
            if (item.name && item.id) {
              this.whidMap[item.name] = item.id;
            } else {
              console.warn('Missing whid for handover Abstract :', item.name);
            }
          });

          this.chartOptions.series = [
            { name: 'Total Works', data: totalWorks, color: '#eeba0b' },
            { name: 'TVC Value cr', data: tvcValuecr },
            { name: 'AVG Month Taken', data: avgMonthTaken, color: 'rgb(0, 143, 251)' },];

          this.chartOptions.xaxis = { categories: name };
          this.cO = this.chartOptions;
          this.cdr.detectChanges();

          this.spinner.hide();

        },
        (error: any) => {
          console.error('Error fetching data', error);
        }
      );
    }
  }
handoverAbstractWithoutDate(): void {
    // RPType=Total&dashid=4001&divisionid=0&districtid=0&SWId=0&fromdt=01-04-2023&todt=01-05-2023
const startdate=0;
const enddate=0;

    this.spinner.show();
    this.api.GETHandoverAbstractWithoutDate(this.RPType,this.dashid,this.divisionid,this.districtid,this.SWId,startdate,enddate).subscribe(
      (data: any) => {
                  this.WithoutDatehandoverAbstract = data;
        console.log('WithoutDatehandoverAbstract',this.WithoutDatehandoverAbstract);
        const id: string[] = [];
        const name: string[] = [];
        const totalWorks: any[] = [];
        const tvcValuecr: number[] = [];
        const avgMonthTaken: any[] = [];
        this.whidMap = {}; // Initialize the mmidMap
        // console.log('API Response total:', data);
        data.forEach((item: {
          name: string; id: any; totalWorks: any; tvcValuecr: number;
          avgMonthTaken: any
        }) => {
          id.push(item.id);
          name.push(item.name);
          totalWorks.push(item.totalWorks);
          tvcValuecr.push(item.tvcValuecr);
          avgMonthTaken.push(item.avgMonthTaken);

          // console.log('name:', item.name, 'id:', item.id);
          if (item.name && item.id) {
            this.whidMap[item.name] = item.id;
          } else {
            console.warn('Missing whid for handover Abstract :', item.name);
          }
        });
        
        this.chartOptions2.series = [
          {name: 'Total Works', data: totalWorks,color:'#eeba0b'} ,
          { name: 'TVC Value cr',data: tvcValuecr },
          { name: 'AVG Month Taken', data: avgMonthTaken, color: 'rgb(0, 143, 251)' }, ];

        this.chartOptions2.xaxis = { categories: name };
        this.cO = this.chartOptions2;
        this.cdr.detectChanges();

        this.spinner.hide();

      },
      (error: any) => {
        console.error('Error fetching data', error);
      }
    );
  }
}
