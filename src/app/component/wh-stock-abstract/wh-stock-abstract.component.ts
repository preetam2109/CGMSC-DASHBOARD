import { Component } from '@angular/core';

@Component({
  selector: 'app-wh-stock-abstract',
  templateUrl: './wh-stock-abstract.component.html',
  styleUrls: ['./wh-stock-abstract.component.css']
})
export class WhStockAbstractComponent {
  selectedTabIndex: number = 0;

  selectedTabValue(event: any): void {
    
    this.selectedTabIndex = event.index;
  }
}
