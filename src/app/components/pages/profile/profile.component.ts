import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidator } from 'src/app/core/validators/password.validator';
import { ProfileService } from '../../../services/profile.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', '../login/login.component.css']
})
export class ProfileComponent implements OnInit {

  displayName = localStorage.getItem('displayName');
  email = localStorage.getItem('email');
  displayNameForm: FormGroup;
  changePasswordForm: FormGroup;
  changePassord: boolean = false;
  changeUsername: boolean = false;

  constructor(private profileService: ProfileService,
    private fb: FormBuilder,
    private toastrService: ToastrService,
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this.displayNameForm = this.fb.group({
      displayName: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]+$/)]
      )]
    })
    this.displayNameForm.get('displayName').setValue(this.displayName);

    this.changePasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      password: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]+$/),
        Validators.max(20)]
      )],
      confirmPassword: ['', Validators.required],
    }, { validators: PasswordValidator })
  }

  get usernameForm() {
    return this.displayNameForm.controls;
  }

  get passwordForm() {
    return this.changePasswordForm.controls;
  }

  changePassword() {
    if (this.changePasswordForm.invalid) {
      this.changePasswordForm.markAllAsTouched();
      return;
    }

    let passwordData = this.changePasswordForm.value;
    passwordData.userId = localStorage.getItem('userId')
    this.profileService.changePassword(passwordData).subscribe((_response: any) => {
      if (_response.status) {
        this.toastrService.success('Password updation successful');
        this.changePassord = false;
      } else {
        if (_response.message)
          this.toastrService.error(_response.message);
        else
          this.toastrService.error('Please try again');
      }
    })

  }

  changeUserName() {
    if (this.displayNameForm.invalid) {
      this.displayNameForm.markAllAsTouched();
      return;
    }

    this.profileService.updateDisplayName({ userId: localStorage.getItem('userId'), displayName: this.usernameForm.displayName.value }).subscribe((_response: any) => {
      if (_response.status) {
        this.toastrService.success('Username updation successful');
        localStorage.setItem('displayName', this.usernameForm.displayName.value);
        this.displayName = localStorage.getItem('displayName');
        this.changeUsername = false;
      } else {
        if (_response.message)
          this.toastrService.error(_response.message);
        else
          this.toastrService.error('Please try again');
      }
    })
  }

  deleteAccount() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.profileService.deleteAccount(localStorage.getItem('userId')).subscribe((_response: any) => {
          if (_response.status) {
            this.toastrService.success('Deletion successful');
            localStorage.removeItem('userId');
            localStorage.removeItem('displayName');
            localStorage.removeItem('email');
            this.router.navigateByUrl('/login');
          } else {
            if (_response.message)
              this.toastrService.error(_response.message);
            else
              this.toastrService.error('Please try again');
          }
        })
      }
    })
  }




}

@Component({
  selector: 'app-confirmation-dialog',
  template: `<div class="modal-div">
                <mat-dialog-content>
                    <p>
                        {{message}}
                    </p>
                </mat-dialog-content>
                <mat-dialog-actions align="center">
                    <button mat-raised-button color="primary" (click)="onConfirmClick()" tabindex="-1">{{confirmButtonText}}</button>
                    <button mat-raised-button mat-dialog-close tabindex="-1">{{cancelButtonText}}</button>
                </mat-dialog-actions>
              </div>`,
  styleUrls: []
})
export class ConfirmationDialogComponent implements OnInit {
  message: string = "Are you sure want to delete?"
  confirmButtonText = "Yes"
  cancelButtonText = "Cancel"

  constructor(
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>) {
  }

  ngOnInit(): void {
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

}
