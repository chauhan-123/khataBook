import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UtilityService } from './utility.service';


@Injectable()
export class HttpService {

    constructor(
        public http: HttpClient,
    ) { }

    post(url, data, loader = true) {
        if (loader) {
            UtilityService.loader.next(loader);
        }
        let postUrl;
        postUrl = url;
        return this.http.post(postUrl, data);
    }

    get(url, httpParams?: any, loader = true) {
        if (loader) {
            UtilityService.loader.next(loader);
        }
        const header = {};
        if (httpParams) {
            header['params'] = httpParams;
        }
        const getUrl = url;
        return this.http.get(getUrl, header);
    }


    put(url, data, loader = true) {
        if (loader) {
            UtilityService.loader.next(loader);
        }
        let postUrl;
        postUrl = url;
        return this.http.put(postUrl, data);
    }

    handleError(error) {
        console.error(error);
    }
}
