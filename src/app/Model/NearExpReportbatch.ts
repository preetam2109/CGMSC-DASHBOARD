export class NearExpReportbatch{
    itemid: number;
        itemcode: string;
        itemname: string;
        wh: null;
        batchno: string;
        expdate: string;
        nearexpvalue: number;
        qty: number;
  sno: any;

        constructor(itemid: number,
            itemcode: string,
            itemname: string,
            wh: null,
            batchno: string,
            expdate: string,
            nearexpvalue: number,
            qty: number){

                this.itemid= itemid;
                this.itemcode= itemcode;
                this.itemname= itemname;
                this.wh= wh;
                this.batchno= batchno;
                this.expdate= expdate;
                this.nearexpvalue= nearexpvalue;
                this.qty= qty;   

        }
}