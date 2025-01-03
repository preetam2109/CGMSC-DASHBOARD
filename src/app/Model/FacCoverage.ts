export class FacCoverage{
    sno:any;
    facilitytypeid: number;
    facilitytypecode: string;
    nosfac: number;
    facilitytypedesc: string;
  
    constructor(
      facilitytypeid: number,
      facilitytypecode: string,
      nosfac: number,
      facilitytypedesc: string
    ) {
      this.facilitytypeid = facilitytypeid;
      this.facilitytypecode = facilitytypecode;
      this.nosfac = nosfac;
      this.facilitytypedesc = facilitytypedesc;
    }
}