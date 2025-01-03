export class UndroppedDocket {
    ctid: number;
    warehouseid: number;
    warehousename: string;
    qdocketno: string;
    details: string;
    entrydatepick: string;
    pickdate: string;
    destinationtype: string;
    destinationid: string;
    weight: string;
    unit: string;
    status: string | null;
    entrydate: string | null;
    dayS_SINCE_PICKDATE: number;
  
    constructor(  ctid: number,warehouseid: number,
        warehousename: string,
        qdocketno: string,
        details: string,
        entrydatepick: string,
        pickdate: string,
        destinationtype: string,
        destinationid: string,
        weight: string,
        unit: string,
        status: string | null,
        entrydate: string | null,
        dayS_SINCE_PICKDATE: number) {

      this.ctid = ctid,
      this.warehouseid = warehouseid,
      this.warehousename = warehousename;
      this.qdocketno = qdocketno;
      this.details = details;
      this.entrydatepick = entrydatepick;
      this.pickdate = pickdate;
      this.destinationtype = destinationtype;
      this.destinationid = destinationid;
      this.weight = weight;
      this.unit = unit;
      this.status = status || null;
      this.entrydate = entrydate || null;
      this.dayS_SINCE_PICKDATE = dayS_SINCE_PICKDATE;
    }
  }
  