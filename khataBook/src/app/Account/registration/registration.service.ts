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

  register(info) {
    return this.http.post(`${this.url}admin_panel/register`, info)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // UtilityService.loader.next(true)

  handleError = (error: HttpErrorResponse) => {
    let message = error['error'].message;
    this._utilityService.openSnackBar(message, true);
    UtilityService.loader.next(false);
    return throwError(error);
  }
}
