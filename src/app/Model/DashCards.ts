
export class DeliveryInMonthconst {
    nooffacIndented!: number;
    nosindent!: number;
    indentIssued!: number;
    dropindentid!: number;
    dropfac!: number;
}

export class Last7DaysIssue{
    nositems: number | undefined;
        indentDT: string | undefined;
        indentdate: string | undefined;
        totalValuecr: number | undefined;
        nosfacility: number | undefined;
}

export class Last7DaysReceipt{
    nosPO!: number;
        nositems!: number;
        receiptdate!: string;
        receiptDT!: string;
        rvalue!: number;
}

export class POCountCFY{
    id!: number;
    totalpoitems!: number;
    dhspoitems!: number;
    dhspovalue!: number;
    dhsrecvalue!: number;
    dmepoitems!: number;
    dmepovalue!: number;
    dmerecvalue!: number;
    totalpovalue!: number;
    totalrecvalue!: number;
    accyrsetid!: number;
    shaccyear!: string;
}

export class IndentcntHome{

    hod!: string;
    nositems!: number;
    returned!: number;
    actualAI!: number;

}

export class StockoutPer{

    edLtypeid!: string;
    edLtpe!: string;
    nositems!: number;
    stockout!: number;
    stockin!: number;
    stockoutp!: number;

}
export class NearExp{

    mm!: string;
    monthname!: string;
    mname!: string;
    nositems!: number;
    nosbatches!: number;
    stkvaluEcr!: number;

}

export class QCPendingHomeDash{

    mcategory!:string
    nositems!: number;
    nosbatch!: number;
    stkvalue!: number;

}

export class QCPendingPlace{
    nositems!: number;
    stkvalue!: number;
    nosbatch!: number;
    qdIssuePendingbyWH!: number;
    whIssueButPendingInCourier!: number;
    hoqC_LabIssuePending!: number;
    dropPendingToLab!: number;
    pendingforfinalUpdate!: number;
    labAnalysisOngoing!: number;
}

export class QCPendingAreaDetail{
    itemid!: number;
    itemcode!: string;
    itemtypename!: string;
    itemname!: string;
    strength1!: string;
    batchno!: string;

    noswh!: number;
    uqcqty!: number;
    analysisDays!: number;

    warehouseRecDT!: string;
    whqcIssueDT!: string;
    courierPickDT!: string;
    sampleReceiptInHODT!: string;
    labissuedate!: string;
    lAbReceiptDT!: string;
    hoqcReportRecDT!: string;
    labresult!: string;
  
}
export class QCFinalResultPending
{
    id!: number;
    mcid!: number;
    nositems!: number;
    nosbatch!: number;
    uqcvalue!: number;
    mcategory!: string;
    timeline!: string;
    exceddedsincetimeline!: string;
    exceddedsincetimelinE1!: string;

 
}

export class QCLabPendingTimeline{

    id!: number;
    mcid!: number;
    mcategory!: string;
    nositems!: number;
    nosbatch!: number;
    uqcValuecr!: number;
    timePara!: string;
    timeParaValue!: string;
    timeline!: string;

}

export class QCPendingItems{
    itemid!: number;
    nameText!: string;
    itemname!: string;
    mcid!: number;
}

export class QCPendingParticularArea{
    itemid!: number;
    itemcode!: string;
    itemtypename!: string;
    itemname!: string;
    strength1!: string;
    batchno!: string;
    noswh!: number;
    uqcqty!: number;
    stockvalue!: number;
    warehouseRecDT!: string;
    whqcIssueDT!: string;
    courierPickDT!: string;
    sampleReceiptInHODT!: string;
    labissuedate!: string;
    lAbReceiptDT!: string;
    hoqcReportRecDT!: string;
    labresult!: string;
    analysisDays!: number;
}

export class QCResultPendingLabWise{
        labid!: number;
        labname!: string;
        withBatches!: number;
        outBatches!: number;
        withvalue!: number;
        outvalue!: number;
        outPer!: number;
}


  
