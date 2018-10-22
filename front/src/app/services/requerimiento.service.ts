import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_API } from '../utils/params';
import { Requerimiento } from '../models/requerimiento';


@Injectable({
    providedIn: 'root'
  })
  export class RequerimientoService {
  
    constructor(private http:HttpClient) { }
  
    crearRequerimiento(requerimiento){
      let url=`${URL_API}/requerimiento/publicarRequerimiento`;
      return this.http.post(url,requerimiento); 
    }

    getRequerimientosActivos(){
      let url=`${URL_API}/requerimiento/getRequerimientosActivos`;
      return this.http.get(url);
    }
    getRequerimientoById(id){
      let url=`${URL_API}/requerimiento/findRequerimientoById?idRequerimiento=${id}`;
      return this.http.get(url);
    }
    ofertarRequerimiento(ofertaRequerimiento){
      let url=`${URL_API}/requerimiento/ofertarRequerimiento`;
      return this.http.post(url,ofertaRequerimiento);
    }
  }