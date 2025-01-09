import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
import { AEDistrictEngAllotedWorks,DistrictEngAllotedWorks,AEEngAllotedWorks, SbuEngAllotedWorks } from 'src/app/Model/DashProgressCount';
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
  selector: 'app-engineer-works',
  standalone: true,
  imports: [NgApexchartsModule,MatSortModule, MatPaginatorModule,MatTableModule,MatTableExporterModule, MatInputModule,MatDialogModule,
    MatFormFieldModule,NgbModule, MatMenuModule],
  templateUrl: './engineer-works.component.html',
  styleUrl: './engineer-works.component.css'
})
export class EngineerWorksComponent {
  engtype='Sube';
  // engtype=
// divisionid='D1004';
divisionid:any;
distid=0
  @ViewChild('chart') chart: ChartComponent | undefined;
  public cO: Partial<ChartOptions> | undefined;
  chartOptions: ChartOptions; // For bar chart
  chartOptions2: ChartOptions; // For bar chart
  chartOptionsLine: ChartOptions; // For bar chart
  chartOptionsLine2: ChartOptions; // For bar chart
  districtEngAllotedWorks:DistrictEngAllotedWorks[]=[];
  aeDistrictEngAllotedWorks:AEDistrictEngAllotedWorks[]=[];
  SbuEngAllotedWorks:SbuEngAllotedWorks[]=[];
  AeengAllotedWorks:AEEngAllotedWorks[]=[];
  whidMap: { [key: string]: number } = {};
constructor(public api: ApiService, public spinner: NgxSpinnerService,private cdr: ChangeDetectorRef, private fb: FormBuilder,
  public datePipe: DatePipe, private modalService: NgbModal,private dialog: MatDialog, private toastr: ToastrService,){
  this.chartOptions = {
    series: [],
    chart: {
      stacked: true,
      type: 'bar',
      height: 'auto',
      // height: '100%' ,
      // height: 400,
      // width:600,
      events: {
        dataPointSelection: (
          event,
          chartContext,
          { dataPointIndex, seriesIndex }
        ) => {
          const selectedCategory = this.chartOptions?.xaxis?.categories?.[dataPointIndex];  // This is likely just the category name (a string)
          const selectedSeries = this.chartOptions?.series?.[seriesIndex]?.name;

//#region  condtion wise chart height 
          // // this.chartOptions.chart.height = roleName ? '400px' : 'auto', 

          // var roleName = localStorage.getItem('roleName');
          // // alert( roleName )
          // if (roleName == 'Division') {
          //   // return 
          //   this.chartOptions.chart.height = '300px';
          //   // this.showDivision=false;
          // } else {
          //   // return
          //    this.chartOptions.chart.height ='auto';
          //   // return this.chartOptions.chart.height = roleName ? '400px' : 'auto';
        
          // }


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
          //#endregion
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
      text: 'DistrictEng SB Alloted  Total Works wise Progress',
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
      // height: 400,
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
      text: 'DistrictEng AE Alloted  Total Works  wise Progress',
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
  this.chartOptionsLine = {
    series: [],
    chart: {
      type: 'bar',
      stacked: true,
      height: 'auto',
      // height: 400,
      // width:600,
      events: {
        dataPointSelection: (
          event,
          chartContext,
          { dataPointIndex, seriesIndex }
        ) => {
          const selectedCategory = this.chartOptionsLine?.xaxis?.categories?.[dataPointIndex];  // This is likely just the category name (a string)
          const selectedSeries = this.chartOptionsLine?.series?.[seriesIndex]?.name;
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
      text: 'Eng SbuEng Alloted Total Works  wise Progress',
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
      height: 'auto',
      // height: 400,
      // width:600,
      events: {
        dataPointSelection: (
          event,
          chartContext,
          { dataPointIndex, seriesIndex }
        ) => {
          const selectedCategory = this.chartOptionsLine2?.xaxis?.categories?.[dataPointIndex];  // This is likely just the category name (a string)
          const selectedSeries = this.chartOptionsLine2?.series?.[seriesIndex]?.name;
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
      text: 'Eng AE Alloted  Total Works  wise Progress',
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
 this.GetDistrictEngAllotedWorks();
 this.GetAEDistrictEngAllotedWorks();
 this.getSBUENDistrictEngAllotedWorks();
 this.GetAEENGDistrictEngAllotedWorks();
}

GetDistrictEngAllotedWorks(): void {
  // https://cgmsc.gov.in/HIMIS_APIN/api/Work/DistrictEngAllotedWorks?engtype=Sube&divisionid=D1004&distid=0
  var roleName = localStorage.getItem('roleName');
  // alert( roleName )
  if (roleName == 'Division') {
    this.divisionid = sessionStorage.getItem('divisionID');
    // this.showDivision=false;
  } else {
    this.divisionid = 0;
  }
  this.divisionid = this.divisionid == 0 ? 0 : this.divisionid;
  this.spinner.show();
  this.api.SubeDistrictEngAllotedWorks(this.engtype,this.divisionid,this.distid).subscribe(
    (data: any) => {
                this.districtEngAllotedWorks = data;
      // console.log('districtEngAllotedWorks',this.districtEngAllotedWorks);
      const id: string[] = [];
      const districtID: string[] = [];
      const empid: string[] = [];
      const engName: string[] = [];
      const districtName: any[] = [];
      const totalWorks: number[] = [];
      const tvcValuecr: number[] = [];
      const woIssue: any[] = [];
      const running: any[] = [];
      const ladissue: any[] = [];
      this.whidMap = {}; // Initialize the mmidMap
      // console.log('API Response total:', data);
      data.forEach((item: {
        engName: string; id: any; totalWorks: any; districtID: any;
        empid: any;districtName:any;tvcValuecr:any;woIssue:any;running:any;ladissue:any;
      }) => {
        id.push(item.id);
        engName.push(item.engName);
        totalWorks.push(item.totalWorks);
        tvcValuecr.push(item.tvcValuecr);
        districtID.push(item.districtID);
        empid.push(item.empid);
        districtName.push(item.districtName);
        woIssue.push(item.woIssue);
        running.push(item.running);
        ladissue.push(item.ladissue);

        // console.log('name:', item.name, 'id:', item.id);
        if (item.districtName && item.id) {
          this.whidMap[item.districtName] = item.id;
        } else {
          console.warn('Missing whid for handover Abstract :', item.districtName);
        }
      });
      
      this.chartOptions.series = [
        {name: 'Total Works', data: totalWorks,color:'#eeba0b'} ,
        { name: 'Running', data: running}, 
        { name: 'TVC Value cr',data: tvcValuecr, color: 'rgb(0, 143, 251)'  },
        { name: 'Lad Issue',data: ladissue },
        { name: 'WoIssue',data: woIssue,color: '#db0413'},];

      this.chartOptions.xaxis = { categories: districtName };
      this.cO = this.chartOptions;
      this.cdr.detectChanges();

      this.spinner.hide();

    },
    (error: any) => {
      console.error('Error fetching data', error);
    }
  );
}
GetAEDistrictEngAllotedWorks(): void {
  // https://cgmsc.gov.in/HIMIS_APIN/api/Work/DistrictEngAllotedWorks?engtype=Sube&divisionid=D1004&distid=0
  var roleName = localStorage.getItem('roleName');
  // alert( roleName )
  if (roleName == 'Division') {
    this.divisionid = sessionStorage.getItem('divisionID');
    // this.showDivision=false;
  } else {
    this.divisionid = 0;
  }
  this.divisionid = this.divisionid == 0 ? 0 : this.divisionid;
  this.spinner.show();
  this.api.AEDistrictEngAllotedWorks('AE',this.divisionid,this.distid).subscribe(
    (data: any) => {
                this.aeDistrictEngAllotedWorks = data;
      // console.log('districtEngAllotedWorks',this.districtEngAllotedWorks);
      const id: string[] = [];
      const districtID: string[] = [];
      const empid: string[] = [];
      const engName: string[] = [];
      const districtName: any[] = [];
      const totalWorks: number[] = [];
      const tvcValuecr: number[] = [];
      const woIssue: any[] = [];
      const running: any[] = [];
      const ladissue: any[] = [];
      this.whidMap = {}; // Initialize the mmidMap
      // console.log('API Response total:', data);
      data.forEach((item: {
        engName: string; id: any; totalWorks: any; districtID: any;
        empid: any;districtName:any;tvcValuecr:any;woIssue:any;running:any;ladissue:any;
      }) => {
        id.push(item.id);
        engName.push(item.engName);
        totalWorks.push(item.totalWorks);
        tvcValuecr.push(item.tvcValuecr);
        districtID.push(item.districtID);
        empid.push(item.empid);
        districtName.push(item.districtName);
        woIssue.push(item.woIssue);
        running.push(item.running);
        ladissue.push(item.ladissue);

        // console.log('name:', item.name, 'id:', item.id);
        if (item.districtName && item.id) {
          this.whidMap[item.districtName] = item.id;
        } else {
          console.warn('Missing whid for handover Abstract :', item.districtName);
        }
      });
      
      this.chartOptions2.series = [
        {name: 'Total Works', data: totalWorks,color:'#eeba0b'} ,
        { name: 'Running', data: running}, 
        { name: 'TVC Value cr',data: tvcValuecr, color: 'rgb(0, 143, 251)'  },
        { name: 'Lad Issue',data: ladissue },
        { name: 'WoIssue',data: woIssue,color: '#db0413'},];

      this.chartOptions2.xaxis = { categories: districtName };
      this.cO = this.chartOptions2;
      this.cdr.detectChanges();

      this.spinner.hide();

    },
    (error: any) => {
      console.error('Error fetching data', error);
    }
  );
}
getSBUENDistrictEngAllotedWorks(): void {
  debugger
  // https://cgmsc.gov.in/HIMIS_APIN/api/Work/DistrictEngAllotedWorks?engtype=Sube&divisionid=D1004&distid=0
  var roleName = localStorage.getItem('roleName');
  // alert( roleName )
  if (roleName == 'Division') {
    this.divisionid = sessionStorage.getItem('divisionID');
    // this.showDivision=false;
  } else {
    this.divisionid = 0;
  }
  this.divisionid = this.divisionid == 0 ? 0 : this.divisionid;
  this.spinner.show();
  this.api.SbuEngAllotedWorks('Sbu eng',this.divisionid,this.distid).subscribe(
    (data: any) => {
                this.SbuEngAllotedWorks = data;
      console.log('SbuenDistrictEngAllotedWorks',this.SbuEngAllotedWorks);
     

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
        if (item.name && item.id) {
          this.whidMap[item.name] = item.id;
        } else {
          console.warn('Missing whid for handover Abstract :', item.name);
        }
      });
      
      this.chartOptionsLine.series = [
        {name: 'Total Works', data: totalWorks,color:'#eeba0b'} ,
        { name: 'Running', data: running}, 
        { name: 'TVC Value cr',data: tvcValuecr, color: 'rgb(0, 143, 251)'  },
        { name: 'Lad Issue',data: ladissue },
        { name: 'WoIssue',data: woIssue,color: '#db0413'},];

      this.chartOptionsLine.xaxis = { categories: name };
      this.cO = this.chartOptionsLine;
      this.cdr.detectChanges();

      this.spinner.hide();

    },
    (error: any) => {
      console.error('Error fetching data', error);
    }
  );
}
GetAEENGDistrictEngAllotedWorks(): void {
  // https://cgmsc.gov.in/HIMIS_APIN/api/Work/DistrictEngAllotedWorks?engtype=Sube&divisionid=D1004&distid=0
  var roleName = localStorage.getItem('roleName');
  // alert( roleName )
  if (roleName == 'Division') {
    this.divisionid = sessionStorage.getItem('divisionID');
    // this.showDivision=false;
  } else {
    this.divisionid = 0;
  }
  this.divisionid = this.divisionid == 0 ? 0 : this.divisionid;
  this.spinner.show();
  this.api.AEEngAllotedWorks('AE eng',this.divisionid,this.distid).subscribe(
    (data: any) => {
                this.AeengAllotedWorks = data;
      console.log('AeengDistrictEngAllotedWorks',this.AeengAllotedWorks);
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
        if (item.name && item.id) {
          this.whidMap[item.name] = item.id;
        } else {
          console.warn('Missing whid for handover Abstract :', item.name);
        }
      });
      
      this.chartOptionsLine2.series = [
        {name: 'Total Works', data: totalWorks,color:'#eeba0b'} ,
        { name: 'Running', data: running}, 
        { name: 'TVC Value cr',data: tvcValuecr, color: 'rgb(0, 143, 251)'  },
        { name: 'Lad Issue',data: ladissue },
        { name: 'WoIssue',data: woIssue,color: '#db0413'},];

      this.chartOptionsLine2.xaxis = { categories: name };
      this.cO = this.chartOptionsLine2;
      this.cdr.detectChanges();

      this.spinner.hide();

    },
    (error: any) => {
      console.error('Error fetching data', error);
    }
  );
}

getChartHeight():any {
  var roleName = localStorage.getItem('roleName');
  // alert( roleName )
  if (roleName == 'Division') {
    // return 
    this.chartOptions.chart.height = '400px';
    // this.showDivision=false;
  } else {
    // return
     this.chartOptions.chart.height ='auto';
    // return this.chartOptions.chart.height = roleName ? '400px' : 'auto';

  }
  // this.divisionid = this.divisionid == 0 ? 0 : this.divisionid;
  // const condition = /* your condition here */;
  // return condition ? '500px' : 'auto'; // Return 'auto' or a fixed height based on the condition
}
}

