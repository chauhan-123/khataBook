import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RegistrationService } from '../registration.service';
import { UtilityService } from '../../../service/utility.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private registrationService: RegistrationService,
    private utility: UtilityService) { }

  ngOnInit() {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]]
    })
  }

  // signup functionlity of signup page
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.forgotPasswordForm.invalid) {
      return;
    }
    this.registrationService.forgot(this.forgotPasswordForm.value).subscribe((response: any) => {
      this.utility.openSnackBar('Reset pasword link send to your email', true);
      UtilityService.loader.next(false);
    })
  }

  // convenience getter for easy access to form fields
  get f2() { return this.forgotPasswordForm.controls; }

}
