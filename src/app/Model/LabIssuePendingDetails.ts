export class LabIssuePendingDetails{
        id: string;
        mcategory: string;
        itemcode: string;
        qcdayslab: string;
        unit: string;
        itemname: string;
        batchno: string;
        rqty: number;
        expdate: string;
        whReceiptDate: string;
        qcReceiptDT: string;
        delaypara: string;
        delayparA1: string;
        mcid: number;
        itemid: number;
      
        constructor(
          id: string,
          mcategory: string,
          itemcode: string,
          qcdayslab: string,
          unit: string,
          itemname: string,
          batchno: string,
          rqty: number,
          expdate: string,
          whReceiptDate: string,
          qcReceiptDT: string,
          delaypara: string,
          delayparA1: string,
          mcid: number,
          itemid: number
        ) {
          this.id = id;
          this.mcategory = mcategory;
          this.itemcode = itemcode;
          this.qcdayslab = qcdayslab;
          this.unit = unit;
          this.itemname = itemname;
          this.batchno = batchno;
          this.rqty = rqty;
          this.expdate = expdate;
          this.whReceiptDate = whReceiptDate;
          this.qcReceiptDT = qcReceiptDT;
          this.delaypara = delaypara;
          this.delayparA1 = delayparA1;
          this.mcid = mcid;
          this.itemid = itemid;
        }
      }
      