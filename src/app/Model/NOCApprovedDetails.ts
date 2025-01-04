export class NOCApprovedDetails{
        sr: number;
        facilityname: string;
        itemcode: string;
        itemname: string;
        strengtH1: string;
        unit: string;
        nocdate: string;
        applieddt: string;
        appliedqty: number;
        cmhoaprqty: number;
        cmhoaprdttime: string;
        approvedqty: number;
        rejectqty: number;
        cgmscaprdttime: string;
        cgmsclremarks: string;
        isiwh: string;
        whname: string;
        nocnumber: string;
        nocid: number;
        sno?:number;
      
        constructor(
          sr: number,
          facilityname: string,
          itemcode: string,
          itemname: string,
          strengtH1: string,
          unit: string,
          nocdate: string,
          applieddt: string,
          appliedqty: number,
          cmhoaprqty: number,
          cmhoaprdttime: string,
          approvedqty: number,
          rejectqty: number,
          cgmscaprdttime: string,
          cgmsclremarks: string,
          isiwh: string,
          whname: string,
          nocnumber: string,
          nocid: number
        ) {
          this.sr = sr;
          this.facilityname = facilityname;
          this.itemcode = itemcode;
          this.itemname = itemname;
          this.strengtH1 = strengtH1;
          this.unit = unit;
          this.nocdate = nocdate;
          this.applieddt = applieddt;
          this.appliedqty = appliedqty;
          this.cmhoaprqty = cmhoaprqty;
          this.cmhoaprdttime = cmhoaprdttime;
          this.approvedqty = approvedqty;
          this.rejectqty = rejectqty;
          this.cgmscaprdttime = cgmscaprdttime;
          this.cgmsclremarks = cgmsclremarks;
          this.isiwh = isiwh;
          this.whname = whname;
          this.nocnumber = nocnumber;
          this.nocid = nocid;
        }
      }
      