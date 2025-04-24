import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthenticationService } from '../data-access/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    // Użyjmy isAuthenticated zamiast getCurrentUser
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.toastr.error('You must be logged in to access this page', 'Access Denied');
      return this.router.createUrlTree(['/login']);
    }
  }
}
