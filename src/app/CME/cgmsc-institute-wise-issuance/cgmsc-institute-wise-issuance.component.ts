import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { dispatchPending } from 'src/app/Model/dispatchPending';
import { DistrictService } from 'src/app/service/district.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/service/api.service';
import { EmdStatusDetail } from 'src/app/Model/EmdStatusDetail';
import { DPDMISSupemdSummary } from 'src/app/Model/DPDMISSupemdSummary';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; 
import { CGMSCStockDetails } from 'src/app/Model/CGMSCStockDetails';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { WarehouseWiseStock } from 'src/app/Model/WarehouseWiseStock';
import { PipelineDetails } from 'src/app/Model/PipelineDetails';
import { ItemDetailsPopup } from 'src/app/Model/ItemDetailsPopup';
import { BasicAuthenticationService } from 'src/app/service/authentication/basic-authentication.service';
import { NgFor, CommonModule, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatTableExporterModule } from 'mat-table-exporter';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { DropdownModule } from 'primeng/dropdown';
import { WarehouseStockDialogComponent } from 'src/app/component/warehouse-stock-dialog/warehouse-stock-dialog.component';
import { AIvsIssuance } from 'src/app/Model/masInfoUser';
import { InsertUserPageViewLogmodal} from 'src/app/Model/DashLoginDDL';
import { Location } from '@angular/common';
@Component({
  selector: 'app-cgmsc-institute-wise-issuance',
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
    MatCardModule,
    MatIconModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    SelectDropDownModule,
    DropdownModule,
    NgStyle,

    MatSelectModule,
    FormsModule,
    NgSelectModule,
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatMenuModule,
     MatTableExporterModule,
     MatPaginatorModule,
      MatTableModule,
      SelectDropDownModule,DropdownModule
  ],
  templateUrl: './cgmsc-institute-wise-issuance.component.html',
  styleUrl: './cgmsc-institute-wise-issuance.component.css'
})
export class CgmscInstituteWiseIssuanceComponent {
applyTextFiltert($event: KeyboardEvent) {
throw new Error('Method not implemented.');
}
exportToPDFHODDetails() {
throw new Error('Method not implemented.');
}

  dataSource!: MatTableDataSource<CGMSCStockDetails>;
  dispatchPendings: any[] = [];
  selectedTabIndex: number = 0;
  warehouseStock : WarehouseWiseStock[]=[];
  pipiLineDetails:PipelineDetails[]=[];
  itemDetails:ItemDetailsPopup[]=[];
  whid:any=0
  roleName = localStorage.getItem('roleName')
  selectedCategory: string = 'Drugs'; 
mcid=1;

FundsDDL:any
MasfacilityInfoUser:any
Year:any

  budgetid:any=1;
  facilityid:any=0;
  accyrsetid:any;
  facilityname:any;
  accyear:any;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('StatusDetailsModal') StatusDetailsModal: any;
  RCstatusDetails:any;
  dataSource8 = new MatTableDataSource<any>();
  @ViewChild('paginator8') paginator8!: MatPaginator;
  @ViewChild('sort8') sort8!: MatSort;
  InsertUserPageViewLogdata: InsertUserPageViewLogmodal = new InsertUserPageViewLogmodal();
  pageName: string = '';
  fullUrl: string = '';
  constructor(
    public loginService:BasicAuthenticationService,
    private spinner: NgxSpinnerService,
    private api: ApiService,
    private http: HttpClient,
    private breakpointObserver: BreakpointObserver,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,private location: Location,
  ) {
    this.pageName = this.location.path();
    this.fullUrl = window.location.href;
    this.dataSource = new MatTableDataSource<any>([]);


  }

  ngOnInit() {
    // this.spinner.show();
    // this.getAllDispatchPending();
    this.GetFundsDDL()
    this.GetYear()
    this.InsertUserPageViewLog();
  }

  GetFundsDDL(){
  
    this.api.MasfacilityInfoUser(364,0,0,0,0,0,0).subscribe((res:any[])=>{
      // console.log(' Vehicle API dropdown Response:', res);
      if (res && res.length > 0) {
        this.MasfacilityInfoUser = res.map(item => ({
          facilityid: item.facilityid, // Adjust key names if needed
          facilityname : item.facilityname,
          
          
        }));
      } else {
        console.error('No nameText found or incorrect structure:', res);
      }
    });  
  }
  GetYear(){
  
    this.api.getYear().subscribe((res:any[])=>{
      // console.log(' Vehicle API dropdown Response:', res);
      if (res && res.length > 0) {
        this.Year = res.map(item => ({
          accyrsetid: item.accyrsetid, // Adjust key names if needed
          accyear : item.accyear,
          
        }));
      } else {
        console.error('No nameText found or incorrect structure:', res);
      }
    });  
  }

