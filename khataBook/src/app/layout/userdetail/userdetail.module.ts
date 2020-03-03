import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserdetailComponent } from './userdetail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomtimeModule } from '../../pipe/customtime.module';



@NgModule({
  declarations: [UserdetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomtimeModule
  ]
})
export class UserdetailModule { }
