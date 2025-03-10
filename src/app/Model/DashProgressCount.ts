
export class DashProgressCount {
  did: number | undefined;
  dashname: string | undefined;
  nosworks: number | undefined;
}

export class GetDistrict {
  districT_ID: number | undefined;
  districtname: string | undefined;
  diV_ID: number | undefined;
}
export class DMEProgressSummary {
  hc_id!: string; // Unique identifier for the health center
  nAme_eng!: string; // Name of the health center in English
  district_ID!: string; // ID of the district
  districtname!: string; // Name of the district
  toBeTender1001!: number; // Count of items to be tendered
  tenderProcess2001!: number; // Count of items in the tender process
  accWorkOrder3001!: number; // Count of accepted work orders
  completed4001!: number; // Count of completed projects
  running5001!: number; // Count of running projects
  landIssue6001!: number; // Count of land issues
  retunDept8001!: number; // Count of items returned to the department
  total!: number; // Total count of projects/issues
  divisionID!: string; // ID of the division
}
export class DashProgressDistCount {

  district_ID !: number;
  districtname!: string;
  toBeTender1001!: number;
  tenderProcess2001!: number;
  accWorkOrder3001!: number;
  completed4001!: number;
  running5001!: number;
  landIssue6001!: number;
  retunDept8001!: number;
  total!: number;
  divisionID!: string;
}
export class WorkFill {

