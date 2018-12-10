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
  getUsuarioByUsername(username){
    let url=`${URL_API}/usuario/username?username=${username}`;
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
  //Hay una mezcla de que es un usuario y un usuarioDestacado. 
  getOferentes(tipoRubro,rubro,provincia,departamento,localidad){
    let url=`${URL_API}/usuarioDestacado/listOferentesDestacados?tipoRubro=${tipoRubro}&rubro=${rubro}&provincia=${provincia}&departamento=${departamento}&localidad=${localidad}`;
    return this.http.get(url);
  }
  agregarRubro(usuario,rubro,tipoRubro){
    let url=`${URL_API}/usuario/addRubro?idUsuario=${usuario}&rubro=${rubro}&tipoRubro=${tipoRubro}`;
    return this.http.post(url,null);
  }
  eliminarRubro(usuario,usuarioRubro){
    let url=`${URL_API}/usuario/deleteRubro?idUsuario=${usuario}&usuarioRubro=${usuarioRubro}`;
    return this.http.post(url,null);
  }
  destacarPerfil(mercadoPago){
    let url= `${URL_API}/reservasService/pago/mercadopago`;
    return this.http.post(url,mercadoPago,{responseType: 'text'});
  }
  registrarLogin(id){
    let url= `${URL_API}/usuario/registrarUsuarioLogueado?idUsuario=${id}`;
    return this.http.put(url,null);
  }
  registrarLogout(id){
    let url= `${URL_API}/usuario/registrarUsuarioDeslogueado?idUsuario=${id}`;
    return this.http.put(url,null);
  }
  cantidadUsuariosEnLinea(){
    let url=`${URL_API}/usuario/calcularCantidadUsuariosLinea`;
    return this.http.get(url);
  }
  cantidadUsuariosDestacadosYUsuariosRegistrados(){
    let url=`${URL_API}/usuario/registradosDestacadosUltimosMeses`;
    return this.http.get(url);
  }
  reporteUsuariosDestacadosYUsuariosRegistrados(fechaDesde,fechaHasta){
    let url=`${URL_API}/usuario/cantidadUsuariosRegistradosDestacados?fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}`;
    return this.http.get(url);
  }
  getUsuariosDestacadosPorVencer(){
    let url=`${URL_API}/usuarioDestacado/usuariosPorVencerDestacado`
    return this.http.get(url);
  }
  getUsuariosDestacados(){
    let url=`${URL_API}/usuarioDestacado/verCantidadDestacados`
    return this.http.put(url,null);
  }
  cantidadUsuariosRegistrados(){
    let url=`${URL_API}/usuario/cantidadUsuariosRegistrados`;
    return this.http.get(url);
  }
  cantidadUsuariosDestacados(){
    let url=`${URL_API}/usuarioDestacado/cantidadUsuariosDestacados`;
    return this.http.get(url);
  }
  getUsuariosDestacadosPorFecha(fechaDesde,fechaHasta){
    let url= `${URL_API}/usuarioDestacado/verDestacadosByFechas?fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}`;
    return this.http.get(url);
  }
  getUsuariosEnLinea(){
    let url=`${URL_API}/usuario/usuariosEnLinea`;
    return this.http.get(url);
  }
  getUsuariosRegistrados(sexo,edadDesde,edadHasta,provincia,departamento,localidad,tipoRubro,rubro){
    let url=`${URL_API}/usuario/listUsuariosRegistrados?sexo=${sexo}&edadDesde=${edadDesde}&edadHasta=${edadHasta}&provincia=${provincia}&departamento=${departamento}`;
    url+=`&localidad=${localidad}&tipoRubro=${tipoRubro}&rubro=${rubro}`;
    return this.http.get(url);
  }
  getComentariosOferentes(id){
    let url = `${URL_API}/usuario/comentarios-oferente?id=${id}`;
    return this.http.get(url);
  }
}
