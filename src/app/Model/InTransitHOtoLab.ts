export class InTransitHOtoLab{
    id: number;
labname: string |null;
nositem: number;
nosbatch: number;
dropped: number;
abovE15: number;
betW6_15: number;
beT2_5: number;
today: number;
labid: number| null

constructor(id: number,
    labname: string |null,
    nositem: number,
    nosbatch: number,
    dropped: number,
    abovE15: number,
    betW6_15: number,
    beT2_5: number,
    today: number,
    labid: number| null){
        this.id= id;
        this.labname= labname;
        this.nositem= nositem;
        this.nosbatch=nosbatch;
        this.dropped= dropped;
        this.abovE15= abovE15;
        this.betW6_15= betW6_15;
        this.beT2_5= beT2_5;
        this.today= today;
        this.labid= labid;

}
}