import { NgFor, CommonModule, NgStyle, DatePipe ,Location} from '@angular/common';
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
import { InsertUserPageViewLogmodal} from 'src/app/Model/DashLoginDDL';
import { ASCompletedDetails, ASEnteredDetails, ASFile, ASPendingDetails, DivisionWiseASPendingDetails } from 'src/app/Model/DashProgressCount';
// import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-administrative-sanction',
  standalone: true,
  imports: [
    NgApexchartsModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatTableExporterModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    MatMenuModule,
    NgFor,
    CommonModule,
    NgFor,
    NgStyle,
    MatCardModule,
    MatIconModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    FormsModule,
  ],
  templateUrl: './administrative-sanction.component.html',
  styleUrl: './administrative-sanction.component.css'
})
export class AdministrativeSanctionComponent {
  selectedTabIndex: number = 0;
  @ViewChild('itemDetailsModal') itemDetailsModal: any;

  //#region DataBase Table
        dataSource!: MatTableDataSource<ASPendingDetails>;
        dataSource1!: MatTableDataSource<ASEnteredDetails>;
        dataSource2!: MatTableDataSource<ASCompletedDetails>;
        dataSourceDivision!: MatTableDataSource<DivisionWiseASPendingDetails>;
        @ViewChild('paginatorval') paginatorval!: MatPaginator;
        @ViewChild('paginator1') paginator1!: MatPaginator;
        @ViewChild('paginator3') paginator3!: MatPaginator;
        @ViewChild('paginatorPageSize') paginatorPageSize!: MatPaginator;
        @ViewChild('sort') sort!: MatSort;
        @ViewChild('sort1') sort1!: MatSort;
        @ViewChild('sort2') sort2!: MatSort;
        @ViewChild('sort3') sort3!: MatSort;
        dispatchData: ASPendingDetails[] = [];
        dispatchData1: ASEnteredDetails[] = [];
        dispatchData2: ASCompletedDetails[] = [];
        dispatchDataDivision: DivisionWiseASPendingDetails[] = [];
        ASFileData: ASFile[] = [];
        value='Active';
        //#endregion
      divisionid: any;
      himisDistrictid: any;
      TimeStatus:any;
      mainschemeid:any;
      titleTotal:any
      titleDivision:any;
      titleScheme:any;
      titleDist:any;
      InsertUserPageViewLogdata: InsertUserPageViewLogmodal = new InsertUserPageViewLogmodal();

