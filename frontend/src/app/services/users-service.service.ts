import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {
  BACKEND_URI: string = 'http://localhost:3500/users';
  constructor(private httpClient: HttpClient) { }

  getUserData (userId): Observable<any> {
    return this.httpClient.get(`${ this.BACKEND_URI }/profile/${ userId }` , {});
  }


  savePhoto (userId: string , file: File): Observable<any> {
    let form = new FormData(); // Creamos un arreglo FormData para que soporte imagenes
    form.append('file' , file , 'form-data');

    return this.httpClient.post(`${ this.BACKEND_URI }/profile/change-photo/${ userId }` ,form);
  }


}
