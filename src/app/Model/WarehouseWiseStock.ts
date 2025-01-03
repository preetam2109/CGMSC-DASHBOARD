export class WarehouseWiseStock{
    sno?:number
    id: number;
    warehousename: string;
    warehouseid: number;
    readyforissue: number;
    pending: number;
    supplierpipeline: number;
    iwhpipeline: number;
    issuedfy:number;

    constructor(id: number,
        warehousename: string,
        warehouseid: number,
        readyforissue: number,
        pending: number,
        supplierpipeline: number,
        iwhpipeline: number,
        issuedfy:number
        
        ){

            this.id=id;
            this.warehousename =warehousename;
            this.warehouseid=warehouseid;
            this.readyforissue= readyforissue;
            this.pending=pending;
            this.supplierpipeline=supplierpipeline;
            this.iwhpipeline= iwhpipeline;
            this.issuedfy=issuedfy;

    }
}