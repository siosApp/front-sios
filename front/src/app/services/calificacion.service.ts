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

  // getCalificaciones(idUsuario){
  //   let url=`${this.urlCalificaciones}/calificacionesUsuario?idUsuario=${idUsuario}`;
  //   return this.http.get(url);
  // }
  getCalificaciones(idUsuario,demandante,oferente){
    let url=`${URL_API}/usuario/reporte-calificaciones?id=${idUsuario}&esDemandante=${demandante}&esOferente=${oferente}`;
    return this.http.get(url);
  }

  calificar(calificacion){
    let url=`${this.urlCalificaciones}/realizarCalificacion`;
    return this.http.put(url,calificacion);
  }
}
