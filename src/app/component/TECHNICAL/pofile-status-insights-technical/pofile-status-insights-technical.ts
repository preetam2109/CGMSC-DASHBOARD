import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pofile-status-insights-technical',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pofile-status-insights-technical.html',
  styleUrl: './pofile-status-insights-technical.css',
})
export class POFileStatusInsightsTechnical implements OnInit {
  loading = true;

  ngOnInit(): void {}

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    if (event.data === 'OAC_LOADED') {
      this.loading = false;
    }
  }
}
