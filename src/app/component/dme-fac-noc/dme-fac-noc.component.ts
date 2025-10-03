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
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-dme-fac-noc',
  standalone: true,
  imports: [MatTableModule,ReactiveFormsModule,
    MatTableExporterModule, MatIconModule, NgSelectModule, SelectDropDownModule, DropdownModule, MatSelectModule, FormsModule, NgSelectModule,
    FormsModule, CommonModule, MatButtonModule, MatMenuModule, MatPaginatorModule, MatSortModule, MatDialogModule,
    NgApexchartsModule,MatTabsModule, MatDatepickerModule],
  templateUrl: './dme-fac-noc.component.html',
  styleUrl: './dme-fac-noc.component.css'
})
export class DmeFacNocComponent {
  mcid=1
  selectedCategory: string = 'Drugs';
  DmeFacNocSummary: any;
  facilityid: any;
  dataSource!: MatTableDataSource<any[]>;
  dmeFacNocDetail: any[] = [];
  dateRange!: FormGroup;
  selectedYearId: number | null = null;
  selectedLabele:any;

  electedTabIndex: number = 0;
  selectedTabIndex: number = 0;
 
    selectedTabValue(event: any): void {
      
      this.selectedTabIndex = event.index;
    }

  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


    
    
    constructor(public datePipe: DatePipe,public toastr: ToastrService,private cdr: ChangeDetectorRef,public api:ApiService,private spinner: NgxSpinnerService,private dialog: MatDialog,
      private fb: FormBuilder)
  {
    this.dataSource = new MatTableDataSource<any>([]);

    const today = new Date();
    // const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const firstDayOfMonth = new Date(2025, 3, 1); // month is 0-based → 3 = April

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



  

  }

  years = [
    // { id: 539, label: '2019-2020' },
    // { id: 540, label: '2020-2021' },
    // { id: 541, label: '2021-2022' },
    { id: 542, label: '2022-2023' },
    { id: 544, label: '2023-2024' },
    { id: 545, label: '2024-2025' },
    { id: 546, label: '2025-2026' }
  ];

