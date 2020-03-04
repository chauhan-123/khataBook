import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LayoutService } from '../layout.service';
import { UtilityService } from '../../shared/service/utility.service';
import { Router } from '@angular/router';
import { LayoutComponent } from '../layout.component';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {
  addUserForm: FormGroup;
  submitted = false;

  constructor(private _dialogRef: MatDialogRef<AdduserComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private fb: FormBuilder, public dialog: MatDialog, private layoutService: LayoutService,
    private utility: UtilityService, private router: Router) {
    this.addUserForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      mobileNumber: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]*$')]],
      address: ['', Validators.required],
    });
  }

  ngOnInit() {
  }


  // Add user functionlity of signup page
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.addUserForm.invalid) {
      return;
    }
    this.layoutService.addUser(this.addUserForm.value).subscribe((response: any) => {
      console.log("12", response)
      this.utility.openSnackBar('user data added successfully', true);
      UtilityService.loader.next(false);
      this._dialogRef.close();
    })
  }

  // this function is used for close the model
  closeModel() {
    this._dialogRef.close();
  }

  // convenience getter for easy access to form fields
  get f() { return this.addUserForm.controls; }

}