  worK_ID: string | undefined;
  head!: string;
  district!: string;
  block_Name_En!: string | null;
  aadt!: string;
  searchname!: string;
}
export class DistrictNameDME {
  districT_ID!: string;
  districtname!: string;
  diV_ID!: any;
}
export class WorkDetails {
  work_id!: string;
  head!: string;
  subengname!: string;
  grantNo!:any;
  desig!: string;
  grantname!: string;
  letterNo!: string;
  approver!: string;
  type_name!: string;
  divName_En!: string;
  dbStart_Name_En!: string;
  blockname!: string;
  aaDate!: string;
  work!: string;
  aaamt!: string;
  tsamt!: string;
  tsDate!: string;
  agreementNo!: string;
  yearofAgreement!: string;
  wrokOrderDT!: string;
  agreementRefNo!: string;
  workorderRefNoGovt!: string;
  actualDueDT!: string;
  dueDTTimePerAdded!: string;
  acceptanceLetterRefNo!: string;
  acceptLetterDT!: string;
  sanctionDetail!: string;
  pac!: number;
  totalAmountOfContract!: number;
  sanctionRate!: number;
  timeAllowed!: number;
  pgReq!: string;
  dateOfSanction!: string;
  dateOfIssueNIT!: string;
  cid!: string;
  contractorNAme!: string;
  regType!: string;
  class!: string;
  mobNo!: string;
  asPath!: string;
  dashName!: string;
  groupName!: string;
  lProgress!: string;
  pdate!: string;
  pRemarks!: string;
  remarks!: string | null;
  divisionid!: string;
  expd!: number;
  expPending!: number;
  fBill!: string;
  tType!: string;
  tenderReference!: string;
  sr!: any;
  imageName!: any;
  imageName1!: any;
  imageName2!: any;
  imageName3!: any;
  imageName4!: any;
  ismongo!: any;
  progressEnterby!: any;
  progressEntryTime!: any;
  nonMongoImage!: any;
  expCompDT!: any;
  GrantNo!:any;
  // grantNo!:any;
}
export class WorkBillStatus {
  sno!:number;
  billno!: number;
  work_id!: string;
  agrbillstatus!: string;
  mesurementDT!: string;
  billdate!: string;
  grossPaid!: number;
  chequeNo!: string;
  chequeDT!:any;
  daysSinceMeasurement!: number;
  billStatus!: string;
  billmbno!: string;
  mbno!: string;
  // "billno": 1,
  // "work_id": "W6700101",
  // "agrbillstatus": "Running",
  // "mesurementDT": "12-07-2023",
  // "billdate": "20-07-2023",
  // "grossPaid": 7.81,
  // "chequeNo": "042263",
  // "daysSinceMeasurement": 27,
  // "billStatus": "Paid",
  // "billmbno": "5880",
  // "mbno": "10721"
}
export class ProjectTimeline {
  ppId!: number;
  level!: string;
  pdate!: string;
  sinceAS!: number;
  sinceLastProg!: number;
}
export class ProjectTimelineNew {
  ppId!: number;
  level!: string;
  dateProgress!: string;
  // sinceAS!: number;
  // sinceLastProg!: number;
  // {
  //   "ppId": 27,
  //   "level": "Lintel level (FF)",
  //   "dateProgress": "12-12-2024"
  // },
}
export class MainScheme {
  mainSchemeID!: number;
  name: any;
}
export class DivisionPrograss {
  divisionID: string | undefined;
  divisionName: string | undefined;
  nosworks!: number;
  totalToday!: number;
  mobiletoday!: number;
  totalInLast7Days!: number;
  mobileInLast7Days!: number;
  totalInLast15Days!: number;
  mobileLast15Days!: number;
  totalBefore15Days!: number;
  mobileBefore15Days!: number;
}
export class ProgressDetailsLatLong {
  work_id!: string;
  latitude!: string;
  longitude!: string;
  entryDT!: string;
  divisionID!: string;
  divName_En!: string;
  totalToday!: number;
  mobiletoday!: number;
  totalInLast7Days!: number;
  mobileInLast7Days!: number;
  totalInLast15Days!: number;
  mobileLast15Days!: number;
  totalBefore15Days!: number;
  mobileBefore15Days!: number;
  district_ID!: string;
  districtname!: string;
  block_Name_En!: string;
  workname!: string;
  head!: string;
  pLevel!: string;
  progressDT!: string;
  premarks!: string;
  aadt!: string;
  asAmt!: number;
  wrokOrderDT!: string;
  dueDTTimePerAdded!: string;
  contrctorname!: string;
  totalAmountOfContract!: number;
  grossExpPaid!: number;
  subeng!: string;
  ae!: string;
  approver!: string;
  sr!: number;
  imageName!: string;
  position!: { lat: number; lng: number };
}
//#region Work Order
export class WOpendingTotal {
  id!: string;
  name!: string;
  pendingWork!: string;
  contrctValuecr!: number;
  noofWorksGreater7Days!: string;

}
export class WOpendingScheme {
  id!: string;
  name!: string;
  pendingWork!: string;
  contrctValuecr!: number;
  noofWorksGreater7Days!: string;

}
export class WorkOrderIssued {
  id!: string;
  name!: string;
  totalWorks!: string;
  totalTVC!: number;
  avgDaysSinceAcceptance!: number;
  zonalWorks!: number;
  tenderWorks!: number;
  totalZonalTVC!: number;
  totalNormalTVC!: number;
}
export class WorkGenDetails {
  sno!: number;
  work_id!: string;
  letterNo!: string;
  head!: string;
  approver!: string;
  type_name!: string;
  district!: string;
  blockname!: string;
  work!: string;
  aaamt!: number;
  tsamt!: number;
  aaDate!: string;
  tsDate!: string | null;
  acceptanceLetterRefNo!: string;
  acceptLetterDT!: string;
  pac!: number;
  totalAmountOfContract!: number;
  sanctionRate!: number;
  sanctionDetail!: string;
  timeAllowed!: number;
  dateOfSanction!: string;
  dateOfIssueNIT!: string;
  cid!: string;
  contractorNAme!: string;
  regType!: string;
  class!: string;
  englishAddress!: string;
  mobNo!: string;
  asPath!: string;
  asLetter!: string;
  groupName!: string;
  lProgress!: string;
  pdate!: string;
  pRemarks!: string;
  remarks!: string | null;
  tenderReference!: string;
  delayReason!: string | null;
  wrokOrderDT!: string;
  hoAllotedDT!: string;
  agreementRefNo!: string;
  workorderRefNoGovt!: string;
  dueDTTimePerAdded!: string;
}



