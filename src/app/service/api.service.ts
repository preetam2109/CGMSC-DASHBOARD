import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Districts } from '../Model/Districts';
import {  Complaints } from '../Model/Complaints';
import { DistrictWiseComplaints } from '../Model/DistrictWiseComplaints';
import { TotalNoRc } from '../Model/Totalnorc';
import { dispatchPendingSummary } from '../Model/DispatchPendingSummary';
import { dispatchPending } from '../Model/dispatchPending';
import { ReceiptPendingSummary } from '../Model/ReceiptPendingSummary';
import { ReceiptPending } from '../Model/ReceiptPending';
import { Observable } from 'rxjs';
import { DhsSummary } from '../Model/DhsSummary';
import { DHSDetailsItemWise } from '../Model/DHSDetailsItemWise';
import { DPDMISSupemdSummary } from '../Model/DPDMISSupemdSummary';
import { EmdStatusDetail } from '../Model/EmdStatusDetail';
import { DPDMISEMDTenderwisePending } from '../Model/DPDMISEMDTenderwisePending';
import { DPDMISEMDDashboard } from '../Model/DPDMISEMDDashboard';
import { IndentPendingWH} from '../Model/IndentPendingWH';
import { CGMSCStockDetails } from '../Model/CGMSCStockDetails';
import { WarehouseWiseStock } from '../Model/WarehouseWiseStock';
import { NearExpReport } from '../Model/NearExpReport';
import { NearExpReportbatch } from '../Model/NearExpReportbatch';
import { ReagIndentPending } from '../Model/ReagIndentPending';
import { ReagIndentPendingEQSummary } from '../Model/ReagIndentPendingEQSummary';
import { ReagIndentIssueMMID } from '../Model/ReagIndentIssueMMID';
import { ReagIndentIssueDetails } from '../Model/ReagIndentIssueDetails';
import { PipelineDetails } from '../Model/PipelineDetails';
import { ItemDetailsPopup } from '../Model/ItemDetailsPopup';
import { GetRaisedPicks } from '../Model/GetRaisedPicks';
import { GetPendingToPick } from '../Model/GetPendingToPick';
import { NOCApprovedSummary } from '../Model/NOCApprovedSummary';
import { UndroppedDocket } from '../Model/UndroppedDocket';
import { PendingToDrop } from '../Model/PendingToDrop';
import { InitiatedNotIssueSummary } from '../Model/InitiatedNotIssueSummary';
import { IWHPiplineSummary } from '../Model/IWHPiplineSummary';
import { InitiatedNotIssueDetaqils } from '../Model/InitiatedNotIssueDetaqils';
import { IWHPiplineDetails } from '../Model/IWHPiplineDetails';
import { CGMSCNOCPendingSummary } from '../Model/CGMSCNOCPendingSummary';
import { CGMSCNOCPendingDetails } from '../Model/CGMSCNOCPendingDetails';
import { LabIssuePendingSummary } from '../Model/LabIssuePendingSummary';
import { LabIssuePendingDetails } from '../Model/LabIssuePendingDetails';
import { HODYearWiseIssuanceSummary } from '../Model/HODYearWiseIssuanceSummary';
import { InTransitHOtoLab } from '../Model/InTransitHOtoLab';
import { VehicleInfo } from '../Model/VehicleInfo';
import { PipelineDDLTransit } from '../Model/PipelineDDLTransit';
import { MasRecRemarks } from '../Model/MasRecRemarks';
import { PipelineDetailsGrid } from '../Model/PipelineDetailsGrid';
import { GetVehicleEntriesExits } from '../Model/GetVehicleEntriesExits';
import { EdlNonEdlIssuePercentSummary } from '../Model/EdlNonEdlIssuePercentSummary';
import { IssuePerWisePerClick } from '../Model/IssuePerWisePerClick';
import { IssuedPerWise } from '../Model/IssuedPerWise';
import { DistrictWiseStock } from '../Model/DistrictWiseStock';
import { DdlItemWiseInHandQty } from '../Model/DdlItemWiseInHandQty';
import { MasDistrict } from '../Model/MasDistrict';
import { DistFACwiseStockPostionNew } from '../Model/DistFACwiseStockPostionNew';
import { SeasonDrugs } from '../Model/SeasonDrugs';
import { WarehouseInfo } from '../Model/WarehouseInfo';
import { FacCoverage } from '../Model/FacCoverage';
import { StockSummaryBalanceIndent } from '../Model/StockSummaryBalanceIndent';
import { StockSummaryBalanceIndentDetails } from '../Model/StockSummaryBalanceIndentDetails';
import { NearExpRCDetails } from '../Model/NearExpRCDetails';
import { SupplyDuration } from '../Model/SupplyDuration';
import { POSuppyTimeTakenYear } from '../Model/POSuppyTimeTakenYear';
import { PaidTimeTaken } from '../Model/PaidTimeTaken';
import { QCTimeTakenYearwise } from '../Model/QCTimeTakenYearwise';
import { QCLabYearAvgTime } from '../Model/QCLabYearAvgTime';
import { StockoutSummary } from '../Model/StockoutSummary';
import { HODYearWiseIssuance } from '../Model/HODYearWiseIssuance';
import { DistDrugCount } from '../Model/DistDrugCount';
import { WHDrugCount } from '../Model/WHDrugCount';
import { HODPOYear_AgAI } from '../Model/HODPOYear_AgAI';
import { DirectorateAIDetails } from '../Model/DirectorateAIDetails';
import { GroupWiseAI_PODetails } from '../Model/GroupWiseAI_PODetails';
import { Monthwise_Issuance } from '../Model/GroupItemtypeRCStock';
import { Diswise_Issuance } from '../Model/Diswise_Issuance';
import { DropAppWarehousePerformance } from '../Model/DropAppWarehousePerformance';
import { DelvieryDash } from '../Model/DelvieryDash';
import { masddlUser } from '../Model/masddlUser';
import { MasWH } from '../Model/MasWH';
import { DashLoginDDL } from '../Model/DashLoginDDL';
import { DisYrGrowth } from '../Model/DisYrGrowth';
import { DistCGMSCSupplyDHS } from '../Model/DistCGMSCSupplyDHS';

