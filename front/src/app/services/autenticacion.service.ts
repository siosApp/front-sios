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
    
    // this.isUsuarioAdmin();
    this.esAdministrador=false;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
    // console.log("Entrando por autenticacion: ",this.esAdministrador);
    
    // //this.isUsuarioAdmin();
    // console.log("Administrador: ",this.esAdministrador);
    
    // if (this.isUsuarioAdmin()) {
    //   console.log("Administrador es true");
      
    //   return true;

    // } else {
    //   console.log("Administrador es false");
    //   this.router.navigate(['login']);
    //   return false;
    // }
    // console.log("Usuario administrador22: ",this.isUsuarioAdmin());
    // this.isUsuarioAdmin();
    // console.log("Usuario administrador22: ",this.isUsuarioAdmin());
    // let id=localStorage.getItem("auth");
    // this.usuarioService.getUsuarioById(id).subscribe((response:any)=> {
    //   if(response.tipoUsuario === "Administrador"){
    //     return true;
    //   } 
    //   return false;
    // });
    return true;
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
    this.usuarioService.registrarLogin(auth).subscribe();
  }
  registrarLogueo(idUsuario){
    this.usuarioService
  }
  getUsuarioLogueado():any{
    let id=localStorage.getItem("auth");
    let usuario:Usuario;
    
    this.usuarioService.getUsuarioById(id).subscribe((res:any)=>{
      return res;
    });
  }
  cerrarSesion(){
    let id=localStorage.getItem("auth");
    localStorage.removeItem('recordar');
    localStorage.removeItem('auth');
    this.usuarioService.registrarLogout(id).subscribe();
  }
  isUsuarioAdmin(){
    let id=localStorage.getItem("auth");
    this.usuarioService.getUsuarioById(id).subscribe((response:any)=> response.tipoUsuario === "Administrador"? this.esAdministrador= true :this.esAdministrador =false);
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
