export class dispatchPending{
     po_id: number;
     poNo: string;
     podate: string;
    facility_aut_code: string;
    item_code_as_per_tender: string;
    item_name: string;
    supplier: string;
    poqty: number;
    supplyqty: number | null;
    receiptQTY: number | null;
    lastRDate: string | null;
    insqty: number | null;
    balanceQty: number;
    dAYSSINCEPO: number;
    supplier_id: number;
    povalue: number;

    constructor(
        po_id: number,
        poNo: string,
        podate: string,
        facility_aut_code: string,
        item_code_as_per_tender: string,
        item_name: string,
        supplier: string,
        poqty: number,
        supplyqty: number | null,
        receiptQTY: number | null,
        lastRDate: string | null,
        insqty: number | null,
        balanceQty: number,
        dAYSSINCEPO: number,
        supplier_id: number,
        povalue: number
    ) {
        this.po_id = po_id;
        this.poNo = poNo;
        this.podate = podate;
        this.facility_aut_code = facility_aut_code;
        this.item_code_as_per_tender = item_code_as_per_tender;
        this.item_name = item_name;
        this.supplier = supplier;
        this.poqty = poqty;
        this.supplyqty = supplyqty;
        this.receiptQTY = receiptQTY;
        this.lastRDate = lastRDate;
        this.insqty = insqty;
        this.balanceQty = balanceQty;
        this.dAYSSINCEPO = dAYSSINCEPO;
        this.supplier_id = supplier_id;
        this.povalue = povalue;
    }
}
