import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { ToastrService } from 'ngx-toastr';
import { DropdownModule } from 'primeng/dropdown';
import { Observable, map, catchError, of, finalize, forkJoin } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import { MatDatepickerModule } from "@angular/material/datepicker";

@Component({
  selector: 'app-hold-batch-history',
  standalone: true,
  imports: [MatTableModule,ReactiveFormsModule,
    MatTableExporterModule, MatIconModule, NgSelectModule, SelectDropDownModule, DropdownModule, MatSelectModule, FormsModule, NgSelectModule,
    FormsModule, CommonModule, MatButtonModule, MatMenuModule, MatPaginatorModule, MatSortModule, MatDialogModule,
    NgApexchartsModule, MatDatepickerModule],
  templateUrl: './hold-batch-history.component.html',
  styleUrl: './hold-batch-history.component.css'
})
export class HoldBatchHistoryComponent {
  
  mcid=1
  selectedCategory: string = 'Drugs';
  selectedCategory2: string = 'HOLD';
  MasIndentitemslist: any;
  itemid: any;
  dataSource!: MatTableDataSource<any[]>;
  holdBatchHistory: any[] = [];
  dateRange!: FormGroup;

  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


    
    
    constructor(public datePipe: DatePipe,public toastr: ToastrService,private cdr: ChangeDetectorRef,public api:ApiService,private spinner: NgxSpinnerService,private dialog: MatDialog,
      private fb: FormBuilder)
  {
    this.dataSource = new MatTableDataSource<any>([]);

    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  
    this.dateRange = this.fb.group({
      start: [firstDayOfMonth, [Validators.required, this.startDateValidator.bind(this)]],
      end: [today, Validators.required]
    });
  
    this.dateRange.valueChanges.subscribe(val => {
      console.log('Date Range Changed:', val);
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
       
    this.getItemNoDropDown().pipe(catchError(() => of(null))),

  ])
    .pipe(finalize(() => this.spinner.hide()))
    .subscribe({
      error: () => this.toastr.error('Some data failed to load'),
    });


  

  }

