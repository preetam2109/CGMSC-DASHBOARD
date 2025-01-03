export class DisYrGrowth{
    accyrsetid: number;
    shaccyear: string;
    dmeItems: number;
    dmeValue: number;
    cmhoItem: number;
    cmhoValue: number;
    dhItem: number;
    dhValueLac: number;
    chCitem: number;
    chcValue: number;
    otherfacitems: number;
    otherfacvalue: number;
    aYitems: number;
    ayValue: number;


    constructor( accyrsetid: number,
        shaccyear: string,
        dmeItems: number,
        dmeValue: number,
        cmhoItem: number,
        cmhoValue: number,
        dhItem: number,
        dhValueLac: number,
        chCitem: number,
        chcValue: number,
        otherfacitems: number,
        otherfacvalue: number,
        aYitems: number,
        ayValue: number){

            this.accyrsetid=accyrsetid,
            this.shaccyear= shaccyear,
            this.dmeItems= dmeItems,
            this.dmeValue= dmeValue,
            this.cmhoItem=cmhoItem,
            this.cmhoValue= cmhoValue,
            this.dhItem=dhItem,
            this.dhValueLac=dhValueLac,
            this.chCitem= chCitem,
            this.chcValue=chcValue,
            this.otherfacitems=otherfacitems,
            this.otherfacvalue=otherfacvalue,
            this.aYitems=aYitems,
            this.ayValue=ayValue

    }

    
}