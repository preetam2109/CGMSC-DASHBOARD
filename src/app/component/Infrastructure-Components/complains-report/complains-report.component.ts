import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort,MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatTableExporterModule } from 'mat-table-exporter';
import { NgxSpinnerService } from 'ngx-spinner';
import { MaterialModule } from 'src/app/material-module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import {  ToastrService } from 'ngx-toastr';
import { ComplaintReportmodel,ComplainTypesmodel,Complainmodel } from 'src/app/Model/DashLoginDDL';
import { ApiService } from 'src/app/service/api.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
@Component({
  selector: 'app-complains-report',
  standalone: true,
  imports: [MaterialModule,MatSortModule, MatPaginatorModule, MatTableModule, NgSelectModule, FormsModule,
    MatTableExporterModule, CommonModule],
  templateUrl: './complains-report.component.html',
  styleUrl: './complains-report.component.css'
})
export class ComplainsReportComponent {

  dataSource!: MatTableDataSource<ComplaintReportmodel>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('paginator1') paginator1!: MatPaginator;
  @ViewChild('sort1') sort1!: MatSort;
  dispatchData: ComplaintReportmodel[] = [];
  displayedColumns: string[] = [
    "sno",
    // "feedbackID",
    "firstName",
    "lastName",
    "email",
    "mobileNumber",
    "city",
    "subject",
    "typeName",
    "complainName",
    "comments",
    "createdDate",
    // "pdfFilePath",
    "divname_en",
    "work_text",
    "action"

    // sno: number
    // feedbackID: number
    // firstName: string
    // lastName: string
    // email: string
    // mobileNumber: string
    // city: string
    // subject: string
    // typeName: string
    // complainName: string
    // comments: string
    // createdDate: string
    // pdfFilePath: string
    // divname_en: string
    // work_text: string
  ];
  selectedColor: any;
  ComplainTypes: ComplainTypesmodel[] = [];
  Complain: Complainmodel[] = [];
  typeName: any;
  complainName:any;
  complainTypeid: any;
  complainid: any;
  constructor(public api: ApiService, private cdr: ChangeDetectorRef, private router: Router
    , private spinner: NgxSpinnerService,private toastr: ToastrService) {
    this.dataSource = new MatTableDataSource<ComplaintReportmodel>([]);
  }

  ngOnInit(): void {
    this.GetComplainTypes();
    // this.GetCategory();
    this.GetComplaintReportmodel(0,0,0);
  }
  GetComplainTypes() {
    try {
      this.spinner.show();
      this.api.ComplainTypes().subscribe(
        (res) => {
          this.ComplainTypes = res;
          // this.ComplainTypes = [{ coreDept: 'All' }, ...res];
          // this.department=res
          //  var data =res; 
          // console.log(' ComplainTypes=', this.ComplainTypes);
          this.spinner.hide();
        },
        (error) => {
          alert(`Error fetching data: ${JSON.stringify(error.message)}`);
        }
      );
    } catch (err: any) {
      this.spinner.hide();

      console.log(err);
      // throw err;
    }
  }
  onselectGetComplainTypes(event: any): void {
   
    this.complainTypeid=event.complainTypeID;
    this.GETComplains(event.complainTypeID);

    // const selectedUser = this.ComplainTypes.find(
    //   (user: { complainTypeID: any }) => user.complainTypeID === this.typeName
    // );
    // if (selectedUser) {
    //   var name = selectedUser?.typeName;
    //   var complainTypeID = selectedUser?.complainTypeID;
    //   console.log('complainTypeID=:',complainTypeID)
    //   // if (name == 'All') {
    //   //   this.GetEmployeeList(0);

    //   // }else{this.GetEmployeeList(name); }
    //   this.GETComplains(complainTypeID);
    // } else {
    //   alert('Selected complain Type ID not found in the list.');
    // }
  }
  onselectGetcomplain(event: any): void {
    this.complainid=event.complainID;
  //  let complainID= event.complainID;
  this.GetComplaintReportmodel(this.complainTypeid,this.complainid,0);
  //  console.log('complainID=',complainID);
    // const selectedUser = this.Complain.find(
    //   (user: { complainID: any }) => user.complainID === this.complainName
    // );

    // if (selectedUser) {
    //   var name = selectedUser?.complainName;
    //   var complainID = selectedUser?.complainID;
    //   console.log('complainID=:',complainID)
    //   // if (name == 'All') {
    //   //   this.GetEmployeeList(0);

    //   // }else{this.GetEmployeeList(name); }
    //   // this.GETComplains(complainTypeID);
    // } else {
    //   alert('Selected complain ID not found in the list.');
    // }
  }
 GETComplains(complainTypeId:any){
    try {
      // this.spinner.show();
      this.api.Complains(complainTypeId).subscribe(
        (res) => {
          this.Complain = res;
          // this.ComplainTypes = [{ coreDept: 'All' }, ...res];
          // this.department=res
          //  var data =res;
          // console.log(' Complain=', this.Complain);
          // this.spinner.hide();
        },
        (error) => {
          alert(`Error fetching data: ${JSON.stringify(error.message)}`);
        }
      );
    } catch (err: any) {
      this.spinner.hide();

      console.log(err);
      // throw err;
    }
  }
 


