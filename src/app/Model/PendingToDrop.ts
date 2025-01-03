export class PendingToDrop{

        id: string;
        qdocketno: string;
        itemname: string;
        batchno: string;
        pendingdays: number;
        warehousename: string;
      
        constructor(
          id: string,
          qdocketno: string,
          itemname: string,
          batchno: string,
          pendingdays: number,
          warehousename: string
        ) {
          this.id = id;
          this.qdocketno = qdocketno;
          this.itemname = itemname;
          this.batchno = batchno;
          this.pendingdays = pendingdays;
          this.warehousename = warehousename;
        }
      }
      