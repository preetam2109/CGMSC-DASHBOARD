import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-indent-pending-wh-das',
  templateUrl: './indent-pending-wh-das.component.html',
  styleUrls: ['./indent-pending-wh-das.component.css']
})
export class IndentPendingWhDasComponent {
  constructor(private router:Router){

  }
  selectedTabIndex: number = 0;

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


