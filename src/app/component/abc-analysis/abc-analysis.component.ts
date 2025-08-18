import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
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

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexTitleSubtitle
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-abc-analysis',
  standalone: true,
  imports: [MatIconModule,NgSelectModule,SelectDropDownModule,DropdownModule,MatSelectModule,FormsModule,NgSelectModule,
    FormsModule,CommonModule,MatButtonModule,MatMenuModule, MatTableExporterModule,MatPaginatorModule,MatSortModule,MatDialogModule, 
    MatTableModule,NgApexchartsModule],
  templateUrl: './abc-analysis.component.html',
  styleUrl: './abc-analysis.component.css'
})
export class AbcAnalysisComponent {
applyTextFiltertotal($event: KeyboardEvent) {
throw new Error('Method not implemented.');
}

public chartOptions: Partial<ChartOptions> | any;

  selectedCategory: string = 'Drugs'; 
  selectedCategoryE: any = 'Y'; 
  OnChangeTitle:string= 'Category: ' 
  selectedCategoryTitle: string = '';
  mcid=1
  yearid = 0;
   HOD:any='All'
   role:any
   ABCanalysisSummary:any
  dataSource!: MatTableDataSource<any[]>;
  dataSource8 = new MatTableDataSource<any>();
  selectedEdlType: string = 'Y'; // default
  ABCanalysisSummaryDetail:any
  category:any
  rc:any
  selectedLabele:any;
  edl:any
  selectedYearId: number | null = null;
  showFooter: boolean = false;
  
  @ViewChild('paginator8') paginator8!: MatPaginator;
  @ViewChild('sort8') sort8!: MatSort;  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild('StatusDetailsModal') StatusDetailsModal: any;

