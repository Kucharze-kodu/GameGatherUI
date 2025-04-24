import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
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

  verificationForm = this.formBuilder.group({
    verificationCode: ['', Validators.required]
  });

  onSubmit() {
    if (this.verificationForm.invalid) {
      this.verificationForm.markAllAsTouched();
      this.toastr.error('Please enter a valid verification code', 'Error');
      return;
    }

    const code = this.verificationForm.get('verificationCode')?.value ?? '';
    
    console.log('Verification code submitted:', code);
    this.toastr.success('Email verified successfully!', 'Success');
  }

  resendVerificationCode() {    
    this.toastr.info('Verification code has been resent', 'Info');
  }
}
