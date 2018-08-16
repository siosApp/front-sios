import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_API } from '../utils/params';

@Injectable({
  providedIn: 'root'
})
export class EstadoSolicitudService {

  constructor(private http:HttpClient) { }

  getEstados(){
    let url=`${URL_API}/estadoSolicitud/listAllEstadoSolicitud`;
    return this.http.get(url);
  }
}
