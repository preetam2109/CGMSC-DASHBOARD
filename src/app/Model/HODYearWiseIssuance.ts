export class HODYearWiseIssuance{
    id:number;
    mcid: number;
    mcategory: string;
    noofitems: number;
    issuevalue: number;
    accyrsetid: number;
    accyear: string;

constructor(id:number,
    mcid: number,
    mcategory: string,
    noofitems: number,
    issuevalue: number,
    accyrsetid: number,
    accyear: string

){



this.id=id;
this.mcid= mcid;
this.mcategory=mcategory;
this.noofitems=noofitems,
this.issuevalue=issuevalue,
this.accyrsetid=accyrsetid,
this.accyear=accyear

}
    
}

export class MontlyItemDemography{

accyrsetid: number | undefined;
year: string| undefined;
issueMonth: string| undefined;
mcategory: string| undefined;
iss_qty: number| undefined;
issuevalue: number| undefined;
noofitems: number| undefined;
mcid: number| undefined;
id: number| undefined;
ordeerTpe: number | undefined;
}

export class YearWiseIssueReport {
    accyear!: string;
    mcategory!: string;
    iss_qty!: number;
    issuevalue!: number;
    noofitems!: number;
    mcid!: number;
    accyrsetid!: number;
    id!: number;
}