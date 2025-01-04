export class NearExpReport{
    expirymonth: string
    expirymontH1: string
    noofitems: number
    noofbatches: number
    nearexpvalue: number;

    constructor(expirymonth: string,expirymontH1: string,noofitems: number,noofbatches: number,nearexpvalue: number){
        this.expirymonth= expirymonth
        this.expirymontH1= expirymontH1
        this.noofitems= noofitems
        this.noofbatches= noofbatches
        this.nearexpvalue= nearexpvalue
    }
}