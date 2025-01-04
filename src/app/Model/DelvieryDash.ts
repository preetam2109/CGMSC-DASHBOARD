export class DelvieryDash{

        travaleid: number;
        longitude: string;
        latitude: string;
        dropdate: string;
        vehicalno: string;
        indDT: string;
        facilityname:string;
        nositems: number;
        indentid: number;
        position: any

        constructor(travaleid: number,
            longitude: string,
            latitude: string,
            dropdate: string,
            vehicalno: string,
            indDT: string,
            facilityname:string,
            nositems: number,
            indentid: number){

                this.travaleid=travaleid,
                this.longitude=longitude,
                this.latitude= latitude,
                this.dropdate=dropdate,
                this.vehicalno=vehicalno,
                this.indDT=indDT,
                this.facilityname=facilityname,
                this.nositems= nositems,
                this.indentid=indentid

        }
}