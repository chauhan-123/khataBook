import { Component, OnInit } from '@angular/core';
import { AdduserComponent } from './adduser/adduser.component';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { LayoutService } from './layout.service';
import { Pagination } from '../model/pagination';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent extends Pagination implements OnInit {
  displayedColumns: string[] = ['position', 'userName', 'email', 'mobileNumber', 'address', 'time', 'date'];
  userDetails = new MatTableDataSource<any>([]);

  constructor(public dialog: MatDialog, private layoutService: LayoutService) {
    super();
  }

  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails() {
    this.layoutService.getUserDetails().subscribe(response => {
      this.userDetails = response['result'];
      this.total = response['result'].length;
    })
  }

  AddUser(): void {
    const dialogRef = this.dialog.open(AdduserComponent, {
      width: '550px',
      height: '350px'
    })
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  // change the serial number
  getSerialNumber(i) {
    return i + ((this.validPageOptions['page'] - 1) * this.validPageOptions['limit']);
  }



  onRowClicked(row) {
    this.layoutService.sendRowData(row);
  }
}
