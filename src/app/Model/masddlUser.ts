export class masddlUser{
    userid: number;
  textfield: string;
  emailid: string;
  firstname: string;
  lastname: string;
  siDesig: string | null;
  orderid: number;
  siName: string | null;
  siMobile: string | null;


  constructor(
    userid: number,
    textfield: string,
    emailid: string,
    firstname: string,
    lastname: string,
    siDesig: string | null,
    orderid: number,
    siName: string | null,
    siMobile: string | null
  ) {
    this.userid = userid;
    this.textfield = textfield;
    this.emailid = emailid;
    this.firstname = firstname;
    this.lastname = lastname;
    this.siDesig = siDesig;
    this.orderid = orderid;
    this.siName = siName;
    this.siMobile = siMobile;
  }
}

export class MasSupplierPipeline{
     public supplierid!: number;
        public suppliername!: string;
}