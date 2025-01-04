import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule,NgOption } from '@ng-select/ng-select';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { MatTableExporterModule } from 'mat-table-exporter';
import { NgxSpinnerService } from 'ngx-spinner';
import { DdlItemWiseInHandQty } from 'src/app/Model/DdlItemWiseInHandQty';
import { MasDistrict } from 'src/app/Model/MasDistrict';
import { ApiService } from 'src/app/service/api.service';
import { DropdownModule } from 'primeng/dropdown';
import { SelectDropDownModule } from 'ngx-select-dropdown';



@Component({
  selector: 'app-ddl-item-wise-in-hand-qty',
  standalone: true,
  imports: [SelectDropDownModule,DropdownModule,MatSelectModule,FormsModule,NgSelectModule,FormsModule,CommonModule,MatButtonModule,MatMenuModule, MatTableExporterModule,MatPaginatorModule, MatTableModule],
  templateUrl: './ddl-item-wise-in-hand-qty.component.html',
  styleUrl: './ddl-item-wise-in-hand-qty.component.css'
})
export class DdlItemWiseInHandQtyComponent {

  
  districts :MasDistrict[]= [];
  
  selectedDistrictId: any | null = null;
  dataSource!: MatTableDataSource<DdlItemWiseInHandQty>;
  itemDetails: DdlItemWiseInHandQty[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private cdr: ChangeDetectorRef,
    private spinner: NgxSpinnerService,private api: ApiService) {
    this.dataSource = new MatTableDataSource<DdlItemWiseInHandQty>([]);

  }

  ngOnInit(): void {
    // Fetch district data on component initialization
    this.api.getMasDistrict(false, 0, 0, 0, 0).subscribe((res: MasDistrict[]) => {
      if (res) {
        this.districts = res; // Populate the districts array
        console.log('Fetched Districts:', this.districts); // Debugging
      }
    });
  }

  onDistrictChange(): void {
    
    // const selectElement = event.target as HTMLSelectElement;
    // const parsedDistId = parseInt(selectElement.value, 10);
    // this.selectedDistrictId = !isNaN(parsedDistId) ? parsedDistId : null;
    // this.selectedDistrictId = this.selectedDistrictId.districtid;

    if (this.selectedDistrictId !== null) {
      
      // Fetch item-wise quantities after selecting a district
      this.getDdlItemWiseInHandQty(this.selectedDistrictId.districtid);
    }
  }
  
  

  getDdlItemWiseInHandQty(distId: any): void {
    this.spinner.show();

    
    // Simulated API call; replace with actual API call
  this.api.getDdlItemWiseInHandQty(distId).subscribe((res:DdlItemWiseInHandQty[])=>{
    this.itemDetails = res.map((item: any, index: number) => ({
      ...item,
      sno: index + 1
    }));

    
  this.dataSource.data = this.itemDetails;
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

  dropdownConfig = {
    displayKey: 'districtname', // Key to display in dropdown
    search: true,               // Enable search functionality
    placeholder: 'Select a district',
    clearOnSelection: false,
    noResultsFound: 'No Results Found!',
    height: '250px',            // Adjust dropdown height
    customComparator: undefined,
    // bindValue: 'districtid',
  };
  
  

  exportToPDF() {
    const doc = new jsPDF('l', 'mm', 'a4');
    
    // Get current date and time
    const now = new Date();
    const dateString = now.toLocaleDateString();
    const timeString = now.toLocaleTimeString();
  
    // Set font size for the title
    doc.setFontSize(18);
  
    // Calculate the position to center the title
    const header=''
    const title = 'DDL Item Wise In-Hand QTY Report';  
      // (sessionStorage.getItem('firstname') || 'Indent Details');
    const pageWidth = doc.internal.pageSize.getWidth();
    const titleWidth = doc.getTextWidth(title);
    const xOffset = (pageWidth - titleWidth) / 2;
    const xOffset1 = (pageWidth - titleWidth) / 2;
  
    // Add centered title with some space above the table
    doc.setFontSize(18);
      doc.text(header, xOffset1, 10);
       // Centered title at position Y=20
    doc.setFontSize(15);
       
      doc.text(title, xOffset, 20);
      doc.setFontSize(15); // Centered title at position Y=20
  
    // Set font size for the date and time
    doc.setFontSize(10);
  
    // Add the date and time to the top-left corner
    doc.text(`Date: ${dateString} Time: ${timeString}`, 10, 10); // Top-left at position X=10, Y=10
    
    const columns = [
      { title: "S.No", dataKey: "sno" },
      { title: "Code", dataKey: "itemcode" },
      { title: "strength", dataKey: "strengtH1" },
      { title: "edlitemcode", dataKey: "edlitemcode" },
      { title: "inhanD_QTY", dataKey: "inhanD_QTY" },
      { title: "detail", dataKey: "detail" },

     
    ];
    
    const rows = this.itemDetails.map(row => ({
      sno: row.sno,
      itemcode: row.itemcode,
      strengtH1: row.strengtH1,
      edlitemcode: row.edlitemcode,
      inhanD_QTY: row.inhanD_QTY,
      detail: row.detail,
    
    }));
  
    autoTable(doc, {
      columns: columns,
      body: rows,
      startY: 40, // Start table a little further down to account for the title and date/time
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] }
    });
  
    doc.save('ddlitemwiseinhandQTY.pdf');
  }
}