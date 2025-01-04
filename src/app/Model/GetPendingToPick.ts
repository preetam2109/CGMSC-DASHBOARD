export class GetPendingToPick{
        id: number;
        qdocketno: number;
        itemname: string;
        batchno: string;
        pendingdays: number;
        warehousename: string;
        sno?:number;

        constructor(id: number,
            qdocketno: number,
            itemname: string,
            batchno: string,
            pendingdays: number,
            warehousename: string){

                this.id= id,
                this.qdocketno= qdocketno,
                this.itemname= itemname,
                this.batchno= batchno,
                this.pendingdays= pendingdays,
                this.warehousename= warehousename

        }
}