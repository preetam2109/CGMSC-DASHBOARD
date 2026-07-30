import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { PipelineStatus } from '../pipeline-status/pipeline-status';
import { SupplierPipelinevsStockPosition } from '../supplier-pipelinevs-stock-position/supplier-pipelinevs-stock-position';

@Component({
  selector: 'app-pipeline-supply-tabs',
  standalone: true,
  imports: [MatTabsModule, PipelineStatus, SupplierPipelinevsStockPosition],
  templateUrl: './pipeline-supply-tabs.html',
  styleUrl: './pipeline-supply-tabs.css',
})
export class PipelineSupplyTabs {

}
