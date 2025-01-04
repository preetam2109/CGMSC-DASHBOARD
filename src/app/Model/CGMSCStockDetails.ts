export class CGMSCStockDetails{
    sno: number;
    itemid: number;
    itemcode: string;
    itemname: string;
    strengtH1: string;
    sku: string;
    edlcat: string;
    edl: string;
    readyforissue: number;
    pending: number;
    totlpipeline: number;
    edltype: string;
    groupname: string;
    itemtypename: string;
    issuedfy:number;
  
    constructor(
      sno: number ,
      itemid: number,
      itemcode: string,
      itemname: string,
      strengtH1: string,
      sku: string,
      edlcat: string,
      edl: string,
      readyforissue: number,
      pending: number,
      totlpipeline: number,
      edltype: string,
      groupname: string,
      itemtypename: string,
      issuedfy:number
    ) {
      this.sno=sno;
      this.itemid = itemid;
      this.itemcode = itemcode;
      this.itemname = itemname;
      this.strengtH1 = strengtH1;
      this.sku = sku;
      this.edlcat = edlcat;
      this.edl = edl;
      this.readyforissue = readyforissue;
      this.pending = pending;
      this.totlpipeline = totlpipeline;
      this.edltype = edltype;
      this.groupname = groupname;
      this.itemtypename = itemtypename;
      this.issuedfy=issuedfy;
    }
}