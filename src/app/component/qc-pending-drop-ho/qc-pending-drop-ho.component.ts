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
import { UndroppedDocket } from 'src/app/Model/UndroppedDocket';
import { PendingToDrop } from 'src/app/Model/PendingToDrop';

@Component({
  selector: 'app-qc-pending-drop-ho',
  templateUrl: './qc-pending-drop-ho.component.html',
  styleUrls: ['./qc-pending-drop-ho.component.css']
})
export class QcPendingDropHoComponent {
  exportToPDF1() {
    const doc = new jsPDF('l', 'mm', 'a4');
    
    // Get current date and time
    const now = new Date();
    const dateString = now.toLocaleDateString();
    const timeString = now.toLocaleTimeString();
  
    // Add date and time to the PDF
    doc.setFontSize(10);
    doc.text(`Date: ${dateString} Time: ${timeString}`, 14, 15);
  
    // Define columns based on table header
    const columns = [
      { title: "S.No", dataKey: "sno" },
      { title: "Warehouse Name", dataKey: "warehousename" },
      { title: "Q Docket No", dataKey: "qdocketno" },
      { title: "Pick Date", dataKey: "pickdate" },
      { title: "Weight", dataKey: "weight" },
      { title: "Days Since Pick Date", dataKey: "dayS_SINCE_PICKDATE" }
    ];
  
    // Map rows data for the PDF export
    const rows = this.dispatchPendings.map((row, index) => ({
      sno: index + 1, // Auto-generate serial number
      warehousename: row.warehousename ?? '',
      qdocketno: row.qdocketno ?? '',
      pickdate: row.pickdate ?? '',
      weight: row.weight ?? '',
      dayS_SINCE_PICKDATE: row.dayS_SINCE_PICKDATE ?? ''
    }));
  
    // Create the table in the PDF
    autoTable(doc, {
      columns: columns,
      body: rows,
      startY: 20,
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] }
    });
  
    // Save the generated PDF
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
  
    // Define columns based on the table header
    const columns = [
      { title: "S.No", dataKey: "sno" },
      { title: "Warehouse Name", dataKey: "warehousename" },
      { title: "Item Name", dataKey: "itemname" },
      { title: "Batch No", dataKey: "batchno" },
      { title: "Q Docket No", dataKey: "qdocketno" },
    ];
  
    // Map rows data for the PDF export
    const rows = this.dispatchPendings1.map((row, index) => ({
      sno: index + 1, // Auto-generate serial number
      warehousename: row.warehousename ?? '',
      itemname: row.itemname ?? '',
      batchno: row.batchno ?? '',
      qdocketno: row.qdocketno ?? ''
    }));
  
    // Create the table in the PDF
    autoTable(doc, {
      columns: columns,
      body: rows,
      startY: 20,
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] }
    });
  
    // Save the generated PDF
    doc.save('qcPending.pdf');
  }
  
// dataSource!: MatTableDataSource<GetRaisedPicks>;
// dataSource1!: MatTableDataSource<GetPendingToPick>;
dataSource: MatTableDataSource<UndroppedDocket> = new MatTableDataSource<UndroppedDocket>();
dataSource1: MatTableDataSource<PendingToDrop> = new MatTableDataSource<PendingToDrop>();
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;
dispatchPendings: UndroppedDocket[] = [];
dispatchPendings1: PendingToDrop[] = [];
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
    this.api.getUndroppedDocket(0).subscribe(
      (res:any) => {
        this.dispatchPendings = res.map((item: UndroppedDocket, index: number) => ({
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
    this.api.getPendingToDrop(this.warehouseid).subscribe(
      (res:any) => {
        this.dispatchPendings1 = res.map((item: PendingToDrop, index: number) => ({
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
    this.api.getPendingToDrop(whid).subscribe(
      (res:any) => {
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
