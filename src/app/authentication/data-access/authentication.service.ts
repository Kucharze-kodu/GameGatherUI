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
  ) {
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const parsedUser: LoginResponse = JSON.parse(user)
        this.currentUserSig.set(parsedUser);
      } catch (error) {
        localStorage.removeItem('user');
        this.currentUserSig.set(null);
      }
    } else {
      this.currentUserSig.set(null);
    }
  }

  getCurrentUser(): LoginResponse | null | undefined {
    return this.currentUserSig();
  }

  isAuthenticated(): boolean {
    const user = this.currentUserSig();
    return !!user && !!user.token;
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSig.set(null);
    this.router.navigate(['/login']);
  }

  register(registerRequest: RegisterRequest): Observable<any> {
    return this.http.post<RegisterResponse>(this.apiUrl + "/register", registerRequest);
  }

  login(loginRequest: { email: string, password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl + "/login", loginRequest);
  }
}
