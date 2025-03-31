import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MenuServiceService {
 



 
  private selectedCategory:
    | 'DrugsConsumables'
    | 'EquipmentReagent'
    | 'Infrastructure'
    | undefined;
  private menu: {
    [role: string]: {
      categories?: {
        [category: string]: {
          label: string;
          route: string;
          submenu?: { label: string; route: string }[];
        }[];
      };
      items?: {
        label: string;
        route: string;
        submenu?: { label: string; route: string }[];
      }[];
    };
  } = {
    SEC1: {
      categories: {
        DrugsConsumables: [
          { label: 'Home', route: '/home' },
          { label: 'Dashboard', route: '/welcome' },
          { label: 'QC Insights ', route: '/qc-dashboard' },
          { label: 'Finance', route: '/finance-dash' },
          { label: 'DHS Dashboard', route: '/dhsdash' },
          { label: 'CME Dashboard', route: '/cmedash' },
   
          // {
          //   label: 'Health Facilities Coverage',
          //   route:  '/FacCoverage',
          //   submenu: [
          //     { label: 'District Details', route:  '/districtDetails' },
          //     { label: 'Facility Details', route:  '/facilityDetails' }
          //   ]
          // },
          { label: 'EMD Drugs/Consumables', route: '/emd' },
          { label: 'Health Facilities Coverage', route: '/FacCoverage' },
          { label: 'Warehouse Information', route: '/WarehouseInfo' },
          { label: 'Warehouse Stock Abstract', route: '/whStockAbstract' },
          { label: 'Warehouse Stock Details', route: '/stockDetails' },
          { label: 'Field Stock', route: '/field-stock' },
          { label: 'Warehouse Stock-out %', route: '/StockoutSummary' },
          { label: 'Warehouse Indent Pending', route: '/IndentPendingWHdash' },
          { label: 'Seasonal Drugs', route: '/SeasonDrugs' },
          { label: 'Growth In Procurment', route: '/GrowthInProcurmentTab' },
          { label: 'Growth in Distribution', route: '/distribution' },
          { label: 'Near Expiry', route: '/nearExpiry' },
          { label: 'Devlivery', route: '/Devlivery' },

          // { label: 'QC Courier', route:  '/QcPendings' },
          // { label: 'QC-Lab Issues', route:  '/qc-dash' },
          { label: 'Quality Control', route: '/qc-dashboard' },
          {
            label: 'Quality Control Track',
            submenu: [
              { label: 'QC Courier', route: '/QcPendings' },
              { label: 'QC-Lab Issues', route: '/qc-dash' },
            ],
            route: '/welcome',
          },

          { label: 'IWH Pendings', route: '/iwhPending' },
          { label: 'NOC', route: '/noc' },
          { label: 'ANPR Report ', route: '/vehicleTracking' },

          // {label:'Quality Controll'

          // },
          // Menu=Quality Controll
          {
            label: 'Time-Based Analysis',

            submenu: [
              {
                label: 'Door Delivery App Uses',
                route: '/DropAppWarehousePerformance',
              },
              {
                label: 'Time Taken By Supplier',
                route: '/timetakenBySupplier',
              },
              { label: 'Paid Time Taken', route: '/PaidTimeTaken' },
              { label: 'QC Time Taken', route: '/QcTimeTaken' },

              // { label: 'Facility Details', route:  '/facilityDetails' }
            ],
            route: '/welcome',
          },

          // { label: 'In-Transit Issues', route:  '/intransitIssues' },
        ],
        EquipmentReagent: [
          { label: 'Home', route: '/home' },
          { label: 'RCDetail', route: '/Rcdetail' },
          { label: 'Complaints', route: '/complaints' },
          { label: 'Supply/Installation Status', route: '/dispatchPending' },
          { label: 'Orders', route: '/dhs' },
          { label: 'Reagent Issue', route: '/ReagentIssue' },
        ],
        Infrastructure: [
          { label: 'Home', route: '/home' },
          // { label: 'Home', route: 'InfrastructureHome' },
          // { label: 'DashProgressIstCount', route: 'DashProgressIstCount' },
          // { label: 'SearchingWork', route: 'SearchingWork' },
          // { label: 'District Progress', route: 'District Progress' },
          // { label: 'DivisionProgress', route: 'DivisionProgress' },
          { label: 'Search Work', route: '/SearchingWork' },

          { label: 'Work Abstract', route: '/InfrastructureHome' },

          { label: 'Progress on Scheme', route: '/SchemeWiseDetails' },
          { label: 'Administrative Sanction', route: '/AdministrativeSanction' },

          { label: 'Live Tender', route: '/LiveTender' },
          { label: ' Evaluation', route: '/TenderEvaluation' },
          { label: 'To be Tender', route: '/ToBeTender' },
          
          { label: 'Work Order', route: '/WorkOrder' },
          { label: 'Running Works', route: '/RunningWork' },
          { label: 'Land Issue', route: '/LandIssue' },
          { label: 'Technical Sanction', route: '/TechnicalSanction' },
          // { label: 'District-Progress Monitoring', route: 'DashProgressIstCount' },
          { label: 'Monitoring with Geographic Coordinate', route: 'DivisionProgress' },
          // { label: 'District Progress Monitoring', route: 'District Progress' },
          { label: 'Handover', route: 'Handover' },

          { label: 'Engineer-Works', route: '/EngineerWorks' },
          { label: 'Payment', route: '/PriceEvaluation' },

          // { label: 'Payment', route: 'Payment' },

          // { label: 'RCDetail', route:  '/Rcdetail' },
          // { label: 'Complaints', route:  '/complaints' },
          // { label: 'Pending', route:  '/dispatchPending' },
          // { label: 'Orders', route:  '/dhs' },
          // { label: 'Reagent Issue', route:  '/ReagentIssue' },
        ],
      },
    },
    Collector: {
      categories: {
        DrugsConsumables: [
          { label: 'Home', route: '/home' },
          { label: 'Dashboard', route: '/card' },
          { label: 'Facilities Coverage', route: '/FacCoverage' },
          // { label: 'Warehouse Information', route: '/WarehouseInfo' },
          { label: 'CGMSC Supplies', route: '/cgmsc-supplies' },
          { label: 'Stock Details', route: '/stockDetails' },
          { label: 'District DHS Stock', route: '/DistDHSStock' },
          { label: 'Facility Wise Stock', route: '/FacilityWiseStock' },
          { label: 'DdlItemWiseInHandQty', route: '/DdlItemWiseInHandQty' },
          { label: 'Indent Delivery Entry', route: '/Devlivery' },

          { label: 'HODYearWiseIssuance', route: '/HODYearWiseIssuance' },
          { label: 'Warehouse Indent Pending', route: '/IndentPendingWHdash' },
          { label: 'Seasonal Drugs', route: '/SeasonDrugs' },
        ],
        EquipmentReagent: [{ label: 'Home', route: '/home' }],
        Infrastructure: [
          // // { label: 'Home', route: 'InfrastructureHome' },
          // // { label: 'DashProgressIstCount', route: 'DashProgressIstCount' },
          // // { label: 'SearchingWork', route: 'SearchingWork' },
          // // { label: 'District Progress', route: 'District Progress' },
          // // { label: 'DivisionProgress', route: 'DivisionProgress' },
          // { label: 'Search Work', route: 'SearchingWork' },
          // { label: 'Work Abstract ', route: 'InfrastructureHome' },
          // { label: 'Live Tender', route: 'LiveTender' },

          // { label: 'District Progress Monitoring', route: 'DashProgressIstCount' },
          // { label: 'Division Progress Monitoring', route: 'DivisionProgress' },
          // // { label: 'District Progress Monitoring', route: 'District Progress' },
          // { label: 'Work Order', route: 'WorkOrder' },
          // { label: 'Land Issue', route: 'LandIssue' },

          // { label: 'Handover', route: 'Handover' },
          // { label: 'Engineer-Works', route: 'EngineerWorks' },
          // { label: 'Technical Sanction', route: 'TechnicalSanction' },

          { label: 'Verticals', route: '/home' },
          // { label: 'Home', route: 'InfrastructureHome' },
          // { label: 'DashProgressIstCount', route: 'DashProgressIstCount' },
          // { label: 'SearchingWork', route: 'SearchingWork' },
          // { label: 'District Progress', route: 'District Progress' },
          // { label: 'DivisionProgress', route: 'DivisionProgress' },
          { label: 'Search Work', route: '/SearchingWork' },
          { label: 'Work Abstract', route: '/InfrastructureHome' },
          // { label: 'Live Tender', route: '/LiveTender' },
          // { label: 'Evaluation', route: '/TenderEvaluation' },
          // { label: 'To be Tender', route: '/ToBeTender' },

          { label: 'Work Order', route: '/WorkOrder' },
          { label: 'Running Works', route: '/RunningWork' },

          { label: 'Land Issue', route: '/LandIssue' },
          // { label: 'Technical Sanction', route: '/TechnicalSanction' },
          // { label: 'District Progress Monitoring', route: 'DashProgressIstCount' },
          { label: 'Monitoring with Geographic Coordinate', route: 'DivisionProgress' },
          // { label: 'District Progress Monitoring', route: 'District Progress' },
          { label: 'Handover', route: 'Handover' },
          // { label: 'Scheme-Wise Details', route: '/SchemeWiseDetails' },
          // { label: 'Engineer-Works', route: '/EngineerWorks' },
          // { label: 'Payment', route: 'PriceEvaluation' },
        ],
      },
    },
    DHS: {
      categories: {
        DrugsConsumables: [
          { label: 'Home', route: '/home' },
          { label: 'Dashboard', route: '/dhsdash' },
          { label: 'Finance', route: '/finance-dash' },
          { label: 'Health Facilities Coverage', route: '/FacCoverage' },
          { label: 'Warehouse Information', route: '/WarehouseInfo' },
          { label: 'Stock Abstract', route: '/whStockAbstract' },
          { label: 'DHS Seasonal Drugs', route: '/SeasonDrugs' },
          { label: 'Growth In Procurment', route: '/GrowthInProcurmentTab' },
          { label: 'Growth in Distribution', route: '/distribution' },
          { label: 'Demand vs Supply', route: '/EdlNonEdlIssuePercentSummary' },
          // { label: 'Issue Per Wise Per Click', route:  '/IssuePerWisePerClick' },
          { label: 'DHS Supplied %', route: '/IssuedPerWise' },
          {
            label: 'DHS Stock Availablity %',
            route: '/StockSummaryBalanceIndent',
          },
          { label: 'WH Indent Pending', route: '/IndentPendingWHdash' },
          { label: 'Warehouse Stock-out %', route: '/StockoutSummary' },

          { label: 'Near Expiry', route: '/nearExpiry' },
          { label: 'NOC', route: '/noc' },
          { label: 'District EDL Counts', route: '/DistrictWiseStk' },
          { label: 'DdlItemWiseInHandQty', route: '/DdlItemWiseInHandQty' },
          { label: 'Stock Position', route: '/DistFACwiseStockPostionNew' },
          {
            label: 'Time-Based Analysis',

            submenu: [
              {
                label: 'Time Taken By Supplier',
                route: '/timetakenBySupplier',
              },
              { label: 'Paid Time Taken', route: '/PaidTimeTaken' },
              { label: 'QC Time Taken', route: '/QcTimeTaken' },
              // { label: 'Facility Details', route:  '/facilityDetails' }
            ],
            route: '/',
          },
        ],
        EquipmentReagent: [{ label: 'Home', route: '/home' }],
        Infrastructure: [
          { label: 'Verticals', route: '/home' },
          // { label: 'Home', route: 'InfrastructureHome' },
          // { label: 'DashProgressIstCount', route: 'DashProgressIstCount' },
          // { label: 'SearchingWork', route: 'SearchingWork' },
          // { label: 'District Progress', route: 'District Progress' },
          // { label: 'DivisionProgress', route: 'DivisionProgress' },
          { label: 'Search Work', route: '/SearchingWork' },

          { label: 'Work Abstract', route: '/InfrastructureHome' },
        { label: 'Administrative Sanction', route: '/AdministrativeSanction' },


          { label: 'Live Tender', route: '/LiveTender' },
          { label: 'Evaluation', route: '/TenderEvaluation' },
          { label: 'To be Tender', route: '/ToBeTender' },

          { label: 'Work Order', route: '/WorkOrder' },
          { label: 'Running Works', route: '/RunningWork' },

          { label: 'Land Issue', route: '/LandIssue' },
          { label: 'Technical Sanction', route: '/TechnicalSanction' },
          // { label: 'Scheme-Wise Details', route: '/SchemeWiseDetails' },
          // { label: 'District Progress Monitoring', route: 'DashProgressIstCount' },
          { label: 'Monitoring with Geographic Coordinate', route: 'DivisionProgress' },
          // { label: 'District Progress Monitoring', route: 'District Progress' },
          { label: 'Handover', route: 'Handover' },

          { label: 'Engineer-Works', route: '/EngineerWorks' },
          { label: 'Payment', route: '/PriceEvaluation' },

          // // { label: 'Home', route: 'InfrastructureHome' },
          // // { label: 'DashProgressIstCount', route: 'DashProgressIstCount' },
          // // { label: 'SearchingWork', route: 'SearchingWork' },
          // // { label: 'District Progress', route: 'District Progress' },
          // // { label: 'DivisionProgress', route: 'DivisionProgress' }
          // { label: 'Search Work', route: 'SearchingWork' },
          // { label: 'Work Abstract', route: 'InfrastructureHome' },
          // { label: 'District Progress Monitoring', route: 'DashProgressIstCount' },
          // { label: 'Division Progress Monitoring', route: 'DivisionProgress' },
          // // { label: 'District Progress Monitoring', route: 'District Progress' },
          // { label: 'Work Order', route: 'WorkOrder' },
          // { label: 'Land Issue', route: 'LandIssue' },
          // { label: 'Live Tender', route: 'LiveTender' },

          // { label: 'Handover', route: 'Handover' },
          // { label: 'Engineer-Works', route: 'EngineerWorks' },
          // { label: 'Technical Sanction', route: 'TechnicalSanction' },
        ],
      },
    },
    CME: {
      categories: {
        DrugsConsumables: [
          { label: 'Home', route: '/home' },
          { label: 'Dashboard', route: '/cmedash' },
          { label: 'Finance', route: '/finance-dash' },

          { label: 'Stock Abstract', route: '/whStockAbstract' },
          { label: 'Growth in Distribution', route: '/distribution' },
        ],
        EquipmentReagent: [{ label: 'Home', route: '/home' }],
        Infrastructure: [
          { label: 'Verticals', route: '/home' },
          // { label: 'Home', route: 'InfrastructureHome' },
          // { label: 'DashProgressIstCount', route: 'DashProgressIstCount' },
          // { label: 'SearchingWork', route: 'SearchingWork' },
          // { label: 'District Progress', route: 'District Progress' },
          // { label: 'DivisionProgress', route: 'DivisionProgress' },
          { label: 'Search Work', route: '/SearchingWork' },

          { label: 'Work Abstract', route: '/InfrastructureHome' },
        { label: 'Administrative Sanction', route: '/AdministrativeSanction' },



          { label: 'Live Tender', route: '/LiveTender' },
          { label: 'Evaluation', route: '/TenderEvaluation' },
          { label: 'To be Tender', route: '/ToBeTender' },

          { label: 'Work Order', route: '/WorkOrder' },
          { label: 'Running Works', route: '/RunningWork' },

          { label: 'Land Issue', route: '/LandIssue' },
          { label: 'Technical Sanction', route: '/TechnicalSanction' },
          // { label: 'Scheme-Wise Details', route: '/SchemeWiseDetails' },
          // { label: 'District Progress Monitoring', route: 'DashProgressIstCount' },
          { label: 'Monitoring with Geographic Coordinate', route: 'DivisionProgress' },
          // { label: 'District Progress Monitoring', route: 'District Progress' },
          { label: 'Handover', route: 'Handover' },

          { label: 'Engineer-Works', route: '/EngineerWorks' },
          { label: 'Payment', route: '/PriceEvaluation' },

          // // { label: 'Home', route: 'InfrastructureHome' },
          // // { label: 'DashProgressIstCount', route: 'DashProgressIstCount' },
          // // { label: 'SearchingWork', route: 'SearchingWork' },
          // // { label: 'District Progress', route: 'District Progress' },
          // // { label: 'DivisionProgress', route: 'DivisionProgress' },
          // { label: 'Search Work', route: 'SearchingWork' },
          // { label: 'Work Abstract', route: 'InfrastructureHome' },
          // { label: 'District Progress Monitoring', route: 'DashProgressIstCount' },
          // { label: 'Division Progress Monitoring', route: 'DivisionProgress' },
          // // { label: 'District Progress Monitoring', route: 'District Progress' },
          // { label: 'Work Order', route: 'WorkOrder' },
          // { label: 'Land Issue', route: 'LandIssue' },
          // { label: 'Live Tender', route: 'LiveTender' },

          // { label: 'Handover', route: 'Handover' },
          // { label: 'Engineer-Works', route: 'EngineerWorks' },
          // { label: 'Technical Sanction', route: 'TechnicalSanction' },
        ],
      },
    },

    QC: {
      items: [
        { label: 'Home', route: '/home' },
        { label: 'QC Insights ', route: '/qc-dashboard' },

        { label: 'Stock Details', route: '/stockDetails' },
        { label: 'QC Courier', route: '/QcPendings' },
        { label: 'QC-Lab Issues', route: '/qc-dash' },
      ],
    },
    'GM Finance': {
      items: [
        { label: 'Home', route: '/home' },
        { label: 'Finance', route: '/finance-dash' },
        { label: 'Growth In Procurment', route: '/GrowthInProcurmentTab' },
        { label: 'Growth in Distribution', route: '/distribution' },
        { label: 'Payment', route: '/PriceEvaluation' },
       
      ],
    },
    'DMFin': {
      items: [
        { label: 'Home', route: '/home' },
        { label: 'Finance', route: '/finance-dash' },
        { label: 'Growth In Procurment', route: '/GrowthInProcurmentTab' },
        { label: 'Growth in Distribution', route: '/distribution' },
        { label: 'Payment', route: '/PriceEvaluation' },
       
      ],
    },

    "DM PO": {


      items: [
        { label: 'Home', route: '/welcome' },
        { label: 'QC Insights ', route: '/qc-dashboard' },
        { label: 'Finance', route: '/finance-dash' },
 
        // {
        //   label: 'Health Facilities Coverage',
        //   route:  '/FacCoverage',
        //   submenu: [
        //     { label: 'District Details', route:  '/districtDetails' },
        //     { label: 'Facility Details', route:  '/facilityDetails' }
        //   ]
        // },
        { label: 'EMD Drugs/Consumables', route: '/emd' },
        { label: 'Health Facilities Coverage', route: '/FacCoverage' },
        { label: 'Warehouse Information', route: '/WarehouseInfo' },
        { label: 'Warehouse Stock Abstract', route: '/whStockAbstract' },
        { label: 'Warehouse Stock Details', route: '/stockDetails' },
        { label: 'Field Stock', route: '/field-stock' },
        { label: 'Warehouse Stock-out %', route: '/StockoutSummary' },
        { label: 'Warehouse Indent Pending', route: '/IndentPendingWHdash' },
        { label: 'Seasonal Drugs', route: '/SeasonDrugs' },
        { label: 'Growth In Procurment', route: '/GrowthInProcurmentTab' },
        { label: 'Growth in Distribution', route: '/distribution' },
        { label: 'Near Expiry', route: '/nearExpiry' },
        { label: 'Devlivery', route: '/Devlivery' },

        // { label: 'QC Courier', route:  '/QcPendings' },
        // { label: 'QC-Lab Issues', route:  '/qc-dash' },
        { label: 'Quality Control', route: '/qc-dashboard' },
        {
          label: 'Quality Control Track',
          submenu: [
            { label: 'QC Courier', route: '/QcPendings' },
            { label: 'QC-Lab Issues', route: '/qc-dash' },
          ],
          route: '/welcome',
        },

        { label: 'IWH Pendings', route: '/iwhPending' },
        { label: 'NOC', route: '/noc' },
        { label: 'ANPR Report ', route: '/vehicleTracking' },

        // {label:'Quality Controll'

        // },
        // Menu=Quality Controll
        {
          label: 'Time-Based Analysis',

          submenu: [
            {
              label: 'Door Delivery App Uses',
              route: '/DropAppWarehousePerformance',
            },
            {
              label: 'Time Taken By Supplier',
              route: '/timetakenBySupplier',
            },
            { label: 'Paid Time Taken', route: '/PaidTimeTaken' },
            { label: 'QC Time Taken', route: '/QcTimeTaken' },

            // { label: 'Facility Details', route:  '/facilityDetails' }
          ],
          route: '/welcome',
        },

        // { label: 'In-Transit Issues', route:  '/intransitIssues' },
      ],


    },
     Public: {
      items: [
        { label: 'Dashboard', route: '/public-view1' }, // Internal route (keeps routerLink)
        { label: 'CGMSC Warehouse Wise Stock', route: 'http://140.238.246.250/DPDMISStock/GernalReport/warehouse.aspx'  },
        // { label: 'CGMSC Warehouse Wise Stock', route: 'href:http://140.238.246.250/DPDMISStock/GernalReport/warehouse.aspx' },
        // { label: 'Delivery Acknowledgement', route: '/DevliveryPublic' },
        { label: 'Health Facilities Coverage', route: '/FacCoveragePublic' },
        { label: 'Transport Vehicle Monitoring', route: 'https://dpdmis.in/gmapnew.aspx' },
        { label: 'CGMSC Total Stock', route: 'http://140.238.246.250/DPDMISStock/StockIssue/TotalStock1CGMSCL.aspx' },
        { label: 'CGMSC Warehouse Stock', route: 'http://140.238.246.250/DPDMISStock/Reports/RptWarehouseStockCGMSCL.aspx' },
        { label: 'CGMSC Item Wise Stock', route: 'http://140.238.246.250/DPDMISStock/Reports/DrugWisewarehousesrptCGMSCL.aspx' },
        { label: 'Item Wise Issuance', route: 'http://140.238.246.250/DPDMISStock/FacilityIssue/Cgmsc_Facility_Issue_Summary.aspx' },
        { label: 'Rate Contract Info', route: 'http://140.238.246.250/DPDMISStock/GernalReport/RC_reprot.aspx' },
        { label: 'Warehouse Information', route: '/WarehouseInfoPublic' },
        // { label: 'Search Works', route: '/SearchingWork' },
        // { label: 'Works Abstract', route: '/InfrastructureHome' },
        // { label: 'Running Work', route: '/RunningWork' },
        // { label: 'Handovers', route: 'Handover' },
        // { label: 'Monitoring with Geographic Coordinates', route: 'DivisionProgress' },
      ],
    },
    Infrastructure_Public: {
      items: [
        { label: 'Work Abstract', route: '/InfrastructureHomes' },
        { label: 'Search Work', route: '/SearchingWorks' },
        { label: 'Running Works', route: '/RunningWorks' },
        { label: 'Handover', route: '/Handovers' },
        { label: 'Monitoring with Geographic Coordinate', route: '/DivisionsProgress' },
      ],
    }
    ,
    SE: {
      items: [
        // { label: 'Verticals', route: '/home' },
        // { label: 'Home', route: 'InfrastructureHome' },
        // { label: 'DashProgressIstCount', route: 'DashProgressIstCount' },
        // { label: 'SearchingWork', route: 'SearchingWork' },
        // { label: 'District Progress', route: 'District Progress' },
        // { label: 'DivisionProgress', route: 'DivisionProgress' },
        { label: 'Search Work', route: '/SearchingWork' },
        { label: 'Work Abstract', route: '/InfrastructureHome' },
        { label: 'Administrative Sanction', route: '/AdministrativeSanction' },

        { label: 'Live Tender', route: '/LiveTender' },
        { label: 'Evaluation', route: '/TenderEvaluation' },
        { label: 'To be Tender', route: '/ToBeTender' },

        { label: 'Work Order', route: '/WorkOrder' },
        { label: 'Running Works', route: '/RunningWork' },

        { label: 'Land Issue', route: '/LandIssue' },
        { label: 'Technical Sanction', route: '/TechnicalSanction' },
        // { label: 'Scheme-Wise Details', route: '/SchemeWiseDetails' },
        // { label: 'District Progress Monitoring', route: 'DashProgressIstCount' },
        { label: 'Monitoring with Geographic Coordinate', route: 'DivisionProgress' },
        // { label: 'District Progress Monitoring', route: 'District Progress' },
        { label: 'Handover Insights', route: 'Handover' }, { label: 'Handover Insights', route: 'Handover' },
      

        { label: 'Engineer Work Tracker', route: '/EngineerWorks' },
        { label: 'Payment Tracker', route: '/PriceEvaluation' },

        // // { label: 'Verticals', route: 'home' },
        // // { label: 'Home', route: 'InfrastructureHome' },
        // // { label: 'DashProgressIstCount', route: 'DashProgressIstCount' },
        // // { label: 'SearchingWork', route: 'SearchingWork' },
        // // { label: 'District Progress', route: 'District Progress' },
        // // { label: 'DivisionProgress', route: 'DivisionProgress' },
        // { label: 'Search Work', route: 'SearchingWork' },
        // { label: 'Work Abstract', route: 'InfrastructureHome' },
        // { label: 'District Progress Monitoring', route: 'DashProgressIstCount' },
        // { label: 'Division Progress Monitoring', route: 'DivisionProgress' },
        // // { label: 'District Progress Monitoring', route: 'District Progress' },
        // { label: 'Work Order', route: 'WorkOrder' },
        // { label: 'Land Issue', route: 'LandIssue' },
        // { label: 'Live Tender', route: 'LiveTender' },
        // { label: 'Handover', route: 'Handover' },
        // { label: 'Engineer-Works', route: 'EngineerWorks' },
        // { label: 'Technical Sanction', route: 'TechnicalSanction' },
        // LiveTenderComponent
      ],
    },
    Warehouse: {
      items: [
        { label: 'Home', route: '/home' },
        { label: 'Warehouse Indent Pending', route: '/IndentPendingWHdash' },
        { label: 'Stock Details', route: '/stockDetails' },
        // { label: 'welcome', route:  '/home' },
        { label: ' Delivery Acknowledgement', route: '/Devlivery' },
        { label: 'QC Courier', route: '/QcPendings' },
        { label: 'Warehouse Stock-out %', route: '/StockoutSummary' },
        { label: 'Near Expiry', route: '/nearExpiry' },

        // { label: 'Health Facilities Coverage', route:  '/FacCoverage' },
        // { label: 'Warehouse Information', route:  '/WarehouseInfo' },
        { label: 'Vehicle Check in/out', route: '/vehicleTracking' },
        { label: 'In-Transit Issues', route: '/intransitIssues' },
        // { label: 'DHS Seasonal Drugs', route:  '/SeasonDrugs' },
      ],
    },

    // Collector: {
    //   items: [
    //     { label: 'Home', route:  '/home' },
    //     { label: 'Dashboard', route:  '/card' },
    //     { label: 'Health Facilities Coverage', route:  '/FacCoverage' },
    //       { label: 'Warehouse Information', route:  '/WarehouseInfo' },
    //     { label: 'Growth in Distribution', route:  '/distribution' },
    //     { label: 'HODYearWiseIssuance', route:  '/HODYearWiseIssuance' },

    //   ],
    // },
    Division: {
      items: [
        // { label: 'Verticals', route: '/home' },
        // { label: 'Home', route: 'InfrastructureHome' },
        // { label: 'DashProgressIstCount', route: 'DashProgressIstCount' },
        // { label: 'SearchingWork', route: 'SearchingWork' },
        // { label: 'District Progress', route: 'District Progress' },
        // { label: 'DivisionProgress', route: 'DivisionProgress' },
        { label: 'Search Work', route: '/SearchingWork' },
        { label: 'Work Abstract', route: '/InfrastructureHome' },
        { label: 'Administrative Sanction', route: '/AdministrativeSanction' },
        { label: 'Live Tender', route: '/LiveTender' },
        { label: 'Evaluation', route: '/TenderEvaluation' },
        // { label: 'Price Evaluation', route: 'PriceEvaluation' },
        { label: 'To be Tender', route: '/ToBeTender' },

        { label: 'Work Order', route: '/WorkOrder' },
        { label: 'Running Works', route: '/RunningWork' },

        { label: 'Land Issue', route: '/LandIssue' },
        { label: 'Technical Sanction', route: '/TechnicalSanction' },
        // { label: 'Scheme-Wise Details', route: '/SchemeWiseDetails' },
        // { label: 'District Progress Monitoring', route: 'DashProgressIstCount' },
        { label: 'Monitoring with Geographic Coordinate', route: 'DivisionProgress' },
        // { label: 'District Progress Monitoring', route: 'District Progress' },
        { label: 'Handover', route: 'Handover' },

        { label: 'Engineer-Works', route: '/EngineerWorks' },
        { label: 'Payment', route: '/PriceEvaluation' },

        // // { label: 'Home', route:  '/InfrastructureHome' },
        // // { label: 'DashProgressIstCount', route:  '/DashProgressIstCount' },
        // // { label: 'SearchingWork', route:  '/SearchingWork' },
        // // { label: 'District Progress', route:  '/District Progress' },
        // // { label: 'DivisionProgress', route:  '/DivisionProgress' },

        // { label: 'Search Work', route: 'SearchingWork' },
        // { label: 'Work Abstract', route: 'InfrastructureHome' },
        // { label: 'District Progress Monitoring', route: 'DashProgressIstCount' },
        // { label: 'Division Progress Monitoring', route: 'DivisionProgress' },
        // // { label: 'District Progress Monitoring', route: 'District Progress' },
        // { label: 'Work Order', route: 'WorkOrder' },
        // { label: 'Land Issue', route: 'LandIssue' },
        // { label: 'Live Tender', route: 'LiveTender' },

        // { label: 'Handover', route: 'Handover' },
        // { label: 'Engineer-Works', route: 'EngineerWorks' },
        // { label: 'Technical Sanction Pending', route: 'TechnicalSanction' },
      ],
    },
  };

  // Store selected category in localStorage to persist across page refreshes
  setSelectedCategory(
    category: 'DrugsConsumables' | 'EquipmentReagent' | 'Infrastructure'
  ) {
    this.selectedCategory = category;
    localStorage.setItem('selectedCategory', category); // Save category to localStorage
  }

  // Get the stored category from localStorage or memory
  getSelectedCategory():
    | 'DrugsConsumables'
    | 'EquipmentReagent'
    | 'Infrastructure'
    | undefined {
    if (!this.selectedCategory) {
      // If category is not set in memory, retrieve it from localStorage
      this.selectedCategory = localStorage.getItem('selectedCategory') as
        | 'DrugsConsumables'
        | 'EquipmentReagent'
        | 'Infrastructure'
        | undefined;
    }
    return this.selectedCategory;
  }

  getMenuItems(role: string): {
    label: string;
    route: string;
    submenu?: { label: string; route: string }[];
  }[] {
    const roleMenu = this.menu[role];

    if (!roleMenu) {
      return [];
    }

    const rolesUsingCategories = ['Collector', 'SEC1', 'DHS', 'CME'];

    if (rolesUsingCategories.includes(role) && roleMenu.categories) {
      const selectedCategory = this.getSelectedCategory();
      if (selectedCategory && roleMenu.categories[selectedCategory]) {
        return roleMenu.categories[selectedCategory].map((item) => ({
          ...item,
          submenu: this.getSubmenu(item.label), // Add submenu dynamically if needed
        }));
      }
      return [];
    }

    return roleMenu.items || [];
  }

  // Example submenu provider (optional)
  getSubmenu(label: string): { label: string; route: string }[] | undefined {
    const submenus: any = {
      'Time-Based Analysis': [
        { label: 'Time Taken By Supplier', route: '/timetakenBySupplier' },
        { label: 'Payment Time Taken', route: '/PaidTimeTaken' },
        { label: 'QC Time Taken', route: '/QcTimeTaken' },
        {
          label: 'Door Delivery App Uses',
          route: '/DropAppWarehousePerformance',
        },
      ],

      'Quality Control': [
        { label: 'QC Courier', route: '/QcPendings' },
        { label: 'QC-Lab Issues', route: '/qc-dash' },
      ],
    };
    return submenus[label];
  }


  
}
