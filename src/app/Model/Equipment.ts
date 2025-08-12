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
    tenderstatus!: string;
    tenderremark!: string;
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
export class EqptobeTender{
    cntItems!: number;
    indentValue!: number;
}
export class EqToBeTenderDetail{
    indenT_CONSOLIDATION_ID!: number;
    indent_con_no!: number;
    consolidateD_DATE!: string;
    description!: number;
    item_id!: number;
    indent_cons_items_id!: number;
    item_code!: number;
    item_code_as_per_tender!: string;
    item_name!: string;
    item_desc!: number;
    proposeD_QTY!: number;
    finaL_QTY!: number;
    indentValue!: number;
    year!: string;
    useR_ID!: number;
    directoratE_ID!: number;
    financiaL_YEAR_ID!: number;
    facility_aut_name!: string;
    facility_aut_code!: string;
    eStatus!: string;
    uploadStatus!: string;
    createdOn!: string;
}
export class CoverStatus{
    csid!: number;
    cStatus!: string;
    cntTender!: number;
    tValue!: number;
}
export class CoverStatusDetail{
    sno:any;
    csid!: number;
    tender_id!: number;
    isGemTender!: string;
    tender_no!: string;
    tender_description!: string;
    tender_date!: string;
    endDate!: string;
    cover_a!: string;
    cover_b!: string;
    cStatus!: string;
    cntItems!: number;
    tenderValue!: number;
    tenderstatus!: string;
    tenderremark!: string;
    entrydate!: string;
}
export class CoverStatusTenderDetail{
        sno:any;
        tender_id!: number;
        item_ID!: number;
        categoryName!: string;
        item_code!: string;
        item_Name!: string;
        estimated_cost!: string;
        tender_quantity!: number;
        tenderValue!: string;
}

export class TobetenderDetails{
        itemcode!: number;
        itemname!: string;
        strength!: string;
        unit!: string;
        edl!: string;
        dhsIndnetQty!: number;
        dhsaiValue!: number;
        dmeIndentQty!: number;
        dmeaiValue!: number;
        totalIndentQty!: number;
        totalAIValue!: number;
        schemecode!: number;
        schemename!: string;
        tenderref!: number;
}

export class SchemeTenderStatus{
        sno:any
        schemeid!: number;
        schemename!: string;
        tenderstatus!: string;
        tenderremark!: string;
        entrydate!: string;
        tsid!: number;
}
export class SchemeReceived{
    schemeid!: number;
    schemename!: string;
    facilitytypecode!: string;
    letterno!: number;
    letterdate!: string;
    remarks!: string;
    senddate!: string;
    entrydate!: string;
    filename!: string;
    filepath!: string;
    convid!: number;
    conrid!: number;
    recvdate!: string;
    recvletterno!: string;
    recvletterdt!: string;
    recvremark!: string;
    recvfilename!: string;
    recvfilepath!: string;
    recventrydate!: string;
}
export class ToBeTenderBifurcation{
        tremarkID!: number;
        tobetenderstatus!: string;
        noOfWork!: number;

}

export class ToBeTenderBifurcationDetail{
    head!: string;
        divisionID!: string;
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
        tremarkID!: number;
        tRemarks!: string;
        remarkDT!: string;
        remarks!: string
}



