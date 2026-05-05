import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-executive-supply-chain',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './executive-supply-chain.html',
  styleUrl: './executive-supply-chain.css',
})
export class ExecutiveSupplyChain {
  loading = true;

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    if (event.data === 'OAC_LOADED') {
      this.loading = false;
    }
  }
}
