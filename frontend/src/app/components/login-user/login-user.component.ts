import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Validators , FormControl , FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {

  constructor(
    private myToasts: ToastrService ,
    private authService: AuthServiceService ,
    private router: Router
  )
  {}

  successToast (user: string , message: string) {
    this.myToasts.success(user , message);
  }

  errorToast (error: string , message: string) {
    this.myToasts.error(error , message);
  }

  ngOnInit(): void {
  }


  // Aplicando formularios reactivos para poder validar campos
  userData = new FormGroup({
    emailUser: new FormControl('' , [Validators.required]) ,
    passUser: new FormControl('' , [Validators.required])
  });

  // Obteniendo los parametros de cada uno de los inputs
  get emailUser () {
    return this.userData.get('emailUser');
  }

  get passUser () {
    return this.userData.get('passUser');
  }

  // ----------------------------------> Seccion de funciones o metodos
  signIn () {
    this.authService.signInUser(this.userData.value)
    .subscribe(
      (success: any) => {
        console.log(success);
        if (success.statusCode === 1) {
          //this.successToast(success.emailUser , success.idUser);

          // Guardamos el token de acceso en localstorage
          localStorage.setItem('accessToken' , success.accessToken);
          localStorage.setItem('UsrEmail' , success.emailUser);
          localStorage.setItem('Id' , success.idUser);
          this.router.navigate(['main/my-profile']);

          this.userData.reset();
        } else {
          this.errorToast(success.user , success.message);
        }
      } ,
      (error) => {
        console.log(error);
      }
    );
  }

}
