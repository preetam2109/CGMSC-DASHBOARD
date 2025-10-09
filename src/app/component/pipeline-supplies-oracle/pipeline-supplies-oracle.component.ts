import { Component, OnInit, OnDestroy,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var requirejs: any;
declare var ko: any;

@Component({
  selector: 'app-pipeline-supplies-oracle',
  standalone: true,
  imports: [],
  templateUrl: './pipeline-supplies-oracle.component.html',
  styleUrl: './pipeline-supplies-oracle.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class PipelineSuppliesOracleComponent implements OnInit, OnDestroy {
  private token: string = '';
  private tokenRefreshInterval: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Load the Oracle DV embedding script dynamically
    const script = document.createElement('script');
    script.src = 'https://cgmscanalytics-cgmscee-bo.analytics.ocp.oraclecloud.com/public/dv/v1/embedding/standalone/embedding.js';
    script.type = 'application/javascript';
    document.head.appendChild(script);

    // Fetch token initially
    this.fetchAndSetToken();

    // Refresh token every 45 minutes
    this.tokenRefreshInterval = setInterval(() => this.fetchAndSetToken(), 45 * 60 * 1000);
  }

  private fetchAndSetToken(): void {
    this.http.get<{ access_token: string }>('https://kcthepe5e6xwemxr36bzoz4xgq.apigateway.ap-mumbai-1.oci.customer-oci.com/oac/auth_token')
      .subscribe({
        next: (data) => {
          this.token = data.access_token;
          console.log('New token fetched:', this.token);

          // Update security config dynamically
          requirejs(['jquery', 'knockout', 'obitech-application/application', 'ojs/ojcore', 'ojs/ojknockout', 'ojs/ojcomposite', 'jet-composites/oracle-dv/loader'],
            ($:any, ko:any, application:any) => {
              application.setSecurityConfig('token', {
                tokenAuthFunction: () => {
                  return this.token;
                }
              });
              ko.applyBindings();
            });
        },
        error: (error) => {
          console.error('Error fetching token:', error);
        }
      });
  }

  ngOnDestroy(): void {
    // Clear the interval when the component is destroyed
    if (this.tokenRefreshInterval) {
      clearInterval(this.tokenRefreshInterval);
    }
  }
}