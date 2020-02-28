import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CustomtimePipe } from './customtime.pipe';



@NgModule({
  declarations: [CustomtimePipe],
  imports: [
    CommonModule
  ],
  exports: [CustomtimePipe],
  providers: [
    DatePipe
  ]
})
export class CustomtimeModule { }
