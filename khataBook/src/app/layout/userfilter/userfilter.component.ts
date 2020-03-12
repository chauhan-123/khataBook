import { Component, OnInit } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LayoutService } from '../layout.service';
import { LayoutComponent } from '../layout.component';

@Component({
  selector: 'app-userfilter',
  templateUrl: './userfilter.component.html',
  styleUrls: ['./userfilter.component.scss']
})
export class UserfilterComponent implements OnInit {

  filterForm: FormGroup
  showFilter = false;
  submitted = false;

  constructor(private fb: FormBuilder, private layoutService: LayoutService, private layoutComponent: LayoutComponent) {
    this.filterForm = this.fb.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
    })
  }

  ngOnInit() {
  }

  // Add user functionlity of signup page
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.filterForm.invalid) {
      return;
    }
    this.layoutService.filterFormData(this.filterForm.value).subscribe((response: any) => {
      console.log("ppppp", response);
      this.layoutComponent.getUserDetails(response);
      this.showFilter = false
      this.filterForm.reset();
    })
  }

  openFilter() {
    this.showFilter = true
  }

  crossFilter() {
    this.showFilter = false
  }

  resetFilter() {
    this.filterForm.reset();
  }
}
