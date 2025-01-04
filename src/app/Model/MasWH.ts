export class MasWH{
    warehouseid: number;
  warehousename: string;
  zoneid: string;
  userid: number;
  onlywhname: string;

  constructor(
    warehouseid: number,
    warehousename: string,
    zoneid: string,
    userid: number,
    onlywhname: string
  ) {
    this.warehouseid = warehouseid;
    this.warehousename = warehousename;
    this.zoneid = zoneid;
    this.userid = userid;
    this.onlywhname = onlywhname;
  }
}