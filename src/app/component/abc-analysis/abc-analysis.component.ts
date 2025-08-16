import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { NgSelectModule } from '@ng-select/ng-select';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { MatTableExporterModule } from 'mat-table-exporter';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DropdownModule } from 'primeng/dropdown';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-abc-analysis',
  standalone: true,
  imports: [MatIconModule,NgSelectModule,SelectDropDownModule,DropdownModule,MatSelectModule,FormsModule,NgSelectModule,
    FormsModule,CommonModule,MatButtonModule,MatMenuModule, MatTableExporterModule,MatPaginatorModule,MatSortModule,MatDialogModule, 
    MatTableModule,NgApexchartsModule],
  templateUrl: './abc-analysis.component.html',
  styleUrl: './abc-analysis.component.css'
})
export class AbcAnalysisComponent {
applyTextFiltertotal($event: KeyboardEvent) {
throw new Error('Method not implemented.');
}

  selectedCategory: string = 'Drugs'; 
  selectedCategoryE: any = 'Y'; 
  OnChangeTitle:string= 'Category: ' 
  selectedCategoryTitle: string = '';
  mcid=1
  yearid = 0;
   HOD:any='All'
   role:any
   ABCanalysisSummary:any
  dataSource!: MatTableDataSource<any[]>;
  dataSource8 = new MatTableDataSource<any>();
  selectedEdlType: string = 'Y'; // default
  ABCanalysisSummaryDetail:any
  category:any
  rc:any

  selectedYearId: number | null = null;
  
  @ViewChild('paginator8') paginator8!: MatPaginator;
  @ViewChild('sort8') sort8!: MatSort;  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild('StatusDetailsModal') StatusDetailsModal: any;

