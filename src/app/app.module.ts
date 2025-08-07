import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { InputComponent } from './input/input.component';
import { MaterialModule } from './material-module';
// import { AutocompleteComponent } from './component/autocomplete/autocomplete.component';
import { FormsModule } from '@angular/forms';
import {  ReactiveFormsModule } from '@angular/forms';
import { MenubarComponent } from './component/menubar/menubar.component';
import { HomeComponent } from './component/home/home.component';
import { CardComponent } from './component/card/card.component';
// import { SliderComponent } from './component/slider/slider.component';
// import { TableComponent } from './component/table/table.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormdesignComponent } from './component/formdesign/formdesign.component';
// import { PopupComponent } from './component/popup/popup.component';
// import { AssociateComponent } from './component/associate/associate.component';
// import { UserdetailComponent } from './component/userdetail/userdetail.component';
import {MatTabsModule} from '@angular/material/tabs';
import { RCDetailReportComponent } from './rcdetail-report/rcdetail-report.component';
import { ComplaintsComponent } from './component/complaints/complaints.component';
import { ApexChartComponent } from './component/apex-chart/apex-chart.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { MatTableExporterModule } from 'mat-table-exporter';
import { DispatchPendingComponent } from './component/dispatch-pending/dispatch-pending.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ReceiptPendingComponent } from './component/receipt-pending/receipt-pending.component';
import { InstallationPendingComponent } from './component/installation-pending/installation-pending.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { DHSComponent } from './component/dhs/dhs.component';
import { DispatchPendingOneComponent } from './component/dispatch-pending-one/dispatch-pending-one.component';
import { DatePipe } from '@angular/common';
import { LoginComponent } from './component/auth/login/login.component';
import { LogoutComponent } from './component/auth/logout/logout.component';
import { ToastrModule } from 'ngx-toastr';
import { EmdComponent } from './component/emd/emd.component';
import { EmdPendingComponent } from './component/emd-pending/emd-pending.component';
import { EmdReleasedComponent } from './component/emd-released/emd-released.component';
// import { EmdEndingTenderwiseComponent } from './component/emd-ending-tenderwise/emd-ending-tenderwise.component';
import { EmdPendingTenderwiseComponent } from './component/emd-pending-tenderwise/emd-pending-tenderwise.component';
import { EmdDashboardComponent } from './component/emd-dashboard/emd-dashboard.component';
import { WhStockAbstractComponent } from './component/wh-stock-abstract/wh-stock-abstract.component';
import { WhStockDrugsComponent } from './component/wh-stock-drugs/wh-stock-drugs.component';
import { WhStockConsumablesComponent } from './component/wh-stock-consumables/wh-stock-consumables.component';
import { WhStockReagentComponent } from './component/wh-stock-reagent/wh-stock-reagent.component';
import { IndentPendingWHComponent } from './component/indent-pending-wh/indent-pending-wh.component';
import { CGMSCStockDetailsComponent } from './component/cgmscstock-details/cgmscstock-details.component';
import { CgmscstockDrugsComponent } from './component/cgmscstock-drugs/cgmscstock-drugs.component';
import { CgmscstockConsumablesComponent } from './component/cgmscstock-consumables/cgmscstock-consumables.component';
import { CgmscstockAyushComponent } from './component/cgmscstock-ayush/cgmscstock-ayush.component';
import { CgmscstockReagentComponent } from './component/cgmscstock-reagent/cgmscstock-reagent.component';
import { WarehouseStockDialogComponent } from './component/warehouse-stock-dialog/warehouse-stock-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { NearExpiryComponent } from './component/near-expiry/near-expiry.component';
import { IndentPendingWhDasComponent } from './component/indent-pending-wh-das/indent-pending-wh-das.component';
import { ReagentIndentPendingWhComponent } from './component/reagent-indent-pending-wh/reagent-indent-pending-wh.component';
import { ReagentIssueComponent } from './component/reagent-issue/reagent-issue.component';
import { TotalPipeLineDialogComponent } from './component/total-pipe-line-dialog/total-pipe-line-dialog.component';
import { ItemDialogComponent } from './component/item-dialog/item-dialog.component';
import { QcPendingsComponent } from './component/qc-pendings/qc-pendings.component';
import { NocApprovalComponent } from './component/noc-approval/noc-approval.component';
import { QcPendingPickWhComponent } from './component/qc-pending-pick-wh/qc-pending-pick-wh.component';
import { QcPendingDropHoComponent } from './component/qc-pending-drop-ho/qc-pending-drop-ho.component';
import { CategorySelectionComponent } from './component/category-selection/category-selection.component';
import { IwhPendingComponent } from './component/iwh-pending/iwh-pending.component';
import { IwhPendingTabOneComponent } from './component/iwh-pending-tab-one/iwh-pending-tab-one.component';
import { IwhPendingTabTwoComponent } from './component/iwh-pending-tab-two/iwh-pending-tab-two.component';
import { NOCComponent } from './component/noc/noc.component';
import { NOCPendingAtCGMSCComponent } from './component/nocpending-at-cgmsc/nocpending-at-cgmsc.component';
import { CgmscstockDetailsDrugsComponent } from './component/cgmscstock-details-drugs/cgmscstock-details-drugs.component';
import { CgmscstockDetailsConsumablesComponent } from './component/cgmscstock-details-consumables/cgmscstock-details-consumables.component';
import { CgmscstockDetailsReagentComponent } from './component/cgmscstock-details-reagent/cgmscstock-details-reagent.component';
import { CgmscstockDetailsAyushComponent } from './component/cgmscstock-details-ayush/cgmscstock-details-ayush.component';
import { QCResultsComponent } from './component/qcresults/qcresults.component';
import { QCLabSendComponent } from './component/qc-lab-send/qc-lab-send.component';
import { DistributionComponent } from './component/distribution/distribution.component';
import { QcDasboardLabComponent } from './component/qc-dasboard-lab/qc-dasboard-lab.component';
import { QcPendingToPickLabComponent } from './component/qc-pending-to-pick-lab/qc-pending-to-pick-lab.component';
import {APP_BASE_HREF} from '@angular/common';
import { VehicleTrackingComponent } from './component/vehicle-tracking/vehicle-tracking.component';
import { InTransitIssuesComponent } from './component/warehouse/in-transit-issues/in-transit-issues.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatButtonModule } from '@angular/material/button';



