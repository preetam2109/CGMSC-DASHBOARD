export class DistFACwiseStockPostionNew{
    facilityid: number;
facilityname: string;
nositems: number;
stockoutnos: number;
facstkcnt: number;
stockoutp: number;
recpendingatfacilily: number;
whstkcnt: number;
cmhostkcnt: number;
whuqcstkcnt: number;
indenT_TOWH_PENDING: number;
whissuE_REC_PENDING_L180CNT: number;
balifT6MONTH: number;
lP_PIPELINE180CNT: number;
noctakeN_NO_LPO: number;
orderdp: number;
facilitytypeid: number;

constructor( facilityid: number,
    facilityname: string,
    nositems: number,
    stockoutnos: number,
    facstkcnt: number,
    stockoutp: number,
    recpendingatfacilily: number,
    whstkcnt: number,
    cmhostkcnt: number,
    whuqcstkcnt: number,
    indenT_TOWH_PENDING: number,
    whissuE_REC_PENDING_L180CNT: number,
    balifT6MONTH: number,
    lP_PIPELINE180CNT: number,
    noctakeN_NO_LPO: number,
    orderdp: number,
    facilitytypeid: number){

        this.facilityid= facilityid,
        this.facilityname= facilityname,
        this.nositems= nositems,
        this.stockoutnos= stockoutnos,
        this.facstkcnt= facstkcnt,
        this.stockoutp= stockoutp,
        this.recpendingatfacilily= recpendingatfacilily,
        this.whstkcnt= whstkcnt,
        this.cmhostkcnt= cmhostkcnt,
        this.whuqcstkcnt= whuqcstkcnt,
        this.indenT_TOWH_PENDING= indenT_TOWH_PENDING,
        this.whissuE_REC_PENDING_L180CNT= whissuE_REC_PENDING_L180CNT,
        this.balifT6MONTH= balifT6MONTH,
        this.lP_PIPELINE180CNT= lP_PIPELINE180CNT,
        this.noctakeN_NO_LPO= noctakeN_NO_LPO,
        this.orderdp= orderdp,
        this.facilitytypeid= facilitytypeid        

}
}