export class TenderStagesTotal{
    status!: string;
    noTenders!: number;
    onOfItems!: number;
}
export class TotalRC1{
    mcid!: number;
    mcategory!: string;
    edl!: number;
    nedl!: number;
    total!: number;
}
export class StatusDetail{
    sno:any;
    categoryname!: string;
        schemecode!: string;
        schemename!: string;
        eprocNo!: number;
        startdt!: string;
        actclosingdt!: string;
        noofitems!: number;
        itemaedl!: number;
        coV_A_OPDATE!: string;
        dA_DATE!: string;
        coV_B_OPDATE!: string;
        pricebiddate!: string;
        nooF_BID_A!: number;
        noofitemscounta!: number;
        noofitemscountaedl!: number;
        webid!: number;
        status!: string;
        pricenotaccpT_REJECT!: string;
        schemeid!: number;
        statusid!: number;
        remarksdata!: string;
        prc!: number;
        prebidenddt!: string;
}
export class StatusItemDetail{
    sno:any;
    tid!: number;
        itemCode!: string;
        itemName!: string;
        strength!: number;
        unit!: string;
        isEdl2021!: string;
        priceFlag!: string;
        toNoOfParticipant!: number;
        l1Basic!: string;
}
export class TotalTender{
    sno:any;
    categoryName!: string;
        schemeCode!: string;
        schemeName!: string;
        startDt!: string;
        endDate!: string;
        noOfItems!: number;
        noOf_Bid_A!: number;
        tenderStatus!: string;
        tenderRemark!: string;
        statusEntryDate!: string;
}