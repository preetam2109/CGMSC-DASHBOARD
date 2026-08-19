import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pipeline-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pipeline-status.html',
  styleUrl: './pipeline-status.css',
})
export class PipelineStatus {
  loading = true;

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    if (event.data === 'OAC_LOADED') {
      this.loading = false;
    }
  }

  onIframeLoad() {
    // Backup fallback
  }
}
