export class GroupWiseAI_PODetails{
    groupid: number;
    groupname: string;
    nosindent: number;
    pogiven: number;
    povalue: number;
    itemsreceived: number;
    rvalue: number;


    constructor(groupid: number,
        groupname: string,
        nosindent: number,
        pogiven: number,
        povalue: number,
        itemsreceived: number,
        rvalue: number){

            this.groupid= groupid,
    this.groupname=groupname,
    this.nosindent=nosindent,
    this.pogiven= pogiven,
    this.povalue= povalue,
    this.itemsreceived=itemsreceived,
    this.rvalue=rvalue


    }
}