@NgModule({ declarations: [
        AppComponent,
        // InputComponent,
        // AutocompleteComponent,
        MenubarComponent,
        HomeComponent,
        CardComponent,
        // SliderComponent,
        // TableComponent,
        FormdesignComponent,
        // PopupComponent,
        // AssociateComponent,
        // UserdetailComponent,
        // FooterComponent,
        RCDetailReportComponent,
        ComplaintsComponent,
        ApexChartComponent,
        DispatchPendingComponent,
        ReceiptPendingComponent,
        InstallationPendingComponent,
        DHSComponent,
        DispatchPendingOneComponent,
        LoginComponent,
        LogoutComponent,
        EmdComponent,
        EmdPendingComponent,
        EmdReleasedComponent,
        // EmdEndingTenderwiseComponent,
        EmdPendingTenderwiseComponent,
        EmdDashboardComponent,
        WhStockAbstractComponent,
        WhStockDrugsComponent,
        WhStockConsumablesComponent,
        WhStockReagentComponent,
        IndentPendingWHComponent,
        CGMSCStockDetailsComponent,
        CgmscstockDrugsComponent,
        CgmscstockConsumablesComponent,
        CgmscstockAyushComponent,
        CgmscstockReagentComponent,
        WarehouseStockDialogComponent,
        NearExpiryComponent,
        IndentPendingWhDasComponent,
        ReagentIndentPendingWhComponent,
        ReagentIssueComponent,
        TotalPipeLineDialogComponent,
        ItemDialogComponent,
        QcPendingsComponent,
        NocApprovalComponent,
        QcPendingPickWhComponent,
        QcPendingDropHoComponent,
        CategorySelectionComponent,
        IwhPendingComponent,
        IwhPendingTabOneComponent,
        IwhPendingTabTwoComponent,
        NOCComponent,
        NOCPendingAtCGMSCComponent,
        CgmscstockDetailsDrugsComponent,
        CgmscstockDetailsConsumablesComponent,
        CgmscstockDetailsReagentComponent,
        CgmscstockDetailsAyushComponent,
        QCResultsComponent,
        QCLabSendComponent,
        // DistributionComponent,
        QcDasboardLabComponent,
        QcPendingToPickLabComponent,
        VehicleTrackingComponent,
        InTransitIssuesComponent,
    ],
    bootstrap: [AppComponent], imports: [
      NgSelectModule,
        // FormsModule,
        CommonModule,
        DatePipe,
        FontAwesomeModule,
        NgxSpinnerModule.forRoot({ type: 'line-scale-party' }),
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        MatTabsModule,
        NgApexchartsModule,
        MatDialogModule,
        MatTableModule,
        GoogleMapsModule,
        MatTableExporterModule,MatButtonModule,
        ToastrModule.forRoot({
            positionClass: 'toast-top-right' // Set the position to top right
        })
        // MatTabGroup
    ], providers: [DatePipe, 
      { provide: APP_BASE_HREF, useValue: '/mdang/' }, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
 }
