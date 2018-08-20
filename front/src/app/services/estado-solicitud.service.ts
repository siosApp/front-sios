import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_API } from '../utils/params';
import { EstadoSolicitud } from '../models/estado-solicitud';

@Injectable({
  providedIn: 'root'
})
export class EstadoSolicitudService {

  constructor(private http:HttpClient) { }

  getEstados(){
    let url=`${URL_API}/estadoSolicitud/listAllEstadoSolicitud`;
    return this.http.get(url);
  }
  getEstadoById(id){
    let url=`${URL_API}/estadoSolicitud?id=${id}`;
    return this.http.get(url);
  }
  updateEstado(estado:EstadoSolicitud){
    let url=`${URL_API}/estadoSolicitud/editarEstadoSolicitud`;
    return this.http.put(url,estado);
  }
  deleteEstado(estado:EstadoSolicitud){
    let url=`${URL_API}/estadoSolicitud/deshabilitarEstadoSolicitud?id=${estado.id}`;
    return this.http.put(url,null);
  }
  crearEstado(estado){
    let url=`${URL_API}/estadoSolicitud/crearEstadoSolicitud`;
    return this.http.post(url,estado); 
  }
  habilitarEstado(id){
    let url= `${URL_API}/estadoSolicitud/habilitarEstadoSolicitud?id=${id}`;
    return this.http.put(url,null);
  }
}
