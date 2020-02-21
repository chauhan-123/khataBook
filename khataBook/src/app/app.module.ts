import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationModule } from './Account/registration/registration.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationService } from './Account/registration/registration.service';
import { UtilityService } from './service/utility.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpService } from './service/http.service';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RegistrationModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule

  ],
  providers: [RegistrationService, UtilityService, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
