import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DPDMISEMDTenderwisePending } from 'src/app/Model/DPDMISEMDTenderwisePending';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/service/api.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; 

@Component({
  selector: 'app-emd-pending-tenderwise',
  templateUrl: './emd-pending-tenderwise.component.html',
  styleUrls: ['./emd-pending-tenderwise.component.css']
})
export class EmdPendingTenderwiseComponent implements OnInit {
  dataSource!: MatTableDataSource<DPDMISEMDTenderwisePending>;
  dispatchPendings: DPDMISEMDTenderwisePending[] = [];
  selectedTabIndex: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private spinner: NgxSpinnerService,private api: ApiService,private http: HttpClient,private breakpointObserver: BreakpointObserver,private cdr: ChangeDetectorRef,) 
  {
    this.dataSource = new MatTableDataSource<DPDMISEMDTenderwisePending>([]);
  }

  ngOnInit() {
    this.spinner.show();
    this.getAllDispatchPending();
  }

  getAllDispatchPending() {
    this.spinner.show();
    this.api.getDPDMISEMDTenderwisePendin().subscribe(
      (res) => {
        // Add serial numbers to the data
        this.dispatchPendings = res.map((item, index) => ({
          ...item,
          sno: index + 1
        }));

        this.dataSource.data = this.dispatchPendings;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.spinner.hide();
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error fetching data', error);
        this.spinner.hide();
      }
    );
  }

  applyTextFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selectedTabValue(event: any): void {
    this.selectedTabIndex = event.index;
  }
  exportToPDF() {
    const doc = new jsPDF('l', 'mm', 'a4');
    const columns = [
      { title: "S.No", dataKey: "sno" },
      { title: "Tender", dataKey: "schemename" },
      { title: "Status", dataKey: "statusdata" },
      { title: "No_of_Supplier", dataKey: "nossupplier" },
      { title: "EMD Deposited", dataKey: "totalEMD" },
      { title: "EMD Released", dataKey: "releasedEMDAmt" },
      { title: "EMD Pending", dataKey: "pendingEMD" }
    ];
    const rows = this.dispatchPendings.map(row => ({
      sno: row.sno,
      schemename: row.schemename,
      statusdata: row.statusdata,
      nossupplier: row.nossupplier,
      totalEMD: row.totalEMD,
      releasedEMDAmt: row.releasedEMDAmt,
      pendingEMD: row.pendingEMD
    }));

    autoTable(doc, {
      columns: columns,
      body: rows,
      startY: 20,
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] }
    });

    doc.save('EMD_Pending_Tenderwise.pdf');
  }
}
