export class dispatchPendingSummary{
    supplier_id: number;
    supplier: string;
    nositems: number;
    nospo: number;
    pvalue:number ;

    constructor(supplier_id: number,
        supplier: string,
        nositems: number,
        nospo: number,
        pvalue:number ,
    ){
        this.supplier_id=supplier_id
        this.supplier=supplier
        this.nositems=nositems
        this.nospo=nospo
        this.pvalue=pvalue
    }
}