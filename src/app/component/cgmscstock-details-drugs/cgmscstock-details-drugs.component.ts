import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { dispatchPending } from 'src/app/Model/dispatchPending';
import { DistrictService } from 'src/app/service/district.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/service/api.service';
import { EmdStatusDetail } from 'src/app/Model/EmdStatusDetail';
import { DPDMISSupemdSummary } from 'src/app/Model/DPDMISSupemdSummary';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; 
import { CGMSCStockDetails } from 'src/app/Model/CGMSCStockDetails';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { WarehouseWiseStock } from 'src/app/Model/WarehouseWiseStock';
import { WarehouseStockDialogComponent } from '../warehouse-stock-dialog/warehouse-stock-dialog.component';
import { TotalPipeLineDialogComponent } from '../total-pipe-line-dialog/total-pipe-line-dialog.component';
import { PipelineDetails } from 'src/app/Model/PipelineDetails';
import { ItemDialogComponent } from '../item-dialog/item-dialog.component';
import { ItemDetailsPopup } from 'src/app/Model/ItemDetailsPopup';
import { BasicAuthenticationService } from 'src/app/service/authentication/basic-authentication.service';
@Component({
  selector: 'app-cgmscstock-details-drugs',
  templateUrl: './cgmscstock-details-drugs.component.html',
  styleUrls: ['./cgmscstock-details-drugs.component.css']
})
export class CgmscstockDetailsDrugsComponent {

  dataSource!: MatTableDataSource<CGMSCStockDetails>;
  dispatchPendings: CGMSCStockDetails[] = [];
  selectedTabIndex: number = 0;
  warehouseStock : WarehouseWiseStock[]=[];
  pipiLineDetails:PipelineDetails[]=[];
  itemDetails:ItemDetailsPopup[]=[];
  whid:any=0
  roleName = localStorage.getItem('roleName')



  wikiTitle: string = '';
wikiHtml: string = '';
wikiImages: string[] = [];

googleApiKey = 
// 'AIzaSyDGxv9V0ppt0stTyx6y9YfK58SSx9QKdeo';
'a5744e2e5431909d9769ddcdfc4a194e8275f5d'

googleCx = '336cfa66209254b6e';




