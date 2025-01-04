import { Component } from '@angular/core';

@Component({
  selector: 'app-indent-pending-wh-das',
  templateUrl: './indent-pending-wh-das.component.html',
  styleUrls: ['./indent-pending-wh-das.component.css']
})
export class IndentPendingWhDasComponent {
  selectedTabIndex: number = 0;

  selectedTabValue(event: any): void {
    
    this.selectedTabIndex = event.index;
  }
}


