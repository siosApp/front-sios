import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-usuarios-por-vencer',
  templateUrl: './usuarios-por-vencer.component.html',
  styleUrls: ['./usuarios-por-vencer.component.css']
})
export class UsuariosPorVencerComponent{

  usuariosDestacados:any[]=[];
  constructor(private usuarioService:UsuarioService) {

    usuarioService.getUsuariosDestacadosPorVencer().subscribe((res:any)=>{
      
      this.usuariosDestacados=res;
    })
  }


}
