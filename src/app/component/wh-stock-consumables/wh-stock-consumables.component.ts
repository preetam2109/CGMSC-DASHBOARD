import { ChangeDetectorRef, Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { WHStock } from 'src/app/Model/WHStock';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-wh-stock-consumables',
  templateUrl: './wh-stock-consumables.component.html',
  styleUrls: ['./wh-stock-consumables.component.css']
})
export class WhStockConsumablesComponent {
  edlData: number[] = [];
  nonEdlData: number[] = [];
  chartOptionsEDL: any;
  chartOptionsNonEDL: any;

  constructor( private spinner: NgxSpinnerService,private stockService: ApiService,  private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
     this.spinner.show();
    this.loadStockData();
    // setTimeout(() => this.loadStockData(),1000)
  }

  loadStockData(): void {
    
    this.spinner.show();
    
    this.stockService.getWHStockData(2, 0).subscribe((data: WHStock[]) => {
      const edl = data.find((item) => item.edlcat === 'EDL');
      const nonEdl = data.find((item) => item.edlcat === 'NON-EDL');

      if (edl) {
        this.edlData = [edl.noofitemsready, edl.noofitemsuqc, edl.noofitemspipeline,edl.readyforissuevalue,edl.qcpendingvalue,edl.pipelinevalue];
        this.initializeEDLChart();
      }

      if (nonEdl) {
        this.nonEdlData = [nonEdl.noofitemsready, nonEdl.noofitemsuqc, nonEdl.noofitemspipeline,nonEdl.readyforissuevalue,nonEdl.qcpendingvalue,nonEdl.pipelinevalue];
        this.initializeNonEDLChart();
      }
    });
  
  }

  initializeEDLChart(): void {
this.spinner.show();
    this.chartOptionsEDL = {
      series: this.edlData.slice(0, 3),
      chart: {
        type: 'pie',
        width: '100%',
      },
      labels: [
        `Items Ready: ${this.edlData[0]} (${this.edlData[3]}Cr)`,
        `Items UQC: ${this.edlData[1]} (${this.edlData[4]}Cr)`,
        `Items Pipeline: ${this.edlData[2]} (${this.edlData[5]}Cr)`,
      ],
      responsive: [
        {
          breakpoint: 768,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
    this.spinner.hide();
  }

  initializeNonEDLChart(): void {
this.spinner.show();
    this.chartOptionsNonEDL = {
      series: this.nonEdlData.slice(0, 3),
      chart: {
        type: 'pie',
        width: '100%',
      },
      labels: [
        `Items Ready: ${this.nonEdlData[0]} (${this.nonEdlData[3]}Cr)`,
        `Items UQC: ${this.nonEdlData[1]} (${this.nonEdlData[4]}Cr)`,
        `Items Pipeline: ${this.nonEdlData[2]} (${this.nonEdlData[5]}Cr)`,
      ],
      responsive: [
        {
          breakpoint: 768,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
    this.spinner.hide();
  }
}