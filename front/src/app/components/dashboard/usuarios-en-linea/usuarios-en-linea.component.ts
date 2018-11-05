import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-usuarios-en-linea',
  templateUrl: './usuarios-en-linea.component.html',
  styleUrls: ['./usuarios-en-linea.component.css']
})
export class UsuariosEnLineaComponent implements OnInit {


  usuarios:any[]=[];
  showLista:boolean;

  constructor(private usuarioService:UsuarioService) {
    this.showLista=false;
    usuarioService.getUsuariosEnLinea().subscribe((usuariosRes:any)=>{
      console.log("Usuario ejemplo: ",usuariosRes[0]);
      if(usuariosRes.length > 0){
        this.showLista=true;
        this.usuarios=usuariosRes;
      }
    })
  }

  ngOnInit() {
  }
  
  calcularHaceCuantoEstaConectado(fecha:Date):number{
    let date1: string =new Date().toDateString();
    let date2: string = new Date(fecha).toDateString();
    let diffInMs: number = Date.parse(date2) - Date.parse(date1);
    return diffInMs / 1000 / 60 / 60;

  }
}
