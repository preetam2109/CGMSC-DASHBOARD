export class HODYearWiseIssuanceSummary{
    id: string;
    mcid: number;
    mcategory: string;
    totalissueitems: number;
    dhsissueitems: number;
    dmeissueitems: number;
    ayIssueitems: number;
    totalissuevalue: number;
    dhsissuevalue: number;
    dmeissuevalue: number;
    ayissueval: number;
    accyrsetid: number;
    shaccyear: string;
  
    // Constructor to initialize each property directly
    constructor(
      id: string,
      mcid: number,
      mcategory: string,
      totalissueitems: number,
      dhsissueitems: number,
      dmeissueitems: number,
      ayIssueitems: number,
      totalissuevalue: number,
      dhsissuevalue: number,
      dmeissuevalue: number,
      ayissueval: number,
      accyrsetid: number,
      shaccyear: string
    ) {
      this.id = id;
      this.mcid = mcid;
      this.mcategory = mcategory;
      this.totalissueitems = totalissueitems;
      this.dhsissueitems = dhsissueitems;
      this.dmeissueitems = dmeissueitems;
      this.ayIssueitems = ayIssueitems;
      this.totalissuevalue = totalissuevalue;
      this.dhsissuevalue = dhsissuevalue;
      this.dmeissuevalue = dmeissuevalue;
      this.ayissueval = ayissueval;
      this.accyrsetid = accyrsetid;
      this.shaccyear = shaccyear;
  
}
}