//#endregion
//#region Handover
export class HandoverAbstract {
  id!: string;
  name!: string;
  totalWorks!: number;
  tvcValuecr!: number;
  avgMonthTaken!: number;

}
export class GetHandoverDetails {
  sno!: number;
  work_id!: string;
  letterNo!: string;
  head!: string;
  approver!: string;
  type_name!: string;
  district!: string;
  blockname!: string;
  work!: string;
  aaamt!: number;
  tsamt!: number;
  aaDate!: string;
  tsDate!: string;
  acceptanceLetterRefNo!: string | null;
  acceptLetterDT!: string | null;
  pac!: number | null;
  totalAmountOfContract!: number | null;
  sanctionRate!: number | null;
  sanctionDetail!: string | null;
  timeAllowed!: number | null;
  dateOfSanction!: string | null;
  dateOfIssueNIT!: string | null;
  cid!: string | null;
  contractorNAme!: string | null;
  regType!: string | null;
  class!: string | null;
  englishAddress!: string | null;
  mobNo!: string | null;
  asPath!: string;
  asLetter!: string;
  groupName!: string;
  lProgress!: string;
  pdate!: string;
  pRemarks!: string;
  remarks!: string | null;
  tenderReference!: string | null;
  delayReason!: string | null;

}
//#endregion
//#region EngAlloted Works
export class sbuDistrictEngAllotedWorks {
  id!: string;
  districtID!: string;
  empid!: string;
  engName!: string;
  districtName!: string;
  totalWorks!: number;
  tvcValuecr!: number;
  running!: number;
  woIssue!: number;
  ladissue!: number;
  sno!: number;

}
export class AEDistrictEngAllotedWorks {
  id!: string;
  districtID!: string;
  empid!: string;
  engName!: string;
  districtName!: string;
  totalWorks!: number;
  tvcValuecr!: number;
  running!: number;
  woIssue!: number;
  ladissue!: number;
  sno!: number;

}
export class SbuEngAllotedWorks {
  id!: string;
  empid!: string;
  engName!: string;
  name!: string;
  totalWorks!: number;
  tvcValuecr!: number;
  running!: number;
  woIssue!: number;
  ladissue!: number;
}
export class AEEngAllotedWorks {
  id!: string;
  empid!: string;
  engName!: string;
  name!: string;
  totalWorks!: number;
  tvcValuecr!: number;
  running!: number;
  woIssue!: number;
  ladissue!: number;


}
export class WorkDetailsWithEng {
  sno!: any;
  work_id!: string;
  letterNo!: string;
  head!: string;
  approver!: string;
  type_name!: string;
  district!: string;
  blockname!: string;
  work!: string;
  aaamt!: number;
  tsamt!: number;
  aaDate!: string;
  tsDate!: string;
  acceptanceLetterRefNo!: string;
  acceptLetterDT!: string;
  pac!: number;
  totalAmountOfContract!: number;
  sanctionRate!: number;
  sanctionDetail!: string;
  timeAllowed!: number;
  dateOfSanction!: string;
  dateOfIssueNIT!: string;
  cid!: string;
  contractorNAme!: string;
  regType!: string;
  class!: string;
  englishAddress!: string;
  mobNo!: string;
  asPath!: string;
  asLetter!: string;
  groupName!: string;
  lProgress!: string;
  pdate!: string;
  pRemarks!: string;
  remarks!: string | null;
  tenderReference!: string;
  delayReason!: string | null;
}
export class WorkOrderPendingDetailsNew {
  sno!: number;
  work_id!: string;
  letterNo!: string;
  head!: string;
  approver!: string;
  type_name!: string;
  district!: string;
  blockname!: string;
  work!: string;
  aaamt!: number;
  tsamt!: number;
  aaDate!: string;
  tsDate!: string;
  acceptanceLetterRefNo!: string;
  acceptLetterDT!: string;
  pac!: number;
  totalAmountOfContract!: number;
  sanctionRate!: number;
  sanctionDetail!: string;
  timeAllowed!: number;
  dateOfSanction!: string;
  dateOfIssueNIT!: string;
  cid!: string;
  contractorNAme!: string;
  regType!: string;
  class!: string;
  englishAddress!: string;
  mobNo!: string;
  asPath!: string | null;
  asLetter!: string | null;
  groupName!: string;
  lProgress!: string;
  pdate!: string;
  pRemarks!: string;
  remarks!: string | null;
  tenderReference!: string;

}
//#endregion
//#region  LandIssue
export class LIPendingTotal {
  id!: string;
  name!: string;
  totalWorks!: number;
  valuecr!: number;
  woIssued!: number;
  tvcValuecr!: number;
  month2Above!: number;
}
export class LandIssueDetails {
  sno!: number;
  work_id!: string;
  letterNo!: string;
  head!: string;
  approver!: string;
  type_name!: string;
  district!: string;
  blockname!: string;
  work!: string;
  aaamt!: number;
  tsamt!: number;
  aaDate!: string;
  tsDate!: string;
  acceptanceLetterRefNo!: string | null;
  acceptLetterDT!: string | null;
  pac!: string | null;
  totalAmountOfContract!: string | null;
  sanctionRate!: string | null;
  sanctionDetail!: string | null;
  timeAllowed!: string | null;
  dateOfSanction!: string | null;
  dateOfIssueNIT!: string | null;
  cid!: string | null;
  contractorNAme!: string | null;
  regType!: string | null;
  class!: string | null;
  englishAddress!: string | null;
  mobNo!: string | null;
  asPath!: string;
  asLetter!: string;
  groupName!: string;
  lProgress!: string;
  pdate!: string;
  pRemarks!: string;
  remarks!: string;
  tenderReference!: string | null;
  delayReason!: string;
}
  //#endregion
