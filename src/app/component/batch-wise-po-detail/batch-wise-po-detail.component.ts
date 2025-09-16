import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatTableExporterModule } from 'mat-table-exporter';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DropdownModule } from 'primeng/dropdown';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-batch-wise-po-detail',
  standalone: true,
  imports: [ MatTableModule,
    MatTableExporterModule, MatIconModule,NgSelectModule,SelectDropDownModule,DropdownModule,MatSelectModule,FormsModule,NgSelectModule,
    FormsModule,CommonModule,MatButtonModule,MatMenuModule,MatPaginatorModule,MatSortModule,MatDialogModule, 
    NgApexchartsModule],
  templateUrl: './batch-wise-po-detail.component.html',
  styleUrl: './batch-wise-po-detail.component.css'
})
export class BatchWisePoDetailComponent {

  mcid=1
  suplierId:any
  tenderid=0
  ponoid=0
  Analysisvalue=0;
  selectedCategory: string = 'Drugs';
  selectedYearId: number | null = null;
  selectedLabele:any;
  selectedSupplierLabele:any;
  selectedTenderNoLabele:any
  selectedPONoLabele:any
  selectedAnalysisValue: string | null = null;
  selectedAnalysisLabel: string | null = null;
  MasIndentitemslist:any
  MasSupplierPO:any
  MasSchemePO:any
  MasPOSummary:any
  itemid:any
  schemeid:any



  years = [
    // { id: 539, label: '2019-2020' },
    // { id: 540, label: '2020-2021' },
    // { id: 541, label: '2021-2022' },
    { id: 542, label: '2022-2023' },
    { id: 544, label: '2023-2024' },
    { id: 545, label: '2024-2025' },
    { id: 546, label: '2025-2026' }
  ];

  constructor(public toastr: ToastrService,private cdr: ChangeDetectorRef,public api:ApiService,private spinner: NgxSpinnerService,private dialog: MatDialog,)
  {
  }

  ngOnInit(){

    
this.getItemNoDropDown();
this.getMasSupplierPODropDown();
this.getMasMasSchemePODropDown();
this.getMasMasPOSummaryDropDown();

  }
  onYearChange(event: any) {
    this.selectedYearId = +event.target.value;
   
    const selectedLabel = event.target.options[event.target.selectedIndex].text;
    this.selectedLabele=selectedLabel
  
    console.log('Selected Year ID:', this.selectedYearId);
    console.log('Selected Year Label:', selectedLabel);
  }
  onSupplierNameChange(event: any) {
    

    const selectedSupplier = this.MasSupplierPO.find((s: { supplierid: number; suppliername: string }) => s.supplierid === this.suplierId);

    this.selectedSupplierLabele = selectedSupplier ? selectedSupplier.suppliername : '';
  
    console.log('Selected Supplier ID:', this.suplierId);
    console.log('Selected Supplier Label:', this.selectedSupplierLabele);

  }
  
  onTenderNoChange(event: any) {
    
    const selectedScheme = this.MasSchemePO.find((s:{schemeid:number; schemename:string})=>s.schemeid===this.schemeid)
   
    
    this.selectedTenderNoLabele=selectedScheme ? selectedScheme.schemename:'';
  
    console.log('Selected tid ID:', this.schemeid);
    console.log('Selected tid Label:', this.selectedTenderNoLabele);
  }
  onPoNoChange(event: any) {
    const selectedPoNo = this.MasPOSummary.find((p:{ponoid:number;name:string})=>p.ponoid===this.ponoid)
   
    const selectedLabel = selectedPoNo?selectedPoNo.name :'';
    this.selectedPONoLabele=selectedLabel
  
    console.log('Selected ponoid ID:', this.ponoid);
    console.log('Selected pono Label:', selectedLabel);
  }
  onAnalysisChange(event: Event): void {
    
    const selectElement = event.target as HTMLSelectElement;
    this.selectedAnalysisValue = selectElement.value;
    this.selectedAnalysisLabel = selectElement.options[selectElement.selectedIndex].text;

    console.log('Selected analysis value:', this.selectedAnalysisValue);
    console.log('Selected analysis label:', this.selectedAnalysisLabel);
  }
  onISelectChange(event: Event): void {
    

    const selectedUser = this.MasIndentitemslist.find((user: { itemid: string }) => user.itemid === this.itemid); 
  
    if (selectedUser) {
      this.itemid=selectedUser.itemid || null;
      // this.getTravelVouchers()
  
    } else {
      console.error('Selected itemid not found in the list.');
    }
  }

