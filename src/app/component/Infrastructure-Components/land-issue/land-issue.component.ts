import { CommonModule, NgFor, NgStyle } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
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
import { ASFile, LandIssueDetails, LIPendingTotal } from 'src/app/Model/DashProgressCount';
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
  selector: 'app-land-issue',
  standalone: true,
  imports: [NgApexchartsModule, MatSortModule, MatPaginatorModule, MatTableModule, MatTableExporterModule, MatInputModule, MatDialogModule,
    MatFormFieldModule, NgbModule, MatMenuModule, NgFor, CommonModule,
    NgStyle,],
  templateUrl: './land-issue.component.html',
  styleUrl: './land-issue.component.css'
})
export class LandIssueComponent {
  LIPendingTotalData: LIPendingTotal[] = [];
  LIPendingSchemeData: LIPendingTotal[] = [];
  LIPendingDistrictData: LIPendingTotal[] = [];
   ASFileData: ASFile[] = [];
  divisionid: any;
  Scheme = 'Scheme';
  Total = 'Total';
  Contractor = 'Contractor';
  District = 'District'

  //#region chart Variable Declarations
  @ViewChild('chart') chart: ChartComponent | undefined;
  public cO: Partial<ChartOptions> | undefined;
  chartOptions!: ChartOptions; // For bar chart
  chartOptions2!: ChartOptions; // For bar chart
  chartOptionsLine!: ChartOptions; // For bar chart
  idMap: { [key: string]: number } = {};
  //#endregion
  //#region data Table
  @ViewChild('itemDetailsModal') itemDetailsModal: any;
  dispatchPendings: LandIssueDetails[] = [];
  dataSource!: MatTableDataSource<LandIssueDetails>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  districtid: any;
  //#endregion
  constructor(public api: ApiService, public spinner: NgxSpinnerService, private cdr: ChangeDetectorRef, private modalService: NgbModal, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<LandIssueDetails>([]);
  }

