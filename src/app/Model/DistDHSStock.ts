export class DistDHSStock{
        facilityid: number;
        facilityname: string;
        edlstock: number;
        nedlstock: number;
        totalstock: number;


        constructor(facilityid: number,
            facilityname: string,
            edlstock: number,
            nedlstock: number,
            totalstock: number
    ){

        this.facilityid=facilityid,
        this.facilityname=facilityname,
        this.edlstock=edlstock,
        this.nedlstock=nedlstock,
        this.totalstock=totalstock

        }
}