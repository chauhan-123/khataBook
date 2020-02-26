import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {
  addUserForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.addUserForm = this.fb.group({
      userName: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]*$')]],
    });
  }

  ngOnInit() {
  }

  // signup functionlity of signup page
  onSubmit() {
    this.submitted = true;
    console.log(this.addUserForm.value)
    // stop here if form is invalid
    if (this.addUserForm.invalid) {
      console.log(this.addUserForm.invalid)
      return;
    }
    // this.registrationService.register(this.signUpForm.value).subscribe((response: any) => {
    //   this.utility.openSnackBar('you are successfully signup', true);
    //   UtilityService.loader.next(false);
    // })
  }

  // convenience getter for easy access to form fields
  get f() { return this.addUserForm.controls; }

}
