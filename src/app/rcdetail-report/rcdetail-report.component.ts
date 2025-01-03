import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DistrictService } from '../service/district.service';
import { RcDetail } from '../Model/RcDetail';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TotalNoRc } from '../Model/Totalnorc';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../service/api.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-rcdetail-report',
  templateUrl: './rcdetail-report.component.html',
  styleUrls: ['./rcdetail-report.component.css']
})
export class RCDetailReportComponent implements OnInit {
  totalnosrc: TotalNoRc | null = null;
  displayedColumns: string[] = [
      'item_codeE','item_nameE' ,'tender_no', 'make', 'model', 
     'contract_date',  'contract_end_date','single_unit_price', 'basic_rate', 'gst'
    
  ];

  columnNames: { [key: string]: string } = {
    'item_codeE': 'Equipment Code',
    'item_nameE': 'Equipment Name',
    'tender_no': 'Tender No',
    'make': 'Make',
    'model': 'Model',
    'contract_date': 'Rc Start Date',
    'contract_end_date': 'Rc End Date',
    'single_unit_price': 'Single Unit Price',
    'basic_rate': 'Basic Rate',
    'gst': 'GST',
  };
  dataSource: MatTableDataSource<RcDetail>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private cdr: ChangeDetectorRef,public spinner: NgxSpinnerService,private route: Router, private rcapi: ApiService) {
    this.dataSource = new MatTableDataSource<RcDetail>([]);


  }
  ngOnInit() {
    this.spinner.show();
    this.getAllRC();
  this.getTotalNoRc()
  
  }

  exportAsPDF() {
    // Temporarily disable pagination and adjust table height
    const paginator = this.dataSource.paginator;
    this.dataSource.paginator = null;
    
    const element = document.getElementById('rc-tbl');
    
    if (element) {
      html2canvas(element, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'landscape',
        });
  
        const imgWidth = 280; // Width of the PDF page
        const pageHeight = pdf.internal.pageSize.height; // Height of the PDF page
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calculate height of the image
        let heightLeft = imgHeight;
  
        let position = 0;
  
        // Add the first image (page)
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
  
        // Add new pages as long as there is content left
        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
  
        pdf.save('complaints.pdf');
  
        // Re-enable pagination
        this.dataSource.paginator = paginator;
      });
    } else {
      console.error('Table element not found!');
    }
  }
  

  getAllRC() {
    this.rcapi.retrieveAllRC().subscribe(res => {
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.spinner.hide();
      this.cdr.detectChanges();

    });
  }

  getTotalNoRc() {
    this.rcapi.totalNoRc().subscribe((res: TotalNoRc) => {
      this.totalnosrc = res;
    }, (error) => {
      console.error('Error fetching data', error);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