      pageName: string = '';
      fullUrl: string = '';
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
    this.dataSource = new MatTableDataSource<ASPendingDetails>([]);
    this.dataSource1 = new MatTableDataSource<ASEnteredDetails>([]);
    this.dataSource2 = new MatTableDataSource<ASCompletedDetails>([]);
    this.dataSourceDivision = new MatTableDataSource<DivisionWiseASPendingDetails>([]);
  }
  ngOnInit() {
  if(this.selectedTabIndex == 0){
    this.getASPendingDetails();
    this.getDivisionWiseASPendingDetails();

    this.InsertUserPageViewLog();
  }
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginatorval;
    // this.dataSource.sort = this.sort;
    this.dataSource2.paginator = this.paginator3;
    this.dataSource2.sort = this.sort3;
    this.dataSource1.paginator = this.paginator1;
    this.dataSource1.sort = this.sort1;
    // this.dataSourceDivision.paginator = this.paginatorPageSize;
    // this.dataSourceDivision.sort = this.sort2;
  }
  selectedTabValue(event: any): void {
    this.selectedTabIndex = event.index;
    if (this.selectedTabIndex == 0) {
      // this.getASPendingDetails();
      // this.getASPendingDetails();
      this.dataSource.paginator = this.paginatorval;
    this.dataSource.sort = this.sort;
    this.dataSourceDivision.paginator = this.paginatorPageSize;
    this.dataSourceDivision.sort = this.sort2;

    } else {
      // this.getDivisionWiseASPendingDetails();
      this.getASCompletedDetails();

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


  getASEnteredDetails(ASID:any,divisionId:any,mainSchemeId:any): void {
    // console.log(ASID, divisionId , mainSchemeId )
  this.spinner.show();
  this.api.GETASEnteredDetails(ASID,divisionId,mainSchemeId)
    .subscribe(
      (res) => {
        this.dispatchData1 = res.map(
          (item: ASEnteredDetails, index: number) => ({
            ...item,
            sno: index + 1,
          })
        );
        // console.log('res:', res);
        // console.log('dispatchData=:', this.dispatchData);
        this.dataSource1.data = this.dispatchData1;
        this.dataSource1.paginator = this.paginator1;
        this.dataSource1.sort = this.sort1;
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

  getASCompletedDetails(): void {
  this.spinner.show();
  this.api.GETASCompleted()
    .subscribe(
      (res) => {
        this.dispatchData2 = res.map(
          (item: ASCompletedDetails, index: number) => ({
            ...item,
            sno: index + 1,
          })
        );
        // console.log('res:', res);
        // console.log('dataSource2:', this.dataSource2);
        // console.log('dispatchData2 =:', this.dispatchData2);
        this.dataSource2.data = this.dispatchData2;
        this.dataSource2.paginator = this.paginator3;
        this.dataSource2.sort = this.sort3;
        this.cdr.detectChanges();
        this.spinner.hide();
      },
      (error) => {
       alert(`Error fetching data: ${error.message}`);
      }
    );
  // this.openDialog();
 }
  getASPendingDetails(): void {
  this.spinner.show();
  this.api.GETASPendingDetails()
    .subscribe(
      (res) => {
        this.dispatchData = res.map(
          (item: ASPendingDetails, index: number) => ({
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
 getDivisionWiseASPendingDetails(): void {
 let divisionId=0
  let mainSchemeId=0
  this.spinner.show();
  this.api.GETDivisionWiseASPending(divisionId,mainSchemeId)
    .subscribe(
      (res) => {
        this.dispatchDataDivision = res.map(
          (item: DivisionWiseASPendingDetails, index: number) => ({
            ...item,
            sno: index + 1,
          })
        );
        // console.log('res:', res);
        // console.log('dataSource:', this.dataSource);
        // console.log('dispatchData=:', this.dispatchData);
        this.dataSourceDivision.data = this.dispatchDataDivision;
        this.dataSourceDivision.paginator = this.paginatorPageSize;
        this.dataSourceDivision.sort = this.sort2;
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

  applyTextFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  applyTextFilterENT(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();
    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
  }
  applyTextFilterDivision(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceDivision.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceDivision.paginator) {
      this.dataSourceDivision.paginator.firstPage();
    }
  }
  applyTextFilterASCompleted(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();
    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }
  exportToPDFDivision() {
    const doc = new jsPDF('l', 'mm', 'a4');
    const columns = [
      // 'sno','login_name','head','letterno','asDate','totalWorks','enteredWorks','balanceWork','divisionID','division','id','asid'

      { title: 'S.No', dataKey: 'sno' },
      { title: 'Head', dataKey: 'head' },
      { title: 'AS Letter No', dataKey: 'letterno' },
      { title: 'AS Date', dataKey: 'asDate' },
      { title: 'Total Works', dataKey: 'totalWorks' },
      { title: 'Entered Works', dataKey: 'enteredWorks' },
      { title: 'Balance Work', dataKey: 'balanceWork' },
      { title: 'Division ID', dataKey: 'divisionID' },
      { title: 'Division', dataKey: 'division' },
      { title: 'ID', dataKey: 'id' },
      { title: 'AS ID', dataKey: 'asid' },
    ];
    const rows = this.dispatchDataDivision.map((row) => ({

      sno: row.sno,
      login_name:row.login_name,
      head: row.head,
      letterno: row.letterno,
      asDate: row.asDate,
      totalWorks: row.totalWorks,
      enteredWorks: row.enteredWorks,
      balanceWork: row.balanceWork,
      divisionID: row.divisionID,
      division: row.division,
      id: row.id,
      asid: row.asid,
    }));
  
    autoTable(doc, {
      columns: columns,
      body: rows,
      startY: 20,
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] },
    });
  
    doc.save('ASDivisionDetails.pdf');
  }
  exportToPDFENT() {
    const doc = new jsPDF('l', 'mm', 'a4');
    const columns = [
      { title: 'S.No', dataKey: 'sno' },
      { title: 'Head', dataKey: 'head' },
      { title: 'AS Letter No', dataKey: 'letterno' },
      { title: 'AS Date', dataKey: 'asDate' },
      { title: 'Division', dataKey: 'division' },
      { title: 'District', dataKey: 'district' },
      { title: 'Block', dataKey: 'block_Name_En' },
      // { title: 'Entered Works', dataKey: 'enteredWorks' },
      { title: 'Name', dataKey: 'login_name' },
      { title: 'Work', dataKey: 'workname' },
      { title: 'AS Amount', dataKey: 'asAmt' },
      { title: 'Entered Total AS', dataKey: 'enteredTotalAS' },
      { title: 'Work ID', dataKey: 'work_id' },
      { title: 'AS ID', dataKey: 'asid' },
    ];
    const rows = this.dispatchData1.map((row) => ({
      sno: row.sno,//
      login_name:row.login_name,
      head: row.head,
      letterno: row.letterno,
      division: row.division,//
      asDate: row.asDate,
      work_id: row.work_id,//
      district: row.district,//
      block_Name_En: row.block_Name_En,//
      asAmt: row.asAmt,//
      workname: row.workname,//
      // balanceASAmount: row.balanceASAmount,
      asid: row.asid,
    }));
  
    autoTable(doc, {
      columns: columns,
      body: rows,
      startY: 20,
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] },
    });
  
    doc.save('ASEnteredDetails.pdf');
  }
  exportToPDFASCompleted() {
    const doc = new jsPDF('l', 'mm', 'a4');
    const columns = [
      // ['sno','login_name','head','letterno','asDate','totalWorks','enteredWorks','baltobeEnter'
      // ,'totalASAmt','enteredTotalAS','balanceASAmount','asid','action']">

      { title: 'S.No', dataKey: 'sno' },
      { title: 'Head', dataKey: 'head' },
      { title: 'AS Letter No', dataKey: 'letterno' },
      { title: 'AS Date', dataKey: 'asDate' },
      { title: 'Total Works', dataKey: 'totalWorks' },
      { title: 'Entered Works', dataKey: 'enteredWorks' },
      { title: 'Baltobe Enter', dataKey: 'baltobeEnter' },
      { title: 'Total AS Amount', dataKey: 'totalASAmt' },
      { title: 'Entered Total AS', dataKey: 'enteredTotalAS' },
      { title: 'Balance AS Amount', dataKey: 'balanceASAmount' },
      { title: 'AS ID', dataKey: 'asid' },
    ];
    const rows = this.dispatchData2.map((row) => ({
      sno: row.sno,
      login_name:row.login_name,
      head: row.head,
      letterno: row.letterno,
      asDate: row.asDate,
      totalWorks: row.totalWorks,
      enteredWorks: row.enteredWorks,
      baltobeEnter: row.baltobeEnter,
      totalASAmt: row.totalASAmt,
      enteredTotalAS: row.enteredTotalAS,
      balanceASAmount: row.balanceASAmount,
      asid: row.asid,
    }));
  
    autoTable(doc, {
      columns: columns,
      body: rows,
      startY: 20,
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] },
    });
  
    doc.save('CompletedAS.pdf');
  }
  exportToPDF() {
    const doc = new jsPDF('l', 'mm', 'a4');
    const columns = [
      { title: 'S.No', dataKey: 'sno' },
      { title: 'Head', dataKey: 'head' },
      { title: 'AS Letter No', dataKey: 'letterno' },
      { title: 'AS Date', dataKey: 'asDate' },
      { title: 'Total Works', dataKey: 'totalWorks' },
      { title: 'Entered Works', dataKey: 'enteredWorks' },
      { title: 'Baltobe Enter', dataKey: 'baltobeEnter' },
      { title: 'Total AS Amount', dataKey: 'totalASAmt' },
      { title: 'Entered Total AS', dataKey: 'enteredTotalAS' },
      { title: 'Balance AS Amount', dataKey: 'balanceASAmount' },
      { title: 'AS ID', dataKey: 'asid' },
    ];
    const rows = this.dispatchData.map((row) => ({
      sno: row.sno,
      login_name:row.login_name,
      head: row.head,
      letterno: row.letterno,
      asDate: row.asDate,
      totalWorks: row.totalWorks,
      enteredWorks: row.enteredWorks,
      baltobeEnter: row.baltobeEnter,
      totalASAmt: row.totalASAmt,
      enteredTotalAS: row.enteredTotalAS,
      balanceASAmount: row.balanceASAmount,
      asid: row.asid,
    }));
  
    autoTable(doc, {
      columns: columns,
      body: rows,
      startY: 20,
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] },
    });
  
    doc.save('TotalASPending.pdf');
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

      // onButtonClick(ASID: any,id:any): void {
      //   this.asid=ASID;
      //   // Implement your logic here
      //   console.log('Button clicked for element:', ASID);
      // }
      
     InsertUserPageViewLog() {
      try {
        // 
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
        console.log('InsertUserPageViewLogdata=',this.InsertUserPageViewLogdata);
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
