import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
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
import { NgApexchartsModule } from 'ng-apexcharts';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NgxSpinnerService } from 'ngx-spinner';
import { DropdownModule } from 'primeng/dropdown';

import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-supplier-pending-payments',
  standalone: true,
  imports: [MatIconModule,NgSelectModule,SelectDropDownModule,DropdownModule,MatSelectModule,FormsModule,NgSelectModule,
    FormsModule,CommonModule,MatButtonModule,MatMenuModule, MatTableExporterModule,MatPaginatorModule,MatSortModule,MatDialogModule, 
    MatTableModule,NgApexchartsModule],
  templateUrl: './supplier-pending-payments.component.html',
  styleUrl: './supplier-pending-payments.component.css'
})
export class SupplierPendingPaymentsComponent {


  FundsDDL:any

  budgetid:any=1;
  budgetname: any='DHS Drugs(Non Covid)';
  po_year: any;
  
  dataSource!: MatTableDataSource<any[]>;
  supplierpendingpayments: any[] = [];


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private cdr: ChangeDetectorRef,public api:ApiService,private spinner: NgxSpinnerService,private dialog: MatDialog){
    this.dataSource = new MatTableDataSource<any>([]);

  }
  ngOnInit(): void {
    const roleID =sessionStorage.getItem('roleId')
    if(roleID=='485'){
  this.budgetid=2
    }else if(roleID=='459'){
      this.budgetid=1
  
    }
   
    this.GetFundsDDL()
    
  }
  onISelectChange(event: Event): void {
    
    const selectedUser = this.FundsDDL.find((user: { budgetid: string }) => user.budgetid === this.budgetid); 
  
    if (selectedUser) {
      this.budgetname=selectedUser.budgetname || null;
      this.budgetid=selectedUser.budgetid || null;
    } else {
      console.error('Selected budgetid not found in the list.');
    }
  }
  

  GetFundsDDL(){
  
    this.api.getFundsDDL(sessionStorage.getItem('roleId')).subscribe((res:any[])=>{
      // console.log(' Vehicle API dropdown Response:', res);
      if (res && res.length > 0) {
        this.FundsDDL = res.map(item => ({
          budgetid: item.budgetid, // Adjust key names if needed
          budgetname : item.budgetname,
          
          
        }));
      } else {
        console.error('No nameText found or incorrect structure:', res);
      }
    });  
  }

  getAllSupplierPendingDetails() {
    
    this.spinner.show();
   
  
    this.api.SupplierPendingPayments(this.budgetid).subscribe(
      (res) => {
        console.log('Raw API response:', res);
  
        this.supplierpendingpayments = res.map((item: any, index: number) => ({
          ...item,
          sno: index + 1
        }));
  
        console.log('With S.No:', this.supplierpendingpayments);
  
        this.dataSource.data = this.supplierpendingpayments;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
  
        this.spinner.hide();
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('API error:', error);
        this.spinner.hide();
      }
    );
  }

  exportToPDF() {
    const doc = new jsPDF('l', 'mm', 'a4'); // Landscape
  
    const columns = [
      { title: 'S.No', dataKey: 'sno' },
      // { title: 'Supplier ID', dataKey: 'supplierid' },
      { title: 'Supplier', dataKey: 'suppliername' },
      { title: 'No. of POs', dataKey: 'nosPO' },
      { title: 'Received/Liberated (Lacs)', dataKey: 'recLibLacs' }
    ];
  
    // Replace this with your actual API data
    const rows = this.supplierpendingpayments.map((row: any, index: number) => ({
      sno: index + 1,
      // supplierid: row.supplierid,
      suppliername: row.suppliername,
      nosPO: row.nosPO,
      recLibLacs: row.recLibLacs
    }));
  
    autoTable(doc, {
      head: [columns.map(col => col.title)],
      body: rows.map(row => columns.map(col => row[col.dataKey as keyof typeof row] || '')),
      startY: 20,
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185], textColor: 255, fontSize: 10 },
      styles: { fontSize: 9, cellPadding: 2, textColor: [0, 0, 0] },
      columnStyles: {
        0: { cellWidth: 15 }, // S.No
        1: { cellWidth: 25 }, // Supplier ID
        2: { cellWidth: 60 }, // Supplier Name
        3: { cellWidth: 25 }, // No. of POs
        4: { cellWidth: 40 }  // Received/Liberated (Lacs)
      },
      margin: { top: 20, left: 10, right: 10 }
    });
  
    doc.save('Supplier_Details.pdf');
  }
  
  applyTextFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
