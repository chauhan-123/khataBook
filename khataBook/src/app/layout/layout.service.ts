import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpService } from '../shared/service/http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, BehaviorSubject, Subject } from 'rxjs';
import { UtilityService } from '../shared/service/utility.service';
import { ADMIN_URL } from '../constant/url';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  url = environment.baseUrl;
  data: object;
  public static loader = new BehaviorSubject<boolean>(false);
  public uniqueUser: Subject<String> = new BehaviorSubject<string>(null);



  constructor(private http: HttpService, private _utilityService: UtilityService) {
  }

  sendRowData(row: string) {
    this.uniqueUser.next(row);
  }

  // this function is used for Add user from admin panel and send the data backend
  addUser(info) {
    return this.http.post(`${this.url}user_panel/addUser`, info)
      .pipe(
        catchError(this.handleError)
      );
  }

  // this function is used for get user details from backend side
  getUserDetails(info) {
    return this.http.post(`${this.url}user_panel/getUserDetails`, info);
  }

  // this function is  used for add and submit the money from admin panel
  submitUserMoney(info) {
    return this.http.post(`${this.url}user_panel/sellProductDetails`, info)
  }

  // this function is used for get unique details
  getIndividualDetails(info) {
    return this.http.post(`${this.url}user_panel/getuniqueUserMoneyDetail`, info)
  }

  // this function is used for get the filter data 
  filterFormData(info) {
    return this.http.post(`${this.url}user_panel/getUserFilter`, info)
  }

  // this function is used for send the pdf file to all users
  sendPdfFile(info) {
    let data = {
      info: info.result[0]['email']
    }
    console.log(info.result[0]['email'])
    return this.http.post(`${this.url}user_panel/sendPdfFile`, data);
  }

  // this function handle the HttpResponse Errors from admin panel 
  handleError = (error: HttpErrorResponse) => {
    let message = error['error'].message;
    this._utilityService.openSnackBar(message, true);
    UtilityService.loader.next(false);
    return throwError(error);
  }
}
