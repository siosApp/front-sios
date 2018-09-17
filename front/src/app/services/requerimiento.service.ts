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
      
      //console.log(requerimiento);
            
      return this.http.post(url,requerimiento); 
    }
  }