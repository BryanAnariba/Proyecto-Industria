import { Injectable  } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from  '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private httpClient: HttpClient , private router: Router) { }

  // Url del servidor a realizar las peticiones
  BACKEN_URI: string = 'http://localhost:3500/auth';

  //                                                  Servicios a consumir
  // 1 - Registro de un usuario
  registerUser (newUser: any): Observable <any> {
    return this.httpClient.post(`${ this.BACKEN_URI }/register` , {
      firstName: newUser.firstName ,
      lastName: newUser.lastName ,
      emailUser: newUser.emailUser ,
      passUser: newUser.passUser
    });
  }

  // 2 - Logueo de un usuario
  signInUser (userData: any): Observable <any> {
    return this.httpClient.post(`${ this.BACKEN_URI }/login` , {
      emailUser: userData.emailUser ,
      passUser: userData.passUser
    });
  }


  // 3 - Cierre de sesion
  logOut () {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('UsrEmail');
    localStorage.removeItem('Id');
    this.router.navigate(['auth/login-user']);
  }
  // Metodos aparte de los servicios que verifica el logueo del usuario mediante el req.headers, trabaja junto con el guard
  loggedIn () {
    if (localStorage.getItem('accessToken') && localStorage.getItem('UsrEmail')) {
      return true;
    } else {
      return false;
    }
  }

  getToken () {
    return localStorage.getItem('accessToken');
  }
}
