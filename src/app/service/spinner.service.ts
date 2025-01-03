import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private spinnerActive: boolean = false;

  constructor(private spinner: NgxSpinnerService) {}

  show(): void {
    if (!this.spinnerActive) {
      this.spinner.show();
      this.spinnerActive = true;
    }
  }

  hide(): void {
    if (this.spinnerActive) {
      this.spinner.hide();
      this.spinnerActive = false;
    }
  }

}
