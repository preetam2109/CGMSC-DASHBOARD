export class IndentPendingWHSummary{
    warehouseid: number;
    warehousename: string;
    nosindent: number;
    dmefac: number;
    ayush: number;
    dhs: number;
    per: number

    constructor(warehouseid: number,
        warehousename: string,
        nosindent: number,
        dmefac: number,
        ayush: number,
        dhs: number,
        per: number){

            this.warehouseid= warehouseid;
            this.warehousename= warehousename;
            this.nosindent= nosindent;
            this.dmefac= dmefac;
            this.ayush= ayush;
            this.dhs= dhs;
            this.per= per   

    }
}