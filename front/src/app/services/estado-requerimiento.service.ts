import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { URL_API } from '../utils/params';
import { EstadoRequerimiento } from '../models/estado-requerimiento';

@Injectable({
  providedIn: 'root'
})
export class EstadoRequerimientoService {

  constructor(private http: HttpClient) { }

  getEstados(){
    let url=`${URL_API}/estadoRequerimiento/listAllEstadoRequerimiento`;
    return this.http.get(url);
  }
  getEstadoById(id){
    let url=`${URL_API}/estadoRequerimiento?id=${id}`;
    return this.http.get(url);
  }
  updateEstado(estado:EstadoRequerimiento){
    let url=`${URL_API}/estadoRequerimiento/editarEstadoRequerimiento`;
    return this.http.put(url,estado);
  }
  deleteEstado(estado:EstadoRequerimiento){
    let url=`${URL_API}/estadoRequerimiento/deshabilitarEstadoRequerimiento?id=${estado.id}`;
    return this.http.put(url,null);
  }
  crearEstado(estado){
    let url=`${URL_API}/estadoRequerimiento/crearEstadoRequerimiento`;
    return this.http.post(url,estado); 
  }
  habilitarEstado(id){
    let url= `${URL_API}/estadoRequerimiento/habilitarEstadoRequerimiento?id=${id}`;
    return this.http.put(url,null);
  }
}