  getItemNoDropDown() {
    
    this.api.MasitemsPO(0,0,this.mcid,0,0,0,0,0,0,0,0,0,0).subscribe({
      next: (res: any[]) => {
        if (res && res.length > 0) {
          this.MasIndentitemslist = res.map(item => ({
            itemid: item.itemid,
            itemname: item.itemname
          }));
          console.log('list', this.MasIndentitemslist);
        } else {
          console.error('No nameText found or incorrect structure:', res);
          this.MasIndentitemslist = [];
        }
      },
      error: (err) => {
        console.error('Error fetching dropdown items:', err);
        this.toastr.error('Failed to load item dropdown');
        this.MasIndentitemslist = [];
      }
    });
  }

  getMasSupplierPODropDown() {
    
    this.api.MasSupplierPO(0,0,this.mcid,0,0,0,0,0).subscribe({
      next: (res: any[]) => {
        if (res && res.length > 0) {
          this.MasSupplierPO = res.map(item => ({
            supplierid: item.supplierid,
            suppliername: item.suppliername
          }));
          console.log('list', this.MasSupplierPO);
        } else {
          console.error('No nameText found or incorrect structure:', res);
          this.MasSupplierPO = [];
        }
      },
      error: (err) => {
        console.error('Error fetching dropdown items:', err);
        this.toastr.error('Failed to load item dropdown');
        this.MasSupplierPO = [];
      }
    });
  }
  getMasMasSchemePODropDown() {
    
    this.api.MasSchemePO(0,0,0,this.mcid,0,0,0,0,0).subscribe({
      next: (res: any[]) => {
        if (res && res.length > 0) {
          this.MasSchemePO = res.map(item => ({
            schemeid: item.schemeid,
            schemename: item.schemename
          }));
          console.log('list', this.MasSchemePO);
        } else {
          console.error('No nameText found or incorrect structure:', res);
          this.MasSchemePO = [];
        }
      },
      error: (err) => {
        console.error('Error fetching dropdown items:', err);
        this.toastr.error('Failed to load item dropdown');
        this.MasSchemePO = [];
      }
    });
  }
  getMasMasPOSummaryDropDown() {
    
    this.api.MasPOSummary(0,0,0,this.mcid,0,0,0,0,0).subscribe({
      next: (res: any[]) => {
        if (res && res.length > 0) {
          this.MasPOSummary = res.map(item => ({
            ponoid: item.ponoid,
            name: item.name
          }));
          console.log('list', this.MasPOSummary);
        } else {
          console.error('No nameText found or incorrect structure:', res);
          this.MasPOSummary = [];
        }
      },
      error: (err) => {
        console.error('Error fetching dropdown items:', err);
        this.toastr.error('Failed to load item dropdown');
        this.MasPOSummary = [];
      }
    });
  }

  updateSelectedHodid(): void {
    
    // Reset hodid to 0 initially
    this.mcid = 0;

    // Map the selected category to the corresponding mcid value
    if (this.selectedCategory==='Drugs' ) {
      this.mcid = 1;
      // this.chartOptions.title.text = this.OnChangeTitle +  this.selectedCategory;
    } else if (this.selectedCategory==='Consumables') {
      this.mcid = 2;
      // this.chartOptions.title.text = this.OnChangeTitle + this.selectedCategory;
    } else if (this.selectedCategory==='Reagent') {
      this.mcid = 3;
      // this.chartOptions.title.text = this.OnChangeTitle +  this.selectedCategory;
    } else if (this.selectedCategory==='AYUSH') {
      this.mcid = 4;
      // this.chartOptions.title.text =this.OnChangeTitle +  this.selectedCategory;
    }

    // console.log('Selected Hod ID:', this.mcid);
  }
  
}
