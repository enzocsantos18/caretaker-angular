import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable()
export class LoggedInGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }
    canActivate(): Observable<boolean> | Promise<boolean> | boolean {

        if (!this.authService.isLogado()) {
            this.router.navigate(['/']);
            return false;
        }

        return true;
    }
}