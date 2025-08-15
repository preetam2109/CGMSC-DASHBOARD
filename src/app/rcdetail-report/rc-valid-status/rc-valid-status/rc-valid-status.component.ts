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
  dataSource!: MatTableDataSource<any[]>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private cdr: ChangeDetectorRef,public api:ApiService,private spinner: NgxSpinnerService,private dialog: MatDialog){
    this.dataSource = new MatTableDataSource<any>([]);

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




  loadData(yearid:any,mcid:any,hoType:any): void {

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

}
