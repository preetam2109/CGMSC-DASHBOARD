export class NOCApprovedSummary{
        facilityid: number;
        nosapplied: number;
        approved: number;
        rejected: number;
        facilityname: string;
        districtname: string;
        sno?:number;

      
        constructor(
          facilityid: number,
          nosapplied: number,
          approved: number,
          rejected: number,
          facilityname: string,
          districtname: string
        ) {
          this.facilityid = facilityid;
          this.nosapplied = nosapplied;
          this.approved = approved;
          this.rejected = rejected;
          this.facilityname = facilityname;
          this.districtname = districtname;
        }
      }
      