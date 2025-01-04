import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ApexNonAxisChartSeries,
  ApexChart,
  ApexResponsive,
  ChartComponent
} from "ng-apexcharts";
import { DPDMISEMDDashboard } from 'src/app/Model/DPDMISEMDDashboard';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-emd-dashboard',
  templateUrl: './emd-dashboard.component.html',
  styleUrls: ['./emd-dashboard.component.css']
})
export class EmdDashboardComponent implements OnInit {
  public chartOptions: Partial<ChartOptions> | any;
  public dashboardData: DPDMISEMDDashboard[] = [];

  constructor(private http: HttpClient) {
    this.chartOptions = {
      series: [],
      chart: {
        type: "pie",
        width: '250%', // Ensure the chart takes full width of its container
        height: '250%' // Ensure the chart takes full height of its container
      },
      labels: [],
      dataLabels: {
        enabled: true,
        formatter: function(val: any, opts: any) {
          return opts.w.config.labels[opts.seriesIndex];
        },
        style: {
          fontSize: '14px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 'bold',
          colors: ['#000']
        },
        dropShadow: {
          enabled: false
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: '100%' // Ensure full width on small screens
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ],
      tooltip: {
        enabled: false,
      }
    };
  }

  ngOnInit(): void {
    // this.getDashboardData();
    setTimeout(() => this.getDashboardData(), 1000);

  }

  getDashboardData(): void {
    this.http.get<DPDMISEMDDashboard[]>(`https://dpdmis.in/CGMSCHO_API2/api/EMD/DPDMISEMDDashboard`)
      .subscribe((data: DPDMISEMDDashboard[]) => {
        this.dashboardData = data;
        this.updateChart();
      });
  }

  updateChart(): void {
    
    const totalEMD = this.dashboardData.map(item => item.totalEMD);
    const releasedEMDAmt = this.dashboardData.map(item => item.releasedEMDAmt);
    const pendingEMD = this.dashboardData.map(item => item.pendingEMD);

    // Calculate sums for each category
    const totalSum = totalEMD.reduce((a, b) => a + b, 0);
    const releasedSum = releasedEMDAmt.reduce((a, b) => a + b, 0);
    const pendingSum = pendingEMD.reduce((a, b) => a + b, 0);

    // Update chart options with the calculated values
    this.chartOptions.series = [totalSum, releasedSum, pendingSum];
    this.chartOptions.labels = [
      `Total EMD Submitted: ${totalSum} Cr`,
      `Total EMD Released: ${releasedSum} Cr`,
      `Total EMD Pending: ${pendingSum} Cr`
    ];
  }
}
