import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-genera-compra',
  templateUrl: './genera-compra.component.html',
  styleUrls: ['./genera-compra.component.css']
})
export class GeneraCompraComponent implements OnInit {

  constructor(private articlesServices: ArticlesService) { }
  listaArticulos: any = [];
  ngOnInit(): void {
    this.articlesServices.getArticles()
    .subscribe(
      (success: any) => {
        console.log(success);
        this.listaArticulos = success;
      } ,
      (error) => {
        console.log(error);
      }
    )
  }

}