//#region  TSDetail
export class TSDetail {
  id!: string;
  name!: string;
  nosWorks!: number;
  asValuecr!: number;
  above2crWork!: number;
  below2crWork!: number;
}
export class TSDetailallData {
  sno!: number;
  work_id!: string;
  letterno!: string;
  district!: string;
  head!: string;
  division!: string;
  detailS_ENG!: string;
  workname!: string;
  block_Name_En!: string;
  asAmt!: number;
  aA_RAA_Date!: string;
  dayssinceAS!: number;
}
  //#endregion

//#region Live Tender

export class LiveTenderdata {
  id!: string;
  name!: string;
  nosWorks!: number;
  nosTender!: number;
  totalValuecr!: number;
}

export class TenderDetails {
  sno!: number;
  work_id!: string;
  letterno!: string;
  district!: string;
  head!: string;
  division!: string;
  detailS_ENG!: string;
  workname!: string;
  block_Name_En!: string;
  asAmt!: number;
  aA_RAA_Date!: string;
  dayssinceAS!: number;
  startdt!: string;
  enddt!: string;
  noofcalls!: number;
  daystoEnd!: number;
  tenderno!:string;
  eprocno!:string;
}

export class TenderEvaluation {
  id!: string;
  name!: string;
  nosWorks!: number;
  nosTender!: number;
  totalValuecr!: number;
  avgDaysSince!: number;
}
export class TenderEvaluationDetails {
  sno!: number;
  work_id!: string;
  letterno!: string;
  district!: string;
  head!: string;
  division!: string;
  detailS_ENG!: string;
  workname!: string;
  block_Name_En!: string;
  asAmt!: number;
  aA_RAA_Date!: string;
  dayssinceAS!: number;
  startdt!: string;
  enddt!: string;
  noofcalls!: number;
  daysSinceOpen!: number;
  tOpnedDT!: string;
  topnedbdt!: string | null;
  tenderno!: string;
  eprocno!: string;
}

export class PriceEvaluation {
  id!: string;
  name!: string;
  nosWorks!: number;
  nosTender!: number;
  totalValuecr!: number;
  avgDaysSince!: number;
}
export class PriceEvaluationDetails {
  sno!: number;
    work_id!: string;
    letterno!: string;
    district!: string;
    head!: string;
    division!: string;
    workname!: string;
    asAmt!: number;
    tsAmt!: number;
    valueworksinlas!: number;
    aA_RAA_Date!: string;
    startdt!: string;
    enddt!: string;
    noofcalls!: number;
    daysSinceOpen!: number;
    tOpnedDT!: string;
    tenderno!: string;
    eprocno!: string;
    topnedpricedt!: string;
    cid!: string;
    sanctionDetail!: string;
    sanctionRate!: number;
    cnAme!: string;
    mobNo!: string;
  
 // 'TOpnedDT','topnedbdt','daysSinceOpen',

}
//#endregion

