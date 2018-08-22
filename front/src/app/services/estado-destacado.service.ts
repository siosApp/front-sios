import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_API } from '../utils/params';
import { EstadoDestacado } from '../models/estado-destacado';

@Injectable({
  providedIn: 'root'
})
export class EstadoDestacadoService {

  constructor(private http:HttpClient) { }

  getEstadoDestacado(){
    let url=`${URL_API}/estadodestacado/listAllEstadoDestacado`;
    return this.http.get(url);
  }
  getEstadoDestacadoById(id){
    let url=`${URL_API}/estadodestacado?id=${id}`;
    return this.http.get(url);
  }
  updateEstadoDestacado(estadoDestacado:EstadoDestacado){
    let url=`${URL_API}/estadodestacado/editarEstadoDestacado`;
    return this.http.put(url,estadoDestacado);
  }
  deleteEstadoDestacado(estadoDestacado:EstadoDestacado){
    let url=`${URL_API}/estadodestacado/deshabilitarEstadoDestacado?id=${estadoDestacado.id}`;
    return this.http.put(url,null);
  }
  crearEstadoDestacado(estadoDestacado){
    let url=`${URL_API}/estadodestacado/crearEstadoDestacado`;
    return this.http.post(url,estadoDestacado); 
  }
  habilitarEstadoDestacado(id){
    let url= `${URL_API}/estadodestacado/habilitarEstadoDestacado?id=${id}`;
    return this.http.put(url,null);
  }
}
