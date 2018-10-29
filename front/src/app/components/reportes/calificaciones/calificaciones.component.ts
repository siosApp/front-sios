import { Component, OnInit } from '@angular/core';
import { CalificacionService } from '../../../services/calificacion.service';

declare var $:any;

@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.component.html',
  styleUrls: ['./calificaciones.component.css']
})
export class CalificacionesComponent implements OnInit {

  calificaciones:any[]=[];
  listaUsuariosQueCalificaron:any[]=[];
  comentario:string;
  constructor(private calificacionService:CalificacionService) { }

  ngOnInit() {
    let id=localStorage.getItem("auth");
    this.calificacionService.getCalificaciones(id).subscribe((res:any)=>{
      this.calificaciones=res;
      for(let item of this.calificaciones){
        if(item != null && item.datosUsuarios.length > 0){
          this.listaUsuariosQueCalificaron.push(item.datosUsuarios);
        }
      }
    })
  }



  abrirComentario(comentarios){
    $('#modalComentario').modal('show');
    this.comentario=comentarios[0];
  }

  volver(){
    $('#modalComentario').modal('hide');
  }
}
