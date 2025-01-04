export class HODPOYear_AgAI{
    
  id: string;
  mcid: number;
  mcategory: string;
  totalpoitems: number;
  dhspoitems: number;
  dhspovalue: number;
  dhsrecvalue: number;
  dmepoitems: number;
  dmepovalue: number;
  dmerecvalue: number;
  totalpovalue: number;
  totalrecvalue: number;
  accyrsetid: number;
  shaccyear: string;

  constructor(
    id: string,
    mcid: number,
    mcategory: string,
    totalpoitems: number,
    dhspoitems: number,
    dhspovalue: number,
    dhsrecvalue: number,
    dmepoitems: number,
    dmepovalue: number,
    dmerecvalue: number,
    totalpovalue: number,
    totalrecvalue: number,
    accyrsetid: number,
    shaccyear: string
  ) {
    this.id = id;
    this.mcid = mcid;
    this.mcategory = mcategory;
    this.totalpoitems = totalpoitems;
    this.dhspoitems = dhspoitems;
    this.dhspovalue = dhspovalue;
    this.dhsrecvalue = dhsrecvalue;
    this.dmepoitems = dmepoitems;
    this.dmepovalue = dmepovalue;
    this.dmerecvalue = dmerecvalue;
    this.totalpovalue = totalpovalue;
    this.totalrecvalue = totalrecvalue;
    this.accyrsetid = accyrsetid;
    this.shaccyear = shaccyear;
  }
}