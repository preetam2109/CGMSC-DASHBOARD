import { NgFor, CommonModule, NgStyle, DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableExporterModule } from 'mat-table-exporter';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/service/api.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ASCompletedDetails, ASEnteredDetails, ASFile, ASPendingDetails, DivisionWiseASPendingDetails } from 'src/app/Model/DashProgressCount';
import { WarehoueWiseStockOutmodel ,WarehoueWiseStockOutDetailmodel} from 'src/app/Model/DashLoginDDL';
// import { MatButtonModule } from '@angular/material/button';
import { InsertUserPageViewLogmodal} from 'src/app/Model/DashLoginDDL';
import { Location } from '@angular/common';
@Component({
  selector: 'app-wh-wise-stock-out',
  standalone: true,
  imports: [ NgApexchartsModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatTableExporterModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    MatMenuModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    FormsModule,],
  templateUrl: './wh-wise-stock-out.component.html',
  styleUrl: './wh-wise-stock-out.component.css'
})
export class WHWiseStockOutComponent {
  selectedTabIndex: number = 0;
  @ViewChild('itemDetailsModal') itemDetailsModal: any;

  //#region DataBase Table
        dataSource!: MatTableDataSource<WarehoueWiseStockOutmodel>;
        dataSource2!: MatTableDataSource<WarehoueWiseStockOutDetailmodel>;
        @ViewChild('paginatorval') paginatorval!: MatPaginator;
        @ViewChild('paginator1') paginator1!: MatPaginator;
        @ViewChild('paginatorPageSize') paginatorPageSize!: MatPaginator;
        @ViewChild('sort') sort!: MatSort;
        @ViewChild('sort1') sort1!: MatSort;
        @ViewChild('sort2') sort2!: MatSort;

        dispatchData: WarehoueWiseStockOutmodel[] = [];
        dispatchData2: WarehoueWiseStockOutDetailmodel[] = [];
        value='Active';
        //#endregion
        InsertUserPageViewLogdata: InsertUserPageViewLogmodal = new InsertUserPageViewLogmodal();
        pageName: string = '';
        fullUrl: string = '';
      edlType:any;
      edlType1:any;
 constructor(
    public api: ApiService,
    public spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    public datePipe: DatePipe,
    private fb: FormBuilder,private location: Location,
  ) {
    this.pageName = this.location.path();
    this.fullUrl = window.location.href;
    this.dataSource = new MatTableDataSource<WarehoueWiseStockOutmodel>([]);
    this.dataSource2 = new MatTableDataSource<WarehoueWiseStockOutDetailmodel>([]);
  }
  ngOnInit() {
  if(this.selectedTabIndex == 0){
    this.GETWarehoueWiseStockOut('EDL');
    this.InsertUserPageViewLog();
  }
  }

  ngAfterViewInit() {
  }
  selectedTabValue(event: any): void {
    this.selectedTabIndex = event.index;
    if (this.selectedTabIndex == 0) {
    //  this.edlType='EDL';
    this.GETWarehoueWiseStockOut('EDL');
      this.dataSource.paginator = this.paginatorval;
    this.dataSource.sort = this.sort;

    } else {
      // this.edlType='NON EDL';
      this.GETWarehoueWiseStockOut('NON EDL');

    }
  }


  onButtonClick(ASID:any,workid:any): void {
  //  this.value='Active';
  // window.open('https://cgmsc.gov.in/himisr/Upload/W3900002AS2.pdf', '_blank');
    // alert(ASID);
    // alert(this.value);
    // return;
    this.spinner.show();
    this.api.GETASFile(ASID,workid)
      .subscribe(
        (res) => {
        //  this.ASFileData=res;
         const filename = res[0]?.filename; // Ensure `res[0]` exists
         const URL = res[0]?.asLetterName;
         
         if (filename) {
           window.open(URL, '_blank');
         } else {
           alert("⚠️ Alert: AS Letter Not Found!\n\nThe requested document is missing.\nPlease try again later or contact support.");
           // alert("⚠️ Alert: AS Letter Not Found!\n\nThe requested document (AS Letter) is not available at this moment.\nPlease check again later or contact support for further assistance.");
         }
          this.spinner.hide();
        },
        (error) => {
          this.spinner.hide();
          alert(`Error fetching data: ${error.message}`);
        }
      );
   }



