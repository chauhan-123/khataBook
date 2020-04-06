import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { LayoutService } from '../layout.service';
import { ActivatedRoute, Router } from '@angular/router';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { UtilityService } from '../../shared/service/utility.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Pagination } from '../../model/pagination';
// import jsPDF from 'jspdf'
// import 'jspdf-autotable'
import { Time } from '@angular/common';

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
  userTable: any = [];

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
      this.userTable = response['result'];
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
  // async generate() {
  //   var doc = new jsPDF('p', 'pt');
  //   // var res = doc.autoTableHtmlToJson(document.getElementById("basic-table"));
  //   doc.autoTable({ margin: { top: 80 } });
  //   var array = [];
  //   await this.userTable.forEach(element => {
  //     let temArray = [];
  //     temArray.push(element.currentDate);
  //     temArray.push(element.promiseDate);
  //     temArray.push(element.amount);
  //     temArray.push(element.giveMoney);
  //     temArray.push(element.balance);
  //     array.push(temArray);
  //   });
  //   console.log("array ", array);
  //   doc.autoTable({
  //     head: [["currentDate", "promiseDate", "amount", "giveMoney", "balance"]],
  //     body: array,
  //     // for header and footer we added didDrawPage below
  //     didDrawPage: function (data) {
  //       doc.setFontSize(18);
  //       doc.setTextColor(40);
  //       doc.setFontStyle("normal");
  //       // doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
  //       doc.text("Testing Report", data.settings.margin.left, 50);
  //     },
  //     didDrawCell: data => {
  //       // if (data.section === 'body' && data.column.index === 0) {
  //       var base64Img = 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fb%2Fb6%2FImage_created_with_a_mobile_phone.png&imgrefurl=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FImage&tbnid=nH5liarSz56duM&vet=12ahUKEwiltcnJ8KboAhWRy3MBHSzUCksQMygDegUIARCPAg..i&docid=0JWe7yDOKrVFAM&w=4000&h=3000&q=image&ved=2ahUKEwiltcnJ8KboAhWRy3MBHSzUCksQMygDegUIARCPAg'
  //       var image = 'data:image/jpeg;base64,btoa(base64Img)'
  //       console.log(image)
  //       return
  //       doc.addImage(image, 'JPEG', data.cell.x + 2, data.cell.y + 2, 10, 10)
  //       // }
  //     },
  //   });
  //   doc.save("table.pdf");
  // }


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


export interface Element {
  position: number;
  time: Time;
  date: Date;
  amount: number;
  giveMoney: number;
  balance: number
}