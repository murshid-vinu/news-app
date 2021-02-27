import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent, ProfileComponent } from './profile.component';
import { RouterModule } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { SharedModule } from '../../shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [ProfileComponent, ConfirmationDialogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ProfileComponent }
    ]),
    SharedModule,
    MatDialogModule
  ],
  providers: [ProfileService]
})
export class ProfileModule { }
