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
      title: 'Destacado',
      quantity: 1,
      currency_id: 'ARG',
      unit_price: 200,
      idUsuario: id,
      idMedioPago: "70679209-7665-4499-ae29-ff3a504f49d6",
    }
    this.usuarioService.destacarPerfil(datosMercadoPago).subscribe((respuesta:any)=>{
      console.log("Url: ",respuesta);
    })
  }
}
