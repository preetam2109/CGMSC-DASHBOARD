import { CommonModule, NgFor, NgStyle } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
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
import { LIPendingTotal } from 'src/app/Model/DashProgressCount';
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
  selector: 'app-land-issue',
  standalone: true,
  imports: [NgApexchartsModule,MatSortModule, MatPaginatorModule,MatTableModule,MatTableExporterModule, MatInputModule,MatDialogModule,
    MatFormFieldModule,NgbModule, MatMenuModule, NgFor,CommonModule,
    NgStyle,],
  templateUrl: './land-issue.component.html',
  styleUrl: './land-issue.component.css'
})
export class LandIssueComponent {
  LIPendingTotalData:LIPendingTotal[]=[];
  LIPendingSchemeData:LIPendingTotal[]=[];
  LIPendingDistrictData:LIPendingTotal[]=[];
  divisionid:any;
  Scheme='Scheme';
  Total='Total';
  Contractor='Contractor';
  District='District'
  
  //#region chart Variable Declarations
  @ViewChild('chart') chart: ChartComponent | undefined;
  public cO: Partial<ChartOptions> | undefined;
  chartOptions: ChartOptions; // For bar chart
  chartOptions2: ChartOptions; // For bar chart
  chartOptionsLine: ChartOptions; // For bar chart
  idMap: { [key: string]: number } = {};
//#endregion
 