  onISelectChange(event: Event): void {
    
    // const selectedUser = this.FundsDDL.find((user: { budgetid: string }) => user.budgetid === this.budgetid); 
    const selectedUser = this.MasfacilityInfoUser.find((user: { facilityid: string }) => user.facilityid === this.facilityid); 
  
    if (selectedUser) {
      // this.budgetname=selectedUser.budgetname || null;
      this.facilityid=selectedUser.facilityid || null;
      // this.budgetid=selectedUser.budgetid || null;
      this.facilityname=selectedUser.facilityname || null;
   
  
    } else {
      console.error('Selected budgetid not found in the list.');
    }
  }
 
  
  onISelectChangeYear(event: Event): void {
    
    // const selectedUser = this.FundsDDL.find((user: { budgetid: string }) => user.budgetid === this.budgetid); 
    const selectedUser = this.Year.find((user: { accyrsetid: string }) => user.accyrsetid === this.accyrsetid); 
  
    if (selectedUser) {
      // this.budgetname=selectedUser.budgetname || null;
      this.accyrsetid=selectedUser.accyrsetid || null;
      // this.budgetid=selectedUser.budgetid || null;
      this.accyear=selectedUser.accyear || null;
      // this.getAllDispatchPending()
   
  
    } else {
      console.error('Selected budgetid not found in the list.');
    }
  }

  // getAllDispatchPending() {
  //   this.spinner.show();
  //   this.api.getEmdStatusSummary().subscribe(
  //     (res) => {
  //       Add serial numbers to the data
  //       this.dispatchPendings = res.map((item, index) => ({
  //         ...item,
  //         sno: index + 1
  //       }));

  //        console.log('Data with serial numbers:', this.dispatchPendings); 
  //       this.dispatchPendings = res;
  //       this.dataSource.data = res;
  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort = this.sort;
  //       this.spinner.hide();
  //       this.cdr.detectChanges();
  //     },
  //     (error) => {
  //       console.error('Error fetching data', error);
  //       this.spinner.hide();
  //     }
  //   );
  // }

