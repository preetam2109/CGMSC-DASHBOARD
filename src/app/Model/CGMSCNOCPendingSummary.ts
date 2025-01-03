export class CGMSCNOCPendingSummary{
    sno?:number
    nocid: number;
    facilityid: number;
    nositems: number;
    nocnumber: string;
    cmhoforwarddt: string;
    facilityname: string;
    districtname: string;
  
    constructor(
      nocid: number,
      facilityid: number,
      nositems: number,
      nocnumber: string,
      cmhoforwarddt: string,
      facilityname: string,
      districtname: string
    ) {
      this.nocid = nocid;
      this.facilityid = facilityid;
      this.nositems = nositems;
      this.nocnumber = nocnumber;
      this.cmhoforwarddt = cmhoforwarddt;
      this.facilityname = facilityname;
      this.districtname = districtname;
    }
  
}