import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { LayoutService } from '../layout.service';
import { ActivatedRoute, Router } from '@angular/router';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { UtilityService } from '../../shared/service/utility.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.scss']
})
export class UserdetailComponent implements OnInit {
  displayedColumns: string[] = ['time', 'date'];
  userDetails = new MatTableDataSource<any>([]);

  showViewTable = true;
  userDetailsForm: FormGroup;
  element: any;
  submitted = false;
  data: String;

  constructor(private fb: FormBuilder, private layoutService: LayoutService,
    private utilityService: UtilityService, private router: Router) {
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

  // getUserDetails() {
  //   this.layoutService.getUserDetails().subscribe(response => {
  //     console.log(response)
  //   })
  // }

  onSubmit() {
    // console.log(this.userDetailsForm.value, this.data)
    this.submitted = true;

    if (this.userDetailsForm.invalid) {
      return
    }
    this.userDetailsForm.value['email'] = this.data['email']
    this.layoutService.submitUserMoney(this.userDetailsForm.value).subscribe(response => {
      this.utilityService.openSnackBar('money added successfully', true);
      this.router.navigate(['/home'])
    })
  }

  viewDetailPage() {
    this.showViewTable = false;
    
    this.layoutService.getUserDetails().subscribe(response => {
      console.log(response)
    })
  }


  // convenience getter for easy access to form fields
  get f() { return this.userDetailsForm.controls; }
}
