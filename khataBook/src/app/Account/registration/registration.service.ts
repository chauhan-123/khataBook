import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, retry } from 'rxjs/operators'
import { throwError } from 'rxjs';
import { UtilityService } from '../../shared/service/utility.service';
import { HttpService } from '../../shared/service/http.service';

@Injectable({
  providedIn: 'root'
})

export class RegistrationService {
  url = environment.baseUrl;
  self;

  constructor(private http: HttpService, private _utilityService: UtilityService) {
    this.self = _utilityService;
  }

  // This function is used for send the data from admin to backend In Signup page
  register(info) {
    return this.http.post(`${this.url}admin_panel/register`, info)
      .pipe(
        catchError(this.handleError)
      );
  }

  // This function is used for send the data from admin to backend In login page
  signIn(info) {
    return this.http.post(`${this.url}admin_panel/login`, info)
      .pipe(
        catchError(this.handleError)
      );
  }

  // This function is used for send the data from admin to backend In forgot password page
  forgot(info) {
    console.log("info", info);
    return this.http.post(`${this.url}admin_panel/forgot_password`, info)
      .pipe(
        catchError(this.handleError)
      );
  }



  // This function is used for send the data from admin to backend In Reset password page
  reset(info) {

    return this.http.post(`${this.url}admin_panel/reset_password`, info)
      .pipe(
        catchError(this.handleError)
      );
  }

  // this function is used for send the data which get from facebook api
  facebookLogin(info) {
    console.log("info", info);
    return this.http.post(`${this.url}admin_panel/loginWithFacebook`, info)
      .pipe(
        catchError(this.handleError)
      );
  }

  // this function handle the HttpResponse Errors from admin panel 
  handleError = (error: HttpErrorResponse) => {
    let message = error['error'].message;
    this._utilityService.openSnackBar(message, true);
    UtilityService.loader.next(false);
    return throwError(error);
  }

}
