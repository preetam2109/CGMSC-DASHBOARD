export class LabIssuePendingSummary{
id: number;
mcid: number;
mcategory: string;
nousbatch: number;
nositems: number;
delayparA1: number;
delaypara: string;

constructor(id: number,
    mcid: number,
    mcategory: string,
    nousbatch: number,
    nositems: number,
    delayparA1: number,
    delaypara: string){

        this.id= id,
        this.mcid= mcid,
        this.mcategory= mcategory,
        this.nousbatch= nousbatch,
        this.nositems= nositems,
        this.delayparA1= delayparA1,
        this.delaypara= delaypara

}



}