import { Component } from '@angular/core';

@Component({
  selector: 'app-iwh-pending',
  templateUrl: './iwh-pending.component.html',
  styleUrls: ['./iwh-pending.component.css']
})
export class IwhPendingComponent {
  selectedTabIndex: number = 0;

  selectedTabValue(event: any): void {
    
    this.selectedTabIndex = event.index;
  }
}