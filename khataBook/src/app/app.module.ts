import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationModule } from './Account/registration/registration.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationService } from './Account/registration/registration.service';
import { UtilityService } from './shared/service/utility.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpService } from './shared/service/http.service';
import { SharedModule } from './shared/shared.module';
import { LayoutService } from './layout/layout.service';
import { LayoutModule } from '../app/layout/layout.module';
import { FacebookService, FacebookModule } from 'ngx-facebook';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RegistrationModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    SharedModule,
    LayoutModule,
    FacebookModule.forRoot()

  ],
  providers: [RegistrationService, UtilityService, HttpService, LayoutService, FacebookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
