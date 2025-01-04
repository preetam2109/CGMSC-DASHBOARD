export class DPDMISEMDDashboard{
    nossupplierid: number;
    nostender: number;
    totalEMD: number;
    releasedEMDAmt: number;
    pendingEMD: number;

    constructor(nossupplierid: number,
        nostender: number,
        totalEMD: number,
        releasedEMDAmt: number,
        pendingEMD: number,){

            this.nossupplierid=nossupplierid;
            this.nostender= nostender;
            this.totalEMD= totalEMD;
            this.releasedEMDAmt= releasedEMDAmt;
            this.pendingEMD= pendingEMD;

    }
}