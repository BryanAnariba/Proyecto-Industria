import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Validators , FormGroup , FormControl } from '@angular/forms';
import { UsersServiceService } from 'src/app/services/users-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-user-photography',
  templateUrl: './change-user-photography.component.html',
  styleUrls: ['./change-user-photography.component.css']
})
export class ChangeUserPhotographyComponent implements OnInit {
  // Inicializaciones importantes
  image: string = "assets/images/arte.svg";
  file: any;
  sendForm: any;
  userId: string = '';
  constructor(private myToasts: ToastrService , private userService: UsersServiceService , private router: Router) {
    this.userId = localStorage.getItem('Id');
  }

  ngOnInit(): void {
  }

  myProfilePhoto = new FormGroup({
    file: new FormControl('' , [Validators.required])
  });

  // Evento Onchange para cargar la imagen al formulario antes de subirla al servidor y visualizar lo que estamos subiendo
  onFileChange (event) {
    if(event.target.files && event.target.files.length > 0) { // Comprobamos a ver si al dar click en la subir archivo viene una imagen
      const file = event.target.files[0]; //Almacenamos la imagen
      if (file.type.includes("image")) { // aqui se valida si es una imagen lo que viene desde el client
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function load () {
          this.image = reader.result;
        }.bind(this);

        this.file = file; // Aqui con esto ya se iguala el archivo a la imagen
      } else { // Caso contrario
        this.myToasts.error('Ocurrio un error' , ' El archivo no es una imagen');
        console.log({ 'mensaje': 'Ocurrio un error, El archivo no es una imagen' });
      }
    }
  }

  saveUser () {
    const sendForm = this.myProfilePhoto; // Creamos un nuevo arreglo para evitar errores
    console.log(sendForm.value);
    console.log(this.file);
    this.userService.savePhoto(this.userId ,  this.file)
    .subscribe(
      (success:any) => {
        console.log(success);
        this.myToasts.success('Cambios realizados con exito' , success.message);
        this.myProfilePhoto.reset(); // Limpiamos formulario
        this.router.navigate(['main/my-profile']);
      } ,
      (error) => {
        console.log(error);
        this.myToasts.error('Error' , ' Hubo un problema');
      }
    );
    this.image = "assets/img/arte.svg";
  }
}


