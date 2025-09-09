import { CommonModule ,Location} from '@angular/common';
import { Component } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { ApiService } from 'src/app/service/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import{ComplainTypesmodel,Complainmodel,InsertComplainmodel,InsertUserPageViewLogmodal} from 'src/app/Model/DashLoginDDL';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { WorkFill} from 'src/app/Model/DashProgressCount';
@Component({
  selector: 'app-complaint-t-hospital-bu-construction',
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule, SelectDropDownModule,ToastrModule,ReactiveFormsModule],
  templateUrl: './complaint-t-hospital-bu-construction.component.html',
  styleUrl: './complaint-t-hospital-bu-construction.component.css',
})
export class ComplaintTHospitalBuConstructionComponent {
  captcha = '7G5K2';
  fileError: string = '';
  selectedFile: File | null = null;
  InsertUserPageViewLogdata: InsertUserPageViewLogmodal = new InsertUserPageViewLogmodal();
  ComplainTypes: ComplainTypesmodel[] = [];
  Complain: Complainmodel[] = [];
    workfill: WorkFill[] = [];
  InsertComplaindata: InsertComplainmodel = new InsertComplainmodel();
  typeName: any;
  complainName:any;
  searchname:any;
  submitted = false;
  complainForm: FormGroup ;
  complainTypeid: any;
  complainid: any;

  items = null;
  workID: any;
  sr: any;
  ImageName: any;
  himisDistrictid: any;
  divisionid: any;
  roleName:any;
  pageName: string = '';
  fullUrl: string = '';
  constructor(public api: ApiService, public spinner: NgxSpinnerService, private formBuilder: FormBuilder, private location: Location,
    private toastr: ToastrService,
  ) {
    this.pageName = this.location.path();
    this.fullUrl = window.location.href;
    this.complainForm = this.formBuilder.group({
      feedbackID: [0],  
      createdDate: [new Date().toISOString()],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [''],
      // email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      subject: ['', Validators.required],
      complainTypeID: ['', Validators.required],
      complainID: ['', Validators.required],
      comments: ['', Validators.required],
      PdfFile: [null, Validators.required], 
      captchaInput: ['', Validators.required],
      work_ID: ['', Validators.required],
      Divisionid: ['']
    });
  }

  ngOnInit(): void {
    this.GetComplainTypes();
   this.getworkfill();
   this.InsertUserPageViewLog();
  }

  

  generateCaptcha(): void {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    this.captcha = Array.from({ length: 6 }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join('');
  }
  onFileSelected(event: any) {
    // ;
    const file = event.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        this.fileError = 'Only PDF files are allowed!';
        this.complainForm.patchValue({ PdfFile: null });
        return;
      }
      if (file.size > 1024 * 1024) {
        this.fileError = 'File must be less than 1 MB!';
        this.complainForm.patchValue({ PdfFile: null });
        return;
      }
      this.fileError = '';
      this.selectedFile = file;
    
    
    }
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
          console.log(' ComplainTypes=', this.ComplainTypes);
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
  get formControl() {
    return this.complainForm.controls;
  }
  OnSubmit() {
    try {
// ;
      this.submitted = true;
      this.complainForm.patchValue({ Divisionid: this.divisionid });
      if (
        this.complainForm.value.captchaInput.toLowerCase() !== this.captcha.toLowerCase()
      ) {
        this.toastr.error('Invalid Captcha', 'Error!', {
          positionClass: 'toast-center'
        });
        this.generateCaptcha();
        return;
      }
  
      if (this.complainForm.valid) {
        const formData = new FormData();
  
        formData.append('feedbackID', this.complainForm.value.feedbackID ?? 0);
        formData.append('firstName', this.complainForm.value.firstName ?? '');
        formData.append('lastName', this.complainForm.value.lastName ?? '');
        formData.append('email', this.complainForm.value.email ?? '');
        formData.append('mobileNumber', (this.complainForm.value.mobileNumber ?? '').toString());
        formData.append('address', this.complainForm.value.address ?? '');
        formData.append('city', this.complainForm.value.city ?? '');
        formData.append('subject', this.complainForm.value.subject ?? '');
        formData.append('complainTypeID', this.complainForm.value.complainTypeID ?? 0);
        formData.append('complainID', this.complainForm.value.complainID ?? 0);
        formData.append('comments', this.complainForm.value.comments ?? '');
        formData.append('createdDate', this.complainForm.value.createdDate ?? '2025-07-19T15:45:00.000Z');
        formData.append('work_ID', this.complainForm.value.work_ID ?? 0);
        formData.append('Divisionid', this.complainForm.value.Divisionid ?? 0);
        
   
        if (this.selectedFile) {
          formData.append('PdfFile',this.selectedFile);
        }
        // console.log("---- FormData Debug Start ----");
        // for (let [key, value] of (formData as any).entries()) {
        //   console.log(`${key} =`, value);
        // }
        // console.log("---- FormData Debug End ----");
        

        this.api.InsertComplainsPOST(formData).subscribe(
          (res: any) => {
            this.toastr.success(res.message, 'Success', {
              positionClass: 'toast-center'
            });
            this.complainForm.reset();
            this.complainForm.markAsPristine();
            this.complainForm.markAsUntouched();
            this.submitted = false;
          },
          (err: any) => {
            console.error('Backend Error Message:', err.message);
            this.toastr.error(err.error?.message || 'Submission failed', 'Error', {
              positionClass: 'toast-center'
            });
          }
        );
      } else {
        this.toastr.error('Something went wrong, please try again!', 'Error!', {
          positionClass: 'toast-center'
        });
      }
    } catch (err: any) {
      console.log('error:=', err.message);
    }
  }
  
  getworkfill(): void {
    try {
      var roleName = localStorage.getItem('roleName');
      if (roleName == 'Division') {
        this.divisionid = sessionStorage.getItem('divisionID');
        this.himisDistrictid = 0;
       
      } else if (roleName == 'Collector') {
        this.himisDistrictid = sessionStorage.getItem('himisDistrictid');
        this.divisionid = 0;
      } else {
        this.himisDistrictid = 0;
        this.divisionid = 0;
      }
      this.api
        .WorkFill(0, 0, this.divisionid, this.himisDistrictid, 0)
        .subscribe(
          (res) => {
            // console.log('res', JSON.stringify(res));
            this.workfill = res; 

            this.spinner.hide();
          },
          (error) => {
            this.spinner.hide();
            alert(`Error fetching data: ${JSON.stringify(error)}`);
          }
        );
    } catch (ex: any) {
      this.spinner.hide();
      console.error('Exception:', ex.message);
    }
  }
  onGetDistrictsSelect(selectedWorkID: any): void {
    // alert(`Selected Work ID: ${selectedWorkID}`);
    this.workID = selectedWorkID.value.worK_ID;
    alert(`Selected Work ID: ${this.workID}`);

    console.log('Selected Work ID: ',JSON.stringify(selectedWorkID));
    this.workfill = this.workfill.filter(
      (item) => item.worK_ID !== selectedWorkID
    );
    this.spinner.show();
 
  }
  InsertUserPageViewLog() {
    try {
      // 
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
      // console.log('InsertUserPageViewLogdata=',this.InsertUserPageViewLogdata);
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