  getItemNoDropDown(): Observable<any[]> {

    const startDate = this.dateRange.value.start;
    const endDate = this.dateRange.value.end;
  // Only format dates if both start and end dates are selected
  const formattedStartDate = startDate ? this.datePipe.transform(startDate, 'dd-MM-yyyy') : '';
  const formattedEndDate = endDate ? this.datePipe.transform(endDate, 'dd-MM-yyyy') : '';
  debugger
    this.spinner.show();

    
    
    return this.api.DmeFacNocSummary(formattedStartDate, formattedEndDate,this.mcid,this.selectedYearId).pipe(
      map((res: any[]) => {
        if (res && res.length > 0) {
          const mappedList = res.map((item) => ({
            facilityid: item.facilityid,
            facilityname: item.facilityname,
          }));
          this.DmeFacNocSummary = mappedList;
          return mappedList;
        } else {
          console.error('No facilityname found or incorrect structure:', res);
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
    
    const selectedUser = this.DmeFacNocSummary.find(
      (user: { facilityid: string }) => user.facilityid === this.facilityid
    );

    if (selectedUser) {
      this.facilityid = selectedUser.facilityid || null;
      // this.getTravelVouchers()
    } else {
      console.error('Selected facilityid not found in the list.');
    }
  }
  onYearChange(event: any) {
  
    this.selectedYearId = +event.target.value;
   
    const selectedLabel = event.target.options[event.target.selectedIndex].text;
    this.selectedLabele=selectedLabel
  
    console.log('Selected Year ID:', this.selectedYearId);
    console.log('Selected Year Label:', selectedLabel);
debugger

    forkJoin([
       
      this.getItemNoDropDown().pipe(catchError(() => of(null))),
  
    ])
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe({
        error: () => this.toastr.error('Some data failed to load'),
      });


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
  //  forkJoin([
       
  //   this.getItemNoDropDown().pipe(catchError(() => of(null))),

  // ])
  //   .pipe(finalize(() => this.spinner.hide()))
  //   .subscribe({
  //     error: () => this.toastr.error('Some data failed to load'),
  //   });


  }

 

  // getDmeFacNocDetail() {
    
  //   const startDate = this.dateRange.value.start;
  //   const endDate = this.dateRange.value.end;


  
  // if (!startDate || !endDate || !this.mcid || !this.selectedYearId || !this.facilityid) {
  //   this.toastr.warning('Please select all filters before searching.');
  //   return;
  // }

  // const formattedStartDate = startDate ? this.datePipe.transform(startDate, 'dd-MM-yyyy') : '';
  // const formattedEndDate = endDate ? this.datePipe.transform(endDate, 'dd-MM-yyyy') : '';
  //   this.spinner.show();

    
   
  
  //   this.api.DmeFacNocDetail(formattedStartDate,formattedEndDate,this.mcid,this.selectedYearId,this.facilityid).subscribe(
  //     (res) => {
        
  //       if (res && res.length > 0) {

  //         console.log('Raw API response:', res);
  
  //         this.dmeFacNocDetail = res.map((item: any, index: number) => ({
  //           ...item,
  //           sno: index + 1
  //         }));
    
  //         console.log('With S.No:', this.dmeFacNocDetail);
    
  //         this.dataSource.data = this.dmeFacNocDetail;
  //         this.dataSource.paginator = this.paginator;
  //         this.dataSource.sort = this.sort;
    
  //         this.spinner.hide();
  //         this.cdr.detectChanges();

  //       }else {
  //         console.error('No data found:', res);
  //         this.dmeFacNocDetail = [];
  //       }
     
  //     },
  //     (error) => {
  //       console.error('Error fetching details:', error);
  //       this.toastr.error('Failed to load data');
  //       this.spinner.hide();
  //     }
  //   );
  // }
  selectedEdlType: string = 'All';   // Default selection
originalData: any[] = [];          // Keep unfiltered data

getDmeFacNocDetail() {
  const startDate = this.dateRange.value.start;
  const endDate = this.dateRange.value.end;

  if (!startDate || !endDate || !this.mcid || !this.selectedYearId || !this.facilityid) {
    this.toastr.warning('Please select all filters before searching.');
    return;
  }

  const formattedStartDate = startDate ? this.datePipe.transform(startDate, 'dd-MM-yyyy') : '';
  const formattedEndDate = endDate ? this.datePipe.transform(endDate, 'dd-MM-yyyy') : '';

  this.spinner.show();

  this.api.DmeFacNocDetail(formattedStartDate, formattedEndDate, this.mcid, this.selectedYearId, this.facilityid).subscribe(
    (res) => {
      if (res && res.length > 0) {
        this.originalData = res.map((item: any, index: number) => ({
          ...item,
          sno: index + 1
        }));

        this.dataSource.data = this.originalData;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.spinner.hide();
        this.cdr.detectChanges();
      } else {
        this.dmeFacNocDetail = [];
        this.dataSource.data = [];
        this.spinner.hide();
      }
    },
    (error) => {
      this.toastr.error('Failed to load data');
      this.spinner.hide();
    }
  );
}

applyEdlFilter() {
  let filteredData: any[] = [];

  if (this.selectedEdlType === 'All') {
    filteredData = this.originalData;
  } else {
    filteredData = this.originalData.filter(
      item => item.eDlType === this.selectedEdlType
    );
  }

  // 🔹 Reassign S.No after filtering
  filteredData = filteredData.map((item, index) => ({
    ...item,
    sno: index + 1
  }));

  this.dataSource.data = filteredData;
}



  exportToPDF() {
    const doc = new jsPDF('l', 'mm', 'a4'); // Landscape A4
  
    const title = 'NOC DETAILS';
    doc.setFontSize(16);
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getTextWidth(title);
    const xOffset = (pageWidth - textWidth) / 2;
    doc.text(title, xOffset, 15);
  
    // ✅ Define columns
    const columns = [
      { title: 'S.No', dataKey: 'sno' },
      { title: 'Category', dataKey: 'mcategory' },
      { title: 'EDL Type', dataKey: 'eDlType' },
      { title: 'Facility', dataKey: 'facilityname' },
      { title: 'District', dataKey: 'districtname' },
      { title: 'Item ', dataKey: 'itemname' },
      { title: 'Code', dataKey: 'itemcode' },
      { title: 'Strength', dataKey: 'strength1' },
      { title: 'Unit', dataKey: 'unit' },
      { title: 'Unit C', dataKey: 'unitc' },
      { title: 'Facility AI Qty', dataKey: 'facAIQty' },
      { title: 'CGMSC Issue Qty', dataKey: 'cgmsCissueqty' },
      { title: 'Count NOC', dataKey: 'cntNoc' },
      { title: 'NOC Qty', dataKey: 'nocQty' },
      { title: 'NOC Value', dataKey: 'nocValue' },
      { title: 'PO SKU', dataKey: 'posku' },
      { title: 'PO Value', dataKey: 'povalue' },
      { title: 'Receipt Qty SKU', dataKey: 'receiptqtySKU' },
      { title: 'Received Value', dataKey: 'recvalue' },
    ];
  
    // ✅ Map data rows
    const rows = this.dmeFacNocDetail.map((item: any, index: number) => ({
      sno: index + 1,
      mcategory: item.mcategory,
      eDlType: item.eDlType,
      facilityname: item.facilityname,
      districtname: item.districtname,
      itemname: item.itemname,
      itemcode: item.itemcode,
      strength1: item.strength1,
      unit: item.unit,
      unitc: item.unitc,
      facAIQty: item.facAIQty,
      cgmsCissueqty: item.cgmsCissueqty,
      cntNoc: item.cntNoc,
      nocQty: item.nocQty,
      nocValue: item.nocValue,
      posku: item.posku,
      povalue: item.povalue,
      receiptqtySKU: item.receiptqtySKU,
      recvalue: item.recvalue,
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
        0: { cellWidth: 12 },  // S.No
        6: { cellWidth: 40 },  // Item Name
        7: { cellWidth: 25 },  // Strength
        11: { cellWidth: 25 }, // CGMSC Issue Qty
        14: { cellWidth: 25 }, // NOC Value
        18: { cellWidth: 25 }, // Received Value
      },
      margin: { top: 20, left: 10, right: 10 }
    });
  
    doc.save('dmeFacNocDetail.pdf');
  }
  
  
  
  applyTextFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
