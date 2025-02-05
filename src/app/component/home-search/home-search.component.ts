import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import {  MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatTableExporterModule } from 'mat-table-exporter';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { DropdownModule } from 'primeng/dropdown';


import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/service/api.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home-search',
  standalone: true,
  imports: [NgSelectModule,SelectDropDownModule,DropdownModule,MatSelectModule,FormsModule,NgSelectModule,FormsModule,CommonModule,MatButtonModule,MatMenuModule, MatTableExporterModule,MatPaginatorModule, MatTableModule],
  templateUrl: './home-search.component.html',
  styleUrl: './home-search.component.css'
})
export class HomeSearchComponent {
MasItemlist:any
itemid:any

constructor(  private route: ActivatedRoute,public api:ApiService,private spinner: NgxSpinnerService,){

}

ngOnInit(): void {
  this.route.queryParams.subscribe((params)=>{
    this.itemid=params['itemid']
    
  });
  this.getMasitems()



  
}




getMasitems(){
  
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


}