  constructor(
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef,public api:ApiService,private spinner: NgxSpinnerService,private dialog: MatDialog,){
    this.dataSource = new MatTableDataSource<any>([]);
    

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

    // EDL Types
    edlTypes = [
      { value: 'Y', label: 'EDL' },
      { value: 'N', label: 'Non-EDL' }
    ];
  
 
  
    onYearChange(event: any) {
      this.selectedYearId = +event.target.value;
    
      // Get the label/text of the selected option
      const selectedLabel = event.target.options[event.target.selectedIndex].text;
      this.selectedLabele=selectedLabel
    
      console.log('Selected Year ID:', this.selectedYearId);
      console.log('Selected Year Label:', selectedLabel);
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


  showData(){
    this.showFooter = true;
    // this.loadData(this.selectedYearId,this.mcid,)
    console.log('Selected Type:', this.selectedEdlType);
    console.log('Selected Type:', this.selectedCategory);
    console.log('Selected Year ID:', this.selectedYearId);
    this.loadData(this.selectedYearId,this.mcid,this.selectedEdlType)

  }
  




  // loadData(yearid:any,mcid:any,isedl:any): void {

  //   this.spinner.show();
   
  // debugger
  //   this.api.ABCanalysisSummary(yearid,mcid,isedl).subscribe(
  //     (res) => {
  //       console.log('Raw API response:', res);
  
  //       this.ABCanalysisSummary = res.map((item: any, index: number) => ({
  //         ...item,
  //         sno: index + 1
  //       }));
  
  //       console.log('With S.No:', this.ABCanalysisSummary);
  
  //       this.dataSource.data = this.ABCanalysisSummary;
  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort = this.sort;
  
  //       this.spinner.hide();
  //       this.cdr.detectChanges();
  //     },
  //     (error) => {
  //       console.error('API error:', error);
  //       this.spinner.hide();
  //     }
  //   );
    
  // }
  totalItems: number = 0;  // class level variable
  totalordeR_value: number = 0;  // class level variable

  loadData(yearid: any, mcid: any, isedl: any): void {
    // this.showFooter = false; 
    this.spinner.show();
  
    this.api.ABCanalysisSummary(yearid, mcid, isedl).subscribe(
      (res) => {
        console.log('Raw API response:', res);
  
        // Calculate total noOfItems
        this.totalItems = res.reduce((sum: number, item: any) => sum + item.noOfItems, 0);

        this.totalordeR_value=res.reduce((sum:number,item:any)=>sum + item.ordeR_VALUE,0);
  
        // Add sno + Items % column
        this.ABCanalysisSummary = res.map((item: any, index: number) => ({
          ...item,
          sno: index + 1,
          itemsPercent: this.totalItems > 0 ? ((item.noOfItems / this.totalItems) * 100).toFixed(2) : '0.00',
          totalordeR_value_Percent:this.totalordeR_value > 0 ? ((item.ordeR_VALUE/this.totalordeR_value)*100).toFixed(2):'0.00'
        }));
  
        this.dataSource.data = this.ABCanalysisSummary;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.createItemsPercentChart();

        this.spinner.hide();
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('API error:', error);
        this.spinner.hide();
      }
    );
  }

  createItemsPercentChart(): void {
    // Extract data for chart
    const categories = this.ABCanalysisSummary.map((item: any) => item.abC_CATEGORY);
    const itemsPercentValues = this.ABCanalysisSummary.map((item: any) => Number(item.itemsPercent));
    const ordeR_value_Percent = this.ABCanalysisSummary.map((item: any) => Number(item.totalordeR_value_Percent));
  
    this.chartOptions = {
      series: [
        {
          name: "Items %",
          data: itemsPercentValues
        },
        {
          name: "Order Value %",
          data: ordeR_value_Percent
        }
      ],
      chart: {
        type: "line",
        height: 350
      },
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: "smooth"
      },
      title: {
        text: " ABC Analysis",
        align: "left"
      },
      xaxis: {
        categories: categories,
        title: {
          text: "ABC Category"
        }
      },
      yaxis: {
        title: {
          text: "Items %"
        },
        labels: {
          formatter: (val: number) => val + " %"
        }
      }
    };
  }
  

 


  noitemslick(rcvalide:any,abc:any) {
    debugger
    this.category=abc

    if(this.selectedEdlType==='Y'){
      this.edl='EDL';
    }else{
      this.edl='NON EDL';

    }

    if(rcvalide==='Y'){
      this.rc='RC Valid';
    }else if(rcvalide==='N'){
      this.rc='RC Not Valid';

    }else{
      this.rc='';
    }
    this.spinner.show();

    this.api.ABCanalysisSummaryDetail(this.selectedYearId,this.mcid,this.selectedEdlType,abc,rcvalide).subscribe({
      next: (res: any[]) => {
        if (res && res.length > 0) {
          this.ABCanalysisSummaryDetail = res.map((item: any, index: number) => ({
            ...item,
            sno: index + 1,
          }));

          this.dataSource8.data = this.ABCanalysisSummaryDetail;
          this.dataSource8.paginator = this.paginator8;
          this.dataSource8.sort = this.sort8;
        } else {
          this.toastr.error('No data found');
        }
      },
      error: (err) => {
        console.error('API error:', err);
        this.toastr.error('Failed to load data');
      },
      complete: () => {
        this.spinner.hide();
      },
    });

    this.openDialogHOD();
  }



  exportToPDF() {
    const doc = new jsPDF('l', 'mm', 'a4'); // Landscape mode
  
    const columns = [
      { title: 'S.No', dataKey: 'sno' },
      { title: 'EDL Type', dataKey: 'edltype' },
      { title: 'No. of Indents', dataKey: 'nosIndent' },
      { title: 'RC Valid Count', dataKey: 'rcValidcnt' },
      { title: 'RC Not Valid Count', dataKey: 'rcNotValidcnt' },
      { title: 'Price Count', dataKey: 'pricecnt' },
      { title: 'Evaluation Count', dataKey: 'evalutioncnt' },
      { title: 'Live Count', dataKey: 'liveCnt' },
      { title: 'To Be Tender Count', dataKey: 'rentendercn' }
    ];
  
    // Prepare rows from your API data
    const rows = this.ABCanalysisSummary.map((row: any, index: number) => ({
      sno: index + 1,
      edltype: row.edltype,
      nosIndent: row.nosIndent,
      rcValidcnt: row.rcValidcnt,
      rcNotValidcnt: row.rcNotValidcnt,
      pricecnt: row.pricecnt,
      evalutioncnt: row.evalutioncnt,
      liveCnt: row.liveCnt,
      rentendercn: row.rentendercn
    }));
  
    autoTable(doc, {
      head: [columns.map(col => col.title)],
      body: rows,
      startY: 20,
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185], textColor: 255, fontSize: 10 },
      styles: { fontSize: 9, cellPadding: 2, textColor: [0, 0, 0] },
      columnStyles: {
        0: { cellWidth: 12 },  // S.No
        1: { cellWidth: 25 },  // EDL Type
        2: { cellWidth: 25 },  // No. of Indents
        3: { cellWidth: 28 },  // RC Valid Count
        4: { cellWidth: 33 },  // RC Not Valid Count
        5: { cellWidth: 25 },  // Price Count
        6: { cellWidth: 33 },  // Evaluation Count
        7: { cellWidth: 25 },  // Live Count
        8: { cellWidth: 33 }   // Re-Tender Count
      },
      margin: { top: 20, left: 10, right: 10 }
    });
  
