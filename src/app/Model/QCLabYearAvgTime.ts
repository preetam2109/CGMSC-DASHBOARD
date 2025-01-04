export class QCLabYearAvgTime{
    labid: number
    labname: string
    nossamples: number
    avgTimeTaken: number


    constructor(labid: number,
        labname: string,
        nossamples: number,
        avgTimeTaken: number
    ){

        this.labid=labid,
        this.labname=labname,
        this.nossamples=nossamples,
        this.avgTimeTaken=avgTimeTaken


    }

    


}