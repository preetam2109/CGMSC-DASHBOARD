import { BreakpointObserver } from '@angular/cdk/layout';
import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
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
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DropdownModule } from 'primeng/dropdown';
import { IndentPendingWH } from 'src/app/Model/IndentPendingWH';
import { IndentPendingWHSummary } from 'src/app/Model/IndentPendingWHSummary';
import { ChartOptions } from 'src/app/component/card/card.component';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-slow-moving-itemsagainst-annual-indent25-26',
  standalone: true,
  imports: [ MatTableModule,
    MatTableExporterModule, MatIconModule,NgSelectModule,SelectDropDownModule,DropdownModule,MatSelectModule,FormsModule,NgSelectModule,
    FormsModule,CommonModule,MatButtonModule,MatMenuModule,MatPaginatorModule,MatSortModule,MatDialogModule, 
    NgApexchartsModule],
  templateUrl: './slow-moving-itemsagainst-annual-indent25-26.component.html',
  styleUrl: './slow-moving-itemsagainst-annual-indent25-26.component.css'
})
export class SlowMovingItemsagainstAnnualIndent2526Component {



  mcid=1
  selectedCategory: string = 'Drugs';
  selectedYearId: number | null = null;
  selectedLabele:any;
  
  selectedPercentId!: number;
  selectedPercentLabel!: string;



  dataSource!: MatTableDataSource<any[]>;
  dataSource2 =new MatTableDataSource<any>();


  CMESlowMovingSummary: any =[];
  CMESlowMovingDetails: any=[];

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
      years = [
        // { id: 539, label: '2019-2020' },
        // { id: 540, label: '2020-2021' },
        // { id: 541, label: '2021-2022' },
        { id: 542, label: '2022-2023' },
        { id: 544, label: '2023-2024' },
        { id: 545, label: '2024-2025' },
        { id: 546, label: '2025-2026' }
      ];

      percentageRanges = [
        { id: 10, label: '10%' },
        { id: 15, label: '10% - 15%' },
        { id: 20, label: '>15% - 20%' },
        { id: 25, label: '>20% - 25%' }
      ];
      
    
      
      onPercentChange(event: any) {
        this.selectedPercentId = +event.target.value;
        const selectedLabel = event.target.options[event.target.selectedIndex].text;
        this.selectedPercentLabel = selectedLabel;
      
        console.log('Selected Percent ID:', this.selectedPercentId);
        console.log('Selected Percent Label:', this.selectedPercentLabel);

      }

      showData(){
        if(this.selectedPercentId && this.mcid && this.selectedYearId){

          this.GetCMESlowMovingSummary(this.mcid,this.selectedYearId,this.selectedPercentId)
        }else{
          this.toastr.info('Please Select all options')
        }


      }

      getRowClass(param: string) {
        let val = param
          ?.replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .trim()
          .toLowerCase();
        if (val === '1.Pink') return 'row-pink';
        if (val === '2.Yellow') return 'row-yellow';
        if (val === '3.Orange') return 'row-orange';
        if (val === '4.Blue')   return 'row-blue';
        
        return '';
      }
      

      onYearChange(event: any) {
        this.selectedYearId = +event.target.value;
       
        const selectedLabel = event.target.options[event.target.selectedIndex].text;
        this.selectedLabele=selectedLabel
      
        console.log('Selected Year ID:', this.selectedYearId);
        console.log('Selected Year Label:', selectedLabel);
      }


