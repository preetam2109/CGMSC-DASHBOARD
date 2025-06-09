export class TotalTendersByStatus{
    csid!: number;
    cStatus!: string;
    noofTender!: number;
    tenderValue!: number;
}
export class TenderDetail{  
    sno:any;
    tendeR_ID!: number;
    tendeR_NO!: string;
    tendeR_DATE!: string;
    tender_description!: string;
    tenderStatus!: string;
    tenderRemark!: string;
    noOfItems!: number;
    tenderValue!: number;  
}
export class TenderInfraDetails{
    pGroupID!: number;
    tenderStatus!: string;
    nosTender!: number;
    nosWorks!: number;
    totalValuecr!: number;
    ppid!: number
}
export class TenderInfraDetailsZonal{
    tid: number | undefined;
    tenderStatus: string | undefined;
    cntTender: number | undefined;
}


export class GetConsTenderStatusDetail{
sno:any;
tenderStatus!: string;
workName!: string;
tenderNo!: number;
eprocNo!: number;
asAmt!: number;
tsAmount!: number;
startDt!: string;
endDate!: string;
noOfCalls!: number;
coverADT!: string;
coverBDT!: number;
coverCDT!: string;
tstatus!: string;
pGroupID!: number;
tenderID!: number;
rejId!: number;

}


export class ZonalTenderStatusDetail{
        sno:any;
        tenderID: number | undefined;
        tenderNo!: number;
        eProcNo!: number;
        discription!: string;
        startDT!: string;
        endDT!: string;
        capacity!: number;
        zonalType!: string;
        district!: string;
        block!: string;
        districtID!: number;
        nagarNigam!: string;
        calls!: number;
        tenderstatus!: string;
        tenderremark!: string;
        entrydate!: string;
        coverA!: string;
        coverC!: string;
}

export class GetToBeTender{
    sno:any;
    head!: string;
    division!: string;
    district!: string;
    work_id!: string;
    workname!: string;
    asLetterNO!: string;
    asDate!: string;
    asAmt!: number;
    tsAmount!: number;
    valueWorks!: number;
    workStatus!: string;
}