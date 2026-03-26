import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; 
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';


import { MatMenuModule } from '@angular/material/menu';
import { MatTableExporterModule } from 'mat-table-exporter';

import { MatButtonModule } from '@angular/material/button';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
declare var bootstrap: any;
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
import { KPIdistWise } from 'src/app/Model/KPIdistWise';
@Component({
  selector: 'app-aam-utility',
  standalone: true,
  imports: [ FormsModule,CommonModule,NgSelectModule,MatButtonModule,MatMenuModule, MatTableExporterModule,MatPaginatorModule, MatTableModule],
  templateUrl: './aam-utility.component.html',
  styleUrl: './aam-utility.component.css'
})
export class AAMUtilityComponent {

  dataSource!: MatTableDataSource<any>;
  kPIdistWise: any[] = [];
  selectedTabIndex: number = 0;
  category=0;
  facid=sessionStorage.getItem('facilityId');
  districid:any
  selectedDistrictId: number | null = null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  phone: any = '';
  contactPersonName: any = '';
  facilityid:any;
  modalInstance: any;

  constructor(
    private spinner: NgxSpinnerService,
    private api: ApiService,
    private http: HttpClient,
    private breakpointObserver: BreakpointObserver,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,public toastr: ToastrService,
  ) {
    this.dataSource = new MatTableDataSource<KPIdistWise>([]);


  }

  ngOnInit() {
    this.spinner.show();
  this.districid=sessionStorage.getItem('districtid')

    this.getAllDispatchPending();

  }

 

 


    getAllDispatchPending() {
    
    this.spinner.show();
    this.api.KPIFacilityDetai(this.districid).subscribe(
      (res) => {
        // Add serial numbers to the data
        this.kPIdistWise = res.map((item: any, index: number) => ({
          ...item,
          sno: index + 1
        }));
        
        console.log('Data with serial numbers:', this.kPIdistWise); 
        // console.log(JSON.stringify(res))
        // this.kPIdistWise = res;
        this.dataSource.data = this.kPIdistWise;
        this.dataSource.data = this.kPIdistWise;
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
    
    // Get current date and time
    const now = new Date();
    const dateString = now.toLocaleDateString();
    const timeString = now.toLocaleTimeString();
  
    // Set font size for the title
    doc.setFontSize(18);
  
    // Calculate the position to center the title
    const header = 'District Wise AAM Facility Details';
    const title = 'Facility: ' + (sessionStorage.getItem('firstname') || 'Current Stock Report');  
    const pageWidth = doc.internal.pageSize.getWidth();
    const titleWidth = doc.getTextWidth(title);
    const xOffset = (pageWidth - titleWidth) / 2;
    const xOffset1 = (pageWidth - doc.getTextWidth(header)) / 2;
  
    // Add centered title with some space above the table
    doc.setFontSize(18);
    doc.text(header, xOffset1, 10);
    // Centered title at position Y=20
    doc.setFontSize(15);
    doc.text(title, xOffset, 20);
  
    // Set font size for the date and time
    doc.setFontSize(10);
  
    // Add the date and time to the top-left corner
    doc.text(`Date: ${dateString} Time: ${timeString}`, 10, 30); // Adjusted Y position to avoid overlap
        
    const columns = [
      { header: "S.No", dataKey: "sno" },
      { header: "District", dataKey: "districtname" },
      { header: "Block", dataKey: "blockname" },
      { header: "Facility Name", dataKey: "facilityname" },
      { header: "Email ID", dataKey: "emailid" },
      { header: "Phone", dataKey: "phone1" },
      { header: "Contact Person", dataKey: "contactpersonname" },
      { header: "Parent Facility", dataKey: "parentfacility" },
      { header: "Warehouse", dataKey: "warehousename" },
      { header: "No. of Drugs in Opening Stock", dataKey: "nosdrugsopstock" },
      { header: "No. of Indent", dataKey: "nosindent" },
      { header: "No. of Items Indented", dataKey: "nositemsindented" },
      { header: "No. of Receipt", dataKey: "nosreceipt" },
      { header: "No. of Items in Receipts", dataKey: "nositemsreceipts" },
    ];
    
    const rows = this.kPIdistWise.map(row => ({
      sno: row.sno,
      districtname: row.districtname,
      blockname: row.blockname,
      facilityname: row.facilityname,
      emailid: row.emailid,
      phonE1: row.phonE1, // Assuming 'phonE1' is a data field alias for 'phone1'
      contactpersonname: row.contactpersonname,
      parentfacility: row.parentfacility,
      warehousename: row.warehousename,
      nosdrugsopstock: row.nosdrugsopstock,
      nosindent: row.nosindent,
      nositemsindented: row.nositemsindented,
      nosreceipt: row.nosreceipt,
      nositemsreceipts: row.nositemsreceipts,
    }));
  
    autoTable(doc, {
      columns: columns,
      body: rows,
      startY: 40, // Start table a little further down to account for the title and date/time
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] }
    });
  
    doc.save('DistrictWise_AAM_Facility_Details_Report.pdf');
  }



  openmarqModal(phone:any,contactpersonname:any,facilityid:any): void {
    this.phone = phone;
    this.contactPersonName = contactpersonname;
   this.facilityid=facilityid;
    document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
  
    const modalEl = document.getElementById('pdfModal')!;
    document.body.appendChild(modalEl);
    (modalEl as HTMLElement).style.zIndex = '99999';
  

    this.modalInstance = new bootstrap.Modal(modalEl, {
      backdrop: false, // no backdrop
      keyboard: true,
      focus: true
    });
    this.modalInstance.show();

  }


  // Save button
  // sessionStorage.getItem('facilityId')
  onSubmit(form: any) {

    this.spinner.show();
    if (form.valid) {
   
      this.api.updateFacilityContact(this.facilityid,this.contactPersonName,this.phone).subscribe(

        (res: any) => {
          this.toastr.success(res.message, 'Success');
          form.reset();
          this.getAllDispatchPending();

          this.modalInstance.hide();
          this.spinner.hide();

        },
        (err) => {
          this.spinner.hide();
          this.toastr.error('Submission failed', 'Error');
          console.error(err);
        }
      ); 
    
    }
  }






}






