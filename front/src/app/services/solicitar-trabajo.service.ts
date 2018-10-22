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
    let url=`${URL_API}/solicitud/solicitudesEfectuadasPorUsuario?idUsuario=${id}`;
    return this.http.get(url);
  }
}
