import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { RegistrationService } from '../registration.service';
import { UtilityService } from '../../../service/utility.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  submitted = false;
  token: string;
  decodedJwtData: any;

  constructor(private fb: FormBuilder, private registrationService: RegistrationService,
    private utility: UtilityService, private _route: ActivatedRoute) {
    this.token = this._route.snapshot.queryParamMap.get('token');
    let jwtData = this.token.split('.')[1]
    let decodedJwtJsonData = window.atob(jwtData);
    this.decodedJwtData = JSON.parse(decodedJwtJsonData);
    let isAdmin = this.decodedJwtData.admin;
    console.log(decodedJwtJsonData, this.decodedJwtData, isAdmin)
  }

  ngOnInit() {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      confirm_password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    }, {
      validators: this.passwordMatch
    })
  }

  passwordMatch(formGroup: AbstractControl) {
    const password = formGroup.get('password').value;
    const confirm_password = formGroup.get('confirm_password').value;
    return password == confirm_password ? null : { passwordNotMatch: true };

  }

  onSubmit() {
    this.submitted = true;
    console.log(this.resetPasswordForm.value)
    // stop here if form is invalid
    if (this.resetPasswordForm.invalid) {
      return;
    }
    let data = this.resetPasswordForm.value;
    data['email'] = this.decodedJwtData.email;
    this.registrationService.reset(data).subscribe((response: any) => {
      this.utility.openSnackBar('you are login with new password with registered email....', true);
      UtilityService.loader.next(false);
    })
  }

  // convenience getter for easy access to form fields
  get f() { return this.resetPasswordForm.controls; }

}
