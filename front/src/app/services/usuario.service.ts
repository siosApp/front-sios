import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_API } from '../utils/params';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient) { }

  getUsuarios(){
    let url=`${URL_API}/usuario/listAllUsuario`;
    return this.http.get(url);
  }
  getUsuarioById(id){
    let url=`${URL_API}/usuario?id=${id}`;
    return this.http.get(url);
  }
  updateUsuario(usuario:Usuario){
    let url=`${URL_API}/usuario/editarUsuario`;
    return this.http.put(url,usuario);
  }
  deleteUsuario(usuario:Usuario){
    let url=`${URL_API}/usuario/deshabilitarUsuario?id=${usuario.id}`;
    return this.http.put(url,null);
  }
  crearUsuario(usuario){
    let url=`${URL_API}/usuario/crearUsuario`;
    return this.http.post(url,usuario); 
  }
  habilitarUsuario(id){
    let url= `${URL_API}/usuario/habilitarUsuario?id=${id}`;
    return this.http.put(url,null);
  }
  validarUsuario(user,pass){
    let url=`${URL_API}/usuario/loguearUsuario?username=${user}&password=${pass}`;
    return this.http.get(url);
  }
  existeUsuario(username){
    let url=`${URL_API}/usuario/existeUsuario?username=${username}`;
    return this.http.get(url);
  }
  existeMail(mail){
    let url=`${URL_API}/usuario/existeMail?mail=${mail}`;
    return this.http.get(url);
  }
}
