export class WHDrugCount{
    warehouseid: number;
    warehousename: string;
    nedl: number;
    edl: number;
  
    constructor(warehouseid: number, warehousename: string, nedl: number, edl: number) {
      this.warehouseid = warehouseid;
      this.warehousename = warehousename;
      this.nedl = nedl;
      this.edl = edl;
    }
}