import {
  DashProgressCount, GetDistrict, DashProgressDistCount, DMEProgressSummary,
  WorkFill, WorkDetails, MainScheme, DivisionPrograss, ProgressDetailsLatLong,
  WOpendingTotal, WorkOrderPendingDetailsNew, AEDistrictEngAllotedWorks,
  SbuEngAllotedWorks, AEEngAllotedWorks, LIPendingTotal, HandoverAbstract,
  GetHandoverDetails, sbuDistrictEngAllotedWorks, LandIssueDetails,
  WorkDetailsWithEng, DistrictNameDME,ProjectTimeline, TSDetail, TSDetailallData, WorkOrderIssued,
} from '../Model/DashProgressCount';

import { DistDHSStock } from '../Model/DistDHSStock';
import { GetVehicleNo } from '../Model/GetVehicleNo';
import { TravelVouchers } from '../Model/TravelVouchers';
import { GetLatLong } from '../Model/Warehouse';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://cgmsc.gov.in/HIMIS_APIN/api';


  constructor(private http:HttpClient) { }

  // retrieveAllDistricts(){
  //    
  //   return this.http.get<Districts[]>(`https://localhost:7288/api/District`)
  // }
  retrieveAllRC(){
   return this.http.get<Districts[]>(`https://cgmsc.gov.in/EMIS_API/getAllRCReport`)
 }
 
//  totalNoRc(){
// 
//   return this.http.get<TotalNoRc[]>(`https://cgmsc.gov.in/EMIS_API/getTotalNoRC`)
//  }

 totalNoRc(): Observable<TotalNoRc> {
  return this.http.get<TotalNoRc>(`https://cgmsc.gov.in/EMIS_API/getTotalNoRC`);
}

 overAllComplaints(){
  return this.http.get<Complaints[]>(`https://cgmsc.gov.in/EMIS_API/getAllComplaints`)
 }
 overAllComplaintsSolved(district: string){
  
  return this.http.get<Complaints[]>(` https://cgmsc.gov.in/EMIS_API/getAllComplaintsSolved?district=${district}`)
 }
 overAllComplaintsSolvedorUnsolved(district: string){
  
  // https://cgmsc.gov.in/EMIS_API/getTotalSolvedOrUnsolved?district=jashpur
  return this.http.get<Complaints[]>(`https://cgmsc.gov.in/EMIS_API/getTotalSolvedOrUnsolved?district=${district}`)
 }

 districtWiseComplaints(){
  return this.http.get<DistrictWiseComplaints[]>(`https://cgmsc.gov.in/EMIS_API/getDistrictWiseComplaints`)
 }
 getDispatchPendingSummary(){
  return this.http.get<dispatchPendingSummary[]>(`https://cgmsc.gov.in/EMIS_API/api/DispatchPendingSummary/getDispatchPendingSummary`)

 }
 //emd status summary
 getEmdStatusSummary(){
  return this.http.get<DPDMISSupemdSummary[]>(`https://dpdmis.in/CGMSCHO_API2/api/EMD/DPDMISSupemdSummary`)
 }
 //emd status datails
 getEmdStatus(){
  return this.http.get<EmdStatusDetail[]>(`https://dpdmis.in/CGMSCHO_API2/api/EMD/DPDMISEMDDetails`)
 }
 getDPDMISEMDTenderwisePendin(){
  return this.http.get<DPDMISEMDTenderwisePending[]>(`https://dpdmis.in/CGMSCHO_API2/api/EMD/DPDMISEMDTenderwisePending`)

 }
//  getemdDashboerd
DPDMISEMDDashboardSummary(){
  return this.http.get<DPDMISEMDDashboard[]>(`https://dpdmis.in/CGMSCHO_API2/api/EMD/DPDMISEMDDashboard`)
}

  getDispatchPending(){
  return this.http.get<dispatchPending[]>(`https://cgmsc.gov.in/EMIS_API/api/DispatchPending/getDispatchPending`)
 }

 receiptPendingSummary(){
  return this.http.get<ReceiptPendingSummary[]>(`https://cgmsc.gov.in/EMIS_API/api/ReceiptPending_summary/getReceiptPending_summary`)

 }
 receiptPending(){
  return this.http.get<ReceiptPending[]>(`https://cgmsc.gov.in/EMIS_API/api/ReceiptPending/getReceiptPending`)
 }
 installationPendingSummary(){
  return this.http.get<ReceiptPendingSummary[]>(` https://cgmsc.gov.in/EMIS_API/api/InstallationPending_summary/getInstallationPending_summary`)
}

installationPendingDetails(){
  return this.http.get<ReceiptPending[]>(`https://cgmsc.gov.in/EMIS_API/api/InstallationPending_summary/getInstallation_details`)
 }
 getDHSSummary(){
  return this.http.get<DhsSummary[]>(`https://cgmsc.gov.in/EMIS_API/api/DHS/getDHS_summary`)
 }

 getDHSDetailsItemWise(){
  return this.http.get<DHSDetailsItemWise[]>(`https://cgmsc.gov.in/EMIS_API/api/DHS/getDHS_detailsItemwise`)
 }
getDHSSummaryDateRange(fromDate:string,toDate:string){
  return this.http.get<DhsSummary[]>(`https://cgmsc.gov.in/EMIS_API/api/DHS/getDHS_summary_yearWise?fromDate=${fromDate}&toDate=${toDate}`);
}

//whstock abstracts
getWHStockData(mcatid: number, warehouseId: number): Observable<any> {
  
  const params = new HttpParams()
    .set('mcatid', mcatid.toString())
    .set('warehouseId', warehouseId.toString());

  return this.http.get<any>(`https://dpdmis.in/CGMSCHO_API2/api/HO/CGMSCStockValueData`, { params });
}

CGMSCStockDetails(mcatid: number, EDLNedl: string, mitemid: number, WHID: number, searchP: number, userid: number, coll_cmho: number): Observable<any> {
  
  const params = {
    mcatid: mcatid.toString(),
    EDLNedl: EDLNedl,
    mitemid: mitemid.toString(),
    WHID: WHID,
    // WHID: WHID.toString(),
    searchP: searchP.toString(),
    userid: userid.toString(),
    coll_cmho: coll_cmho.toString(),
  };

  return this.http.get<CGMSCStockDetails[]>(`https://dpdmis.in/CGMSCHO_API2/api/HO/CGMSCItemStock`, { params });
}

