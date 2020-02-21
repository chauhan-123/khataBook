import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar, MatDialog } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  protoType: any;

  constructor(private snackBar: MatSnackBar) { }

  public static loader = new BehaviorSubject<boolean>(false);

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  public verticalPosition: MatSnackBarVerticalPosition = 'top';
  public setAutoHide = true;
  public autoHide = 2000;
  public addExtraClass = false;


  public snackBarConfig(successflag) {
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    if (!successflag) {
      config.panelClass = ['red-snackbar']
    }
    else {
      config.panelClass = this.addExtraClass ? ['party'] : undefined;
    }
    return config;
  }

  openSnackBar(message: string, successflag: boolean) {
    this.snackBar.open(message, undefined, this.snackBarConfig(successflag));
  }

}