    doc.save('rcindentstatus.pdf');
  }
  

  applyTextFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



openDialogHOD() {
  const dialogRef = this.dialog.open(this.StatusDetailsModal, {
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


exportToPjjDFd() {
  const doc = new jsPDF('l', 'mm', 'a4'); // Landscape mode

  const columns = [
    { title: 'S.No', dataKey: 'sno' },
    { title: 'Item Code', dataKey: 'itemcode' },
    { title: 'Drug Name', dataKey: 'druG_NAME' },
    { title: 'Strength', dataKey: 'strengtH1' },
    { title: 'Unit', dataKey: 'unit' },
    { title: 'Item Type', dataKey: 'itemtypename' },
    { title: 'EDL Category', dataKey: 'edlcat' },
    { title: 'RC Status', dataKey: 'rcStatus' },
    { title: 'RC End Date', dataKey: 'rcendDate' },
    { title: 'RC Remaining Days', dataKey: 'rcremainingdays' },
    { title: 'Supplier Count', dataKey: 'cntsup' },
    { title: 'Tender Status', dataKey: 'tenderstatus' },
    { title: 'Ready For Issue', dataKey: 'readyforissue' },
    { title: 'Pending', dataKey: 'pending' },
    { title: 'IWH Pipeline', dataKey: 'iwhPipeline' },
    { title: 'Supplier Pipeline', dataKey: 'supplierPipeline' },
    { title: 'Order Value', dataKey: 'ordeR_VALUE' },
    { title: 'Cumulative Value', dataKey: 'cumulativE_VALUE' },
    { title: 'Cumulative %', dataKey: 'cumulativE_PERCENT' },
    { title: 'ABC Category', dataKey: 'abC_CATEGORY' }
  ];

  // ✅ Prepare rows
  const rows = this.ABCanalysisSummaryDetail.map((row: any, index: number) => ({
    sno: index + 1,
    itemcode: row.itemcode,
    druG_NAME: row.druG_NAME,
    strengtH1: row.strengtH1,
    unit: row.unit,
    itemtypename: row.itemtypename,
    edlcat: row.edlcat,
    rcStatus: row.rcStatus,
    rcendDate: row.rcendDate,
    rcremainingdays: row.rcremainingdays,
    cntsup: row.cntsup,
    tenderstatus: row.tenderstatus,
    readyforissue: row.readyforissue,
    pending: row.pending,
    iwhPipeline: row.iwhPipeline,
    supplierPipeline: row.supplierPipeline,
    ordeR_VALUE: row.ordeR_VALUE,
    cumulativE_VALUE: row.cumulativE_VALUE,
    cumulativE_PERCENT: row.cumulativE_PERCENT,
    abC_CATEGORY: row.abC_CATEGORY
  }));

  // autoTable(doc, {
  //   head: [columns.map(col => col.title)],
  //   body: rows,
  //   startY: 20,
  //   theme: 'grid',
  //   headStyles: { fillColor: [41, 128, 185], textColor: 255, fontSize: 8 },
  //   styles: { fontSize: 7, cellPadding: 2, textColor: [0, 0, 0] },
  //   margin: { top: 20, left: 10, right: 10 }
  // });
  

  autoTable(doc, {
    columns: columns,
    body: rows,
    startY: 30,
    theme: 'striped',
    styles: { fontSize: 8 },
    headStyles: { fillColor: [22, 160, 133] },
  });

  doc.save('analysis.pdf');
}

exportToPDFd() {
  const doc = new jsPDF('l', 'mm', 'a3'); // Landscape A3 (bigger page)


  const now = new Date();
  const dateString = now.toLocaleDateString();
  const timeString = now.toLocaleTimeString();

  const title = 'Analysis';
  doc.setFontSize(18);
  const pageWidth = doc.internal.pageSize.getWidth();
  const textWidth = doc.getTextWidth(title);
  const xOffset = (pageWidth - textWidth) / 2;
  doc.text(title, xOffset, 20);

  doc.setFontSize(10);
  doc.text(`Date: ${dateString}   Time: ${timeString}`, 14, 28);

  const columns = [
    { header: 'S.No', dataKey: 'sno' },
    { header: 'Item Code', dataKey: 'itemcode' },
    { header: 'Drug Name', dataKey: 'drug_name' },
    { header: 'Strength', dataKey: 'strength' },
    { header: 'Unit', dataKey: 'unit' },
    { header: 'Item Type', dataKey: 'itemtypename' },
    { header: 'EDL Category', dataKey: 'edlcat' },
    { header: 'RC Status', dataKey: 'rcStatus' },
    { header: 'RC End Date', dataKey: 'rcendDate' },
    { header: 'RC Remaining Days', dataKey: 'rcremainingdays' },
    { header: 'Supplier Count', dataKey: 'cntsup' },
    { header: 'Tender Status', dataKey: 'tenderstatus' },
    { header: 'Ready For Issue', dataKey: 'readyforissue' },
    { header: 'Pending', dataKey: 'pending' },
    { header: 'IWH Pipeline', dataKey: 'iwhPipeline' },
    { header: 'Supplier Pipeline', dataKey: 'supplierPipeline' },
    { header: 'Order Value', dataKey: 'order_value' },
    { header: 'Cumulative Value', dataKey: 'cumulative_value' },
    { header: 'Cumulative %', dataKey: 'cumulative_percent' },
    { header: 'ABC Category', dataKey: 'abc_category' },
    { header: 'Price Opened', dataKey: 'pricecnt' },
    { header: 'Under Evaluation', dataKey: 'evalutioncnt' },
    { header: 'Live In ', dataKey: 'liveCnt' },
    { header: 'To Be Tender', dataKey: 'rentendercn' },
  ];

  const rows = this.ABCanalysisSummaryDetail.map((item: any, index: number) => ({
    sno: index + 1,
    itemcode: item.itemcode,
    drug_name: item.druG_NAME,              // fixed consistent key names
    strength: item.strengtH1,
    unit: item.unit,
    itemtypename: item.itemtypename,
    edlcat: item.edlcat,
    rcStatus: item.rcStatus,
    rcendDate: item.rcendDate,
    rcremainingdays: item.rcremainingdays,
    cntsup: item.cntsup,
    tenderstatus: item.tenderstatus,
    readyforissue: item.readyforissue,
    pending: item.pending,
    iwhPipeline: item.iwhPipeline,
    supplierPipeline: item.supplierPipeline,
    order_value: item.ordeR_VALUE,
    cumulative_value: item.cumulativE_VALUE,
    cumulative_percent: item.cumulativE_PERCENT,
    abc_category: item.abC_CATEGORY,
    pricecnt: item.pricecnt,
    evalutioncnt: item.evalutioncnt,
    liveCnt: item.liveCnt,
    rentendercn: item.rentendercn,
  }));

  autoTable(doc, {
    head: [columns.slice(0, 10).map(c => c.header)],
    body: rows.map((r: any) => columns.slice(0, 10).map(c => r[c.dataKey])),
    startY: 35,
  });
  
  doc.addPage();
  
  autoTable(doc, {
    head: [columns.slice(10).map(c => c.header)],
    body: rows.map((r: any) => columns.slice(10).map(c => r[c.dataKey])),
    startY: 35,
  });
  
  

  doc.save('ABCanalysisDetail.pdf');
}




}
