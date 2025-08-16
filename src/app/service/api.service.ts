import { HttpClient, HttpParams } from '@angular/common/http';
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
import { DPDMISSupemdSummary } from '../Model/DPDMISSupemdSummary';
import { EmdStatusDetail } from '../Model/EmdStatusDetail';
import { DPDMISEMDTenderwisePending } from '../Model/DPDMISEMDTenderwisePending';
import { DPDMISEMDDashboard } from '../Model/DPDMISEMDDashboard';
import { IndentPendingWH } from '../Model/IndentPendingWH';
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
import { nsqDrugDetails, QCTimeTakenYearwise } from '../Model/QCTimeTakenYearwise';
import { QCLabYearAvgTime } from '../Model/QCLabYearAvgTime';
import { StockoutSummary } from '../Model/StockoutSummary';
import { HODYearWiseIssuance, MontlyItemDemography, YearWiseIssueReport } from '../Model/HODYearWiseIssuance';
import { DistDrugCount } from '../Model/DistDrugCount';
import { WHDrugCount } from '../Model/WHDrugCount';
import { HODPOYear_AgAI } from '../Model/HODPOYear_AgAI';
import { DirectorateAIDetails } from '../Model/DirectorateAIDetails';
import { GroupWiseAI_PODetails } from '../Model/GroupWiseAI_PODetails';
import { Monthwise_Issuance } from '../Model/GroupItemtypeRCStock';
import { Diswise_Issuance } from '../Model/Diswise_Issuance';
import { DropAppWarehousePerformance } from '../Model/DropAppWarehousePerformance';
import { DelvieryDash } from '../Model/DelvieryDash';
import { masddlUser, MasSupplierPipeline } from '../Model/masddlUser';
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
  WorkDetailsWithEng, DistrictNameDME, ProjectTimeline, TSDetail, TSDetailallData, WorkOrderIssued,
  WorkGenDetails, LiveTenderdata, TenderDetails, TenderEvaluation, TenderEvaluationDetails, PaidSummary,
  UnPaidSummary, PriceEvaluationDetails, PriceEvaluation, TenderStatus, PaidDetails, TobeTenderDetailsAS,
  TobeTenderRejection, TobeTenderAppliedZonalPermission, UnPaidDetails, TobeTenderDetailsCancelled,
  ASPendingDetails, DivisionWiseASPendingDetails, ASCompletedDetails, ASEnteredDetails, ASFile,
  WORunningHandDetails,
  DetailProgressTinP,
  LandIssue_RetToDeptDetatails,
  RunningWork,
  RunningWorkDelay,
  WorkBillStatus,
  ProjectTimelineNew,
  RunningDelayWorksDetails,TotalWorksAbstract
} from '../Model/DashProgressCount';

