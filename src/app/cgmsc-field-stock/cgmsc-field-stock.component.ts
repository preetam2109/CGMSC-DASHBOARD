import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { CgmscFieldStockDhsComponent } from "../cgmsc-field-stock-dhs/cgmsc-field-stock-dhs.component";
import { CgmscFieldStockDmeComponent } from "../cgmsc-field-stock-dme/cgmsc-field-stock-dme.component";
import { CgmscFieldStockAyushComponent } from "../cgmsc-field-stock-ayush/cgmsc-field-stock-ayush.component";
import { ApiService } from 'src/app/service/api.service';
import { InsertUserPageViewLogmodal} from 'src/app/Model/DashLoginDDL';
import { Location } from '@angular/common';
@Component({
  selector: 'app-cgmsc-field-stock',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTabsModule, CgmscFieldStockDhsComponent, CgmscFieldStockDmeComponent, CgmscFieldStockAyushComponent],
  templateUrl: './cgmsc-field-stock.component.html',
  styleUrl: './cgmsc-field-stock.component.css'
})
export class CgmscFieldStockComponent {
  selectedTabIndex: number = 0;
  InsertUserPageViewLogdata: InsertUserPageViewLogmodal = new InsertUserPageViewLogmodal();
  pageName: string = '';
  fullUrl: string = '';
  

 constructor(private location: Location,private api:ApiService){
  this.pageName = this.location.path();
  this.fullUrl = window.location.href;
}
ngOnInit():void {
  this.InsertUserPageViewLog();
}




 InsertUserPageViewLog() {
  try {
    // debugger
    const roleIdName = localStorage.getItem('roleName') || '';
    const userId = Number(sessionStorage.getItem('userid') || 0);
    const roleId = Number(sessionStorage.getItem('roleId') || 0);
    // const userName = sessionStorage.getItem('firstname') || '';
    const ipAddress = sessionStorage.getItem('ipAddress') || '';
    const userAgent = navigator.userAgent; 
    this.InsertUserPageViewLogdata.logId = 0; 
    this.InsertUserPageViewLogdata.userId = userId;
    this.InsertUserPageViewLogdata.roleId = roleId;
    this.InsertUserPageViewLogdata.roleIdName = roleIdName;
    this.InsertUserPageViewLogdata.pageName = this.pageName;
    this.InsertUserPageViewLogdata.pageUrl = this.fullUrl;
    this.InsertUserPageViewLogdata.viewTime = new Date().toISOString();
    this.InsertUserPageViewLogdata.ipAddress = ipAddress;
    this.InsertUserPageViewLogdata.userAgent = userAgent;
    //console.log('InsertUserPageViewLogdata=',this.InsertUserPageViewLogdata);
// if(localStorage.getItem('Log Saved')|| ''!){

// }
    // API call
    this.api.InsertUserPageViewLogPOST(this.InsertUserPageViewLogdata).subscribe({
      next: (res: any) => {
        console.log('Page View Log Saved:',res);
        // const LogSaved='Log Saved'
        // localStorage.setItem('Log Saved', LogSaved);
      },
      error: (err: any) => {
        console.error('Backend Error:', JSON.stringify(err.message));
      }
    });

  } catch (err: any) {
    console.error('Error:', err.message);
  }
}


  selectedTabValue(event: any): void {
    
    this.selectedTabIndex = event.index;
  }
}