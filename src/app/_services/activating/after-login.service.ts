import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "../auth/auth.service";


@Injectable()
export class AfterLoginService implements CanActivate{
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if (this.auth.logged()) {
      return this.auth.logged();
    } else {
      this.router.navigateByUrl('/login');
      return false
    }
  }

  constructor(private auth: AuthService, private router: Router) { }

}
