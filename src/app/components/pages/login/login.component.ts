import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])]
    })
  }

  get form() {
    return this.loginForm.controls;
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    }
    this.authService.userLogin(this.loginForm.value).subscribe((_response: any) => {
      if(_response.status){
        localStorage.setItem('userId', _response.userId);
        localStorage.setItem('displayName', _response.displayName);
        localStorage.setItem('email', this.form.email.value);
        this.router.navigateByUrl('/home');
      }else{
        this.toastrService.error('Invalid credentials');
      }
    })
  }

}
