import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
@Injectable({
  providedIn: 'root'
})
export class ProtectRoutesAppGuard implements CanActivate {
  constructor (private authService: AuthServiceService , private router: Router) {

  }

  canActivate(): boolean {

    // Si es servicio para verificar logueos y proteccion de rutas retorna true
    if (this.authService.loggedIn()) {
      return true;
    } else { // Caso contrario que redireccione al login
      this.router.navigate(['auth/login-user']);
    }
  }

}