//indent pending at Warehouse  api
getIndentPendingAtWHData(per: string = 'All', clause: number = 1): Observable<any> {

  return this.http.get<any>(`https://dpdmis.in/CGMSCHO_API2/api/Warehouse/IndentPending?per=${per}&clause=${clause}`);
}
getIndentPendingAtWHDetails(whid: number, clause: number, factype: number): Observable<any> {
  const params = new HttpParams()
    .set('whid', whid.toString())
    .set('clause', clause.toString())
    .set('factype', factype.toString());

  return this.http.get<IndentPendingWH>(`https://dpdmis.in/CGMSCHO_API2/api/Warehouse/IndentPendingDetails`, { params });
}


 // Method for ReagIndentPending with mmid
 getReagIndentPending(mmid: any){
  ;
  return this.http.get<ReagIndentPending[]>(`https://dpdmis.in/CGMSCHO_API2/api/Warehouse/ReagIndentPending?mmid=${mmid}`);
}


// Method for ReagIndentPendingEQ
getReagIndentPendingEQ(){
  
  return this.http.get<ReagIndentPendingEQSummary[]>(`https://dpdmis.in/CGMSCHO_API2/api/Warehouse/ReagIndentPendingEQ`);
}





//this is for popuo WarehouseWiseStock
getWarehouseWiseStock(mitemid:number,whid:number): Observable<any> {

  const params = new HttpParams()
  .set('mitemid',mitemid.toString())
    .set('whid', whid.toString());
     
  return this.http.get<WarehouseWiseStock>(`https://dpdmis.in/CGMSCHO_API2/api/HO/WarehouseWiseStock`, { params });

}
// NearExpReport
getNearExpReport(mcid:number,nexppara:number): Observable<any> {

  const params = new HttpParams()
  .set('mcid',mcid.toString())
    .set('nexppara', nexppara.toString());
     
  return this.http.get<NearExpReport>(`https://dpdmis.in/CGMSCHO_API2/api/HO/NearExpReport`, { params });

}
NearExpReportbatch(mcid:number,nexppara:number,expmonth:string): Observable<any> {

  const params = new HttpParams()
  .set('mcid',mcid.toString())
    .set('nexppara', nexppara.toString())
    .set('expmonth', expmonth.toString());
     
  return this.http.get<NearExpReportbatch>(`https://dpdmis.in/CGMSCHO_API2/api/HO/NearExpReportbatch`, { params });

}

//reagIndentIssue

getReagIndentIssueMMID(){
return this.http.get<ReagIndentIssueMMID[]>(`https://dpdmis.in/CGMSCHO_API2/api/Warehouse/ReagIndentIssueMMID`);
}

getReagIndentIssueDetails(mmid:any){

return this.http.get<ReagIndentIssueDetails[]>(`https://dpdmis.in/CGMSCHO_API2/api/Warehouse/ReagIndentIssueDetails?mmid=${mmid}`)

}

//getPipelineDetails
getPipelineDetails(ponoid: number, itemid: number, mcid: number, whid: number, userid: number): Observable<any> {
  

  return this.http.get<PipelineDetails[]>(`https://dpdmis.in/CGMSCHO_API2/api/HO/getPipelineDetails?ponoid=${ponoid}&itemid=${itemid}&mcid=${mcid}&whid=${whid}&userid=${userid}`);
}

// getgetItemDetails 
getItemDetails(mcid: number, itemid: number, groupid: number, itemtypeid: number, edltype: number, edlcat: number, yearid: number, dhsai: number, dmai: number, totalai: number, redycnt: number, uqccnt: number, pipelinecnt: number, rccnt: number, whid: number): Observable<any> {
  const params = {
    mcid: mcid.toString(),
    itemid: itemid.toString(),
    groupid: groupid.toString(),
    itemtypeid: itemtypeid.toString(),
    edltype: edltype.toString(),
    edlcat: edlcat.toString(),
    yearid: yearid.toString(),
    dhsai: dhsai.toString(),
    dmai: dmai.toString(),
    totalai: totalai.toString(),
    redycnt: redycnt.toString(),
    uqccnt: uqccnt.toString(),
    pipelinecnt: pipelinecnt.toString(),
    rccnt: rccnt.toString(),
    whid: whid.toString()
  };

  return this.http.get<ItemDetailsPopup[]>(`https://dpdmis.in/CGMSCHO_API2/api/HO/getItemDetailsWithHOD`, { params });
}

//GetRaisedPicks
GetRaisedPicks(){
  return this.http.get<GetRaisedPicks[]>(`https://dpdmis.in/CGMSCHO_API2/api/Courier/GetRaisedPicks`)
}
GetPendingToPick(warehouseid:number){
  return this.http.get<GetPendingToPick[]>(`https://dpdmis.in/CGMSCHO_API2/api/Courier/GetPendingToPick?warehouseid=${warehouseid}`);
}

getUndroppedDocket(monthFlag:number){
return this.http.get<UndroppedDocket>(`https://dpdmis.in/CGMSCHO_API2/api/Courier/getUndroppedDocket?monthFlag=${monthFlag}`);
}
getPendingToDrop(warehouseid:number){
  return this.http.get<PendingToDrop>(`https://dpdmis.in/CGMSCHO_API2/api/Courier/GetPendingToDrop?warehouseid=${warehouseid}`);
  }

//NOCApprovedSummary
getNOCApprovedSummary(){
  return this.http.get<NOCApprovedSummary[]>(`https://dpdmis.in/CGMSCHO_API2/api/NOC/CGMSCNOCApprovedSummary`)
}
CGMSCNOCPendingSummary(){
  return this.http.get<CGMSCNOCPendingSummary[]>(`https://dpdmis.in/CGMSCHO_API2/api/NOC/CGMSCNOCPendingSummary`)
}
CGMSCNOCPendingDetails(nocid:number){
  return this.http.get<CGMSCNOCPendingDetails[]>(`https://dpdmis.in/CGMSCHO_API2/api/NOC/CGMSCNOCPendingDetails?nocid=${nocid}`)
}

