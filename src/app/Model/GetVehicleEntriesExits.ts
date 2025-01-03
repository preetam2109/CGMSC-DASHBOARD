export class GetVehicleEntriesExits{

  tranid: number;
  vplateno: string;
  direction: string;
  vdate: string;
  entrydate: string;
  camid: number;
  warehouseid: number;
  warehousename: string;

  constructor(
    tranid: number,
    vplateno: string,
    direction: string,
    vdate: string,
    entrydate: string,
    camid: number,
    warehouseid: number,
    warehousename: string
  ) {
    this.tranid = tranid;
    this.vplateno = vplateno;
    this.direction = direction;
    this.vdate = vdate;
    this.entrydate = entrydate;
    this.camid = camid;
    this.warehouseid = warehouseid;
    this.warehousename = warehousename;
  }


}