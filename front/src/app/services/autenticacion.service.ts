import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { UsuarioService } from './usuario.service';
import { URL_API } from '../utils/params';
import { HttpClient } from '@angular/common/http';
import { log } from 'util';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService implements CanActivate {

  private esAdministrador: boolean;
  private usuarioTipo: string;

  constructor(private usuarioService:UsuarioService,private http:HttpClient, private router: Router) {
    this.isUsuarioAdmin();
   }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.isUsuarioAdmin();
    if (this.esAdministrador) {
      return true

    } else {
      this.router.navigate(['login']);
      return false
    }

  }

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
    
    this.usuarioService.getUsuarioById(id).subscribe((res:any)=>{
      return res;
    });
  }
  cerrarSesion(){
    localStorage.removeItem('recordar');
    localStorage.removeItem('auth');
  }
  isUsuarioAdmin(){
    let id=localStorage.getItem("auth");
    this.usuarioService.getUsuarioById(id).subscribe((response:Usuario)=>{
      let tipoUsuario =response.tipoUsuario;
      this.usuarioTipo = response.tipoUsuario;
      if(tipoUsuario === "Administrador"){
        this.esAdministrador = true;
        return true;
      }
      else {
        this.esAdministrador = false;
        return false;
      }
    })

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
