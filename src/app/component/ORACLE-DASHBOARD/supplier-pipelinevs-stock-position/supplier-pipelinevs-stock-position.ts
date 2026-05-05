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

  // Define dynamic properties to pass to Oracle Analytics
  supplierId: any;
  whId: any;

  ngOnInit() {
    this.supplierId = 0;
    this.whId = 0;
  }

  onIframeLoad() {
    this.loading = false;
  }
}
