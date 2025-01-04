export class PaidTimeTaken{
    yrid: number;
    yr: string;
    nospo: number;
    gross: number;
    avgdayssincerec: number;
    avgdayssinceqc: number

    constructor(yrid: number,
        yr: string,
        nospo: number,
        gross: number,
        avgdayssincerec: number,
        avgdayssinceqc: number
    ){

        this.yrid=yrid,
        this.yr=yr,
        this.nospo=nospo,
        this.gross=gross,
        this.avgdayssincerec=avgdayssincerec,
        this.avgdayssinceqc=avgdayssinceqc


    }
}