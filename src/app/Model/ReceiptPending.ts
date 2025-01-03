export class ReceiptPending {
    po_id: number;
    PONo: string;
    podate: string;
    facility_aut_name: string;
    item_code_as_per_tender: string;
    item_name: string;
    supplier: string;
    POQTY: number;
    Supplyqty: number;
    receiptQTY: number;
    LastRDate: string;
    insqty: number;
    balanceQty: number;
    dAYSSINCEPO: number;
    supplier_id: number;
    povalue: number;
  
    constructor(
      po_id: number,
      PONo: string,
      podate: string,
      facility_aut_name: string,
      item_code_as_per_tender: string,
      item_name: string,
      supplier: string,
      POQTY: number,
      Supplyqty: number,
      receiptQTY: number,
      LastRDate: string,
      insqty: number,
      balanceQty: number,
      dAYSSINCEPO: number,
      supplier_id: number,
      povalue: number
    ) {
      this.po_id = po_id;
      this.PONo = PONo;
      this.podate = podate;
      this.facility_aut_name = facility_aut_name;
      this.item_code_as_per_tender = item_code_as_per_tender;
      this.item_name = item_name;
      this.supplier = supplier;
      this.POQTY = POQTY;
      this.Supplyqty = Supplyqty;
      this.receiptQTY = receiptQTY;
      this.LastRDate = LastRDate;
      this.insqty = insqty;
      this.balanceQty = balanceQty;
      this.dAYSSINCEPO = dAYSSINCEPO;
      this.supplier_id = supplier_id;
      this.povalue = povalue;
    }
  }
  