  constructor(
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef,public api:ApiService,private spinner: NgxSpinnerService,private dialog: MatDialog,){
    this.dataSource = new MatTableDataSource<any>([]);
    

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

    // EDL Types
    edlTypes = [
      { value: 'Y', label: 'EDL' },
      { value: 'N', label: 'Non-EDL' }
    ];
  
 
  
  onYearChange(event: any) {
    this.selectedYearId = +event.target.value;
    console.log('Selected Year ID:', this.selectedYearId);
  }
  
  updateSelectedHodid(): void {
    
    // Reset hodid to 0 initially
    this.mcid = 0;

    // Map the selected category to the corresponding mcid value
    if (this.selectedCategory==='Drugs' ) {
      this.mcid = 1;
      // this.chartOptions.title.text = this.OnChangeTitle +  this.selectedCategory;
    } else if (this.selectedCategory==='Consumables') {
      this.mcid = 2;
      // this.chartOptions.title.text = this.OnChangeTitle + this.selectedCategory;
    } else if (this.selectedCategory==='Reagent') {
      this.mcid = 3;
      // this.chartOptions.title.text = this.OnChangeTitle +  this.selectedCategory;
    } else if (this.selectedCategory==='AYUSH') {
      this.mcid = 4;
      // this.chartOptions.title.text =this.OnChangeTitle +  this.selectedCategory;
    }

    // console.log('Selected Hod ID:', this.mcid);
  }


  showData(){
    // this.loadData(this.selectedYearId,this.mcid,)
    console.log('Selected Type:', this.selectedEdlType);
    console.log('Selected Type:', this.selectedCategory);
    console.log('Selected Year ID:', this.selectedYearId);
    this.loadData(this.selectedYearId,this.mcid,this.selectedEdlType)

  }
  




  loadData(yearid:any,mcid:any,isedl:any): void {

    this.spinner.show();
   
  debugger
    this.api.ABCanalysisSummary(yearid,mcid,isedl).subscribe(
      (res) => {
        console.log('Raw API response:', res);
  
        this.ABCanalysisSummary = res.map((item: any, index: number) => ({
          ...item,
          sno: index + 1
        }));
  
        console.log('With S.No:', this.ABCanalysisSummary);
  
        this.dataSource.data = this.ABCanalysisSummary;
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

 


  noitemslick(rcvalide:any,abc:any) {
    debugger
    this.category=abc
    if(rcvalide==='Y'){
      this.rc='Rc Valid';
    }else{
      this.rc='Rc Not Valid';

    }
    this.spinner.show();

    this.api.ABCanalysisSummaryDetail(this.selectedYearId,this.mcid,this.selectedEdlType,abc,rcvalide).subscribe({
      next: (res: any[]) => {
        if (res && res.length > 0) {
          this.ABCanalysisSummaryDetail = res.map((item: any, index: number) => ({
            ...item,
            sno: index + 1,
          }));

          this.dataSource8.data = this.ABCanalysisSummaryDetail;
          this.dataSource8.paginator = this.paginator8;
          this.dataSource8.sort = this.sort8;
        } else {
          this.toastr.error('No data found');
        }
      },
      error: (err) => {
        console.error('API error:', err);
        this.toastr.error('Failed to load data');
      },
      complete: () => {
        this.spinner.hide();
      },
    });

    this.openDialogHOD();
  }



  exportToPDF() {
    const doc = new jsPDF('l', 'mm', 'a4'); // Landscape mode
  
    const columns = [
      { title: 'S.No', dataKey: 'sno' },
      { title: 'EDL Type', dataKey: 'edltype' },
      { title: 'No. of Indents', dataKey: 'nosIndent' },
      { title: 'RC Valid Count', dataKey: 'rcValidcnt' },
      { title: 'RC Not Valid Count', dataKey: 'rcNotValidcnt' },
      { title: 'Price Count', dataKey: 'pricecnt' },
      { title: 'Evaluation Count', dataKey: 'evalutioncnt' },
      { title: 'Live Count', dataKey: 'liveCnt' },
      { title: 'To Be Tender Count', dataKey: 'rentendercn' }
    ];
  
    // Prepare rows from your API data
    const rows = this.ABCanalysisSummary.map((row: any, index: number) => ({
      sno: index + 1,
      edltype: row.edltype,
      nosIndent: row.nosIndent,
      rcValidcnt: row.rcValidcnt,
      rcNotValidcnt: row.rcNotValidcnt,
      pricecnt: row.pricecnt,
      evalutioncnt: row.evalutioncnt,
      liveCnt: row.liveCnt,
      rentendercn: row.rentendercn
    }));
  
    autoTable(doc, {
      head: [columns.map(col => col.title)],
      body: rows,
      startY: 20,
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185], textColor: 255, fontSize: 10 },
      styles: { fontSize: 9, cellPadding: 2, textColor: [0, 0, 0] },
      columnStyles: {
        0: { cellWidth: 12 },  // S.No
        1: { cellWidth: 25 },  // EDL Type
        2: { cellWidth: 25 },  // No. of Indents
        3: { cellWidth: 28 },  // RC Valid Count
        4: { cellWidth: 33 },  // RC Not Valid Count
        5: { cellWidth: 25 },  // Price Count
        6: { cellWidth: 33 },  // Evaluation Count
        7: { cellWidth: 25 },  // Live Count
        8: { cellWidth: 33 }   // Re-Tender Count
      },
      margin: { top: 20, left: 10, right: 10 }
    });
  
    doc.save('rcindentstatus.pdf');
  }
  

  applyTextFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



openDialogHOD() {
  const dialogRef = this.dialog.open(this.StatusDetailsModal, {
    width: '100%',
    height: '100%',
    maxWidth: '100%',
    panelClass: 'full-screen-dialog', // Optional for additional styling
    data: {
      /* pass any data here */
    },
    // width: '100%',
    // maxWidth: '100%', // Override default maxWidth
    // maxHeight: '100%', // Override default maxHeight
    // panelClass: 'full-screen-dialog' ,// Optional: Custom class for additional styling
    // height: 'auto',
  });
  dialogRef.afterClosed().subscribe((result) => {
    console.log('Dialog closed');
  });
}


exportToPjjDFd() {
  const doc = new jsPDF('l', 'mm', 'a4'); // Landscape mode

  const columns = [
    { title: 'S.No', dataKey: 'sno' },
    { title: 'Item Code', dataKey: 'itemcode' },
    { title: 'Drug Name', dataKey: 'druG_NAME' },
    { title: 'Strength', dataKey: 'strengtH1' },
    { title: 'Unit', dataKey: 'unit' },
    { title: 'Item Type', dataKey: 'itemtypename' },
    { title: 'EDL Category', dataKey: 'edlcat' },
    { title: 'RC Status', dataKey: 'rcStatus' },
    { title: 'RC End Date', dataKey: 'rcendDate' },
    { title: 'RC Remaining Days', dataKey: 'rcremainingdays' },
    { title: 'Supplier Count', dataKey: 'cntsup' },
    { title: 'Tender Status', dataKey: 'tenderstatus' },
    { title: 'Ready For Issue', dataKey: 'readyforissue' },
    { title: 'Pending', dataKey: 'pending' },
    { title: 'IWH Pipeline', dataKey: 'iwhPipeline' },
    { title: 'Supplier Pipeline', dataKey: 'supplierPipeline' },
    { title: 'Order Value', dataKey: 'ordeR_VALUE' },
    { title: 'Cumulative Value', dataKey: 'cumulativE_VALUE' },
    { title: 'Cumulative %', dataKey: 'cumulativE_PERCENT' },
    { title: 'ABC Category', dataKey: 'abC_CATEGORY' }
  ];

  // ✅ Prepare rows
  const rows = this.ABCanalysisSummaryDetail.map((row: any, index: number) => ({
    sno: index + 1,
    itemcode: row.itemcode,
    druG_NAME: row.druG_NAME,
    strengtH1: row.strengtH1,
    unit: row.unit,
    itemtypename: row.itemtypename,
    edlcat: row.edlcat,
    rcStatus: row.rcStatus,
    rcendDate: row.rcendDate,
    rcremainingdays: row.rcremainingdays,
    cntsup: row.cntsup,
    tenderstatus: row.tenderstatus,
    readyforissue: row.readyforissue,
    pending: row.pending,
    iwhPipeline: row.iwhPipeline,
    supplierPipeline: row.supplierPipeline,
    ordeR_VALUE: row.ordeR_VALUE,
    cumulativE_VALUE: row.cumulativE_VALUE,
    cumulativE_PERCENT: row.cumulativE_PERCENT,
    abC_CATEGORY: row.abC_CATEGORY
  }));

  // autoTable(doc, {
  //   head: [columns.map(col => col.title)],
  //   body: rows,
  //   startY: 20,
  //   theme: 'grid',
  //   headStyles: { fillColor: [41, 128, 185], textColor: 255, fontSize: 8 },
  //   styles: { fontSize: 7, cellPadding: 2, textColor: [0, 0, 0] },
  //   margin: { top: 20, left: 10, right: 10 }
  // });
  

  autoTable(doc, {
    columns: columns,
    body: rows,
    startY: 30,
    theme: 'striped',
    styles: { fontSize: 8 },
    headStyles: { fillColor: [22, 160, 133] },
  });

  doc.save('analysis.pdf');
}

exportToPDFd() {
  const doc = new jsPDF('l', 'mm', 'a4'); // Landscape

  const now = new Date();
  const dateString = now.toLocaleDateString();
  const timeString = now.toLocaleTimeString();

  const title = 'Analysis';
  doc.setFontSize(18);
  const pageWidth = doc.internal.pageSize.getWidth();
  const textWidth = doc.getTextWidth(title);
  const xOffset = (pageWidth - textWidth) / 2;
  doc.text(title, xOffset, 20);

  doc.setFontSize(10);
  // doc.text(Date: ${dateString}  Time: ${timeString}, 10, 10);


  const columns = [
    { title: 'S.No', dataKey: 'sno' },
    { title: 'Item Code', dataKey: 'itemcode' },
    { title: 'Drug Name', dataKey: 'druG_NAME' },
    { title: 'Strength', dataKey: 'strengtH1' },
    { title: 'Unit', dataKey: 'unit' },
    { title: 'Item Type', dataKey: 'itemtypename' },
    { title: 'EDL Category', dataKey: 'edlcat' },
    { title: 'RC Status', dataKey: 'rcStatus' },
    { title: 'RC End Date', dataKey: 'rcendDate' },
    { title: 'RC Remaining Days', dataKey: 'rcremainingdays' },
    { title: 'Supplier Count', dataKey: 'cntsup' },
    { title: 'Tender Status', dataKey: 'tenderstatus' },
    { title: 'Ready For Issue', dataKey: 'readyforissue' },
    { title: 'Pending', dataKey: 'pending' },
    { title: 'IWH Pipeline', dataKey: 'iwhPipeline' },
    { title: 'Supplier Pipeline', dataKey: 'supplierPipeline' },
    { title: 'Order Value', dataKey: 'ordeR_VALUE' },
    { title: 'Cumulative Value', dataKey: 'cumulativE_VALUE' },
    { title: 'Cumulative %', dataKey: 'cumulativE_PERCENT' },
    { title: 'ABC Category', dataKey: 'abC_CATEGORY' }
  ];

  
  const rows = this.ABCanalysisSummaryDetail.map(
    (item: any, index: number) => ({
      sno: index + 1,
      itemcode: item.itemcode,
      druG_NAME: item.druG_NAME,
      strengtH1: item.strengtH1,
      unit: item.unit,
      itemtypename: item.itemtypename,
      edlcat: item.edlcat,
      rcStatus: item.rcStatus,
      rcendDate: item.rcendDate,
      rcremainingdays: item.rcremainingdays,
      cntsup: item.cntsup,
      tenderstatus: item.tenderstatus,
      readyforissue: item.readyforissue,
      pending: item.pending,
      iwhPipeline: item.iwhPipeline,
      supplierPipeline: item.supplierPipeline,
      ordeR_VALUE: item.ordeR_VALUE,
      cumulativE_VALUE: item.cumulativE_VALUE,
      cumulativE_PERCENT: item.cumulativE_PERCENT,
      abC_CATEGORY: item.abC_CATEGORY
    })
  );

  autoTable(doc, {
    columns: columns,
    body: rows,
    startY: 30,
    theme: 'striped',
    styles: { fontSize: 8 },
    headStyles: { fillColor: [22, 160, 133] },
  });

  doc.save('ABCanalysisDetail.pdf');
}



}
