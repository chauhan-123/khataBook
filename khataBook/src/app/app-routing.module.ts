import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './Account/registration/forgot-password/forgot-password.component';
import { ResetpasswordComponent } from './Account/registration/resetpassword/resetpassword.component';
import { LayoutModule } from './layout/layout.module';
import { HomeGuard } from './Gaurd/home.guard';



const routes: Routes = [
  { path: '', redirectTo: 'registration', pathMatch: 'full' },
  { path: 'registration', loadChildren: './Account/registration/registration.module#RegistrationModule' },
  { path: 'forgot_password', component: ForgotPasswordComponent },
  { path: 'reset_password', component: ResetpasswordComponent },
  { path: 'home', loadChildren: './layout/layout.module#LayoutModule', canLoad: [HomeGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    LayoutModule],
  exports: [RouterModule],
  providers: [HomeGuard]
})
export class AppRoutingModule { }
