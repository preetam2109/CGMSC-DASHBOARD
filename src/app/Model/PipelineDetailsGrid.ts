export class PipelineDetailsGrid{
    ponoid: number;
    itemid: number;
    suppliername: string;
    phonE1: string;
    email: string;
    itemtypename: string;
    groupname: string;
    itemcode: string;
    itemname: string;
    strengtH1: string;
    edltype: string;
    nablreq: string;
    pono: string;
    soissuedate: string;
    days: string;
    extendeddate: string;
    absqty: string;
    disqty: string;
    expecteddeliverydate: string;
    receiptabsqty: string;
    recper: string;
    ready: string;
    uqc: string;
    st: string;
    pipelineqty: string;
    pipelinevalue: number;
    unit: string;
    progress: any;
    remarks: any;
    entrydate: any;
  
    constructor(
      ponoid: number,
      itemid: number,
      suppliername: string,
      phonE1: string,
      email: string,
      itemtypename: string,
      groupname: string,
      itemcode: string,
      itemname: string,
      strengtH1: string,
      edltype: string,
      nablreq: string,
      pono: string,
      soissuedate: string,
      days: string,
      extendeddate: string,
      absqty: string,
      disqty: string,
      expecteddeliverydate: string,
      receiptabsqty: string,
      recper: string,
      ready: string,
      uqc: string,
      st: string,
      pipelineqty: string,
      pipelinevalue: number,
      unit: string,
      progress: any,
      remarks: any,
      entrydate: any
    ) {
      this.ponoid = ponoid;
      this.itemid = itemid;
      this.suppliername = suppliername;
      this.phonE1 = phonE1;
      this.email = email;
      this.itemtypename = itemtypename;
      this.groupname = groupname;
      this.itemcode = itemcode;
      this.itemname = itemname;
      this.strengtH1 = strengtH1;
      this.edltype = edltype;
      this.nablreq = nablreq;
      this.pono = pono;
      this.soissuedate = soissuedate;
      this.days = days;
      this.extendeddate = extendeddate;
      this.absqty = absqty;
      this.disqty = disqty;
      this.expecteddeliverydate = expecteddeliverydate;
      this.receiptabsqty = receiptabsqty;
      this.recper = recper;
      this.ready = ready;
      this.uqc = uqc;
      this.st = st;
      this.pipelineqty = pipelineqty;
      this.pipelinevalue = pipelinevalue;
      this.unit = unit;
      this.progress = progress;
      this.remarks = remarks;
      this.entrydate = entrydate;
    }
}