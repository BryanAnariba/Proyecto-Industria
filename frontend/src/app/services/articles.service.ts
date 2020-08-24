import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  BACKEND_URI: string = 'http://localhost:3500/publications';

  constructor(private httpClient: HttpClient) { }

  postArticle (userId: string , emailUser: string , file:File , article: string , description: string , price: string , category: string): Observable<any> {
    let form = new FormData();
    // Vamos anexando poco los campos de uno en uno al nuevo arreglo
    form.append('emailUser' , emailUser);
    form.append('article' , article);
    form.append('description' , description);
    form.append('price' , price);
    form.append('category' , category);
    form.append('file' , file , 'form-data');
    return this.httpClient.post(`${ this.BACKEND_URI }/articles/upload-article/${ userId }` , form);
  }

  getArticles (): Observable<any> {
    return this.httpClient.get(`${ this.BACKEND_URI }/articles/list-articles` , {});
  }
}
