export class WHStock{
    id: number;
    mcid: number;
    edlcat: string;
    mcategory:string;
    noofitems: number;
    noofitemsready: number;
    noofitemsuqc: number;
    noofitemspipeline: number;
    readyforissuevalue: number;
    qcpendingvalue: number;
    pipelinevalue: number

    constructor(id: number,
        mcid: number,
        edlcat: string,
        mcategory:string,
        noofitems: number,
        noofitemsready: number,
        noofitemsuqc: number,
        noofitemspipeline: number,
        readyforissuevalue: number,
        qcpendingvalue: number,
        pipelinevalue: number){
            this.id=id
            this.mcid= mcid,
            this.edlcat= edlcat,
            this.mcategory=mcategory,
            this.noofitems=noofitems,
            this.noofitemsready= noofitemsready,
            this.noofitemsuqc= noofitemsuqc,
            this.noofitemspipeline= noofitemspipeline,
            this.readyforissuevalue= readyforissuevalue,
            this.qcpendingvalue= qcpendingvalue,
            this.pipelinevalue= pipelinevalue
            

    }
}