//#region Payment
export class PaidSummary {
  id!: string;
  name!: string;
  noofWorks!: number;
  avgDaysSinceMeasurement!: number;
  grossPaidcr!: number;
}
export class UnPaidSummary {
  id!: string;
  name!: string;
  noofWorks!: number;
  unpaidcr!: number;
  avgDaySinceM!: number;
}
export class PaidDetails {
  sno!: number;
  worK_ID!: string;
  head!: string;
  division!: string;
  district!: string;
  workname!: string;
  wrokOrderDT!: string;
  billno!: number;
  agrbillstatus!: string;
  totalamountofcontract!: number;
  grosspaid!: number;
  mesurementDT!: string;
  billdate!: string;
  chequeDT!: string;
  dayssincemeasurement!: number;
  totalpaidtillinlac!: number;
}
export class UnPaidDetails {
  sno!: number;
  worK_ID!: string;
  head!: string;
  division!: string;
  district!: string;
  workname!: string;
  wrokOrderDT!: string;
  billno!: number;
  agrbillstatus!: string;
  totalamountofcontract!: number;
  grossAmtNew!: number;
  mesurementDT!: string | null;
  billdate!: string;
  chequeDT!: string | null;
  dayssincemeasurement!: number;
  totalpaidtillinlac!: number;
  workStatus!: string;
  engName!: string;
  designation!: string;
}

//#endregion

//#region To be Tender
export class TenderStatus{

  id!: string;
  name!: string;
  nosWorks!:number;
  tValue!: number;
  nosValue!:number;

}
export class TobeTenderDetailsAS{
  sno!: number;
  work_id!: string;
  letterno!: string;
  district!: string;
  head!: string;
  division!: string;
  detailS_ENG!: string;
  workname!: string;
  block_Name_En!: string;
  valueWorks!: number;
  asDate!: string;
  parentprogress!: string;
  dashName!: string;
  groupName!: string;
  ppid!: number;
  wocancelletterno!: string;
  pDate!: string;
  woCancelProposalLetterNo!: string;
}
export class TobeTenderDetailsCancelled{
  sno!: number;
  work_id!: string;
  letterno!: string;
  district!: string;
  head!: string;
  division!: string;
  detailS_ENG!: string;
  workname!: string;
  block_Name_En!: string;
  valueWorks!: number;
  asDate!: string;
  parentprogress!: string;
  dashName!: string;
  groupName!: string;
  ppid!: number;
  wocancelletterno!: string;
  pDate!: string;
  woCancelProposalLetterNo!: string;
}
export class TobeTenderDetailsProposedCancelled{
  sno!: number;
  work_id!: string;
  letterno!: string;
  district!: string;
  head!: string;
  division!: string;
  detailS_ENG!: string;
  workname!: string;
  block_Name_En!: string;
  valueWorks!: number;
  asDate!: string;
  parentprogress!: string;
  dashName!: string;
  groupName!: string;
  ppid!: number;
  wocancelletterno!: string;
  pDate!: string;
  woCancelProposalLetterNo!: string;
}
export class TobeTenderRejection{
  sno!: number;
  work_id!: string;
  letterno!: string;
  district!: string;
  head!: string;
  division!: string;
  detailS_ENG!: string;
  workname!: string;
  block_Name_En!: string;
  valueWorks!: number;
  asDate!: string;
  parentprogress!: string;
  pDate!: string;
  rejReason!: string;
  rejectedDT!: string;
  dashName!: string;
  groupName!: string;
  lastNIT!: string;
  ppid!: number;
  lastEprocno!: number;

  

 
}
export class TobeTenderAppliedZonalPermission{
  sno!: number;
  work_id!: string;
    letterno!: string;
    district!: string;
    head!: string;
    division!: string;
    detailS_ENG!: string;
    workname!: string;
    block_Name_En!: string;
    value!: number;
    asDate!: string;
    lProgress!: string;
    progressDT!: string;
    zonalType!: string;
    nitNo!: string;
    ppid!: number;
    tenderID!: number;
    apild!: number;

 
}
//#endregion
//#endregion
//#region DashProgressCount Ditail
export class TotalWorksAbstract {
  sno!: number;
    work_id!: string;
    letterNo!: string;
    head!: string;
    approver!: string;
    type_name!: string;
    divName_En!: string;
    district!: string;
    blockname!: string;
    work!: string;
    asAmt!: number;
    tsamt!: number;
    aadt!: string;
    tsDate!: string;
    tType!: string;
    tenderReference!: string;
    acceptanceLetterRefNo!: string;
    acceptLetterDT!: string;
    totalAmountOfContract!: number;
    sanctionRate!: number;
    sanctionDetail!: string;
    wrokOrderDT!: string;
    hoAllotedDT!: string;
    agreementRefNo!: string;
    workorderRefNoGovt!: string;
    dueDTTimePerAdded!: string;
    timeAllowed!: number;
    dateOfSanction!: string;
    dateOfIssueNIT!: string;
    cid!: string;
    contractorNAme!: string;
    regType!: string;
    class!: string;
    englishAddress!: string;
    mobNo!: string;
    asPath!: string;
    asLetter!: string;
    groupName!: string;
    lProgress!: string;
    progressDT!: string;
    pRemarks!: string;
    remarks: any
    display!: string;
    descri!: string;
    fmrcode: any
    expcompdt!: string;
    delayreason!: string;
    subengname!: string;
    aeName!: string;
    grantNo!: string;
    totalpaid!:any;
    totalunpaid!:any;
  }
