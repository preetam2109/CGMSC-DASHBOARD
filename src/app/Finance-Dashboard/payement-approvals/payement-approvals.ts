import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payement-approvals',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payement-approvals.html',
  styleUrl: './payement-approvals.css',
})
export class PayementApprovals {
  searchText: string = '';

  searchTimeout: any;
  currentPage: number = 1;

  itemsPerPage: number = 10;

  paginatedList: any[] = [];

  totalPages: number = 0;
  activeTab: string = 'send';
  mcid: any = 1;
  selectedFundHead: any = '';
  selectAll: boolean = false;
  // API DATA
  fundHeadList: any;
  selectedCategoryRadio: any = 'Drugs';


  originalGridList: any[] = [];
  currentGridList: any[] = [];

  fileReceivers: any[] = [];
  selectedReceiver: any = '';

  constructor(
    private toastr: ToastrService,
    public api: ApiService,

  ) {

  }


  paymentList: any[] = [];

  ngOnInit(): void {
    this.getFileReceivers();
    this.selectCategory(this.selectedCategoryRadio)
    this.changeTab('send');
  }
  selectCategory(category: string): void {

    this.selectedCategoryRadio = category;
    if (this.selectedCategoryRadio === 'Drugs') {
      this.mcid = 1;
    } else if (this.selectedCategoryRadio === 'Consumables') {
      this.mcid = 2;
    } else if (this.selectedCategoryRadio === 'Reagent') {
      this.mcid = 3;
    } else if (this.selectedCategoryRadio === 'AYUSH') {
      this.mcid = 4;
    }
    this.getFundHeadList()
    this.GetemdpolistReturnFromMD()

  }

  updatePagination() {

    this.totalPages = Math.ceil(
      this.currentGridList.length / this.itemsPerPage
    );

    const startIndex =
      (this.currentPage - 1) * this.itemsPerPage;

    const endIndex =
      startIndex + this.itemsPerPage;

    this.paginatedList =
      this.currentGridList.slice(startIndex, endIndex);

  }

  nextPage() {

    if (this.currentPage < this.totalPages) {

      this.currentPage++;

      this.updatePagination();

    }

  }

  previousPage() {

    if (this.currentPage > 1) {

      this.currentPage--;

      this.updatePagination();

    }

  }



  getFundHeadList() {

    this.api.getemdpolist(this.mcid).subscribe({

      next: (res: any) => {

        this.originalGridList = res;

        this.currentGridList = res;

        this.currentPage = 1;

        this.updatePagination();

      },

      error: (err: any) => {

        console.log(err);

      }

    });

  }

  getFileReceivers() {

    this.api.selectFileReceiver().subscribe({
      next: (res: any) => {
        this.fileReceivers = res;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  onSearchInput() {

    // CLEAR PREVIOUS TIMER
    clearTimeout(this.searchTimeout);

    // WAIT 300ms
    this.searchTimeout = setTimeout(() => {

      this.filterTableData();

    }, 300);

  }

  GetemdpolistReturnFromMD() {

    this.api.getemdpolistReturnFromMD(this.mcid).subscribe({

      next: (res: any) => {

        this.originalGridList = res;

        this.currentGridList = res;

        this.currentPage = 1;

        this.updatePagination();

      },

      error: (err: any) => {

        console.log(err);

      }

    });

  }

  filterTableData() {

    const search = this.searchText
      ?.trim()
      .toLowerCase();

    // RESET
    if (!search) {

      this.currentGridList = [...this.originalGridList];

      this.currentPage = 1;

      this.updatePagination();

      return;

    }

    this.currentGridList =
      this.originalGridList.filter((item: any) => {

        return (

          String(item.pono || '')
            .toLowerCase()
            .includes(search)

          ||

          String(item.supplierName || '')
            .toLowerCase()
            .includes(search)

          ||

          String(item.fileNo || '')
            .toLowerCase()
            .includes(search)

          ||

          String(item.grossAmount || '')
            .toLowerCase()
            .includes(search)

        );

      });

    this.currentPage = 1;

    this.updatePagination();

  }

  changeTab(tab: string) {

    this.activeTab = tab;

    // TO BE SENT TO MD
    if (tab === 'send') {

      this.getFundHeadList();

    }

    // RECEIVED FROM MD
    else {

      this.GetemdpolistReturnFromMD();

    }

  }

  toggleAllSelection() {

    this.currentGridList.forEach(item => {

      item.selected = this.selectAll;

    });

  }

  clearSelection() {

    this.selectAll = false;

    this.currentGridList.forEach(item => {

      item.selected = false;

    });

  }

  submitToMD() {

    // GET SELECTED ROWS
    const selectedRows = this.currentGridList.filter(
      item => item.selected
    );

    // VALIDATION
    if (selectedRows.length === 0) {

      alert('Please select at least one record');

      return;

    }

    // CURRENT DATE
    const today = new Date().toISOString().split('T')[0];

    // API CALL COUNTER
    let completedCalls = 0;

    selectedRows.forEach(item => {

      // SEND TO MD
      if (this.activeTab === 'send') {

        this.api.ForwardToMD(
          today,
          item.ponoid
        ).subscribe({

          next: (res: any) => {

            completedCalls++;

            // ALL COMPLETED
            if (completedCalls === selectedRows.length) {

              this.clearSelection();
              this.toastr.success('Successfully Sent To MD');
              this.getFundHeadList();

            }

          },

          error: (err: any) => {

            console.log(err);
            completedCalls++;

            if (completedCalls === selectedRows.length) {
              this.clearSelection();
              this.getFundHeadList();
            }

          }

        });

      }

      // RECEIVED FROM MD
      else {

        this.api.ReceivedFromMD(
          today,
          item.ponoid
        ).subscribe({

          next: (res: any) => {

            completedCalls++;

            // ALL COMPLETED
            if (completedCalls === selectedRows.length) {

              this.clearSelection();
              this.toastr.success('Successfully Received From MD');
              this.GetemdpolistReturnFromMD();

            }

          },

          error: (err: any) => {

            console.log(err);
            completedCalls++;

            if (completedCalls === selectedRows.length) {
              this.clearSelection();
              this.GetemdpolistReturnFromMD();
            }

          }

        });

      }

    });

  }

  forwardFile() {

    // GET SELECTED ROWS
    const selectedRows = this.currentGridList.filter(
      item => item.selected
    );

    // VALIDATION
    if (selectedRows.length === 0) {
      alert('Please select at least one record');
      return;
    }

    if (!this.selectedReceiver) {
      alert('Please select a file receiver');
      return;
    }

    // CURRENT DATE
    const today = new Date().toISOString().split('T')[0];
    const fromUserId = sessionStorage.getItem('userid') || 0;

    // API CALL COUNTER
    let completedCalls = 0;

    selectedRows.forEach(item => {
      this.api.fileForwarding(today, item.ponoid, this.selectedReceiver, fromUserId
      ).subscribe({

        next: (res: any) => {

          completedCalls++;

          // ALL COMPLETED
          if (completedCalls === selectedRows.length) {

            this.clearSelection();
            this.toastr.success('Successfully Received and Forwarded File');
            this.GetemdpolistReturnFromMD(); // Refresh list

          }

        },

        error: (err: any) => {

          console.log(err);
          completedCalls++;

          if (completedCalls === selectedRows.length) {
            this.clearSelection();
            this.GetemdpolistReturnFromMD();
          }

        }

      });
    });

  }

}