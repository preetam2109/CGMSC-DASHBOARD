import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { PipelineDetails } from 'src/app/Model/PipelineDetails';



@Component({
  selector: 'app-total-pipe-line-dialog',
  templateUrl: './total-pipe-line-dialog.component.html',
  styleUrls: ['./total-pipe-line-dialog.component.css']
})
export class TotalPipeLineDialogComponent {
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['sno','pono','soissuedate','absqty','disqty','receiptabsqty', 'pipelineqty','expecteddeliverydate'];

  dataSource: MatTableDataSource<PipelineDetails>;
  itemname: string;
  strengtH1: string;
  sku: string;
  edltype: string;

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<TotalPipeLineDialogComponent>
  ) {
    this.dataSource = new MatTableDataSource(data.pipiLineDetails); // Set the dataSource with the warehouseStock
    this.itemname = data.itemname;
    this.strengtH1 = data.strengtH1;
    this.sku = data.sku;
    this.edltype=data.edltype;
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
      { title: "pono", dataKey: "pono" },
      { title: "soissuedate", dataKey: "soissuedate" },
      { title: "absqty", dataKey: "absqty" },
      { title: "disqty", dataKey: "disqty" },
      { title: "receiptabsqty", dataKey: "receiptabsqty" },
      { title: "pipelineqty", dataKey: "pipelineqty" },
      { title: "expecteddeliverydate", dataKey: "expecteddeliverydate" }
    ];

    const rows = this.dataSource.data.map((row, index) => ({
      sno: index + 1,
      pono: row.pono,
      soissuedate: row.soissuedate,
      absqty: row.absqty,
      disqty: row.disqty,
      receiptabsqty: row.receiptabsqty,
      pipelineqty: row.pipelineqty,
      expecteddeliverydate: row.expecteddeliverydate
    }));

    autoTable(doc, {
      columns: columns,
      body: rows,
      startY: 30, // Adjusted to make space for the date and time
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] }
    });

    doc.save('TotalPipeline.pdf');
}
}