getNOCApprovedDetails(facilityid:number){
  return this.http.get(`https://dpdmis.in/CGMSCHO_API2/api/NOC/CGMSCNOCApprovedDetails?facilityid=${facilityid}`);
}
getNOCApprovedDetailsYN(facilityid:number,YN:any){
  return this.http.get(`https://dpdmis.in/CGMSCHO_API2/api/NOC/CGMSCNOCApprovedDetails?facilityid=${facilityid}&YN=${YN}`);
}
getInitiatedNotIssueSummary(dcflag:any,mcid:any){
  return this.http.get<InitiatedNotIssueSummary>(`https://dpdmis.in/CGMSCHO_API2/api/IWH/InitiatedNotIssueSummary?dcflag=${dcflag}&mcid=${mcid}`);
}
getIInitiatedNotIssueDetaqils(whid: number, stkout: number, dcflag: string, mcid: number){
  
  return this.http.get<InitiatedNotIssueDetaqils>(`https://dpdmis.in/CGMSCHO_API2/api/IWH/InitiatedNotIssueDetaqils?whid=${whid}&stkout=${stkout}&dcflag=${dcflag}&mcid=${mcid}`);
}
getIWHPiplineSummary(dcflag:any,mcid:any){
  return this.http.get<IWHPiplineSummary>(`https://dpdmis.in/CGMSCHO_API2/api/IWH/IWHPiplineSummary?dcflag=${dcflag}&mcid=${mcid}`);
}
getIWHPiplineDetails(towhid: number, stkout: number, dcflag: string, mcid: number){
  return this.http.get<IWHPiplineDetails>(`https://dpdmis.in/CGMSCHO_API2/api/IWH/IWHPiplineDetails?towhid=${towhid}&stkout=${stkout}&dcflag=${dcflag}&mcid=${mcid}`);
}


getLabIssuePendingSummary(mcid: number){
  return this.http.get<LabIssuePendingSummary[]>(`https://dpdmis.in/CGMSCHO_API2/api/QC/LabIssuePendingSummary?mcid=${mcid}`);
}

getLabIssuePendingDetails(mcid: number,delaypara1: any): Observable<any>{
  
  return this.http.get<LabIssuePendingDetails[]>(`https://dpdmis.in/CGMSCHO_API2/api/QC/LabIssuePendingDetails?mcid=${mcid}&delaypara1=${delaypara1}`);
}
getHODYearWiseIssuanceSummary(mcatid:any,hodid:any){
  return this.http.get<HODYearWiseIssuanceSummary>(`https://dpdmis.in/CGMSCHO_API2/api/HO/HODYearWiseIssuanceSummary?mcatid=${mcatid}&hodid=${hodid}`);
}
getHODYearWiseIssuance(yearid:any,mcatid:any,hodid:any,itemid:any,disid:any){
  return this.http.get<HODYearWiseIssuance[]>(`https://dpdmis.in/CGMSCHO_API2/api/HO/HODYearWiseIssuance?yearid=${yearid}&mcatid=${mcatid}&hodid=${hodid}&itemid=${itemid}&disid=${disid}`);
}
getnTransitHOtoLab(mcid:any,instorPickPending:any){
  return this.http.get<InTransitHOtoLab[]>(`https://dpdmis.in/CGMSCHO_API2/api/QC/InTransitHOtoLab?instorPickPending=${instorPickPending}&mcid=${mcid}`);
}
getInTransitHOtoLabDetails(instorPickPending:any,mcid:any,delaypara1:any,isdrop:any,labid:any){
return this.http.get<InTransitHOtoLab[]>(`https://dpdmis.in/CGMSCHO_API2/api/QC/InTransitHOtoLabDetails?instorPickPending=${instorPickPending}&mcid=${mcid}&delaypara1=${delaypara1}&isdrop=${isdrop}&labid=${labid}`);
}
getVehicleInfoReport(IsStopped:any,isWarehouseVhicle:any,fromDate:any,toDate:any){
return this.http.get<VehicleInfo[]>(`https://dpdmis.in/CGMSCHO_API2/api/ANPR/VhicleInfo?IsStopped=${IsStopped}&isWarehouseVhicle=${isWarehouseVhicle}&fromDate=${fromDate}&toDate=${toDate}`);
}

getPipelineDDLTransit(mcid:any,whid:any,userid:any){
return this.http.get<PipelineDDLTransit[]>(`https://dpdmis.in/CGMSCHO_API2/api/HO/getPipelineDDLTransit?mcid=${mcid}&whid=${whid}&userid=${userid}`);
}

getMasRecRemarks(whid:any,whsup:any){
return this.http.get<MasRecRemarks[]>(`https://dpdmis.in/CGMSCHO_API2/api/Master/MasRecRemarks?whid=${whid}&whsup=${whsup}`);
}

getPipelineDetailsGrid(ponoid: any, itemid: number, mcid: number, whid: any, userid: any): Observable<any> {
  // Construct the query parameters
  const params = new HttpParams()
    .set('ponoid', ponoid.toString())
    .set('itemid', itemid.toString())
    .set('mcid', mcid.toString())
    .set('whid', whid.toString())
    .set('userid', userid.toString());

  // Make the HTTP GET request
  return this.http.get<PipelineDetailsGrid[]>(`https://dpdmis.in/CGMSCHO_API2/api/HO/getPipelineDetails`, { params });
}

GetWarehouseInfo(whid:any){
  return this.http.get(`https://dpdmis.in/CGMSCHO_API2/api/Warehouse/GetWarehouseInfo?whid=${whid}`)
}

getVehicleEntriesExits(whid:any,previousNDays:any,tranId:any,plateNo:any){
  return this.http.get<GetVehicleEntriesExits[]>(`https://dpdmis.in/CGMSCHO_API2/api/Warehouse/GetVehicleEntriesExits?whid=${whid}&previousNDays=${previousNDays}&tranId=${tranId}&plateNo=${plateNo}`)
}

insertTblRecvProgress_WithVhicle(remid:any,remarks:any,ponoid:any,whid:any,tranId:any,plateNo:any){
  
  return this.http.post(`https://dpdmis.in/CGMSCHO_API2/api/HO/insertTblRecvProgress_WithVhicle?remid=${remid}&remarks=${remarks}&ponoid=${ponoid}&whid=${whid}&tranId=${tranId}&plateNo=${plateNo}`,{}, {responseType: 'text'})

}

getEdlNonEdlIssuePercentSummary(yearid:any){
  return this.http.get<EdlNonEdlIssuePercentSummary[]>(`https://dpdmis.in/CGMSCHO_API2/api/HOD/EdlNonEdlIssuePercentSummary?yearid=${yearid}`);

}

