import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor(private usuarioService:UsuarioService) { }

  isUsuarioLogueado():boolean{
    let usuario= localStorage.getItem("auth");
    if(usuario!=null){
      return true;
    }
    return false;
  }
  guardarSesion(auth){
    localStorage.setItem('auth',auth);
  }
  getUsuarioLogueado():Usuario{
    let id=localStorage.getItem("auth");
    let usuario:Usuario;
    this.usuarioService.getUsuarioById(id).subscribe((response:Usuario)=>{
      return response;
    });
    return null;
  }
  cerrarSesion(){
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
}
