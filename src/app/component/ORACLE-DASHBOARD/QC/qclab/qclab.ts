import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentSampleStatusTATMonitoring } from '../current-sample-status-tatmonitoring/current-sample-status-tatmonitoring';
import { QCSampleTrackingUnderEmpanelledLab } from '../qcsample-tracking-under-empanelled-lab/qcsample-tracking-under-empanelled-lab';

@Component({
  selector: 'app-qclab',
  standalone: true,
  imports: [CommonModule, CurrentSampleStatusTATMonitoring, QCSampleTrackingUnderEmpanelledLab],
  templateUrl: './qclab.html',
  styleUrl: './qclab.css',
})
export class Qclab {
  activeTab: string = 'tab1';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}

