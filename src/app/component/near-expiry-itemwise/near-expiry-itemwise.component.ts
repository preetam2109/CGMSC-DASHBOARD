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
  selector: 'app-near-expiry-itemwise',
  standalone: true,
  imports: [MatIconModule,NgSelectModule,SelectDropDownModule,DropdownModule,MatSelectModule,FormsModule,NgSelectModule,
    FormsModule,CommonModule,MatButtonModule,MatMenuModule, MatTableExporterModule,MatPaginatorModule,MatSortModule,MatDialogModule, 
    MatTableModule,NgApexchartsModule],
  templateUrl: './near-expiry-itemwise.component.html',
  styleUrl: './near-expiry-itemwise.component.css'
})
export class NearExpiryItemwiseComponent {

  dataSource!: MatTableDataSource<any[]>;
  nearexpiryitemwise:any;
  mcid=1
  selectedCategory: string = 'Drugs'; 

  ngOnInit() {
  this.loadData(3,this.mcid);
   
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
  this.loadData(value,this.mcid);
}

updateSelectedHodid(): void {
    
  // Reset hodid to 0 initially
  this.mcid = 1;

  // Map the selected category to the corresponding mcid value
  if (this.selectedCategory==='All') {
    this.mcid = 0;
  }else if(this.selectedCategory==='Drugs'){
    this.mcid = 1;

  }
   else if (this.selectedCategory==='Consumables') {
    this.mcid = 2;
  } else if (this.selectedCategory==='Reagent') {
    this.mcid = 3;
  } else if (this.selectedCategory==='AYUSH') {
    this.mcid = 4;
  }

  // console.log('Selected Hod ID:', this.mcid);
}


  loadData(month:any,mcid:any): void {
    
        this.spinner.show();
       
      
        this.api.NearExpiryItemsWH(month,mcid).subscribe(
          (res) => {
            console.log('Raw API response:', res);
      
            this.nearexpiryitemwise = res.map((item: any, index: number) => ({
              ...item,
              sno: index + 1
            }));
      
            console.log('With S.No:', this.nearexpiryitemwise);
      
            this.dataSource.data = this.nearexpiryitemwise;
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
      
        // Define columns based on your new data fields
        const columns = [
          { title: 'S.No', dataKey: 'sno' },
          { title: 'Warehouse Name', dataKey: 'warehousename' },
          { title: 'Main Category', dataKey: 'mcategory' },
          { title: 'EDL Type', dataKey: 'edltype' },
          { title: 'Equipment Name', dataKey: 'eqpname' },
          { title: 'Item Code', dataKey: 'itemcode' },
          { title: 'Strength', dataKey: 'strengtH1' },
          { title: 'Item Name', dataKey: 'itemname' },
          { title: 'Expiry Month', dataKey: 'expmonth' },
          { title: 'Month No.', dataKey: 'mon' },
          { title: 'Exp Qty', dataKey: 'expqty' },
          { title: 'Exp Value', dataKey: 'exvalue' },
        
        ];
      
        // Prepare rows from your API data
        const rows = this.nearexpiryitemwise.map((row: any, index: number) => ({
          sno: index + 1,
          warehousename: row.warehousename,
          mcategory: row.mcategory,
          edltype: row.edltype,
          eqpname: row.eqpname,
          itemcode: row.itemcode,
          strengtH1: row.strengtH1,
          itemname: row.itemname,
          expmonth: row.expmonth,
          mon: row.mon,
          expqty: row.expqty,
          exvalue: row.exvalue,
         
        }));
      
        autoTable(doc, {
          head: [columns.map(col => col.title)],
          body: rows,
          startY: 20,
          theme: 'grid',
          headStyles: { fillColor: [41, 128, 185], textColor: 255, fontSize: 9 },
          styles: { fontSize: 8, cellPadding: 2, textColor: [0, 0, 0] },
          columnStyles: {
            0: { cellWidth: 10 },  // S.No
            1: { cellWidth: 25 },  // Warehouse Name
            2: { cellWidth: 25 },  // Main Category
            3: { cellWidth: 20 },  // EDL Type
            4: { cellWidth: 30 },  // Equipment Name
            5: { cellWidth: 20 },  // Item Code
            6: { cellWidth: 20 },  // Strength
            7: { cellWidth: 35 },  // Item Name
            8: { cellWidth: 25 },  // Expiry Month
            9: { cellWidth: 15 },  // Month No.
            10: { cellWidth: 20 }, // Exp Qty
            11: { cellWidth: 25 }, // Exp Value
            12: { cellWidth: 20 }, // Color Type
            13: { cellWidth: 20 }  // Order Type
          },
          margin: { top: 20, left: 10, right: 10 }
        });
      
        doc.save('nearexpiryitemwise.pdf');
      }
      
      
    
      applyTextFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      }
}
