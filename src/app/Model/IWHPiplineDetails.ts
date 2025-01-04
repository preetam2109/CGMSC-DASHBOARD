export class IWHPiplineDetails{
    transferitemid: number;
    itemcode: string;
    itemname: string;
    unit: string;
    transferdate: string; // You can use Date type if needed
    transferqty: number;
    transferno: string;
    fromwarehousename: string;
    fromwhcstock: number;
    fromwhuqc: number;
    towarehousename: string;
    towhcstock: number;
    towhuqc: number;
    whIssUedDT: string; // Consider Date type if necessary
    whissueqty: number;
    pendingsince: number;
    fromwarehouseid: number;
    towarehouseid: number;
    itemid: number;
    mcategory: string;
    towhstockout: string; // Use boolean if appropriate
  
    constructor( transferitemid: number,
        itemcode: string,
        itemname: string,
        unit: string,
        transferdate: string, // You can use Date type if needed
        transferqty: number,
        transferno: string,
        fromwarehousename: string,
        fromwhcstock: number,
        fromwhuqc: number,
        towarehousename: string,
        towhcstock: number,
        towhuqc: number,
        whIssUedDT: string, // Consider Date type if necessary
        whissueqty: number,
        pendingsince: number,
        fromwarehouseid: number,
        towarehouseid: number,
        itemid: number,
        mcategory: string,
        towhstockout: string,) {
      this.transferitemid = transferitemid;
      this.itemcode = itemcode;
      this.itemname = itemname;
      this.unit = unit;
      this.transferdate = transferdate;
      this.transferqty = transferqty;
      this.transferno = transferno;
      this.fromwarehousename = fromwarehousename;
      this.fromwhcstock = fromwhcstock;
      this.fromwhuqc = fromwhuqc;
      this.towarehousename = towarehousename;
      this.towhcstock = towhcstock;
      this.towhuqc = towhuqc;
      this.whIssUedDT = whIssUedDT;
      this.whissueqty = whissueqty;
      this.pendingsince = pendingsince;
      this.fromwarehouseid = fromwarehouseid;
      this.towarehouseid = towarehouseid;
      this.itemid = itemid;
      this.mcategory = mcategory;
      this.towhstockout = towhstockout;
    }
}