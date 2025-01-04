export class DPDMISEMDTenderwisePending{
    schemeid: number;
    schemename: string;
    statusdata: string;
    nossupplier: number;
    totalEMD: number;
    releasedEMDAmt: number;
    pendingEMD: number;
  sno: any;

    constructor(schemeid: number,
        schemename: string,
        statusdata: string,
        nossupplier: number,
        totalEMD: number,
        releasedEMDAmt: number,
        pendingEMD: number){
            this.schemeid= schemeid,
            this.schemename=schemename,
            this.statusdata=statusdata,
            this.nossupplier= nossupplier,
            this.totalEMD=totalEMD,
            this.releasedEMDAmt=releasedEMDAmt,
            this.pendingEMD=pendingEMD

    }
}