import {
  CanActivate,
  ActivateRouterSnapshot,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs'

export class AuthGuard implements CanActivate {
  CanActivate(
    route: ActivateRouterSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean> | UrlTree | Promise<boolean> | UrlTree;
  
}