import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_API } from '../utils/params';
import { Provincia } from '../models/provincia';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {

  constructor(private http:HttpClient) { }

  getProvincias(){
    let url=`${URL_API}/provincia/listAllProvincia`;
    return this.http.get(url);
  }
  getProvinciaById(id){
    let url=`${URL_API}/provincia?id=${id}`;
    return this.http.get(url);
  }
  updateProvincia(provincia:Provincia){
    let url=`${URL_API}/provincia/editarProvincia`;
    return this.http.put(url,provincia);
  }
  deleteProvincia(provincia:Provincia){
    let url=`${URL_API}/provincia/deshabilitarProvincia?id=${provincia.id}`;
    return this.http.put(url,null);
  }
  crearProvincia(provincia){
    let url=`${URL_API}/provincia/crearProvincia`;
    return this.http.post(url,provincia); 
  }
  habilitarProvincia(id){
    let url= `${URL_API}/provincia/habilitarProvincia?id=${id}`;
    return this.http.put(url,null);
  }
}