  // ComplainsReport(complainTypeId:any,complainId:any,city:any){
  //   //https://www.cgmsc.gov.in/himis_apin/api/LandIssue/FeedbackReport?complainTypeId=0&complainId=0&city=0
  //   return this.http.get<any[]>(`${this.himis_apin}/LandIssue/FeedbackReport?complainTypeId=${complainTypeId}&complainId=${complainId}&city=${city}`);
  // }

  GetComplaintReportmodel(complainTypeId: any, complainId: any,city:any) {
    try {
      // if (Scheme_Name0 == 'All') {
      //   Scheme_Name0 = 0;
      // }
      // if (Category_Name0 == 'All') {
      //   Category_Name0 = 0;
      // }
// debugger;
      this.spinner.show();
      this.api.ComplainsReport(complainTypeId,complainId,city)
        // this.Service.get('GetDrugTenderList?n=0')
        .subscribe(
          (res) => {
            this.dispatchData = res.map(
              (item: ComplaintReportmodel, index: number) => ({
                ...item,
                sno: index + 1,
              })
            );
            // console.log('GetComplaintReportmodel=:', this.dispatchData);
             
            this.dataSource.data = this.dispatchData;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.cdr.detectChanges();
            this.spinner.hide();
          },
          (error) => {
            this.spinner.hide();
           // alert(`Error fetching data: ${JSON.stringify(error.message)}`);
           console.log('Error fetching data:=',error.message)
              // this.toastr.error(`Error fetching data: ${error.message}`, 'Error!');
          }
        );
    }
    catch (err: any) {
      this.spinner.hide();

      console.log('Error fetching data:=',err.message)
      // this.toastr.error(`Error fetching data: ${err.message}`, 'Error!');
      // throw err;
    }
  }

  applyTextFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  exportToPDF() {
    const doc = new jsPDF('l', 'mm', 'a4'); 
  
    const now = new Date();
    const dateString = now.toLocaleDateString();
    const timeString = now.toLocaleTimeString();
  
    const title = 'Complaint Report';
    doc.setFontSize(18);
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getTextWidth(title);
    const xOffset = (pageWidth - textWidth) / 2;
    doc.text(title, xOffset, 20);
  
    doc.setFontSize(10);
    doc.text(`Date: ${dateString}  Time: ${timeString}`, 10, 10);
  
    const columns = [
      { header: 'S.No', dataKey: 'sno' },
      { header: 'Complaint ID', dataKey: 'feedbackID' },
      { header: 'First Name', dataKey: 'firstName' },
      { header: 'Last Name', dataKey: 'lastName' },
      { header: 'Email', dataKey: 'email' },
      { header: 'Mobile Number', dataKey: 'mobileNumber' },
      { header: 'City', dataKey: 'city' },
      { header: 'Subject', dataKey: 'subject' },
      { header: 'Type', dataKey: 'typeName' },
      { header: 'Complain Name', dataKey: 'complainName' },
      { header: 'Comments', dataKey: 'comments' },
      { header: 'Created Date', dataKey: 'createdDate' },
      { header: 'Division', dataKey: 'divname_en' },
      { header: 'Work Text', dataKey: 'work_text' },
      { header: 'PDF Path', dataKey: 'pdfFilePath' }
    ];
    // const rows = this.rcvalidstatusdetail.map((row: any, index: number) => ({
    const rows = this.dispatchData.map((row: any, index: number) => ({
        sno: index + 1,
        feedbackID: row.feedbackID,
        firstName: row.firstName,
        lastName: row.lastName,
        email: row.email,
        mobileNumber: row.mobileNumber,
        city: row.city,
        subject: row.subject,
        typeName: row.typeName,
        complainName: row.complainName,
        comments: row.comments,
        createdDate: row.createdDate,
        divname_en: row.divname_en,
        work_text: row.work_text,
        pdfFilePath: row.pdfFilePath
      })
    );
  
    autoTable(doc, {
      columns: columns,
      body: rows,
      startY: 30,
      theme: 'striped',
      styles: { fontSize: 8, cellWidth: 'wrap' },
      headStyles: { fillColor: [22, 160, 133] },
      didDrawCell: (data) => {
        // Optionally handle large text wrapping
      }
    });
  
    doc.save('ComplaintReport.pdf');
  }
  
  openPdf(filePath: string) {
    const baseUrl = 'https://cgmsc.gov.in/HIMISO/';
    const relativePath = filePath.replace(/^[A-Z]:\\IIS\\HIMIS\\/, '').replace(/\\/g, '/');
    // const relativePath = filePath.replace(/^D:\\IIS\\HIMIS\\/, '').replace(/\\/g, '/');
    const cleanedUrl = baseUrl + relativePath;
    window.open(cleanedUrl, '_blank');
  }
  



    onButtonClick(URL: any){
      
    if(URL !== ""){
      // "D:\\IIS\\HIMIS\\Upload\\FeedbackUploads\\4a5ae1d8-da27-483b-ab57-ce4a3c6883f5.pdf",
      // https://cgmsc.gov.in/HIMISO/Upload/FeedbackUploads/ABC_Analysis_24_25_WithCurrentRC_BiDStatus.pdf
      const cleanedUrl = 'https://cgmsc.gov.in/HIMISO/' + URL.replace(/^~\//, '');
      window.open(cleanedUrl, '_blank');
      // console.log('Opening:', cleanedUrl);
      // const cleanedUrl = 'https://cgmsc.gov.in/cgmscl/' + URL.replace(/^~\//, '');
      // console.log('Opening:', cleanedUrl);
      window.open(URL, '_blank');
    }
  //  else if (fileName && URL) {
  //     // Remove '~' from the start of the URL
  //     const cleanedUrl = 'https://cgmsc.gov.in/cgmscl/' + URL.replace(/^~\//, '');
  //     // console.log('Opening:', cleanedUrl);
  //     window.open(cleanedUrl, '_blank');
  //   } 
    else {
      alert(
        '⚠️ Alert: Attachment File Not Found!\n\nThe requested document is missing.\nPlease try again later or contact support.'
      );
    }
  //   if(fileName=="Apply Online"){
  //     // const cleanedUrl = 'https://cgmsc.gov.in/cgmscl/' + URL.replace(/^~\//, '');
  //     // console.log('Opening:', cleanedUrl);
  //     window.open(URL, '_blank');
  //   }
  //  else if (fileName && URL) {
  //     // Remove '~' from the start of the URL
  //     const cleanedUrl = 'https://cgmsc.gov.in/cgmscl/' + URL.replace(/^~\//, '');
  //     // console.log('Opening:', cleanedUrl);
  //     window.open(cleanedUrl, '_blank');
  //   } else {
  //     alert(
  //       '⚠️ Alert: Attachment File Not Found!\n\nThe requested document is missing.\nPlease try again later or contact support.'
  //     );
  //   }

      }

}