getIssuePerWisePerClick(yearid:any,orderdp:any){
  
  return this.http.get<IssuePerWisePerClick[]>(`https://dpdmis.in/CGMSCHO_API2/api/HOD/IssuePerWisePerClick?yearid=${yearid}&orderdp=${orderdp}`);

}
getIssuedPerWise(yearid:any){
  return this.http.get<IssuedPerWise[]>(`https://dpdmis.in/CGMSCHO_API2/api/HOD/IssuedPerWise?yearid=${yearid}`);

}
getDistrictWiseStock(mcid:any){
  return this.http.get<DistrictWiseStock[]>(`https://dpdmis.in/CGMSCHO_API2/api/District/DistrictWiseStock?mcid=${mcid}`);

}
getMasDistrict(allDist:any,whid:any,distid:any,userid:any,coll_cmho:any){
  return this.http.get<MasDistrict[]>(`https://dpdmis.in/CGMSCHO_API2/api/Master/MasDistrict?allDist=${allDist}&whid=${whid}&distid=${distid}&userid=${userid}&coll_cmho=${coll_cmho}`);

}

getDdlItemWiseInHandQty(distId:any){
  return this.http.get<DdlItemWiseInHandQty[]>(`https://dpdmis.in/CGMSCHO_API2/api/District/DdlItemWiseInHandQty?distId=${distId}`);

}
getDistFACwiseStockPostionNew(disid:any,coll_cmho:any,mcatid:any,EDLNedl:any,mitemid:any,userid:any){
  return this.http.get<DistFACwiseStockPostionNew[]>(`https://dpdmis.in/CGMSCHO_API2/api/District/DistFACwiseStockPostionNew?disid=${disid}&coll_cmho=${coll_cmho}&mcatid=${mcatid}&EDLNedl=${EDLNedl}&mitemid=${mitemid}&userid=${userid}`);

}

getSeasonDrugs(seasonname: string, groupid: number, itemtypeid: number, storeType: string): Observable<any> {
  const apiUrl = `https://dpdmis.in/CGMSCHO_API2/api/HOD/SeasonDrugs`;
  const params = new HttpParams()
    .set('seasonname', seasonname)
    .set('groupid', groupid.toString())
    .set('itemtypeid', itemtypeid.toString())
    .set('storeType', storeType);

  return this.http.get<SeasonDrugs[]>(apiUrl, { params });
}


getWarehouseInfo(distid:any): Observable<any> {
  return this.http.get<WarehouseInfo[]>(`https://dpdmis.in/CGMSCHO_API2/api/HOD/WarehouseInfo?distid=${distid}`);
}


getFacCoverage(distid:any): Observable<any> {
  return this.http.get<FacCoverage[]>(`https://dpdmis.in/CGMSCHO_API2/api/HOD/FacCoverage?distid=${distid}`);
}

getStockSummaryBalanceIndent(yearid:any,mcid:any): Observable<any> {
  return this.http.get<StockSummaryBalanceIndent[]>(`https://dpdmis.in/CGMSCHO_API2/api/HOD/StockSummaryBalanceIndent?yearid=${yearid}&mcid=${mcid}`);
}

getStockSummaryBalanceIndentDetails(yearid:any,mcid:any,orderid:any): Observable<any> {
  return this.http.get<StockSummaryBalanceIndentDetails[]>(`https://dpdmis.in/CGMSCHO_API2/api/HOD/StockSummaryBalanceIndentDetails?yearid=${yearid}&mcid=${mcid}&orderid=${orderid}`);
}
getNearExpRCDetails(mcid:any,mmpara:any): Observable<any> {
  return this.http.get<NearExpRCDetails[]>(`https://dpdmis.in/CGMSCHO_API2/api/TimeTaken/NearExpRCDetails?mcid=${mcid}&mmpara=${mmpara}`);
}

getPOSuppyTimeTakenYear(mcid:any,duration:any,supplierid:any): Observable<any> {
  
  return this.http.get<POSuppyTimeTakenYear[]>(`https://dpdmis.in/CGMSCHO_API2/api/TimeTaken/POSuppyTimeTakenYear?mcid=${mcid}&duration=${duration}&supplierid=${supplierid}`);
}

SupplyDuration(): Observable<any> {
  return this.http.get<SupplyDuration[]>(`https://dpdmis.in/CGMSCHO_API2/api/TimeTaken/SupplyDuration`);
}


getPaidTimeTaken(mcid:any,HODID:any,QCRequired:any): Observable<any> {
  
  return this.http.get<PaidTimeTaken[]>(`https://dpdmis.in/CGMSCHO_API2/api/TimeTaken/PaidTimeTaken?mcid=${mcid}&HODID=${HODID}&QCRequired=${QCRequired}`);
}

getQCTimeTakenYearwise(mcid:any): Observable<any> {
  
  return this.http.get<QCTimeTakenYearwise[]>(`https://dpdmis.in/CGMSCHO_API2/api/TimeTaken/QCTimeTakenYearwise?mcid=${mcid}`);
}
getQCLabYearAvgTime(yrid:any): Observable<any> {
  
  return this.http.get<QCLabYearAvgTime[]>(`https://dpdmis.in/CGMSCHO_API2/api/TimeTaken/QCLabYearAvgTime?yrid=${yrid}`);
}
getStockoutSummary(yrid:any,isedl:any,mcid:any): Observable<any> {
  
  return this.http.get<StockoutSummary[]>(`https://dpdmis.in/CGMSCHO_API2/api/TimeTaken/StockoutSummary?yrid=${yrid}&isedl=${isedl}&mcid=${mcid}`);
}

getDistDrugCount(districtId:any,mcid:any,hodid:any): Observable<any> {
  
  return this.http.get<DistDrugCount[]>(`https://dpdmis.in/CGMSCHO_API2/api/District/DistDrugCount?districtId=${districtId}&mcid=${mcid}&hodid=${hodid}`);
}
WHDrugCount(districtId:any,mcid:any,whid:any): Observable<any> {
  
  return this.http.get<WHDrugCount[]>(`https://dpdmis.in/CGMSCHO_API2/api/District/WHDrugCount?districtId=${districtId}&mcid=${mcid}&whid=${whid}`);
}

HODPOYear_AgAI(mcatid:any,hodid:any,Isall:any,IsagainstAI:any): Observable<any> {
  
  return this.http.get<HODPOYear_AgAI[]>(`https://dpdmis.in/CGMSCHO_API2/api/HO/HODPOYear_AgAI?mcatid=${mcatid}&hodid=${hodid}&Isall=${Isall}&IsagainstAI=${IsagainstAI}`);
}

