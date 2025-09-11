import { BreakpointObserver } from '@angular/cdk/layout';
import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgSelectModule } from '@ng-select/ng-select';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NgxSpinnerService } from 'ngx-spinner';
import { DropdownModule } from 'primeng/dropdown';
import { IndentPendingWH } from 'src/app/Model/IndentPendingWH';
import { IndentPendingWHSummary } from 'src/app/Model/IndentPendingWHSummary';
import { ChartOptions } from 'src/app/component/card/card.component';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-slow-moving-itemsagainst-annual-indent25-26',
  standalone: true,
  imports: [MatIconModule,NgSelectModule,SelectDropDownModule,DropdownModule,MatSelectModule,FormsModule,NgSelectModule,
    FormsModule,CommonModule,MatButtonModule,MatMenuModule, MatTableExporterModule,MatPaginatorModule,MatSortModule,MatDialogModule, 
    MatTableModule,NgApexchartsModule],
  templateUrl: './slow-moving-itemsagainst-annual-indent25-26.component.html',
  styleUrl: './slow-moving-itemsagainst-annual-indent25-26.component.css'
})
export class SlowMovingItemsagainstAnnualIndent2526Component {

  dataSource!: MatTableDataSource<any[]>;

toBeTenderBifurcationDetail: any | undefined;


}
