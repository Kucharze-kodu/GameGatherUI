import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../../authentication/data-access/authentication.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  private authService = inject(AuthenticationService);
  
  get userName(): string {
    const user = this.authService.getCurrentUser();
    return user?.firstname || 'User'; // Zakładając, że LoginResponse ma pole firstName
  }
  
  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }
  
  logout(): void {
    this.authService.logout();
  }
}
