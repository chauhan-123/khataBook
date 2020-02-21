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
  submitted = false;

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
  }

  // convenience getter for easy access to form fields
  get f() { return this.signUpForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signUpForm.invalid) {
      return;
    }
    this.registrationService.register(this.signUpForm.value).subscribe((response: any) => {
      this.utility.openSnackBar('you are successfully signup', true)
    })

  }



  signup() {
    this.register = false;
  }

  signin() {
    this.register = true;
  }
}
