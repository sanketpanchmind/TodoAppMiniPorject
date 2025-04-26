import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import gsap from 'gsap';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  // https://freeprojectapi.com/api.html

  registerform: FormGroup | any;
  loginform: FormGroup | any;
  login: boolean = true;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private authService: AuthService) {
    // this.registerfields();
    // this.loginformfields();

  }




  ngOnInit() {
    this.registerfields();
    this.loginformfields();
  }

  registerfields() {
    this.registerform = this.fb.group({
      fullName: new FormControl(''),
      emailId: new FormControl(''),
      password: new FormControl(''),
      mobileNo: new FormControl('')
    })
  }

  loginformfields() {
    this.loginform = this.fb.group({
      loginemailId: new FormControl(''),
      loginpassword: new FormControl(''),
    })
  }

  register() {
    console.log(this.registerform.value);
    let obj = this.registerform.value;

    const params: any = {
      emailId: obj?.emailId,
      password: obj?.password,
      fullName: obj?.fullName,
      mobileNo: obj?.mobileNo,
    }

    this.http.post('https://api.freeprojectapi.com/api/GoalTracker/register', params).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  submit() {
    console.log(this.loginform.value);
    let obj = this.loginform.value;

    const params: any = {
      emailId: obj?.loginemailId,
      password: obj?.loginpassword,
    }

    this.http.post('https://api.freeprojectapi.com/api/GoalTracker/login', params).subscribe({
      next: (res: any) => {
        console.log("Current usser - ", res);
        // localStorage.setItem('Currentuser', JSON.stringify(res));
        this.authService.setUser(res);
        this.router.navigateByUrl('/dashboard');
        window.location.href = '/dashboard';
      },
      error: (error: any) => {
        console.log(error);
        this.router.navigateByUrl('/login');

      }
    })
  }
}
