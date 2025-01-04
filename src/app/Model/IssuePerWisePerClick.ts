export class IssuePerWisePerClick{
        sno:any
        itemid: number;
        itemtypename: string;
        groupname: string;
        itemcode: string;
        itemname: string;
        strengtH1: string;
        unit: string;
        ai: number;
        issued: number;
        issup: number;
        percentage: string;
        orderdp: number;
        readystk: number;
        uqcstk: number;
        totlpipeline: number;
      
        constructor(
          itemid: number,
          itemtypename: string,
          groupname: string,
          itemcode: string,
          itemname: string,
          strengtH1: string,
          unit: string,
          ai: number,
          issued: number,
          issup: number,
          percentage: string,
          orderdp: number,
          readystk: number,
          uqcstk: number,
          totlpipeline: number
        ) {
          this.itemid = itemid;
          this.itemtypename = itemtypename;
          this.groupname = groupname;
          this.itemcode = itemcode;
          this.itemname = itemname;
          this.strengtH1 = strengtH1;
          this.unit = unit;
          this.ai = ai;
          this.issued = issued;
          this.issup = issup;
          this.percentage = percentage;
          this.orderdp = orderdp;
          this.readystk = readystk;
          this.uqcstk = uqcstk;
          this.totlpipeline = totlpipeline;
        }
      }
      