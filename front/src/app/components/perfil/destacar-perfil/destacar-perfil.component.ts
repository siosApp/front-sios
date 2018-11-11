import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-destacar-perfil',
  templateUrl: './destacar-perfil.component.html',
  styleUrls: ['./destacar-perfil.component.css']
})
export class DestacarPerfilComponent implements OnInit {

  constructor(private usuarioService:UsuarioService) { }

  ngOnInit() {
  }

  destacarPerfil(){
    let id:string= localStorage.getItem("auth");
    let datosMercadoPago ={
      currency_id: 'ARG',
      idMedioPago: "a6f9444e-a334-44d5-ad3e-3944107636e8",
      idUsuario: id,
      quantity: 1,
      title: 'Destacado',
      unit_price: 200
    }
    console.log("Id: ",id);
    
    this.usuarioService.destacarPerfil(datosMercadoPago).subscribe((respuesta)=>{
      window.open(respuesta);
    })
  }
}