DirectorateAIDetails(yearid:any,mcid:any,hodid:any,groupid:any,itemtypeid:any): Observable<any> {
  
  return this.http.get<DirectorateAIDetails[]>(`https://dpdmis.in/CGMSCHO_API2/api/HOD/DirectorateAIDetails?yearid=${yearid}&mcid=${mcid}&hodid=${hodid}&groupid=${groupid}&itemtypeid=${itemtypeid}`);
}

GroupWiseAI_PODetails(yearid:any,mcid:any,hodid:any): Observable<any> {
  
  return this.http.get<GroupWiseAI_PODetails[]>(`https://dpdmis.in/CGMSCHO_API2/api/HOD/GroupWiseAI_PODetails?yearid=${yearid}&mcid=${mcid}&hodid=${hodid}`);
}



Diswise_Issuance(yearid:any,mcid:any,hodid:any): Observable<any> {
  
  return this.http.get<Diswise_Issuance[]>(`https://dpdmis.in/CGMSCHO_API2/api/HOD/Diswise_Issuance?yearid=${yearid}&mcid=${mcid}&hodid=${hodid}`);

}

Monthwise_Issuance(yearid:any,mcid:any,hodid:any): Observable<any> {
  
  return this.http.get<Monthwise_Issuance[]>(`https://dpdmis.in/CGMSCHO_API2/api/HOD/Monthwise_Issuance?yearid=${yearid}&mcid=${mcid}&hodid=${hodid}`);

}


getDropAppWarehousePerformance(fromdt:any,todate:any): Observable<any> {
  // 01-Nov-2024
  return this.http.get<DropAppWarehousePerformance[]>(`https://dpdmis.in/CGMSCHO_API2/api/TimeTaken/DropAppWarehousePerformance?fromdt=${fromdt}&todate=${todate}`);

}

DelvieryDash(days:any): Observable<any> {
  return this.http.get<DelvieryDash[]>(`https://dpdmis.in/CGMSCHO_API2/api/TimeTaken/DelvieryDash?days=${days}`);

}

masddlUser(Usertype:any): Observable<any> {
  
  return this.http.get<masddlUser[]>(`https://dpdmis.in/CGMSCHO_API2/api/Master/masddlUser?Usertype=${Usertype}`);

}

allwh(allwh:any): Observable<any> {
  
  return this.http.get<MasWH[]>(`https://dpdmis.in/CGMSCHO_API2/api/Master/MasWH?allwh=${allwh}`);

}
VerifyOTPLogin(otp:any,userid:any){
    
  return this.http.get(`https://dpdmis.in/CGMSCHO_API2/api/Login/VerifyOTPLogin?otp=${otp}&userid=${userid}`,{ responseType: 'text' });
}
getOTPSaved(userid:any){
  
  return this.http.post(`https://dpdmis.in/CGMSCHO_API2/api/Login/getOTPSaved?userid=${userid}`,{ responseType: 'text' });
}

getDashLoginDDL(){
  
  return this.http.get<DashLoginDDL[]>(`https://cgmsc.gov.in/HIMIS_APIN/api/Work/getDashLoginDDL`);
}

getDisYrGrowth(districtId:any,mcid:any){
  
  return this.http.get<DisYrGrowth[]>(`https://dpdmis.in/CGMSCHO_API2/api/District/DisYrGrowth?districtId=${districtId}&mcid=${mcid}`);
}

getDistCGMSCSupplyDHS(districtId:any,mcid:any){
  
  return this.http.get<DistCGMSCSupplyDHS[]>(`https://dpdmis.in/CGMSCHO_API2/api/District/DistCGMSCSupplyDHS?districtId=${districtId}&mcid=${mcid}`);
}

getDMEissueItems(districtId:any,mcid:any){
  
  return this.http.get(`https://dpdmis.in/CGMSCHO_API2/api/District/DMEissueItems?districtId=${districtId}&mcid=${mcid}`);
}

getAyushIssueItems(districtId:any,mcid:any){
  
  return this.http.get(`https://dpdmis.in/CGMSCHO_API2/api/District/AyushIssueItems?districtId=${districtId}&mcid=${mcid}`);
}

getDHSissueItems(districtId:any,mcid:any){
  
  return this.http.get(`https://dpdmis.in/CGMSCHO_API2/api/District/DHSissueItems?districtId=${districtId}&mcid=${mcid}`);
}



// Infrastructure


// #region 

DashProgressCount(divisionId: any, mainSchemeId: number, distId: number) {
  return this.http.get<DashProgressCount[]>(
    `https://cgmsc.gov.in/HIMIS_APIN/api/Progress/DashProgressCount?divisionid=${divisionId}&mainSchemeId=${mainSchemeId}&distid=${distId}`
  );
}
GetDistrict(isall: any, divisionId: number) {
  return this.http.get<GetDistrict[]>(
    `https://cgmsc.gov.in/HIMIS_APIN/api/Progress/GetDistrict?isall=${isall}&divisionId=${divisionId}`
  );
}
DashProgressDistCount(divisionId: any, mainSchemeId: any,dashID:any) {
  return this.http.get<DashProgressDistCount[]>(
    `https://cgmsc.gov.in/HIMIS_APIN/api/Progress/DashProgressDistCount?divisionId=${divisionId}&mainSchemeId=${mainSchemeId}&dashID=${dashID}`

  );
}
DMEProgressSummary(divisionId: any, mainSchemeId: any,distid:any,dashID:any) {
  // https://cgmsc.gov.in/HIMIS_APIN/api/Work/DMEProgressSummary?divisionId=0&mainSchemeId=0&distid=0&dashID=0
  return this.http.get<DMEProgressSummary[]>
  (`${this.apiUrl}/Work/DMEProgressSummary?divisionId=${divisionId}&mainSchemeId=${mainSchemeId}&distid=${distid}&dashID=${dashID}`);

}
GetDistrictNameDME(divisionid: any, districtid:any) {
  // https://cgmsc.gov.in/HIMIS_APIN/api/Work/DistrictNameDME?divisionid=0&districtid=0
  return this.http.get<DistrictNameDME[]>
  (`${this.apiUrl}/Work/DistrictNameDME?divisionId=${divisionid}&districtid=${districtid}`);

}


