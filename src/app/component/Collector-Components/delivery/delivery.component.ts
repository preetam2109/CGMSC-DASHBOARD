import { CommonModule } from '@angular/common';
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


   constructor(public api:ApiService,private toastr: ToastrService){

    }

ngOnInit(): void {
this.getVehicleNoDropDown()  

}
getVehicleNoDropDown(){
  debugger
  this.api.getGetVehicleNo().subscribe((res:any[])=>{
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
    this.getTravelVouchers()

  } else {
    console.error('Selected indentid not found in the list.');
  }
}

show(){
  debugger
  this.api.getTravelVouchers(this.vid,this.indentid).subscribe((res:any[])=>{
    console.log('TravelVouchers API dropdown Response:', res);
    
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
      this.TravelVoucherDropDownList2 = res
        
        
      // }));
      console.log('VehicleNoDropDownList :', this.TravelVoucherDropDownList);
    
  });  
}



}
