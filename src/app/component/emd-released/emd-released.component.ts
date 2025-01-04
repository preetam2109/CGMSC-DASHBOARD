import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { dispatchPending } from 'src/app/Model/dispatchPending';
import { DistrictService } from 'src/app/service/district.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/service/api.service';
import { EmdStatusDetail } from 'src/app/Model/EmdStatusDetail';
import { DPDMISSupemdSummary } from 'src/app/Model/DPDMISSupemdSummary';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; 
@Component({
  selector: 'app-emd-released',
  templateUrl: './emd-released.component.html',
  styleUrls: ['./emd-released.component.css']
})
export class EmdReleasedComponent {
  // displayedColumns: string[] = [
  //   'supplierid',
  //   'suppliername',
  //   'nostender',
  //   'totalEMD',
  //   'releasedEMDAmt',
  //   'pendingEMD'
  // ];
  
  // columnNames: { [key: string]: string } = {
  //   supplierid:'supplierid',
  //   suppliername:'Supplier',
  //   nostender:'No_of_Tender',
  //   totalEMD:'EMD Deposited',
  //   releasedEMDAmt:'EMD Released',
  //   pendingEMD:'EMD Pending'
  // };

  dataSource!: MatTableDataSource<DPDMISSupemdSummary>;
  dispatchPendings: DPDMISSupemdSummary[] = [];
  selectedTabIndex: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private spinner: NgxSpinnerService,
    private api: ApiService,
    private http: HttpClient,
    private breakpointObserver: BreakpointObserver,
    private cdr: ChangeDetectorRef
  ) {
    this.dataSource = new MatTableDataSource<DPDMISSupemdSummary>([]);

    // this.breakpointObserver
    //   .observe([Breakpoints.Handset, Breakpoints.Tablet, Breakpoints.Web])
    //   .subscribe((result) => {
    //     if (result.matches) {
    //       if (this.breakpointObserver.isMatched(Breakpoints.Handset)) {
    //         this.displayedColumns = [
    //           // 'supplierid',
    // 'suppliername',
    // 'nostender',
    // 'totalEMD',
    // 'releasedEMDAmt',
    // 'pendingEMD'
    //         ];
    //       } else if (this.breakpointObserver.isMatched(Breakpoints.Tablet)) {
    //         this.displayedColumns = [
    //           // 'supplierid',
    // 'suppliername',
    // 'nostender',
    // 'totalEMD',
    // 'releasedEMDAmt',
    // 'pendingEMD'
    //         ];
    //       } else {
    //         this.displayedColumns = [
    //           // 'supplierid',
    //           'suppliername',
    //           'nostender',
    //           'totalEMD',
    //           'releasedEMDAmt',
    //           'pendingEMD'
    //         ];
    //       }
    //     }
    //   });
  }

  ngOnInit() {
    this.spinner.show();
    this.getAllDispatchPending();
  }

  // getAllDispatchPending() {
  //   this.spinner.show();
  //   this.api.getEmdStatusSummary().subscribe(
  //     (res) => {
  //       Add serial numbers to the data
  //       this.dispatchPendings = res.map((item, index) => ({
  //         ...item,
  //         sno: index + 1
  //       }));

  //        console.log('Data with serial numbers:', this.dispatchPendings); 
  //       this.dispatchPendings = res;
  //       this.dataSource.data = res;
  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort = this.sort;
  //       this.spinner.hide();
  //       this.cdr.detectChanges();
  //     },
  //     (error) => {
  //       console.error('Error fetching data', error);
  //       this.spinner.hide();
  //     }
  //   );
  // }
    getAllDispatchPending() {
    this.spinner.show();
    this.api.getEmdStatusSummary().subscribe(
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
      { title: "Supplier", dataKey: "suppliername" },
      { title: "No_of_Tender", dataKey: "nostender" },
      { title: " EMD Deposited ", dataKey: "totalEMD" },
      { title: "EMD Released ", dataKey: "releasedEMDAmt" },
      { title: " EMD Pending", dataKey: "pendingEMD" },
    ];
    const rows = this.dispatchPendings.map(row => ({
      sno: row.sno,
      suppliername: row.suppliername,
      nostender: row.nostender,
      totalEMD: row.totalEMD,
      releasedEMDAmt: row.releasedEMDAmt,
      pendingEMD: row.pendingEMD,
    }));

    autoTable(doc, {
      columns: columns,
      body: rows,
      startY: 20,
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] }
    });

    doc.save('EMD_Pending_Supplierwise.pdf');
  }
}
