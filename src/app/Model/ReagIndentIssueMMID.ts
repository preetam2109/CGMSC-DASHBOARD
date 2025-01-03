export class ReagIndentIssueMMID{
    mmid: number;
    eqpname: string;
    make: string;
    model: string;
    nosreagent: number;
    nosfac: number;
    issuevaluesincE3SEP: number;

    constructor(mmid: number,
        eqpname: string,
        make: string,
        model: string,
        nosreagent: number,
        nosfac: number,
        issuevaluesincE3SEP: number){

            this.mmid= mmid;
            this.eqpname= eqpname;
            this.make= make;
            this.model= model;
            this.nosreagent= nosreagent;
            this.nosfac= nosfac;
            this.issuevaluesincE3SEP= issuevaluesincE3SEP;

    }
}