export class Diswise_Issuance {
    districtid: number;
    districtname: string;
    totalissueitems: number;
    dhsissueitems: number;
    dmeissueitems: number;
    ayIssueitems: number;
    totalissuevalue: number;
    dhsissuevalue: number;
    dmeissuevalue: number;
    ayissueval: number;

    constructor( districtid: number,
        districtname: string,
        totalissueitems: number,
        dhsissueitems: number,
        dmeissueitems: number,
        ayIssueitems: number,
        totalissuevalue: number,
        dhsissuevalue: number,
        dmeissuevalue: number,
        ayissueval: number){

            this.districtid=districtid,
            this.districtname= districtname,
            this.totalissueitems= totalissueitems,
            this.dhsissueitems=dhsissueitems,
            this.dmeissueitems=dmeissueitems,
            this.ayIssueitems=ayIssueitems,
            this.totalissuevalue=totalissuevalue,
            this.dhsissuevalue=dhsissuevalue,
            this.dmeissuevalue=dmeissuevalue,
            this.ayissueval=ayissueval

    }
}