import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgSelectModule } from '@ng-select/ng-select';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { MatTableExporterModule } from 'mat-table-exporter';
import { NgxSpinnerService } from 'ngx-spinner';
// import { MatTableExporterModule } from 'mat-table-exporter';
// import { SelectDropDownModule } from 'ngx-select-dropdown/lib/ngx-select-dropdown.module';
import { DropdownModule } from 'primeng/dropdown';
import { EmployeeDetail, GetLocation } from 'src/app/Model/Attendence';
import { HOTender } from 'src/app/Model/TenderStatus';
import { ApiService } from 'src/app/service/api.service';
import { InsertUserPageViewLogmodal} from 'src/app/Model/DashLoginDDL';
import { Location } from '@angular/common';
@Component({
  selector: 'app-conversation-hod-cgmsc',
  standalone: true,
  imports: [MatTableExporterModule,DropdownModule, MatSelectModule, FormsModule, NgSelectModule, FormsModule, CommonModule, MatButtonModule, MatMenuModule,  MatPaginatorModule, MatTableModule],

  templateUrl: './conversation-hod-cgmsc.component.html',
  styleUrl: './conversation-hod-cgmsc.component.css'
})
export class ConversationHodCgmscComponent {


    
      dataSource!: MatTableDataSource<HOTender>;
      employeeDetail:HOTender[]=[]
    
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
    
      location: any[] = [];
      locationId: any;
      iswh:any=0;
      InsertUserPageViewLogdata: InsertUserPageViewLogmodal = new InsertUserPageViewLogmodal();

      pageName: string = '';
      fullUrl: string = '';
      constructor(public api:ApiService,private spinner: NgxSpinnerService,private locations: Location,) {
        this.pageName = this.locations.path();
        this.fullUrl = window.location.href;
        this.dataSource = new MatTableDataSource<HOTender>([]);
    
      }
    
      ngOnInit(): void {
    this.GetLocationDDL();
   
this.InsertUserPageViewLog();
      }
    
      change(value:any) {
        this.iswh = value;
        this.GetLocationDDL();  // <-- Make sure to call this here
        
      }
      
      onISelectChange(event: Event): void {
    
        const selectedUser = this.location.find((user: { locationId: string }) => user.locationId === this.locationId);
    
        if (selectedUser) {
          this.locationId = selectedUser.locationId || null;
          // this.getTravelVouchers()
    
        } else {
          console.error('Selected itemid not found in the list.');
        }
      }
      GetLocationDDL(){
      
        this.api.GetLocationDDL(this.iswh).subscribe((res:any[])=>{
          // console.log(' Vehicle API dropdown Response:', res);
          if (res && res.length > 0) {
            this.location = res.map(item => ({
              locationId: item.locationId, // Adjust key names if needed
              locationName : item.locationName,
              
              
            }));
            // console.log('VehicleNoDropDownList :', this.VehicleNoDropDownList);
          } else {
            console.error('No nameText found or incorrect structure:', res);
          }
        });  
      }
    