  getAllDispatchPending() {
    
    this.spinner.show();
    console.log('Fetching with:', this.mcid, this.facilityid, this.accyrsetid);
    if(this.accyrsetid===undefined || this.accyrsetid===null){
      alert('Please Select F.Y')
      this.spinner.hide();
      return 
    }
  
    this.api.AIvsIssuance(this.mcid,this.accyrsetid,this.facilityid,).subscribe(
      (res) => {
        console.log('Raw API response:', res);
  
        this.dispatchPendings = res.map((item: any, index: number) => ({
          ...item,
          sno: index + 1
        }));
  
        console.log('With S.No:', this.dispatchPendings);
  
        this.dataSource.data = this.dispatchPendings;
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
  

  updateSelectedHodid(): void {
    
    // Reset hodid to 0 initially
    this.mcid = 0;

    // Map the selected category to the corresponding mcid value
    if (this.selectedCategory==='All') {
      this.mcid = 0;
      // this.chartOptions.title.text = this.OnChangeTitle +  this.selectedCategory  + ',HOD : '+this.HOD ;
    }else if(this.selectedCategory==='Drugs'){
      this.mcid = 1;
      // this.chartOptions.title.text = this.OnChangeTitle +  this.selectedCategory  + ',HOD :'+this.HOD ;

    }
     else if (this.selectedCategory==='Consumables') {
      this.mcid = 2;
      // this.chartOptions.title.text = this.OnChangeTitle + this.selectedCategory  + ',HOD :'+this.HOD ;
    } else if (this.selectedCategory==='Reagent') {
      this.mcid = 3;
      // this.chartOptions.title.text = this.OnChangeTitle +  this.selectedCategory  + ',HOD :'+this.HOD ;
    } else if (this.selectedCategory==='AYUSH') {
      this.mcid = 4;
      // this.chartOptions.title.text =this.OnChangeTitle +  this.selectedCategory   + ',HOD :'+this.HOD ;
    }

    // console.log('Selected Hod ID:', this.mcid);
  }

  applyTextFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selectedTabValue(event: any): void {
    this.selectedTabIndex = event.index;
  }
  exportToPDF() {
    const doc = new jsPDF('l', 'mm', 'a4');
  
    // Current date and time
    const now = new Date();
    const dateString = now.toLocaleDateString();
    const timeString = now.toLocaleTimeString();
  
    // Title settings
    const title = 'CGMSC Institute wise Issuance';
    doc.setFontSize(18);
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getTextWidth(title);
    const xOffset = (pageWidth - textWidth) / 2;
    doc.text(title, xOffset, 20);
  
    // Date/time at top-left
    doc.setFontSize(10);
    doc.text(`Date: ${dateString}   Time: ${timeString}`, 10, 10);
  
    // Table columns
    const columns = [
      { title: "S.No", dataKey: "sno" },
      
      { title: "Code", dataKey: "itemcode" },
      { title: "Item", dataKey: "itemname" },
      { title: "Strength", dataKey: "strength1" },
      { title: "Unit", dataKey: "unit" },
      { title: "Unit Count", dataKey: "unitcount" },
      { title: "AI", dataKey: "ai" },
      { title: "AI (Nos)", dataKey: "ainos" },
      { title: "Issued Qty", dataKey: "issuedQTY" },
      { title: "Issued Qty (Nos)", dataKey: "issueqtynos" },
      { title: "Issue %", dataKey: "issuePEr" },
      { title: "NOC Qty", dataKey: "nocqty" },
      { title: "NOC Qty (Nos)", dataKey: "nocqtyinNos" },
      { title: "Color", dataKey: "color" }
    ];
  
    // Prepare rows from data
    const rows = this.dispatchPendings.map((row, index) => ({
      sno: index + 1,
      
      itemcode: row.itemcode,
      itemname: row.itemname,
      strength1: row.strength1,
      unit: row.unit,
      unitcount: row.unitcount,
      ai: row.ai,
      ainos: row.ainos,
      issuedQTY: row.issuedQTY,
      issueqtynos: row.issueqtynos,
      issuePEr: row.issuePEr,
      nocqty: row.nocqty,
      nocqtyinNos: row.nocqtyinNos,
      color: row.color
    }));
  
    // Generate table
    autoTable(doc, {
      columns: columns,
      body: rows,
      startY: 30,
      theme: 'striped',
      headStyles: { fillColor: [63, 81, 181], textColor: 255 },
      styles: { fontSize: 8, cellPadding: 2 },
      columnStyles: {
        itemname: { cellWidth: 40 },
        itemcode: { cellWidth: 20 },
        strength1: { cellWidth: 20 }
      }
    });
  
    doc.save('cgmscinstitutewiseissuance.pdf');
  }
  
  

//   onCodeClick(itemid: number, itemcode: string,itemname:string,strengtH1:string,sku:string): void {
//     
//     this.spinner.show();

//     Call your API with the itemid
//     this.api.getWarehouseWiseStock(itemid,0).subscribe(
//         (response) => {
//             this.spinner.hide();
// this.warehouseStock=response
// console.log('asdf',JSON.stringify(this.warehouseStock))
        

//             Open a dialog with the WarehouseWiseStock data
//             this.dialog.open(WarehouseStockDialogComponent, {
//                 width: '600px',
//                 data: this.warehouseStock,
                
//             });
//         },
//         (error) => {
//             this.spinner.hide();
//             console.error('Error fetching item details', error);
//         }
//     );
// }
onCodeClick(itemid: number, itemcode: string, itemname: string, strengtH1: string, sku: string): void {
  this.spinner.show();

  this.api.getWarehouseWiseStock(itemid, 0).subscribe(
    (response) => {

      this.warehouseStock = response.map((item: any, index: number) => ({
        ...item,
        sno: index + 1
      }));


      this.spinner.hide();
      // this.warehouseStock = response;


      // Open a dialog with the WarehouseWiseStock data and additional item details
      this.dialog.open(WarehouseStockDialogComponent, {
        width: '600px',
        data: {
          warehouseStock: this.warehouseStock,
          itemcode: itemcode,
          itemname: itemname,
          strengtH1: strengtH1,
          sku: sku
        }
      });
    },
    (error) => {
      this.spinner.hide();
      console.error('Error fetching item details', error);
    }
  );
}


onPipelineClick(itemid: number,itemname: string, strengtH1: string, sku: string,edltype:string): void {
  // this.spinner.show();

  // this.api.getPipelineDetails(0, itemid, 1, 0, 0).subscribe(
  //   (response) => {
  //     console.log('API Response:', response);

      
  //     ;

  //     this.pipiLineDetails = response.map((item: any, index: number) => ({
  //       ...item,
  //       sno: index + 1
  //     }));

  //     console.log('Processed Pipeline Details:', this.pipiLineDetails);
  //     this.spinner.hide();

  //     this.dialog.open(TotalPipeLineDialogComponent, {
  //       width: '800px',
  //       data: {
  //         pipiLineDetails: this.pipiLineDetails,
  //         itemname: itemname,
  //         strengtH1: strengtH1,
  //         sku: sku,
  //         edltype: edltype
  //       }
  //     });
  //   },
  //   (error) => {
  //     this.spinner.hide();
  //     console.error('Error fetching pipeline details', error);
  //   }
  // );
}
onItemNameClick(itemid:number,edlcat:string,groupname:string,itemcode:string,itemname: string, strengtH1: string, sku: string,edltype:string): void {
  // this.spinner.show();

  // this.api.getItemDetails(0,itemid,0,0,0,0,0,0,0,0,0,0,0,0,0).subscribe(
  //   (response) => {
  //     console.log('API Response:', response);

      
  //     ;

  //     this.itemDetails = response.map((item: any, index: number) => ({
  //       ...item,
  //       sno: index + 1
  //     }));

  //     console.log('Processed Item Details:', this.itemDetails);
  //     this.spinner.hide();

  //     this.dialog.open(ItemDialogComponent, {
  //       width: '800px',
  //       data: {
  //         itemDetails: this.itemDetails,
  //         groupname:groupname,
  //         itemcode:itemcode,
  //         itemname: itemname,
  //         strengtH1: strengtH1,
  //         sku: sku,
  //         edlcat:edlcat,
  //         edltype: edltype
  //       }
  //     });
  //   },
  //   (error) => {
  //     this.spinner.hide();
  //     console.error('Error fetching pipeline details', error);
  //   }
  // );
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






