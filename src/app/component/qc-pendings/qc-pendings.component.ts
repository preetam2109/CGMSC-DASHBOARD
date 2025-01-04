import { Component } from '@angular/core';

@Component({
  selector: 'app-qc-pendings',
  templateUrl: './qc-pendings.component.html',
  styleUrls: ['./qc-pendings.component.css']
})
export class QcPendingsComponent  {
  selectedTabIndex: number = 0;

  selectedTabValue(event: any): void {
    
    this.selectedTabIndex = event.index;
  }
}