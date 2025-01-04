import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Districts } from '../Model/Districts';
import { Complaints } from '../Model/Complaints';
import { DistrictWiseComplaints } from '../Model/DistrictWiseComplaints';
import { TotalNoRc } from '../Model/Totalnorc';
import { dispatchPendingSummary } from '../Model/DispatchPendingSummary';
import { dispatchPending } from '../Model/dispatchPending';
import { ReceiptPendingSummary } from '../Model/ReceiptPendingSummary';
import { ReceiptPending } from '../Model/ReceiptPending';
import { Observable } from 'rxjs';
import { DhsSummary } from '../Model/DhsSummary';
import { DHSDetailsItemWise } from '../Model/DHSDetailsItemWise';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {

  constructor(private http:HttpClient) { }

//   retrieveAllDistricts(){
//      
//     return this.http.get<Districts[]>(`https://localhost:7288/api/District`)
//   }
//   retrieveAllRC(){
//    return this.http.get<Districts[]>(`https://localhost:7190/getAllRCReport`)
//  }

//  totalNoRc(){
// 
//   return this.http.get<TotalNoRc[]>(`https://localhost:7190/getTotalNoRC`)
//  }

//  totalNoRc(): Observable<TotalNoRc> {
//   return this.http.get<TotalNoRc>(`https://localhost:7190/getTotalNoRC`);
// }

//  overAllComplaints(){
//   return this.http.get<Complaints[]>(`https://localhost:7190/getAllComplaints`)
//  }
//  overAllComplaintsSolved(district: string){
//   
//   return this.http.get<Complaints[]>(` https://localhost:7190/getAllComplaintsSolved?district=${district}`)
//  }
//  overAllComplaintsSolvedorUnsolved(district: string){
//   
//   return this.http.get<Complaints[]>(`https://localhost:7190/getTotalSolvedOrUnsolved?district=${district}`)
//  }

//  districtWiseComplaints(){
//   return this.http.get<DistrictWiseComplaints[]>(`https://localhost:7190/getDistrictWiseComplaints`)
//  }
//  getDispatchPendingSummary(){
//   return this.http.get<dispatchPendingSummary[]>(`https://localhost:7190/api/DispatchPendingSummary/getDispatchPendingSummary`)

//  }
//   getDispatchPending(){
//   return this.http.get<dispatchPending[]>(`https://localhost:7190/api/DispatchPending/getDispatchPending`)
//  }

//  receiptPendingSummary(){
//   return this.http.get<ReceiptPendingSummary[]>(`https://localhost:7190/api/ReceiptPending_summary/getReceiptPending_summary`)

//  }
//  receiptPending(){
//   return this.http.get<ReceiptPending[]>(`https://localhost:7190/api/ReceiptPending/getReceiptPending`)
//  }
//  installationPendingSummary(){
//   return this.http.get<ReceiptPendingSummary[]>(` https://localhost:7190/api/InstallationPending_summary/getInstallationPending_summary`)
// }

// installationPendingDetails(){
//   return this.http.get<ReceiptPending[]>(`https://localhost:7190/api/InstallationPending_summary/getInstallation_details`)
//  }
//  getDHSSummary(){
//   return this.http.get<DhsSummary[]>(`https://localhost:7190/api/DHS/getDHS_summary`)
//  }

//  getDHSDetailsItemWise(){
//   return this.http.get<DHSDetailsItemWise[]>(`https://localhost:7190/api/DHS/getDHS_detailsItemwise`)
//  }
// getDHSSummaryDateRange(fromDate:string,toDate:string){
//   return this.http.get<DhsSummary[]>(`https://localhost:7190/api/DHS/getDHS_summary_yearWise?fromDate=${fromDate}&toDate=${toDate}`);
// }

}
