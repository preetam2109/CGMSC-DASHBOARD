export class POSuppyTimeTakenYear{
    id: string;
    accyrsetid: number;
    accyear: string;
    mcategory: string;
    nospo: number;
    nositems: number;
    timetakenSupply: number;

    constructor(id: string,
        accyrsetid: number,
        accyear: string,
        mcategory: string,
        nospo: number,
        nositems: number,
        timetakenSupply: number
    ){
        this.id= id,
    this.accyrsetid=accyrsetid,
    this.accyear=accyear,
    this.mcategory=mcategory,
    this.nospo=nospo,
    this.nositems=nositems,
    this.timetakenSupply=timetakenSupply


    }
}