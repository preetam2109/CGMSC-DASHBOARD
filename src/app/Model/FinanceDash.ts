export class Pipeline_Libilities{
        id!: 1;
        name!: string;
        nositems!: number;
        nospo!: number;
        pipeLIvalue!: number;
}

export class FundReivedBudgetDetails{
        receiveddate!: string;
        accyrsetid!: number;
        recAmt!: number;
        recCr!: number;
}
export class FundReivedBudgetID{
        accyrsetid!: number;
        accyear!: string;
        recAmt!: number;
        refund!: number;
        adjust!: number;

        // "aifinyear": 542,
        // "accyear": "2022-2023",
        // "noofItem": 272,
        // "noofPO": 581,
        // "poValue": 154.85,
        // "recValue": 146.21,
        // "totalpaid": 146.07
}

export class GrossPaidDateWiseDetails{
        ponoid!: number;
        itemcode!: string;
        itemname!: string;
        finalrategst!: number;
        budgetname!: string;
        suppliername!: string;
        pono!: string;
        podate!: string;
        orderedqty!: number;
        pOvalue!: number;
        receiptdate!: string;
        rqty!: number;
        rValue!: number;
        chequeDT!: string;
        grossPaid!: number;
        admin!: number;
        chequeNo!: number;
        budgetid!: number;
        schemename!: string;
        SANCTIONDATE!: string;
        IndentYear!: string;
        PROGRAM!: string;
        strength1!: string;
        unit!: string;
        FMRCODE!: string;
        
}

export class PODetailsAgainstIndentYr{
        aifinyear!: number;
        accyear!: string;
        noofItem!: number;
        noofPO!: number;
        poValue!: number;
        recValue!: number;
        totalpaid!: number;
}