      GetCMESlowMovingSummary( mcid: any,yearid: any,percent:any): void {
        try {
          this.spinner.show();
          
          this.api.CMESlowMovingSummary( mcid,yearid, percent).subscribe({
            next: (res) => {
              try {
                console.log('Raw API response:', res);
      
                if (!res || res.length === 0) {
                  this.toastr.warning('No data found');
                  this.dataSource.data = [];
                  return;
                }
      
      
      
                // ✅ Map data with calculated columns
                this.CMESlowMovingSummary = res.map((item: any, index: number) => ({
                  ...item,
                  sno: index + 1
                }));
      
                // ✅ Update table datasource
                this.dataSource.data = this.CMESlowMovingSummary;
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


      GetCMESlowMovingDetails( mcid: any,yearid: any, percent: any,facid:any): void {
        
        try {
          this.spinner.show();
      
          this.api.CMESlowMovingDetails( mcid,yearid, percent,facid).subscribe({
            next: (res) => {
              try {
                console.log('Raw API response:', res);
      
                if (!res || res.length === 0) {
                  this.toastr.warning('No data found');
                  this.dataSource2.data = [];
                  return;
                }
      
      
      
                // ✅ Map data with calculated columns
                this.CMESlowMovingDetails = res.map((item: any, index: number) => ({
                  ...item,
                  sno: index + 1
                }));
      
                // ✅ Update table datasource
                this.dataSource2.data = this.CMESlowMovingDetails;
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
        const doc = new jsPDF('l', 'mm', 'a3'); // Landscape A3 (bigger page)

        const now = new Date();
        const dateString = now.toLocaleDateString();
        const timeString = now.toLocaleTimeString();
      
        const title = 'CME Slow Moving Summary';
        doc.setFontSize(18);
        const pageWidth = doc.internal.pageSize.getWidth();
        const textWidth = doc.getTextWidth(title);
        const xOffset = (pageWidth - textWidth) / 2;
        doc.text(title, xOffset, 20);
      
        doc.setFontSize(10);
        doc.text(`Date: ${dateString}   Time: ${timeString}`, 14, 28);
      
        // Define all columns
        const columns = [
          { header: 'S.No', dataKey: 'sno' },
          { header: 'No. of Items', dataKey: 'nositems' },
          { header: 'Facility Name', dataKey: 'facilityname' },
          { header: 'Category', dataKey: 'mcategory' },
          { header: 'Stock Parameter', dataKey: 'stockparameter' },
    
        ];
      
        // Prepare rows
        // console.log('dsds',this.CMESlowMovingSummary)
        const rows = this.CMESlowMovingSummary.map((item: any, index: number) => ({
          sno: index + 1,
          nositems: item.nositems,
          facilityname: item.facilityname,
          mcategory: item.mcategory,
          stockparameter: item.stockparameter,
         
        }));
      
     // Render table
  autoTable(doc, {
    columns: columns,   // ✅ Tell autoTable how to map data
    body: rows,
    startY: 35,
    theme: 'grid',
    headStyles: { fillColor: [41, 128, 185], textColor: 255, fontSize: 10 },
    styles: { fontSize: 9, cellPadding: 2 }
  });
      
        doc.save('CMESlowMovingSummary.pdf');
      
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

        exportToPDFRight() {
          const doc = new jsPDF('l', 'mm', 'a3'); // Landscape A3 (wider page)
        
          const now = new Date();
          const dateString = now.toLocaleDateString();
          const timeString = now.toLocaleTimeString();
        
          const title = 'CME Slow Moving Details';
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
            { header: 'Facility ', dataKey: 'facilityname' },
            { header: 'Category', dataKey: 'mcategory' },
            { header: 'Item ', dataKey: 'itemname' },
            { header: 'Code', dataKey: 'itemcode' },
            { header: 'Strength', dataKey: 'strength1' },
            { header: 'Unit', dataKey: 'unit' },
            { header: 'AI', dataKey: 'ai' },
            { header: 'Issued Qty', dataKey: 'issueqty' },
            { header: 'Issued %', dataKey: 'issuePer' },
            { header: 'Balance Indent Qty', dataKey: 'balanceAnnualIndentQTY' },
            { header: 'Warehouse Ready Stock', dataKey: 'warehouseReadystock' },
            { header: 'Warehouse Ready % Against Balance', dataKey: 'whrEadyPerAgainstBalindent' },
            { header: 'Stock Parameter', dataKey: 'stockparameter' },
            { header: 'Warehouse ID', dataKey: 'warehouseid' }
          ];
        
          // ✅ Prepare rows
          const rows = this.CMESlowMovingDetails.map((item: any, index: number) => ({
            sno: index + 1,
            facilityname: item.facilityname,
            mcategory: item.mcategory,
            itemname: item.itemname,
            itemcode: item.itemcode,
            strength1: item.strength1,
            unit: item.unit,
            ai: item.ai,
            issueqty: item.issueqty,
            issuePer: item.issuePer,
            balanceAnnualIndentQTY: item.balanceAnnualIndentQTY,
            warehouseReadystock: item.warehouseReadystock,
            whrEadyPerAgainstBalindent: item.whrEadyPerAgainstBalindent,
            stockparameter: item.stockparameter,
            warehouseid: item.warehouseid
          }));
        
          // ✅ AutoTable
          autoTable(doc, {
            columns: columns,   // ✅ Tell autoTable how to map data
            body: rows,
            startY: 35,
            theme: 'grid',
            headStyles: { fillColor: [41, 128, 185], textColor: 255, fontSize: 9 },
            styles: { fontSize: 8, cellPadding: 2 },
            columnStyles: {
              0: { cellWidth: 12 },   // S.No
              1: { cellWidth: 40 },   // Facility Name
              2: { cellWidth: 20 },   // Category
              3: { cellWidth: 22 },   // Item Code
              4: { cellWidth: 40 },   // Item Name
              5: { cellWidth: 20 },   // Strength
              6: { cellWidth: 20 },   // Unit
              7: { cellWidth: 18 },   // AI
              8: { cellWidth: 20 },   // Issued Qty
              9: { cellWidth: 20 },   // Issue %
              10: { cellWidth: 28 },  // Balance Indent Qty
              11: { cellWidth: 28 },  // WH Ready Stock
              12: { cellWidth: 32 },  // WH Ready %
              13: { cellWidth: 55 },  // Stock Parameter
              14: { cellWidth: 25 }   // Warehouse ID
            },
            margin: { left: 10, right: 10 }
          });
        
          doc.save('CMESlowMovingDetails.pdf');
        }
        
      

}
