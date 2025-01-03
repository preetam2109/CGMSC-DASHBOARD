import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ItemDetailsPopup } from 'src/app/Model/ItemDetailsPopup';
import { PipelineDetails } from 'src/app/Model/PipelineDetails';


@Component({
  selector: 'app-item-dialog',
  templateUrl: './item-dialog.component.html',
  styleUrls: ['./item-dialog.component.css']
})
export class ItemDialogComponent {
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['sno','rcrate','rcstartdt','rcenddt','dhsai','dhsissue','dhspoqty','dhsrqty','dmeai','dmeissue','dmepoqty','dmerqty','readystock','qcstock','totalpiplie'];
  dataSourceAnnualIndent: MatTableDataSource<any>;

  dataSource: MatTableDataSource<ItemDetailsPopup>;
  itemname: string;
  strengtH1: string;
  sku: string;
  edltype: string;
  rcstatus:string;
  rcrate:number;
  rcstartdt:string;
  rcenddt:string;
  readystock:number
  qcstock:number;
  totalpiplie:number;
  data1: { [key: string]: any }[] = []; 
  fetchData() {

    this.data1 = [
    {
      directorate: 'DHS',
      ai: this.data.itemDetails[0].dhsai,
      issued: this.data.itemDetails[0].dhsissue,
      pogiven: this.data.itemDetails[0].dhspoqty,
      poreceived: this.data.itemDetails[0].dhsrqty,
    },
    {
      directorate: 'DME',
      ai: this.data.itemDetails[0].dmeai,
      issued: this.data.itemDetails[0].dmeissue,
      pogiven: this.data.itemDetails[0].dmepoqty,
      poreceived: this.data.itemDetails[0].dmerqty
    },
    // {
    //   directorate: 'Total',
    //   ai: this.calculateTotal('ai'),
    //   issued: this.calculateTotal('issued'),
    //   pogiven: this.calculateTotal('pogiven'),
    //   poreceived: this.calculateTotal('poreceived'),
    // }
  ];
  this.data1.push({
    directorate: 'Total',
    ai: this.calculateTotal('ai'),
    issued: this.calculateTotal('issued'),
    pogiven: this.calculateTotal('pogiven'),
    poreceived: this.calculateTotal('poreceived'),
  });
}

  

  calculateTotal(column: string): number {
    let total = 0;
  
    this.data1.forEach(item => {
      if (typeof item[column] === 'number') {
        total += item[column];  // Add numeric value directly
      } else if (typeof item[column] === 'string') {
        const numericValue = parseFloat(item[column]);  // Convert string to number
        total += isNaN(numericValue) ? 0 : numericValue;  // Add converted value if valid
      }
    });
  
    return total;
  }
  
  ngOnInit(): void {
    this.fetchData();
    this.dataSource.sort = this.sort;
    this.dataSourceAnnualIndent = new MatTableDataSource(this.data1);
    console.log(this.data1);
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ItemDialogComponent>
  ) {
    this.dataSource = new MatTableDataSource(data.itemDetails); // Set the dataSource with the warehouseStock
    this.dataSourceAnnualIndent = new MatTableDataSource(this.data1); // Set the dataSource with the warehouseStock
    
    this.itemname = data.itemname;
    this.strengtH1 = data.strengtH1;
    this.sku = data.sku;
    this.edltype=data.edltype;
    this.rcstatus=data.itemDetails[0].rcstatus;
    this.rcrate=data.itemDetails[0].rcrate;
    this.rcstartdt=data.itemDetails[0].rcstartdt;
    this.rcenddt=data.itemDetails[0].rcenddt;
    this.readystock=data.itemDetails[0].readystock;
    this.qcstock=data.itemDetails[0].qcstock;
    this.totalpiplie=data.itemDetails[0].totalpiplie;





    

  }
  exportToPDF() {
    const doc = new jsPDF('l', 'mm', 'a4');

    // Get current date and time
    const now = new Date();
    const dateString = now.toLocaleDateString();
    const timeString = now.toLocaleTimeString();

    // Add date and time to the PDF
    doc.setFontSize(10);
    doc.text(`Date: ${dateString} Time: ${timeString}`, 14, 15);

    const columns = [
      { title: "S.No", dataKey: "sno" },
      { title: "rcstatus", dataKey: "rcstatus" },
      { title: "rcrate", dataKey: "rcrate" },
      { title: "rcstartdt", dataKey: "rcstartdt" },
      { title: "rcenddt", dataKey: "rcenddt" },
      { title: "dhsai", dataKey: "dhsai" },
      { title: "dhsissue", dataKey: "dhsissue" },
      { title: "dhspoqty", dataKey: "dhspoqty" },
      { title: "dhsrqty", dataKey: "dhsrqty" },
      { title: "dmeai", dataKey: "dmeai" },
      { title: "dmeissue", dataKey: "dmeissue" },
      { title: "dmepoqty", dataKey: "dmepoqty" },
      { title: "dmerqty", dataKey: "dmerqty" },
      { title: "readystock", dataKey: "readystock" },
      { title: "qcstoc", dataKey: "qcstoc" },
      { title: "dhsissue", dataKey: "dhsissue" }
    ];

    const rows = this.dataSource.data.map((row, index) => ({
      sno: index + 1,
      rcstatus: row.rcstatus,
      rcrate: row.rcrate,
      rcstartdt: row.rcstartdt,
      rcenddt: row.rcenddt,
      dhsai: row.dhsai,
      dhsissue: row.dhsissue,
      dhspoqty: row.dhspoqty,
      dhsrqty: row.dhsrqty,
      dmeai: row.dmeai,
      readystock: row.readystock,
      qcstock: row.qcstock,
      totalpiplie:row.totalpiplie
     // dhsissue: row.dhsissue
    }));

    autoTable(doc, {
      columns: columns,
      body: rows,
      startY: 30, // Adjusted to make space for the date and time
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] }
    });

    doc.save('iteminfo.pdf');
}
}
