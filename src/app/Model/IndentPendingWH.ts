export class IndentPendingWH{
    nocnumber: string;
    warehousename: string;
    facilityname: string;
    nositems: number;
    inddt: string;
    pendingday: number;
    per: string;
    dmefac: number;
    ayush: number;
    dhs: number;
    sno: number;

    constructor(nocnumber: string,
        warehousename: string,
        facilityname: string,
        nositems: number,
        inddt: string,
        pendingday: number,
        per: string,
        dmefac: number,
        ayush: number,
        dhs: number,
        sno:number){

    this.nocnumber= nocnumber,
    this.warehousename= warehousename,
    this.facilityname= facilityname,
    this.nositems= nositems,
    this.inddt= inddt,
    this.pendingday= pendingday,
    this.per= per,
    this.dmefac= dmefac,
    this.ayush= ayush,
    this.dhs= dhs,
    this.sno=sno

    }
}