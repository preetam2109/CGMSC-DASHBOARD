export class DHSDetailsItemWise{
    year: number;
    item_id: number;
    item_name: string;
    nouspo: number;
    nosconsignee: number;
    poqty: number;
    poValue: number;
    rQTY: number;
    rValue: number;
    insqty: number;
    iValue: number;
    status: string;

    constructor(year: number, item_id: number, item_name: string, nouspo: number, nosconsignee: number, poqty: number, poValue: number, rQTY: number, rValue: number, insqty: number, iValue: number, status: string) {
        this.year = year;
        this.item_id = item_id;
        this.item_name = item_name;
        this.nouspo = nouspo;
        this.nosconsignee = nosconsignee;
        this.poqty = poqty;
        this.poValue = poValue;
        this.rQTY = rQTY;
        this.rValue = rValue;
        this.insqty = insqty;
        this.iValue = iValue;
        this.status = status;
    }
}