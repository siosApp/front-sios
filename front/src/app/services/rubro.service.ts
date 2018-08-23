import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_API } from '../utils/params';
import { Rubro } from '../models/rubro';

@Injectable({
  providedIn: 'root'
})
export class RubroService {

  constructor(private http:HttpClient) { }

  getRubros(){
    let url=`${URL_API}/rubro/listAllRubro`;
    return this.http.get(url);
  }
  getRubroById(id){
    let url=`${URL_API}/rubro?id=${id}`;
    return this.http.get(url);
  }
  updateRubro(Rubro:Rubro){
    let url=`${URL_API}/rubro/editarRubro`;
    return this.http.put(url,Rubro);
  }
  deleteRubro(Rubro:Rubro){
    let url=`${URL_API}/rubro/deshabilitarRubro?id=${Rubro.id}`;
    return this.http.put(url,null);
  }
  crearRubro(rubro){
    let url=`${URL_API}/rubro/crearRubro`;
    console.log("URL: ", url);
    console.log("Rubro:",rubro);
    
    return this.http.post(url,rubro); 
  }
  habilitarRubro(id){
    let url= `${URL_API}/rubro/habilitarRubro?id=${id}`;
    return this.http.put(url,null);
  }
}
