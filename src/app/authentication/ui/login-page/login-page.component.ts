import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginRequest } from '../../model/login-request';
import { AuthenticationService } from '../../data-access/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { LoginResponse } from '../../model/login-response';

@Component({
  selector: 'app-login-page',
  imports: [ RouterModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  private formBuilder = inject(FormBuilder);
  private authenticationService = inject(AuthenticationService);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  loginRequest: LoginRequest = {
    email: '',
    password: ''
  };

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.toastr.error('Please fill in all required fields correctly.', 'Error');
      return;
    }

    this.loginRequest = {
      email: this.loginForm.value.email ?? '',
      password: this.loginForm.value.password ?? ''
    };

    this.authenticationService.login(this.loginRequest)
    .subscribe({
      next: (response: LoginResponse) => {
        localStorage.setItem("user", JSON.stringify(response));
        this.authenticationService.loadCurrentUser();
        this.toastr.success('Login successful!', 'Success');
        this.loginForm.reset();
        this.router.navigate(['/home']);


      },
      error: (error) => {        
        if (error.status === 401) {
          if(error.error.errorCodes[0] === "User.NotVerified") {
            this.router.navigate(['/verify-email'], { queryParams: { email: this.loginRequest.email } });
          }
        } else {
          this.toastr.error(error.error.detail, 'Error');
        }        
      }
    });
  }
}
