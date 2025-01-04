export class ReceiptPendingSummary {
    supplier_id: number;
    Supplier: string;
    nositems: number;
    nospo: number;
    pvalue: number;
  
    constructor(supplier_id: number, Supplier: string, nositems: number, nospo: number, pvalue: number) {
      this.supplier_id = supplier_id;
      this.Supplier = Supplier;
      this.nositems = nositems;
      this.nospo = nospo;
      this.pvalue = pvalue;
    }
  }
  