  constructor(public api: ApiService, public spinner: NgxSpinnerService,private cdr: ChangeDetectorRef,private modalService: NgbModal,private dialog: MatDialog){
    this.chartOptions = {
      series: [],
      chart: {
        type: 'bar',
        stacked: true,
        height: 'auto',
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
              const apiData = this.LIPendingTotalData;  // Replace with the actual data source or API response
              // Find the data in your API response that matches the selectedCategory
              const selectedData = apiData.find((data) => data.name === selectedCategory);
              console.log("selectedData chart1",selectedData)
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
        text: 'Total Pending  Works Total wise Progress',
        // text: 'RP Type Total Pending Works wise Progress',
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
        // height: 600,
        height: 'auto',
        // width:600,
       events: {
          dataPointSelection: (
            event,
            chartContext,
            { dataPointIndex, seriesIndex }
          ) => {
            if (dataPointIndex !== undefined && seriesIndex !== undefined) {
              const selectedCategory = this.chartOptions2?.xaxis?.categories?.[dataPointIndex];
              const selectedSeries = this.chartOptions2?.series?.[seriesIndex]?.name;
          
              if (selectedCategory && selectedSeries) {
                const apiData = this.LIPendingSchemeData;
                // console.log('datasch:', apiData);
              
                if (Array.isArray(apiData)) {
                  // const selectedData = apiData.find((data) =>
                  //   data.name.trim().toLowerCase() === selectedCategory.trim().toLowerCase()   );
                  const selectedData = apiData.find((data) => data.name === selectedCategory);
              // console.log("selectedData chart1",selectedData);
               
              
                  if (selectedData) {
                    const id = selectedData.id;
                    this.fetchDataBasedOnChartSelectionmainScheme(id, selectedSeries);
                  } else {
                    console.error(`No data found for selected category: ${selectedCategory}`);
                  }
                } else {
                  console.error('API Data is not an array:', apiData);
                }
              } else {
                console.error('Selected category or series is invalid.');
              }
              
            } else {
              console.log('Invalid data point or series index.');
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
        text: 'Total Pending Works Scheme wise Progress',
        // text: 'RP Type Total Pending Works wise Progress',
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
        // height: 600,
        height: 'auto',
        // width:600,
       events: {
          dataPointSelection: (
            event,
            chartContext,
            { dataPointIndex, seriesIndex }
          ) => {
            if (dataPointIndex !== undefined && seriesIndex !== undefined) {
              const selectedCategory = this.chartOptionsLine?.xaxis?.categories?.[dataPointIndex];
              const selectedSeries = this.chartOptionsLine?.series?.[seriesIndex]?.name;
          
              if (selectedCategory && selectedSeries) {
                const apiData = this.LIPendingDistrictData;
                // console.log('datasch:', apiData);
              
                if (Array.isArray(apiData)) {
                  const selectedData = apiData.find((data) => data.name === selectedCategory);
              // console.log("selectedData chart1",selectedData);
               
              
                  if (selectedData) {
                    const id = selectedData.id;
                    this.fetchDataBasedOnChartSelectionDistrict(id, selectedSeries);
                  } else {
                    console.error(`No data found for selected category: ${selectedCategory}`);
                  }
                } else {
                  console.error('API Data is not an array:', apiData);
                }
              } else {
                console.error('Selected category or series is invalid.');
              }
              
            } else {
              console.log('Invalid data point or series index.');
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
        text: 'Total Pending Works District wise Progress',
        // text: 'RP Type Total Pending Works wise Progress',
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
    // this.chartOptionsLine= {
    //   series: [],
    //   chart: {
    //     type: 'bar',
    //     stacked: true,
    //     // height: 400,
    //     height: 'auto',

        
    //     // events: {
          
    //     //   dataPointSelection: (
    //     //     event,
    //     //     chartContext,
    //     //     { dataPointIndex, seriesIndex }
    //     //   ) => {
    //     //     const selectedCategory = this.chartOptionsLine?.xaxis?.categories?.[dataPointIndex];  // This is likely just the category name (a string)
    //     //     const selectedSeries = this.chartOptionsLine?.series?.[seriesIndex]?.name;
    //     //     // Ensure the selectedCategory and selectedSeries are valid
    //     //     if (selectedCategory && selectedSeries) {
    //     //       const apiData = this.LIPendingDistrictData;  // Replace with the actual data source or API response
    //     //       // Find the data in your API response that matches the selectedCategory
    //     //       const selectedData = apiData.find((data) => data.name === selectedCategory);
    //     //       // console.log("selectedData chart1",selectedData)
    //     //       if (selectedData) {
    //     //         const id = selectedData.id;  // Extract the id from the matching entry

    //     //         this.fetchDataBasedOnChartSelectionmainDistrict(id, selectedSeries);

    //     //       } else {
    //     //         console.log(`No data found for selected category: ${selectedCategory}`);
    //     //       }
    //     //     } else {
    //     //       console.log('Selected category or series is invalid.');
    //     //     }
    //     //   }
    //     // },
    //     events: {
    //       dataPointSelection: (
    //         event,
    //         chartContext,
    //         { dataPointIndex, seriesIndex }
    //       ) => {
    //         if (dataPointIndex !== undefined && seriesIndex !== undefined) {
    //           const selectedCategory = this.chartOptionsLine?.xaxis?.categories?.[dataPointIndex];
    //           const selectedSeries = this.chartOptionsLine?.series?.[seriesIndex]?.name;
          
    //           if (selectedCategory && selectedSeries) {
    //             const apiData = this.LIPendingDistrictData;
    //             // console.log('datasch:', apiData);
              
    //             if (Array.isArray(apiData)) {
    //               // const selectedData = apiData.find((data) =>
    //               //   data.name.trim().toLowerCase() === selectedCategory.trim().toLowerCase()   );
    //               const selectedData = apiData.find((data) => data.name === selectedCategory);
    //           // console.log("selectedData chart1",selectedData);
               
              
    //               if (selectedData) {
    //                 const id = selectedData.id;
    //                 this.fetchDataBasedOnChartSelectionDistrict(id, selectedSeries);
    //               } else {
    //                 console.error(`No data found for selected category: ${selectedCategory}`);
    //               }
    //             } else {
    //               console.error('API Data is not an array:', apiData);
    //             }
    //           } else {
    //             console.error('Selected category or series is invalid.');
    //           }
              
    //         } else {
    //           console.log('Invalid data point or series index.');
    //         }
    //       }
          
    //     },

    //   },
    //   plotOptions: {
    //     bar: {
    //       horizontal: true,
    //     },
    //   },
    //   xaxis: {
    //     categories: [],
    //   },
    //   yaxis: {
    //     title: {
    //       text: undefined,
    //     },
    //   },
    //   dataLabels: {
    //     enabled: true,
    //     style: {
    //       // colors: ['#FF0000']
    //       colors: ['#000']
    //     }
    //   },
    //   stroke: {
    //     width: 1,
    //     // colors: ['#000'],
    //     colors: ['#fff'],
    //   },
    //   title: {
    //     text: 'Total Pending  Works District wise Progress',
    //     align: 'center',
    //     style: {
    //       fontSize: '12px',
    //       // color: '#000'
    //       color: '#6e0d25'
    //     },
    //   },
    //   tooltip: {
    //     y: {
    //       formatter: function (val: any) {
    //         return val.toString();
    //       },
    //     },
    //   },
    //   fill: {
    //     opacity: 1,
    //   },
    //   legend: {
    //     position: 'top',
    //     horizontalAlign: 'center',
    //     offsetX: 40,
    //   },
    // };
    this.LOPendingTotal();
    this.LOPendingScheme();
    this.LOPendingDistrict();
  }

  // this.api.GetLIPendingTotal(this.Total, this.divisionid, districtid).subscribe(
  //   (data: any) => {
  //     if (Array.isArray(data) && data.length > 0) {
  //       const name: string[] = [];
  //       // Process data to fill `name` and other arrays
  //       this.chartOptions.xaxis = { categories: name };
  //       this.chartOptions.series = [
  //         { name: 'Total Pending Works', data: totalWorks, color: '#eeba0b' },
  //         // Other series data...
  //       ];
  //       this.cdr.detectChanges(); // Update the chart
  //     } else {
  //       console.warn('API returned empty or invalid data');
  //     }
  //     this.spinner.hide();
  //   },
  //   (error: any) => {
  //     console.error('Error fetching data', error);
  //     this.spinner.hide();
  //   }
  // );
 
//#region API get DATA
LOPendingTotal(): void {
  this.spinner.show();
  const roleName = localStorage.getItem('roleName');
  this.divisionid = roleName === 'Division' ? sessionStorage.getItem('divisionID') : 0;
  const districtid = 0;
  this.api.GetLIPendingTotal(this.Total, this.divisionid, districtid).subscribe(
    (data: any) => {
      if (Array.isArray(data) && data.length > 0) {
        this.LIPendingTotalData = data;
        const name: string[] = [];
        const totalWorks: any[] = [];
        const valuecr: number[] = [];
        const tvcValuecr: any[] = [];
        const month2Above: any[] = [];
        const woIssued: any[] = [];

        data.forEach((item: any) => {
          if (item) {
            name.push(item.name ?? '');
            totalWorks.push(item.totalWorks ?? 0);
            valuecr.push(item.valuecr ?? 0);
            tvcValuecr.push(item.tvcValuecr ?? 0);
            month2Above.push(item.month2Above ?? 0);
            woIssued.push(item.woIssued ?? 0);
          }
        });

        if (name.length > 0) {
          this.chartOptions.series = [
            { name: 'Total Pending Works', data: totalWorks, color: '#eeba0b' },
            { name: 'Value cr', data: valuecr },
            { name: 'TVC Value cr', data: tvcValuecr, color: 'rgb(0, 143, 251)' },
            { name: 'Month 2 Above', data: month2Above },
            { name: 'Wo Issued', data: woIssued, color: 'rgb(0, 143, 251)' },
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
LOPendingScheme(): void {
  this.spinner.show();
  const roleName = localStorage.getItem('roleName');
  this.divisionid = roleName === 'Division' ? sessionStorage.getItem('divisionID') : 0;
  const districtid = 0;
// var RPType='Scheme';
  // https://localhost:7247/api/LandIssue/LIPendingTotal?RPType=Scheme&divisionid=0&districtid=0
  this.api.GetLIPendingTotal(this.Scheme, this.divisionid, districtid).subscribe(
    (data: any) => {
      if (Array.isArray(data) && data.length > 0) {
        this.LIPendingSchemeData = data;
        console.log('LIPendingSchemeData',this.LIPendingSchemeData);
        const name: string[] = [];
        const totalWorks: any[] = [];
        const valuecr: number[] = [];
        const tvcValuecr: any[] = [];
        const month2Above: any[] = [];
        const woIssued: any[] = [];

        data.forEach((item: any) => {
          if (item) {
            name.push(item.name ?? '');
            totalWorks.push(item.totalWorks ?? 0);
            valuecr.push(item.valuecr ?? 0);
            tvcValuecr.push(item.tvcValuecr ?? 0);
            month2Above.push(item.month2Above ?? 0);
            woIssued.push(item.woIssued ?? 0);
          }
        });

        if (name.length > 0) {
          this.chartOptions2.series = [
            { name: 'Total Pending Works', data: totalWorks, color: '#eeba0b' },
            { name: 'Value cr', data: valuecr },
            { name: 'TVC Value cr', data: tvcValuecr, color: 'rgb(0, 143, 251)' },
            { name: 'Month 2 Above', data: month2Above },
            { name: 'Wo Issued', data: woIssued, color: 'rgb(0, 143, 251)' },
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
LOPendingDistrict(): void {
  this.spinner.show();
  const roleName = localStorage.getItem('roleName');
  this.divisionid = roleName === 'Division' ? sessionStorage.getItem('divisionID') : 0;
  const districtid = 0;
// var RPType='Scheme';
  // https://localhost:7247/api/LandIssue/LIPendingTotal?RPType=Scheme&divisionid=0&districtid=0
  this.api.GetLIPendingTotal(this.District, this.divisionid, districtid).subscribe(
    (data: any) => {
      if (Array.isArray(data) && data.length > 0) {
        this.LIPendingDistrictData = data;
        console.log('LIPendingDistrictData',this.LIPendingDistrictData);
        const name: string[] = [];
        const totalWorks: any[] = [];
        const valuecr: number[] = [];
        const tvcValuecr: any[] = [];
        const month2Above: any[] = [];
        const woIssued: any[] = [];

        data.forEach((item: any) => {
          if (item) {
            name.push(item.name ?? '');
            totalWorks.push(item.totalWorks ?? 0);
            valuecr.push(item.valuecr ?? 0);
            tvcValuecr.push(item.tvcValuecr ?? 0);
            month2Above.push(item.month2Above ?? 0);
            woIssued.push(item.woIssued ?? 0);
          }
        });

        if (name.length > 0) {
          this.chartOptionsLine.series = [
            { name: 'Total Pending Works', data: totalWorks, color: '#eeba0b' },
            { name: 'Value cr', data: valuecr },
            { name: 'TVC Value cr', data: tvcValuecr, color: 'rgb(0, 143, 251)' },
            { name: 'Month 2 Above', data: month2Above },
            { name: 'Wo Issued', data: woIssued, color: 'rgb(0, 143, 251)' },
          ];

          this.chartOptionsLine.xaxis = { categories: name };
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

//#endregion
fetchDataBasedOnChartSelection(divisionID: any, seriesName: string): void {
  console.log(`Selected ID: ${divisionID}, Series: ${seriesName}`);
  const  distid=0;
  const mainSchemeId=0;
  const contractid=0;
  this.spinner.show();
 
  // this.api.GetLandIssueDetails(divisionID,mainSchemeId,distid,contractid).subscribe(
  //   (res) => {
  //     this.dispatchPendings = res.map((item: WorkOrderPendingDetailsNew, index: number) => ({
  //       ...item,
  //       sno: index + 1
  //     }));
  //     // this.dispatchPendings = res.map((item: WorkOrderPendingDetailsNew, index: number) => ({
  //     //   ...item,
  //     //   sno: index + 1
  //     // }));
  //     // Add serial numbers to the data
  //       this.dispatchPendings = res.map((item, index) => ({
  //         ...item,
  //         sno: index + 1
  //       }));
  //     this.dataSource.data = this.dispatchPendings;
  //     // this.dataSource.data = this.dispatchPendings;
  //     // console.log(this.dataSource.data);
  //     // console.log(this.dispatchPendings);
  //     // console.log(this.dataSource);
  //     // console.log('Data with serial numbers:', this.dispatchPendings); 
  //       // console.log("res ",JSON.stringify(res))
  //       // this.dispatchPendings = res;
  //       // console.log("Welcome ",JSON.stringify(this.dispatchPendings))
  //       // this.dataSource.data = res;
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //     this.cdr.detectChanges();
  //     // this.modalService.open(this.itemDetailsModal, { centered: true,backdrop:false, });
  //     this.openDialog();
  //     this.spinner.hide();
  //   },
  //   (error) => {
  //     console.error('Error fetching data', error);
  //   }
  // );
}
fetchDataBasedOnChartSelectionmainScheme(mainSchemeId: any, seriesName: string): void {
  // console.log(`Selected ID: ${mainSchemeId}, Series: ${seriesName}`);

  const  distid=0;
  // const mainSchemeId=0;
  const divisionID=0;
  const contractid=0;
  this.spinner.show();
 
  // this.api.GetWorkOrderPendingDetailsNew(divisionID,mainSchemeId,distid,contractid).subscribe(
  //   (res) => {
  //     this.dispatchPendings = res.map((item: WorkOrderPendingDetailsNew, index: number) => ({
  //       ...item,
  //       sno: index + 1
  //     }));
  //     console.log('res:',res);
  //     this.dataSource.data = this.dispatchPendings;
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //     this.cdr.detectChanges();
  //     // this.modalService.open(this.itemDetailsModal, { centered: true,backdrop:false, });
  //     // this.openDialogg();
  //     this.openDialog();

  //     this.spinner.hide();
  //   },
  //   (error) => {
  //     console.error('Error fetching data', error);
  //   }
  // );
}

fetchDataBasedOnChartSelectionDistrict(distid: any, seriesName: string): void {
  // console.log(`Selected ID: ${distid}, Series: ${seriesName}`);
  // const  distid=0;
  const mainSchemeId=0;
  const divisionID=0;
  const contractid=0;
  this.spinner.show();
 
  // this.api.GetWorkOrderPendingDetailsNew(divisionID,mainSchemeId,distid,contractid).subscribe(
  //   (res) => {
  //     this.dispatchPendings = res.map((item: WorkOrderPendingDetailsNew, index: number) => ({
  //       ...item,
  //       sno: index + 1
  //     }));
  //     // console.log('wOpendingDistrict table data:',res);
  //     this.dataSource.data = this.dispatchPendings;
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //     this.cdr.detectChanges();
  //     // this.modalService.open(this.itemDetailsModal, { centered: true,backdrop:false, });
  //     // this.openDialogg();
  //     this.openDialog();

  //     this.spinner.hide();
  //   },
  //   (error) => {
  //     console.error('Error fetching data', error);
  //   }
  // );
}
}
