import { Component } from '@angular/core';

@Component({
  selector: 'app-qc-dasboard-lab',
  templateUrl: './qc-dasboard-lab.component.html',
  styleUrls: ['./qc-dasboard-lab.component.css']
})
export class QcDasboardLabComponent {
  selectedTabIndex: number = 0;

  selectedTabValue(event: any): void {
    
    this.selectedTabIndex = event.index;
  }
}