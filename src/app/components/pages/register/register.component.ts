import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PasswordValidator } from '../../../core/validators/password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../login/login.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.email]
      )],
      password: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]+$/),
        Validators.max(20)]
      )],
      confirmPassword: ['', Validators.required],
      displayName: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]+$/)]
      )]
    }, { validators: PasswordValidator })
  }

  get form() {
    return this.registerForm.controls;
  }

  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.authService.userEmailCheck(this.form.email.value).subscribe((_response: any) => {
      if (_response.status) {
        let userData = {
          email: this.form.email.value,
          password: this.form.password.value,
          displayName: this.form.displayName.value
        }
        this.authService.userRegistration(userData).subscribe((_response: any) => {
          if (_response.status) {
            this.toastrService.success('User registration successful');
            this.router.navigateByUrl('/login')
          } else {
            this.toastrService.error('Pleas try again');
          }
        })
      } else {
        this.toastrService.error('Email already exists');
      }
    })

  }

}
