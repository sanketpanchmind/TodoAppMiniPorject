import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-web-header',
  templateUrl: './web-header.component.html',
  styleUrls: ['./web-header.component.scss']
})
export class WebHeaderComponent {

  loggedInUser: boolean = false;
  currentuser: string = '';

  constructor(private authService: AuthService) {
      if(authService.isLoggedIn()) {
        this.loggedInUser = true;
        const localdata = localStorage.getItem('CurrentUser');
        if(localdata){
          const user = JSON.parse(localdata);
          this.currentuser = user.emailId;
        }
      }
   }

   logout(){
    this.authService.logout();
   }
  
}
