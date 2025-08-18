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
import { DropdownModule } from 'primeng/dropdown';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-near-expiry-batchwise',
  standalone: true,
  imports: [MatIconModule,NgSelectModule,SelectDropDownModule,DropdownModule,MatSelectModule,FormsModule,NgSelectModule,
    FormsModule,CommonModule,MatButtonModule,MatMenuModule, MatTableExporterModule,MatPaginatorModule,MatSortModule,MatDialogModule, 
    MatTableModule,NgApexchartsModule],
  templateUrl: './near-expiry-batchwise.component.html',
  styleUrl: './near-expiry-batchwise.component.css'
})
export class NearExpiryBatchwiseComponent {

  dataSource!: MatTableDataSource<any[]>;
  nearexpiryBatchwise:any;
  selectedCategory: string = 'Drugs'; 

  ngOnInit() {
  this.loadData(3);
   
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private cdr: ChangeDetectorRef,public api:ApiService,private spinner: NgxSpinnerService,private dialog: MatDialog){
    this.dataSource = new MatTableDataSource<any>([]);

  }
  selectedMonths: number = 3; // Default value
  selectedMonthLabel: string = '3 Months';

monthOptions = [
  { value: 3, label: '3 Months' },
  { value: 6, label: '6 Months' },
  { value: 9, label: '9 Months' }
];

onMonthChange(value: number) {
  
  const selected = this.monthOptions.find(m => m.value === value);
  this.selectedMonthLabel = selected ? selected.label : '';
  this.loadData(value);
}




  loadData(month:any): void {
    
        this.spinner.show();
       
      
        this.api.NearExpiryBatchWise(month).subscribe(
          (res) => {
            console.log('Raw API response:', res);
      
            this.nearexpiryBatchwise = res.map((item: any, index: number) => ({
              ...item,
              sno: index + 1
            }));
      
            console.log('With S.No:', this.nearexpiryBatchwise);
      
            this.dataSource.data = this.nearexpiryBatchwise;
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
          { title: 'Warehouse', dataKey: 'warehouseName' },
          { title: 'Equipment', dataKey: 'eqpName' },
          { title: 'Code', dataKey: 'itemCode' },
          { title: 'Item', dataKey: 'itemName' },
          { title: 'Batch No', dataKey: 'batchNo' },
          { title: 'Exp Date', dataKey: 'expDate' },
          { title: 'Exp Qty', dataKey: 'expQty' },
          { title: 'Exp Value', dataKey: 'exValue' },
          { title: 'Category', dataKey: 'categoryName' },
          
        ];
      
        const rows = this.nearexpiryBatchwise.map((row: any, index: number) => ({
          sno: index + 1,
          warehouseName: row.warehouseName,
          eqpName: row.eqpName || '',
          itemCode: row.itemCode,
          itemName: row.itemName,
          batchNo: row.batchNo,
          expDate: row.expDate,
          expQty: row.expQty,
          exValue: row.exValue,
          categoryName: row.categoryName,
         
        }));
      
        autoTable(doc, {
          head: [columns.map(col => col.title)],
          body: rows,
          startY: 20,
          theme: 'grid',
          headStyles: { fillColor: [41, 128, 185], textColor: 255, fontSize: 10 },
          styles: { fontSize: 9, cellPadding: 2, textColor: [0, 0, 0] },
          columnStyles: {
            0: { cellWidth: 12 },   // S.No
            1: { cellWidth: 25 },   // Warehouse
            2: { cellWidth: 25 },   // Equipment
            3: { cellWidth: 25 },   // Code
            4: { cellWidth: 35 },   // Item
            5: { cellWidth: 25 },   // Batch No
            6: { cellWidth: 25 },   // Exp Date
            7: { cellWidth: 20 },   // Exp Qty
            8: { cellWidth: 30 },   // Exp Value
            9: { cellWidth: 25 },   // Category
        
          },
          margin: { top: 20, left: 10, right: 10 }
        });
      
        doc.save('nearexpirybatchwise.pdf');
      }
      
      
      
    
      applyTextFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      }
}
