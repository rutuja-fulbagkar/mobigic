import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class loginGuard implements CanActivate {
  constructor(private router:Router){}
  canActivate()
  {
    if(localStorage.getItem('token'))
    {
      return true;
    }
    else
    {
      this.router.navigate(['/authentication/login']);
      return false; 
    }
  }
  
}
