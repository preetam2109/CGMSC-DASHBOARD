export class Districts{
    constructor(public  district_Name:string ,
        public  district_ID:string , 
        public dbStart_Name_En:string, 
        public   backward_NonBackward:string, 
        public  div_Id:number,
        public password:string,       
         public dtDist:string ,
        public  dist2012:string, 
        public  newDistYear:number,
        public  urban:number ,
        public  dP_DistrictID:number , 
        public createdOn:Date  ){

    }

    // public  District_Name:string | undefined
    // public  District_ID:string | undefined 
    // public DBStart_Name_En:string | undefined 
    // public   Backward_NonBackward:string | undefined 
    // public  Div_Id:number | undefined
    // public password:string | undefined
    // public DtDist:string | undefined 
    // public  Dist2012:string | undefined 
    // public  NewDistYear:number | undefined
    // public  Urban:number | undefined
    // public  DP_DistrictID:number | undefined 
    // public CreatedOn:Date | undefined 
}