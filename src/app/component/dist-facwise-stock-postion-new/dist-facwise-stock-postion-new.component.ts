import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule,NgOption } from '@ng-select/ng-select';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { MatTableExporterModule } from 'mat-table-exporter';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NgxSpinnerService } from 'ngx-spinner';
import { DdlItemWiseInHandQty } from 'src/app/Model/DdlItemWiseInHandQty';
import { DistFACwiseStockPostionNew } from 'src/app/Model/DistFACwiseStockPostionNew';
import { MasDistrict } from 'src/app/Model/MasDistrict';
import { ApiService } from 'src/app/service/api.service';
@Component({
  selector: 'app-dist-facwise-stock-postion-new',
  standalone: true,
  imports: [ SelectDropDownModule,FormsModule,NgSelectModule,FormsModule,CommonModule,MatButtonModule,MatMenuModule, MatTableExporterModule,MatPaginatorModule, MatTableModule],

  templateUrl: './dist-facwise-stock-postion-new.component.html',
  styleUrl: './dist-facwise-stock-postion-new.component.css'
})
export class DistFACwiseStockPostionNewComponent {
 
      
      districts :MasDistrict[]= [];
      
      selectedDistrictId: any | null = null;
      dataSource!: MatTableDataSource<DistFACwiseStockPostionNew>;
      itemDetails: DistFACwiseStockPostionNew[] = [];
    
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
    
      constructor(
        private cdr: ChangeDetectorRef,
        private spinner: NgxSpinnerService,private api: ApiService) {
        this.dataSource = new MatTableDataSource<DistFACwiseStockPostionNew>([]);
    
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
        // const parsedDistId = (selectElement.value, 10);
        // this.selectedDistrictId = !isNaN(parsedDistId) ? parsedDistId : null;
    
        if (this.selectedDistrictId !== null) {
          
          // Fetch item-wise quantities after selecting a district
          this.getDistFACwiseStockPostionNew(this.selectedDistrictId.districtid);
        }
      }
      
      
    
      getDistFACwiseStockPostionNew(distId: any): void {
        
        this.spinner.show();
    
        
        // Simulated API call; replace with actual API call
      this.api.getDistFACwiseStockPostionNew(distId,0,1,0,0,0).subscribe((res:DistFACwiseStockPostionNew[])=>{
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
    
      applyTextFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      }

      exportToPDF() {
        const doc = new jsPDF('l', 'mm', 'a4');
      
        // Get current date and time
        const now = new Date();
        const dateString = now.toLocaleDateString();
        const timeString = now.toLocaleTimeString();
      
        // Set font size for the title
        doc.setFontSize(18);
      
        // Calculate the position to center the title
        const title = 'Item Wise Stock Position of District';
        const pageWidth = doc.internal.pageSize.getWidth();
        const titleWidth = doc.getTextWidth(title);
        const xOffset = (pageWidth - titleWidth) / 2;
      
        // Add centered title with some space above the table
        doc.text(title, xOffset, 20);
      
        // Set font size for the date and time
        doc.setFontSize(10);
      
        // Add the date and time to the top-left corner
        doc.text(`Date: ${dateString} Time: ${timeString}`, 10, 10); // Top-left at position X=10, Y=10
      
        // Define columns based on your given structure
        const columns = [
          { title: "Facility Name", dataKey: "facilityname" },
          { title: "No. of Items", dataKey: "nositems" },
          { title: "Stock Out Nos", dataKey: "stockoutnos" },
          { title: "Facility Stock Count", dataKey: "facstkcnt" },
          { title: "Stock Out %", dataKey: "stockoutp" },
          { title: "Pending at Facility", dataKey: "recpendingatfacilily" },
          { title: "Warehouse Stock Count", dataKey: "whstkcnt" },
          { title: "Warehouse UQC Stock Count", dataKey: "whuqcstkcnt" },
          { title: "Indent to Warehouse Pending", dataKey: "indenT_TOWH_PENDING" },
          { title: "WH Issue Rec Pending (Last 180 Days)", dataKey: "whissuE_REC_PENDING_L180CNT" },
          { title: "Balance Lifted (Last 6 Months)", dataKey: "balifT6MONTH" },
          { title: "Pipeline Stock (Last 180 Days)", dataKey: "lP_PIPELINE180CNT" },
          { title: "No Taken (No LPO)", dataKey: "noctakeN_NO_LPO" },
        ];
      
        // Map your data to match the columns
        const rows = this.itemDetails.map(row => ({
          facilityname: row.facilityname,
          nositems: row.nositems,
          stockoutnos: row.stockoutnos,
          facstkcnt: row.facstkcnt,
          stockoutp: row.stockoutp,
          recpendingatfacilily: row.recpendingatfacilily,
          whstkcnt: row.whstkcnt,
          whuqcstkcnt: row.whuqcstkcnt,
          indenT_TOWH_PENDING: row.indenT_TOWH_PENDING,
          whissuE_REC_PENDING_L180CNT: row.whissuE_REC_PENDING_L180CNT,
          balifT6MONTH: row.balifT6MONTH,
          lP_PIPELINE180CNT: row.lP_PIPELINE180CNT,
          noctakeN_NO_LPO: row.noctakeN_NO_LPO,
        }));
      
        // Generate the table
        autoTable(doc, {
          columns: columns,
          body: rows,
          startY: 40, // Start table a little further down to account for the title and date/time
          theme: 'striped',
          headStyles: { fillColor: [22, 160, 133] }
        });
      
        // Save the PDF
        doc.save('ddlitemwiseinhandQTY.pdf');
      }
      
    }