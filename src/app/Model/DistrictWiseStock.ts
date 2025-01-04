export class DistrictWiseStock{
    districtid: number;
    districtname: string;
    cntedl: number;
    cntnonedl: number

    constructor(districtid: number,
        districtname: string,
        cntedl: number,
        cntnonedl: number){

            this.districtid= districtid,
            this.districtname= districtname,
            this.cntedl=cntedl,
            this.cntnonedl= cntnonedl

    }
}