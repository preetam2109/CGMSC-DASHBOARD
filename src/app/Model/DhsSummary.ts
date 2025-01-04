export class DhsSummary{
    financial_year_id: number;
  year: string;
  nosItems: number;
  nouspo: number;
  poValue: number;
  rValue: number;
  iValue: number;

  constructor(
    financial_year_id: number,
    year: string,
    nosItems: number,
    nouspo: number,
    poValue: number,
    rValue: number,
    iValue: number,
  
  ) {
    this.financial_year_id = financial_year_id;
    this.year = year;
    this.nosItems = nosItems;
    this.nouspo = nouspo;
    this.poValue = poValue;
    this.rValue = rValue;
    this.iValue = iValue;
  }
}
