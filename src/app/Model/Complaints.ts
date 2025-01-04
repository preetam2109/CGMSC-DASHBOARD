export class Complaints {
  district: string;
  location_name: string;
  dP_DistrictID:number;
  item_name: string;
  serial_no: string;
  model_no: string;
  installeddate: string;
  warrantyValidTill: string;
  complaint_date: string;
  dayssince: number;
  complaint_details: string;
  name: string;
  email_id: string;
  mobile_no: number;
  location_id: number;
  supplier_id: number;
  complaints_trouble_id: number;
  not_function_date: string;
  item_code_as_per_tender: string;
  user_id: number;
  path: string | null;
  ex: string | null;
  extensionId: number;
  complaint_id: number;
  complaint_no: string;
  item_id: number;
  solved_date:string;
  status: string;

  constructor(
      district: string,
      location_name: string,
      dP_DistrictID:number,
      item_name: string,
      serial_no: string,
      model_no: string,
      installeddate: string,
      warrantyValidTill: string,
      complaint_date: string,
      dayssince: number,
      complaint_details: string,
      name: string,
      email_id: string,
      mobile_no: number,
      location_id: number,
      supplier_id: number,
      complaints_trouble_id: number,
      not_function_date: string,
      item_code_as_per_tender: string,
      user_id: number,
      path: string | null,
      ex: string | null,
      extensionId: number,
      complaint_id: number,
      complaint_no: string,
      item_id: number,
      solved_date:string,
      status: string

  ) {
      this.district = district;
      this.location_name = location_name;
      this.dP_DistrictID=dP_DistrictID;
      this.item_name = item_name;
      this.serial_no = serial_no;
      this.model_no = model_no;
      this.installeddate = installeddate;
      this.warrantyValidTill = warrantyValidTill;
      this.complaint_date = complaint_date;
      this.dayssince = dayssince;
      this.complaint_details = complaint_details;
      this.name = name;
      this.email_id = email_id;
      this.mobile_no = mobile_no;
      this.location_id = location_id;
      this.supplier_id = supplier_id;
      this.complaints_trouble_id = complaints_trouble_id;
      this.not_function_date = not_function_date;
      this.item_code_as_per_tender = item_code_as_per_tender;
      this.user_id = user_id;
      this.path = path;
      this.ex = ex;
      this.extensionId = extensionId;
      this.complaint_id = complaint_id;
      this.complaint_no = complaint_no;
      this.item_id = item_id;
      this.solved_date=solved_date;
      this.status=status

  }
}
