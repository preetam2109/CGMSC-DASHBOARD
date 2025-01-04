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

@Component({
  selector: 'app-noc-approval',
  templateUrl: './noc-approval.component.html',
  styleUrls: ['./noc-approval.component.css']
})
export class NocApprovalComponent {
  exportToPDF1() {
    const doc = new jsPDF('l', 'mm', 'a4');
  
    // Get current date and time
    const now = new Date();
    const dateString = now.toLocaleDateString();
    const timeString = now.toLocaleTimeString();
  
    // Add date and time to the PDF
    doc.setFontSize(10);
    doc.text(`Date: ${dateString} Time: ${timeString}`, 14, 15);
  
    // Define columns for the PDF table
    const columns = [
      { title: "S.No", dataKey: "sno" },
      { title: "District Name", dataKey: "districtname" },
      { title: "Facility Name", dataKey: "facilityname" },
      { title: "Approved", dataKey: "approved" },
      { title: "Rejected", dataKey: "rejected" }
    ];
  
    // Map the rows
    const rows = this.dispatchPendings.map(row => ({
      sno: row.sno ?? '',
      districtname: row.districtname ?? '',
      facilityname: row.facilityname ?? '',
      approved: row.approved ?? '',
      rejected: row.rejected ?? ''
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
  
    // Define columns for the PDF table
    const columns = [
      { title: "S.No", dataKey: "sno" },
      { title: "Facility Name", dataKey: "facilityname" },
      { title: "Item Code", dataKey: "itemcode" },
      { title: "Item Name", dataKey: "itemname" },
      { title: "Strength", dataKey: "strengtH1" },
      { title: "Unit", dataKey: "unit" },
      { title: "NOC Date", dataKey: "nocdate" }
    ];
  
    // Map the rows
    const rows = this.dispatchPendings1.map(row => ({
      sno: row.sno ?? '',
      facilityname: row.facilityname ?? '',
      itemcode: row.itemcode ?? '',
      itemname: row.itemname ?? '',
      strengtH1: row.strengtH1 ?? '',
      unit: row.unit ?? '',
      nocdate: row.nocdate ?? ''
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
    doc.save('nocData.pdf');
  }
  
// dataSource!: MatTableDataSource<GetRaisedPicks>;
// dataSource1!: MatTableDataSource<GetPendingToPick>;
dataSource: MatTableDataSource<NOCApprovedSummary> = new MatTableDataSource<NOCApprovedSummary>();
dataSource1: MatTableDataSource<NOCApprovedDetails> = new MatTableDataSource<NOCApprovedDetails>();
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;
dispatchPendings: NOCApprovedSummary[] = [];
dispatchPendings1: NOCApprovedDetails[] = [];
facilityId: number = 0;
exporter: any;

selectedColumnName:any;
selectedDistrictName:any;

  

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
    this.api.getNOCApprovedSummary().subscribe(
      (res) => {
        this.dispatchPendings = res.map((item: NOCApprovedSummary, index: number) => ({
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
    this.api.getNOCApprovedDetailsYN(this.facilityId,'0').subscribe(
      (res:any) => {
        this.dispatchPendings1 = res.map((item: NOCApprovedDetails, index: number) => ({
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

  OnItemsClick(facilityId: number,districtname:string) {
    this.selectedDistrictName=districtname;
    this.selectedColumnName='Applied';
    
    this.spinner.show();
    this.api.getNOCApprovedDetailsYN(facilityId,'0').subscribe(
      (res:any) => {
        this.dispatchPendings1 = res.map((item: NOCApprovedDetails, index: number) => ({
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
  OnItemsClickApproved(facilityId: number,districtname:string) {
    this.selectedDistrictName=districtname;
    this.selectedColumnName='Approved';
    this.spinner.show();
    this.api.getNOCApprovedDetailsYN(facilityId,'Y').subscribe(
      (res:any) => {
        this.dispatchPendings1 = res.map((item: NOCApprovedDetails, index: number) => ({
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
  OnItemsClickRejected(facilityId: number,districtname:string) {
    this.selectedDistrictName=districtname;
    this.selectedColumnName='Rejected';
    this.spinner.show();
    this.api.getNOCApprovedDetailsYN(facilityId,'N').subscribe(
      (res:any) => {
        this.dispatchPendings1 = res.map((item: NOCApprovedDetails, index: number) => ({
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
