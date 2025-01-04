import { Component, ViewChild, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule,  } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; 
import { ApiService } from 'src/app/service/api.service';
import { EdlNonEdlIssuePercentSummary } from 'src/app/Model/EdlNonEdlIssuePercentSummary';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { IssuePerWisePerClick } from 'src/app/Model/IssuePerWisePerClick';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-issue-per-wise-per-click',
  standalone: true,
  imports: [ MatButtonModule,MatMenuModule, MatTableExporterModule,MatPaginatorModule, MatTableModule],
  templateUrl: './issue-per-wise-per-click.component.html',
  styleUrl: './issue-per-wise-per-click.component.css'
})
export class IssuePerWisePerClickComponent {
  dataSource!: MatTableDataSource<IssuePerWisePerClick>;
  issuePerWisePerClick: IssuePerWisePerClick[] = [];
  yearid:any=545
  orderdp:any=1


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private api: ApiService,
    private cdr: ChangeDetectorRef,
  ) {
    this.dataSource = new MatTableDataSource<IssuePerWisePerClick>([]);


  }

  ngOnInit() {
    this.route.queryParams.subscribe((params)=>{
this.yearid=params['yearid']
this.orderdp=params['orderdp']
    });
    this.spinner.show();
    this.getEdlNonEdlIssuePercentageR();
  }

 
    getEdlNonEdlIssuePercentageR() {
    
    this.spinner.show();
    this.api.getIssuePerWisePerClick(this.yearid,this.orderdp).subscribe(
      (res) => {
        // Add serial numbers to the data
        this.issuePerWisePerClick = res.map((item: any, index: number) => ({
          ...item,
          sno: index + 1
        }));
        
        // console.log('Data with serial numbers:', this.issuePerWisePerClick); 
// console.log(JSON.stringify(res))
        // this.issuePerWisePerClick = res;
        this.dataSource.data = this.issuePerWisePerClick;
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

  
  exportToPDF() {
    const doc = new jsPDF('l', 'mm', 'a4');
    
    // Get current date and time
    const now = new Date();
    const dateString = now.toLocaleDateString();
    const timeString = now.toLocaleTimeString();
  
    // Set font size for the title
    doc.setFontSize(18);
  
    // Calculate the position to center the title
    const header='Issue Per Wise Per Click Report'
    // const title = 'Facility: ' + (sessionStorage.getItem('firstname') || 'Current Stock Report');  
      // (sessionStorage.getItem('firstname') || 'Indent Details');
    const pageWidth = doc.internal.pageSize.getWidth();
    // const titleWidth = doc.getTextWidth(title);
    // const xOffset = (pageWidth - titleWidth) / 2;
    // const xOffset1 = (pageWidth - titleWidth) / 2;
  
    // Add centered title with some space above the table
    doc.setFontSize(18);
      // doc.text(header, xOffset1, 10);
       // Centered title at position Y=20
    doc.setFontSize(15);
       
      // doc.text(title, xOffset, 20);
      doc.setFontSize(15); // Centered title at position Y=20
  
    // Set font size for the date and time
    doc.setFontSize(10);
  
    // Add the date and time to the top-left corner
    doc.text(`Date: ${dateString} Time: ${timeString}`, 10, 10); // Top-left at position X=10, Y=10
    
    const columns = [
      { title: "S.No", dataKey: "sno" },
      { title: "Code", dataKey: "itemcode" },
      { title: "Type", dataKey: "itemtypename" },
      { title: "Item", dataKey: "itemname" },
      { title: "Strength", dataKey: "strengtH1" },
      { title: "Unit", dataKey: "unit" },
      { title: "AI", dataKey: "ai" },
      { title: "Issued", dataKey: "issued" },
      { title: "issup", dataKey: "issup" },
      { title: "percentage", dataKey: "percentage" },
      { title: "orderdp", dataKey: "orderdp" },
      { title: "readystk", dataKey: "readystk" },
      { title: "uqcstk", dataKey: "uqcstk" },
      { title: "totlpipeline", dataKey: "totlpipeline" },

     
    ];
    
    const rows = this.issuePerWisePerClick.map(row => ({
      sno: row.sno,
      itemcode: row.itemcode,
      itemtypename: row.itemtypename,
      itemname: row.itemname,
      strengtH1: row.strengtH1,
      unit: row.unit,
      ai: row.ai,
      issued: row.issued,
      issup: row.issup,
      percentage: row.percentage,
      orderdp: row.orderdp,
      uqcstk: row.uqcstk,
    
    }));
  
    autoTable(doc, {
      columns: columns,
      body: rows,
      startY: 40, // Start table a little further down to account for the title and date/time
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] }
    });
  
    doc.save('IssuePerWisePerClick.pdf');
  }
  
  


}






