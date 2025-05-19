import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
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
import { EmployeeDetail, GetLocation } from 'src/app/Model/Attendence';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [MatTableExporterModule,DropdownModule, MatSelectModule, FormsModule, NgSelectModule, FormsModule, CommonModule, MatButtonModule, MatMenuModule,  MatPaginatorModule, MatTableModule],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent implements OnInit {

exportToPDF() {
throw new Error('Method not implemented.');
}

  dataSource!: MatTableDataSource<EmployeeDetail>;
  employeeDetail:EmployeeDetail[]=[]

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  location: any[] = [];
  locationId: any;
  iswh:any=0;

  constructor(public api:ApiService,private spinner: NgxSpinnerService) {
    this.dataSource = new MatTableDataSource<EmployeeDetail>([]);

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
    this.spinner.show();
    this.api.GetEmployeeDetail(this.locationId).subscribe(
      (res) => {
        // Add serial numbers to the data
        this.employeeDetail = res.map((item, index) => ({
          ...item,
          sno: index + 1
        }));

        this.dataSource.data = this.employeeDetail;
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
  applyTextFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
 
}
