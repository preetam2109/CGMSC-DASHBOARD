export class CGMSCNOCPendingDetails{
    sno?:number
    sr: number;
    facilityname: string;
    itemcode: string;
    itemname: string;
    strengtH1: string | null;
    unit: string;
    cmhoForwardDT: string;
    appliedqty: number;
    cmhoaprqty: number;
    readywh: number;
    uqcwh: number;
    transferqty: number | null;
    uqcTotal: number;
    totalreadycgmsc: number;
    tdate: string | null;
    districtname: string;
    nocnumber: string;
    nocid: number;
    facilityid: number;
  
    constructor(
      sr: number,
      facilityname: string,
      itemcode: string,
      itemname: string,
      strengtH1: string | null,
      unit: string,
      cmhoForwardDT: string,
      appliedqty: number,
      cmhoaprqty: number,
      readywh: number,
      uqcwh: number,
      transferqty: number | null,
      uqcTotal: number,
      totalreadycgmsc: number,
      tdate: string | null,
      districtname: string,
      nocnumber: string,
      nocid: number,
      facilityid: number
    ) {
      this.sr = sr;
      this.facilityname = facilityname;
      this.itemcode = itemcode;
      this.itemname = itemname;
      this.strengtH1 = strengtH1;
      this.unit = unit;
      this.cmhoForwardDT = cmhoForwardDT;
      this.appliedqty = appliedqty;
      this.cmhoaprqty = cmhoaprqty;
      this.readywh = readywh;
      this.uqcwh = uqcwh;
      this.transferqty = transferqty;
      this.uqcTotal = uqcTotal;
      this.totalreadycgmsc = totalreadycgmsc;
      this.tdate = tdate;
      this.districtname = districtname;
      this.nocnumber = nocnumber;
      this.nocid = nocid;
      this.facilityid = facilityid;
    }
}