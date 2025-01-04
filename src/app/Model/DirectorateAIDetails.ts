export class DirectorateAIDetails{
    sno:any;
        itemid: number;
        groupname: string;
        itemcode: string;
        itemtypename: string; 
        itemname: string; 
        strength1: string;
        unit: string;
        edltype: string;
        dhsai: number;
        poqty: number;
        povalue: number;
        rqty: number;
        rvalue: number;
        rPercentage: number;
        edl: string;
        groupid: number;


        constructor(itemid: number,
            groupname: string,
            itemcode: string,
            itemtypename: string ,
            itemname: string ,
            strength1: string,
            unit: string,
            edltype: string,
            dhsai: number,
            poqty: number,
            povalue: number,
            rqty: number,
            rvalue: number,
            rPercentage: number,
            edl: string,
            groupid: number
    ){


        this.itemid=itemid,
        this.groupname=groupname,
        this.itemcode=itemcode
        this.itemtypename=itemtypename ,
        this.itemname=itemname ,
        this.strength1= strength1,
        this.unit=unit,
        this.edltype= edltype,
        this.dhsai= dhsai,
        this.poqty=poqty,
        this.povalue=povalue,
        this.rqty=rqty,
        this.rvalue=rvalue,
        this.rPercentage=rPercentage,
        this.edl=edl,
        this.groupid=groupid


        }
}