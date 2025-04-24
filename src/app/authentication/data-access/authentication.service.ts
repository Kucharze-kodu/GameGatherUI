import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LoginResponse } from '../model/login-response';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RegisterRequest } from '../model/register-request';
import { Observable } from 'rxjs';
import { RegisterResponse } from '../model/register-response';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = `${environment.apiUrl}`;
  currentUserSig = signal<LoginResponse | null | undefined>(undefined);

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  register(registerRequest: RegisterRequest): Observable<any> {
    return this.http.post<RegisterResponse>(this.apiUrl + "/register", registerRequest);
  }
}
