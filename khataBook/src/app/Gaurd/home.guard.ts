import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilityService } from '../shared/service/utility.service';

@Injectable()
export class HomeGuard implements CanActivate, CanLoad {
  constructor(
    private _router: Router,
    private _utilityService: UtilityService
  ) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('login')) {
      return true;
    }
    return this.navigate();

  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('login')) {
      return true;
    }
    return this.navigate();
  }
  navigate() {
    this._utilityService.clearStorage();
    this._router.navigate(['/registration']);
    return false;
  }
}

