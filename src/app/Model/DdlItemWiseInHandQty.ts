export class DdlItemWiseInHandQty{
        sno:any;
        itemid: number;
        edlitemcode: string;
        inhanD_QTY: number;
        detail: string;
        itemcode: string;
        strengtH1:string;

        constructor(itemid: number,
            edlitemcode: string,
            inhanD_QTY: number,
            detail: string,
            itemcode: string,
            strengtH1:string){

                this.itemid= itemid,
        this.edlitemcode=edlitemcode,
        this.inhanD_QTY=inhanD_QTY,
        this.detail= detail,
        this.itemcode=itemcode,
        this.strengtH1=strengtH1

        }
}