export class VehicleInfo{
    sno:any
    tranid: number;
    vplateno: string;
    direction: string;
    vdate: string;
    entrydate: string;
    camid: number;
    warehouseid: number | null;
    warehousename: string | null;
  
    constructor(data: Partial<VehicleInfo> = {}) {
      this.tranid = data.tranid || 0;
      this.vplateno = data.vplateno || '';
      this.direction = data.direction || '';
      this.vdate = data.vdate || '';
      this.entrydate = data.entrydate || '';
      this.camid = data.camid || 0;
      this.warehouseid = data.warehouseid || null;
      this.warehousename = data.warehousename || null;
    }
}