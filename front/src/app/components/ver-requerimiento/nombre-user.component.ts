import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-nombre-user',
  templateUrl: './nombre-user.component.html',
  styles: []
})
export class NombreUserComponent implements OnInit {

  @Input() idUsuario:any;
  nombreUsuario:string;
  constructor(private usuarioService:UsuarioService) { }

  ngOnInit() {
    this.usuarioService.getUsuarioById(this.idUsuario).subscribe((usuarioRes:any)=>{
      if(usuarioRes.nombre!=null && usuarioRes.apellido!=null){
        this.nombreUsuario=`${usuarioRes.nombre} ${usuarioRes.apellido}`
      }
      else{
        this.nombreUsuario=usuarioRes.username;
      }
    })
  }

}
