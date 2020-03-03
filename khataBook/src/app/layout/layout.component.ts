import { Component, OnInit } from '@angular/core';
import { AdduserComponent } from './adduser/adduser.component';
import { MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { LayoutService } from './layout.service';
import { Pagination } from '../model/pagination';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent extends Pagination implements OnInit {
  displayedColumns: string[] = ['position', 'userName', 'email', 'mobileNumber', 'address', 'time', 'date', 'Total'];
  userDetails = new MatTableDataSource<any>([]);

  constructor(public dialog: MatDialog, private layoutService: LayoutService) {
    super();
  }

  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails() {
    var data = { ...this.validPageOptions }
    this.layoutService.getUserDetails(data).subscribe(response => {
      this.userDetails = response['result'];
      this.total = response['total'];
    })
  }

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

  /*
Method For Changing The Pagination
*/
  changePage(event: MatPaginator) {
    this.pageOptionsOnChange = event;
    this.getUserDetails();
  }


  // click the row
  onRowClicked(row) {
    this.layoutService.sendRowData(row);
  }
}
