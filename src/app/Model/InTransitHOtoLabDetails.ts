export class InTransitHOtoLabDetails{
    id: string;
  labname: string | null;
  mcategory: string;
  itemcode: string;
  qcdayslab: string | null;
  sampleno: string;
  itemname: string;
  batchno: string;
  docketno: string | null;
  labissuedate: string;
  entrydatepick: string | null;
  dropdate: string | null;
  expdate: string;
  rqty: number;
  dayssinceundercourier: number;
  whReceiptDate: string;
  qcReceiptDT: string;
  delayparA1: string;
  mcid: number;
  itemid: number;
  labid: string | null;

  // Constructor to initialize the values
  constructor(
    id: string,
    labname: string | null,
    mcategory: string,
    itemcode: string,
    qcdayslab: string | null,
    sampleno: string,
    itemname: string,
    batchno: string,
    docketno: string | null,
    labissuedate: string,
    entrydatepick: string | null,
    dropdate: string | null,
    expdate: string,
    rqty: number,
    dayssinceundercourier: number,
    whReceiptDate: string,
    qcReceiptDT: string,
    delayparA1: string,
    mcid: number,
    itemid: number,
    labid: string | null
  ) {
    this.id = id;
    this.labname = labname;
    this.mcategory = mcategory;
    this.itemcode = itemcode;
    this.qcdayslab = qcdayslab;
    this.sampleno = sampleno;
    this.itemname = itemname;
    this.batchno = batchno;
    this.docketno = docketno;
    this.labissuedate = labissuedate;
    this.entrydatepick = entrydatepick;
    this.dropdate = dropdate;
    this.expdate = expdate;
    this.rqty = rqty;
    this.dayssinceundercourier = dayssinceundercourier;
    this.whReceiptDate = whReceiptDate;
    this.qcReceiptDT = qcReceiptDT;
    this.delayparA1 = delayparA1;
    this.mcid = mcid;
    this.itemid = itemid;
    this.labid = labid;
}
}