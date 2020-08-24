import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  title:string;
  constructor(private router: Router , public authService: AuthServiceService) {

    // Si el servicio de autenticacion retorna true
    if (this.authService.loggedIn() == true) {
      this.title = 'Ver Acciones'; // Ver acciones al header
    } else { // sino
      this.title = 'Ingresar'; // que muestre acceder al sistema
    }
  }

  shoppingCountNumber: number = 0;
  // Bandera que cambia de status una vez que el usuario dio click en login
  statusClick: boolean = false;
  stile: string = '#25365D !important;';
  ngOnInit(): void {
    this.statusClick = false;



  }

  // Funcion para dar click al login
  clickMeLogin () {
    this.router.navigate(['auth/login-user']);
    this.statusClick = true;
  }

  // Funcion para dar click al registro
  clickMeRegister () {
    this.router.navigate(['auth/register-user']);
    this.statusClick = true;
  }

  clickMeOnHome () {
    this.router.navigate(['/']);
    this.statusClick = false;
  }
  countShoppingCart() {}

}
