import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { WarehouseWiseStock } from 'src/app/Model/WarehouseWiseStock';

@Component({
  selector: 'app-warehouse-stock-dialog',
  templateUrl: './warehouse-stock-dialog.component.html',
  styleUrls: ['./warehouse-stock-dialog.component.css']
})
export class WarehouseStockDialogComponent {
  displayedColumns: string[] = [
    
    'warehousename',
    'supplierpipeline',
    'readyforissue',
    'iwhpipeline',
    'pending',
    'issuedfy'
  ];

  dataSource: MatTableDataSource<WarehouseWiseStock>;
  itemcode: string;
  itemname: string;
  strengtH1: string;
  sku: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<WarehouseStockDialogComponent>
  ) {
    this.dataSource = new MatTableDataSource(data.warehouseStock); // Set the dataSource with the warehouseStock
    this.itemcode = data.itemcode;
    this.itemname = data.itemname;
    this.strengtH1 = data.strengtH1;
    this.sku = data.sku;
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }


  //  exportToPDF(): void {
  //   const doc = new jsPDF('l', 'mm', 'a4');
  //   const columns = [
  //     { title: "S.No", dataKey: "sno" },
  //     { title: "Warehouse", dataKey: "warehousename" },
  //     { title: "Ready", dataKey: "readyforissue" },
  //     { title: "UC QC", dataKey: "pending" },
  //     { title: "supplierpipeline", dataKey: "supplierpipeline" },
  //     { title: "iwhpipeline", dataKey: "iwhpipeline" },
      
  //   ];

  //   const rows = this.dataSource.data.map((row, index) => ({
  //     sno: index + 1,
  //     warehousename: row.warehousename,
  //     readyforissue: row.readyforissue,
  //     pending: row.pending,
  //     supplierpipeline: row.supplierpipeline,
  //     iwhpipeline: row.iwhpipeline,
      
  //   }));

  //   autoTable(doc, {
  //     columns: columns,
  //     body: rows,
  //     startY: 20,
  //     theme: 'striped',
  //     headStyles: { fillColor: [22, 160, 133] }
  //   });

  //   doc.save('WarehouseStock.pdf');
  // }
  exportToPDF(): void {
    const doc = new jsPDF('l', 'mm', 'a4');

    // Get current date and time
    const now = new Date();
    const dateString = now.toLocaleDateString();
    const timeString = now.toLocaleTimeString();
  
    // Set font size for the title
    doc.setFontSize(18);
  
    // Calculate the position to center the title
    const pageWidth = doc.internal.pageSize.getWidth();
    const title = 'Warehouse Wise Current Stock';
    const textWidth = doc.getTextWidth(title);
    const xOffset = (pageWidth - textWidth) / 2;
  
    // Add centered title
    doc.text(title, xOffset, 20); // Centered title at position Y=20
  
    // Set font size for the date, time, and additional fields
    doc.setFontSize(10);
  
    // Add the date and time to the top-left corner
    doc.text(`Date: ${dateString} Time: ${timeString}`, 10, 10); // Top-left at position X=10, Y=10
    
    // Add itemcode, itemname, strength1, and sku as separate lines, left and right aligned
    doc.text(`Item Code: ${this.itemcode || ''}`, 30, 30); // Left-aligned at position X=30, Y=30
    doc.text(`Item Name: ${this.itemname || ''}`, pageWidth - 100, 30); // Right-aligned at position X=pageWidth - 100, Y=30
    doc.text(`Strength: ${this.strengtH1 || ''}`, 30, 40); // Left-aligned at position X=30, Y=40
    doc.text(`SKU: ${this.sku || ''}`, pageWidth - 100, 40); // Right-aligned at position X=pageWidth - 100, Y=40
    
    const columns = [
      { title: "S.No", dataKey: "sno" },
      { title: "Item Code", dataKey: "itemcode" },
      { title: "Item Name", dataKey: "itemname" },
      { title: "Strength", dataKey: "strengtH1" },
      { title: "SKU", dataKey: "sku" },
      { title: "Warehouse", dataKey: "warehousename" },
      { title: "Ready", dataKey: "readyforissue" },
      { title: "Under QC", dataKey: "pending" },
      { title: "Supplier Pipeline", dataKey: "supplierpipeline" },
      { title: "IWH Pipeline", dataKey: "iwhpipeline" },
      { title: "CFY Issued Quantity", dataKey: "issuedfy" },
    ];

    const rows = this.dataSource.data.map((row, index) => ({
      sno: index + 1,
      itemcode: this.itemcode,
      itemname: this.itemname,
      strengtH1: this.strengtH1,
      sku: this.sku,
      warehousename: row.warehousename,
      readyforissue: row.readyforissue,
      pending: row.pending,
      supplierpipeline: row.supplierpipeline,
      iwhpipeline: row.iwhpipeline,
      issuedfy: row.issuedfy
    }));

    autoTable(doc, {
      columns: columns,
      body: rows,
      startY: 50, // Adjusted to make space for the date and time
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] }
    });

    doc.save('WarehouseStock.pdf');
}

  
}
