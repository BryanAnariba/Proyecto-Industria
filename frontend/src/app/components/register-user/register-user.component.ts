import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from '../../services/auth-service.service';
import { Validators , FormGroup , FormControl } from '@angular/forms';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  constructor(
    private myToasts: ToastrService ,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
  }
  // Zona Variables
  userData: any = {};

  // Funciones toast
  showSuccess(user: string , message: string) {
    this.myToasts.success(user , message);
  }
  showWarning (error: string , message: string) {
    this.myToasts.warning(error , message)
  }

  // Aplicando formularios reactivos para poder validar campos
  user = new FormGroup({
    firstName: new FormControl('' , [Validators.required , Validators.minLength(6) , Validators.maxLength(100)]) ,
    lastName: new FormControl('' , [Validators.required , Validators.minLength(6) , Validators.maxLength(100)]) ,
    emailUser: new FormControl('' , [Validators.required , Validators.pattern(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i)]) ,
    passUser: new FormControl('' , [Validators.required , Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]) ,
    RpassUser: new FormControl('' , [Validators.required , Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)])
  });

  // Obteniendo los parametros de cada uno de los inputs
  get firstName () {
    return this.user.get('firstName');
  }
  get lastName () {
    return this.user.get('lastName');
  }
  get emailUser () {
    return this.user.get('emailUser');
  }
  get passUser () {
    return this.user.get('passUser');
  }
  get RpassUser () {
    return this.user.get('RpassUser');
  }

// ----------------------------------> Seccion de funciones o metodos
  saveNewUser () {
    this.userData = this.user.value;

    // Verificamos que las claves sean identicas antes de hacer la solicitud de guardado
    if (this.userData.passUser === this.userData.RpassUser) {
      this.authService.registerUser(this.userData)
      .subscribe(
        (success: any) => {
          console.log(success);
          if (success.statusCode === 1) {
            this.showSuccess(success.newUser , success.message);
            this.user.reset();
          } else {
            this.showWarning(success.user , success.message);
          }
        } ,
        (error) => {
          this.showWarning(error , 'Error');
        }
      );
    } else {
      this.showWarning('Error' , 'Las Claves Ingresadas no Coinciden');
    }
  }
}
