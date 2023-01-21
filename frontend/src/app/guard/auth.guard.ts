import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/shared/service/auth/auth.service'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private route: Router){}


  canActivate(){
    if (this.auth.isLoggedIn()) {
      return true;
    } else {
      this.route.navigate(['login']);
      return false;
    }
  } 
  
}
