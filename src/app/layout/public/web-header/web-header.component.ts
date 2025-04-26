import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-web-header',
  templateUrl: './web-header.component.html',
  styleUrls: ['./web-header.component.scss']
})
export class WebHeaderComponent {

  loggedInUser: boolean = false;
  currentuser: string = '';
  user: any;

  constructor(private authService: AuthService, private router: Router) {

  }
  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.loggedInUser = this.authService.isLoggedIn();
      console.log("current user -", this.loggedInUser);
      const user = this.authService.getUser();
      this.currentuser = user.emailId;
      this.currentUserInfo();
    }
    else {
      console.log('User not logged in', this.loggedInUser);
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  currentUserInfo() {
    const currentUser = this.authService.getUser();
    this.user = currentUser;
    console.log("Current LoggedIn User Info - ", this.user);
  }
}
