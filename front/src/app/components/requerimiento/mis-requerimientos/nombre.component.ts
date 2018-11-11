import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-nombre',
  templateUrl: './nombre.component.html',
  styles: []
})
export class NombreComponent implements OnInit {

  @Input() id:any;
  nombre:any;
  constructor(private usuarioService:UsuarioService) { }

  ngOnInit() {
    this.usuarioService.getUsuarioById(this.id).subscribe( (usuarioRes:any)=>{
      if(usuarioRes.nombre == null && usuarioRes.apellido == null ){
        this.nombre=`${usuarioRes.nombre} ${usuarioRes.apellido}`
      }
      else{
        this.nombre= usuarioRes.username;
      }
    });
  }

}
