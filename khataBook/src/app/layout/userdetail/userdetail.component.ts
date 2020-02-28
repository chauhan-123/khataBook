import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { LayoutService } from '../layout.service';
import { ActivatedRoute } from '@angular/router';
import { validateHorizontalPosition } from '@angular/cdk/overlay';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.scss']
})
export class UserdetailComponent implements OnInit {

  userDetailsForm: FormGroup;
  element: any;
  submitted = false;
  data: String;

  constructor(private fb: FormBuilder, private layoutService: LayoutService, private route: ActivatedRoute) {
    layoutService.uniqueUser.subscribe(val => {
      this.data = val
    })
    this.userDetailsForm = this.fb.group({
      Total: ['', Validators.required],
      all: ['', Validators.required]
    })
  }

  ngOnInit() {


  }

  onSubmit() {
    // console.log(this.userDetailsForm.value, this.data)
    this.submitted = true;

    if (this.userDetailsForm.invalid) {
      return
    }
    this.userDetailsForm.value['email'] = this.data['email']
    this.layoutService.submitUserMoney(this.userDetailsForm.value).subscribe(response => {
      console.log("res", response)
    })

  }


  // convenience getter for easy access to form fields
  get f() { return this.userDetailsForm.controls; }
}
