import { Component} from '@angular/core';
@Component({
  selector: 'app-cgmscstock-details',
  templateUrl: './cgmscstock-details.component.html',
  styleUrls: ['./cgmscstock-details.component.css']
})
export class CGMSCStockDetailsComponent {
  selectedTabIndex: number = 0;

  selectedTabValue(event: any): void {
    
    this.selectedTabIndex = event.index;
  }
}