  ngOnInit() {
    // Initialize dateRange with today and tomorrow
    this.initializeChartOptions();
    this.LOPendingTotal();
    this.LOPendingScheme();
    this.LOPendingDistrict();
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
              const apiData = this.LIPendingTotalData;  // Replace with the actual data source or API response
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
        // height: 'auto',
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
        // height: 'auto',
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
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  //#region API get DATA
  LOPendingTotal(): void {
    // const roleName = localStorage.getItem('roleName');
    // this.divisionid = roleName === 'Division' ? sessionStorage.getItem('divisionID') : 0;
    // const districtid = 0;

    var roleName = localStorage.getItem('roleName');
    // alert( roleName )
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

    this.api.GetLIPendingTotal(this.Total, this.divisionid,this.districtid).subscribe(
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
              { name: 'No. of  Pending Works', data: totalWorks, color: '#eeba0b' },
              { name: 'Value (In cr)', data: valuecr },
              { name: 'Tender value(In cr)', data: tvcValuecr, color: '#6a6afd' },
              { name: 'Month 2 Above', data: month2Above,color:'rgb(255, 140, 0)' },
              { name: 'WO. Issued', data: woIssued, color: 'rgb(250, 87, 149)' },
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
    // const roleName = localStorage.getItem('roleName');
    // this.divisionid = roleName === 'Division' ? sessionStorage.getItem('divisionID') : 0;
    // const districtid = 0;
    // if (roleName == 'Division') {
    //   this.chartOptions2.chart.height = '500px';
    // } else {
    //   this.chartOptions2.chart.height = '800';
    // }

    var roleName = localStorage.getItem('roleName');
    if (roleName == 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      this.chartOptions2.chart.height = '500px';
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
    this.api.GetLIPendingTotal(this.Scheme, this.divisionid,this.districtid).subscribe(
      (data: any) => {
        if (Array.isArray(data) && data.length > 0) {
          this.LIPendingSchemeData = data;
          console.log('LIPendingSchemeData', this.LIPendingSchemeData);
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
    // const roleName = localStorage.getItem('roleName');
    // this.divisionid = roleName === 'Division' ? sessionStorage.getItem('divisionID') : 0;
    // const districtid = 0;
    // if (roleName == 'Division') {
    //   this.chartOptionsLine.chart.height = '600px';
    // } else {
    //   this.chartOptionsLine.chart.height = '1500';
    // }
    var roleName = localStorage.getItem('roleName');
    if (roleName == 'Division') {
      this.divisionid = sessionStorage.getItem('divisionID');
      this.chartOptions2.chart.height = '500px';
      this.districtid = 0;
    } else if (roleName == 'Collector') {
     this.districtid = sessionStorage.getItem('himisDistrictid');
     this.chartOptions.chart.height = '200px';
      this.divisionid=0;
    }
    else {
      this.districtid = 0;
      this.divisionid=0;
      this.chartOptions.chart.height = 'auto';
    }
    this.api.GetLIPendingTotal(this.District, this.divisionid,this.districtid).subscribe(
      (data: any) => {
        if (Array.isArray(data) && data.length > 0) {
          this.LIPendingDistrictData = data;
          console.log('LIPendingDistrictData', this.LIPendingDistrictData);
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
    // console.log(`Selected ID: ${divisionID}, Series: ${seriesName}`);
    const distid = 0;
    const mainSchemeId = 0;
    // var roleName = localStorage.getItem('roleName');
    // if (roleName == 'Division') {
    //   this.chartOptions.chart.height = '50px';
    //   alert("divi")
    //   // this.divisionid = sessionStorage.getItem('divisionID');
    // } else {
    //       this.chartOptions.chart.height ='1500';
    //      } 
    this.spinner.show();
    this.api.GetLandIssueDetails(divisionID, mainSchemeId, distid).subscribe(
      (res) => {
        this.dispatchPendings = res.map((item: any, index: any) => ({
          ...item,
          sno: index + 1
        }));
        debugger;
        this.dataSource.data = this.dispatchPendings;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(' this.dataSource.data =', this.dataSource.data );
        console.log('this.dataSource1.paginator ', this.paginator );
        console.log(' this.dataSource.sort', this.sort );

        this.cdr.detectChanges();
        this.spinner.hide();
      },
      (error) => {
        console.error('Error fetching data', error);
      }
      );
      this.openDialog();
  }
  fetchDataBasedOnChartSelectionmainScheme(mainSchemeId: any, seriesName: string): void {
    //  console.log(`Selected ID: ${mainSchemeId}, Series: ${seriesName}`);
    const distid = 0;
    const roleName = localStorage.getItem('roleName');
    this.divisionid = roleName === 'Division' ? sessionStorage.getItem('divisionID') : 0;

    this.spinner.show();
    this.api.GetLandIssueDetails(this.divisionid, mainSchemeId, distid).subscribe(
      (res) => {
        this.dispatchPendings = res.map((item: LandIssueDetails, index: number) => ({
          ...item,
          sno: index + 1
        }));
        this.dataSource.data = this.dispatchPendings;
        
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // console.log('this.dataSource1.paginator ',this.dataSource1.paginator );
        this.cdr.detectChanges();
        this.spinner.hide();
      },
      (error) => {
        console.error('Error fetching data', error);
      }
      );
      this.openDialog();
  }

  fetchDataBasedOnChartSelectionDistrict(distid: any, seriesName: string): void {
    const mainSchemeId = 0;
    const roleName = localStorage.getItem('roleName');
    this.divisionid = roleName === 'Division' ? sessionStorage.getItem('divisionID') : 0;

    this.spinner.show();
    this.api.GetLandIssueDetails(this.divisionid, mainSchemeId, distid).subscribe(
      (res) => {
        this.dispatchPendings = res.map((item: LandIssueDetails, index: number) => ({
          ...item,
          sno: index + 1
        }));
        this.dataSource.data = this.dispatchPendings;
        // console.log('this.dataSource.data',this.dataSource.data);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.cdr.detectChanges();
        this.spinner.hide();
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
    this.openDialog();

  }
  // data filter
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
      { title: "S.No", dataKey: "sno" },
      { title: "letterNo", dataKey: "letterNo" },
      { title: "head", dataKey: "head" },
      { title: "acceptLetterDT", dataKey: "acceptLetterDT" },
      { title: "totalAmountOfContract", dataKey: "totalAmountOfContract" },
      { title: "district", dataKey: "district" },
      { title: "work", dataKey: "work" },
      { title: "contractorNAme", dataKey: "contractorNAme" },
      { title: "work_id", dataKey: "work_id" }
    ];
    const rows = this.dispatchPendings.map(row => ({
      sno: row.sno,
      letterNo: row.letterNo,
      head: row.head,
      acceptLetterDT: row.acceptLetterDT,
      totalAmountOfContract: row.totalAmountOfContract,
      district: row.district,
      work: row.work,
      contractorNAme: row.contractorNAme,
      work_id: row.work_id,
    }));

    autoTable(doc, {
      columns: columns,
      body: rows,
      startY: 20,
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] }
    });

    doc.save('WorkOrderPending.pdf');
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
