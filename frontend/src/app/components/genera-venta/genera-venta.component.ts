import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Validators , FormGroup , FormControl } from '@angular/forms';
import { ArticlesService } from '../../services/articles.service';

@Component({
  selector: 'app-genera-venta',
  templateUrl: './genera-venta.component.html',
  styleUrls: ['./genera-venta.component.css']
})
export class GeneraVentaComponent implements OnInit {
  // Inicializaciones importantes
  image: string = "assets/images/arte.svg";
  file: any;
  sendForm: any;
  userId: string = '';
  emailUser: string = '';
  constructor(private myToasts: ToastrService , private articleService: ArticlesService) { }

  ngOnInit(): void {
  }

  postArticle () {
    this.userId = localStorage.getItem('Id');
    this.emailUser = localStorage.getItem('UsrEmail');
    const sendForm = this.newAarticle;
    this.articleService.postArticle(this.userId , this.emailUser , this.file , sendForm.value.article , sendForm.value.description , sendForm.value.price , sendForm.value.category)
    .subscribe(
      (success:any) => {
        this.myToasts.success('Exito' , success.message);
        this.newAarticle.reset();
        this.image = "assets/images/arte.svg";
      } ,
      (error) => {
        console.log(error);
      }
    );

  }


  newAarticle = new FormGroup({
    file: new FormControl('' , [Validators.required]) , // Nombre de la imagen, en este caso decidi no guardar este campo
    article: new FormControl('' , [Validators.required]) ,
    description: new FormControl('' , [Validators.required]) ,
    price: new FormControl('' , [Validators.required]) ,
    category: new FormControl('' , [Validators.required]) ,
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


}
