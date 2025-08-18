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
import { RCValidDrillDownmodel } from 'src/app/Model/DashLoginDDL';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-rc-valid-status',
  standalone: true,
  imports: [MatIconModule,NgSelectModule,SelectDropDownModule,DropdownModule,MatSelectModule,FormsModule,NgSelectModule,
    FormsModule,CommonModule,MatButtonModule,MatMenuModule, MatTableExporterModule,MatPaginatorModule,MatSortModule,MatDialogModule, 
    MatTableModule,NgApexchartsModule],
  templateUrl: './rc-valid-status.component.html',
  styleUrl: './rc-valid-status.component.css'
})
export class RcValidStatusComponent {
  selectedCategory: string = 'Drugs'; 
  OnChangeTitle:string= 'Category: ' 
  selectedCategoryTitle: string = '';
  mcid=1
  yearid = 0;
   HOD:any='All'
   role:any
   rcvalidstatusdetail:any
   edlType:any;
   drillType:any;
   name:any;
   RCValidDrillDownmodelDetail:RCValidDrillDownmodel[]=[];
   dataSource1!: MatTableDataSource<RCValidDrillDownmodel>;


  dataSource!: MatTableDataSource<any[]>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('paginator1') paginator1!: MatPaginator;
  @ViewChild('sort1') sort1!: MatSort;
  @ViewChild('itemDetailsModal') itemDetailsModal: any;
  hoType:any;
  baseDisplayedColumns: string[] = [
    "sno",
    // 'itemId',
    'itemCode',
    'itemName',
    'sku',
    // "unitcount",
    "edlType",
    'dhsAiQty',
    'dmeAiQty',
    'rcEndDate',
    'rcRate',
    'noOfSuppliers',
    'actionCode',
    'tenderStatus',
    // "action"
  ];
  displayedColumns: string[] = [];
  constructor(private cdr: ChangeDetectorRef,public api:ApiService,private spinner: NgxSpinnerService,private dialog: MatDialog){
    this.dataSource = new MatTableDataSource<any>([]);
    this.dataSource1 =  new MatTableDataSource<RCValidDrillDownmodel>([]);

  }
  ngOnInit() {
    // initial set
  }
  updateDisplayedColumns(drillType:any) {
    debugger;
    // copy base
    this.displayedColumns = [...this.baseDisplayedColumns];
  
    // if drillType is RCNotValid, remove rcEndDate and rcRate
    if (drillType === 'RCNotValid') {
      this.displayedColumns = this.displayedColumns.filter(
        c => c !== 'rcEndDate' && c !== 'rcRate'
      );
    }
  }
  updateSelectedHodid(): void {
    
    // Reset hodid to 0 initially
    this.mcid = 1;

    // Map the selected category to the corresponding mcid value
    if (this.selectedCategory==='All') {
      this.mcid = 0;
    }else if(this.selectedCategory==='Drugs'){
      this.mcid = 1;
      this.name='Drugs'
    }
     else if (this.selectedCategory==='Consumables') {
      this.mcid = 2;
      this.name='Consumables'
    } else if (this.selectedCategory==='Reagent') {
      this.mcid = 3;
      this.name='Reagent'
    } else if (this.selectedCategory==='AYUSH') {
      this.mcid = 4;
      this.name='AYUSH'
    }

    // console.log('Selected Hod ID:', this.mcid);
  }




