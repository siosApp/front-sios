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
}
