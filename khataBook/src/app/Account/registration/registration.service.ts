import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, retry } from 'rxjs/operators'
import { throwError } from 'rxjs';
import { UtilityService } from '../../service/utility.service';
import { HttpService } from '../../service/http.service';

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

  // this function handle the HttpResponse Errors from admin panel of signup page
  handleError = (error: HttpErrorResponse) => {
    let message = error['error'].message;
    this._utilityService.openSnackBar(message, true);
    UtilityService.loader.next(false);
    return throwError(error);
  }

  // This function is used for send the data from admin to backend In login page
  signIn(info) {
    return this.http.post(`${this.url}admin_panel/login`, info)
      .pipe(
        catchError(this.HandleError)
      );
  }

  // this function handle the HttpResponse Errors from admin panel of signup page
  HandleError = (error: HttpErrorResponse) => {
    let message = error['error'].message;
    this._utilityService.openSnackBar(message, true);
    UtilityService.loader.next(false);
    return throwError(error);
  }
}
