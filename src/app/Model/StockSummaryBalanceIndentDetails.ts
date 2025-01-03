export class StockSummaryBalanceIndentDetails{
    sno:any
        itemid: number;
        itemcode: string;
        itemname: string;
        strengtH1: string;
        unit: string;
        rcstatus: string;
        ai: number;
        issued: number;
        balanceindent: number;
        issup: string;
        stockper: string;
        readystk: number;
        uqcstk: number;
        totlpipeline: number;


        constructor(itemid: number,
            itemcode: string,
            itemname: string,
            strengtH1: string,
            unit: string,
            rcstatus: string,
            ai: number,
            issued: number,
            balanceindent: number,
            issup: string,
            stockper: string,
            readystk: number,
            uqcstk: number,
            totlpipeline: number){


                this.itemid= itemid,
                this.itemcode=itemcode,
                this.itemname= itemname,
                this.strengtH1=strengtH1,
                this.unit= unit,
                this.rcstatus=rcstatus,
                this.ai=ai,
                this.issued= issued,
                this.balanceindent= balanceindent,
                this.issup=issup,
                this.stockper= stockper,
                this.readystk=readystk,
                this.uqcstk=uqcstk,
                this.totlpipeline=totlpipeline

        }


        
}