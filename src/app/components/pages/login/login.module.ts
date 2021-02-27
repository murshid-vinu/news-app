import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: LoginComponent }
    ]),
    ReactiveFormsModule
  ],
  providers: [AuthService]
})
export class LoginModule { }