WorkFill(searchtext: any, workid: any,divisionId:any,distid:any,mainSchemeId:any): Observable<WorkFill[]> {
  return this.http.get<WorkFill[]>(`${this.apiUrl}/Work/WorkFill?searchtext=${searchtext}&workid=${workid}&divisionId=${divisionId}&distid=${distid}&mainSchemeId=${mainSchemeId}`);
  // https://cgmsc.gov.in/HIMIS_APIN/api/Work/WorkFill?searchtext=0&workid=0&divisionId=0&distid=0&mainSchemeId=0
}
GetWorkDetails(workid: any): Observable<WorkDetails[]> {
  // https://cgmsc.gov.in/HIMIS_APIN/api/Work/WorkFill?searchtext=0&workid=0&divisionId=0&distid=0&mainSchemeId=0
  return this.http.get<WorkDetails[]>(`${this.apiUrl}/Work/GetWorkInfo?workid=${workid}`);
}
GetProjectTimeline(workid: any): Observable<ProjectTimeline[]> {
  return this.http.get<ProjectTimeline[]>(`${this.apiUrl}/Work/GetProjectTimeline?workid=${workid}`);
  // https://cgmsc.gov.in/HIMIS_APIN/api/Work/GetProjectTimeline?workid=W4100398
}



getMainScheme(isall: any): Observable<MainScheme[]> {
  return this.http.get<MainScheme[]>(`${this.apiUrl}/Progress/getMainScheme?isall=${isall}`);
}
GetProgressCount(did:any,divisionId:any,distid:any,mainSchemeId:any){
  return this.http.get<DivisionPrograss[]>(`${this.apiUrl}/Work/getProgressCount?did=${did}&divisionId=${divisionId}&distid=${distid}&mainSchemeId=${mainSchemeId}`);

}
GetProgressDetailsLatLong(did:any,divisionId:any,distid:any,mainSchemeId:any,workid:any,dayPara:any,TotMobile:any){
  // https://cgmsc.gov.in/HIMIS_APIN/api/Work/getProgressDetailsLatLong?did=5001&divisionId=D1017&distid=0&mainSchemeId=0&workid=0&dayPara=0&TotMobile=0
  return this.http.get<ProgressDetailsLatLong[]>(`${this.apiUrl}/Work/getProgressDetailsLatLong?did=${did}&divisionId=${divisionId}&distid=${distid}&mainSchemeId=${mainSchemeId}&workid=${workid}&dayPara=${dayPara}&TotMobile=${TotMobile}`);

}
  //#region Work pending 
  WOPendingTotal(RPType: any, divisionId: any, districtid: any) {
    return this.http.get<WOpendingTotal[]>(`${this.apiUrl}/WorkOrder/WOPendingTotal?RPType=${RPType}&divisionId=${divisionId}&districtid=${districtid}`);

    // `https://cgmsc.gov.in/HIMIS_APIN/api/WorkOrder/WOPendingTotal?RPType=Scheme&divisionid=0&districtid=0&fromdt=0&todt=0`
  }
  GetWorkOrderPendingDetailsNew(divisionId: any, mainSchemeId: any, distid: any, contractid: any) {
    return this.http.get<WorkOrderPendingDetailsNew[]>(`${this.apiUrl}/WorkOrder/getWorkOrderPendingDetailsNew?divisionId=${divisionId}&mainSchemeId=${mainSchemeId}&distid=${distid}&contractid=${contractid}`);

  }

  GETWorkOrderGenerated(RPType: any,divisionId: any,districtid: any,fromdt: any,todt: any){
    return this.http.get<WorkOrderIssued[]>(`${this.apiUrl}/WorkOrder/WorkOrderGenerated?RPType=${RPType}&divisionid=${divisionId}&districtid=${districtid}&fromdt=${fromdt}&todt=${todt}`);
    // https://cgmsc.gov.in/HIMIS_APIN/api/WorkOrder/WorkOrderGenerated?RPType=Total&divisionid=0&districtid=0&fromdt=01-01-2024&todt=0

  }
  //#endregion
  //#region Handover
  // GETHandoverAbstractDateBY(Total:any, dashid:any,divisionId:any,districtid:any,SWId:any,fromdt:any,todt:any){
  //   return this.http.get<HandoverAbstractDateBY[]>(`${this.apiUrl}/Handover/HandoverAbstract?RPType=${Total}&dashid=${dashid}&divisionid=${divisionId}&districtid=${districtid}&SWId=${SWId}&fromdt=${fromdt}&todt=${todt}`);
  //   // https://cgmsc.gov.in/HIMIS_APIN/api/Handover/HandoverAbstract?RPType=Total&dashid=4001&divisionid=0&districtid=0&SWId=0&fromdt=01-04-2023&todt=01-05-2023
  // }
  HandoverAbstract(RPType: any, dashid: any, divisionId: any, districtid: any, SWId: any, fromdt: any, todt: any) {
    return this.http.get<HandoverAbstract[]>(`${this.apiUrl}/Handover/HandoverAbstract?RPType=${RPType}&dashid=${dashid}&divisionid=${divisionId}&districtid=${districtid}&SWId=${SWId}&fromdt=${fromdt}&todt=${todt}`);
    // https://cgmsc.gov.in/HIMIS_APIN/api/Handover/HandoverAbstract?RPType=Total&dashid=4001&divisionid=0&districtid=0&SWId=0&fromdt=01-04-2023&todt=0
  }
  GetHandoverDetails(dashid: any, divisionId: any, mainSchemeId: any, distid: any, SWId: any) {
    return this.http.get<GetHandoverDetails[]>(`${this.apiUrl}/Handover/getHandoverDetails?dashid=${dashid}&divisionId=${divisionId}&mainSchemeId=${mainSchemeId}&distid=${distid}&SWId=${SWId}`);
    //https://cgmsc.gov.in/HIMIS_APIN/api/Handover/getHandoverDetails?dashid=4001&divisionId=D1004&mainSchemeId=145&distid=0&SWId=0
    //  https://cgmsc.gov.in/HIMIS_APIN/api/Handover/getHandoverDetails?dashid=4001&divisionId=D1004&mainSchemeId=145&distid=0&SWId=0
  }
  //#endregion

  //#region District Eng Alloted Works
  SubeDistrictEngAllotedWorks(engtype: any, divisionId: any, distid: any) {
    return this.http.get<sbuDistrictEngAllotedWorks[]>(`${this.apiUrl}/Work/DistrictEngAllotedWorks?engtype=${engtype}&divisionid=${divisionId}&distid=${distid}`);
    // https://cgmsc.gov.in/HIMIS_APIN/api/Work/DistrictEngAllotedWorks?engtype=Sube&divisionid=D1004&distid=0
  }
  AEDistrictEngAllotedWorks(engtype: any, divisionId: any, distid: any) {
    return this.http.get<AEDistrictEngAllotedWorks[]>(`${this.apiUrl}/Work/DistrictEngAllotedWorks?engtype=${engtype}&divisionid=${divisionId}&distid=${distid}`);
    // https://cgmsc.gov.in/HIMIS_APIN/api/Work/DistrictEngAllotedWorks?engtype=AE&divisionid=D1004&distid=0
  }
  SbuEngAllotedWorks(engtype: any, divisionId: any, distid: any) {
    return this.http.get<SbuEngAllotedWorks[]>(`${this.apiUrl}/Work/EngAllotedWorks?engtype=${engtype}&divisionid=${divisionId}&distid=${distid}`);
    // https://cgmsc.gov.in/HIMIS_APIN/api/Work/EngAllotedWorks?engtype=Sbu%20eng&divisionid=D1004&distid=0
  }
  AEEngAllotedWorks(engtype: any, divisionId: any, distid: any) {
    return this.http.get<AEEngAllotedWorks[]>(`${this.apiUrl}/Work/EngAllotedWorks?engtype=${engtype}&divisionid=${divisionId}&distid=${distid}`);
    // https://cgmsc.gov.in/HIMIS_APIN/api/Work/EngAllotedWorks?engtype=AE%20eng&divisionid=D1004&distid=0
  }
  GetWorkDetailsWithEng(dahid: any, divisionId: any, mainSchemeId: any, distid: any, engtype: any, empcode: any) {

    return this.http.get<WorkDetailsWithEng[]>(`${this.apiUrl}/Work/getWorkDetailsWithEng?dahid=${dahid}&divisionid=${divisionId}&mainSchemeId=${mainSchemeId}&distid=${distid}&engtype=${engtype}&empcode=${empcode}`);
    // https://cgmsc.gov.in/HIMIS_APIN/api/Work/getWorkDetailsWithEng?dahid=0&divisionId=D1004&mainSchemeId=0&distid=0&engtype=SubE&empcode=Empcode0000157
  }
  // #endregion
  //#region  LandIssue
  GetLIPendingTotal(engtype: any, divisionId: any, districtid: any) {
    return this.http.get<LIPendingTotal[]>(`${this.apiUrl}/LandIssue/LIPendingTotal?RPType=${engtype}&divisionid=${divisionId}&districtid=${districtid}`);
    // https://cgmsc.gov.in/HIMIS_APIN/api/LandIssue/LIPendingTotal?RPType=Total&divisionid=0&districtid=0
  }
  GetLandIssueDetails(divisionId: any, mainSchemeId: any, distid: any) {
    return this.http.get<LandIssueDetails[]>(`${this.apiUrl}/LandIssue/getLandIssueDetails?divisionId=${divisionId}&mainSchemeId=${mainSchemeId}&distid=${distid}`);
    //https://cgmsc.gov.in/HIMIS_APIN/api/LandIssue/getLandIssueDetails?divisionId=D1004&mainSchemeId=0&distid=0

  }
  //#endregion
  //#region Technical Sanction
  GetTSDetail(engtype: any, divisionid: any, districtid: any, mainschemeid: any) {
    return this.http.get<TSDetail[]>
      // (`${this.apiUrl}/TSDetail/TSDetails?RPType=${engtype}&divisionId=${divisionid}&mainSchemeId=${mainschemeid}&distid=${districtid}`);
      (`${this.apiUrl}/TSDetail/TSPending?RPType=${engtype}&divisionid=${divisionid}&districtid=${districtid}&mainschemeid=${mainschemeid}`);
    // https://cgmsc.gov.in/HIMIS_APIN/api/TSDetail/TSPending?RPType=Total&divisionid=0&districtid=0&mainschemeid=0
    // https://cgmsc.gov.in/HIMIS_APIN/api/TSDetail/TSDetails?RPType=District&divisionId=0&mainSchemeId=0&distid=0
  }

  GetTSDetailall(divisionId: any, mainSchemeId: any, distid: any) {
    return this.http.get<TSDetailallData[]>(`${this.apiUrl}/TSDetail/TSDetails?divisionId=${divisionId}&mainSchemeId=${mainSchemeId}&distid=${distid}`);
    //https://cgmsc.gov.in/HIMIS_APIN/api/TSDetail/getTSDetails?divisionId=D1004&mainSchemeId=0&distid=0

  }

  //#endregion

  //#region GET IMAGE
  GetImageBinary(sr: number, imgName: string): Observable<any> {
    const encodedImgName = encodeURIComponent(imgName); // Encode the image name
    const url = `https://cgmsc.gov.in/HIMIS_APIN/api/WorkPhysicalProgress/GetImageBinary?sr=${sr}&imgName=${encodedImgName}`;
    return this.http.get(url, { responseType: 'text' }); // Use 'text' if the API returns a base64 string

  }
