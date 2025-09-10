import { NgSelectModule } from '@ng-select/ng-select';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { MatTableExporterModule } from 'mat-table-exporter';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DropdownModule } from 'primeng/dropdown';
import { Observable, map, catchError, of, finalize, forkJoin } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { CommonModule, DatePipe } from '@angular/common';
import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-non-supply',
  standalone: true,
  imports: [MatTableModule,ReactiveFormsModule,
    MatTableExporterModule, MatIconModule, NgSelectModule, SelectDropDownModule, DropdownModule, MatSelectModule, FormsModule, NgSelectModule,
    FormsModule, CommonModule, MatButtonModule, MatMenuModule, MatPaginatorModule, MatSortModule, MatDialogModule,
    NgApexchartsModule, MatDatepickerModule],
  templateUrl: './non-supply.component.html',
  styleUrl: './non-supply.component.css'
})
export class NonSupplyComponent {
  
  nonsupply: any;
  nonsupplyDropDownList: any[] = [];

  itemid: any;
  dataSource!: MatTableDataSource<any[]>;
  dateRange!: FormGroup;
  supplierId:any;

  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


    
    
    constructor(public datePipe: DatePipe,public toastr: ToastrService,private cdr: ChangeDetectorRef,public api:ApiService,private spinner: NgxSpinnerService,private dialog: MatDialog,
      private fb: FormBuilder)
  {
    this.dataSource = new MatTableDataSource<any>([]);

    const today = new Date();
    // const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const firstDayOfMonth = new Date(2023, 3, 1); 
// months are 0-based → 3 = April

  
    this.dateRange = this.fb.group({
      start: [firstDayOfMonth, [Validators.required, this.startDateValidator.bind(this)]],
      end: [today, Validators.required]
    });
  
    this.dateRange.valueChanges.subscribe(val => {
      console.log('Date Range Changed:', val);
      this.getNonSupplySummary();
    });

  }
  // ✅ Validator: start date should not be greater than today
startDateValidator(control: AbstractControl) {
  const selectedDate = new Date(control.value);
  const today = new Date();
  if (selectedDate > today) {
    return { invalidStart: true }; // ❌ start date greater than today
  }
  return null;
}

  ngOnInit(){

     // Create API calls with individual error handling
   forkJoin([
       
    this.getNonSupplySummary().pipe(catchError(() => of(null))),

  ])
    .pipe(finalize(() => this.spinner.hide()))
    .subscribe({
      error: () => this.toastr.error('Some data failed to load'),
    });


  

  }

  getNonSupplySummary(): Observable<any[]> {

    const startDate = this.dateRange.value.start;
    const endDate = this.dateRange.value.end;
  // Only format dates if both start and end dates are selected
  const formattedStartDate = startDate ? this.datePipe.transform(startDate, 'dd-MMM-yyyy') : '';
  const formattedEndDate = endDate ? this.datePipe.transform(endDate, 'dd-MMM-yyyy') : '';
    debugger
    return this.api.NonSupplySummary(formattedStartDate,formattedEndDate).pipe(
      map((res: any[]) => {
        if (res && res.length > 0) {
          const mappedList = res.map((item) => ({
            supplierId: item.supplierId,
            supplierName: item.supplierName,
          }));
          this.nonsupplyDropDownList = mappedList;
          console.log('Dropdown list:', this.nonsupplyDropDownList);
          return mappedList;
        } else {
          console.error('No nameText found or incorrect structure:', res);
          return [];
        }
      }),
      catchError((error) => {
        console.error('Error fetching dropdown items:', error);
        this.toastr.error('Failed to load item dropdown');
        return of([]);
      })
    );
  }
 
  onISelectChange(event: Event): void {
    debugger
    const selectedUser = this.nonsupplyDropDownList.find(
      (user: { supplierId: string }) => user.supplierId === this.supplierId
    );

    if (selectedUser) {
      this.supplierId = selectedUser.supplierId || null;
      // this.getTravelVouchers()
    } else {
      console.error('Selected itemid not found in the list.');
    }
  }


 
  