      show() {
        
        this.spinner.show();
        this.api.getConversationHodCgmsc().subscribe(

          (res) => {
            // Add serial numbers to the data

            this.employeeDetail = res.map((item, index) => ({
              ...item,
              sno: index + 1
            }));
    
            this.dataSource.data = this.employeeDetail;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.spinner.hide();
            // this.cdr.detectChanges();
          },
          (error) => {
            console.error('Error fetching data', error);
            this.spinner.hide();
          }
        );
        
      }
      applyTextFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      }
     


     
      
      
      
      
      
      exportToPDF() {
        const doc = new jsPDF('l', 'mm', 'a4'); // Landscape A4
      
        const columns = [
          { title: 'S.No', dataKey: 'sno' },
          { title: 'Scheme Name', dataKey: 'schemeName' },
          { title: 'HOD', dataKey: 'hod' },
          { title: 'Letter No', dataKey: 'letterNo' },
          { title: 'Letter Date', dataKey: 'letterDate' },
          { title: 'Remarks', dataKey: 'remarks' },
          { title: 'Send Date', dataKey: 'sendDate' },
          { title: 'Entry Date', dataKey: 'entryDate' },
          { title: 'File Path', dataKey: 'filePath' },
          { title: 'Received Date', dataKey: 'recvDate' },
          { title: 'Reply Letter No', dataKey: 'replyLetterNo' },
          { title: 'Reply Letter Date', dataKey: 'replyLetterDT' },
          { title: 'Reply Remarks', dataKey: 'replyRemarks' },
          { title: 'Reply File Path', dataKey: 'replyFilePath' }
        ];
      
        const rows = this.dataSource.data.map((row: any, index: number) => ({
          sno: index + 1,
          schemeName: row.schemeName || '',
          hod: row.hod || '',
          letterNo: row.letterNo || '',
          letterDate: row.letterDate || '',
          remarks: row.remarks || '',
          sendDate: row.sendDate || '',
          entryDate: row.entryDate || '',
          filePath: row.filePath || '',
          recvDate: row.recvDate || '',
          replyLetterNo: row.replyLetterNo || '',
          replyLetterDT: row.replyLetterDT || '',
          replyRemarks: row.replyRemarks || '',
          replyFilePath: row.replyFilePath || ''
        }));
      
        autoTable(doc, {
          columns: columns,
          body: rows,
          startY: 20,
          styles: {
            fontSize: 6.5,
            overflow: 'linebreak',
            cellWidth: 'wrap',
            cellPadding: 2,
          },
          columnStyles: {
            sno: { cellWidth: 10 },
            schemeName: { cellWidth: 45 },
            hod: { cellWidth: 20 },
            letterNo: { cellWidth: 30 },
            letterDate: { cellWidth: 20 },
            remarks: { cellWidth: 40 },
            sendDate: { cellWidth: 20 },
            entryDate: { cellWidth: 20 },
            filePath: { cellWidth: 35 },
            recvDate: { cellWidth: 20 },
            replyLetterNo: { cellWidth: 30 },
            replyLetterDT: { cellWidth: 20 },
            replyRemarks: { cellWidth: 40 },
            replyFilePath: { cellWidth: 35 }
          },
          headStyles: { fillColor: [0, 123, 255] },
          didDrawPage: function (data) {
            doc.setFontSize(10);
            doc.text('', 14, 15);
          },
          margin: { left: 10, right: 10 },
          tableWidth: 'wrap',
          horizontalPageBreak: true
        });
      
        doc.save('HodConversationDetails.pdf');
      }
      
      


      InsertUserPageViewLog() {
        try {
          // debugger
          const roleIdName = localStorage.getItem('roleName') || '';
          const userId = Number(sessionStorage.getItem('userid') || 0);
          const roleId = Number(sessionStorage.getItem('roleId') || 0);
          // const userName = sessionStorage.getItem('firstname') || '';
          const ipAddress = sessionStorage.getItem('ipAddress') || '';
          const userAgent = navigator.userAgent; 
          this.InsertUserPageViewLogdata.logId = 0; 
          this.InsertUserPageViewLogdata.userId = userId;
          this.InsertUserPageViewLogdata.roleId = roleId;
          this.InsertUserPageViewLogdata.roleIdName = roleIdName;
          this.InsertUserPageViewLogdata.pageName = this.pageName;
          this.InsertUserPageViewLogdata.pageUrl = this.fullUrl;
          this.InsertUserPageViewLogdata.viewTime = new Date().toISOString();
          this.InsertUserPageViewLogdata.ipAddress = ipAddress;
          this.InsertUserPageViewLogdata.userAgent = userAgent;
          //console.log('InsertUserPageViewLogdata=',this.InsertUserPageViewLogdata);
      // if(localStorage.getItem('Log Saved')|| ''!){
    
      // }
          // API call
          this.api.InsertUserPageViewLogPOST(this.InsertUserPageViewLogdata).subscribe({
            next: (res: any) => {
              console.log('Page View Log Saved:',res);
              // const LogSaved='Log Saved'
              // localStorage.setItem('Log Saved', LogSaved);
            },
            error: (err: any) => {
              console.error('Backend Error:', JSON.stringify(err.message));
            }
          });
      
        } catch (err: any) {
          console.error('Error:', err.message);
        }
      }
    }
    