//#endregion







getDistDHSStock(disid:any,coll_cmho:any,mcatid:any,userid:any){
  
  return this.http.get<DistDHSStock[]>(`https://dpdmis.in/CGMSCHO_API2/api/District/DistDHSStock?disid=${disid}&coll_cmho=${coll_cmho}&mcatid=${mcatid}&userid=${userid}`);
}

getGetVehicleNo(whid:any){
  return this.http.get<GetVehicleNo[]>(`https://dpdmis.in/CGMSCHO_API2/api/Warehouse/GetVehicleNoByWh?whid=${whid}`);
}

getTravelVouchers(vid:any,indentId:any){
  return this.http.get<TravelVouchers[]>(`https://dpdmis.in/CGMSCHO_API2/api/Warehouse/TravelVouchers?vid=${vid}&indentId=${indentId}`);
}

getGetLatLong(indentId:any){
  return this.http.get<GetLatLong[]>(`https://dpdmis.in/CGMSCHO_API2/api/Warehouse/GetLatLong?indentId=${indentId}`);
}

updateTBIndentTravaleWH(travelId: any, latitude: any, longitude: any, dt1: any) {
  return this.http.put(
    `https://dpdmis.in/CGMSCHO_API2/api/Warehouse/updateTBIndentTravaleWH?travelId=${travelId}&latitude=${latitude}&longitude=${longitude}&dt1=${dt1}`,
    null, // Pass `null` for the body since it's a PUT request without payload
    { responseType: 'text' } // Specify the response type as 'text'
  );
}











}
