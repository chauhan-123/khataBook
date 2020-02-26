import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { RouterModule, Routes } from '@angular/router';
import { MatToolbarModule, MatButtonModule, MatDialogModule, MatInputModule, MatFormFieldModule, MatIconModule, MatCardModule } from '@angular/material';
import { AdduserComponent } from './adduser/adduser.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

const layout: Routes = [
  { path: '', component: LayoutComponent }
]

@NgModule({
  declarations: [LayoutComponent, AdduserComponent],
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
    MatCardModule
  ],
  entryComponents: [AdduserComponent]
})
export class LayoutModule { }
