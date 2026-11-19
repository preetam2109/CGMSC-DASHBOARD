import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-drugs-pipeline-status-po-given',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './drugs-pipeline-status-po-given.html',
  styleUrl: './drugs-pipeline-status-po-given.css',
})
export class DrugsPipelineStatusPOGiven {
  loading = true;

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    if (event.data === 'OAC_LOADED') {
      this.loading = false;
    }
  }
}
