import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { EmployeeDetailsComponent } from "../employee-details/employee-details.component";
import { AttendenceRecordComponent } from "../attendence-record/attendence-record.component";
import { AttendancePresentAbsentComponent } from "../attendance-present-absent/attendance-present-absent.component";

@Component({
  selector: 'app-attendance-dash',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTabsModule, EmployeeDetailsComponent, AttendenceRecordComponent, AttendancePresentAbsentComponent],

  templateUrl: './attendance-dash.component.html',
  styleUrl: './attendance-dash.component.css'
})
export class AttendanceDashComponent {
  selectedTabIndex: number = 0;

  selectedTabValue(event: any): void {
    
    this.selectedTabIndex = event.index;
  }
}
