import { Component } from '@angular/core';
import { RequerimientoService } from '../../../services/requerimiento.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Observable } from 'rxjs';
import { Usuario } from '../../../models/usuario';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

declare var $:any;
@Component({
  selector: 'app-mis-requerimientos',
  templateUrl: './mis-requerimientos.component.html',
  styleUrls: ['./mis-requerimientos.component.css']
})
export class MisRequerimientosComponent {

  requerimientos:any[]=[];
  nombre:any;
  fotoPerfil:any;
  id:any;
  idOfertaSeleccionada:any;
  constructor(private router:Router,private usuarioService:UsuarioService ,private requerimientoService:RequerimientoService) {
    this.id=localStorage.getItem("auth");    
    requerimientoService.getRequerimientosPublicadosPorUsuario(this.id).subscribe((requerimientosRes:any)=>{
      this.requerimientos=requerimientosRes;
      console.log("Requerimiento: ",requerimientosRes);   
    })
    usuarioService.getUsuarioById(this.id).subscribe((usuarioRes:any)=>{
      if(usuarioRes.nombre == null && usuarioRes.apellido == null){
        this.nombre=usuarioRes.username;
      }
      else{
        this.nombre=`${usuarioRes.nombre} ${usuarioRes.apellido}`
      }
    })
  }

  aceptarOferta(idOferta){
      $('#aceptar-oferta').modal('show');
      this.idOfertaSeleccionada=idOferta;
  }
  
  volver(){
    $('#aceptar-oferta').modal('hide');
  }
  confirmarAceptarOferta(){
    this.requerimientoService.aceptarRequerimiento(this.idOfertaSeleccionada).subscribe((res:any)=>{
      this.volver();
      $('#oferta-completa').modal('show');  
    })
  }
  terminar(){
    $('#oferta-completa').modal('hide');
    this.router.navigate(['/sios/home']);
  }
}
