import { NgFor, CommonModule, NgStyle } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexLegend, ApexPlotOptions, ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/service/api.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { TSDetail } from 'src/app/Model/DashProgressCount';
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
  imports: [NgApexchartsModule, MatSortModule, MatPaginatorModule, MatTableModule, MatTableExporterModule, MatInputModule, MatDialogModule,
    MatFormFieldModule, NgbModule, MatMenuModule, NgFor, CommonModule,
    NgStyle,],
  templateUrl: './technical-sanction.component.html',
  styleUrl: './technical-sanction.component.css'
})
export class TechnicalSanctionComponent {
   //#region chart Variable Declarations
  @ViewChild('chart') chart: ChartComponent | undefined;
  public cO: Partial<ChartOptions> | undefined;
  chartOptions!: ChartOptions; // For bar chart
  //#endregion
  TSDetail:TSDetail[]=[];
  divisionid:any;
  districtid:any;
  mainschemeid=0;
  constructor(public api: ApiService, public spinner: NgxSpinnerService, private cdr: ChangeDetectorRef, private modalService: NgbModal, private dialog: MatDialog) {
    // this.dataSource = new MatTableDataSource<LandIssueDetails>([]);
    // this.dataSource1 = new MatTableDataSource<LandIssueDetails>([]);
    // this.dataSource2 = new MatTableDataSource<LandIssueDetails>([]);
  }

  ngOnInit() {
    // Initialize dateRange with today and tomorrow
    this.initializeChartOptions();
    this.TSPendingTotal();
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
              const apiData = this.TSDetail;  // Replace with the actual data source or API response
              // Find the data in your API response that matches the selectedCategory
              const selectedData = apiData.find((data) => data.name === selectedCategory);
              // console.log("selectedData chart1",selectedData)
              if (selectedData) {
                const id = selectedData.id;  // Extract the id from the matching entry

                // this.fetchDataBasedOnChartSelection(id, selectedSeries);

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
        this.TSDetail = data;
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

}