  loadData(yearid:any,mcid:any,hoType:any): void {
   
      this.hoType=hoType;
      // this.hoType = this.hoType == 0 ? 'All' : this.hoType;
    this.spinner.show();
    this.api.RCValidSatus(yearid,mcid,hoType).subscribe(
      (res) => {
        console.log('Raw API response:', res);
  
        this.rcvalidstatusdetail = res.map((item: any, index: number) => ({
          ...item,
          sno: index + 1
        }));
  
        console.log('With S.No:', this.rcvalidstatusdetail);
  
        this.dataSource.data = this.rcvalidstatusdetail;
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
    const rows = this.rcvalidstatusdetail.map((row: any, index: number) => ({
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
//#region lomesh code 
GETRCValidDrillDown(yearId:any,mcid:any,drillType:any,edlType:any){
  try{
  this.updateDisplayedColumns(drillType);
  this.drillType=drillType;
  this.edlType=edlType;
  this.hoType
  // debugger;
  // RCValidDrillDown(yearId:any,mcid:any,hoType:any,drillType:any,edlType:any){
    // https://dpdmis.in/CGMSCHO_API2/api/DashboardHome/RCValidDrillDown?yearId=546&mcId=1&hoType=0&drillType=nosIndent&edlType=NON%20EDL
    // this.hoType;
  this.spinner.show();
  
  this.api.RCValidDrillDown(yearId,mcid,this.hoType,drillType,edlType).subscribe(
    (res) => {
      // console.log('Raw API response:', res);

      this.RCValidDrillDownmodelDetail = res.map((item: any, index: number) => ({
        ...item,
        sno: index + 1
      }));

      console.log('RCValidDrillDownmodelDetail:', this.RCValidDrillDownmodelDetail);

      this.dataSource1.data = this.RCValidDrillDownmodelDetail;
      this.dataSource1.paginator = this.paginator1;
      this.dataSource1.sort = this.sort1;

      this.spinner.hide();
      this.cdr.detectChanges();
    },
    (error) => {
      console.error('API error:', error);
      this.spinner.hide();
    }
  );
}catch(er:any){
  console.error('API error:', er.message);
}
this.openDialog();
}

applyTextFilterRCValidDrillDownDetail(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource1.filter = filterValue.trim().toLowerCase();
  if (this.dataSource1.paginator) {
    this.dataSource1.paginator.firstPage();
  }
}


exportToPDFRCValidDrillDownDetails() {
  const doc = new jsPDF('l', 'mm', 'a4'); // Landscape

  const now = new Date();
  const dateString = now.toLocaleDateString();
  const timeString = now.toLocaleTimeString();

  const title = 'Warehouse Wise StockOut Details';
  doc.setFontSize(18);
  const pageWidth = doc.internal.pageSize.getWidth();
  const textWidth = doc.getTextWidth(title);
  const xOffset = (pageWidth - textWidth) / 2;
  doc.text(title, xOffset, 20);

  doc.setFontSize(10);
  doc.text(`Date: ${dateString}  Time: ${timeString}`, 10, 10);
  const columns = [
    { header: 'S.No', dataKey: 'sno' },
    { header: 'Item ID', dataKey: 'itemId' },
    { header: 'Item Code', dataKey: 'itemCode' },
    { header: 'Item Name', dataKey: 'itemName' },
    { header: 'SKU', dataKey: 'sku' },
    { header: 'Unit Count', dataKey: 'unitCount' },
    { header: 'EDL Type', dataKey: 'edlType' },
    { header: 'DHS AI Qty', dataKey: 'dhsAiQty' },
    { header: 'DME AI Qty', dataKey: 'dmeAiQty' },
    { header: 'RC End Date', dataKey: 'rcEndDate' },
    { header: 'RC Rate', dataKey: 'rcRate' },
    { header: 'No. of Suppliers', dataKey: 'noOfSuppliers' },
    { header: 'Tender Status', dataKey: 'tenderStatus' },
    { header: 'Action Code', dataKey: 'actionCode' },
  ];
  const rows = this.RCValidDrillDownmodelDetail.map(
    (item: any, index: number) => ({
      sno: index + 1,
      itemId: item.itemId,
      itemCode: item.itemCode,
      itemName: item.itemName,
      sku: item.sku,
      unitCount: item.unitCount,
      edlType: item.edlType,
      dhsAiQty: item.dhsAiQty,
      dmeAiQty: item.dmeAiQty,
      rcEndDate: item.rcEndDate,
      rcRate: item.rcRate,
      noOfSuppliers: item.noOfSuppliers,
      tenderStatus: item.tenderStatus,
      actionCode: item.actionCode,
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

  doc.save('RCValidDrillDetails.pdf');
}


openDialog() {
  const dialogRef = this.dialog.open(this.itemDetailsModal, {
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

//#endregion



}