import { DistDHSStock } from '../Model/DistDHSStock';
import { GetVehicleNo } from '../Model/GetVehicleNo';
import { TravelVouchers } from '../Model/TravelVouchers';
import { GetLatLong } from '../Model/Warehouse';
import { ClgHos_IssueWihtoutAI, CollegeHospital_AIvsIssue, DeliveryInMonthconst, DMEAIvsIssue, DMEIssueWihtoutAI, HoldItemDetails, IndentcntHome, Last7DaysIssue, Last7DaysReceipt, NearExp, POCountCFY, QCFinalResultPending, QCHold_NSQDash, QCLabPendingTimeline, QCPendingAreaDetail, QCPendingHomeDash, QCPendingItems, QCPendingMonthwiseRec, QCPendingMonthwiseRecDetails, QCPendingParticularArea, QCPendingPlace, QCResultPendingLabWise, QCTimeTakenYear, StockoutPer } from '../Model/DashCards';
import { MasIndentitems } from '../Model/MasIndentitems';
import { MasfacilityInfo } from '../Model/MasfacilityInfo';
import { Masitems } from '../Model/Masitems';
import { getItemDetailsWithHOD } from '../Model/ItemDetailsWithHod';
import { DHSDMEStock } from '../Model/DHSDmeStock';
import { facwiseSTockIssuanceCoonsumptionm } from '../Model/facwiseSTockIssuanceCoonsumptionm';
import { Fund_Libilities, FundReivedBudgetDetails, GetSanctionPrepDetails, GrossPaidDateWiseDetails, LibDetailsbasedOnYearID, PaidYearwise_Budget, Pipeline_Libilities, PODetailsAgainstIndentYr } from '../Model/FinanceDash';
import { AttendenceRecord, Designation, EmployeeDetail, GetLocation } from '../Model/Attendence';
import { HOTender, NoOfBidders, StatusDetail, StatusItemDetail, TenderStagesTotal, TotalRC1, TotalRC1Details, TotalTender } from '../Model/TenderStatus';
import { CoverStatus, CoverStatusDetail, CoverStatusTenderDetail, EqptobeTender, EqToBeTenderDetail, GetConsTenderStatusDetail, GetToBeTender, SchemeReceived, SchemeTenderStatus, TenderDetail, TenderInfraDetails, TenderInfraDetailsZonal, ToBeTenderBifurcation, ToBeTenderBifurcationDetail, TobetenderDetails, TotalTendersByStatus, ZonalTenderStatusDetail } from '../Model/Equipment';
import { AIvsIssuance, MasfacilityInfoUser, Year } from '../Model/masInfoUser';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://cgmsc.gov.in/HIMIS_APIN/api';
  private CGMSCHO_API2 = 'https://dpdmis.in/CGMSCHO_API2/api';
  private himis_apin = 'https://www.cgmsc.gov.in/himis_apin/api';

  // private CGMSCHO_API2 = 'https://dpdmis.in//CGMSCHO_API_TEST/api';

  // https://dpdmis.in//CGMSCHO_API_TEST/api
  private EMIS_API = 'https://cgmsc.gov.in/EMIS_API';


  constructor(private http: HttpClient) { }

  // retrieveAllDistricts(){
  //    
  //   return this.http.get<Districts[]>(`https://localhost:7288/api/District`)
  // }
  retrieveAllRC() {
    return this.http.get<Districts[]>(`${this.EMIS_API}/getAllRCReport`)
  }

  //  totalNoRc(){
  // 
  //   return this.http.get<TotalNoRc[]>(`https://cgmsc.gov.in/EMIS_API/getTotalNoRC`)
  //  }

  totalNoRc(): Observable<TotalNoRc> {
    return this.http.get<TotalNoRc>(`${this.EMIS_API}/getTotalNoRC`);
  }

  overAllComplaints() {
    return this.http.get<Complaints[]>(`${this.EMIS_API}/getAllComplaints`)
  }
  overAllComplaintsSolved(district: string) {

    return this.http.get<Complaints[]>(` ${this.EMIS_API}/getAllComplaintsSolved?district=${district}`)
  }
  overAllComplaintsSolvedorUnsolved(district: string) {

    // https://cgmsc.gov.in/EMIS_API/getTotalSolvedOrUnsolved?district=jashpur
    return this.http.get<Complaints[]>(`${this.EMIS_API}/getTotalSolvedOrUnsolved?district=${district}`)
  }

  districtWiseComplaints() {
    return this.http.get<DistrictWiseComplaints[]>(`${this.EMIS_API}/getDistrictWiseComplaints`)
  }
  getDispatchPendingSummary() {
    return this.http.get<dispatchPendingSummary[]>(`${this.EMIS_API}/api/DispatchPendingSummary/getDispatchPendingSummary`)

  }
  //emd status summary
  getEmdStatusSummary() {
    return this.http.get<DPDMISSupemdSummary[]>(`${this.CGMSCHO_API2}/EMD/DPDMISSupemdSummary`)
  }
  //emd status datails
  getEmdStatus() {
    return this.http.get<EmdStatusDetail[]>(`${this.CGMSCHO_API2}/EMD/DPDMISEMDDetails`)
  }
  getDPDMISEMDTenderwisePendin() {
    return this.http.get<DPDMISEMDTenderwisePending[]>(`${this.CGMSCHO_API2}/EMD/DPDMISEMDTenderwisePending`)

  }
  //  getemdDashboerd
  DPDMISEMDDashboardSummary() {
    return this.http.get<DPDMISEMDDashboard[]>(`${this.CGMSCHO_API2}/EMD/DPDMISEMDDashboard`)
  }

  getDispatchPending() {
    return this.http.get<dispatchPending[]>(`${this.EMIS_API}/api/DispatchPending/getDispatchPending`)
  }

  receiptPendingSummary() {
    return this.http.get<ReceiptPendingSummary[]>(`${this.EMIS_API}/api/ReceiptPending_summary/getReceiptPending_summary`)

  }
  receiptPending() {
    return this.http.get<ReceiptPending[]>(`${this.EMIS_API}/api/ReceiptPending/getReceiptPending`)
  }
  installationPendingSummary() {
    return this.http.get<ReceiptPendingSummary[]>(` ${this.EMIS_API}/api/InstallationPending_summary/getInstallationPending_summary`)
  }

  installationPendingDetails() {
    return this.http.get<ReceiptPending[]>(`${this.EMIS_API}/api/InstallationPending_summary/getInstallation_details`)
  }
  getDHSSummary() {
    return this.http.get<DhsSummary[]>(`${this.EMIS_API}/api/DHS/getDHS_summary`)
  }

  getDHSDetailsItemWise() {
    return this.http.get<DHSDetailsItemWise[]>(`${this.EMIS_API}/api/DHS/getDHS_detailsItemwise`)
  }
  getDHSSummaryDateRange(fromDate: string, toDate: string) {
    return this.http.get<DhsSummary[]>(`${this.EMIS_API}/api/DHS/getDHS_summary_yearWise?fromDate=${fromDate}&toDate=${toDate}`);
  }

  //whstock abstracts
  getWHStockData(mcatid: number, warehouseId: number): Observable<any> {

    const params = new HttpParams()
      .set('mcatid', mcatid.toString())
      .set('warehouseId', warehouseId.toString());

    return this.http.get<any>(`${this.CGMSCHO_API2}/HO/CGMSCStockValueData`, { params });
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

    return this.http.get<CGMSCStockDetails[]>(`${this.CGMSCHO_API2}/HO/CGMSCItemStock`, { params });
  }

  //indent pending at Warehouse  api
  getIndentPendingAtWHData(per: string = 'All', clause: number = 1): Observable<any> {

    return this.http.get<any>(`${this.CGMSCHO_API2}/Warehouse/IndentPending?per=${per}&clause=${clause}`);
  }
  getIndentPendingAtWHDetails(whid: number, clause: number, factype: number): Observable<any> {
    const params = new HttpParams()
      .set('whid', whid.toString())
      .set('clause', clause.toString())
      .set('factype', factype.toString());

    return this.http.get<IndentPendingWH>(`${this.CGMSCHO_API2}/Warehouse/IndentPendingDetails`, { params });
  }


  // Method for ReagIndentPending with mmid
  getReagIndentPending(mmid: any) {
    return this.http.get<ReagIndentPending[]>(`${this.CGMSCHO_API2}/Warehouse/ReagIndentPending?mmid=${mmid}`);
  }


  // Method for ReagIndentPendingEQ
  getReagIndentPendingEQ() {

    return this.http.get<ReagIndentPendingEQSummary[]>(`${this.CGMSCHO_API2}/Warehouse/ReagIndentPendingEQ`);
  }





  //this is for popuo WarehouseWiseStock
  getWarehouseWiseStock(mitemid: number, whid: number): Observable<any> {

    const params = new HttpParams()
      .set('mitemid', mitemid.toString())
      .set('whid', whid.toString());

    return this.http.get<WarehouseWiseStock>(`${this.CGMSCHO_API2}/HO/WarehouseWiseStock`, { params });

  }
  // NearExpReport
  getNearExpReport(mcid: number, nexppara: number): Observable<any> {

    const params = new HttpParams()
      .set('mcid', mcid.toString())
      .set('nexppara', nexppara.toString());

    return this.http.get<NearExpReport>(`${this.CGMSCHO_API2}/HO/NearExpReport`, { params });

  }
  NearExpReportbatch(mcid: number, nexppara: number, expmonth: string): Observable<any> {

    const params = new HttpParams()
      .set('mcid', mcid.toString())
      .set('nexppara', nexppara.toString())
      .set('expmonth', expmonth.toString());

    return this.http.get<NearExpReportbatch>(`${this.CGMSCHO_API2}/HO/NearExpReportbatch`, { params });

  }

  //reagIndentIssue

  getReagIndentIssueMMID() {
    return this.http.get<ReagIndentIssueMMID[]>(`${this.CGMSCHO_API2}/Warehouse/ReagIndentIssueMMID`);
  }

  getReagIndentIssueDetails(mmid: any) {

    return this.http.get<ReagIndentIssueDetails[]>(`${this.CGMSCHO_API2}/Warehouse/ReagIndentIssueDetails?mmid=${mmid}`)

  }

  //getPipelineDetails
  getPipelineDetails(ponoid: number, itemid: number, mcid: number, whid: number, userid: number): Observable<any> {


    return this.http.get<PipelineDetails[]>(`${this.CGMSCHO_API2}/HO/getPipelineDetails?ponoid=${ponoid}&itemid=${itemid}&mcid=${mcid}&whid=${whid}&userid=${userid}`);
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

    return this.http.get<ItemDetailsPopup[]>(`${this.CGMSCHO_API2}/HO/getItemDetailsWithHOD`, { params });
  }

  //GetRaisedPicks
  GetRaisedPicks() {
    return this.http.get<GetRaisedPicks[]>(`${this.CGMSCHO_API2}/Courier/GetRaisedPicks`)
  }
  GetPendingToPick(warehouseid: number) {
    return this.http.get<GetPendingToPick[]>(`${this.CGMSCHO_API2}/Courier/GetPendingToPick?warehouseid=${warehouseid}`);
  }

  getUndroppedDocket(monthFlag: number) {
    return this.http.get<UndroppedDocket>(`${this.CGMSCHO_API2}/Courier/getUndroppedDocket?monthFlag=${monthFlag}`);
  }
  getPendingToDrop(warehouseid: number) {
    return this.http.get<PendingToDrop>(`${this.CGMSCHO_API2}/Courier/GetPendingToDrop?warehouseid=${warehouseid}`);
  }

  //NOCApprovedSummary
  getNOCApprovedSummary() {
    return this.http.get<NOCApprovedSummary[]>(`${this.CGMSCHO_API2}/NOC/CGMSCNOCApprovedSummary`)
  }
  CGMSCNOCPendingSummary() {
    return this.http.get<CGMSCNOCPendingSummary[]>(`${this.CGMSCHO_API2}/NOC/CGMSCNOCPendingSummary`)
  }
  CGMSCNOCPendingDetails(nocid: number) {
    return this.http.get<CGMSCNOCPendingDetails[]>(`${this.CGMSCHO_API2}/NOC/CGMSCNOCPendingDetails?nocid=${nocid}`)
  }

  getNOCApprovedDetails(facilityid: number) {
    return this.http.get(`${this.CGMSCHO_API2}/NOC/CGMSCNOCApprovedDetails?facilityid=${facilityid}`);
  }
  getNOCApprovedDetailsYN(facilityid: number, YN: any) {
    return this.http.get(`${this.CGMSCHO_API2}/NOC/CGMSCNOCApprovedDetails?facilityid=${facilityid}&YN=${YN}`);
  }
  getInitiatedNotIssueSummary(dcflag: any, mcid: any) {
    return this.http.get<InitiatedNotIssueSummary>(`${this.CGMSCHO_API2}/IWH/InitiatedNotIssueSummary?dcflag=${dcflag}&mcid=${mcid}`);
  }
  getIInitiatedNotIssueDetaqils(whid: number, stkout: number, dcflag: string, mcid: number) {

    return this.http.get<InitiatedNotIssueDetaqils>(`${this.CGMSCHO_API2}/IWH/InitiatedNotIssueDetaqils?whid=${whid}&stkout=${stkout}&dcflag=${dcflag}&mcid=${mcid}`);
  }
  getIWHPiplineSummary(dcflag: any, mcid: any) {
    return this.http.get<IWHPiplineSummary>(`${this.CGMSCHO_API2}/IWH/IWHPiplineSummary?dcflag=${dcflag}&mcid=${mcid}`);
  }
  getIWHPiplineDetails(towhid: number, stkout: number, dcflag: string, mcid: number) {
    return this.http.get<IWHPiplineDetails>(`${this.CGMSCHO_API2}/IWH/IWHPiplineDetails?towhid=${towhid}&stkout=${stkout}&dcflag=${dcflag}&mcid=${mcid}`);
  }


  getLabIssuePendingSummary(mcid: number) {
    return this.http.get<LabIssuePendingSummary[]>(`${this.CGMSCHO_API2}/QC/LabIssuePendingSummary?mcid=${mcid}`);
  }

  getLabIssuePendingDetails(mcid: number, delaypara1: any): Observable<any> {

    return this.http.get<LabIssuePendingDetails[]>(`${this.CGMSCHO_API2}/QC/LabIssuePendingDetails?mcid=${mcid}&delaypara1=${delaypara1}`);
  }
  getHODYearWiseIssuanceSummary(mcatid: any, hodid: any) {
    
    return this.http.get<HODYearWiseIssuanceSummary>(`${this.CGMSCHO_API2}/HO/HODYearWiseIssuanceSummary?mcatid=${mcatid}&hodid=${hodid}`);
  }
  getHODYearWiseIssuance(yearid: any, mcatid: any, hodid: any, itemid: any, disid: any) {
    return this.http.get<HODYearWiseIssuance[]>(`${this.CGMSCHO_API2}/HO/HODYearWiseIssuance?yearid=${yearid}&mcatid=${mcatid}&hodid=${hodid}&itemid=${itemid}&disid=${disid}`);
  }
  getnTransitHOtoLab(mcid: any, instorPickPending: any) {
    return this.http.get<InTransitHOtoLab[]>(`${this.CGMSCHO_API2}/QC/InTransitHOtoLab?instorPickPending=${instorPickPending}&mcid=${mcid}`);
  }
  getInTransitHOtoLabDetails(instorPickPending: any, mcid: any, delaypara1: any, isdrop: any, labid: any) {
    return this.http.get<InTransitHOtoLab[]>(`${this.CGMSCHO_API2}/QC/InTransitHOtoLabDetails?instorPickPending=${instorPickPending}&mcid=${mcid}&delaypara1=${delaypara1}&isdrop=${isdrop}&labid=${labid}`);
  }
  getVehicleInfoReport(IsStopped: any, isWarehouseVhicle: any, fromDate: any, toDate: any) {
    return this.http.get<VehicleInfo[]>(`${this.CGMSCHO_API2}/ANPR/VhicleInfo?IsStopped=${IsStopped}&isWarehouseVhicle=${isWarehouseVhicle}&fromDate=${fromDate}&toDate=${toDate}`);
  }

  getPipelineDDLTransit(mcid: any, whid: any, userid: any) {
    return this.http.get<PipelineDDLTransit[]>(`${this.CGMSCHO_API2}/HO/getPipelineDDLTransit?mcid=${mcid}&whid=${whid}&userid=${userid}`);
  }

  getMasRecRemarks(whid: any, whsup: any) {
    return this.http.get<MasRecRemarks[]>(`${this.CGMSCHO_API2}/Master/MasRecRemarks?whid=${whid}&whsup=${whsup}`);
  }

  getPipelineDetailsGrid(ponoid: any, itemid: number, mcid: number, whid: any, userid: any, supid: any): Observable<any> {
    // Construct the query parameters
    const params = new HttpParams()
      .set('ponoid', ponoid.toString())
      .set('itemid', itemid.toString())
      .set('mcid', mcid.toString())
      .set('whid', whid.toString())
      .set('userid', userid.toString())
      .set('supid', supid.toString());

    // Make the HTTP GET request
    return this.http.get<PipelineDetailsGrid[]>(`${this.CGMSCHO_API2}/HO/getPipelineDetails`, { params });
  }

  GetWarehouseInfo(whid: any) {
    return this.http.get(`${this.CGMSCHO_API2}/Warehouse/GetWarehouseInfo?whid=${whid}`)
  }

  getVehicleEntriesExits(whid: any, previousNDays: any, tranId: any, plateNo: any) {
    return this.http.get<GetVehicleEntriesExits[]>(`${this.CGMSCHO_API2}/Warehouse/GetVehicleEntriesExits?whid=${whid}&previousNDays=${previousNDays}&tranId=${tranId}&plateNo=${plateNo}`)
  }

  insertTblRecvProgress_WithVhicle(remid: any, remarks: any, ponoid: any, whid: any, tranId: any, plateNo: any) {

    return this.http.post(`${this.CGMSCHO_API2}/HO/insertTblRecvProgress_WithVhicle?remid=${remid}&remarks=${remarks}&ponoid=${ponoid}&whid=${whid}&tranId=${tranId}&plateNo=${plateNo}`, {}, { responseType: 'text' })

  }

  getEdlNonEdlIssuePercentSummary(yearid: any) {
    return this.http.get<EdlNonEdlIssuePercentSummary[]>(`${this.CGMSCHO_API2}/HOD/EdlNonEdlIssuePercentSummary?yearid=${yearid}`);

  }

  getIssuePerWisePerClick(yearid: any, orderdp: any) {

    return this.http.get<IssuePerWisePerClick[]>(`${this.CGMSCHO_API2}/HOD/IssuePerWisePerClick?yearid=${yearid}&orderdp=${orderdp}`);

  }
  getIssuedPerWise(yearid: any) {
    return this.http.get<IssuedPerWise[]>(`${this.CGMSCHO_API2}/HOD/IssuedPerWise?yearid=${yearid}`);

  }
  getDistrictWiseStock(mcid: any) {
    return this.http.get<DistrictWiseStock[]>(`${this.CGMSCHO_API2}/District/DistrictWiseStock?mcid=${mcid}`);

  }
  getMasDistrict(allDist: any, whid: any, distid: any, userid: any, coll_cmho: any) {
    return this.http.get<MasDistrict[]>(`${this.CGMSCHO_API2}/Master/MasDistrict?allDist=${allDist}&whid=${whid}&distid=${distid}&userid=${userid}&coll_cmho=${coll_cmho}`);

  }

  getDdlItemWiseInHandQty(distId: any) {
    return this.http.get<DdlItemWiseInHandQty[]>(`${this.CGMSCHO_API2}/District/DdlItemWiseInHandQty?distId=${distId}`);

  }
  getDistFACwiseStockPostionNew(disid: any, coll_cmho: any, mcatid: any, EDLNedl: any, mitemid: any, userid: any) {
    return this.http.get<DistFACwiseStockPostionNew[]>(`${this.CGMSCHO_API2}/District/DistFACwiseStockPostionNew?disid=${disid}&coll_cmho=${coll_cmho}&mcatid=${mcatid}&EDLNedl=${EDLNedl}&mitemid=${mitemid}&userid=${userid}`);

  }

  getSeasonDrugs(seasonname: string, groupid: number, itemtypeid: number, storeType: string): Observable<any> {

    const apiUrl = `${this.CGMSCHO_API2}/HOD/SeasonDrugs`;
    const params = new HttpParams()
      .set('seasonname', seasonname)
      .set('groupid', groupid.toString())
      .set('itemtypeid', itemtypeid.toString())
      .set('storeType', storeType);

    return this.http.get<SeasonDrugs[]>(apiUrl, { params });
  }


  getWarehouseInfo(distid: any): Observable<any> {
    return this.http.get<WarehouseInfo[]>(`${this.CGMSCHO_API2}/HOD/WarehouseInfo?distid=${distid}`);
  }


  getFacCoverage(distid: any): Observable<any> {
    return this.http.get<FacCoverage[]>(`${this.CGMSCHO_API2}/HOD/FacCoverage?distid=${distid}`);
  }

  getStockSummaryBalanceIndent(yearid: any, mcid: any): Observable<any> {
    return this.http.get<StockSummaryBalanceIndent[]>(`${this.CGMSCHO_API2}/HOD/StockSummaryBalanceIndent?yearid=${yearid}&mcid=${mcid}`);
  }

  getStockSummaryBalanceIndentDetails(yearid: any, mcid: any, orderid: any): Observable<any> {
    return this.http.get<StockSummaryBalanceIndentDetails[]>(`${this.CGMSCHO_API2}/HOD/StockSummaryBalanceIndentDetails?yearid=${yearid}&mcid=${mcid}&orderid=${orderid}`);
  }
  getNearExpRCDetails(mcid: any, mmpara: any): Observable<any> {
    return this.http.get<NearExpRCDetails[]>(`${this.CGMSCHO_API2}/TimeTaken/NearExpRCDetails?mcid=${mcid}&mmpara=${mmpara}`);
  }

  getPOSuppyTimeTakenYear(mcid: any, duration: any, supplierid: any): Observable<any> {

    return this.http.get<POSuppyTimeTakenYear[]>(`${this.CGMSCHO_API2}/TimeTaken/POSuppyTimeTakenYear?mcid=${mcid}&duration=${duration}&supplierid=${supplierid}`);
  }

  SupplyDuration(): Observable<any> {
    return this.http.get<SupplyDuration[]>(`${this.CGMSCHO_API2}/TimeTaken/SupplyDuration`);
  }


  getPaidTimeTaken(mcid: any, HODID: any, QCRequired: any): Observable<any> {

    return this.http.get<PaidTimeTaken[]>(`${this.CGMSCHO_API2}/TimeTaken/PaidTimeTaken?mcid=${mcid}&HODID=${HODID}&QCRequired=${QCRequired}`);
  }

  getQCTimeTakenYearwise(mcid: any): Observable<any> {

    return this.http.get<QCTimeTakenYearwise[]>(`${this.CGMSCHO_API2}/TimeTaken/QCTimeTakenYearwise?mcid=${mcid}`);
  }
  getQCLabYearAvgTime(yrid: any): Observable<any> {

    return this.http.get<QCLabYearAvgTime[]>(`${this.CGMSCHO_API2}/TimeTaken/QCLabYearAvgTime?yrid=${yrid}`);
  }
  getStockoutSummary(yrid: any, isedl: any, mcid: any): Observable<any> {

    return this.http.get<StockoutSummary[]>(`${this.CGMSCHO_API2}/TimeTaken/StockoutSummary?yrid=${yrid}&isedl=${isedl}&mcid=${mcid}`);
  }

  getDistDrugCount(districtId: any, mcid: any, hodid: any): Observable<any> {

    return this.http.get<DistDrugCount[]>(`${this.CGMSCHO_API2}/District/DistDrugCount?districtId=${districtId}&mcid=${mcid}&hodid=${hodid}`);
  }
  WHDrugCount(districtId: any, mcid: any, whid: any): Observable<any> {

    return this.http.get<WHDrugCount[]>(`${this.CGMSCHO_API2}/District/WHDrugCount?districtId=${districtId}&mcid=${mcid}&whid=${whid}`);
  }

  HODPOYear_AgAI(mcatid: any, hodid: any, Isall: any, IsagainstAI: any): Observable<any> {


    return this.http.get<HODPOYear_AgAI[]>(`${this.CGMSCHO_API2}/HO/HODPOYear_AgAI?mcatid=${mcatid}&hodid=${hodid}&Isall=${Isall}&IsagainstAI=${IsagainstAI}`);
  }

  DirectorateAIDetails(yearid: any, mcid: any, hodid: any, groupid: any, itemtypeid: any,pogiven:any): Observable<any> {

    return this.http.get<DirectorateAIDetails[]>(`${this.CGMSCHO_API2}/HOD/DirectorateAIDetails?yearid=${yearid}&mcid=${mcid}&hodid=${hodid}&groupid=${groupid}&itemtypeid=${itemtypeid}&pogiven=${pogiven}`);
  }

  GroupWiseAI_PODetails(yearid: any, mcid: any, hodid: any): Observable<any> {
    

    return this.http.get<GroupWiseAI_PODetails[]>(`${this.CGMSCHO_API2}/HOD/GroupWiseAI_PODetails?yearid=${yearid}&mcid=${mcid}&hodid=${hodid}`);
  }



  Diswise_Issuance(yearid: any, mcid: any, hodid: any): Observable<any> {

    return this.http.get<Diswise_Issuance[]>(`${this.CGMSCHO_API2}/HOD/Diswise_Issuance?yearid=${yearid}&mcid=${mcid}&hodid=${hodid}`);

  }

  Monthwise_Issuance(yearid: any, mcid: any, hodid: any): Observable<any> {

    return this.http.get<Monthwise_Issuance[]>(`${this.CGMSCHO_API2}/HOD/Monthwise_Issuance?yearid=${yearid}&mcid=${mcid}&hodid=${hodid}`);

  }


  getDropAppWarehousePerformance(fromdt: any, todate: any): Observable<any> {
    // 01-Nov-2024
    return this.http.get<DropAppWarehousePerformance[]>(`${this.CGMSCHO_API2}/TimeTaken/DropAppWarehousePerformance?fromdt=${fromdt}&todate=${todate}`);

  }

  DelvieryDash(days: any): Observable<any> {
    return this.http.get<DelvieryDash[]>(`${this.CGMSCHO_API2}/TimeTaken/DelvieryDash?days=${days}`);

  }

  masddlUser(Usertype: any): Observable<any> {

    return this.http.get<masddlUser[]>(`${this.CGMSCHO_API2}/Master/masddlUser?Usertype=${Usertype}`);

  }

  allwh(allwh: any): Observable<any> {

    return this.http.get<MasWH[]>(`${this.CGMSCHO_API2}/Master/MasWH?allwh=${allwh}`);

  }
  VerifyOTPLogin(otp: any, userid: any) {

    return this.http.get(`${this.CGMSCHO_API2}/Login/VerifyOTPLogin?otp=${otp}&userid=${userid}`, { responseType: 'text' });
  }
  getOTPSaved(userid: any) {

    return this.http.post(`${this.CGMSCHO_API2}/Login/getOTPSaved?userid=${userid}`, { responseType: 'text' });
  }

  getDashLoginDDL() {

    return this.http.get<DashLoginDDL[]>(`https://cgmsc.gov.in/HIMIS_APIN/api/Work/getDashLoginDDL`);
  }

  getDisYrGrowth(districtId: any, mcid: any) {

    return this.http.get<DisYrGrowth[]>(`${this.CGMSCHO_API2}/District/DisYrGrowth?districtId=${districtId}&mcid=${mcid}`);
  }

  getDistCGMSCSupplyDHS(districtId: any, mcid: any) {

    return this.http.get<DistCGMSCSupplyDHS[]>(`${this.CGMSCHO_API2}/District/DistCGMSCSupplyDHS?districtId=${districtId}&mcid=${mcid}`);
  }

  getDMEissueItems(districtId: any, mcid: any) {

    return this.http.get(`${this.CGMSCHO_API2}/District/DMEissueItems?districtId=${districtId}&mcid=${mcid}`);
  }

  getAyushIssueItems(districtId: any, mcid: any) {

    return this.http.get(`${this.CGMSCHO_API2}/District/AyushIssueItems?districtId=${districtId}&mcid=${mcid}`);
  }

  getDHSissueItems(districtId: any, mcid: any) {

    return this.http.get(`${this.CGMSCHO_API2}/District/DHSissueItems?districtId=${districtId}&mcid=${mcid}`);
  }



  // Infrastructure


  //#region DetailProgress


  GETWORunningHandDetails(did: any, divisionId: any, distId: number, mainSchemeId: any,contractorid:any,ASAmount:any) {
    return this.http.get<WORunningHandDetails[]>(`${this.apiUrl}/DetailProgress/WORunningHandDetails?did=${did}&divisionid=${divisionId}&districtid=${distId}&mainSchemeId=${mainSchemeId}&contractorid=${contractorid}&ASAmount=${ASAmount}`);
    // https://cgmsc.gov.in/HIMIS_APIN/api/DetailProgress/WORunningHandDetails?did=3001&divisionid=0&districtid=0&mainschemeid=0
    // WORunningHandDetails
  }
  GETLandIssueRetToDeptDetatails(did: any, divisionid: any, districtid: number, mainschemeid:any,ASAmount:any) {
    return this.http.get<LandIssue_RetToDeptDetatails[]>(`${this.apiUrl}/DetailProgress/LandIssue_RetToDeptDetatails?did=${did}&divisionid=${divisionid}&districtid=${districtid}&mainschemeid=${mainschemeid}&ASAmount=${ASAmount}`);
    // https://cgmsc.gov.in/HIMIS_APIN/api/DetailProgress/LandIssue_RetToDeptDetatails?did=6001&divisionid=0&districtid=0&mainschemeid=0
  }
  GETTobeTenderAll(did: any, divisionid: any, districtid: number, mainschemeid:any,ASAmount:any) {
    return this.http.get<DetailProgressTinP[]>(`${this.apiUrl}/DetailProgress/TobeTenderAll?did=${did}&divisionid=${divisionid}&districtid=${districtid}&mainschemeid=${mainschemeid}&ASAmount=${ASAmount}`);
    // https://cgmsc.gov.in/HIMIS_APIN/api/DetailProgress/TobeTenderAll?did=1001&divisionid=0&districtid=0&mainschemeid=0
  }
  GETDetailProgress(did: any, divisionid: any, districtid: number, mainschemeid:any,ASAmount:any) {
    return this.http.get<DetailProgressTinP[]>(`${this.apiUrl}/DetailProgress/TenderInProcess?did=${did}&divisionid=${divisionid}&districtid=${districtid}&mainschemeid=${mainschemeid}&ASAmount=${ASAmount}`);
    // https://cgmsc.gov.in/HIMIS_APIN/api/DetailProgress/TenderInProcess?did=2001&divisionid=0&districtid=0&mainschemeid=0
  }
  GET_TotalWorksAbstract(divisionId: any,districtid:any,mainSchemeId: any, contractorid:any,ASAmount:any) {
    // ;
    return this.http.get<TotalWorksAbstract[]>(`${this.apiUrl}/DetailProgress/TotalWorksAbstract?divisionid=${divisionId}&districtid=${districtid}&mainschemeid=${mainSchemeId}&contractorid=${contractorid}&ASAmount=${ASAmount}`);
  // https://cgmsc.gov.in/HIMIS_APIN/api/DetailProgress/TotalWorksAbstract?divisionid=0&districtid=0&mainschemeid=116&contractorid=0&ASAmount=1
  }

  DashProgressCount(divisionId: any, mainSchemeId: number, distid: number,ASID:any,GrantID:any,ASAmount:any) {
    // return this.http.get<DashProgressCount[]>(
    //   `https://cgmsc.gov.in/HIMIS_APIN/api/Progress/DashProgressCount?divisionid=${divisionId}&mainSchemeId=${mainSchemeId}&distid=${distId}`
    // );

    return this.http.get<DashProgressCount[]>(`${this.apiUrl}/Progress/DashProgressCount?divisionid=${divisionId}&mainSchemeId=${mainSchemeId}&distid=${distid}&ASID=${ASID}&GrantID=${GrantID}&ASAmount=${ASAmount}`);
    // https://cgmsc.gov.in/HIMIS_APIN/api/Progress/DashProgressCount?divisionid=0&mainSchemeId=0&distid=0&ASID=0&GrantID=0&ASAmount=1
  }
  GetDistrict(isall: any, divisionId: number) {
    return this.http.get<GetDistrict[]>(
      `https://cgmsc.gov.in/HIMIS_APIN/api/Progress/GetDistrict?isall=${isall}&divisionId=${divisionId}`
    );
  }
  DashProgressDistCount(divisionId: any, mainSchemeId: any, dashID: any) {
    return this.http.get<DashProgressDistCount[]>(
      `https://cgmsc.gov.in/HIMIS_APIN/api/Progress/DashProgressDistCount?divisionId=${divisionId}&mainSchemeId=${mainSchemeId}&dashID=${dashID}`

    );
  }
  DMEProgressSummary(divisionId: any, mainSchemeId: any, distid: any, dashID: any) {
    // https://cgmsc.gov.in/HIMIS_APIN/api/Work/DMEProgressSummary?divisionId=0&mainSchemeId=0&distid=0&dashID=0
    return this.http.get<DMEProgressSummary[]>
      (`${this.apiUrl}/Work/DMEProgressSummary?divisionId=${divisionId}&mainSchemeId=${mainSchemeId}&distid=${distid}&dashID=${dashID}`);

  }
  GetDistrictNameDME(divisionid: any, districtid: any) {
    // https://cgmsc.gov.in/HIMIS_APIN/api/Work/DistrictNameDME?divisionid=0&districtid=0
    return this.http.get<DistrictNameDME[]>
      (`${this.apiUrl}/Work/DistrictNameDME?divisionId=${divisionid}&districtid=${districtid}`);

  }


  WorkFill(searchtext: any, workid: any, divisionId: any, distid: any, mainSchemeId: any): Observable<WorkFill[]> {
    return this.http.get<WorkFill[]>(`${this.apiUrl}/Work/WorkFill?searchtext=${searchtext}&workid=${workid}&divisionId=${divisionId}&distid=${distid}&mainSchemeId=${mainSchemeId}`);
    // https://cgmsc.gov.in/HIMIS_APIN/api/Work/WorkFill?searchtext=0&workid=0&divisionId=0&distid=0&mainSchemeId=0
  }
  GetWorkDetails(workid: any): Observable<WorkDetails[]> {
    // https://cgmsc.gov.in/HIMIS_APIN/api/Work/WorkFill?searchtext=0&workid=0&divisionId=0&distid=0&mainSchemeId=0
    return this.http.get<WorkDetails[]>(`${this.apiUrl}/Work/GetWorkInfo?workid=${workid}`);
  }
  GETWorkBillStatus(workid: any): Observable<WorkBillStatus[]> {
    return this.http.get<WorkBillStatus[]>(`${this.apiUrl}/Payment/WorkBillStatus?workid=${workid}`);
    // https://cgmsc.gov.in/HIMIS_APIN/api/Payment/WorkBillStatus?workid=W6700101
  }
  GetProjectTimeline(workid: any): Observable<ProjectTimeline[]> {
    return this.http.get<ProjectTimeline[]>(`${this.apiUrl}/Work/GetProjectTimeline?workid=${workid}`);
    // https://cgmsc.gov.in/HIMIS_APIN/api/Work/GetProjectTimeline?workid=W4100398
  }
  GetProjectTimelineNew(workid: any): Observable<ProjectTimelineNew[]> {
    return this.http.get<ProjectTimelineNew[]>(`${this.apiUrl}/Work/GetProjectTimelineNew?workid=${workid}`);
    //https://cgmsc.gov.in/HIMIS_APIN/api/Work/GetProjectTimelineNew?workid=W4100398
  }



  getMainScheme(isall: any): Observable<MainScheme[]> {
    return this.http.get<MainScheme[]>(`${this.apiUrl}/Progress/getMainScheme?isall=${isall}`);
  }
  GetProgressCount(did: any, divisionId: any, distid: any, mainSchemeId: any) {
    return this.http.get<DivisionPrograss[]>(`${this.apiUrl}/Work/getProgressCount?did=${did}&divisionId=${divisionId}&distid=${distid}&mainSchemeId=${mainSchemeId}`);

  }
  GetProgressDetailsLatLong(did: any, divisionId: any, distid: any, mainSchemeId: any, workid: any, dayPara: any, TotMobile: any) {
    // https://cgmsc.gov.in/HIMIS_APIN/api/Work/getProgressDetailsLatLong?did=5001&divisionId=D1017&distid=0&mainSchemeId=0&workid=0&dayPara=0&TotMobile=0
    return this.http.get<ProgressDetailsLatLong[]>(`${this.apiUrl}/Work/getProgressDetailsLatLong?did=${did}&divisionId=${divisionId}&distid=${distid}&mainSchemeId=${mainSchemeId}&workid=${workid}&dayPara=${dayPara}&TotMobile=${TotMobile}`);

  }
  //#region Work pending 
  WOPendingTotal(RPType: any, divisionId: any, districtid: any,mainSchemeId:any) {
    return this.http.get<WOpendingTotal[]>(`${this.apiUrl}/WorkOrder/WOPendingTotal?RPType=${RPType}&divisionId=${divisionId}&districtid=${districtid}&mainSchemeId=${mainSchemeId}`);

    // https://cgmsc.gov.in/HIMIS_APIN/api/WorkOrder/WOPendingTotal?RPType=Scheme&divisionid=0&districtid=0&mainSchemeId=145
  }
  GetWorkOrderPendingDetailsNew(divisionId: any, mainSchemeId: any, distid: any, contractid: any) {
    return this.http.get<WorkOrderPendingDetailsNew[]>(`${this.apiUrl}/WorkOrder/getWorkOrderPendingDetailsNew?divisionId=${divisionId}&mainSchemeId=${mainSchemeId}&distid=${distid}&contractid=${contractid}`);

  }

  GETWorkOrderGenerated(RPType: any, divisionId: any, districtid: any, fromdt: any, todt: any,mainSchemeId:any) {
    return this.http.get<WorkOrderIssued[]>(`${this.apiUrl}/WorkOrder/WorkOrderGenerated?RPType=${RPType}&divisionid=${divisionId}&districtid=${districtid}&fromdt=${fromdt}&todt=${todt}&mainSchemeId=${mainSchemeId}`);
    //https://cgmsc.gov.in/HIMIS_APIN/api/WorkOrder/WorkOrderGenerated?RPType=Scheme&divisionid=0&districtid=0&fromdt=01-01-2024&todt=0&mainSchemeId=145

  }
  GETWorkGenDetails(divisionId: any, mainSchemeId: any, distid: any, work_id: any, fromdt: any, todt: any) {
    return this.http.get<WorkGenDetails[]>(`${this.apiUrl}/WorkOrder/getWorkGenDetails?divisionId=${divisionId}&mainSchemeId=${mainSchemeId}&distid=${distid}&work_id=${work_id}&fromdt=${fromdt}&todt=${todt}`);
    //https://cgmsc.gov.in/HIMIS_APIN/api/WorkOrder/getWorkGenDetails?divisionId=D1004&mainSchemeId=0&distid=0&work_id=0&fromdt=01-Apr-2023&todt=01-Jan-2025

  }
 
  //#endregion

  //#region Handover
  // GETHandoverAbstractDateBY(Total:any, dashid:any,divisionId:any,districtid:any,SWId:any,fromdt:any,todt:any){
  //   return this.http.get<HandoverAbstractDateBY[]>(`${this.apiUrl}/Handover/HandoverAbstract?RPType=${Total}&dashid=${dashid}&divisionid=${divisionId}&districtid=${districtid}&SWId=${SWId}&fromdt=${fromdt}&todt=${todt}`);
  //   // https://cgmsc.gov.in/HIMIS_APIN/api/Handover/HandoverAbstract?RPType=Total&dashid=4001&divisionid=0&districtid=0&SWId=0&fromdt=01-04-2023&todt=01-05-2023
  // }
  HandoverAbstract(RPType: any, dashid: any, divisionId: any, districtid: any, SWId: any, fromdt: any, todt: any,mainSchemeId:any) {
    return this.http.get<HandoverAbstract[]>(`${this.apiUrl}/Handover/HandoverAbstract?RPType=${RPType}&dashid=${dashid}&divisionid=${divisionId}&districtid=${districtid}&SWId=${SWId}&fromdt=${fromdt}&todt=${todt}&mainSchemeId=${mainSchemeId}`);
    // https://cgmsc.gov.in/HIMIS_APIN/api/Handover/HandoverAbstract?RPType=Total&dashid=4001&divisionid=0&districtid=0&SWId=0&fromdt=01-04-2023&todt=0
    // https://cgmsc.gov.in/HIMIS_APIN/api/Handover/HandoverAbstract?RPType=Total&dashid=4001&divisionid=0&districtid=0&SWId=0&fromdt=01-04-2023&todt=0&mainSchemeId=142
  }
  GetHandoverDetails(dashid: any, divisionId: any, mainSchemeId: any, distid: any, SWId: any, fromdt: any, todt: any) {
    return this.http.get<GetHandoverDetails[]>(`${this.apiUrl}/Handover/getHandoverDetails?dashid=${dashid}&divisionId=${divisionId}&mainSchemeId=${mainSchemeId}&distid=${distid}&SWId=${SWId}&fromdt=${fromdt}&todt=${todt}`);
    // https://cgmsc.gov.in/HIMIS_APIN/api/Handover/getHandoverDetails?dashid=4001&divisionId=D1001&mainSchemeId=0&distid=0&SWId=0&fromdt=02-1-2025&todt=03-13-2025
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
  GetLIPendingTotal(engtype: any,divisionId: any,districtid:any,mainSchemeId:any) {
    return this.http.get<LIPendingTotal[]>(`${this.apiUrl}/LandIssue/LIPendingTotal?RPType=${engtype}&divisionid=${divisionId}&districtid=${districtid}&mainSchemeId=${mainSchemeId}`);
    // https://cgmsc.gov.in/HIMIS_APIN/api/LandIssue/LIPendingTotal?RPType=Total&divisionid=0&districtid=0&mainSchemeId=145
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

  //#region Tender 
  GETLiveTender(RPType: any, divisionId: any, districtid: any, mainschemeid: any, TimeStatus: any) {
    return this.http.get<LiveTenderdata[]>(`${this.apiUrl}/TenderStatus/LiveTender?RPType=${RPType}&divisionId=${divisionId}&districtid=${districtid}&mainschemeid=${mainschemeid}&TimeStatus=${TimeStatus}`);
    // https://cgmsc.gov.in/HIMIS_APIN/api/TenderStatus/LiveTender?RPType=Total&divisionid=0&districtid=0&mainschemeid=0&TimeStatus=0
  }
  GETTenderDetails(divisionId: any, mainschemeid: any, distid: any, TimeStatus: any) {
    return this.http.get<TenderDetails[]>(`${this.apiUrl}/TenderStatus/getTenderDetails?divisionId=${divisionId}&mainschemeid=${mainschemeid}&distid=${distid}&TimeStatus=${TimeStatus}`);
    //https://cgmsc.gov.in/HIMIS_APIN/api/TenderStatus/getTenderDetails?divisionId=D1004&mainSchemeId=0&distid=0&TimeStatus=Live
  }
  GETTenderEvaluation(RPType: any, divisionId: any, districtid: any, mainschemeid: any) {
    return this.http.get<TenderEvaluation[]>(`${this.apiUrl}/TenderStatus/TenderEvaluation?RPType=${RPType}&divisionId=${divisionId}&districtid=${districtid}&mainschemeid=${mainschemeid}`);

    //https://cgmsc.gov.in/HIMIS_APIN/api/TenderStatus/TenderEvaluation?RPType=Total&divisionid=0&districtid=0&mainschemeid=0
  }
  GETTenderEvaluationDetails(divisionId: any, mainschemeid: any, distid: any) {
    return this.http.get<TenderEvaluationDetails[]>(`${this.apiUrl}/TenderStatus/getTenderEvaluationDetails?divisionId=${divisionId}&mainschemeid=${mainschemeid}&distid=${distid}`);
    // https://cgmsc.gov.in/HIMIS_APIN/api/TenderStatus/getTenderEvaluationDetails?divisionId=0&mainSchemeId=0&distid=0
  }
  GETPriceEvaluation(RPType: any, divisionId: any, districtid: any, mainschemeid: any) {
    return this.http.get<PriceEvaluation[]>(`${this.apiUrl}/TenderStatus/PriceEvaluation?RPType=${RPType}&divisionId=${divisionId}&districtid=${districtid}&mainschemeid=${mainschemeid}`);
    // https://cgmsc.gov.in/HIMIS_APIN/api/TenderStatus/PriceEvaluation?RPType=Total&divisionid=0&districtid=0&mainschemeid=0
  }
  GETPriceEvaluationDetails(divisionId: any, mainschemeid: any, distid: any) {
    return this.http.get<PriceEvaluationDetails[]>(`${this.apiUrl}/TenderStatus/getPriceEvaluationDetails?divisionId=${divisionId}&mainschemeid=${mainschemeid}&distid=${distid}`);

    // https://cgmsc.gov.in/HIMIS_APIN/api/TenderStatus/getPriceEvaluationDetails?divisionId=0&mainSchemeId=0&distid=0
  }
  //#endregion


  //#region Payment 
  GETPaidSummary(RPType: any, divisionId: any, districtid: any, mainschemeid: any, fromdt: any, todt: any) {
    return this.http.get<PaidSummary[]>(`${this.apiUrl}/Payment/PaidSummary?RPType=${RPType}&divisionId=${divisionId}&districtid=${districtid}&mainschemeid=${mainschemeid}&fromdt=${fromdt}&todt=${todt}`);
    //https://cgmsc.gov.in/HIMIS_APIN/api/Payment/PaidSummary?RPType=Division&divisionid=0&districtid=0&mainschemeid=0&fromdt=01-Dec-2023&todt=31-Dec-2023
  }
  GETUnPaidSummary(RPType: any, divisionId: any, districtid: any, mainschemeid: any) {
    return this.http.get<UnPaidSummary[]>(`${this.apiUrl}/Payment/UnPaidSummary?RPType=${RPType}&divisionId=${divisionId}&districtid=${districtid}&mainschemeid=${mainschemeid}`);
    //https://cgmsc.gov.in/HIMIS_APIN/api/Payment/UnPaidSummary?RPType=GTotal&divisionid=0&districtid=0&mainschemeid=0
  }
  GETPaidDetails(divisionId: any, mainSchemeId: any, distid: any, fromdt: any, todt: any) {
    return this.http.get<PaidDetails[]>(`${this.apiUrl}/Payment/PaidDetails?divisionId=${divisionId}&mainSchemeId=${mainSchemeId}&distid=${distid}&fromdt=${fromdt}&todt=${todt}`);
    // https://cgmsc.gov.in/HIMIS_APIN/api/Payment/PaidDetails?divisionId=0&mainSchemeId=0&distid=0&fromdt=0&todt=0
  }
  GETUnPaidDetails(divisionId:any,mainSchemeId:any,distid: any,designame:any,OfficerID:any) {
    return this.http.get<UnPaidDetails[]>(`${this.apiUrl}/Payment/UnPaidDetails?divisionId=${divisionId}&mainSchemeId=${mainSchemeId}&distid=${distid}&designame=${designame}&OfficerID=${OfficerID}`);
    // https://cgmsc.gov.in/HIMIS_APIN/api/Payment/UnPaidDetails?divisionId=0&mainSchemeId=137&distid=0&designame=0&OfficerID=0
  }

  //#endregion
  //#region TenderStatus
  GETTenderStatus(RPType: any, divisionid: any, districtid: any, mainschemeid: any) {
    return this.http.get<TenderStatus[]>(`${this.apiUrl}/TenderStatus/TobeTender?RPType=${RPType}&divisionid=${divisionid}&districtid=${districtid}&mainschemeid=${mainschemeid}`);
    // https://cgmsc.gov.in/HIMIS_APIN/api/TenderStatus/TobeTender?RPType=GTotal&divisionid=0&districtid=0&mainschemeid=0

  }
  GETTobeTenderDetailsAS1(divisionid: any, mainschemeid: any, districtid: any) {
    return this.http.get<TobeTenderDetailsAS[]>(`${this.apiUrl}/TenderStatus/TobeTenderDetailsAS1?divisionId=${divisionid}&mainSchemeId=${mainschemeid}&distid=${districtid}`);
    //https://cgmsc.gov.in/HIMIS_APIN/api/TenderStatus/TobeTenderDetailsAS1?divisionId=0&mainSchemeId=0&distid=0

  }
  GETTobeTenderDetailsWOCancelled(divisionid: any, mainschemeid: any, districtid: any, ppid: any) {
    return this.http.get<TobeTenderDetailsCancelled[]>(`${this.apiUrl}/TenderStatus/TobeTenderDetailsWOCancelled1934?divisionId=${divisionid}&mainSchemeId=${mainschemeid}&distid=${districtid}&ppid=${ppid}`);
    //https://cgmsc.gov.in/HIMIS_APIN/api/TenderStatus/TobeTenderDetailsWOCancelled1934?divisionId=0&mainSchemeId=0&distid=0&ppid=19
    // TenderStatus/TobeTenderDetailsWOCancelled1934?divisionId=0&mainSchemeId=0&distid=0&ppid=34
  }
  GETTobeTenderRejection23(divisionid: any, mainschemeid: any, districtid: any) {
    return this.http.get<TobeTenderRejection[]>(`${this.apiUrl}/TenderStatus/TobeTenderRejection23?divisionId=${divisionid}&mainSchemeId=${mainschemeid}&distid=${districtid}`);
    //https://cgmsc.gov.in/HIMIS_APIN/api/TenderStatus/TobeTenderRejection23?divisionId=0&mainSchemeId=0&distid=0
  }
  GETTobeTenderAppliedZonalPermission25(divisionid: any, mainschemeid: any, districtid: any) {
    return this.http.get<TobeTenderAppliedZonalPermission[]>(`${this.apiUrl}/TenderStatus/TobeTenderAppliedZonalPermission25?divisionId=${divisionid}&mainSchemeId=${mainschemeid}&distid=${districtid}`);
    //https://cgmsc.gov.in/HIMIS_APIN/api/TenderStatus/TobeTenderAppliedZonalPermission25?divisionId=0&mainSchemeId=0&distid=0
  }
  //#endregion

  //#region TenderStatus
  GETASPendingDetails() {
    return this.http.get<ASPendingDetails[]>(`${this.apiUrl}/ASDetails/ASPending`);
    // https://cgmsc.gov.in/HIMIS_APIN/api/ASDetails/ASPending
  }
  GETDivisionWiseASPending(divisionId: any, mainSchemeId: any) {
    return this.http.get<DivisionWiseASPendingDetails[]>(`${this.apiUrl}/ASDetails/DivisionWiseASPending?divisionId=${divisionId}&mainSchemeId=${mainSchemeId}`);
    // https://cgmsc.gov.in/HIMIS_APIN/api/ASDetails/DivisionWiseASPending?divisionId=0&mainSchemeId=0
  }
  GETASCompleted() {
    return this.http.get<ASCompletedDetails[]>(`${this.apiUrl}/ASDetails/ASCompleted`);

   //md :otp=11344
    // https://cgmsc.gov.in/HIMIS_APIN/api/ASDetails/getASFile?ASID=4&workid=0
  }
  GETASFile(ASID: any, workid: any) {
    return this.http.get<ASFile[]>(`${this.apiUrl}/ASDetails/getASFile?ASID=${ASID}&workid=${workid}`);

    //md :otp=11344
    // https://cgmsc.gov.in/HIMIS_APIN/api/ASDetails/getASFile?ASID=4&workid=0
  }
//#endregion
//#region RunningWork

GETRunningWorkSummary(RPType:any,divisionId:any,districtid:any,mainschemeid:any,contractid:any) {
  return this.http.get<RunningWork[]>(`${this.apiUrl}/RunningWork/RunningWorkSummary?RPType=${RPType}&divisionid=${divisionId}&districtid=${districtid}&mainSchemeId=${mainschemeid}&contractid=${contractid}`);
//https://cgmsc.gov.in/HIMIS_APIN/api/RunningWork/RunningWorkSummary?RPType=GTotal&divisionid=0&districtid=0&mainSchemeId=0&contractid=0
}
GETRunningWorkSummaryDelay(RPType:any,divisionId:any,districtid:any,mainschemeid:any,contractid:any) {
  return this.http.get<RunningWorkDelay[]>(`${this.apiUrl}/RunningWork/RunningWorkSummaryDelay?RPType=${RPType}&divisionid=${divisionId}&districtid=${districtid}&mainSchemeId=${mainschemeid}&contractid=${contractid}`);
//https://cgmsc.gov.in/HIMIS_APIN/api/RunningWork/RunningWorkSummaryDelay?RPType=GTotal&divisionid=0&districtid=0&mainSchemeId=0&contractid=0
}
GETRunningDelayWorksDetails(delayTime:any,parameter:any,divisionId:any,districtid:any,mainschemeid:any,contractid:any) {
  return this.http.get<RunningDelayWorksDetails[]>(`${this.apiUrl}/RunningWork/RunningDelayWorksDetails?delayTime=${delayTime}&parameter=${parameter}&divisionid=${divisionId}&districtid=${districtid}&mainschemeid=${mainschemeid}&contractorid=${contractid}`);
// https://cgmsc.gov.in/HIMIS_APIN/api/RunningWork/RunningDelayWorksDetails?delayTime=Delay&parameter=Between3_6&divisionid=D1001&districtid=0&mainschemeid=0&contractorid=0
// https://cgmsc.gov.in/HIMIS_APIN/api/RunningWork/RunningDelayWorksDetails?delayTime=OnTime&parameter=TimeValid&divisionid=D1001&districtid=0&mainschemeid=0&contractorid=0
}


//#endregion
  GETASEnteredDetails(ASID: any, divisionId: any, mainSchemeId: any) {
    return this.http.get<ASEnteredDetails[]>(`${this.apiUrl}/ASDetails/ASEnteredDetails?ASID=${ASID}&divisionId=${divisionId}&mainSchemeId=${mainSchemeId}`);



    //https://cgmsc.gov.in/HIMIS_APIN/api/ASDetails/ASEnteredDetails?ASID=22&divisionId=D1017&mainSchemeId=0
  }

 





  getDistDHSStock(disid: any, coll_cmho: any, mcatid: any, userid: any) {

    return this.http.get<DistDHSStock[]>(`${this.CGMSCHO_API2}/District/DistDHSStock?disid=${disid}&coll_cmho=${coll_cmho}&mcatid=${mcatid}&userid=${userid}`);
  }

  getGetVehicleNo(whid: any) {
    return this.http.get<GetVehicleNo[]>(`${this.CGMSCHO_API2}/Warehouse/GetVehicleNoByWh?whid=${whid}`);
  }

  getTravelVouchers(vid: any, indentId: any) {
    return this.http.get<TravelVouchers[]>(`${this.CGMSCHO_API2}/Warehouse/TravelVouchers?vid=${vid}&indentId=${indentId}`);
  }

  getGetLatLong(indentId: any) {
    return this.http.get<GetLatLong[]>(`${this.CGMSCHO_API2}/Warehouse/GetLatLong?indentId=${indentId}`);
  }

  updateTBIndentTravaleWH(travelId: any, latitude: any, longitude: any, dt1: any) {
    return this.http.put(
      `${this.CGMSCHO_API2}/Warehouse/updateTBIndentTravaleWH?travelId=${travelId}&latitude=${latitude}&longitude=${longitude}&dt1=${dt1}`,
      null, // Pass `null` for the body since it's a PUT request without payload
      { responseType: 'text' } // Specify the response type as 'text'
    );
  }


  MasSupplierPipeline(wh: any) {
    return this.http.get<MasSupplierPipeline[]>(`${this.CGMSCHO_API2}/Master/MasSupplierPipeline?wh=${wh}`);
  }

  CGMSCIndentPending( mcid:any,hodid:any){
    return this.http.get(`${this.CGMSCHO_API2}/DashboardHome/CGMSCIndentPending?mcid=${mcid}&hodid=${hodid}`);
  }

  DeliveryInMonth(IndentfromDT: any, Indenttodt: any) {
    return this.http.get<DeliveryInMonthconst[]>(`${this.CGMSCHO_API2}/DashboardHome/DeliveryInMonth?IndentfromDT=${IndentfromDT}&Indenttodt=${Indenttodt}`);
  }

  Last7DaysIssue(days: any, mcid: any, yrid: any,hodid:any,ltflag:any) {
    return this.http.get<Last7DaysIssue[]>(`${this.CGMSCHO_API2}/DashboardHome/Last7DaysIssue?days=${days}&mcid=${mcid}&yrid=${yrid}&hodid=${hodid}&ltflag=${ltflag}`);
  }

  Last7DaysReceipt(days: any, mcid: any, yrid: any,hodid:any) {
    return this.http.get<Last7DaysReceipt[]>(`${this.CGMSCHO_API2}/DashboardHome/Last7DaysReceipt?days=${days}&mcid=${mcid}&yrid=${yrid}&hodid=${hodid}`);
  }

  MasIndentitems(mcid: any, yearid: any, hodid: any, medclgid: any) {
    
    return this.http.get<MasIndentitems[]>(`${this.CGMSCHO_API2}/DashboardHome/MasIndentitems?mcid=${mcid}&yearid=${yearid}&hodid=${hodid}&medclgid=${medclgid}`);
  }
  MasfacilityInfo(hod: any, disid: any, factypeid: any, whid: any, facid: any) {
    return this.http.get<MasfacilityInfo[]>(`${this.CGMSCHO_API2}/Master/MasfacilityInfo?hod=${hod}&disid=${disid}&factypeid=${factypeid}&whid=${whid}&facid=${facid}`);
  }

  Masitems(itemid: any, mcid: any, edl: any, groupid: any, itemtypeid: any, edlcat: any) {
    return this.http.get<Masitems[]>(`${this.CGMSCHO_API2}/Master/Masitems?itemid=${itemid}&mcid=${mcid}&edl=${edl}&groupid=${groupid}&itemtypeid=${itemtypeid}&edlcat=${edlcat}`);
  }

  getItemDetailsWithHOD(mcid: any, itemid: any, groupid: any, itemtypeid: any, edlcat: any, edltype: any, yearid: any, dhsai: any, dmai: any, totalai: any, redycnt: any, uqccnt: any, pipelinecnt: any, rccnt: any, whid: any) {
    return this.http.get<getItemDetailsWithHOD[]>(`${this.CGMSCHO_API2}/HO/getItemDetailsWithHOD?mcid=${mcid}&itemid=${itemid}&groupid=${groupid}&itemtypeid=${itemtypeid}&edltype=${edltype}&edlcat=${edlcat}&yearid=${yearid}&dhsai=${dhsai}&dmai=${dmai}&totalai=${totalai}&redycnt=${redycnt}&uqccnt=${uqccnt}&pipelinecnt=${pipelinecnt}&rccnt=${rccnt}&whid=${whid}`);
  }

  getDhsDmeStock(hodid: any, itemid: any, distid: any, facilityid: any, userid: any, coll_cmho: any, whid: any) {
    return this.http.get<DHSDMEStock[]>(`${this.CGMSCHO_API2}/HO/getDhsDmeStock?itemid=${itemid}&hodid=${hodid}&whid=${whid}&distid=${distid}&facilityid=${facilityid}&userid=${userid}&coll_cmho=${coll_cmho}`);
  }

  getfacwiseSTockIssuanceCoonsumptionm(hodid: any, itemid: any, distid: any, userid: any, coll_cmho: any) {
    return this.http.get<facwiseSTockIssuanceCoonsumptionm[]>(`${this.CGMSCHO_API2}/HO/getfacwiseSTockIssuanceCoonsumptionm?itemid=${itemid}&hodid=${hodid}&distid=${distid}&userid=${userid}&coll_cmho=${coll_cmho}`);
  }

  // getIssuedCFY(){
  //   return this.http.get<facwiseSTockIssuanceCoonsumptionm[]>(`${this.CGMSCHO_API2}/DashboardHome/IssuedCFY?yrid=0&mcid=0`);
  // }

  getPOCountCFY(yrid: any, mcid: any,hodid:any) {
    return this.http.get<POCountCFY[]>(`${this.CGMSCHO_API2}/DashboardHome/POCountCFY?yrid=${yrid}&mcid=${mcid}&hodid=${hodid}`);
  }
  getDeliveryInMonth(yrid:any,IndentfromDT: any, Indenttodt: any,hodid:any,mcid:any) {
    return this.http.get<any[]>(`${this.CGMSCHO_API2}/DashboardHome/DeliveryInMonth?yrid=${yrid}&IndentfromDT=${IndentfromDT}&Indenttodt=${Indenttodt}&hodid=${hodid}&mcid=${mcid}`);
  }

  getTotalRC(mcid: any) {
    return this.http.get<any[]>(`${this.CGMSCHO_API2}/HOTender/TotalRCMC?mcid=${mcid}`);
  }

  getNearExpRC(mcid: any) {
    return this.http.get<any[]>(`${this.CGMSCHO_API2}/TimeTaken/NearExpRC?mcid=${mcid}`);
  }

  CGMSCStockHome(mcid: any) {
    return this.http.get<any[]>(`${this.CGMSCHO_API2}/DashboardHome/CGMSCStockHome?mcid=${mcid}`);
  }


  // indent cart 
  getPartiIndent(itemid: any) {
    return this.http.get<any[]>(`${this.CGMSCHO_API2}/DashboardHome/PartiIndent?itemid=${itemid}`);
  }

  // Purchase Order Card 
  PartPOsSince1920(itemid: any) {
    return this.http.get<any[]>(`${this.CGMSCHO_API2}/DashboardHome/PartPOsSince1920?itemid=${itemid}`);
  }

  PartItemIssue(itemid: any) {
    return this.http.get<any[]>(`${this.CGMSCHO_API2}/DashboardHome/PartItem_Issueyrwise?itemid=${itemid}`);
  }

  PartItem_RCs(itemid: any) {
    return this.http.get<any[]>(`${this.CGMSCHO_API2}/DashboardHome/PartItem_RCs?itemid=${itemid}`);
  }

  getFundsDDL(RoleID:any) {
    
    return this.http.get<any[]>(`${this.CGMSCHO_API2}/HO/getFunds?RoleID=${RoleID}`);
  }

  getFundReivedBudgetID(bugetid: any, yrid: any) {
    
    return this.http.get<any[]>(`${this.CGMSCHO_API2}/DashboardFinance/FundReivedBudgetID?bugetid=${bugetid}&yrid=${yrid}`);
  }

  PaidYearwise_Budget(bugetid: any, yrid: any) {
    return this.http.get<PaidYearwise_Budget[]>(`${this.CGMSCHO_API2}/DashboardFinance/PaidYearwise_Budget?bugetid=${bugetid}&yrid=${yrid}`);
  }

  PODetailsAgainstIndentYr(bugetid: any, yrid: any, HOD: any) {
    
    return this.http.get<PODetailsAgainstIndentYr[]>(`${this.CGMSCHO_API2}/DashboardFinance/PODetailsAgainstIndentYr?bugetid=${bugetid}&yrid=${yrid}&HOD=${HOD}`);
  }

  GrossPaidDateWise(rptype: any, bugetid: any, fromdt: any, todt: any) {
    // check
    return this.http.get<any[]>(`${this.CGMSCHO_API2}/DashboardFinance/GrossPaidDateWise?rptype=${rptype}&bugetid=${bugetid}&fromdt=${fromdt}&todt=${todt}`);
  }


  Fund_Libilities(bugetid: any) {
    return this.http.get<Fund_Libilities[]>(`${this.CGMSCHO_API2}/DashboardFinance/Fund_Libilities?bugetid=${bugetid}`);
  }

  Pipeline_Libilities(bugetid: any) {
    return this.http.get<Pipeline_Libilities[]>(`${this.CGMSCHO_API2}/DashboardFinance/Pipeline_Libilities?bugetid=${bugetid}`);
  }

  IndentcntHome(mcid: any, yrid: any) {
    return this.http.get<IndentcntHome[]>(`${this.CGMSCHO_API2}/DashboardHome/IndentcntHome?mcid=${mcid}&yrid=${yrid}`);
  }

  StockoutPer(mcid: any, edltype: any, yrid: any, HOD: any) {
    return this.http.get<StockoutPer[]>(`${this.CGMSCHO_API2}/DashboardHome/StockoutPer?mcid=${mcid}&edltype=${edltype}&yrid=${yrid}&HOD=${HOD}`);
  }

  NearExp(mcid: any, nextXmonth: any) {
    return this.http.get<NearExp[]>(`${this.CGMSCHO_API2}/DashboardHome/NearExpMonthHome?mcid=${mcid}&nextXmonth=${nextXmonth}`);
  }

  FundReivedBudgetDetails(bugetid: any, yrid: any) {
    return this.http.get<FundReivedBudgetDetails[]>(`${this.CGMSCHO_API2}/DashboardFinance/FundReivedBudgetDetails?bugetid=${bugetid}&yrid=${yrid}`);
  }

  QCPendingHomeDash(mcid: any) {
    
    return this.http.get<QCPendingHomeDash[]>(`${this.CGMSCHO_API2}/QC/QCPendingDashboard?mcid=${mcid}`);
  }
  QCPendingPlace(mcid: any) {
    return this.http.get<QCPendingPlace[]>(`${this.CGMSCHO_API2}/QC/QCPendingPlacewise?mcid=${mcid}`);
  }

  QCPendingAreaDetail(area: any) {
    return this.http.get<QCPendingAreaDetail[]>(`${this.CGMSCHO_API2}/QC/QCPendingParticularArea?area=${area}`);
  }

  GrossPaidDateWiseDetails(bugetid: any, fromdt: any, todt: any, supplierid: any, yrid: any,Indentyrid:any) {
    return this.http.get<GrossPaidDateWiseDetails[]>(`${this.CGMSCHO_API2}/DashboardFinance/GrossPaidDateWiseDetails?bugetid=${bugetid}&fromdt=${fromdt}&todt=${todt}&supplierid=${supplierid}&yrid=${yrid}&Indentyrid=${Indentyrid}`);
  }
  
  Sanc_Cheque(rptype: any,bugetid: any) 
  {
    return this.http.get<any[]>(`${this.CGMSCHO_API2}/DashboardFinance/Sanc_Cheque?rptype=${rptype}&bugetid=${bugetid}`);
  }

  SanctionPrepDetails(bugetid: any,supplierid:any) {
    return this.http.get<GetSanctionPrepDetails[]>(`${this.CGMSCHO_API2}/DashboardFinance/SanctionPrepDetails?bugetid=${bugetid}&supplierid=${supplierid}`);
  }

  
  // Total Paid Click details
  // aifinyear
  GrossPaidDateWiseDetails2(bugetid: any, fromdt: any, todt: any,supplierid:any,yrid:any,Indentyrid:any) {
    return this.http.get<GrossPaidDateWiseDetails[]>(`${this.CGMSCHO_API2}/DashboardFinance/GrossPaidDateWiseDetails?bugetid=${bugetid}&fromdt=${fromdt}&todt=${todt}&supplierid=${supplierid}&yrid=${yrid}&Indentyrid=${Indentyrid}`);
  }
  

  GetLibDetails(rptype: any, yrid: any, budgetid: any,supplierid:any) {
    
    return this.http.get<LibDetailsbasedOnYearID[]>(`${this.CGMSCHO_API2}/DashboardFinance/LibDetailsbasedOnYearID?rptype=${rptype}&yrid=${yrid}&budgetid=${budgetid}&supplierid=${supplierid}`);
  }

  GetQCFinalResultPending(mcid: any) {
    
    return this.http.get<QCFinalResultPending[]>(`${this.CGMSCHO_API2}/QC/QCResultFinalUpdatePending?mcid=${mcid}`);
  }

  QCLabPendingTimeline(mcid:any,Timeline:any,labid:any) {
    return this.http.get<QCLabPendingTimeline[]>(`${this.CGMSCHO_API2}/QC/QCLabPendingTimeline?Timeline=${Timeline}&mcid=${mcid}&labid=${labid}`);
  }

  QCPendingItems(mcid:any) {
    return this.http.get<QCPendingItems[]>(`${this.CGMSCHO_API2}/QC/QCPendingItems?mcid=${mcid}`);
  }

  QCPendingParticularArea(area:any,itemid:any) {
    return this.http.get<QCPendingParticularArea[]>(`${this.CGMSCHO_API2}/QC/QCPendingParticularArea?area=${area}&itemid=${itemid}`);
  }



  QCResultPendingLabWise(mcid:any) {

    return this.http.get<QCResultPendingLabWise[]>(`${this.CGMSCHO_API2}/QC/QCResultPendingLabWise?mcid=${mcid}`);
  }

  QCHold_NSQDash(mcid:any,nsqhold :any) {

    return this.http.get<QCHold_NSQDash[]>(`${this.CGMSCHO_API2}/QC/QCHold_NSQDash?mcid=${mcid}&nsqhold=${nsqhold}`);
  }

  QCTimeTakenYear(mcid:any,yearid:any,itemtypeid:any) {

    return this.http.get<QCTimeTakenYear[]>(`${this.CGMSCHO_API2}/TimeTaken/QCTimeTakenYear?mcid=${mcid}&yearid=${yearid}&itemtypeid=${itemtypeid}`);
  }


  QCPendingMonthwiseRec(mcid:any) {
    return this.http.get<QCPendingMonthwiseRec[]>(`${this.CGMSCHO_API2}/QC/QCPendingMonthwiseRec?mcid=${mcid}`);
  }

  QCPendingMonthwiseRecDetails(monthid:any,mcid:any,) {
    
    return this.http.get<QCPendingMonthwiseRecDetails[]>(`${this.CGMSCHO_API2}/QC/QCPendingMonthwiseRecDetails?mcid=${mcid}&monthid=${monthid}`);
  }
  
  HoldItemDetails(mcid:any) {
    
    return this.http.get<HoldItemDetails[]>(`${this.CGMSCHO_API2}/QC/HoldItemDetails?mcid=${mcid}`);
  }

  getDMEAIvsIssue(mcid:any,yearid:any) {
    return this.http.get<DMEAIvsIssue[]>(`${this.CGMSCHO_API2}/DashboardDME/DMEAIvsIssue?mcid=${mcid}&yearid=${yearid}`);
  }
  getDMEIssueWihtoutAI(mcid:any,yearid:any) {
    return this.http.get<DMEIssueWihtoutAI[]>(`${this.CGMSCHO_API2}/DashboardDME/DMEIssueWihtoutAI?mcid=${mcid}&yearid=${yearid}`);
  }


  getCollegeHospital_AIvsIssue(mcid:any,yearid:any) {
    
    return this.http.get<CollegeHospital_AIvsIssue[]>(`${this.CGMSCHO_API2}/DashboardDME/CollegeHospital_AIvsIssue?mcid=${mcid}&yearid=${yearid}`);
  }

  getClgHos_IssueWihtoutAI(mcid:any,whyearid:any) {
    
    return this.http.get<ClgHos_IssueWihtoutAI[]>(`${this.CGMSCHO_API2}/DashboardDME/ClgHos_IssueWihtoutAI?mcid=${mcid}&whyearid=${whyearid}`);
  }

  GetLocationDDL(iswh:any) {
    
    return this.http.get<GetLocation[]>(`${this.CGMSCHO_API2}/Attendence/GetLocation?iswh=${iswh}`);
  }

  GetEmployeeDetail(locationId:any) {
    
    return this.http.get<EmployeeDetail[]>(`${this.CGMSCHO_API2}/Attendence/GetEmployeeDetail?locationId=${locationId}`);
  }

  GetAttendenceRecord(startDate:any,endDate:any,DepartmentFName:any,locationid:any) {
    
    return this.http.get<AttendenceRecord[]>(`${this.CGMSCHO_API2}/Attendence/AttendenceRecord?startDate=${startDate}&endDate=${endDate}&DepartmentFName=${DepartmentFName}&locationid=${locationid}`);
  }

  GetDesignation() {
    return this.http.get<Designation[]>(`${this.CGMSCHO_API2}/Attendence/GetDesignation`);
  }
 
  GetPresentAbsent(startDate:any,endDate:any,locationId:any,statusCode:any,desigId:any) {
    return this.http.get<AttendenceRecord[]>(`${this.CGMSCHO_API2}/Attendence/PresentAbsent?startDate=${startDate}&endDate=${endDate}&locationId=${locationId}&statusCode=${statusCode}&desigId=${desigId}`);
  }

  
  GetTenderStagesTotal(mcatid:any) {
    return this.http.get<TenderStagesTotal[]>(`${this.CGMSCHO_API2}/HOTender/TenderStagesTotal?mcatid=${mcatid}`);
  }

  GetTotalRC1(mcatid:any,isEdl:any) {
    return this.http.get<TotalRC1[]>(`${this.CGMSCHO_API2}/HOTender/TotalRC1?mcatid=${mcatid}&isEdl=${isEdl}`);
  }
  GetTotalRC1Details(mcid:any,Isedl:any) {
    return this.http.get<TotalRC1Details[]>(`${this.CGMSCHO_API2}/HOTender/RcDetail1?mcid=${mcid}&Isedl=${Isedl}`);
  }

  getStatusDetail(status:any,mcatid:any) {
    
    return this.http.get<StatusDetail[]>(`${this.CGMSCHO_API2}/HOTender/StatusDetail?status=${status}&mcatid=${mcatid}`);
  }
  getStatusItemDetail(schemeId:any) {
    return this.http.get<StatusItemDetail[]>(`${this.CGMSCHO_API2}/HOTender/StatusItemDetail?schemeId=${schemeId}`);
  }
  getTotalTenderDetails(categoryId  :any) {
    return this.http.get<TotalTender[]>(`${this.CGMSCHO_API2}/HOTender/TotalTender?categoryId=${categoryId}`);
  }

  getNoOfBidders(schemeId:any){
    return this.http.get<NoOfBidders[]>(`${this.CGMSCHO_API2}/HOTender/NoOfBidders?schemeId=${schemeId}`);
  }
  getConversationHodCgmsc(){
    return this.http.get<HOTender[]>(`${this.CGMSCHO_API2}/HOTender/ConversationHodCgmsc`);
  }
  GetEqpTotalTendersByStatus(){
    return this.http.get<TotalTendersByStatus[]>(`${this.himis_apin}/EMS/GetTotalTendersByStatus`);
  }

  GetEqpTenderDetail(csid:any){
    
    return this.http.get<TenderDetail[]>(`${this.himis_apin}/EMS/GetTenderDetail?csid=${csid}`);
  }

  GetConsTenderStatus(NormalZonal:any){
    return this.http.get<TenderInfraDetails[]>(`${this.himis_apin}/TenderStatus/GetTenderStatus?NormalZonal=${NormalZonal}`);
  }

  GetConsTenderStatusDetail(pGroupId:any,ppid:any){
    
    return this.http.get<GetConsTenderStatusDetail[]>(`${this.himis_apin}/TenderStatus/GetTenderStatusDetail?pGroupId=${pGroupId}&ppid=${ppid}`);
  }


  GetConsTenderStatusZonal(){
    return this.http.get<TenderInfraDetailsZonal[]>(`${this.himis_apin}/TenderStatus/ZonalTenderStatus`);
  }
  
  ZonalTenderStatusDetail(tid:any){
    
    return this.http.get<ZonalTenderStatusDetail[]>(`${this.himis_apin}/TenderStatus/ZonalTenderStatusDetail?tid=${tid}`);
  }

  GetToBeTenderNonZonal(){
    
    return this.http.get<GetToBeTender[]>(`${this.himis_apin}/TenderStatus/GetToBeTender`);
  }
  GetToBeTenderEqp(){
    
    return this.http.get<EqptobeTender[]>(`${this.himis_apin}/EMS/EqToBeTender`);
  }
  
  GetToBeTenderDrugsSection(mcid:any){
    
    return this.http.get<any[]>(`${this.CGMSCHO_API2}/HOTender/ToBeTender?mcid=${mcid}`);
  }
  
  GetToBeTenderDetail(mcid:any){
    
    return this.http.get<TobetenderDetails[]>(`${this.CGMSCHO_API2}/HOTender/ToBeTenderDetail?mcid=${mcid}`);
  }
  
  
  SchemeReceived(schemeid:any){
    
    return this.http.get<SchemeReceived[]>(`${this.CGMSCHO_API2}/HOTender/SchemeReceived?schemeid=${schemeid}`);
  }
  
  SchemeTenderStatus(schemeid:any){
    
    return this.http.get<SchemeTenderStatus[]>(`${this.CGMSCHO_API2}/HOTender/SchemeTenderStatus?schemeid=${schemeid}`);
  }
  
  GetEqToBeTenderDetail(){
    
    return this.http.get<EqToBeTenderDetail[]>(`${this.himis_apin}/EMS/EqToBeTenderDetail`);
  }
  

  CoverStatus(){
    // card
    return this.http.get<CoverStatus[]>(`${this.himis_apin}/StockMgm/CoverStatus`);

  }
  
  CoverStatusDetail(csid:any){
    // click
    return this.http.get<CoverStatusDetail[]>(`${this.himis_apin}/StockMgm/CoverStatusDetail?csid=${csid}`);

  }
  CoverStatusTenderDetail(tenderId:any){
    // item click
    return this.http.get<CoverStatusTenderDetail[]>(`${this.himis_apin}/StockMgm/CoverStatusTenderDetail?tenderId=${tenderId}`);

  }
  GetnsqDrugDetails(){
    // item click
    return this.http.get<nsqDrugDetails[]>(`${this.CGMSCHO_API2}/QC/nsqDrugDetails`);

  }

  ToBeTenderBifurcation(){
    // item click
    return this.http.get<ToBeTenderBifurcation[]>(`${this.himis_apin}/TenderStatus/ToBeTenderBifurcation`);

  }

  ToBeTenderBifurcationDetail(tRemarkId:any,){
    // item click
    
    return this.http.get<ToBeTenderBifurcationDetail[]>(`${this.himis_apin}/TenderStatus/ToBeTenderBifurcationDetail?tRemarkId=${tRemarkId}`);

  }

  MasfacilityInfoUser(hod:any,disid:any,factypeid:any,whid:any,facid:any,userid:any,coll_cmho:any){
    // item click
    return this.http.get<MasfacilityInfoUser[]>(`${this.CGMSCHO_API2}/Master/MasfacilityInfoUser?hod=${hod}&disid=${disid}&factypeid=${factypeid}&whid=${whid}&facid=${facid}&userid=${userid}&coll_cmho=${coll_cmho}`);

  }

  AIvsIssuance(mcid:any,yrid:any,facid:any){
    
    
    return this.http.get<AIvsIssuance[]>(`${this.CGMSCHO_API2}/HO/AIvsIssuance?mcid=${mcid}&facid=${facid}&yrid=${yrid}`);

  }
  getYear(){

    return this.http.get<Year[]>(`${this.CGMSCHO_API2}/CGMSCStock/getYear`);

  }

  NearExpRCDetails(mcid:any,mmpara:any){
    return this.http.get<any[]>(`${this.CGMSCHO_API2}/TimeTaken/NearExpRCDetails?mcid=${mcid}&mmpara=${mmpara}`);
  }


  variousStatusAgainstCYAI(mcid:any,yearId:any){
    return this.http.get<any[]>(`${this.CGMSCHO_API2}/HOD/variousStatusAgainstCYAI?yearId=${yearId}&mcid=${mcid}`);
  }



  MontlyItemDemography(itemId:any,mcid:any,yearId:any){
    
    return this.http.get<MontlyItemDemography[]>(`${this.CGMSCHO_API2}/HO/MontlyItemDemography?itemId=${itemId}&mcid=${mcid}&yearId=${yearId}`);
    // https://dpdmis.in/CGMSCHO_API2/api/HO/MontlyItemDemography?itemId=9996&mcid=1
  }
  YearWiseIssueReport(itemId:any,mcid:any){
    
    return this.http.get<YearWiseIssueReport[]>(`${this.CGMSCHO_API2}/HO/YearWiseIssueReport?itemId=${itemId}&mcid=${mcid}`);
    // https://dpdmis.in/CGMSCHO_API2/api/HO/YearWiseIssueReport?itemId=9996&mcid=1
  }



  //#region StockStatus
// https://dpdmis.in/CGMSCHO_API2/api/HO/StockStatus?yearId=546&mcid=1&edlStatus=EDL
// https://dpdmis.in/CGMSCHO_API2/api/HO/StockStatus?yearId=546&mcid=1&edlStatus=EDL
// https://dpdmis.in/CGMSCHO_API2/api/HO/IssuePerDetail?yearId=546&mcid=1&perCondition=BELOW10&tendCondition=PRICE
// https://dpdmis.in/CGMSCHO_API2/api/HO/StockOutDetails?yearId=546&mcid=1&tendCondition=PRICE
// https://dpdmis.in/CGMSCHO_API2/api/HO/whstockoutin?yearId=546&mcid=1&catid=52
// https://localhost:7247/api/HO/whstockoutin?yearId=546&mcid=1

StockStatus(){
  return this.http.get<any[]>(`${this.CGMSCHO_API2}/HO/StockStatus?yearId=546&mcid=1&edlStatus=EDL`);
}
IssuePerDetail(mcid:any,perCondition:any,tendCondition:any){
  return this.http.get<any[]>(`${this.CGMSCHO_API2}/HO/IssuePerDetail?yearId=546&mcid=${mcid}&perCondition=${perCondition}&tendCondition=${tendCondition}`);
}
StockOutDetails(mcid:any,tendCondition:any){
  return this.http.get<any[]>(`${this.CGMSCHO_API2}/HO/StockOutDetails?yearId=546&mcid=${mcid}&tendCondition=${tendCondition}`);
}
whstockoutin(mcid:any){
  return this.http.get<any[]>(`${this.CGMSCHO_API2}/HO/WhStockOutIn?mcid=${mcid}`);
}

WhStockOutInDetail(whid:any,para:any){
  // https://dpdmis.in/CGMSCHO_API2/api/HO/WhStockOutInDetail?whid=2615&para=STOCKOUT
  return this.http.get<any[]>(`${this.CGMSCHO_API2}/HO/WhStockOutInDetail?whid=${whid}&para=${para}`);
}
WarehoueWiseStockOut(mcid:any,edlType:any){
  // https://dpdmis.in/CGMSCHO_API2/api/HO/WarehoueWiseStockOut?mcid=1&edlType=NON%20EDL
  return this.http.get<any[]>(`${this.CGMSCHO_API2}/HO/WarehoueWiseStockOut?mcid=${mcid}&edlType=${edlType}`);
}
WarehoueWiseStockOutDetail(mcid:any,edlType:any,whId:any,colFlag:any){
  // https://dpdmis.in/CGMSCHO_API2/api/HO/WarehoueWiseStockOutDetail?mcid=1&edlType=EDL&whId=2615&colFlag=POPIPELINE
  return this.http.get<any[]>(`${this.CGMSCHO_API2}/HO/WarehoueWiseStockOutDetail?mcid=${mcid}&edlType=${edlType}&whId=${whId}&colFlag=${colFlag}`);
}



// https://dpdmis.in/CGMSCHO_API2/api/LogAudit/InsertUserLoginLog

// {
//   "logId": 0,
//   "userId": 123,
//   "roleId": 5,
//   "roleIdName": "Admin",
//   "userName": "johnDoe",
//   "ipAddress": "192.168.1.100",
//   "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36"
// }


InsertUserLoginLogPOST(values: any) {
  return this.http.post<any>(`${this.CGMSCHO_API2}/LogAudit/InsertUserLoginLog`,values );
}

//#endregion



SupplierPendingPayments(budgetId:any){
  
  return this.http.get<any[]>(`${this.CGMSCHO_API2}/DashboardHome/SupplierPendingPayments?budgetId=${budgetId}`);
}




RCValidSatus(yearId:any,mcId:any,hoType:any){
  return this.http.get<any[]>(`${this.CGMSCHO_API2}/DashboardHome/RCValidSatus?yearId=${yearId}&mcId=${mcId}&hoType=${hoType}`);
}

ABCanalysisSummary(yearid:any,mcid:any,isedl:any){
  return this.http.get<any[]>(`${this.CGMSCHO_API2}/Analysis/ABCanalysisSummary?yearid=${yearid}&mcid=${mcid}&isedl=${isedl}`);
}

ABCanalysisSummaryDetail(yearid:any,mcid:any,isedl:any,detail:any,isRCvalid:any){
  return this.http.get<any[]>(`${this.CGMSCHO_API2}/Analysis/ABCanalysisSummaryDetail?yearid=${yearid}&mcid=${mcid}&isedl=${isedl}&detail=${detail}&isRCvalid=${isRCvalid}`);
}



NearExpiryItemsWH(month:any,mcid:any){
  return this.http.get<any[]>(`${this.CGMSCHO_API2}/HO/NearExpiryItemsWH?month=${month}&mcid=${mcid}`);
}
NearExpiryBatchWise(month:any){
  return this.http.get<any[]>(`${this.CGMSCHO_API2}/HO/NearExpiryBatchWise?month=${month}`);
}
















  
  
  
  
  



 





























}
