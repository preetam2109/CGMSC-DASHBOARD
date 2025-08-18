export class DashLoginDDL {
    id: number
    desig: string
    mobile: number
    rankid: number


    constructor(id: number,
        desig: string,
        mobile: number,
        rankid: number){

            this.id= id,
            this.desig=desig,
            this.mobile= mobile,
            this.rankid=rankid

    }
}
export class InsertUserLoginLogmodal {
  logId!:number
  userId!: number
  roleId!: number
  roleIdName!: string
  userName!: string
  ipAddress!: string
  userAgent!: string

   }


export class StockStatusModel {
   
    sno!:number;
    parameterNew!:string;
    cntItems!: number;
    pricecnt!: number;
    evalutioncnt!: number;
    livecnt!: number;
    rentendercn!: number;


 
}

export class IssuePerDetailModel {
    sno!:number;
    itemcode!: string
    itemname!: string
    sku!: string
    unitcount!: number
    dhsaiqty!: number
    dmeaiqty!: number
    avgIssueqty_Last3FY!: number
    tenderstatus!: string
    tenderstartdt!: string
    coV_A_OPDATE!: string
    dayssince!: number
    parameterNew!: string
    styockPer!: number
    pricecnt!: string
    evalutioncnt!: string
    livecnt!: string
    rentendercn!: string
  }
  export class StockOutDetailsmodel {
    sno!:number;
    itemcode!: string

    itemname!: string
    sku!: string
    unitcount!: number
    dhsaiqty!: number
    dmeaiqty!: number
    avgIssueqty_Last3FY!: number
    tenderstatus!: string
    tenderstartdt!: string
    coV_A_OPDATE!: string
    dayssince!: number
    parameterNew!: string
    styockPer!: number
    pricecnt!: string
    evalutioncnt!: string
    livecnt!: string
    rentendercn!: string
  }
  export class whstockoutin {
    sno!:number;
    warehouseid!:number;
    warehousename!:string;
    noofitems!:number;
    stockout!:number;
    stockin!:number;
  
  }
  export class WhStockOutInDetailModel {
    sno!:number
    warehouseid!: string
    warehousename!: string
    itemcode!: string
    itemname!: string
    strength!: string
    sku!: string
    itemid!: number
    readyforissue!: number
    pending!: number
    stockOut!: number
    stockIn!: number
    iwhPipeline!: number
    supplierPipeline!:number
 
  }
  export interface WarehoueWiseStockOutmodel {
    sno:any
    edlType: string
    warehouseid: number
    warehousename: string
    noofitems: number
    stockout: number
    stockoutiwhpipe: number
    stockoutpopipe: number
    stockin: number
    stockiniwhpipe: number
    stockinpopipe: number
    percentage:number
  }
  export interface WarehoueWiseStockOutDetailmodel {
    sno: number
    warehouseid: string
    warehousename: string
    itemid: string
    itemcode: string
    itemname: string
    strengtH1: string
    edlType: string
    readyforissue: number
    pending: number
    stockOut: number
    stockIn: number
    stockOutIWHPipe: number
    stockOutPoPipe: number
  }

  export interface RCValidDrillDownmodel {
    sno: number
    itemId: number
    itemCode: string
    itemName: string
    sku: string
    unitCount: number
    edlType: string
    dhsAiQty: number
    dmeAiQty: number
    rcEndDate: string
    rcRate: number
    noOfSuppliers: number
    tenderStatus: string
    actionCode: string
  }
  