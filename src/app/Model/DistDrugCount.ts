export class DistDrugCount{
    districtid: number
    districtname: string
    edl: number
    nedl: number
    total: number

    constructor(districtid: number,
        districtname: string,
        edl: number,
        nedl: number,
        total: number){

            this.districtid=districtid,
            this.districtname=districtname,
            this.edl=edl,
            this.nedl=nedl,
            this.total=total

    }
}