export class StockoutSummary{
    warehouseid: number
    warehousename: string
    nosdrugs:number
    stockout: number
    stockoutP: number


    constructor(warehouseid: number,
        warehousename: string,
        nosdrugs:number,
        stockout: number,
        stockoutP: number){

            this.warehouseid=warehouseid,
            this.warehousename=warehousename,
            this.nosdrugs=nosdrugs,
            this.stockout=stockout,
            this.stockoutP=stockoutP

        }
}
