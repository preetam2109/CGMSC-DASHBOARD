export class TravelVouchers{
        indentid: number;
        facilityname: string;
        districtname: string;
        issuevoucher: string;
        issuevoucherdt: string;
        nositems: number;
        travelvoucherissuedt: string;
        indentno: string;
        indendt: string;
        details: string;
        longitude: number;
        latitude: number;
        travaleid: number;
        facilityid: number;

        constructor(indentid: number,
            facilityname: string,
            districtname: string,
            issuevoucher: string,
            issuevoucherdt: string,
            nositems: number,
            travelvoucherissuedt: string,
            indentno: string,
            indendt: string,
            details: string,
            longitude: number,
            latitude: number,
            travaleid: number,
            facilityid: number,){

                this.indentid= indentid;
        this.facilityname= facilityname;
        this.districtname= districtname;
        this.issuevoucher= issuevoucher;
        this.issuevoucherdt= issuevoucherdt;
        this.nositems= nositems;
        this.travelvoucherissuedt= travelvoucherissuedt;
        this.indentno= indentno;
        this.indendt= indendt;
        this.details= details;
        this.longitude= longitude;
        this.latitude= latitude;
        this.travaleid= travaleid;
        this.facilityid= facilityid;

        }
}