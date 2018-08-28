import { Injectable } from '@angular/core';
import { URL_API } from '../utils/params';
import { HttpClient } from '@angular/common/http';
import { TipoUsuario } from '../models/tipo-usuario';

@Injectable({
  providedIn: 'root'
})
export class TipoUsuarioService {

  constructor(private http:HttpClient) { }

  getTipoUsuarios(){
    let url=`${URL_API}/tipoUsuario/listAllTipoUsuario`;
    return this.http.get(url);
  }
  getTipoUsuariosVigentes(){
    let url=`${URL_API}/tipoUsuario/listTipoUsuarioVigente`;
    return this.http.get(url);
  }
  getTipoUsuarioById(id){
    let url=`${URL_API}/tipoUsuario?id=${id}`;
    return this.http.get(url);
  }
  updateTipoUsuario(TipoUsuario:TipoUsuario){
    let url=`${URL_API}/tipoUsuario/editarTipoUsuario`;
    return this.http.put(url,TipoUsuario);
  }
  deleteTipoUsuario(TipoUsuario:TipoUsuario){
    let url=`${URL_API}/tipoUsuario/deshabilitarTipoUsuario?id=${TipoUsuario.id}`;
    return this.http.put(url,null);
  }
  crearTipoUsuario(TipoUsuario){
    let url=`${URL_API}/tipoUsuario/crearTipoUsuario`;
    return this.http.post(url,TipoUsuario); 
  }
  habilitarTipoUsuario(id){
    let url= `${URL_API}/tipoUsuario/habilitarTipoUsuario?id=${id}`;
    return this.http.put(url,null);
  }
}
