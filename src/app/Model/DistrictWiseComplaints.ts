export class DistrictWiseComplaints {
    district: string | undefined;
    dP_DistrictID: number | undefined;
    total: number | undefined;
    solved: number | undefined;
    unsolved: number | undefined;
  
    constructor(
      district: string,
      dP_DistrictID: number,
      total: number,
      solved: number,
      unsolved: number
    ) {
      this.district = district;
      this.dP_DistrictID = dP_DistrictID;
      this.total = total;
      this.solved = solved;
      this.unsolved= unsolved;
    }
  }
  
  