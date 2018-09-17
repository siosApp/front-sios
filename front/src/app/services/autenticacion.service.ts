import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { UsuarioService } from './usuario.service';
import { URL_API } from '../utils/params';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor(private usuarioService:UsuarioService,private http:HttpClient) { }

  isUsuarioLogueado():boolean{
    let usuario= localStorage.getItem("auth");
    if(usuario!=null){
      return true;
    }
    return false;
  }
  isRecordarSesion(){
    let recordarme=localStorage.getItem("recordar");
    if(recordarme == 'true'){
      return true;
    }
    else if (recordarme == 'false'){
      return false;
    }
    return 'logout';
  }
  guardarSesion(recordarme,auth){
    localStorage.setItem('recordar',recordarme);
    localStorage.setItem('auth',auth);
  }
  getUsuarioLogueado():any{
    let id=localStorage.getItem("auth");
    let usuario:Usuario;
    console.log("coso",id);
    
    this.usuarioService.getUsuarioById(id).subscribe((res:any)=>{
      return res;
    });
    
    // if(id!=null){
    //   this.usuarioService.getUsuarioById(id).subscribe((response:Usuario)=>{
    //     console.log(response);
        
    //    return response;
    //   });
    // }
    // else {
    //   return null;
    // }
    // //return usuario;
  }
  cerrarSesion(){
    localStorage.removeItem('recordar');
    localStorage.removeItem('auth');
  }
  isUsuarioAdmin():boolean{
    let id=localStorage.getItem("auth");
    this.usuarioService.getUsuarioById(id).subscribe((response:Usuario)=>{
      if(response.tipoUsuario == "Administrador"){
        return true;
      }
    })
    return false;
  }
  enviarMail(email){
    let url=`${URL_API}/usuario/validarMail?mail=${email}`
    return this.http.get(url);
  }
  cambiarContrasena(mail,password,codigo){
    let url=`${URL_API}/usuario/change?mail=${mail}&password=${password}&codigo=${codigo}`;
    return this.http.post(url,null);
  }
}
