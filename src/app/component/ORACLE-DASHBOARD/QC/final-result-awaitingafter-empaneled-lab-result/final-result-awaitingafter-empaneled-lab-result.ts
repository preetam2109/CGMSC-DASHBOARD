import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-final-result-awaitingafter-empaneled-lab-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './final-result-awaitingafter-empaneled-lab-result.html',
  styleUrl: './final-result-awaitingafter-empaneled-lab-result.css'
})
export class FinalResultAwaitingafterEmpaneledLabResult {
  loading = true;

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    if (event.data === 'OAC_LOADED') {
      this.loading = false;
    }
  }
}



