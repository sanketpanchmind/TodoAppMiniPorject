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

  constructor(private authService: AuthService, private router: Router) {
    
   }
   ngOnInit(){
    if(this.authService.isLoggedIn()) {
      this.loggedInUser = this.authService.isLoggedIn();
      console.log(this.loggedInUser);
       const user = this.authService.getUser();
       this.currentuser = user.emailId;
    }
    else{
      console.log('User not logged in', this.loggedInUser);
    }
   }

   logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
   }
  
}