  @ViewChild('SearchItemWikipediaModal') SearchItemWikipediaModal: any;
  wikiDescription: string = '';


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public loginService:BasicAuthenticationService,
    private spinner: NgxSpinnerService,
    private api: ApiService,
    private http: HttpClient,
    private breakpointObserver: BreakpointObserver,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<CGMSCStockDetails>([]);


  }

  ngOnInit() {
    this.spinner.show();
    this.getAllDispatchPending();
  }

  openWikipediaModal(itemName: string) {
    this.fetchWikipediaFullData(itemName);
  }

  fetchWikipediaFullData(searchTerm: string) {
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(searchTerm)}&utf8=&format=json&origin=*`;
  
    this.http.get<any>(searchUrl).subscribe(searchResult => {
      if (searchResult?.query?.search?.length > 0) {
        const pageTitle = searchResult.query.search[0].title;
  
        const contentUrl = `https://en.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(pageTitle)}&prop=text|images|links&format=json&origin=*`;
  
        this.http.get<any>(contentUrl).subscribe(contentResult => {
          if (contentResult?.parse?.text?.['*']) {
            this.wikiTitle = pageTitle;
            this.wikiHtml = contentResult.parse.text['*'];
            this.wikiImages = contentResult.parse.images || [];
            this.openDialogHOD();
          } else {
            this.fetchGoogleFallback(searchTerm);
          }
        }, () => this.fetchGoogleFallback(searchTerm));
  
      } else {
        this.fetchGoogleFallback(searchTerm);
      }
    }, () => this.fetchGoogleFallback(searchTerm));
  }
  
  fetchGoogleFallback(searchTerm: string) {
    const googleUrl = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(searchTerm)}&cx=${this.googleCx}&key=${this.googleApiKey}&searchType=image`;
  
    this.http.get<any>(googleUrl).subscribe(googleResult => {
      if (googleResult?.items?.length > 0) {
        const firstImage = googleResult.items[0].link;
        const snippet = googleResult.items[0].snippet || 'No description available';
  
        this.wikiTitle = searchTerm;
        this.wikiHtml = `<p>${snippet}</p>`;
        this.wikiImages = [firstImage];
      } else {
        this.wikiTitle = searchTerm;
        this.wikiHtml = '<p>No data found from Google.</p>';
        this.wikiImages = [];
      }
      this.openDialogHOD();
    }, err => {
      console.error('Google Search Error', err);
      this.wikiTitle = searchTerm;
      this.wikiHtml = '<p>Error fetching from Google.</p>';
      this.wikiImages = [];
      this.openDialogHOD();
    });
  }
  
  openDialogHOD() {
    const dialogRef = this.dialog.open(this.SearchItemWikipediaModal, {
      width: '80%',
      height: '80%',
      panelClass: 'full-screen-dialog'
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('Dialog closed');
    });
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
      
    
      if(this.loginService.getRole().roleName==='Warehouse'){
          this.whid=sessionStorage.getItem('facilityid')
      }
    this.spinner.show();
    this.api.CGMSCStockDetails(1,'Y',0,this.whid,0,0,0).subscribe(
      (res) => {
        // Add serial numbers to the data
        this.dispatchPendings = res.map((item: any, index: number) => ({
          ...item,
          sno: index + 1
        }));
        
        console.log('Data with serial numbers:', this.dispatchPendings); 
console.log(JSON.stringify(res))
        // this.dispatchPendings = res;
        this.dataSource.data = this.dispatchPendings;
        this.dataSource.data = this.dispatchPendings;
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

  selectedTabValue(event: any): void {
    this.selectedTabIndex = event.index;
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
    const pageWidth = doc.internal.pageSize.getWidth();
    const title = 'Stock Details Drugs';
    const textWidth = doc.getTextWidth(title);
    const xOffset = (pageWidth - textWidth) / 2;
  
    // Add centered title with some space above the table
    doc.text(title, xOffset, 20); // Centered title at position Y=20
  
    // Set font size for the date and time
    doc.setFontSize(10);
  
    // Add the date and time to the top-left corner
    doc.text(`Date: ${dateString} Time: ${timeString}`, 10, 10); // Top-left at position X=10, Y=10
    
    const columns = [
      { title: "S.No", dataKey: "sno" },
      { title: "itemid", dataKey: "itemid" },
      { title: "itemcode", dataKey: "itemcode" },
      { title: "itemname", dataKey: "itemname" },
      { title: "strengtH1", dataKey: "strengtH1" },
      { title: "edlcat", dataKey: "edlcat" },
      { title: "readyforissue", dataKey: "readyforissue" },
      { title: "totlpipeline", dataKey: "totlpipeline" },
      { title: "edltype", dataKey: "edltype" },
      { title: "groupname", dataKey: "groupname" },
      { title: "itemtypename", dataKey: "itemtypename" },
    ];
    
    const rows = this.dispatchPendings.map(row => ({
      sno: row.sno,
      itemid: row.itemid,
      itemcode: row.itemcode,
      itemname: row.itemname,
      strengtH1: row.strengtH1,
      edlcat: row.edlcat,
      readyforissue: row.readyforissue,
      totlpipeline: row.totlpipeline,
      edltype: row.edltype,
      groupname: row.groupname,
      itemtypename: row.itemtypename
    }));
  
    autoTable(doc, {
      columns: columns,
      body: rows,
      startY: 40, // Start table a little further down to account for the title and date/time
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] }
    });
  
    doc.save('Stock_Details_Drugs.pdf');
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

closeDialog() {
  this.dialog.closeAll();
}


}






