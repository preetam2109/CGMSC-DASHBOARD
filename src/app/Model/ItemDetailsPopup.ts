export class ItemDetailsPopup{
    
    itemid: number;
   itemtypeid: number;
   groupid: number;
   groupname: string;
   itemtypename: string;
   itemcode: string;
   itemname: string;
   strengtH1: string;
   unit: string;
   totalai: number;
   dhsai: number;
   dmeai: number;
   readystock: number;
   qcstock: number;
   totalpiplie: number;
   edltype: string;
   edl: string;
   rcstatus: string;
   rcrate: string;
   rcstartdt: string;
   rcenddt: string;
   dmeissue: number;
   dhsissue: number;
   totalissue: number;
   dhspoqty: number;
   dhsrqty: number;
   dmepoqty: number;
   dmerqty: number;
   rc: number;
   readycnt: number;
   uqccount: number;
   piplinecnt: number;
    constructor(
         itemid: number,
         itemtypeid: number,
         groupid: number,
         groupname: string,
         itemtypename: string,
         itemcode: string,
         itemname: string,
         strengtH1: string,
         unit: string,
         totalai: number,
         dhsai: number,
         dmeai: number,
         readystock: number,
         qcstock: number,
         totalpiplie: number,
         edltype: string,
         edl: string,
         rcstatus: string,
         rcrate: string,
         rcstartdt: string,
         rcenddt: string,
         dmeissue: number,
         dhsissue: number,
         totalissue: number,
         dhspoqty: number,
         dhsrqty: number,
         dmepoqty: number,
         dmerqty: number,
         rc: number,
         readycnt: number,
         uqccount: number,
         piplinecnt: number
      ) {

        this.itemid = itemid;
        this.itemtypeid = itemtypeid;
        this.groupid = groupid;
        this.groupname = groupname;
        this.itemtypename = itemtypename;
        this.itemcode = itemcode;
        this.itemname = itemname;
        this.strengtH1 = strengtH1;
        this.unit = unit;
        this.totalai = totalai;
        this.dhsai = dhsai;
        this.dmeai = dmeai;
        this.readystock = readystock;
        this.qcstock = qcstock;
        this.totalpiplie = totalpiplie;
        this.edltype = edltype;
        this.edl = edl;
        this.rcstatus = rcstatus;
        this.rcrate = rcrate;
        this.rcstartdt = rcstartdt;
        this.rcenddt = rcenddt;
        this.dmeissue = dmeissue;
        this.dhsissue = dhsissue;
        this.totalissue = totalissue;
        this.dhspoqty = dhspoqty;
        this.dhsrqty = dhsrqty;
        this.dmepoqty = dmepoqty;
        this.dmerqty = dmerqty;
        this.rc = rc;
        this.readycnt = readycnt;
        this.uqccount = uqccount;
        this.piplinecnt = piplinecnt;

      }
}