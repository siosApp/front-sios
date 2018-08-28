import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_API } from '../utils/params';
import { TipoRubro } from '../models/tipo-rubro';

@Injectable({
  providedIn: 'root'
})
export class TipoRubroService {

  constructor(private http:HttpClient) { }

  getTipoRubros(){
    let url=`${URL_API}/tipoRubro/listAllTipoRubro`;
    return this.http.get(url);
  }
  getTipoRubroById(id){
    let url=`${URL_API}/tipoRubro/${id}`;
    return this.http.get(url);
  }
  getTipoRubroByNombre(nombre){
    let url=`${URL_API}/tipoRubro?nombreTipoRubro=${nombre}`;
    return this.http.get(url);
  }
  updateTipoRubro(tipoRubro:TipoRubro){
    let url=`${URL_API}/tipoRubro/editarTipoRubro`;
    return this.http.put(url,tipoRubro);
  }
  deleteTipoRubro(tipoRubro:TipoRubro){
    let url=`${URL_API}/tipoRubro/deshabilitarTipoRubro?id=${tipoRubro.id}`;
    return this.http.put(url,null);
  }
  crearTipoRubro(tipoRubro){
    let url=`${URL_API}/tipoRubro/crearTipoRubro`;
    return this.http.post(url,tipoRubro); 
  }
  habilitarTipoRubro(id){
    let url= `${URL_API}/tipoRubro/habilitarTipoRubro?id=${id}`;
    return this.http.put(url,null);
  }
}
