import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../../services/autenticacion.service';
import { Router } from '@angular/router';
import { log } from 'util';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent {
  
  estaLogueado:boolean=false;
  esAdministrador:any;
  username:any;
  constructor(private usuarioService:UsuarioService,private tokenService:AutenticacionService,private router:Router) {
    if(tokenService.isUsuarioLogueado()){
      this.estaLogueado=true;
    }
    this.isUsuarioAdmin();
    this.getUsername();
  }
  isUsuarioAdmin(){
    let id=localStorage.getItem("auth");
    if(id!=null){
      this.usuarioService.getUsuarioById(id).subscribe((response:any)=>{
        console.log("Usuario: ",response.tipoUsuario);
        let tipoUsuario =response.tipoUsuario;
        if(tipoUsuario === "Administrador"){
          this.esAdministrador=true;
        }
        else{
          this.esAdministrador=false;
        }
      })
    }
  }
  getUsername(){
    let id=localStorage.getItem("auth");
    if(id!=null){
      this.usuarioService.getUsuarioById(id).subscribe((response:any)=>{
        this.username=response.username;
      })
    }
  }
  cerrarSesion(){
    this.estaLogueado=false;
    this.tokenService.cerrarSesion();
  }
}
