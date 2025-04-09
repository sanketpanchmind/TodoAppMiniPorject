import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginurl = 'https://api.freeprojectapi.com/api/GoalTracker/login';

  constructor(private http: HttpClient, private router: Router) {

   }

   login(credentails: {email: string, password: string}){
    return this.http.post(this.loginurl, credentails);
   }

   setUser(data: string) {
    localStorage.setItem('Currentuser', JSON.stringify(data));
  }

  getUser() {
    const raw = localStorage.getItem('Currentuser');
    return raw ? JSON.parse(raw) : null;
  }

  
  logout(){
    localStorage.removeItem('Currentuser');
   }

   isLoggedIn(): boolean {
    return !!this.getUser();
  }

}
