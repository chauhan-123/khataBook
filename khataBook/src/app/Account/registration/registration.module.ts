import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { FacebookModule } from 'ngx-facebook';

const registrationRoutes: Routes = [
  { path: '', component: RegistrationComponent }
]

@NgModule({
  declarations: [RegistrationComponent, ForgotPasswordComponent, ResetpasswordComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(registrationRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ]
})
export class RegistrationModule { }
