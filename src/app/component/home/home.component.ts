import { Component } from '@angular/core';
import { HardcodedAuthenticationService } from 'src/app/service/authentication/hardcoded-authentication.service'; // Assuming you have a service for getting the username

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title: string = 'welcome';
  username: any = '';

  constructor(private authService: HardcodedAuthenticationService) {}

  ngOnInit() {
     this.username = sessionStorage.getItem('authenticatedUser');

  }
}
