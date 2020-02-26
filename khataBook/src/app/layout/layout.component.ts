import { Component, OnInit } from '@angular/core';
import { AdduserComponent } from './adduser/adduser.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  AddUser(): void {
    const dialogRef = this.dialog.open(AdduserComponent, {
      width: '550px',
      height: '350px'
    })
    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
