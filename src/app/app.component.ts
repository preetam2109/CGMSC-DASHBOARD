import { Component, OnInit, HostListener, DoCheck, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HardcodedAuthenticationService } from './service/authentication/hardcoded-authentication.service';
import { ToastrService } from 'ngx-toastr';
import { MenuServiceService } from './service/menu-service.service';
import { BasicAuthenticationService } from './service/authentication/basic-authentication.service';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit, DoCheck {
  ipAddress: string = '';
  browserInfo: any;
  deferredPrompt: any;
  showButton = false;
  title!: 'CGMSC DASHBOARD'
  isLoginPage = false;
  roleName = localStorage.getItem('roleName')
  firstname = sessionStorage.getItem('firstname')

  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e: Event) {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later.
    this.deferredPrompt = e;
    // Update UI notify the user they can install the PWA
    this.showButton = true;
  }


  isExternalLink(route: string): boolean {
    return route.startsWith('http://') || route.startsWith('https://');
  }



  menuItems: { label: string; route: string; submenu?: { label: string; route: string }[] }[] = [];
  expandedMenus: { [key: string]: boolean } = {}; // Track expanded state for each menu item

  toggleSubmenu(menuLabel: string): void {
    for (const key in this.expandedMenus) {
      if (key !== menuLabel) {
        this.expandedMenus[key] = false; // Collapse all other menus
      }
    }

    // Toggle the clicked submenu
    this.expandedMenus[menuLabel] = !this.expandedMenus[menuLabel];
  }


  role: any = ''; // Dynamic role










  constructor(private location: Location,private cdr: ChangeDetectorRef, private menuService: MenuServiceService,
     private toastr: ToastrService, private router: Router,
      public basicAuthentication: BasicAuthenticationService,
      private http: HttpClient) { }


  logout() {
// 
  

    if (sessionStorage.getItem('roleId') === '482') {
      sessionStorage.clear();
      localStorage.clear();
      this.basicAuthentication.logout();
      this.toastr.success('Logout Successfully');
      this.router.navigate(['collector-login'])

    } else {
      sessionStorage.clear();
      localStorage.clear();
      this.basicAuthentication.logout();
      this.toastr.success('Logout Successfully');
      this.router.navigate(['login'])
    }
  }

  goBack(): void {
    this.location.back();
  }


  ngOnInit(): void {
    this.getIPAddress();
    this.browserInfo= this.getBrowserInfo();
    // console.log('userAgent1=',this.browserInfo.userAgent ); 
    sessionStorage.setItem('userAgent',this.browserInfo.userAgent );
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = (event.urlAfterRedirects === '/login' || event.urlAfterRedirects === '/otp' || event.urlAfterRedirects === '/collector-login' || event.urlAfterRedirects === '/public-view' || event.urlAfterRedirects === '/GrowthInProcurmentTabPublic' || event.urlAfterRedirects === '/distributionPublic' || event.urlAfterRedirects === '/IndentPendingWHdashPublic'    );

        this.role = this.basicAuthentication.getRole().roleName; // Fetch dynamic role from the authentication service
        this.updateMenu();
      }
    });
  }

  getIPAddress() {
    this.http.get<any>('https://api.ipify.org?format=json')
      .subscribe(
        (res) => {
          this.ipAddress = res.ip;
          sessionStorage.setItem('ipAddress', this.ipAddress);
          // console.log('this.ipAddress=',this.ipAddress);
        },
        (err) => {
          console.error('Error fetching IP:', err);
        }
      );
  }
  getBrowserInfo() {
    return {
      appName: navigator.appName,
      appVersion: navigator.appVersion,
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language
    };
  }
  ngDoCheck(): void {
    // 

    const role = this.basicAuthentication.getRole().roleName; // Fetch dynamic role from the authentication service
    // this.role = this.basicAuthentication.getRole().roleName; // Fetch dynamic role from the authentication service

    this.roleName = role;
    this.firstname = sessionStorage.getItem('firstname');
    if(this.firstname==='Public'){
      this.firstname='Public View Of Drugs and Consumables'
    }
    this.cdr.detectChanges();

  }
  private updateMenu() {
    // ;
    // Check if the role has categories or direct items
    const hasCategories = ['SEC1', 'DHS', 'CME'].includes(this.role);
    
    if (hasCategories) {
      const category = this.menuService.getSelectedCategory();
      if (category) {
        this.menuItems = this.menuService.getMenuItems(this.role);
      } else {
        // Handle the case where no category is selected
        this.menuItems = [];
      }
    } else {
      // For roles without categories, fetch items directly
      this.menuItems = this.menuService.getMenuItems(this.role);
    }
  }
  
  addToHomeScreen() {
    // Hide the app provided install promotion
    this.showButton = false;
    // Show the install prompt
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice.then((choiceResult: { outcome: string; }) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      this.deferredPrompt = null;
    });
  }
  hideAddToHomeScreen() {
    this.showButton = false
  }
  handleOutsideClick(event: Event) {
    if (this.showButton) {
      this.hideAddToHomeScreen()
    }
  }
  handleInsideClick(event: Event) {
    event.stopPropagation();
  }

  isCollectorLogin(): boolean {
    return this.router.url === '/collector-login';
  }
}