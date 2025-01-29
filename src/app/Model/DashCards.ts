
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