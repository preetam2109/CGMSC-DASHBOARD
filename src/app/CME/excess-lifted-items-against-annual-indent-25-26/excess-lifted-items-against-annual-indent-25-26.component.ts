
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
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
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
  selector: 'app-excess-lifted-items-against-annual-indent-25-26',
  standalone: true,
  imports: [ MatTableModule,
    MatTableExporterModule, MatIconModule,NgSelectModule,SelectDropDownModule,DropdownModule,MatSelectModule,FormsModule,NgSelectModule,
    FormsModule,CommonModule,MatButtonModule,MatMenuModule,MatPaginatorModule,MatSortModule,MatDialogModule, 
    NgApexchartsModule],
  templateUrl: './excess-lifted-items-against-annual-indent-25-26.component.html',
  styleUrl: './excess-lifted-items-against-annual-indent-25-26.component.css'
})
export class ExcessLiftedItemsAgainstAnnualIndent2526Component {


  selectedYearId: number | null = null;
  selectedLabele:any;
  




  dataSource!: MatTableDataSource<any[]>;
  dataSource2 =new MatTableDataSource<any>();


  CMEexcessLiftSummary: any =[];
  CMEExcessLiftDetail: any=[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('paginator2') paginator2!: MatPaginator;
  @ViewChild('sort2') sort2!: MatSort;  

 constructor(public toastr: ToastrService,private cdr: ChangeDetectorRef,public api:ApiService,private spinner: NgxSpinnerService,private dialog: MatDialog,)
      {
        this.dataSource = new MatTableDataSource<any>([]);
      }

      ngOnInit(){

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

      
    
      
    

      showData(){
        if(this.selectedYearId){

          this.GetCMEexcessLiftSummary(this.selectedYearId,)
        }else{
          this.toastr.info('Please Select all options')
        }


      }

   
      

      onYearChange(event: any) {
        this.selectedYearId = +event.target.value;
       
        const selectedLabel = event.target.options[event.target.selectedIndex].text;
        this.selectedLabele=selectedLabel
      
        console.log('Selected Year ID:', this.selectedYearId);
        console.log('Selected Year Label:', selectedLabel);
      }


      GetCMEexcessLiftSummary(yearid: any): void {
        try {
          this.spinner.show();
          
          this.api.CMEexcessLiftSummary(yearid).subscribe({
            next: (res) => {
              try {
                console.log('Raw API response:', res);
      
                if (!res || res.length === 0) {
                  this.toastr.warning('No data found');
                  this.dataSource.data = [];
                  return;
                }
      
      
      
                // ✅ Map data with calculated columns
                this.CMEexcessLiftSummary = res.map((item: any, index: number) => ({
                  ...item,
                  sno: index + 1
                }));
      
                // ✅ Update table datasource
                this.dataSource.data = this.CMEexcessLiftSummary;
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
      
              
      
                this.cdr.detectChanges();
              } catch (innerErr) {
                console.error('Processing error:', innerErr);
                this.toastr.error('Something went wrong while processing data');
              }
            },
            error: (apiErr) => {
              console.error('API error:', apiErr);
              this.toastr.error('Failed to fetch data from server');
            },
            complete: () => {
              this.spinner.hide();
            },
          });
        } catch (outerErr) {
          console.error('Unexpected error in loadData:', outerErr);
          this.toastr.error('Unexpected error occurred');
          this.spinner.hide();
        }
      }


      GetCMEExcessLiftDetail( yearid: any,facid:any): void {
        
        try {
          this.spinner.show();
      
          this.api.CMEExcessLiftDetail(yearid,facid).subscribe({
            next: (res) => {
              try {
                console.log('Raw API response:', res);
      
                if (!res || res.length === 0) {
                  this.toastr.warning('No data found');
                  this.dataSource2.data = [];
                  return;
                }
      
      
      
                // ✅ Map data with calculated columns
                this.CMEExcessLiftDetail = res.map((item: any, index: number) => ({
                  ...item,
                  sno: index + 1
                }));
      
                // ✅ Update table datasource
                this.dataSource2.data = this.CMEExcessLiftDetail;
                this.dataSource2.paginator = this.paginator2;
                this.dataSource2.sort = this.sort2;
      
              
      
                this.cdr.detectChanges();
              } catch (innerErr) {
                console.error('Processing error:', innerErr);
                this.toastr.error('Something went wrong while processing data');
              }
            },
            error: (apiErr) => {
              console.error('API error:', apiErr);
              this.toastr.error('Failed to fetch data from server');
            },
            complete: () => {
              this.spinner.hide();
            },
          });
        } catch (outerErr) {
          console.error('Unexpected error in loadData:', outerErr);
          this.toastr.error('Unexpected error occurred');
          this.spinner.hide();
        }
      }


      exportToPDFLeft() {
        const doc = new jsPDF('l', 'mm', 'a3'); // Landscape A3
      
        const now = new Date();
        const dateString = now.toLocaleDateString();
        const timeString = now.toLocaleTimeString();
      
        const title = 'CME Excess Lift Summary';
        doc.setFontSize(18);
        const pageWidth = doc.internal.pageSize.getWidth();
        const textWidth = doc.getTextWidth(title);
        const xOffset = (pageWidth - textWidth) / 2;
        doc.text(title, xOffset, 20);
      
        doc.setFontSize(10);
        doc.text(`Date: ${dateString}   Time: ${timeString}`, 14, 28);
      
        // ✅ Define all columns
        const columns = [
          { header: 'S.No', dataKey: 'sno' },
          { header: 'Facility Name', dataKey: 'facilityname' },
          { header: 'Category', dataKey: 'category_label' },
          { header: 'Count of Code', dataKey: 'countOfCode' },
          { header: 'Excess Lifted Value (₹)', dataKey: 'excessLiftedValue' }
        ];
      
        // ✅ Prepare rows
        const rows = this.CMEexcessLiftSummary.map((item: any, index: number) => ({
          sno: index + 1,
          facilityname: item.facilityname || '',
          category_label: item.category_label || '',
          countOfCode: item['Count of Code'] || '',
          excessLiftedValue: item['Sum of Excess Lifted Value in Rs'] || ''
        }));
      
        // ✅ AutoTable
        autoTable(doc, {
          columns: columns,
          body: rows,
          startY: 35,
          theme: 'grid',
          headStyles: { fillColor: [41, 128, 185], textColor: 255, fontSize: 10 },
          styles: { fontSize: 9, cellPadding: 2 },
          columnStyles: {
            0: { cellWidth: 12 },   // S.No
            1: { cellWidth: 50 },   // Facility Name
            2: { cellWidth: 40 },   // Category
            3: { cellWidth: 25 },   // Count of Code
            4: { cellWidth: 40 }    // Excess Lifted Value (₹)
          },
          margin: { left: 10, right: 10 }
        });
      
        doc.save('CMEexcessLiftSummary.pdf');
      }
      

        exportToPDFRight() {
          const doc = new jsPDF('l', 'mm', 'a3'); // Landscape A3 (wider page)
        
          const now = new Date();
          const dateString = now.toLocaleDateString();
          const timeString = now.toLocaleTimeString();
        
          const title = 'CME Excess Lifted Details';
          doc.setFontSize(18);
          const pageWidth = doc.internal.pageSize.getWidth();
          const textWidth = doc.getTextWidth(title);
          const xOffset = (pageWidth - textWidth) / 2;
          doc.text(title, xOffset, 20);
        
          doc.setFontSize(10);
          doc.text(`Date: ${dateString}   Time: ${timeString}`, 14, 28);
        
          // ✅ Define all columns
          const columns = [
            { header: 'S.No', dataKey: 'sno' },
            { header: 'Facility ID', dataKey: 'facilityid' },
            { header: 'Facility Name', dataKey: 'facilityname' },
            { header: 'Item Name', dataKey: 'itemname' },
            { header: 'Strength', dataKey: 'strength1' },
            { header: 'Unit', dataKey: 'unit' },
            { header: 'AI', dataKey: 'ai' },
            { header: 'Issued Qty', dataKey: 'issueqty' },
            { header: 'Issued Value (₹)', dataKey: 'issValuers' },
            { header: 'Issue Nos', dataKey: 'issuenous' },
            { header: 'Item ID', dataKey: 'itemid' }
          ];
        
          // ✅ Prepare rows
          const rows = this.CMEExcessLiftDetail.map((item: any, index: number) => ({
            sno: index + 1,
            facilityid: item.facilityid || '',
            facilityname: item.facilityname || '',
            itemname: item.itemname || '',
            strength1: item.strength1 || '',
            unit: item.unit || '',
            ai: item.ai || '',
            issueqty: item.issueqty || '',
            issValuers: item.issValuers || '',
            issuenous: item.issuenous || '',
            itemid: item.itemid || ''
          }));
        
          // ✅ AutoTable
          autoTable(doc, {
            columns: columns,
            body: rows,
            startY: 35,
            theme: 'grid',
            headStyles: { fillColor: [41, 128, 185], textColor: 255, fontSize: 9 },
            styles: { fontSize: 8, cellPadding: 2 },
            columnStyles: {
              0: { cellWidth: 12 },   // S.No
              1: { cellWidth: 20 },   // Facility ID
              2: { cellWidth: 40 },   // Facility Name
              3: { cellWidth: 35 },   // Item Name
              4: { cellWidth: 25 },   // Strength
              5: { cellWidth: 15 },   // Unit
              6: { cellWidth: 15 },   // AI
              7: { cellWidth: 20 },   // Issued Qty
              8: { cellWidth: 30 },   // Issued Value (₹)
              9: { cellWidth: 20 },   // Issue Nos
              10:{ cellWidth: 20 }    // Item ID
            },
            margin: { left: 10, right: 10 }
          });
        
          doc.save('CMEExcessLiftDetail.pdf');
        }
        

        applyTextFilterLeft(event: Event) {
          const filterValue = (event.target as HTMLInputElement).value;
          this.dataSource.filter = filterValue.trim().toLowerCase();
      
          if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
          }
        }

        applyTextFilterRight(event: Event) {
          const filterValue = (event.target as HTMLInputElement).value;
          this.dataSource2.filter = filterValue.trim().toLowerCase();

          if (this.dataSource2.paginator) {
            this.dataSource2.paginator.firstPage();
          }
        }
        
      

}
