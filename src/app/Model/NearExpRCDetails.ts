export class NearExpRCDetails{

    itemid: number;
    itemcode: string;
    itemname: string;
    strength1: string;
    unit: string;
    basicrate: number;
    gst: number;
    finalrategst: number;
    rcStart: string;
    rcEndDT: string;

    constructor(itemid: number,
    itemcode: string,
    itemname: string,
    strength1: string,
    unit: string,
    basicrate: number,
    gst: number,
    finalrategst: number,
    rcStart: string,
    rcEndDT: string){

        this.itemid=itemid,
        this.itemcode=itemcode,
        this.itemname=itemname,
        this.strength1= strength1,
        this.unit=unit,
        this.basicrate=basicrate,
        this.gst=gst,
        this.finalrategst=finalrategst,
        this.rcStart= rcStart,
        this.rcEndDT=rcEndDT

    }
}