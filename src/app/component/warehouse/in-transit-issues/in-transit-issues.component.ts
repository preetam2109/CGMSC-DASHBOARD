import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { text } from '@fortawesome/fontawesome-svg-core';
import { NgxSpinnerService } from 'ngx-spinner';
import { GetVehicleEntriesExits } from 'src/app/Model/GetVehicleEntriesExits';
import { MasRecRemarks } from 'src/app/Model/MasRecRemarks';
import { PipelineDDLTransit } from 'src/app/Model/PipelineDDLTransit';
import {  PipelineDetailsGrid } from 'src/app/Model/PipelineDetailsGrid';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-in-transit-issues',
  templateUrl: './in-transit-issues.component.html',
  styleUrls: ['./in-transit-issues.component.css']
})
export class InTransitIssuesComponent implements OnInit {
  pipelineDetails: PipelineDetailsGrid[] = [];
  items: PipelineDDLTransit[] = []; // List of items from the API
  statuses: MasRecRemarks[] = [];
  vehicles:GetVehicleEntriesExits[]=[];
  selectedItem: PipelineDDLTransit | null = null; // Store the entire object
  selectedStatus: string = '';
  selectedVehicleNumber: string = '0';
  plateNo:any=0
  remark: string = '';
  isanpractive:any

  constructor(private spinner: NgxSpinnerService,private api: ApiService, private http: HttpClient) {}

  ngOnInit() {
    // this.spinner.show();\
    
    this.getWarehouseInfo();
    this.loadItems();
    this.loadStatuses();
    // this.loadGetVehicleEntriesExits()
    // if(this.isanpractive==='Y'){

    // }
  }

  getWarehouseInfo(){
    this.api.GetWarehouseInfo(sessionStorage.getItem('facilityid')).subscribe((res:any)=>{
        this.isanpractive=res[0].isanpractive
         if(this.isanpractive==='Y'){
          this.loadGetVehicleEntriesExits()

    }
        console.log('in tranproactive ',this.isanpractive)
    })
  }

  // Fetch Pipeline Details only after selectedItem is available
  fetchPipelineDetails() {
    this.spinner.show();
    
    if (this.selectedItem) {
      // Ensure selectedItem is available before making the API call
      const ponoid = this.selectedItem;
      console.log('Fetching pipeline details for PONOID:', ponoid);

      this.api.getPipelineDetailsGrid(ponoid, 0, 0, sessionStorage.getItem('facilityid'), sessionStorage.getItem('userid')).subscribe(
        (response: PipelineDetailsGrid[]) => {
          this.pipelineDetails = response; // Store the response data
          console.log('Pipeline Details:', this.pipelineDetails);
           // Log or use the data
           this.spinner.hide();
        },
        (error) => {
          console.error('Error fetching pipeline details:', error);
          this.spinner.hide();

        }
      );
    } else {
      console.error('Selected item is null. Cannot fetch pipeline details.');
      this.spinner.hide();

    }
  }

  // Load items from the API
  loadItems() {
    // this.spinner.show();
    this.api.getPipelineDDLTransit(0, sessionStorage.getItem('facilityid'), sessionStorage.getItem('userid')).subscribe((res: PipelineDDLTransit[]) => {
      this.items = res;
      console.log('Items loaded:', this.items); // Debugging: Print items
      this.fetchPipelineDetails();
      // this.spinner.hide();

    });
  }

  // Load statuses from the API
  loadStatuses() {
    this.api.getMasRecRemarks(sessionStorage.getItem('facilityid'), 'WH').subscribe((res: MasRecRemarks[]) => {
      this.statuses = res;
      console.log('Statuses loaded:', this.statuses); // Debugging: Print statuses
    });
  }

  loadGetVehicleEntriesExits() {
    
    this.api.getVehicleEntriesExits(sessionStorage.getItem('facilityid'), 7,0,0).subscribe((res: GetVehicleEntriesExits[])=>  {
      this.vehicles = res;
      this.plateNo=res[0].vplateno
      console.log('vehicles loaded:', this.vehicles); // Debugging: Print statuses
    });
  }


  // Triggered when the item is selected
  onItemChange() {
    this.spinner.show();
    if (this.selectedItem) {
      console.log('Selected item:', this.selectedItem); // Print selected item
      this.fetchPipelineDetails();
    }
  }
  onMasVehicleChange() {
    if (this.selectedVehicleNumber) {
      console.log('Selected vnumber:', this.selectedVehicleNumber); // Print selected item
      // this.fetchPipelineDetails();
    }
  }

  // Triggered when the status is selected
  onMasRemarksChange() {
    console.log('Selected status ID:', this.selectedStatus); // Print selected status
  }

  saveData() {
    // const apiUrl = 'https://dpdmis.in/CGMSCHO_API2/api/HO/insertTblRecvProgress_WithVhicle';
  
    // const params = {
    //   remid: this.selectedStatus.toString(),
    //   remarks: this.remark,
    //   ponoid: this.selectedItem,
    //   whid: sessionStorage.getItem('facilityid'),
    //   tranId: this.selectedVehicleNumber,
    //   plateNo: this.plateNo
    // };
  
    this.api.insertTblRecvProgress_WithVhicle(this.selectedStatus,this.remark,this.selectedItem,sessionStorage.getItem('facilityid'),this.selectedVehicleNumber,this.plateNo).subscribe(
      (response) => {
        console.log('POST successful:', response);
        alert('Data inserted successfully.');
      },
      (error) => {
        console.error('POST failed:', error);
        alert('Failed to insert data.');
      }
    );
  }
}

// if(isnpr==yes)
//   textbox=plateno
//   tranID=dropdown