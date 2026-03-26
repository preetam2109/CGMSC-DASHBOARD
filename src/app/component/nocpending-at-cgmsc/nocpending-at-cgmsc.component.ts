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
import { NOCApprovedSummary } from 'src/app/Model/NOCApprovedSummary';
import { NOCApprovedDetails } from 'src/app/Model/NOCApprovedDetails';
import { CGMSCNOCPendingSummary } from 'src/app/Model/CGMSCNOCPendingSummary';
import { CGMSCNOCPendingDetails } from 'src/app/Model/CGMSCNOCPendingDetails';
@Component({
  selector: 'app-nocpending-at-cgmsc',
  templateUrl: './nocpending-at-cgmsc.component.html',
  styleUrls: ['./nocpending-at-cgmsc.component.css']
})
export class NOCPendingAtCGMSCComponent {
  exportToPDF1() {
    const doc = new jsPDF('l', 'mm', 'a4');
  
    // Get current date and time
    const now = new Date();
    const dateString = now.toLocaleDateString();
    const timeString = now.toLocaleTimeString();
  
    // Add date and time to the PDF
    doc.setFontSize(10);
    doc.text(`Date: ${dateString} Time: ${timeString}`, 14, 15);
  
    // Define columns for the PDF table according to the new fields
    const columns = [
      { header: "S.No", dataKey: "sno" },
      { header: "Facility ID", dataKey: "facilityid" },
      { header: "No. of Items", dataKey: "nositems" },
      { header: "NOC Number", dataKey: "nocnumber" },
      { header: "CMHO Forward Date", dataKey: "cmhoforwarddt" },
      { header: "Facility Name", dataKey: "facilityname" },
      { header: "District Name", dataKey: "districtname" }
    ];
  
    // Map the rows
    const rows = this.dispatchPendings.map(row => ({
      sno: row.sno ?? '',
      facilityid: row.facilityid ?? '',
      nositems: row.nositems ?? '',
      nocnumber: row.nocnumber ?? '',
      cmhoforwarddt: row.cmhoforwarddt ?? '',
      facilityname: row.facilityname ?? '',
      districtname: row.districtname ?? ''
    }));
  
    // Generate the PDF table
    autoTable(doc, {
      columns: columns,
      body: rows,
      startY: 20,
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] }
    });
  
    // Save the PDF
    doc.save('approvedRejected.pdf');
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
  
    // Define columns for the PDF table according to the new fields
    const columns = [
      { header: "S.No", dataKey: "sno" },
      { header: "SR", dataKey: "sr" },
      { header: "Facility Name", dataKey: "facilityname" },
      { header: "Item Code", dataKey: "itemcode" },
      { header: "Item Name", dataKey: "itemname" },
      { header: "Strength", dataKey: "strengtH1" },
      { header: "Unit", dataKey: "unit" },
      { header: "Applied Qty", dataKey: "appliedqty" },
      { header: "CMHO Approved Qty", dataKey: "cmhoaprqty" },
      { header: "CMHO Forward Date", dataKey: "cmhoForwardDT" },
      { header: "Ready WH", dataKey: "readywh" },
      { header: "UQC WH", dataKey: "uqcwh" },
      { header: "Transfer Qty", dataKey: "transferqty" },
      { header: "UQC Total", dataKey: "uqcTotal" },
      { header: "Total Ready CGMSC", dataKey: "totalreadycgmsc" },
      { header: "Transfer Date", dataKey: "tdate" },
      { header: "District Name", dataKey: "districtname" },
      { header: "NOC Number", dataKey: "nocnumber" },
      { header: "NOC ID", dataKey: "nocid" },
      { header: "Facility ID", dataKey: "facilityid" }
    ];
  
    // Map the rows
    const rows = this.dispatchPendings1.map(row => ({
      sno: row.sno ?? '',
      sr: row.sr ?? '',
      facilityname: row.facilityname ?? '',
      itemcode: row.itemcode ?? '',
      itemname: row.itemname ?? '',
      strengtH1: row.strengtH1 ?? '',
      unit: row.unit ?? '',
      appliedqty: row.appliedqty ?? '',
      cmhoaprqty: row.cmhoaprqty ?? '',
      cmhoForwardDT: row.cmhoForwardDT ?? '',
      readywh: row.readywh ?? '',
      uqcwh: row.uqcwh ?? '',
      transferqty: row.transferqty ?? '',
      uqcTotal: row.uqcTotal ?? '',
      totalreadycgmsc: row.totalreadycgmsc ?? '',
      tdate: row.tdate ?? '',
      districtname: row.districtname ?? '',
      nocnumber: row.nocnumber ?? '',
      nocid: row.nocid ?? '',
      facilityid: row.facilityid ?? ''
    }));
  
    // Generate the table
    autoTable(doc, {
      columns: columns,
      body: rows,
      startY: 20,
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] }
    });
  
    // Save the PDF
    doc.save(`nocpendoingtowarehouse_${dateString}.pdf`);
  }
  
  
// dataSource!: MatTableDataSource<GetRaisedPicks>;
// dataSource1!: MatTableDataSource<GetPendingToPick>;
dataSource: MatTableDataSource<CGMSCNOCPendingSummary> = new MatTableDataSource<CGMSCNOCPendingSummary>();
dataSource1: MatTableDataSource<CGMSCNOCPendingDetails> = new MatTableDataSource<CGMSCNOCPendingDetails>();
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;
dispatchPendings: CGMSCNOCPendingSummary[] = [];
dispatchPendings1: CGMSCNOCPendingDetails[] = [];
facilityId: number = 0;
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
    this.api.CGMSCNOCPendingSummary().subscribe(
      (res:any) => {
        this.dispatchPendings = res.map((item: CGMSCNOCPendingSummary, index: number) => ({
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
    this.api.CGMSCNOCPendingDetails(this.facilityId).subscribe(
      (res:any) => {
        this.dispatchPendings1 = res.map((item: CGMSCNOCPendingDetails, index: number) => ({
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

  OnItemsClick(nocid: number) {
    this.spinner.show();
    this.api.CGMSCNOCPendingDetails(nocid).subscribe(
      (res:any) => {
        this.dispatchPendings1 = res.map((item: CGMSCNOCPendingDetails, index: number) => ({
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
