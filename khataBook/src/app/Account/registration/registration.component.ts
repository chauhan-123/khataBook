import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegistrationService } from './registration.service';
import { UtilityService } from '../../service/utility.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  register = true;
  signUpForm: FormGroup;
  signInForm: FormGroup;
  forgotPasswordForm: FormGroup;
  submitted = false;
  showForgotPage = false;

  constructor(private fb: FormBuilder, public registrationService: RegistrationService,
    private utility: UtilityService) { }

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

    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]]
    })
  }

  // convenience getter for easy access to form fields
  get f() { return this.signUpForm.controls; }

  // convenience getter for easy access to form fields
  get f1() { return this.signInForm.controls; }

  // convenience getter for easy access to form fields
  get f2() { return this.signInForm.controls; }

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
      console.log(response, "res")
      this.utility.openSnackBar('you are successfully signin', true);
      UtilityService.loader.next(false);
    })
  }

  forgotPassword() {
    this.submitted = true;
    console.log(this.forgotPasswordForm.value)
    // stop here if form is invalid
    if (this.forgotPasswordForm.invalid) {
      return;
    }
  }


  // tag swittching between signup and signin
  signup() {
    this.register = false;
  }

  signin() {
    this.register = true;
  }

  forgotPage() {
    this.showForgotPage = true;
  }
}
