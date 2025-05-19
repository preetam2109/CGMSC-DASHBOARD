import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatTableExporterModule } from 'mat-table-exporter';
import { NgxSpinnerService } from 'ngx-spinner';
// import { MatTableExporterModule } from 'mat-table-exporter';
// import { SelectDropDownModule } from 'ngx-select-dropdown/lib/ngx-select-dropdown.module';
import { DropdownModule } from 'primeng/dropdown';
import { AttendenceRecord, EmployeeDetail, GetLocation } from 'src/app/Model/Attendence';
import { ApiService } from 'src/app/service/api.service';


@Component({
  selector: 'app-attendence-record',
  standalone: true,
  imports: [ReactiveFormsModule,MatDatepickerModule, MatNativeDateModule,MatTableExporterModule,DropdownModule, MatSelectModule ,NgSelectModule, FormsModule, CommonModule, MatButtonModule, MatMenuModule,  MatPaginatorModule, MatTableModule],
  templateUrl: './attendence-record.component.html',
  styleUrl: './attendence-record.component.css'
})
export class AttendenceRecordComponent {
  dropdownOptions = [
    { label: 'Drug & Medicine', value: 'Drug & Medicine' },
    { label: 'Admin & HR', value: 'Admin & HR' },
    { label: 'Equipment', value: 'Equipment' },
    { label: 'Nirman', value: 'Nirman' },
    { label: 'Finance', value: 'Finance' },
    { label: 'Quality Control', value: 'Quality Control' },
    { label: 'Warehouse', value: 'Warehouse' },
    { label: 'Division', value: 'Division' }
  ];

  
  selectedOption: any='Warehouse';
  
datechenge() {
  const startDateRaw = this.dateRange.value.start;
  const endDateRaw = this.dateRange.value.end;

const startDate = this.datePipe.transform(startDateRaw, 'dd-MMM-yyyy');
const endDate = this.datePipe.transform(endDateRaw, 'dd-MMM-yyyy');
      if(startDate && endDate != null){

        this.spinner.show();
debugger
        this.api.GetAttendenceRecord(startDate,endDate,this.selectedOption,this.locationId).subscribe(
          (res) => {
            // Add serial numbers to the data
            console.log("ddd",res);
            this.attendanceRecord = res.map((item, index) => ({
              ...item,
              sno: index + 1
            }));
    
            this.dataSource.data = this.attendanceRecord;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.spinner.hide();
            // this.cdr.detectChanges();
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
    exportToPDF() {
    throw new Error('Method not implemented.');
    }
    
      dataSource!: MatTableDataSource<AttendenceRecord>;
      attendanceRecord:AttendenceRecord[]=[]
      dateRange!: FormGroup;

    
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
    
      location: any[] = [];
      locationId: any;
      iswh:any=0;
    
      constructor(private datePipe: DatePipe,private fb: FormBuilder,public api:ApiService,private spinner: NgxSpinnerService) {
        this.dataSource = new MatTableDataSource<AttendenceRecord>([]);

        const today = new Date();
        const firstDayOfMonthLastYear = new Date(today.getFullYear(), today.getMonth()-1, 1);
    
        this.dateRange = this.fb.group({
          start: [firstDayOfMonthLastYear],
          end: [today],
        });
    
      }
    
      ngOnInit(): void {
    this.GetLocationDDL();
      }
    
      change(value:any) {
        this.iswh = value;
        this.GetLocationDDL();  // <-- Make sure to call this here
        
      }
      
      onISelectChange(event: Event): void {
    
        const selectedUser = this.location.find((user: { locationId: string }) => user.locationId === this.locationId);
    
        if (selectedUser) {
          this.locationId = selectedUser.locationId || null;
          // this.getTravelVouchers()
    
        } else {
          console.error('Selected itemid not found in the list.');
        }
      }
      GetLocationDDL(){
      debugger
        this.api.GetLocationDDL(this.iswh).subscribe((res:any[])=>{
          // console.log(' Vehicle API dropdown Response:', res);
          if (res && res.length > 0) {
            this.location = res.map(item => ({
              locationId: item.locationId, // Adjust key names if needed
              locationName : item.locationName,
              
              
            }));
            // console.log('VehicleNoDropDownList :', this.VehicleNoDropDownList);
          } else {
            console.error('No nameText found or incorrect structure:', res);
          }
        });  
      }
    
      show() {

    
        
      }
     
    }
    