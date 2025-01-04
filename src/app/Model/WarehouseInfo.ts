export class WarehouseInfo{
    sno:any;
    warehouseid: number;
    warehousename: string;
    nosfac: number;
    address: string;
    email: string;
    latitude: string;
    longitude: string;
    nosvehicle: number;
    nosdist: number;
    moB1: string;
    position:any;
  
    constructor(
      warehouseid: number,
      warehousename: string,
      nosfac: number,
      address: string,
      email: string,
      latitude: string,
      longitude: string,
      nosvehicle: number,
      nosdist: number,
      moB1: string
    ) {
      this.warehouseid = warehouseid;
      this.warehousename = warehousename;
      this.nosfac = nosfac;
      this.address = address;
      this.email = email;
      this.latitude = latitude;
      this.longitude = longitude;
      this.nosvehicle = nosvehicle;
      this.nosdist = nosdist;
      this.moB1 = moB1;
    }
}