export class GetRaisedPicks{
    warehousename: string;
        qdocketno: number;
        indentdate: string;
        nousitems: number;
        warehouseid: number;
        indentid: number;
        indentno: string;
        sno?:number

        constructor(warehousename: string,
            qdocketno: number,
            indentdate: string,
            nousitems: number,
            warehouseid: number,
            indentid: number,
            indentno: string){

                this.warehousename= warehousename,
                this.qdocketno= qdocketno,
                this.indentdate= indentdate,
                this.nousitems= nousitems,
                this.warehouseid= warehouseid,
                this.indentid= indentid,
                this.indentno= indentno

        }
}