export class InitiatedNotIssueSummary{

            fromwarehouseid: number;
            nostowh: number;
            nositems: number;
            towhstockout: number;
            nostno: number;
            avgdaysdel: number;
            fromwarehousename: string;

            constructor(fromwarehouseid: number,
                nostowh: number,
                nositems: number,
                towhstockout: number,
                nostno: number,
                avgdaysdel: number,
                fromwarehousename: string
    )
    
    {
        this.fromwarehouseid=fromwarehouseid,
        this.nostowh= nostowh,
        this.nositems= nositems,
        this.towhstockout= towhstockout,
        this.nostno= nostno,
        this.avgdaysdel= avgdaysdel,
        this.fromwarehousename= fromwarehousename




            }
}