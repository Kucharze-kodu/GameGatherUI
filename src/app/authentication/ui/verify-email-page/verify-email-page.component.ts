import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../../data-access/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verify-email-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './verify-email-page.component.html',
  styleUrl: './verify-email-page.component.css'
})
export class VerifyEmailPageComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthenticationService);
  private toastr = inject(ToastrService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  verificationForm = this.formBuilder.group({
    verificationCode: ['', Validators.required]
  });

  verifyEmailRequest = {
    email: '',
    verificationCode: ''
  };

  showForm = true;

  constructor() {
    this.route.queryParams.subscribe(params => {
      const email = params['email'];
      const verificationCode = params['verificationCode'];
      if (email && verificationCode) {
        this.verifyEmailRequest.email = email;
        this.verifyEmailRequest.verificationCode = verificationCode;
        this.showForm = false;
        this.verifyEmail();
      }
    });
  }

  onSubmit() {
    if (this.verificationForm.invalid) {
      this.verificationForm.markAllAsTouched();
      this.toastr.error('Please enter a valid verification code', 'Error');
      return;
    }

    const code = this.verificationForm.get('verificationCode')?.value ?? '';
    this.verifyEmailRequest.verificationCode = code;
    this.showForm = false;
    
    console.log('Verification code submitted:', code);
    this.verifyEmail();
  }

  resendVerificationCode() {    
    this.toastr.info('Verification code has been resent', 'Info');
  }

  verifyEmail() {
    this.authService.verifyEmail(this.verifyEmailRequest).subscribe({
      next: (response) => {
        this.toastr.success('Email verified successfully!', 'Success');
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.toastr.error(error.error.detail, 'Error');
        this.showForm = true;
      }
    });
  }
}
