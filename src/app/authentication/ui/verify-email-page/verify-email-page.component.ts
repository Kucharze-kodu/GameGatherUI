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
  waitUntil?: Date;

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

    const waitUntilStr = localStorage.getItem('waitUntil');
    if (waitUntilStr) {
      const parsed = new Date(waitUntilStr);
      if (!isNaN(parsed.getTime())) {
        this.waitUntil = parsed;
      }
    }
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
    this.verifyEmail();
  }

  resendVerificationCode() {
    if (this.waitUntil && new Date() < this.waitUntil) {
      const diff = Math.ceil((this.waitUntil.getTime() - new Date().getTime()) / 1000);
      const minutes = Math.floor(diff / 60);
      const seconds = diff % 60;
      const minSec = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      this.toastr.info(`Please wait ${minSec} before requesting a new code`, 'Info');
      return;
    }

    this.route.queryParams.subscribe(params => {
      const email = params['email'];
      const verifyEmailUrl = window.location.origin + '/verify-email';

      this.authService.resendVerificationToken({
        email: email,
        verifyEmailUrl: verifyEmailUrl
      }).subscribe({
        next: (response) => {
          if (response.status === 0 && response.timeToWait) {
            const parts = response.timeToWait.split(':');
            const minutes = Number(parts[1]);
            const seconds = Number(parts[2].split('.')[0]);
            const now = new Date();
            this.waitUntil = new Date(now.getTime() + minutes * 60000 + seconds * 1000);

            localStorage.setItem('waitUntil', this.waitUntil.toISOString());

            const minSec = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            this.toastr.info(`Please wait ${minSec} before requesting a new code`, 'Info');
            return;
          }
          this.toastr.success('Verification code has been resent to your email', 'Success');
          this.showForm = true;
        },
        error: (error) => {
          this.toastr.error(error.error.detail, 'Error');
          this.showForm = true;
        }
      });
    });
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
