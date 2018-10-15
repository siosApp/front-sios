import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../../services/autenticacion.service';
import { Router } from '@angular/router';
import { log } from 'util';
import { UsuarioService } from '../../services/usuario.service';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Imagen } from '../perfil/perfil.component';
declare var $:any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent {
  
  estaLogueado:boolean=false;
  esAdministrador:any;
  username:any;
  urlImage:string;
  imagenesCollections: AngularFirestoreCollection<Imagen>;

  constructor(private usuarioService:UsuarioService,private tokenService:AutenticacionService,private router:Router,
    private afs: AngularFirestore) {
    if(tokenService.isUsuarioLogueado()){
      this.estaLogueado=true;
    }
    this.urlImage="assets/images/noimage.png";
    this.setFotoPerfil();
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
  setFotoPerfil(){
    let id=localStorage.getItem("auth");
    if(id!=null){
      this.usuarioService.getUsuarioById(id).subscribe((response:any)=>{
        //response.imagen
        this.imagenesCollections = this.afs.collection<Imagen>('perfil', ref => ref.where('id', '==', response.imagen));
        let images = this.imagenesCollections.valueChanges();
        images.subscribe((res:any)=> {
          if(res!=null){
            this.urlImage=res[0].imageURL;
          }
        })  
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
    $("#danger-alert").modal("hide");
  }

  abrirModal(){
    $("#danger-alert").modal("show");
  }
  volver(){
    $("#danger-alert").modal("hide");
  }
}
