import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_API } from '../utils/params';
import { MedioPago } from '../models/medio-pago';

@Injectable({
  providedIn: 'root'
})
export class MedioPagoService {

  constructor(private http:HttpClient) { }

  getMedioPagos(){
    let url=`${URL_API}/mediopago/listAllMedioPago`;
    return this.http.get(url);
  }
  getMedioPagoById(id){
    let url=`${URL_API}/mediopago?id=${id}`;
    return this.http.get(url);
  }
  updateMedioPago(medioPago:MedioPago){
    let url=`${URL_API}/mediopago/editarMedioPago`;
    return this.http.put(url,medioPago);
  }
  deleteMedioPago(medioPago:MedioPago){
    let url=`${URL_API}/mediopago/deshabilitarMedioPago?id=${medioPago.id}`;
    return this.http.put(url,null);
  }
  crearMedioPago(medioPago){
    let url=`${URL_API}/mediopago/crearMedioPago`;
    return this.http.post(url,medioPago); 
  }
  habilitarMedioPago(id){
    let url= `${URL_API}/mediopago/habilitarMedioPago?id=${id}`;
    return this.http.put(url,null);
  }
}
