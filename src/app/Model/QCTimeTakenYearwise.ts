export class QCTimeTakenYearwise{
    accyrsetid: number;
    accyear: string;
    pOnositems: number;
    totalsample: number;
    qctimetaken: number;

    constructor(accyrsetid: number,
        accyear: string,
        pOnositems: number,
        totalsample: number,
        qctimetaken: number){

            this.accyrsetid=accyrsetid,
    this.accyear=accyear,
    this.pOnositems=pOnositems,
    this.totalsample=totalsample,
    this.qctimetaken= qctimetaken

    }
    
    

}

export class nsqDrugDetails{
sno:any;
    itemCode!: string;
    itemName!: string;
    batchNo!: string;
    mfgDate!: string;
    expDate!: string;
    stock!: number;
    finalRate!: number;
    stkValue!: number;

}