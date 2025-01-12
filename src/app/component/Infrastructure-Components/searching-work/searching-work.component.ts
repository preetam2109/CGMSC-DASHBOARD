import { DatePipe, NgFor, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgSelectModule } from '@ng-select/ng-select';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { WorkDetails, WorkFill } from 'src/app/Model/DashProgressCount';
import { ApiService } from 'src/app/service/api.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-searching-work',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,MatSelectModule,
    MatInputModule,MatFormFieldModule,MatAutocompleteModule ,NgFor,NgSelectModule,
    SelectDropDownModule,
    NgStyle,DatePipe
  ],
  templateUrl: './searching-work.component.html',
  styleUrl: './searching-work.component.css'
})
export class SearchingWorkComponent {
  base64Data: string | undefined;
  workdetails:WorkDetails[]=[];
  workfill:WorkFill[]=[];
  items = null;
  // searchTerm: string = '';
  // selectedItem: string | null = null;
  // filterControl = new FormControl();
  workID:any;
  sr: any;
  ImageName: any;
constructor(public api:ApiService,public spinner:NgxSpinnerService, public DatePipe:DatePipe){

}

ngOnInit(): void {
  
  this.getworkfill(); // Fetch data on initialization
  this.spinner.show();
}
// config = {
//   displayKey: "itemcode", // Bind label
//   search: true,
//   height: '200px',
//   placeholder: 'Select Item',
//   // customComparator: () => {}, // Optional: custom sorting
//   limitTo: this.workfill.length, // Limits the displayed options
// };
config = {
  displayKey: 'searchname', // Bind label
  search: true,
  height: '300px',
  // height: "auto",
  placeholder: 'Select Works',
  // limitTo: 10, // Limits the displayed options to 10
  limitTo: this.workfill.length,
};


getworkfill(): void {
  try {
    this.api.WorkFill(0,0,0,0,0).subscribe(
      (res) => {
        // alert('res');
        // console.log('res', JSON.stringify(res));
        this.workfill = res; // Bind the API response to workfill
      
        this.spinner.hide();
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
    
  } catch (ex: any) {
    console.error('Exception:', ex.message);
  }
}
onGetDistrictsSelect(selectedWorkID: any): void {
  // alert(`Selected Work ID: ${selectedWorkID}`);
this.workID=selectedWorkID.value.worK_ID
  // alert(`Selected Work ID: ${this.workID}`);

  // console.log('Selected Work ID: ',JSON.stringify(selectedWorkID));
  this.workfill = this.workfill.filter((item) => item.worK_ID !== selectedWorkID);
  this.spinner.show();

this.GetWorkDetails();
}

  GetWorkDetails() {
    try {
      this.api.GetWorkDetails(this.workID).subscribe(
        (res) => {
        this.workdetails = res;
        this.sr=this.workdetails[0]?.sr;
        // alert(this.workdetails[0]?.sr || 'SR not found or is null');
        this.ImageName=this.workdetails[0]?.imageName;
        // alert(this.workdetails[0]?.imageName || 'SR not found or is null');
        // console.log('workdetails: ', JSON.stringify(this.workdetails));
        var ProgressEnterby = new Date(this.workdetails[0]?.progressEnterby);
        var progressEntryTime = new Date(this.workdetails[0]?.progressEntryTime);
      this.spinner.hide();
      this.GetImageBinary();
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
      
    } catch (ex: any) {
      console.error('Exception:', ex.message);

    }




    // try {

    //   this.api.GetWorkDetails(this.workID).subscribe(res => {
    //     this.spinner.show();
    //     this.workdetails = res;
    //     console.log('workdetails: ', JSON.stringify(this.workdetails));
    //     this.spinner.hide();

    //   }, (error) => {
    //     console.error('Error fetching data:', error);
    //   }
    // }catch (ex: any) {
    //     console.error('Exception:', ex.message);
    //   }
  }
    




  onSearchInput(event: any): void {
    console.log("event:",event)
    const searchValue = event.target.value.toLowerCase();
    if (searchValue) {
      // Filter workfill array based on searchQuery
    console.log("searchValue:",searchValue)
     
      this.workfill = this.workfill.filter((item) =>
        item.searchname.toLowerCase().includes(searchValue)
      );
    } else {
      this.getworkfill(); // Reset to the full list when the input is cleared
    }
  }

  exportAsPDF() {
    const element = document.getElementById('workdetails');
    if (element) { // Check if the element is not null
      html2canvas(element, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'landscape',
        });
        pdf.addImage(imgData, 'PNG', 10, 10, 280, 190); // Adjust dimensions as needed
        pdf.save('work_details.pdf');
      });
    } else {
      console.error("Element with ID 'workdetails' not found.");
    }
  }

  // GetImageBinary(){
  //   ;
  //   try {
  //  let id=90691, img= 'CGMSC WORK.jpg';
  //     this.api.GetImageBinary(90691, 'CGMSC WORK.jpg').subscribe(
  //       (res) => {
  //       var data = res;
  //       console.log('workdetails: ', JSON.stringify(res));
  //     // this.spinner.hide();

  //       },
  //       (error) => {
  //         console.error('Error fetching data:', error);
  //       }
  //     );
      
  //   } catch (ex: any) {
  //     console.error('Exception:', ex.message);

  //   }
  // }
  GetImageBinary() {
    try {
      // const sr = 90691;
      // const img = 'CGMSC WORK.jpg';
      this.api.GetImageBinary(this.sr,this.ImageName).subscribe(
        (res) => {
          this.base64Data = res;
          // console.log('Image data: ', this.base64Data);
          // console.log('parse res:',JSON.parse(res));
          // Handle the response (e.g., displaying the image)
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
    } catch (ex: any) {
      console.error('Exception:', ex.message);
    }
  }
  
}

