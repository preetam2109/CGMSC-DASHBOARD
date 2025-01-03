import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, ChangeDetectorRef, OnInit } from '@angular/core';
import { DistrictService } from 'src/app/service/district.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexTitleSubtitle,
  ApexYAxis,
  ApexTooltip,
  ApexFill,
  ApexLegend
} from 'ng-apexcharts';
import { Complaints } from 'src/app/Model/Complaints';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
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
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit {

  @ViewChild('chart') chart: ChartComponent | undefined;
  public cO: Partial<ChartOptions> | undefined;
  chartOptions: ChartOptions;

  displayedColumns: string[] = [
    'district', 'location_name', 'item_name',
    'serial_no', 'warrantyValidTill', 'complaint_date', 'complaint_details', 'name',
    'mobile_no'
    , 'solved_date'
  ];

  columnNames: { [key: string]: string } = {
    'district': 'District',
    'location_name': 'Location',
    'item_name': 'Equipment',
    'serial_no': 'Serial',
    'warrantyValidTill': 'Warranty',
    'complaint_date': 'Complaint Date',
    'complaint_details': 'Complaint Details',
    'name': 'Supplier',
    'mobile_no': 'Mobile No'
    ,'solved_date': 'Solved Date'
  };

  dataSource: MatTableDataSource<Complaints>;
  allComplaints: Complaints[] = [];
  selectedSeries: string = 'Total';
  selectedDistrictName: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef,
    private breakpointObserver: BreakpointObserver,
    private route: Router,
    private rcapi: ApiService
  ) {
    this.chartOptions = {
      series: [],
      chart: {
        type: 'bar',
        stacked: true,
        height: 350,
        events: {
          dataPointSelection: (event: any, chartContext: any, config: any) => {
            const selectedDistrict = this.chartOptions.xaxis?.categories[config.dataPointIndex];
            const seriesName =
              config.seriesIndex === 0 ? 'Total' :
              (config.seriesIndex === 1 ? 'Solved' : 'Unsolved');

            this.selectedSeries = seriesName;

            if (seriesName === 'Solved') {
              this.filterSolvedByDistrictWithSpinner(selectedDistrict);
            } else if (seriesName === 'Unsolved') {
              this.filterByDistrictWithSpinner(selectedDistrict);
            } else if (seriesName === 'Total') {
              this.filterTotalByDistrictWithSpinner(selectedDistrict);
            }

            this.updateDisplayedColumns();
          }
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      xaxis: {
        categories: []
      },
      yaxis: {
        title: {
          text: undefined
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      title: {
        text: 'Online Complaint against Warranty Valid Equipment',
        align: 'center',
        style: {
          fontSize: this.getFontSizeBasedOnScreenWidth(),
        },
      },
      tooltip: {
        y: {
          formatter: function (val: any) {
            return val.toString();
          }
        }
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: 'top',
        horizontalAlign: 'center',
        offsetX: 40
      }
    };

    this.loadData();
    this.dataSource = new MatTableDataSource<Complaints>([]);

    this.breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.Tablet,
      Breakpoints.Web
    ]).subscribe(result => {
      if (result.matches) {
        if (this.breakpointObserver.isMatched(Breakpoints.Handset)) {
          this.displayedColumns = ['district', 'location_name', 'item_name', 'serial_no', 'warrantyValidTill',
            'complaint_date', 'complaint_details', 'name', 'mobile_no'];
        } else if (this.breakpointObserver.isMatched(Breakpoints.Tablet)) {
          this.displayedColumns = ['district', 'location_name', 'item_name', 'serial_no', 'warrantyValidTill',
            'complaint_date', 'complaint_details', 'name', 'mobile_no'];
        } else {
          this.displayedColumns = [
            'district', 'location_name', 'item_name', 'serial_no', 'warrantyValidTill',
            'complaint_date', 'complaint_details', 'name', 'mobile_no'
          ];
        }
      }
    });
  }

  ngOnInit() {
    this.spinner.show();
    this.getAllComplaints();
    setTimeout(() => this.loadData(), 1000);
  }

  getAllComplaints() {
    this.spinner.show();
    this.selectedDistrictName='ALL'
    this.rcapi.overAllComplaints().subscribe(res => {
      this.allComplaints = res;
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.spinner.hide();
      this.cdr.detectChanges();
    });
  }

  filterByDistrictWithSpinner(selectedDistrict: string) {
    this.spinner.show();
    this.selectedDistrictName = `${selectedDistrict} (Unsolved)`;
    this.filterByDistrict(selectedDistrict);
  }

  filterByDistrict(selectedDistrict: string) {
    const filteredData = this.allComplaints.filter(complaint => complaint.district === selectedDistrict);
    this.dataSource.data = filteredData;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.cdr.detectChanges();
    this.spinner.hide();
  }

  filterSolvedByDistrictWithSpinner(selectedDistrict: string) {
    this.spinner.show();
    this.selectedDistrictName = `${selectedDistrict} (Solved)`;
    this.filterSolvedByDistrict(selectedDistrict);
  }

  filterSolvedByDistrict(selectedDistrict: string) {
    this.spinner.show();
    this.rcapi.overAllComplaintsSolved(selectedDistrict).subscribe(res => {
      this.dataSource.data = res;
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
      this.cdr.detectChanges();
      this.spinner.hide();
    });
  }

  filterTotalByDistrictWithSpinner(selectedDistrict: string) {
    this.spinner.show();
    this.selectedDistrictName = `${selectedDistrict}`;
    this.filterTotalByDistrict(selectedDistrict);
  }

  filterTotalByDistrict(selectedDistrict: string) {
    this.spinner.show();
    this.rcapi.overAllComplaintsSolvedorUnsolved(selectedDistrict).subscribe(res => {
      this.dataSource.data = res;
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
      this.cdr.detectChanges();
      this.spinner.hide();
    });
  }
  applyTextFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadData() {
    this.spinner.show();
    this.rcapi.districtWiseComplaints().subscribe((data: any) => {
      const categories: string[] = [];
      const total: number[] = [];
      const solved: number[] = [];
      const unsolved: number[] = [];

      data.forEach((item: { district: string; total: number; solved: number; unsolved: number; }) => {
        categories.push(item.district);
        total.push(item.total);
        solved.push(item.solved);
        unsolved.push(item.unsolved);
      });

      this.chartOptions.series = [
        {
          name: 'Total',
          data: total
        },
        {
          name: 'Solved',
          data: solved
        },
        {
          name: 'Unsolved',
          data: unsolved
        }
      ];
      this.chartOptions.xaxis = {
        categories: categories
      };
      this.cdr.detectChanges();
      this.spinner.hide();
    });
  }

  updateDisplayedColumns() {
    if (this.selectedSeries === 'Solved') {
      this.displayedColumns = [
        'district', 'location_name', 'item_name', 'serial_no', 'warrantyValidTill',
        'complaint_date', 'complaint_details', 'name', 'mobile_no', 'solved_date'
      ];
    } else if (this.selectedSeries === 'Unsolved') {
      this.displayedColumns = [
        'district', 'location_name', 'item_name', 'serial_no', 'warrantyValidTill',
        'complaint_date', 'complaint_details', 'name', 'mobile_no'
      ];
    } else {
      this.displayedColumns = [
        'district', 'location_name', 'item_name', 'serial_no', 'warrantyValidTill',
        'complaint_date', 'complaint_details', 'name', 'mobile_no'
      ];
    }

    this.cdr.detectChanges();
  }

  getFontSizeBasedOnScreenWidth(): string {
    
    const screenWidth = window.innerWidth;

    if (screenWidth <= 675) {
      return '7px'; // Smaller font for small screens
  } else {
      return '18px'; // Default font size for large screens
    }
  }
  
}
