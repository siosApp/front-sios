import { Component, OnInit, Input } from '@angular/core';
import { CalificacionService } from '../../../../services/calificacion.service';

@Component({
  selector: 'app-calificacion',
  templateUrl: './calificacion.component.html',
  styles: []
})

export class CalificacionComponent implements OnInit {

  @Input() oferente:boolean;
  @Input() demandante:boolean;

  listaUsuariosQueCalificaron:any[]=[];
  comentario:string;
  cantidadUsuariosCinco:any;
  cantidadUsuariosCuatro:any;
  cantidadUsuariosTres:any;
  cantidadUsuariosDos:any;
  cantidadUsuariosUno:any;

  constructor(private calificacionService:CalificacionService) { }

  ngOnInit() {
    let id=localStorage.getItem("auth");
    this.calificacionService.getCalificaciones(id).subscribe((res:any)=>{
      this.listaUsuariosQueCalificaron=res.usuariosCalificadores;
      this.cantidadUsuariosCinco=res.cantidadUsuariosCinco;
      this.cantidadUsuariosCuatro=res.cantidadUsuariosCuatro;
      this.cantidadUsuariosTres=res.cantidadUsuariosTres;
      this.cantidadUsuariosDos=res.cantidadUsuariosDos;
      this.cantidadUsuariosUno=res.cantidadUsuariosUno;
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
