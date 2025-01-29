import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { CgmscFieldStockDhsComponent } from "../cgmsc-field-stock-dhs/cgmsc-field-stock-dhs.component";
import { CgmscFieldStockDmeComponent } from "../cgmsc-field-stock-dme/cgmsc-field-stock-dme.component";
import { CgmscFieldStockAyushComponent } from "../cgmsc-field-stock-ayush/cgmsc-field-stock-ayush.component";

@Component({
  selector: 'app-cgmsc-field-stock',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTabsModule, CgmscFieldStockDhsComponent, CgmscFieldStockDmeComponent, CgmscFieldStockAyushComponent],
  templateUrl: './cgmsc-field-stock.component.html',
  styleUrl: './cgmsc-field-stock.component.css'
})
export class CgmscFieldStockComponent {
  selectedTabIndex: number = 0;

  selectedTabValue(event: any): void {
    
    this.selectedTabIndex = event.index;
  }
}