 GETWarehoueWiseStockOut(edlType:any):void {

  // const edlType='EDL';
  this.spinner.show();
  // if(this.edlType=='EDL'){
  // }
  this.api.WarehoueWiseStockOut(1,edlType)
    .subscribe(
      (res) => {
        this.dispatchData = res.map(
          (item: WarehoueWiseStockOutmodel, index: number) => ({
            ...item,
            sno: index + 1,
          })
        );
        // console.log('res:', res);
        // console.log('dataSource:', this.dataSource);
        // console.log('dispatchData=:', this.dispatchData);
        this.dataSource.data = this.dispatchData;
        this.dataSource.paginator = this.paginatorval;
        this.dataSource.sort = this.sort;
        this.cdr.detectChanges();
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        alert(`Error fetching data: ${error.message}`);
      }
    );
  

  // this.openDialog();
 }
 GETWarehoueWiseStockOutDetail(mcid:any,edlType:any,whId:any,colFlag:any): void {
 this.edlType1=edlType;
  // let mainSchemeId=0
  this.spinner.show();
  this.api.WarehoueWiseStockOutDetail(mcid,edlType,whId,colFlag)
    .subscribe(
      (res) => {
        this.dispatchData2 = res.map(
          (item: WarehoueWiseStockOutDetailmodel, index: number) => ({
            ...item,
            sno: index + 1,
          })
        );
        // console.log('res:', res);
        console.log('dataSource2:', this.dataSource);
        // console.log('dispatchData=:', this.dispatchData);
        this.dataSource2.data = this.dispatchData2;
        this.dataSource2.paginator = this.paginatorPageSize;
        this.dataSource2.sort = this.sort2;
        this.cdr.detectChanges();
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
       alert(`Error fetching data: ${error.message}`);
      }
    );
  this.openDialog();
 }

  applyTextFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyTextFilterWarehoueWiseStockOutDetail(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();
    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }
  exportToPDF1() {
    const doc = new jsPDF('l', 'mm', 'a4'); // Landscape
  
    const now = new Date();
    const dateString = now.toLocaleDateString();
    const timeString = now.toLocaleTimeString();
  
    const title = 'Warehouse wise stock Out in Non EDL Drugs';
    doc.setFontSize(18);
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getTextWidth(title);
    const xOffset = (pageWidth - textWidth) / 2;
    doc.text(title, xOffset, 20);
  
    doc.setFontSize(10);
    doc.text(`Date: ${dateString}  Time: ${timeString}`, 10, 10);
  
 
    const columns = [
      { header: 'S.No', dataKey: 'sno' },
      { header: 'Warehouse ID', dataKey: 'warehouseid' },
      { header: 'Warehouse Name', dataKey: 'warehousename' },
      { header: 'EDL Type', dataKey: 'edlType' },
      { header: 'No of Items', dataKey: 'noofitems' },
      { header: 'Stock Out', dataKey: 'stockout' },
      { header: 'Stock Out IWH Pipe', dataKey: 'stockoutiwhpipe' },
      { header: 'Stock Out PO Pipe', dataKey: 'stockoutpopipe' },
      { header: 'Stock In', dataKey: 'stockin' },
      { header: 'Stock In IWH Pipe', dataKey: 'stockiniwhpipe' },
      { header: 'Stock In PO Pipe', dataKey: 'stockinpopipe' },
      { header: 'Percentage', dataKey: 'percentage' },
    ];
  
    
    const rows = this.dispatchData.map(
      (item: any, index: number) => ({
        sno: index + 1,
        warehouseid: item.warehouseid,
        warehousename: item.warehousename,
        edlType: item.edlType,
        noofitems: item.noofitems,
        stockout: item.stockout,
        stockoutiwhpipe: item.stockoutiwhpipe,
        stockoutpopipe: item.stockoutpopipe,
        stockin: item.stockin,
        stockiniwhpipe: item.stockiniwhpipe,
        stockinpopipe: item.stockinpopipe,
        percentage: item.percentage,
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
  
    doc.save('WHWiseStockOutNonEDLDrugs.pdf');
  }
  exportToPDF() {
    const doc = new jsPDF('l', 'mm', 'a4'); // Landscape
  
    const now = new Date();
    const dateString = now.toLocaleDateString();
    const timeString = now.toLocaleTimeString();
  
    const title = 'Warehouse wise stock Out in EDL Drugs';
    doc.setFontSize(18);
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getTextWidth(title);
    const xOffset = (pageWidth - textWidth) / 2;
    doc.text(title, xOffset, 20);
  
    doc.setFontSize(10);
    doc.text(`Date: ${dateString}  Time: ${timeString}`, 10, 10);
  
   
    const columns = [
      { header: 'S.No', dataKey: 'sno' },
      { header: 'Warehouse ID', dataKey: 'warehouseid' },
      { header: 'Warehouse Name', dataKey: 'warehousename' },
      { header: 'EDL Type', dataKey: 'edlType' },
      { header: 'No of Items', dataKey: 'noofitems' },
      { header: 'Stock Out', dataKey: 'stockout' },
      { header: 'Stock Out IWH Pipe', dataKey: 'stockoutiwhpipe' },
      { header: 'Stock Out PO Pipe', dataKey: 'stockoutpopipe' },
      { header: 'Stock In', dataKey: 'stockin' },
      { header: 'Stock In IWH Pipe', dataKey: 'stockiniwhpipe' },
      { header: 'Stock In PO Pipe', dataKey: 'stockinpopipe' },
      { header: 'Percentage', dataKey: 'percentage' },
    ];
  
   
    const rows = this.dispatchData.map(
      (item: any, index: number) => ({
        sno: index + 1,
        warehouseid: item.warehouseid,
        warehousename: item.warehousename,
        edlType: item.edlType,
        noofitems: item.noofitems,
        stockout: item.stockout,
        stockoutiwhpipe: item.stockoutiwhpipe,
        stockoutpopipe: item.stockoutpopipe,
        stockin: item.stockin,
        stockiniwhpipe: item.stockiniwhpipe,
        stockinpopipe: item.stockinpopipe,
        percentage: item.percentage,
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
  
    doc.save('WHWiseStockOutEDLDrugs.pdf');
  }
  

  exportToPDFWHStockoutDetails() {
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
      { header: 'Warehouse ID', dataKey: 'warehouseid' },
      { header: 'Warehouse Name', dataKey: 'warehousename' },
      { header: 'Item Code', dataKey: 'itemcode' },
      { header: 'Item Name', dataKey: 'itemname' },
      { header: 'Strength', dataKey: 'strength1' },
      { header: 'EDL Type', dataKey: 'edlType' },
      { header: 'Item ID', dataKey: 'itemid' },
      { header: 'Ready For Issue', dataKey: 'readyforissue' },
      { header: 'Pending', dataKey: 'pending' },
      { header: 'Stock Out', dataKey: 'stockOut' },
      { header: 'Stock In', dataKey: 'stockIn' },
      { header: 'Stock Out IWH Pipe', dataKey: 'stockOutIWHPipe' },
      { header: 'Stock Out Po Pipe', dataKey: 'stockOutPoPipe' },
    ];
  
  
    const rows = this.dispatchData2.map(
      (item: any, index: number) => ({
        sno: index + 1,
        warehouseid: item.warehouseid,
        warehousename: item.warehousename,
        itemcode: item.itemcode,
        itemname: item.itemname,
        strength1: item.strength1,
        edlType: item.edlType,
        itemid: item.itemid,
        readyforissue: item.readyforissue,
        pending: item.pending,
        stockOut: item.stockOut,
        stockIn: item.stockIn,
        stockOutIWHPipe: item.stockOutIWHPipe,
        stockOutPoPipe: item.stockOutPoPipe,
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
  
    doc.save('WHWiseStockOutDetail.pdf');
  }
  
    // mat-dialog box
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

    

      InsertUserPageViewLog() {
        try {
          // debugger
          const roleIdName = localStorage.getItem('roleName') || '';
          const userId = Number(sessionStorage.getItem('userid') || 0);
          const roleId = Number(sessionStorage.getItem('roleId') || 0);
          // const userName = sessionStorage.getItem('firstname') || '';
          const ipAddress = sessionStorage.getItem('ipAddress') || '';
          const userAgent = navigator.userAgent; 
          this.InsertUserPageViewLogdata.logId = 0; 
          this.InsertUserPageViewLogdata.userId = userId;
          this.InsertUserPageViewLogdata.roleId = roleId;
          this.InsertUserPageViewLogdata.roleIdName = roleIdName;
          this.InsertUserPageViewLogdata.pageName = this.pageName;
          this.InsertUserPageViewLogdata.pageUrl = this.fullUrl;
          this.InsertUserPageViewLogdata.viewTime = new Date().toISOString();
          this.InsertUserPageViewLogdata.ipAddress = ipAddress;
          this.InsertUserPageViewLogdata.userAgent = userAgent;
          //console.log('InsertUserPageViewLogdata=',this.InsertUserPageViewLogdata);
      // if(localStorage.getItem('Log Saved')|| ''!){
    
      // }
          // API call
          this.api.InsertUserPageViewLogPOST(this.InsertUserPageViewLogdata).subscribe({
            next: (res: any) => {
              console.log('Page View Log Saved:',res);
              // const LogSaved='Log Saved'
              // localStorage.setItem('Log Saved', LogSaved);
            },
            error: (err: any) => {
              console.error('Backend Error:', JSON.stringify(err.message));
            }
          });
      
        } catch (err: any) {
          console.error('Error:', err.message);
        }
      }
    
     

}
