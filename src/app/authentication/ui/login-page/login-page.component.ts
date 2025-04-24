import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginRequest } from '../../model/login-request';

@Component({
  selector: 'app-login-page',
  imports: [ RouterModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  private formBuilder = inject(FormBuilder);

  loginRequest: LoginRequest = {
    email: '',
    password: ''
  };

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  onSubmit() {
    // Process login form data here
    console.log(this.loginForm.value);
  }
}
