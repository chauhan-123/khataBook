import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { LayoutService } from '../layout.service';
import { ActivatedRoute, Router } from '@angular/router';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { UtilityService } from '../../shared/service/utility.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Pagination } from '../../model/pagination';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.scss']
})
export class UserdetailComponent extends Pagination implements OnInit {
  today = new Date();

  displayedColumns: string[] = ['position', 'time', 'date', 'amount', 'giveMoney', 'balance'];
  userDetails = new MatTableDataSource<any>([]);

  showViewTable = true;
  userDetailsForm: FormGroup;
  element: any;
  submitted = false;
  data: String;
  unavailability: any;
  Response: any;

  constructor(private fb: FormBuilder, private layoutService: LayoutService,
    private utilityService: UtilityService, private router: Router) {
    super();
    this.today.setDate(this.today.getDate());
    layoutService.uniqueUser.subscribe(val => {
      this.data = val
    })
    this.userDetailsForm = this.fb.group({
      amount: ['', Validators.required],
      giveMoney: ['', Validators.required],
      currentDate: ['', Validators.required],
      promiseDate: ['', Validators.required],
    })
  }

  ngOnInit() {
  }

  // this function is used for unique user details
  getUniqueDetails() {
    let data = { ...this.validPageOptions }
    data['email'] = this.data['email']
    this.layoutService.getIndividualDetails(data).subscribe(response => {
      this.Response = response
      this.userDetails = response['result'];
      this.total = response['total'];
    })
  }

  // this function is used for submit the money data
  onSubmit() {
    this.submitted = true;
    if (this.userDetailsForm.invalid) {
      return
    }
    console.log(this.userDetailsForm.value)
    this.userDetailsForm.value['email'] = this.data['email']
    this.layoutService.submitUserMoney(this.userDetailsForm.value).subscribe(response => {
      this.utilityService.openSnackBar('money added successfully', true);
      this.getUniqueDetails();
      // this.router.navigate(['/home'])
    })
  }

  // this function is used for get the view page details
  viewDetailPage() {
    this.showViewTable = false;
    this.getUniqueDetails();
  }

  // this function is used for send the pdf file
  generatePdfFile() {
    this.layoutService.sendPdfFile(this.Response).subscribe(response => {
      console.log(response)
    })
  }


  /*
Method For Changing The Pagination
*/
  changePage(event: MatPaginator) {
    this.pageOptionsOnChange = event;
    this.getUniqueDetails();
  }

  // change the serial number
  getSerialNumber(i) {
    return i + ((this.validPageOptions['page'] - 1) * this.validPageOptions['limit']);
  }

  // convenience getter for easy access to form fields
  get f() { return this.userDetailsForm.controls; }
}
