export class IWHPiplineSummary{
    towarehouseid: number;
    noSwhiSSUED: number;
    nositems: number;
    towhstockout: number;
    avgDaysDel: number;
    towarehousename: string;

    constructor(towarehouseid: number,
        noSwhiSSUED: number,
        nositems: number,
        towhstockout: number,
        avgDaysDel: number,
        towarehousename: string)
        {
            this.towarehouseid= towarehouseid,
            this.noSwhiSSUED= noSwhiSSUED,
            this.nositems= nositems,
            this.towhstockout= towhstockout,
            this.avgDaysDel= avgDaysDel,
            this.towarehousename= towarehousename

        }
}