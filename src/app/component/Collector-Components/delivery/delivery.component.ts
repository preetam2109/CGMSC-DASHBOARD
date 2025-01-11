import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatTableExporterModule } from 'mat-table-exporter';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { ToastrService } from 'ngx-toastr';
import { DropdownModule } from 'primeng/dropdown';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-delivery',
  standalone: true,
  imports:[ NgSelectModule,SelectDropDownModule,DropdownModule,MatSelectModule,FormsModule,NgSelectModule,FormsModule,CommonModule,MatButtonModule,MatMenuModule, MatTableExporterModule,MatPaginatorModule, MatTableModule],

  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.css'
})
export class DeliveryComponent implements OnInit {
  VehicleNoDropDownList:any=[];
  TravelVoucherDropDownList:any=[];
  TravelVoucherDropDownList2:any=[];
  vid: any;
  indentid=0;
  lat:any;
  long:any;
  selectedDate: string | null = null;
  travelid:any
  formattedDate: string | null = null;


   constructor(public api:ApiService,private toastr: ToastrService,private datePipe: DatePipe){

    }

ngOnInit(): void {
this.getVehicleNoDropDown()  

}
getGetLatLong(){
  debugger
  this.api.getGetLatLong(this.indentid).subscribe((res:any)=>{
this.lat=res[0].latitude
this.long=res[0].longitude
  })
}
onDateChange(event: any) {
  // Get the raw value from the input field
  const inputValue = event.target.value;

  // Format the date using DatePipe (dd-MM-yyyy, h:mm a)
  const formatted = this.datePipe.transform(inputValue, 'yyyy-MM-ddTHH:mm');
  if (formatted) {
    this.formattedDate = formatted; // Update the input field with the formatted value
  }
}
getVehicleNoDropDown(){
  debugger
  this.api.getGetVehicleNo(sessionStorage.getItem('facilityid')).subscribe((res:any[])=>{
    // console.log(' Vehicle API dropdown Response:', res);
    if (res && res.length > 0) {
      this.VehicleNoDropDownList = res.map(item => ({
        vid: item.vid, // Adjust key names if needed
        vehicalno : item.vehicalno,
        
        
      }));
      // console.log('VehicleNoDropDownList :', this.VehicleNoDropDownList);
    } else {
      console.error('No emailid found or incorrect structure:', res);
    }
  });  
}
getTravelVouchers(){
  debugger
  this.api.getTravelVouchers(this.vid,this.indentid).subscribe((res:any[])=>{
    console.log('TravelVouchers API dropdown Response:', res);
    
      this.TravelVoucherDropDownList = res.map(item => ({
        indentid: item.indentid, // Adjust key names if needed
        details: item.details,
      //   facilityname:item.facilityname,
      //   districtname:item.districtname,
      //   issuevoucher:item.issuevoucher,
      //   issuevoucherdt:item.issuevoucherdt,
      //   nositems:item.nositems,
      //   travelvoucherissuedt:item.travelvoucherissuedt,
      //   longitude:item.longitude,
      //   latitude:item.latitude,
      // this.TravelVoucherDropDownList = res
        
        
      }));
      console.log('VehicleNoDropDownList :', this.TravelVoucherDropDownList);
    
  });  
}
onVSelectChange(event: Event): void {
    debugger
  const selectedUser = this.VehicleNoDropDownList.find((user: { vid: string }) => user.vid === this.vid); 

  if (selectedUser) {
    this.vid=selectedUser.vid || null;
    this.getTravelVouchers()

  } else {
    console.error('Selected vid not found in the list.');
  }
}
onTravelVChange(event: Event): void {
    debugger
  const selectedUser = this.VehicleNoDropDownList.find((user: { indentid: any }) => user.indentid === this.indentid); 

  if (selectedUser) {
    this.indentid=selectedUser.indentid || null;
    this.travelid=selectedUser.travelid || null;
    this.getTravelVouchers();
    this.getGetLatLong();

  } else {
    console.error('Selected indentid not found in the list.');
  }
}

show(){
  debugger
  this.api.getTravelVouchers(this.vid,this.indentid).subscribe((res:any[])=>{
    console.log('TravelVouchers API dropdown Response:', res);
    this.getGetLatLong();
      // this.TravelVoucherDropDownList = res.map(item => ({
      //   indentid: item.indentid, // Adjust key names if needed
      //   details: item.details,
      //   facilityname:item.facilityname,
      //   districtname:item.districtname,
      //   issuevoucher:item.issuevoucher,
      //   issuevoucherdt:item.issuevoucherdt,
      //   nositems:item.nositems,
      //   travelvoucherissuedt:item.travelvoucherissuedt,
      //   longitude:item.longitude,
      //   latitude:item.latitude,
      debugger
      this.TravelVoucherDropDownList2 = res
      this.travelid=this.TravelVoucherDropDownList2[0].travaleid
      
      console.log('nslnfsdl',this.travelid);
      this.getGetLatLong();
        
        
      // }));
      console.log('VehicleNoDropDownList :', this.TravelVoucherDropDownList);
    
  });  
}

submit() {
  debugger;

  // Validation: Check if lat, long, or selectedDate are empty
  if (!this.lat || !this.long) {
    alert('Latitude and Longitude cannot be empty.');
    return;
  }

  if (!this.selectedDate) {
    alert('Please select a date.');
    return;
  }

  // Validation: Ensure selectedDate is not earlier than travelvoucherissuedt
  const travelVoucherDate = this.convertToExactFormat(this.TravelVoucherDropDownList2[0].travelvoucherissuedt); // Ensure proper format
  const selectedDateFormatted = this.convertToExactFormat(this.selectedDate); // Format selectedDate

  if (new Date(this.convertToISO(selectedDateFormatted)) < new Date(this.convertToISO(travelVoucherDate))) {
    alert(`Delivery date cannot be earlier than the travel voucher issued date: ${travelVoucherDate}`);
    return;
  }

  // Format selectedDate to dd-MM-yyyy HH:mm:ss before the API call
  const formattedSelectedDate = this.convertToExactFormat(this.selectedDate);

  // Make the API call if validations pass
  this.api
    .updateTBIndentTravaleWH(this.travelid, this.lat, this.long, formattedSelectedDate)
    .subscribe(
      (res: any) => {
        console.log('API response:', res);
        alert('Data updated successfully!');
        
        this.reloadPage()

      },
      (error: any) => {
        console.error('API error:', error);
        alert('Failed to update data. Please try again.');
      }
    );
}
reloadPage() {
  window.location.reload();
}

convertToExactFormat(date: string | Date): string {
  const parsedDate = new Date(date);
  const day = String(parsedDate.getDate()).padStart(2, '0');
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = parsedDate.getFullYear();
  const hours = String(parsedDate.getHours()).padStart(2, '0');
  const minutes = String(parsedDate.getMinutes()).padStart(2, '0');
  const seconds = String(parsedDate.getSeconds()).padStart(2, '0');
  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}


convertToISO(dateStr: string): string {
  const [datePart, timePart] = dateStr.split(' ');
  const [day, month, year] = datePart.split('-');
  const [hours = '00', minutes = '00', seconds = '00'] = timePart ? timePart.split(':') : [];
  return new Date(
    Number(year),
    Number(month) - 1, // Months are 0-indexed
    Number(day),
    Number(hours),
    Number(minutes),
    Number(seconds)
  ).toISOString();
}







}
