import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-supplier-pipelinevs-stock-position',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './supplier-pipelinevs-stock-position.html',
  styleUrl: './supplier-pipelinevs-stock-position.css',
})
export class SupplierPipelinevsStockPosition {
  loading = true;

  onIframeLoad() {
    this.loading = false;
  }
}
