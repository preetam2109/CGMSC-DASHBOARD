export class SeasonDrugs{
        sno:any;
        id: number;
        issuedinnosavgseason: number;
        seasonissuedlacs: number;
        dhsaiLacs: number;
        thisyrissuedlacs: number;
        stklacs: number;
        issuetype: string;
        season: string;
        itemid: number;
        itemcode: string;
        itemname: string;
        strengtH1: string;
        itemtypename: string;
        ready: number;
        uqc: number;
      
        constructor(
          id: number,
          issuedinnosavgseason: number,
          seasonissuedlacs: number,
          dhsaiLacs: number,
          thisyrissuedlacs: number,
          stklacs: number,
          issuetype: string,
          season: string,
          itemid: number,
          itemcode: string,
          itemname: string,
          strengtH1: string,
          itemtypename: string,
          ready: number,
          uqc: number
        ) {
          this.id = id;
          this.issuedinnosavgseason = issuedinnosavgseason;
          this.seasonissuedlacs = seasonissuedlacs;
          this.dhsaiLacs = dhsaiLacs;
          this.thisyrissuedlacs = thisyrissuedlacs;
          this.stklacs = stklacs;
          this.issuetype = issuetype;
          this.season = season;
          this.itemid = itemid;
          this.itemcode = itemcode;
          this.itemname = itemname;
          this.strengtH1 = strengtH1;
          this.itemtypename = itemtypename;
          this.ready = ready;
          this.uqc = uqc;
        }
      }
      