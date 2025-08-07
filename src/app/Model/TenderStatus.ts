export class TenderStagesTotal{
    status!: string;
    noTenders!: number;
    onOfItems!: number;
    tenderValue!:number;
}
export class TotalRC1{
    mcid!: number;
    mcategory!: string;
    edl!: number;
    nedl!: number;
    total!: number;
    medl!: number;
    mnedl!: number;
    mtotal!: number;
    

}
export class TotalRC1Details{
    
    itemcode!: string;
    itemname!: string;
    strength1!: string;
    unit!: string;
    suppliername!: string;
    basicrate!: number;
    gst!: number;
    finalrategst!: number;
    rcStart!: string;
    rcEndDT!: string;
    itemid!: number;
}

export class StatusDetail{
        sno:any;
        categoryName!: string;
        schemeCode!: string;
        schemeName!: string;
        eprocNo!: number;
        startDt!: string;
        actClosingDt!: string;
        noOfItems!: number;
        itemAEDL!: number;
        cov_A_Opdate!: string;
        dA_DATE!: string;
        coV_B_OPDATE!: string;
        pricebiddate!: string;
        noof_Bid_A!: number;
        noofItemsCountA!: number;
        noofItemsCountAEDL!: number;
        webId!: number;
        status!: string;
        priceNotAccpt_Reject!: string;
        schemeId!: number;
        statusId!: number;
        remarksData!: string;
        prc!: number;
        preBidEndDt!: string;
        tenderValue!: string;
        tenderremark!:string;
        remarkEntryDate!:string;


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
        indValue!:string;
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
export class NoOfBidders{
    sno:any;
    schemeId!: number;
    schemeCode!: string;
    schemeName!: string;
    supplierId!: number;
    supplierName!: number;
    contactPerson!: string;
    address!: string;
    phone1!: number;
    phone2!: number;
    email!: string;
    noOfItems!: number;
}
export class HOTender{
    schemeId!: number;
        schemeName!: string;
        hod!: string;
        letterNo!: number;
        letterDate!: string;
        remarks!: string;
        sendDate!: string;
        entryDate!: string;
        fileName!: string;
        filePath!: string;
        convId!: number;
        recvDate!: number;
        replyLetterNo!: string;
        replyLetterDT!: string;
        replyRemarks!: string;
        replyFileName!: string;
        replyFilePath!: string;
}