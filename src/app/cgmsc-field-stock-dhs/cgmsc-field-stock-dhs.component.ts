import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatTableExporterModule } from 'mat-table-exporter';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { DropdownModule } from 'primeng/dropdown';
import { ApiService } from '../service/api.service';
import { MasDistrict } from '../Model/MasDistrict';
import { MatSort } from '@angular/material/sort';
import { facwiseSTockIssuanceCoonsumptionm } from '../Model/facwiseSTockIssuanceCoonsumptionm';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cgmsc-field-stock-dhs',
  standalone: true,
  imports: [SelectDropDownModule,DropdownModule,MatSelectModule,FormsModule,NgSelectModule,FormsModule,CommonModule,MatButtonModule,MatMenuModule, MatTableExporterModule,MatPaginatorModule, MatTableModule],
  templateUrl: './cgmsc-field-stock-dhs.component.html',
  styleUrl: './cgmsc-field-stock-dhs.component.css'
})
export class CgmscFieldStockDhsComponent implements OnInit{
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

show() {
  debugger
  this.getMasitems()
  this.GetItemDetailsWithHOD();
debugger
  if(this.itemid!=0 && this.districtid===undefined && this.facilityid===undefined){
    this.districtid=0
    this.facilityid=0
    this.getDHSDMEStock()

  }else if(this.itemid!=0 && this.districtid!=0 && this.facilityid===undefined){

  this.facilityid=0
  this.getDHSDMEStock()
  this.GetfacwiseSTockIssuanceCoonsumptionm()
  }else{

    this.getDHSDMEStock()
  }
}

MasIndentitemslist:any
MasfacilityInfolist:any
MasItemlist:any
ItemDetailslist:any
DhsDmeList:any
itemid:any
districts:any
districtid:any
facilityid:any;
distname:any
facilityname:any
facwiseSTockIssuanceCoonsumptionmlist:any[]=[]
      
selectedDistrictId: any | null = null;

dataSource = new MatTableDataSource<any>();

@ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
constructor(public api:ApiService,private spinner: NgxSpinnerService,){

}

ngOnInit(): void {
this.getItemNoDropDown()  
this.getDistrictDropdown()



  
}
GetfacwiseSTockIssuanceCoonsumptionm() {
  this.spinner.show();
  this.api.getfacwiseSTockIssuanceCoonsumptionm(2, this.itemid, this.districtid, 0, 0).subscribe((res: any[]) => {
    if (res && res.length > 0) {
      this.facwiseSTockIssuanceCoonsumptionmlist = res.map((item: any, index: number) => ({
        ...item,
        sno: index + 1,
      }));

      console.log('Mapped List:', this.facwiseSTockIssuanceCoonsumptionmlist);
      this.dataSource.data = this.facwiseSTockIssuanceCoonsumptionmlist; // Ensure this line executes properly
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.spinner.hide();

    } else {
      console.error('No data received:', res);
      this.spinner.hide();
    }
  });
}

getDHSDMEStock(){
  this.spinner.show();
  this.api.getDhsDmeStock(2,this.itemid,this.districtid,this.facilityid,0,0,0).subscribe((res:any[])=>{
  
    if (res && res.length > 0) {
      this.DhsDmeList = res.map(item => ({
        fieldstock:item.fieldstock,
        fieldstocksku:item.fieldstocksku
        
        
      }));
      this.spinner.hide();
     
    } else {
      console.error('No nameText found or incorrect structure:', res);
      this.spinner.hide();
    }
  });  
}
GetItemDetailsWithHOD(){
  this.api.getItemDetailsWithHOD(0,this.itemid,0,0,0,0,0,0,0,0,0,0,0,0,0).subscribe((res:any[])=>{
    if (res && res.length > 0) {
      this.ItemDetailslist = res.map(item => ({
      
        itemcode:item.itemcode,
        itemname:item.itemname,
        strengtH1:item.strengtH1,
        unit:item.unit,
        groupname:item.groupname,
        itemtypename:item.itemtypename,
        edl:item.edl,
        edltype:item.edltype,
        dhsai:item.dhsai,
        readystock:item.readystock,
        qcstock: item.qcstock,
        totalpiplie:item.totalpiplie,
        rcstatus: item.rcstatus,
        rcrate: item.rcrate,
        rcstartdt: item.rcstartdt,
        rcenddt: item.rcenddt,
        dhsissue:item.dhsissue,
        dhspoqty: item.dhspoqty,
        dhsrqty: item.dhsrqty,

      }));
      // console.log('VehicleNoDropDownList :', this.VehicleNoDropDownList);
    } else {
      console.error('No nameText found or incorrect structure:', res);
      this.spinner.hide();
    }
  });  
}
getMasitems(){
  debugger
  this.api.Masitems(this.itemid,0,0,0,0,0).subscribe((res:any[])=>{
    if (res && res.length > 0) {
      this.MasItemlist = res.map(item => ({
      
        itemcode:item.itemcode,
        itemname:item.itemname,
        strengtH1:item.strengtH1,
        unit:item.unit,
        groupname:item.groupname,
        itemtypename:item.itemtypename,
        edl:item.edl,
        edltype:item.edltype

      }));
      // console.log('VehicleNoDropDownList :', this.VehicleNoDropDownList);
    } else {
      console.error('No nameText found or incorrect structure:', res);
    }
  });  
}
getMasfacilityInfo(){
  debugger
  this.api.MasfacilityInfo(367,this.districtid,0,0,0).subscribe((res:any[])=>{
    // console.log(' aaaaa Response:', res);
    if (res && res.length > 0) {
      this.MasfacilityInfolist = res.map(item => ({
        facilityid: item.facilityid, // Adjust key names if needed
        facilityname : item.facilityname,
        
        
      }));
      // console.log('VehicleNoDropDownList :', this.VehicleNoDropDownList);
    } else {
      console.error('No nameText found or incorrect structure:', res);
    }
  });  
}
getItemNoDropDown(){
  
  this.api.MasIndentitems(0,0,2,0).subscribe((res:any[])=>{
    // console.log(' Vehicle API dropdown Response:', res);
    if (res && res.length > 0) {
      this.MasIndentitemslist = res.map(item => ({
        itemid: item.itemid, // Adjust key names if needed
        nameText : item.nameText,
        
        
      }));
      // console.log('VehicleNoDropDownList :', this.VehicleNoDropDownList);
    } else {
      console.error('No nameText found or incorrect structure:', res);
    }
  });  
}
getDistrictDropdown(){
  this.api.getMasDistrict(false, 0, 0, 0, 0).subscribe((res: MasDistrict[]) => {
    // console.log(' bbbbb Response:', res);

    if (res) {
      this.districts = res.map(item => ({
        districtid: item.districtid, // Adjust key names if needed
        distname : item.distname,
        
        
      }));
    }
  });
}

onISelectChange(event: Event): void {
    debugger
  const selectedUser = this.MasIndentitemslist.find((user: { itemid: string }) => user.itemid === this.itemid); 

  if (selectedUser) {
    this.itemid=selectedUser.itemid || null;
    // this.getTravelVouchers()

  } else {
    console.error('Selected itemid not found in the list.');
  }
}
onDistrictChange(event: Event): void {
        
  debugger
  const selectedDistrict = this.districts.find((district: { districtid: string }) => district.districtid === this.districtid); 

  if (selectedDistrict) {
    this.districtid=selectedDistrict.districtid || null;
    this.distname=selectedDistrict.distname || null;
    this.getMasfacilityInfo()

  } else {
    console.error('Selected districtid not found in the list.');
  }

}
onFacChange(event: Event): void {
        
  debugger
  const selectedFac = this.MasfacilityInfolist.find((fac: { facilityid: any }) => fac.facilityid === this.facilityid); 

  if (selectedFac) {
    this.facilityid=selectedFac.facilityid || null;
    this.facilityname=selectedFac.facilityname || null;

  } else {
    console.error('Selected facilityid not found in the list.');
  }

}
}
