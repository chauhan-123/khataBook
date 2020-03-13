import { Component, OnInit } from '@angular/core';
import { AdduserComponent } from './adduser/adduser.component';
import { MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { LayoutService } from './layout.service';
import { Pagination } from '../model/pagination';
import { POPUP_MESSAGES } from 'src/app/constant/message';
import { UtilityService } from '../shared/service/utility.service';
import { Router } from '@angular/router';
import { UserfilterComponent } from './userfilter/userfilter.component';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent extends Pagination implements OnInit {
  displayedColumns: string[] = ['position', 'userName', 'email', 'mobileNumber', 'address', 'time', 'date', 'Total'];
  userDetails = new MatTableDataSource<any>([]);
  search: string = '';

  constructor(public dialog: MatDialog, private layoutService: LayoutService, private utilityService: UtilityService,
    private router: Router) {
    super();
  }

  ngOnInit() {
    this.getUserDetails();
  }

  // this function is used for get all user details
  getUserDetails(search?) {
    if (search == undefined) {
      var data = { ...this.validPageOptions, search: search }
      this.layoutService.getUserDetails(data).subscribe(response => {
        this.userDetails = response['result'];
        this.total = response['total'];
      })
    } else if (typeof (search) == "string") {
      data = { ...this.validPageOptions, search: search }
      this.layoutService.getUserDetails(data).subscribe(response => {
        this.userDetails = response['result'];
        this.total = response['total'];
      })
    } else {
      this.userDetails = search['result'];

    }
  }

  // this function is used for add user from frontend
  AddUser(): void {
    const dialogRef = this.dialog.open(AdduserComponent, {
      width: '550px',
      height: '350px'
    })
    dialogRef.afterClosed().subscribe(result => {
      this.getUserDetails();
    });
  }



  // change the serial number
  getSerialNumber(i) {
    return i + ((this.validPageOptions['page'] - 1) * this.validPageOptions['limit']);
  }


  // Method For Changing The Pagination
  changePage(event: MatPaginator) {
    this.pageOptionsOnChange = event;
    this.getUserDetails();
  }


  // click the row and get the all row data
  onRowClicked(row) {
    this.layoutService.sendRowData(row);
  }

  // logout function
  logout() {
    // let data = {
    //   title: POPUP_MESSAGES.logout,
    //   message: POPUP_MESSAGES.logoutConfirmation,
    //   yes: POPUP_MESSAGES.logout,
    //   no: 'No',
    //   isHideCancel: false
    // }
    this.utilityService.clearStorage();
    this.router.navigate(['/registration'])
  }

  // this function is used for search tha data for searching
  searchResult() {
    this.getUserDetails(this.search);
  }
  // this function is used for reset the filter
  resetSearch() {
    this.search = '';
    this.getUserDetails()
  }
}
