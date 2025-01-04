import { Component } from '@angular/core';

@Component({
  selector: 'app-noc',
  templateUrl: './noc.component.html',
  styleUrls: ['./noc.component.css']
})
export class NOCComponent {
  selectedTabIndex: number = 0;

  selectedTabValue(event: any): void {
    
    this.selectedTabIndex = event.index;
  }
}