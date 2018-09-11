import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_API } from '../utils/params';
import { Localidad } from '../models/localidad';

@Injectable({
  providedIn: 'root'
})
export class LocalidadService {

  constructor(private http:HttpClient) { }

  getLocalidades(){
    let url=`${URL_API}/localidad/listAllLocalidades`;
    return this.http.get(url);
  }
  getLocalidadesByDepartamento(departamento){
    let url=`${URL_API}/localidad/listLocalidadesVigente?departamento=${departamento}`;
    return this.http.get(url);
  }
  getLocalidadById(id){
    let url=`${URL_API}/localidad?id=${id}`;
    return this.http.get(url);
  }
  updateLocalidad(Localidad:Localidad){
    let url=`${URL_API}/localidad/editarLocalidad`;
    return this.http.put(url,Localidad);
  }
  deleteLocalidad(Localidad:Localidad){
    let url=`${URL_API}/localidad/deshabilitarLocalidad?id=${Localidad.id}`;
    return this.http.put(url,null);
  }
  crearLocalidad(localidad){
    let url=`${URL_API}/localidad/crearLocalidad`;
    console.log("URL: ", url);
    console.log("Localidad:",localidad);
    
    return this.http.post(url,localidad); 
  }
  habilitarLocalidad(id){
    let url= `${URL_API}/localidad/habilitarLocalidad?id=${id}`;
    return this.http.put(url,null);
  }
}