export class DPDMISSupemdSummary {
  supplierid: number;
  suppliername: string;
  nostender: number;
  totalEMD: number;
  releasedEMDAmt: number;
  pendingEMD: number;
  sno: any;

  constructor(
    supplierid: number,suppliername: string,nostender: number,totalEMD: number,releasedEMDAmt: number,pendingEMD: number
) {
    this.supplierid = supplierid,
      this.suppliername = suppliername,
      this.nostender = nostender,
      this.totalEMD = totalEMD,
      this.releasedEMDAmt = releasedEMDAmt,
      this.pendingEMD = pendingEMD;
  }
}
