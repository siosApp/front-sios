import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_API } from '../utils/params';

@Injectable({
  providedIn: 'root'
})
export class CalificacionService {

  urlCalificaciones:string;
  
  constructor(private http:HttpClient) {
    this.urlCalificaciones=`${URL_API}/calificacion`
  }

  getCalificaciones(idUsuario){
    let url=`${this.urlCalificaciones}/calificacionesUsuario?idUsuario=${idUsuario}`;
    return this.http.get(url);
  }
}
