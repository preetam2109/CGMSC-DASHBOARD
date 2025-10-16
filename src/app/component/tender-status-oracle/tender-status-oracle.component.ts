import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
import { RouterModule } from '@angular/router';
declare var requirejs: any;
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-tender-status-oracle',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tender-status-oracle.component.html',
  styleUrls: ['./tender-status-oracle.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]   // 👈 Add this line
})
export class TenderStatusOracleComponent {
  iframeUrl: SafeResourceUrl | null = null;
  constructor(private location: Location,
    private toastr: ToastrService, private router: Router, private Service:ApiService,  private sanitizer: DomSanitizer) { }


    // ngOnInit(): void {
    //   this.Service.getToken$().subscribe(currentToken => {
    //     console.log('📢 CameraInformationComponent got token:', currentToken);
    
    //     if (!currentToken) {
    //       console.log('⏳ Token not ready yet, waiting...');
    //       return;
    //     }
    
    //     // ✅ Ye tab chalega jab token ready hoga
    //     requirejs(
    //       [
    //         'jquery',
    //         'knockout',
    //         'obitech-application/application',
    //         'ojs/ojcore',
    //         'ojs/ojknockout',
    //         'ojs/ojcomposite',
    //         'jet-composites/oracle-dv/loader'
    //       ],
    //       ($: any, ko: any, application: any) => {
    //         application.setSecurityConfig('token', {
    //           tokenAuthFunction: () => currentToken
    //         });
    //         ko.applyBindings();
    //       }
    //     );
    //   });
    // }
    
   

    // ngOnInit(): void {
    //   this.Service.getToken$().subscribe(currentToken => {
    //     if (!currentToken) return;
    //     console.log('✅ Token ready, initializing Oracle-DV');
    //     console.log('📢 CameraInformationComponent got token:', currentToken);

    //     // const rawUrl = `https://cgmscanalytics-cgmscee-bo.analytics.ocp.oraclecloud.com/dv/ui?projectPath=/@Catalog/shared/Tender Status /TenderStatus&token=${currentToken}`;
      
    //     // Angular security ke liye sanitizer
    //     // this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);
    //     // requirejs.config({
    //     //   paths: {
    //     //     '@popperjs/core': 'https://unpkg.com/@popperjs/core@2/dist/umd/popper.min'
    //     //   },
    //     //   shim: {
    //     //     '@popperjs/core': { exports: 'Popper' }
    //     //   }
    //     // });
    //     requirejs(
    //       [
    //         'jquery',
    //         'knockout',
    //         'obitech-application/application',
    //         'ojs/ojcore',
    //         'ojs/ojknockout',
    //         'ojs/ojcomposite',
    //         'jet-composites/oracle-dv/loader'
    //       ],
    //       ($: any, ko: any, application: any) => {
    //         application.setSecurityConfig('token', {
    //           tokenAuthFunction: () => currentToken
    //         });
    
    //         // IMPORTANT 👇
    //         setTimeout(() => {
    //           const container = document.getElementById('oracleContainer');
    //           if (container) {
    //             ko.applyBindings({}, container);
    //           }
    //         }, 100); // thoda delay do DOM render hone ke liye
    //       }
    //     );
    //   });
    // }
 
 
    // ip = this.require('ip');

    ngOnInit(): void {
  //     this.Service.getToken$().subscribe(currentToken => {
  //       if (!currentToken) return;
    
  //       console.log('✅ Token ready:', currentToken);
    
  //       // RequireJS config for Popper.js
  //       requirejs.config({
  //         paths: {
  //           '@popperjs/core': 'https://unpkg.com/@popperjs/core@2/dist/umd/popper.min'
  //         },
  //         shim: {
  //           '@popperjs/core': { exports: 'Popper' }
  //         }
  //       });
    
  //       requirejs(
  //         [
  //           'jquery',
  //           'knockout',
  //           'obitech-application/application',
  //           'ojs/ojcore',
  //           'ojs/ojknockout',
  //           'ojs/ojcomposite',
  //           'jet-composites/oracle-dv/loader'
  //         ],
  //         ($: any, ko: any, application: any) => {
    
  //           // Security config with token
  //           application.setSecurityConfig('token', {
  //             tokenAuthFunction: () => currentToken
  //           });
    
  //           // Create <oracle-dv> element dynamically
  //           const container = document.getElementById('oracleContainer');
  //           if (container) {
  //             container.innerHTML = `
               
  //                <oracle-dv 
  //   project-path="/@Catalog/shared/Tender Status /TenderStatus" 
  //   active-page="insight" 
  //   active-tab-id="snapshot!canvas!1">
  // </oracle-dv>
  //             `;
    
  //             // Apply Knockout bindings to container
  //             setTimeout(() => ko.applyBindings({}, container), 200);
  //           }
  //         }
  //       );
  //     });
    }
    
 }



