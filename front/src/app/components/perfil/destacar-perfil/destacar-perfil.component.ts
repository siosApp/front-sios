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
    let id= localStorage.getItem("auth");
    let datosMercadoPago ={
      title: 'Prueba',
      quantity: 1,
      currency_id: 'ARG',
      unit_price: 0,
      idUsuario: id,
      idMedioPago: null,
    }
    this.usuarioService.destacarPerfil(datosMercadoPago).subscribe((respuesta:any)=>{
      console.log("Url: ",respuesta);
      
    })
  }
}