export class WORunningHandDetails{
  sno!: number;
  work_id!: string;
  letterNo!: string;
  head!: string;
  approver!: string;
  type_name!: string;
  divName_En!: string;
  district!: string;
  blockname!: string;
  work!: string;
  asAmt!: number;
  tsamt!: number;
  aadt!: string;
  tsDate!: string;
  tType!: string;
  tenderReference!: string;
  acceptanceLetterRefNo!: string;
  acceptLetterDT!: string;
  totalAmountOfContract!: number;
  sanctionRate!: number;
  sanctionDetail!: string;
  wrokOrderDT!: string | null;
  hoAllotedDT!: string;
  agreementRefNo!: string | null;
  workorderRefNoGovt!: string;
  dueDTTimePerAdded!: string | null;
  timeAllowed!: number;
  dateOfSanction!: string;
  dateOfIssueNIT!: string;
  cid!: string;
  contractorNAme!: string;
  regType!: string;
  class!: string;
  englishAddress!: string;
  mobNo!: string;
  asPath!: string;
  asLetter!: string;
  groupName!: string;
  lProgress!: string;
  progressDT!: string;
  pRemarks!: string;
  remarks!: string | null;
  display!: string;
  descri!: string;
  fmrcode!: string | null;
  expcompdt!: string;
  delayreason!: string;
  subengname!: string;
  aeName!: string;
  grantNo!:any;
  totalpaid!:any;
  totalunpaid!:any;
}
export class LandIssue_RetToDeptDetatails{
  sno!: number;
  work_id!: string;
  letterNo!: string;
  head!: string;
  approver!: string;
  type_name!: string;
  divName_En!: string;
  district!: string;
  blockname!: string;
  work!: string;
  asAmt!: number;
  tsamt!: number;
  aadt!: string;
  tsDate!: string;
  tType!: string;
  tenderReference!: string;
  acceptanceLetterRefNo!: string;
  acceptLetterDT!: string;
  totalAmountOfContract!: number;
  sanctionRate!: number;
  sanctionDetail!: string;
  wrokOrderDT!: string | null;
  hoAllotedDT!: string;
  agreementRefNo!: string | null;
  workorderRefNoGovt!: string;
  dueDTTimePerAdded!: string | null;
  timeAllowed!: number;
  dateOfSanction!: string;
  dateOfIssueNIT!: string;
  cid!: string;
  contractorNAme!: string;
  regType!: string;
  class!: string;
  englishAddress!: string;
  mobNo!: string;
  asPath!: string;
  asLetter!: string;
  groupName!: string;
  lProgress!: string;
  progressDT!: string;
  pRemarks!: string;
  remarks!: string | null;
  display!: string;
  descri!: string;
  fmrcode!: string | null;
  expcompdt!: string;
  delayreason!: string;
  subengname!: string;
  aeName!: string;
  grantNo!:any;
  totalpaid!:any;
  totalunpaid!:any;
}
export class DetailProgressTinP{
  sno!: number;
  // work_id!: string;
  worK_ID!: string;
  letterNo!: string;
  head!: string;
  approver!: string;
  type_name!: string;
  divName_En!: string;
  district!: string;
  blockname!: string;
  work!: string;
  asAmt!: number;
  tsamt!: number;
  tsDate!: string;
  aadt!: string;
  lProgress!: string;
  progressDT!: string;
  remarks!: string | null;
  groupName!: string;
  dashName!: string;
  asPath!: string;
  asLetter!: string;
  asid!: string | null;
  descri!: string;
  fmrcode!: string | null;
  startdt!: string | null;
  enddt!: string | null;
  noofcalls!: number;
  tenderno!: string | null;
  eprocno!: string | null;
  covOpenedDT!: string | null;
  topnedpricedt!: string | null;
  grantNo!:any;
  totalpaid!:any;
  totalunpaid!:any;
}
export class TenderInProcess{
  sno!: number;
  // work_id!: string;
  worK_ID!: string;
  letterNo!: string;
  head!: string;
  approver!: string;
  type_name!: string;
  divName_En!: string;
  district!: string;
  blockname!: string;
  work!: string;
  asAmt!: number;
  tsamt!: number;
  tsDate!: string;
  aadt!: string;
  lProgress!: string;
  progressDT!: string;
  remarks!: string | null; // Remarks can be null
  groupName!: string;
  dashName!: string;
  asPath!: string;
  asLetter!: string;
  asid!: string | null; // asid can be null
  descri!: string;
  fmrcode!: string | null; // fmrcode can be null
  startdt!: string | null; // startdt can be null
  enddt!: string | null; // enddt can be null
  noofcalls!: number;
  tenderno!: string | null; // tenderno can be null
  eprocno!: string | null; // eprocno can be null
  covOpenedDT!: string | null; // covOpenedDT can be null
  topnedpricedt!: string | null; // topnedpricedt can be null
  grantNo!:any;
  totalpaid!:any;
  totalunpaid!:any;

}

