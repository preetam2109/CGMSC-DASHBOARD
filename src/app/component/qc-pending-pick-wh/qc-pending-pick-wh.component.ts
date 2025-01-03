import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/service/api.service';
import { GetPendingToPick } from 'src/app/Model/GetPendingToPick';
import { GetRaisedPicks } from 'src/app/Model/GetRaisedPicks';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AfterViewInit } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-qc-pending-pick-wh',
  templateUrl: './qc-pending-pick-wh.component.html',
  styleUrls: ['./qc-pending-pick-wh.component.css']
})
export class QcPendingPickWhComponent {
  exportToPDF1() {
    const doc = new jsPDF('l', 'mm', 'a4');
    // Get current date and time
  const now = new Date();
  const dateString = now.toLocaleDateString();
  const timeString = now.toLocaleTimeString();

  // Add date and time to the PDF
  doc.setFontSize(10);
  doc.text(`Date: ${dateString} Time: ${timeString}`, 14, 15);
    const columns = [
      { title: "S.No", dataKey: "sno" },
      { title: "warehousename", dataKey: "warehousename" },
      { title: "qdocketno", dataKey: "qdocketno" },
      { title: "indentdate", dataKey: "indentdate" },
      { title: "nousitems", dataKey: "nousitems" }
    ];
    const rows = this.dispatchPendings.map(row => ({
      sno: row.sno ?? '', // Handle undefined values
      warehousename: row.warehousename ?? '',
      qdocketno: row.qdocketno ?? '',
      indentdate: row.indentdate ?? '',
      nousitems: row.nousitems ?? ''
    }));
  
    autoTable(doc, {
      columns: columns,
      body: rows,
      startY: 20,
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] }
    });
  
    doc.save('qcPending.pdf');
  }
  
exportToPDF2() {
  const doc = new jsPDF('l', 'mm', 'a4');

  // Get current date and time
  const now = new Date();
  const dateString = now.toLocaleDateString();
  const timeString = now.toLocaleTimeString();

  // Add date and time to the PDF
  doc.setFontSize(10);
  doc.text(`Date: ${dateString} Time: ${timeString}`, 14, 15);

  const columns = [
    { title: "S.No", dataKey: "sno" },
    { title: "warehousename", dataKey: "warehousename" },
    { title: "itemname", dataKey: "itemname" },
    { title: "batchno", dataKey: "batchno" },
    { title: "pendingdays", dataKey: "pendingdays" },
    { title: "qdocketno", dataKey: "qdocketno" },
  ];
  const rows = this.dispatchPendings1.map(row => ({

    // 'sno','warehousename','itemname','batchno','pendingdays','qdocketno']"></tr>
    sno: row.sno ?? '',
    warehousename: row.warehousename ?? '',
    itemname: row.itemname ?? '',
    batchno: row.batchno ?? '',
    pendingdays: row.pendingdays ?? '',
    qdocketno: row.qdocketno ?? '',
  }));

  autoTable(doc, {
    columns: columns,
    body: rows,
    startY: 20,
    theme: 'striped',
    headStyles: { fillColor: [22, 160, 133] }
  });

  doc.save('qcPending.pdf');
}
// dataSource!: MatTableDataSource<GetRaisedPicks>;
// dataSource1!: MatTableDataSource<GetPendingToPick>;
dataSource: MatTableDataSource<GetRaisedPicks> = new MatTableDataSource<GetRaisedPicks>();
dataSource1: MatTableDataSource<GetPendingToPick> = new MatTableDataSource<GetPendingToPick>();
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;
dispatchPendings: GetRaisedPicks[] = [];
dispatchPendings1: GetPendingToPick[] = [];
warehouseid: number = 0;
exporter: any;

  

  constructor(
    private spinner: NgxSpinnerService,
    private api: ApiService,
    private http: HttpClient,
    private breakpointObserver: BreakpointObserver,
    private cdr: ChangeDetectorRef
  ) {

  }



  ngOnInit() {
    this.spinner.show();
    this.getAllDispatchPending();
    this.getAllDispatchPending1();
  }

  

 

  getAllDispatchPending() {
    this.spinner.show();
    this.api.GetRaisedPicks().subscribe(
      (res) => {
        this.dispatchPendings = res.map((item: GetRaisedPicks, index: number) => ({
          ...item,
          sno: index + 1
        }));
        this.dataSource.data = this.dispatchPendings;
        // this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator;
        this.spinner.hide();
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error fetching data', error);
        this.spinner.hide();
      }
    );
  }

  getAllDispatchPending1() {
    this.spinner.show();
    this.api.GetPendingToPick(this.warehouseid).subscribe(
      (res) => {
        this.dispatchPendings1 = res.map((item: GetPendingToPick, index: number) => ({
          ...item,
          sno: index + 1
        }));
        this.dataSource1.data = this.dispatchPendings1;
        this.dataSource1.paginator = this.paginator;
        this.dataSource1.sort = this.sort;
        // this.filteredData1 = this.dataSource1;
        this.spinner.hide();
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error fetching data', error);
        this.spinner.hide();
      }
    );
  }

  OnItemsClick(whid: number) {
    this.spinner.show();
    this.api.GetPendingToPick(whid).subscribe(
      (res) => {
        this.dispatchPendings1 = res.map((item: GetPendingToPick, index: number) => ({
          ...item,
          sno: index + 1
        }));
        this.dataSource1.data = this.dispatchPendings1;
        this.dataSource1.paginator = this.paginator;
        this.dataSource1.sort = this.sort;
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
    ;
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();

    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
  }
}
