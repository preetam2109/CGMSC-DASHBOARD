export class InitiatedNotIssueDetaqils{
    sno?:number;
    transferitemid: number;
  itemcode: string;
  itemname: string;
  unit: string;
  initiateddt: string; // You can change the type to Date if you're parsing this as a date.
  transferqty: number;
  transferno: string;
  fromwarehousename: string;
  fromwhCstock: number;
  fromWHUQC: number;
  towarehousename: string;
  towhCstock: number;
  toWHUQC: number;
  pendingsince: number;
  fromwarehouseid: number;
  towarehouseid: number;
  itemid: number;
  categoryid: number;
  towhstockout: string; // Boolean might also be used here if "Yes"/"No" can be converted.

  constructor( transferitemid: number,
    itemcode: string,
    itemname: string,
    unit: string,
    initiateddt: string, // You can change the type to Date if you're parsing this as a date.
    transferqty: number,
    transferno: string,
    fromwarehousename: string,
    fromwhCstock: number,
    fromWHUQC: number,
    towarehousename: string,
    towhCstock: number,
    toWHUQC: number,
    pendingsince: number,
    fromwarehouseid: number,
    towarehouseid: number,
    itemid: number,
    categoryid: number,
    towhstockout: string,) {
    this.transferitemid = transferitemid;
    this.itemcode = itemcode;
    this.itemname = itemname;
    this.unit = unit;
    this.initiateddt = initiateddt;
    this.transferqty = transferqty;
    this.transferno = transferno;
    this.fromwarehousename = fromwarehousename;
    this.fromwhCstock = fromwhCstock;
    this.fromWHUQC = fromWHUQC;
    this.towarehousename = towarehousename;
    this.towhCstock = towhCstock;
    this.toWHUQC = toWHUQC;
    this.pendingsince = pendingsince;
    this.fromwarehouseid = fromwarehouseid;
    this.towarehouseid = towarehouseid;
    this.itemid = itemid;
    this.categoryid = categoryid;
    this.towhstockout = towhstockout;
  }
}