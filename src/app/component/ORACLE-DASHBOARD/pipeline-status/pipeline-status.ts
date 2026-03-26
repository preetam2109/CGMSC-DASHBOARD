import { Component } from '@angular/core';
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

  onIframeLoad() {
    this.loading = false;
  }
}
