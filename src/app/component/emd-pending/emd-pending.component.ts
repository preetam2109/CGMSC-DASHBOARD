import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { dispatchPending } from 'src/app/Model/dispatchPending';
import { DistrictService } from 'src/app/service/district.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/service/api.service';
import { EmdStatusDetail } from 'src/app/Model/EmdStatusDetail';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; 

@Component({
  selector: 'app-emd-pending',
  templateUrl: './emd-pending.component.html',
  styleUrls: ['./emd-pending.component.css']
})
export class EmdPendingComponent implements OnInit {
  // displayedColumns: string[] = [
  //   'tender_no',
  //   'id',
  //   'sno',
  //   'categoryname',
  //   'suppliername',
  //   'schemename',
  //   'accyear',
  //   'statusdata',
  //   'emd',
  //   'isrelease',
  //   'realseamount',
  //   'releasedate',
  //   'chequeno',
  //   'chequedt',
  //   'fileno',
  // ];
  
  // columnNames: { [key: string]: string } = {
    // tender_no:'tender_no',
    // id:'id',
    // sno:'Serial No',
    // categoryname:'Category',
    // suppliername:'Supplier',
    // accyear:'accyear',
    // schemename:'Tender',
    // statusdata:'Status',
    // emd:'EMD Deposited',
    // isrelease:'isrelease',
  //   realseamount:'Released',
  //   releasedate:'ReleaseDT',
  //   chequeno:'Chequeno',
  //   chequedt:'ChequeDT',
  //   fileno:'fileno',
  // };

  dataSource!: MatTableDataSource<EmdStatusDetail>;
  dispatchPendings: EmdStatusDetail[] = [];
  selectedTabIndex: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private spinner: NgxSpinnerService,
    private api: ApiService,
    private http: HttpClient,
    private breakpointObserver: BreakpointObserver,
    private cdr: ChangeDetectorRef
  ) {
    this.dataSource = new MatTableDataSource<EmdStatusDetail>([]);

    // this.breakpointObserver
    //   .observe([Breakpoints.Handset, Breakpoints.Tablet, Breakpoints.Web])
    //   .subscribe((result) => {
    //     if (result.matches) {
    //       if (this.breakpointObserver.isMatched(Breakpoints.Handset)) {
    //         this.displayedColumns = [
    //           // 'tender_no',
    //           // 'id',
    //           // 'sno',
    //           'categoryname',
    //           'suppliername',
    //           // 'accyear',
    //           'schemename',
    //           'statusdata',
    //           'emd',
    //           'isrelease',
              // 'realseamount',
          //     'releasedate',
          //     'chequeno',
          //     'chequedt',
          //     'fileno',
          //   ];
          // } else if (this.breakpointObserver.isMatched(Breakpoints.Tablet)) {
          //   this.displayedColumns = [
              // 'tender_no',
              // 'id',
              // 'sno',
              // 'categoryname',
              // 'suppliername',
              // 'accyear',
              // 'schemename',
              // 'statusdata',
              // 'emd',
              // 'isrelease',
          //     'realseamount',
          //     'releasedate',
          //     'chequeno',
          //     'chequedt',
          //     'fileno',
          //   ];
          // } else {
          //   this.displayedColumns = [
              // 'tender_no',
              // 'id',
              // 'sno',
              // 'categoryname',
              // 'suppliername',
              // 'accyear',
              // 'schemename',
              // 'statusdata',
              // 'emd',
              // 'isrelease',
      //         'realseamount',
      //         'releasedate',
      //         'chequeno',
      //         'chequedt',
      //         'fileno',
      //       ];
      //     }
      //   }
      // });
  }

  ngOnInit() {
    this.spinner.show();
    this.getAllDispatchPending();
  }

  // getAllDispatchPending() {
  //   this.spinner.show();
  //   this.api.getEmdStatus().subscribe(
  //     (res) => {
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
    this.api.getEmdStatus().subscribe(
      (res) => {
        // Add serial numbers to the data
        this.dispatchPendings = res.map((item, index) => ({
          ...item,
          sno: index + 1
        }));

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
    const columns = [
      { title: "S.No", dataKey: "sno" },
      { title: "Category", dataKey: "categoryname" },
      { title: "Supplier", dataKey: "suppliername" },
      { title: "Tender", dataKey: "schemename" },
      { title: "Status", dataKey: "statusdata" },
      { title: "EMD Deposited", dataKey: "emd" },
      { title: "Released", dataKey: "realseamount" }
    ];
    const rows = this.dispatchPendings.map(row => ({
      sno: row.sno,
      categoryname: row.categoryname,
      suppliername: row.suppliername,
      schemename: row.schemename,
      statusdata: row.statusdata,
      emd: row.emd,
      realseamount: row.realseamount
    }));

    autoTable(doc, {
      columns: columns,
      body: rows,
      startY: 20,
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] }
    });

    doc.save('EMD_Pending_Details.pdf');
  }
}
