import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";
import { UtilityService } from '../shared/service/utility.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private _utilityService: UtilityService
  ) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers = {
      'Content-Type': 'application/json'
    };
    if (localStorage.getItem('login')) {
      headers['authorization'] = 'Bearer ' + localStorage.getItem('login');
    }

    request = request.clone({
      setHeaders: headers
    });

    return next.handle(request).pipe(
      tap(
        (data) => {
          if (data instanceof HttpResponse) {
            UtilityService.loader.next(false);
          }
        },
        (error: any) => {
          UtilityService.loader.next(false);
          if (error instanceof HttpErrorResponse) {
            
            let message = error['error'].message;
            this._utilityService.openSnackBar(message, true);
          }
        }
      ));
  }
}
