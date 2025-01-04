import { NgFor, NgStyle, CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { GoogleMapsModule, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexLegend, ApexPlotOptions, ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { NgxSpinnerService } from 'ngx-spinner';
import {  DashProgressDistCount, DivisionPrograss, MainScheme, ProgressDetailsLatLong } from 'src/app/Model/DashProgressCount';
import { ApiService } from 'src/app/service/api.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

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
interface Marker {
  workId: string;
  latitude: string;
  longitude: string;
  workName: string;
  pRemarks: string;
  position: { lat: number; lng: number };
}
@Component({
  selector: 'app-division-progress',
  standalone: true,
  imports: [
    NgFor,
    NgStyle,
    // BrowserModule,
    // BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatTabsModule,
    CommonModule, MatFormFieldModule, MatSelectModule, MatOptionModule,
    NgApexchartsModule, MatSortModule, MatPaginatorModule,
GoogleMapsModule,MatButtonModule,MatMenuModule, MatTableExporterModule, MatTableModule,MapInfoWindow 

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './division-progress.component.html',
  styleUrl: './division-progress.component.css'
})
export class DivisionProgressComponent {
  progressdetailsLatLong: ProgressDetailsLatLong[] = [];
  mainscheme: MainScheme[] = [];
  divisionprograss:DivisionPrograss[]=[];
  originalData: DivisionPrograss[] = []; // To store the original data for "Total Works"
  @ViewChild('chart') chart: ChartComponent | undefined;
  public cO: Partial<ChartOptions> | undefined;
  chartOptions: ChartOptions;
  divisionIDMap: { [key: string]: number } = {};
  dataSource!: MatTableDataSource<DivisionPrograss>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  SchemeId:number=0;
  isall: boolean = true;
  isshow: boolean = false;
  selectedTabIndex: number=0;
   DID=5001;
  center = { lat: 22.1760124, lng: 82.1228984 }; // Default map center
  zoom = 8;
  selectedWarehouse: any;
  progressdetails: any;
  TotMobile:any;

  seriesName:any;
  dayPara:any;
  constructor(public api: ApiService, public spinner: NgxSpinnerService, private cdr: ChangeDetectorRef) {
    this.chartOptions = {
      series: [],
      chart: {
        type: 'bar',
        stacked: true,
        // width:500,
        height: 350,
        events: {
          dataPointSelection: (
            event,
            chartContext,
            { dataPointIndex, seriesIndex }
          ) => {
            const selectedCategory =
              this.chartOptions?.xaxis?.categories?.[dataPointIndex];
            const selectedSeries = this.chartOptions?.series?.[seriesIndex]?.name;
            
            if (selectedCategory && selectedSeries) {
              const divisionID = this.divisionIDMap[selectedCategory];
              this.seriesName=selectedSeries;
              if (divisionID) {
                this.fetchDataBasedOnChartSelection(divisionID, selectedSeries);
              }
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
          colors: ['#000']
        }
      },
      stroke: {
        width: 1,
        // colors: ['#000'],
        colors: ['#fff'],
      },
      title: {
        text: 'Division wise work Progress',
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
    this.loadData();
    this.dataSource = new MatTableDataSource<DivisionPrograss>([]);
  }
  ngOnInit() {
    this.getmain_scheme();
    // this.loadData();
    // this.GetprogressdetailsLatLong();
    // this.getMarkers();
  }


//#region Api callling
loadData(): void {
  
  this.api.GetProgressCount(this.DID,0,0,this.SchemeId).subscribe(
    (data: any) => {
      this.divisionprograss = data;
      const divisionID: string[] = [];
      const divisionName: string[] = [];
      const nosworks: number[] = [];
      const totalToday: number[] = [];
      const mobiletoday: number[] = [];
      const totalInLast7Days: number[] = [];
      const mobileInLast7Days: number[] = [];
      const totalInLast15Days: number[] = [];
      const mobileLast15Days: number[] = [];
      const totalBefore15Days: number[] = [];
      const mobileBefore15Days: number[] = [];
      this.divisionIDMap = {}; // Initialize the mmidMap
      // console.log('API Response:', data);
      data.forEach((item: {
        divisionName: string; divisionID:any; nosworks: any; totalToday: number; mobiletoday: number;
        totalInLast7Days: number; mobileInLast7Days: number; totalInLast15Days: number;
        mobileLast15Days: number; totalBefore15Days: number;mobileBefore15Days:number
      }) => {
        divisionName.push(item.divisionName);
        nosworks.push(item.nosworks);
        totalToday.push(item.totalToday);
        mobiletoday.push(item.mobiletoday);
        totalInLast7Days.push(item.totalInLast7Days);
        mobileInLast7Days.push(item.mobileInLast7Days);
        totalInLast15Days.push(item.totalInLast15Days);
        mobileLast15Days.push(item.mobileLast15Days);
        totalBefore15Days.push(item.totalBefore15Days);
        mobileBefore15Days.push(item.mobileBefore15Days);

        // console.log('districtname:', item.divisionName, 'whid:', item.divisionID);
        if (item.divisionName && item.divisionID) {
          this.divisionIDMap[item.divisionName] = item.divisionID;
        } else {
          // console.warn('Missing whid for warehousename :', item.divisionID);
        }});

      // console.log('whidMap:', this.whidMap); // Log the populated mmidMap
        this.chartOptions.series =   this.selectedTabIndex === 0
        ? [
          { name: 'Total Works', data: nosworks, color: '#0000FF' },
          { name: 'Uploaded Today', data: mobiletoday, color: 'rgb(0, 128, 0)' },
          { name: 'Uploaded In Last 7 Days', data: mobileInLast7Days, color: 'rgb(144, 238, 144)' },
          { name: 'Uploaded In Last 15 Days', data: mobileLast15Days, color: 'rgb(173, 216, 230)' },
          { name: 'Uploaded Before 15 Days', data: mobileBefore15Days, color: 'rgb(255, 0, 0)' }
        ]
     :  [
        { name: 'Total Works', data: nosworks, color: '#0000FF' },
        { name: 'Total Today', data: totalToday, color: 'rgb(0, 128, 0)' },
        { name: 'Total In Last 7 Days', data: totalInLast7Days, color: 'rgb(144, 238, 144)' },
        { name: 'Total Last 15 Days', data: totalInLast15Days, color: 'rgb(173, 216, 230)' },
        { name: 'Total Before 15 Days', data: totalBefore15Days, color: 'rgb(255, 0, 0)' }
      ]
      this.chartOptions.xaxis = { categories: divisionName };
      this.cO = this.chartOptions;
      this.cdr.detectChanges();
    },
    (error: any) => {
      console.error('Error fetching data', error);
    }
  );
}
gatdayPara(){
  switch (this.seriesName) {
    case 'Total Works':
      return this.dayPara=0;
    case 'Uploaded Today':
      return this.dayPara=1;
    case 'Uploaded In Last 7 Days':
      return this.dayPara=7;
    case 'Uploaded Before 15 Days':
      return this.dayPara=15;
    case 'Total In Last 7 Days':
      return this.dayPara=7;
    case 'Total Last 15 Days':
      return this.dayPara=15; 
    case ' Total Before 15 Days':
      return this.dayPara=30; 
    case 'Total Today':
      return this.dayPara=1;
    default:
      return this.dayPara=0; 
  }
}
fetchDataBasedOnChartSelection(divisionID: number, seriesName: string): void {
  // console.log(`Selected divisionID: ${divisionID}, Series: ${seriesName}`);
  // Add your logic to fetch data based on selected warehouse (whid)
  if (this.selectedTabIndex === 0) { this.TotMobile = 'Mobile';}else {this.TotMobile = 'Totale';}
  this.gatdayPara();

  var distid=0, mainSchemeId=0;
  this.spinner.show();
  this.isshow=true;
  var workid=0,dayPara=0,TotMobile=0
  this.api.GetProgressDetailsLatLong(this.DID,divisionID,distid,mainSchemeId,workid,this.dayPara,this.TotMobile).subscribe(
    (res: any) => {
          // Process the API response and map latitude and longitude to positions
          this.progressdetailsLatLong = res.map((item: any) => ({
            ...item,
            position: {
              lat: parseFloat(item.latitude),
              lng: parseFloat(item.longitude),
            },
          }));
          this.spinner.hide();
          console.log('Fetched markers:', this.progressdetailsLatLong);
        },
    (error) => {
      console.error('Error fetching drop info:', error);
  // this.toastr.error('Failed to load warehouse data');
    }
  );

}


GetprogressdetailsLatLong() {
    try {
      var divisionId='D1017', distid=0, mainSchemeId=0
      var workid=0,dayPara=0,TotMobile=0
      this.api.GetProgressDetailsLatLong(this.DID,divisionId,distid,mainSchemeId,workid,dayPara,TotMobile).subscribe(
        (res: any) => {
          // this.progressdetailsLatLong = res;
          this.progressdetailsLatLong = res.map((item: any) => ({
            ...item,
            position: {
              lat: parseFloat(item.latitude),
              lng: parseFloat(item.longitude),
            },
          }));
          console.log('res=', JSON.stringify( this.progressdetailsLatLong));
        },
        (error) => {
          console.error('Error fetching drop info:', error);
      // this.toastr.error('Failed to load warehouse data');
        }
      );
    } catch (ex: any) {
      alert(ex.message);
    }
  }
  getmain_scheme() {
    try {
      this.api.getMainScheme(this.isall).subscribe(
        (res: any) => {
          this.mainscheme = res;
        },
        (error) => {
          alert(JSON.stringify(error));
        }
      );
    } catch (ex: any) {
      alert(ex.message);
    }
  }
  // GetDivisionPrograss(){
  //   try {
  //     let DID=5001;
  //     this.api.GetProgressCount(DID).subscribe(
  //       (res: any) => {
  //         this.divisionprograss = res;
  //         console.log('responce:', this.divisionprograss);
  //       },
  //       (error) => {
  //         alert(JSON.stringify(error));
  //       }
  //     );
  //   } catch (ex: any) {
  //     alert(ex.message);
  //   }
  // }


//#endregion
//#region 


selectedTabValue(event: any): void {
  this.selectedTabIndex = event.index;
  if (this.selectedTabIndex === 0) {
  this.loadData();
  } else {
  this.loadData();
  }
}
  onselect_mainscheme_data(value:any, triggerValue:any){
  this.SchemeId =value;
  this.loadData();
  // alert(  this.SchemeId )
  }
 
  //#endregion
 
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  
  
  
  markerDragEnd(m: any,event:any) {
    console.log('dragEnd', m, );
  }


  // getMarkers() {
  //   // this.api.GetProgressDetailsLatLong('DID', 'divisionID', 'distid', 'mainSchemeId').subscribe(
  //   //   (res: any[]) => {
  //   //     // Transform API response to Marker array
  //       this.markers = this.markerss.map((item) => ({
  //         workId: item.workId,
  //         latitude: item.latitude,
  //         longitude: item.longitude,
  //         workName: item.workName,
  //         pRemarks: item.pRemarks,
  //         position: { lat: parseFloat(item.latitude), lng: parseFloat(item.longitude) },
  //       }));
  //   //     console.log('Markers:', this.markers);
  //   //   },
  //   //   (error) => {
  //   //     console.error('Error fetching marker data:', error);
  //   //   }
  //   // );
  // }
 
  onMarkerClick(progressdetails: any, marker: MapMarker) {
    // this.progressdetails = progressdetails;
    if (this.infoWindow) {
      this.infoWindow.open(marker); // Open the InfoWindow at the clicked marker
    } else {
      alert('InfoWindow instance not found');
    }
   
  }
}