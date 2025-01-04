import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; 
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
import { VehicleInfo } from 'src/app/Model/VehicleInfo';
@Component({
  selector: 'app-vehicle-tracking',
  templateUrl: './vehicle-tracking.component.html',
  styleUrls: ['./vehicle-tracking.component.css']
})
export class VehicleTrackingComponent {

  dataSource!: MatTableDataSource<VehicleInfo>;
  vehicleInfo: VehicleInfo[] = [];
  selectedTabIndex: number = 0;
  category=0;
  facid=sessionStorage.getItem('facilityId');
  dateRange!: FormGroup;
  tomorrow = new Date();



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private api: ApiService,
    private http: HttpClient,
    private breakpointObserver: BreakpointObserver,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private fb: FormBuilder,
    public datePipe: DatePipe
  ) {
    this.dataSource = new MatTableDataSource<VehicleInfo>([]);

    // Initialize dateRange with today and tomorrow
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1); // Set tomorrow's date

    this.dateRange = this.fb.group({
        start: [firstDayOfMonth],    // Set start date to today
        end: [tomorrow]    // Set end date to tomorrow
    });
    this.dateRange.valueChanges.subscribe(() => {
      this.getVehicleInfoReportS();
    });


  }

  ngOnInit() {
    this.spinner.show();
    this.getVehicleInfoReportS();
  }

  // getVehicleInfoReportS() {
  //   this.spinner.show();
  //   this.api.getEmdStatusSummary().subscribe(
  //     (res) => {
  //       Add serial numbers to the data
  //       this.consumptionR = res.map((item, index) => ({
  //         ...item,
  //         sno: index + 1
  //       }));

  //        console.log('Data with serial numbers:', this.consumptionR); 
  //       this.consumptionR = res;
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
//     getVehicleInfoReportS() {
    
//     this.spinner.show();
//     const startDate = this.dateRange.value.start;
//     const endDate = this.dateRange.value.end;
//     const formattedStartDate = this.datePipe.transform(startDate, 'dd-MMM-yyyy') || '';
//     const formattedEndDate = this.datePipe.transform(endDate, 'dd-MMM-yyyy') || '';
    
//     if(formattedStartDate && formattedEndDate ){
// 
//       this.api.getVehicleInfoReport('B',this.facid,0,formattedStartDate,formattedEndDate).subscribe(
//         (res:ConsumptionReport[]) => {
//   console.log(JSON.stringify(res))

          
//           this.consumptionR = res.map((item: any, index: number) => ({
//             ...item,
//             sno: index + 1
//           }));
          
//           console.log('consumption report :', this.consumptionR); 
//   console.log(JSON.stringify(res))
//           this.dataSource.data = this.consumptionR;
//           this.dataSource.paginator = this.paginator;
//           this.dataSource.sort = this.sort;
//           this.spinner.hide();
//           this.cdr.detectChanges();
//         },
//         (error) => {
//           console.error('Error fetching data', error);
//           this.spinner.hide();
//         }
//       );
//     }
//   }
getVehicleInfoReportS() {
  const startDate = this.dateRange.value.start;
  const endDate = this.dateRange.value.end;
// Only format dates if both start and end dates are selected
const formattedStartDate = startDate ? this.datePipe.transform(startDate, 'dd-MMM-yyyy') : '';
const formattedEndDate = endDate ? this.datePipe.transform(endDate, 'dd-MMM-yyyy') : '';
  
  if (formattedStartDate && formattedEndDate) {
    this.spinner.show();
    this.api.getVehicleInfoReport(true,false,formattedStartDate, formattedEndDate).subscribe(
      (res: VehicleInfo[]) => {
        if (res.length === 0) {
          this.toastr.info('No data found. Please select another date range.');
          this.dataSource.data=res
          this.spinner.hide();
          return;
        }

        // Add serial numbers to the data
        this.vehicleInfo = res.map((item: any, index: number) => ({
          ...item,
          sno: index + 1
        }));

        // console.log('consumption report :', this.consumptionR);
        this.dataSource.data = this.vehicleInfo;
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
    const header = 'Vehicle Info Report';
    const title = 'Warehouse: ' + (sessionStorage.getItem('firstname') || '');  
    const pageWidth = doc.internal.pageSize.getWidth();
    const titleWidth = doc.getTextWidth(title);
    const xOffset = (pageWidth - titleWidth) / 2;
    const xOffset1 = (pageWidth - titleWidth) / 2;
    
    doc.setFontSize(18);
    doc.text(header, xOffset1, 10);
     // Centered title at position Y=20
  doc.setFontSize(15);
     
    doc.text(title, xOffset, 20);
    doc.setFontSize(15); // Centered title at position Y=20

  // Set font size for the date and time
  doc.setFontSize(10);

  // Add the date and time to the top-left corner
  doc.text(`Date: ${dateString} Time: ${timeString}`, 10, 10); // Top-left at position X=10, Y=10
    const columns = [
      { title: "S.No", dataKey: "sno" },
      { title: "Number PLate", dataKey: "vplateno" },
      { title: "Direction", dataKey: "direction" },
      { title: "Vehicle DT", dataKey: "vdate" },
      { title: "Entry DT", dataKey: "entrydate" },
      { title: "Camera ID", dataKey: "camid" },
      { title: "WH Id", dataKey: "warehouseid" },
      { title: "Warehouse", dataKey: "warehousename" },
    ];
    
    const rows = this.vehicleInfo.map(row => ({
      sno: row.sno,
      vplateno: row.vplateno,
      direction: row.direction,
      vdate: row.vdate,
      entrydate: row.entrydate,
      camid: row.camid,
      warehouseid: row.warehouseid,
      warehousename: row.warehousename,
    }));
  
    autoTable(doc, {
      columns: columns,
      body: rows,
      startY: 40, // Start table a little further down to account for the title and date/time
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] }
    });
  
    doc.save('Vehicle_Info_Report.pdf');
  }
  
  
  









}






