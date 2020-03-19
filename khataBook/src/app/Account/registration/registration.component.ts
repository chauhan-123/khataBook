import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegistrationService } from './registration.service';
import { UtilityService } from '../../shared/service/utility.service';
import { Router } from '@angular/router';
import { LoginResponse, FacebookService } from 'ngx-facebook';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent implements OnInit {
  register = true;
  signUpForm: FormGroup;
  signInForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, public registrationService: RegistrationService,
    private utility: UtilityService, private router: Router, private FB: FacebookService) {
    FB.init({
      appId: '211096033570955',
      version: 'v2.9'
    });
  }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      adminName: ['', Validators.required],
      adminBusinessType: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      mobileNumber: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]*$')]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    });

    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    })

  }


  // signup functionlity of signup page
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signUpForm.invalid) {
      return;
    }
    this.registrationService.register(this.signUpForm.value).subscribe((response: any) => {
      this.utility.openSnackBar('you are successfully signup', true);
      UtilityService.loader.next(false);
    })
  }

  // login functionlity of login page
  Submit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signInForm.invalid) {
      return;
    }
    this.registrationService.signIn(this.signInForm.value).subscribe((response: any) => {
      if (response['statusCode'] === 200) {
        localStorage.setItem('login', response.token);
        localStorage.setItem('mobile', response['result'].mobileNumber);
        localStorage.setItem('adminName', response['result'].adminName);
        this.utility.openSnackBar('you are successfully signin', true);
        UtilityService.loader.next(false);
        this.router.navigate(['../home']);
      }
    })
  }

  // Login with facebook function and get the response
  login() {
    this.FB.login()
      .then((res: LoginResponse) => {
        let data = {
          status: res.status,
          accessToken: res.authResponse.accessToken,
          userId: res.authResponse.userID
        }
        this.registrationService.facebookLogin(data).subscribe((response: any) => {
          console.log(response);
          if (response['statusCode'] === 200) {
            localStorage.setItem('login', response.token);
            this.utility.openSnackBar('you are successfully signin', true);
            UtilityService.loader.next(false);
            this.router.navigate(['../home']);
          }
        })
      })
  }



  // tag swittching between signup and signin
  signup() {
    this.register = false;
  }

  signin() {
    this.register = true;
  }



  // convenience getter for easy access to form fields
  get f() { return this.signUpForm.controls; }

  // convenience getter for easy access to form fields
  get f1() { return this.signInForm.controls; }


}
