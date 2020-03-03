import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { RouterModule, Routes } from '@angular/router';
import { MatToolbarModule, MatButtonModule, MatDialogModule, MatInputModule, MatFormFieldModule, MatIconModule, MatCardModule, MatTableModule } from '@angular/material';
import { AdduserComponent } from './adduser/adduser.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CustomtimeModule } from '../pipe/customtime.module';
import { UserdetailComponent } from './userdetail/userdetail.component';




const layout: Routes = [
  { path: '', component: LayoutComponent },
  { path: 'addMoney', component: UserdetailComponent }

]

@NgModule({
  declarations: [LayoutComponent, AdduserComponent, UserdetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(layout),
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    SharedModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    CustomtimeModule
  ],
  entryComponents: [AdduserComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LayoutModule { }
