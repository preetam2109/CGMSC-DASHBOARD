export class ReagIndentIssueDetails {
  nocid: number;
  mmid: number;
  warehousename: string;
  districtname: string;
  facilityname: string;
  eqpname: string;
  make: string;
  model: string;
  indentdt: string;
  whissuedate: string;
  nositems: number;
  indentvalue: number;
  sno: any;

  constructor(
    nocid: number,
    mmid: number,
    warehousename: string,
    districtname: string,
    facilityname: string,
    eqpname: string,
    make: string,
    model: string,
    indentdt: string,
    whissuedate: string,
    nositems: number,
    indentvalue: number
  ) {
    this.nocid = nocid;
    (this.mmid = mmid),
      (this.warehousename = warehousename),
      (this.districtname = districtname),
      (this.facilityname = facilityname),
      (this.eqpname = eqpname),
      (this.make = make),
      (this.model = model),
      (this.indentdt = indentdt),
      (this.whissuedate = whissuedate),
      (this.nositems = nositems),
      (this.indentvalue = indentvalue);
  }
}
