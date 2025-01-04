export class Monthwise_Issuance{
    mon: number;
        id: number;
        monthName: string;
        totalissueitems: number;
        dhsissueitems: number;
        dmeissueitems: number;
        ayIssueitems: number;
        totalissuevalue: number;
        dhsissuevalue: number;
        dmeissuevalue: number;
        ayissueval: number;

        constructor(mon: number,
                    id: number,
                    monthName: string,
                    totalissueitems: number,
                    dhsissueitems: number,
                    dmeissueitems: number,
                    ayIssueitems: number,
                    totalissuevalue: number,
                    dhsissuevalue: number,
                    dmeissuevalue: number,
                    ayissueval: number){


        this.mon=mon,
        this.id=id,
        this.monthName= monthName,
        this.totalissueitems=totalissueitems,
        this.dhsissueitems=dhsissueitems,
        this.dmeissueitems=dmeissueitems,
        this.ayIssueitems=ayIssueitems,
        this.totalissuevalue=totalissuevalue,
        this.dhsissuevalue=dhsissuevalue,
        this.dmeissuevalue=dmeissuevalue,
        this.ayissueval=ayissueval



        }
}