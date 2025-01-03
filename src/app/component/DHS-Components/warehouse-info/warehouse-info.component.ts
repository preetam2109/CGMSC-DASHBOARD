import { Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; 
import { ApiService } from 'src/app/service/api.service';
import { WarehouseInfo } from 'src/app/Model/WarehouseInfo';
import { GoogleMapsModule, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableExporterModule } from 'mat-table-exporter';
@Component({
  selector: 'app-warehouse-info',
  standalone: true,
  imports: [GoogleMapsModule,CommonModule,MatButtonModule,MatMenuModule, MatTableExporterModule,MatPaginatorModule, MatTableModule],
  templateUrl: './warehouse-info.component.html',
  styleUrls: ['./warehouse-info.component.css'],
})
export class WarehouseInfoComponent implements OnInit {
  dataSource!: MatTableDataSource<WarehouseInfo>;
  warehouseInfo: WarehouseInfo[] = [];
  parsedWarehouses: { lat: number; lng: number; name: string }[] = [];
  selectedWarehouse: any = null; // Holds the clicked warehouse details
  
  center = { lat: 22.1760124, lng: 82.1228984 }; // Default map center
  zoom = 8; // Default zoom level
  mapOptions: google.maps.MapOptions = {
    scrollwheel: true,
    disableDoubleClickZoom: false,
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  constructor(
    private spinner: NgxSpinnerService,
    private api: ApiService,
    private cdr: ChangeDetectorRef
  ) {
    this.dataSource = new MatTableDataSource<WarehouseInfo>([]);
  }

  ngOnInit() {
    this.spinner.show();
    this.GetWarehouseInfo();
    this.fetchWarehouseInfo();
  }
  onMarkerClick(warehouse: any, marker: MapMarker) {
    this.selectedWarehouse = warehouse; // Update the selected warehouse details
    if (this.infoWindow) {
      this.infoWindow.open(marker); // Open the InfoWindow at the clicked marker
    } else {
      console.error('InfoWindow instance not found');
    }
  }
  
  


  /**
   * Fetch warehouse information from API
   */
  GetWarehouseInfo() {
    this.spinner.show();
    this.api.getWarehouseInfo(0).subscribe(
      (res) => {
        // Map API response and calculate parsed warehouse positions
        this.warehouseInfo = res.map((item: any, index: number) => ({
          ...item,
          sno: index + 1, // Add serial number
        }));

        this.parsedWarehouses = this.warehouseInfo.map((item) => ({
          lat: parseFloat(item.latitude),
          lng: parseFloat(item.longitude),
          name: item.warehousename,
        }));

        this.dataSource.data = this.warehouseInfo;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.spinner.hide();
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error fetching data', error);
        this.spinner.hide();
      }
    );
  }

  fetchWarehouseInfo() {
    
    this.api.getWarehouseInfo(0).subscribe((res) => {
      this.warehouseInfo = res.map((item: any) => ({
        ...item,
        position: {
          lat: parseFloat(item.latitude),
          lng: parseFloat(item.longitude),
        },
      }));
    });
  }
  /**
   * Apply text filter to the table
   */
  applyTextFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Export table data to PDF
   */
  exportToPDF() {
    const doc = new jsPDF('l', 'mm', 'a4');
    
    // Add title and date/time
    const now = new Date();
    const dateString = now.toLocaleDateString();
    const timeString = now.toLocaleTimeString();
    const title = 'Warehouse Info Report';
    const pageWidth = doc.internal.pageSize.getWidth();
    const titleWidth = doc.getTextWidth(title);
    const xOffset = (pageWidth - titleWidth) / 2;

    doc.setFontSize(18);
    doc.text(title, xOffset, 20);

    doc.setFontSize(10);
    doc.text(`Date: ${dateString} Time: ${timeString}`, 10, 10);

    // Define table columns and rows
    const columns = [
      { title: "S.No", dataKey: "sno" },
      { title: "Warehouse", dataKey: "warehousename" },
      { title: "nosfac", dataKey: "nosfac" },
      { title: "address", dataKey: "address" },
      { title: "email", dataKey: "email" },
      { title: "latitude", dataKey: "latitude" },
      { title: "longitude", dataKey: "longitude" },
      { title: "nosvehicle", dataKey: "nosvehicle" },
      { title: "nosdist", dataKey: "nosdist" },
      { title: "moB1", dataKey: "moB1" },
    ];

    const rows = this.warehouseInfo.map((row) => ({
      sno: row.sno,
      warehousename: row.warehousename,
      nosfac: row.nosfac,
      address: row.address,
      email: row.email,
      latitude: row.latitude,
      longitude: row.longitude,
      nosvehicle: row.nosvehicle,
      nosdist: row.nosdist,
      moB1: row.moB1,
    }));

    autoTable(doc, {
      columns: columns,
      body: rows,
      startY: 40,
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] },
    });

    doc.save('WarehouseInfo.pdf');
  }
}
