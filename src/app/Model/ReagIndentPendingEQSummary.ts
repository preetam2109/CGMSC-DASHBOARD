export class ReagIndentPendingEQSummary{
        mmid: number;
        eqpname: string;
        make: string;
        model: string;
        nosfac: number;
        indentvalue: number;
        noswh: number;

        constructor(mmid: number,
            eqpname: string,
            make: string,
            model: string,
            nosfac: number,
            indentvalue: number,
            noswh: number){

                this.mmid= mmid;
                this.eqpname= eqpname;
                this.make= make;
                this.model= model;
                this.nosfac= nosfac;
                this.indentvalue= indentvalue;
                this.noswh= noswh;

        }
}