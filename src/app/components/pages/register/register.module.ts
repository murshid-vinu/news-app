import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: RegisterComponent }
    ]),
    ReactiveFormsModule,
    // ToastrModule.forRoot()
  ]
})
export class RegisterModule { }