//#endregion
//#region AS
export class ASFile{
  id!:number;
  asPath!: string;
  asLetterName!: string;
  filename!: string;
}
export class ASPendingDetails{
  sno!: number;
  asid!: number;
  login_name!: string;
  head!: string;
  letterno!: string;
  asDate!: string;
  totalWorks!: string;
  enteredWorks!: number;
  baltobeEnter!: number;
  totalASAmt!: number;
  enteredTotalAS!: number;
  balanceASAmount!: number;
}
export class ASCompletedDetails{
  sno!: number;
  asid!: number;
  login_name!: string;
  head!: string;
  letterno!: string;
  asDate!: string;
  totalWorks!: string;
  enteredWorks!: number;
  baltobeEnter!: number;
  totalASAmt!: number;
  enteredTotalAS!: number;
  balanceASAmount!: number;
}
export class DivisionWiseASPendingDetails{
  sno!: number;
  id!: string;
  divisionID!: string;
  division!: string;
  login_name!: string;
  head!: string;
  letterno!: string;
  asDate!: string;
  asid!: number;
  totalWorks!: number;
  enteredWorks!: number;
  balanceWork!: number;

}
export class ASEnteredDetails{
  sno!: number;
  work_id!: string;
  division!: string;
  district!: string;
  block_Name_En!: string;
  login_name!: string;
  head!: string;
  letterno!: string;
  asDate!: string;
  workname!: string;
  asAmt!: string;
  asid!: number;



}
//#endregion
//#region Running works
export class RunningWork{
  
  id!: string;
  name!: string;
  totalWorks!:number;
  tvcValuecr!: number;
  paidTillcr!:number;
  grossPendingcr!:number;
}
export class RunningWorkDelay{
  id!: string;
  name!: string;
  totalWorks!:number;
  tvcValuecr!: number;
  paidTillcr!:number;
  grossPendingcr!:number;
  morethanSixMonth!:number;
  d_91_180Days!:number;
  d_1_90Days!:number;
  timeValid!:number;
}
export class  RunningDelayWorksDetails {
  sno!:number;
  work_id!: string;
  letterNo!: string;
  head!: string;
  approver!: string;
  type_name!: string;
  divName_En!: string;
  divisionID!: string;
  district!: string;
  blockname!: string;
  work!: string;
  aaamt!: number;
  tsamt!: number;
  aaDate!: string;
  tsDate!: string;
  acceptanceLetterRefNo!: string;
  acceptLetterDT!: string;
  tvc!: number;
  paidTillLacs!: number;
  grossPendinglacs!: number;
  workorderDT!: string;
  dueDTTimePerAdded!: string;
  delayDays!: number;
  timeAllowed!: number;
  dateOfSanction!: string;
  dateOfIssueNIT!: string;
  tenderReference!: string;
  tType!: string;
  cid!: string;
  contractorNAme!: string;
  regType!: string;
  class!: string;
  englishAddress!: string;
  mobNo!: string;
  lProgress!: string;
  progressDT!: string;
  remarks!: string;
  expcompdt!: string;
  delayreason!: string;
  subengname!: string;
  aeName!: string;
}

//#endregion