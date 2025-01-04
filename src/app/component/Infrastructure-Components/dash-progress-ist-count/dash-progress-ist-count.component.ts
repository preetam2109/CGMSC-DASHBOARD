import { CommonModule, NgFor, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { DashProgressDistCountComponent } from '../dash-progress-dist-count/dash-progress-dist-count.component';

@Component({
  selector: 'app-dash-progress-ist-count',
  standalone: true,
  imports: [NgFor,
    NgStyle,
    // BrowserModule,
    // BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatTabsModule,
    CommonModule, MatFormFieldModule, MatSelectModule, MatOptionModule, DashProgressDistCountComponent
    // BrowserModule
  ],
  templateUrl: './dash-progress-ist-count.component.html',
  styleUrl: './dash-progress-ist-count.component.css'
})



export class DashProgressIstCountComponent {
  selectedTabIndex: number = 0;

  selectedTabValue(event: any): void {

    this.selectedTabIndex = event.index;
  }
}
