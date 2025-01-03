export class EdlNonEdlIssuePercentSummary{
    edltype: string;
    mcid: number;
    mcategory: string;
    ai: number;
    nosissue: number;
    per: number;
  
    constructor(
      edltype: string,
      mcid: number,
      mcategory: string ,
      ai: number,
      nosissue: number,
      per: number
    ) {
      this.edltype = edltype;
      this.mcid = mcid;
      this.mcategory = mcategory;
      this.ai = ai;
      this.nosissue = nosissue;
      this.per = per;
    }
}