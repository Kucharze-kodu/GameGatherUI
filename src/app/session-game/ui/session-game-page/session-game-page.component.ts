import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GetSessionGameRequest } from '../../model/get-one/get-one-session-request';
import { GetSessionGameResponse } from '../../model/get-one/get-one-session-response';
import { AuthenticationService } from '../../../authentication/data-access/authentication.service';

@Component({
  selector: 'app-session-game-page',
  imports: [ RouterModule, ReactiveFormsModule],
  templateUrl: './session-game-page.component.html',
  styleUrls: ['./session-game-page.component.css'],
})
export class SessionGamePageComponent {
  private authenticationService = inject(AuthenticationService);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  sessionData?: GetSessionGameResponse;

  ngOnInit() {
    const request: GetSessionGameRequest = { id: '1' }; // lub dynamicznie z route param
    this.authenticationService.getSessionGame(request).subscribe({
      next: (data) => {
        this.sessionData = data;
      },
      error: () => {
        this.toastr.error('Nie udało się pobrać danych sesji');
      }
    });
  }
}

