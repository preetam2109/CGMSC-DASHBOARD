export class DropAppWarehousePerformance{
    warehouseid: number;
        warehousename: string;
        nosvehicle: number;
        nosdist: number;
        nosfac: number;
        nooffacindented: number;
        nosindent: number;
        indentissued: number;
        dropindentid: number;
        intrasit: number;
        droPPEr: number;
        avgdaystakensinceindentrec: number;


        constructor( warehouseid: number,
            warehousename: string,
            nosvehicle: number,
            nosdist: number,
            nosfac: number,
            nooffacindented: number,
            nosindent: number,
            indentissued: number,
            dropindentid: number,
            intrasit: number,
            droPPEr: number,
            avgdaystakensinceindentrec: number){


                this.warehouseid=warehouseid,
                this.warehousename=warehousename,
                this.nosvehicle=nosvehicle,
                this.nosdist= nosdist,
                this.nosfac= nosfac,
                this.nooffacindented=nooffacindented,
                this.nosindent=nosindent,
                this.indentissued=indentissued,
                this.dropindentid=dropindentid,
                this.intrasit=intrasit,
                this.droPPEr=droPPEr,
                this.avgdaystakensinceindentrec=avgdaystakensinceindentrec

        }
}