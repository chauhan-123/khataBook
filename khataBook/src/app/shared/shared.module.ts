import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilityService } from './service/utility.service';
import { HttpService } from './service/http.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../interceptor/token-interceptor';
import { AccountGuard } from '../Gaurd/account.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    HttpService,
    UtilityService,
    AccountGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class SharedModule { }
