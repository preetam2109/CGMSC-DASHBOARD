import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expired-items',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expired-items.html',
  styleUrl: './expired-items.css',
})
export class ExpiredItems {
   loading = true;

  onIframeLoad() {
    this.loading = false;
  }

}
