import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, FormGroup, ValidatorFn } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegisterRequest } from '../../model/register-request';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../data-access/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-page',
  imports: [ RouterModule, ReactiveFormsModule ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  private formBuilder = inject(FormBuilder);
  private authenticationService = inject(AuthenticationService);
  private toastr = inject(ToastrService);


  registerRequest: RegisterRequest = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthday: new Date()
  };

  registerForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8), this.createPasswordMatchValidator()]],
    birthday: ['', Validators.required],
  });

  // Custom validator to check if password and confirm password match
  createPasswordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.parent) {
        return null;
      }
      const password = control.parent.get('password');
      if (!password) {
        return null;
      }
      
      if (control.pristine) {
        return null;
      }
      
      return password.value === control.value ? null : { passwordMismatch: true };
    };
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.toastr.error('Please fill in all required fields correctly.', 'Error');
      return;
    } 

    this.registerRequest = {
      firstName: this.registerForm.value.firstName ? this.registerForm.value.firstName : '',
      lastName: this.registerForm.value.lastName ? this.registerForm.value.lastName : '',
      email: this.registerForm.value.email ? this.registerForm.value.email : '',
      password: this.registerForm.value.password ? this.registerForm.value.password : '',
      confirmPassword: this.registerForm.value.confirmPassword ? this.registerForm.value.confirmPassword : '',
      birthday: this.registerForm.value.birthday ? new Date(this.registerForm.value.birthday) : new Date()
    }

  
    this.authenticationService.register(this.registerRequest).subscribe({
      next: (response) => {
        this.toastr.success('Registration successful!', 'Success');
        console.log(response);
      }
      , error: (error) => {
        this.toastr.error(error.error.detail, 'Error');
        
        console.error(error);
      }
    });
   
  }
}
