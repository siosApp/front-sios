import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-perfil-oferente',
  templateUrl: './perfil-oferente.component.html',
  styleUrls: ['./perfil-oferente.component.css']
})
export class PerfilOferenteComponent {

  usuario:any;
  showTabla:boolean;
  constructor(private activatedRoute:ActivatedRoute,private usuarioService:UsuarioService) {
    this.showTabla=false;
    activatedRoute.params.subscribe((parametrosRuta:any)=>{
      usuarioService.getUsuarioById(parametrosRuta["id"]).subscribe((usuarioRes:any)=>{
        console.log("Usuario: ",usuarioRes);
        this.usuario=usuarioRes;
        if(usuarioRes.usuarioRubros.length > 0){
          this.showTabla=true;
        }
      })
    })
  }


}
