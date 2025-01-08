
export class DashProgressCount{
    did: number | undefined;
    dashname: string | undefined;
    nosworks: number | undefined ;
}
export class GetDistrict{
    districT_ID: number | undefined;
    districtname: string | undefined;
    diV_ID: number | undefined ;
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
  
export class DashProgressDistCount{

     district_ID !:  number ; 
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
export class WorkFill{

    worK_ID: string | undefined;
    head!: string;
    district!: string;
    block_Name_En!: string | null;
    aadt!: string;
    searchname!: string;
}

export class WorkDetails {
    work_id!: string;
    head!: string;
    subengname!: string;
    desig!: string;
    grantname!: string;
    letterNo!:string;
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
    sr!:any;
    imageName!:any;
    imageName1!:any;
    imageName2!:any;
    imageName3!:any;
    imageName4!:any;
    ismongo!:any;
    progressEnterby!:any;
    progressEntryTime!:any;
    nonMongoImage!:any;
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
  export class WOpendingTotal {
    id!: string;
    name!: string;
    pendingWork!: string;
    contrctValuecr!: number;
    noofWorksGreater7Days!: string;
   
  }
  export class WOpendingScheme{
    id!: string;
    name!: string;
    pendingWork!: string;
    contrctValuecr!: number;
    noofWorksGreater7Days!: string;
   
  }
  export class HandoverAbstractDateBY{
    id!: string;
    name!: string;
    totalWorks!: number;
    tvcValuecr!: number;
    avgMonthTaken!: number;
   
  }
  export class HandoverAbstractWithoutDate{
    id!: string;
    name!: string;
    totalWorks!: number;
    tvcValuecr!: number;
    avgMonthTaken!: number;
   
  }
  export class DistrictEngAllotedWorks{
  id!: string ;
  districtID!: string;
  empid!: string;
  engName!: string;
  districtName!: string;
  totalWorks!: number;
  tvcValuecr!: number;
  running!: number;
  woIssue!: number;
  ladissue!: number;

  
  }
  export class AEDistrictEngAllotedWorks{
  id!: string ;
  districtID!: string;
  empid!: string;
  engName!: string;
  districtName!: string;
  totalWorks!: number;
  tvcValuecr!: number;
  running!: number;
  woIssue!: number;
  ladissue!: number;
  }
  export class SbuEngAllotedWorks{
  id!: string ;
  empid!: string;
  engName!: string;
  name!: string;
  totalWorks!: number;
  tvcValuecr!: number;
  running!: number;
  woIssue!: number;
  ladissue!: number;
  }
  export class AEEngAllotedWorks{
  id!: string ;
  empid!: string;
  engName!: string;
  name!: string;
  totalWorks!: number;
  tvcValuecr!: number;
  running!: number;
  woIssue!: number;
  ladissue!: number;


  }
  export class WorkOrderPendingDetailsNew {
    
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
    asPath!: string | null;
    asLetter!: string | null;
    groupName!: string;
    lProgress!: string;
    pdate!: string;
    pRemarks!: string;
    remarks!: string | null;
    tenderReference!: string;
    sno!: number;

  }