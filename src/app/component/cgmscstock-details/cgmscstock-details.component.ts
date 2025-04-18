import { Component} from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cgmscstock-details',
  templateUrl: './cgmscstock-details.component.html',
  styleUrls: ['./cgmscstock-details.component.css']
})
export class CGMSCStockDetailsComponent {
  selectedTabIndex: number = 0;

constructor(private router:Router){

  }
  selectedTabValue(event: any): void {
    
    this.selectedTabIndex = event.index;
  }
  home(){
    if(localStorage.getItem('roleName')==='Public'){

      this.router.navigate(['public-view1'])
    }else{

      this.router.navigate(['welcome'])
    }

  }
}