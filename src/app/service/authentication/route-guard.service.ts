// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
// import { HardcodedAuthenticationService } from './hardcoded-authentication.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class RouteGuardService implements CanActivate {

//   constructor(public router: Router,
//               public hardcodedAuthenticationService: HardcodedAuthenticationService) { }

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//     if (this.hardcodedAuthenticationService.isUserLogedIn()) {
//       return true;
//     } else {
//       this.router.navigate(['login']);
//       return false;
//     }
//   }
// }
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { HardcodedAuthenticationService } from './hardcoded-authentication.service';
import { BasicAuthenticationService } from './basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(
    private loginService: BasicAuthenticationService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    
    const isLoggedIn = this.loginService.isUserLogedIn() 
    // || this.loginService.isAAMConsultantLoggedIn();
    
    if (!isLoggedIn) {
      this.router.navigate(['login']);
      return false;
    }

    // Retrieve the user's role from the authentication service
    
    const userRole = this.loginService.getRole().roleName;

    // Get the allowed roles from the route data
    const allowedRoles = route.data['allowedRoles'] as string[];

    console.log('User Role:', userRole);
    console.log('Allowed Roles:', allowedRoles);

    // Allow access if the user's role is included in the allowed roles
    
    if (!allowedRoles || allowedRoles.includes(userRole)) {
      return true;
    } else {
      // Redirect to an unauthorized page or login if role does not match
      this.router.navigate(['login']); // Adjust route as necessary
      return false;
    }
  }
}