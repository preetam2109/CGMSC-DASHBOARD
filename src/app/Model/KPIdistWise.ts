export class KPIdistWise{
    sno:any;
    districtid: number;
    districtname: string;
    target: number;
    achivement: number;
    per: number;
    opstock: number;

    constructor(districtid: number,
        districtname: string,
        target: number,
        achivement: number,
        per: number,
        opstock: number){

            this.districtid= districtid,
            this.districtname= districtname,
            this.target= target,
            this.achivement= achivement,
            this.per= per,
            this.opstock= opstock

    }
}