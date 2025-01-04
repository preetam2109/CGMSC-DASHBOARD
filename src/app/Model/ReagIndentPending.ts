export class ReagIndentPending{
        nocid: number;
        warehousename: string;
        districtname: string;
        facilityname: string;
        eqpname: string;
        make: string;
        model: string ;
        nositems: number;
        indentvalue: number;
        indentdt: number;
        nocnumber: string;
  sno: any;

        constructor(nocid: number,
            warehousename: string,
            districtname: string,
            facilityname: string,
            eqpname: string,
            make: string,
            model: string ,
            nositems: number,
            indentvalue: number,
            indentdt: number,
            nocnumber: string){

                this.nocid= nocid;
                this.warehousename= warehousename;
                this.districtname= districtname;
                this.facilityname= facilityname;
                this.eqpname= eqpname;
                this.make= make;
                this.model= model ;
                this.nositems= nositems;
                this.indentvalue= indentvalue;
                this.indentdt= indentdt;
                this.nocnumber= nocnumber;
        }
}