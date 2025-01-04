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
import { SeasonDrugs } from 'src/app/Model/SeasonDrugs';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-season-drugs',
  standalone: true,
  imports: [CommonModule,MatButtonModule,MatMenuModule, MatTableExporterModule,MatPaginatorModule, MatTableModule],

  templateUrl: './season-drugs.component.html',
  styleUrl: './season-drugs.component.css'
})
export class SeasonDrugsComponent {
  dataSource!: MatTableDataSource<SeasonDrugs>;
  seasonDrugs: SeasonDrugs[] = [];
  yearid:any=545
  orderdp:any=1
  season:any='Winter'


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private api: ApiService,
    private cdr: ChangeDetectorRef,
  ) {
    this.dataSource = new MatTableDataSource<SeasonDrugs>([]);


  }

  ngOnInit() {
    this.route.queryParams.subscribe((params)=>{
this.yearid=params['yearid']
this.orderdp=params['orderdp']
    });
    this.spinner.show();
    this.GetSeasonDrugs(this.season);
  }

 
  GetSeasonDrugs(season:any) {
    
    this.season=season
    this.spinner.show();
    this.api.getSeasonDrugs(this.season,0,0,'WH').subscribe(
      (res) => {
        // Add serial numbers to the data
        this.seasonDrugs = res.map((item: any, index: number) => ({
          ...item,
          sno: index + 1
        }));
        
        // console.log('Data with serial numbers:', this.seasonDrugs); 
// console.log(JSON.stringify(res))
        // this.seasonDrugs = res;
        this.dataSource.data = this.seasonDrugs;
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
    const title = 'DHS Seasonal Drugs Report';
    const pageWidth = doc.internal.pageSize.getWidth();
    const titleWidth = doc.getTextWidth(title);
    const xOffset = (pageWidth - titleWidth) / 2;
  
    // Add centered title
    doc.setFontSize(18);
    doc.text(title, xOffset, 20);
  
    // Add date and time
    doc.setFontSize(10);
    doc.text(`Date: ${dateString} Time: ${timeString}`, 10, 10);
  
    // Add seasonal information
    const seasonalInfo = [
      { season: 'Summer:', period: 'March to May' },
      { season: 'Rainy:', period: 'June to September' },
      { season: 'Winter:', period: 'October to February' },
    ];
  
    doc.setFontSize(12);
    let yPosition = 30; // Starting Y position for seasonal info
    seasonalInfo.forEach(info => {
      doc.text(`${info.season} ${info.period}`,230, yPosition);
      yPosition += 7; // Line spacing
    });
  
    // Add the first note (left-aligned)
    doc.setFontSize(10);
    doc.setTextColor(255, 0, 0); // Red color for text
    doc.text(
      'Note: On Seasonal drugs analysis, warehouse to facility issued taken from Jan-2021',
      10,
      yPosition + 10
    );
  
    // Add table data
    const columns = [
      { title: 'S.No', dataKey: 'sno' },
      { title: 'Code', dataKey: 'itemcode' },
      { title: 'Type', dataKey: 'itemtypename' },
      { title: 'Item', dataKey: 'itemname' },
      { title: 'Strength', dataKey: 'strengtH1' },
      { title: `${this.season} Supplied`, dataKey: 'seasonissuedlacs' },
      { title: 'DHS CFY Supplied', dataKey: 'thisyrissuedlacs' },
      { title: 'DHS CFY Annual Indent', dataKey: 'dhsaiLacs' },
      { title: 'CGMSC Stock', dataKey: 'stklacs' },
      { title: 'Season', dataKey: 'season' },
    ];
  
    const rows = this.seasonDrugs.map(row => ({
      sno: row.sno,
      itemcode: row.itemcode,
      itemtypename: row.itemtypename,
      itemname: row.itemname,
      strengtH1: row.strengtH1,
      seasonissuedlacs: row.seasonissuedlacs,
      thisyrissuedlacs: row.thisyrissuedlacs,
      dhsaiLacs: row.dhsaiLacs,
      stklacs: row.stklacs,
      season: row.season,
    }));
  
    // Use the autoTable plugin to add the table and track the final Y position
    autoTable(doc, {
      columns: columns,
      body: rows,
      startY: yPosition + 20, // Start the table after the first note
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] },
      didDrawPage: (data:any) => {
        // Set the position of the last table's Y coordinate
        yPosition = data.settings.margin.top + data.cursor.y;
      }
    });
  
    // Add the second note (right-aligned)
    const note2 = 'Note: Quantities in Lakhs';
    const note2Width = doc.getTextWidth(note2);
    const note2X = pageWidth - note2Width - 10; // Right-aligned with 10mm padding
    const note2Y = yPosition + 10; // Add the note below the table
  
    doc.setTextColor(255, 0, 0); // Red color for text
    doc.text(note2, note2X, note2Y);
  
    // Save PDF
    doc.save('DHSSeasonalDrugs.pdf');
  }
  
  
  
  
  
  


}






