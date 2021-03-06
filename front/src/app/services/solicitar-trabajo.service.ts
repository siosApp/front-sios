import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_API } from '../utils/params';

@Injectable({
  providedIn: 'root'
})
export class SolicitarTrabajoService {

  constructor(private http:HttpClient) {}

  crearSolicitud(solicitud){
    let url=`${URL_API}/solicitud/solicitarServicio`;
    return this.http.post(url,solicitud);
  }
  getSolicitudesPendientesPorUsuario(idUsuario){
    let url=`${URL_API}/solicitud/solicitudesPendientesPorUsuario?idUsuario=${idUsuario}`;
    return this.http.get(url);
  }
  getCantidadSolicitudesPendientesPorUsuario(idUsuario){
    let url=`${URL_API}/solicitud/cantidadSolicitudesPendientesPorUsuario?idUsuario=${idUsuario}`;
    return this.http.get(url);
  }
  getSolicitudesPorUsuario(idUsuario){
    let url=`${URL_API}/solicitud/solicitudesPorUsuario?idUsuario=${idUsuario}`;
    return this.http.get(url);
  }
  aceptarSolicitud(idSolicitud){
    let url=`${URL_API}/solicitud/aceptarSolicitud?idSolicitud=${idSolicitud}`;
    return this.http.put(url,null);
  }
  rechazarSolicitud(idSolicitud){
    let url=`${URL_API}/solicitud/rechazarSolicitud?idSolicitud=${idSolicitud}`;
    return this.http.put(url,null);
  }
  finalizarSolicitud(idSolicitud,calificacion,comentario){
    let url=`${URL_API}/solicitud/finalizarSolicitud?idSolicitud=${idSolicitud}&calificacion=${calificacion}&comentario=${comentario}`;
    return this.http.put(url,null);
  }
  getSolicitudesEfectuadasPorUsuario(id){
    let url=`${URL_API}/solicitud/solicitudesEfectuadasPorUsuario?id=${id}`;
    return this.http.get(url);
  }
  getCalificacionesPendientesComoOferente(id){
    let url=`${URL_API}/solicitud/cantidadSolicitudesComoDemandanteSinCalificar?id=${id}`;
    return this.http.get(url);
  }
  getCalificacionesPendientesComoDemandante(id){
    let url=`${URL_API}/solicitud/cantidadSolicitudesComoOferenteSinCalificar?id=${id}`;
    return this.http.get(url);
  }
  getTrabajosRealizados(id){
    let url=`${URL_API}/solicitud/trabajosRealizados?idUsuario=${id}`;
    return this.http.get(url);
  }
  getListaTrabajosRealizados(id){
    let url=`${URL_API}/solicitud/trabajosOferente?idUsuario=${id}`;
    return this.http.get(url);
  }
  getTrabajosEnCurso(id){
    let url=`${URL_API}/solicitud/trabajosEnCurso?idUsuario=${id}`;
    return this.http.get(url);
  }
}