  getNonSupplySummaryDetail() {
    
    const startDate = this.dateRange.value.start;
    const endDate = this.dateRange.value.end;
  // Only format dates if both start and end dates are selected
  const formattedStartDate = startDate ? this.datePipe.transform(startDate, 'dd-MMM-yyyy') : '';
  const formattedEndDate = endDate ? this.datePipe.transform(endDate, 'dd-MMM-yyyy') : '';
    this.spinner.show();

  
   
  
    this.api.NonSupplySummaryDetail(formattedStartDate,formattedEndDate,this.supplierId,0,0,0).subscribe(
      (res) => {
        console.log('Raw API response:', res);
  
        this.nonsupply = res.map((item: any, index: number) => ({
          ...item,
          sno: index + 1
        }));
  
        // console.log('With S.No:', this.nonsupply);
  
        this.dataSource.data = this.nonsupply;
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
    const doc = new jsPDF('l', 'mm', 'a4'); // Landscape A4
  
    const title = 'NON SUPPLY DETAILS';
    doc.setFontSize(16);
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getTextWidth(title);
    const xOffset = (pageWidth - textWidth) / 2;
    doc.text(title, xOffset, 15);
  
    // ✅ Define columns
    const columns = [
      { title: 'S.No', dataKey: 'sno' },
      { title: 'Scheme ID', dataKey: 'schemeId' },
      { title: 'Tender No', dataKey: 'tenderNo' },
      { title: 'Tender Name', dataKey: 'tenderName' },
      { title: 'Item Code', dataKey: 'itemCode' },
      { title: 'Item Name', dataKey: 'itemName' },
      { title: 'Strength', dataKey: 'strength1' },
      { title: 'Unit', dataKey: 'unit' },
      { title: 'Category', dataKey: 'mCategory' },
      { title: 'EDL Type', dataKey: 'edlType' },
      { title: 'PO No ID', dataKey: 'poNoId' },
      { title: 'PO No', dataKey: 'poNo' },
      { title: 'PO Date', dataKey: 'podate' },
      { title: 'Extended Date', dataKey: 'extendedDate' },
      { title: 'PO Qty', dataKey: 'poQty' },
      { title: 'Receipt Qty', dataKey: 'receiptQty' },
      { title: 'Pipeline Qty', dataKey: 'pipelineQty' },
      { title: 'Supply %', dataKey: 'supplyPer' },
      { title: 'Duration', dataKey: 'duration' },
      { title: 'Supplier ID', dataKey: 'supplierId' },
      { title: 'Supplier Name', dataKey: 'supplierName' },
      { title: 'No. of Days', dataKey: 'noOfDays' }
    ];
  
    // ✅ Map rows
    const rows = this.nonsupply.map((item: any, index: number) => ({
      sno: index + 1,
      schemeId: item.schemeId,
      tenderNo: item.tenderNo,
      tenderName: item.tenderName,
      itemCode: item.itemCode,
      itemName: item.itemName,
      strength1: item.strength1,
      unit: item.unit,
      mCategory: item.mCategory,
      edlType: item.edlType,
      poNoId: item.poNoId,
      poNo: item.poNo,
      podate: item.podate,
      extendedDate: item.extendedDate || '-',
      poQty: item.poQty,
      receiptQty: item.receiptQty,
      pipelineQty: item.pipelineQty,
      supplyPer: item.supplyPer,
      duration: item.duration,
      supplierId: item.supplierId,
      supplierName: item.supplierName,
      noOfDays: item.noOfDays
    }));
  
    // ✅ Generate PDF Table
    autoTable(doc, {
      head: [columns.map(col => col.title)],
      body: rows,
      startY: 25,
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185], textColor: 255, fontSize: 9 },
      styles: { fontSize: 8, cellPadding: 2, textColor: [0, 0, 0] },
      columnStyles: {
        0: { cellWidth: 10 },  // S.No
        1: { cellWidth: 18 },  // Scheme ID
        2: { cellWidth: 18 },  // Tender No
        3: { cellWidth: 50 },  // Tender Name
        4: { cellWidth: 18 },  // Item Code
        5: { cellWidth: 45 },  // Item Name
        6: { cellWidth: 25 },  // Strength
        7: { cellWidth: 20 },  // Unit
        11: { cellWidth: 35 }, // PO No
        12: { cellWidth: 22 }, // PO Date
        20: { cellWidth: 30 }  // Supplier Name
      },
      margin: { top: 20, left: 10, right: 10 }
    });
  
    doc.save('nonsupplydetails.pdf');
  }
  
  
  
  applyTextFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
