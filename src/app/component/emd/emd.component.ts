import { Component } from '@angular/core';

@Component({
  selector: 'app-emd',
  templateUrl: './emd.component.html',
  styleUrls: ['./emd.component.css']
})
export class EmdComponent {
  selectedTabIndex: number = 0;

  selectedTabValue(event: any): void {
    
    this.selectedTabIndex = event.index;
  }
}


