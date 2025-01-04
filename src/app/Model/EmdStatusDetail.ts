export class EmdStatusDetail {
    id: number;
    categoryname: string;
    accyear: string;
    schemename: string;
    statusdata: string;
    suppliername: string;
    emd: number;
    isrelease: string;
    realseamount: number;
    releasedate: string;
    chequeno: string;
    chequedt: string;
    fileno: string;
  sno: any;
    
    constructor(
      id: number,
      categoryname: string,
      accyear: string,
      schemename: string,
      statusdata: string,
      suppliername: string,
      emd: number,
      isrelease: string,
      realseamount: number,
      releasedate: string,
      chequeno: string,
      chequedt: string,
      fileno: string,
     
    ) {
      this.id = id;
      this.categoryname = categoryname;
      this.accyear = accyear;
      this.schemename = schemename;
      this.statusdata = statusdata;
      this.suppliername = suppliername;
      this.emd = emd;
      this.isrelease = isrelease;
      this.realseamount = realseamount;
      this.releasedate = releasedate;
      this.chequeno = chequeno;
      this.chequedt = chequedt;
      this.fileno = fileno;
      
    }
  }
  