  getItemNoDropDown(): Observable<any[]> {
    
    return this.api.MasIndentitems(this.mcid, 0, 0, 0).pipe(
      map((res: any[]) => {
        if (res && res.length > 0) {
          const mappedList = res.map((item) => ({
            itemid: item.itemid,
            nameText: item.nameText,
          }));
          this.MasIndentitemslist = mappedList;
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
    
    const selectedUser = this.MasIndentitemslist.find(
      (user: { itemid: string }) => user.itemid === this.itemid
    );

    if (selectedUser) {
      this.itemid = selectedUser.itemid || null;
      // this.getTravelVouchers()
    } else {
      console.error('Selected itemid not found in the list.');
    }
  }


  updateSelectedCat(): void {
    
    this.mcid = 1;

    if (this.selectedCategory==='Drugs' ) {
      this.mcid = 1;
    } else if (this.selectedCategory==='Consumables') {
      this.mcid = 2;
    } else if (this.selectedCategory==='Reagent') {
      this.mcid = 3;
    } else if (this.selectedCategory==='AYUSH') {
      this.mcid = 4;
    }

   // Create API calls with individual error handling
   forkJoin([
       
    this.getItemNoDropDown().pipe(catchError(() => of(null))),

  ])
    .pipe(finalize(() => this.spinner.hide()))
    .subscribe({
      error: () => this.toastr.error('Some data failed to load'),
    });


  }

  updateSelectedHodid(): void {
    
   

    if (this.selectedCategory2==='HOLD' ) {

    } else if (this.selectedCategory2==='NSQ') {
    }

    

  }

  getHoldBatchHistory() {
    
    const startDate = this.dateRange.value.start;
    const endDate = this.dateRange.value.end;
  // Only format dates if both start and end dates are selected
  const formattedStartDate = startDate ? this.datePipe.transform(startDate, 'dd-MMM-yyyy') : '';
  const formattedEndDate = endDate ? this.datePipe.transform(endDate, 'dd-MMM-yyyy') : '';
    this.spinner.show();

    if(this.selectedCategory2==''){
      this.toastr.info('Please Select All Categories')
    }
   
  
    this.api.HoldBatchHistory(this.mcid,formattedStartDate,formattedEndDate,this.itemid,this.selectedCategory2).subscribe(
      (res) => {
        console.log('Raw API response:', res);
  
        this.holdBatchHistory = res.map((item: any, index: number) => ({
          ...item,
          sno: index + 1
        }));
  
        console.log('With S.No:', this.holdBatchHistory);
  
        this.dataSource.data = this.holdBatchHistory;
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
  
    const title = 'HOLD/NSQ STOCK DETAILS';
    doc.setFontSize(16);
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getTextWidth(title);
    const xOffset = (pageWidth - textWidth) / 2;
    doc.text(title, xOffset, 15);
  
    // ✅ Define columns
    const columns = [
      { title: 'S.No', dataKey: 'sno' },
      { title: 'WAREHOUSE', dataKey: 'warehousename' },
      { title: 'CATEGORY', dataKey: 'category' },
      { title: 'ITEMCODE', dataKey: 'itemcode' },
      { title: 'ITEMNAME', dataKey: 'itemname' },
      { title: 'STRENGTH', dataKey: 'strength' },
      { title: 'SKU', dataKey: 'sku' },
      { title: 'PONO', dataKey: 'pono' },
      { title: 'PODATE', dataKey: 'podate' },
      { title: 'SUPPLIERNAME', dataKey: 'suppliername' },
      { title: 'BATCH NO', dataKey: 'batchno' },
      { title: 'MFG DATE', dataKey: 'mfgdate' },
      { title: 'EXP DATE', dataKey: 'expdate' },
      { title: 'HOLD STOCK', dataKey: 'holdStock' },
      { title: 'HOLD DATE', dataKey: 'holddate' },
      { title: 'HOLDREASON', dataKey: 'holdreason' },
      { title: 'RECEIPT FROM SUPPLIER', dataKey: 'supplierReceipt' },
      { title: 'RECEIPT FROM INTER WAREHOUSE TRANSFER', dataKey: 'iwhReceiptQTy' },
      { title: 'FACILITY ISSUE', dataKey: 'fac_iss_qty' },
      { title: 'RETURN FROM FACILITY', dataKey: 'rF_Qty' },
      { title: 'RETURN TO SUPPLIER', dataKey: 'rsqty' },
      { title: 'REPLACED QTY BY SUPPLIER', dataKey: 'rpqty' },
    ];
  
    // ✅ Map data rows
    const rows = this.holdBatchHistory.map((item: any, index: number) => ({
      sno: index + 1,
      warehousename: item.warehousename,
      category: item.category,
      itemcode: item.itemcode,
      itemname: item.itemname,
      strength: item.strength,
      sku: item.sku,
      pono: item.pono,
      podate: item.podate ? new Date(item.podate).toLocaleDateString() : '',
      suppliername: item.suppliername,
      batchno: item.batchno,
      mfgdate: item.mfgdate ? new Date(item.mfgdate).toLocaleDateString() : '',
      expdate: item.expdate ? new Date(item.expdate).toLocaleDateString() : '',
      holdStock: item.holdStock,
      holddate: item.holddate,
      holdreason: item.holdreason,
      supplierReceipt: item.supplierReceipt,
      iwhReceiptQTy: item.iwhReceiptQTy,
      fac_iss_qty: item.fac_iss_qty,
      rF_Qty: item.rF_Qty,
      rsqty: item.rsqty,
      rpqty: item.rpqty,
    }));
  
    // ✅ Generate PDF table
    autoTable(doc, {
      head: [columns.map(col => col.title)],
      body: rows.map(row => columns.map(col => row[col.dataKey as keyof typeof row] || '')),
      startY: 25,
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185], textColor: 255, fontSize: 9 },
      styles: { fontSize: 8, cellPadding: 2, textColor: [0, 0, 0] },
      columnStyles: {
        0: { cellWidth: 12 }, // S.No
        3: { cellWidth: 20 }, // Item Code
        4: { cellWidth: 40 }, // Item Name
        7: { cellWidth: 35 }, // PONO
        9: { cellWidth: 40 }, // Supplier Name
        15: { cellWidth: 35 }, // Hold Reason
      },
      margin: { top: 20, left: 10, right: 10 }
    });
  
    doc.save('holdBatchHistory.pdf');
  }
  
  
  applyTextFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
