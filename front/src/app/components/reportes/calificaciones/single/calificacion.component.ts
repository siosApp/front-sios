import { Component, OnInit, Input } from '@angular/core';
import { CalificacionService } from '../../../../services/calificacion.service';

declare var $:any;

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
  promedioCalificacion:any;

  constructor(private calificacionService:CalificacionService) { }

  ngOnInit() {
    let id=localStorage.getItem("auth");
    this.calificacionService.getCalificaciones(id,this.demandante,this.oferente).subscribe((res:any)=>{
      console.log("res: ",res)
      this.listaUsuariosQueCalificaron=res.usuariosCalificadores;
      this.cantidadUsuariosCinco=res.cantidadUsuariosCinco;
      this.cantidadUsuariosCuatro=res.cantidadUsuariosCuatro;
      this.cantidadUsuariosTres=res.cantidadUsuariosTres;
      this.cantidadUsuariosDos=res.cantidadUsuariosDos;
      this.cantidadUsuariosUno=res.cantidadUsuariosUno;
      let suma = this.cantidadUsuariosCinco + this.cantidadUsuariosCuatro + this.cantidadUsuariosTres + this.cantidadUsuariosDos + this.cantidadUsuariosUno;
      this.promedioCalificacion = (this.cantidadUsuariosCinco * 5) + (this.cantidadUsuariosCuatro * 4 ) + (this.cantidadUsuariosTres * 3) + (this.cantidadUsuariosDos * 2) + ( this.cantidadUsuariosUno * 1 );
    })
  }

  abrirComentario(comentario){
    $('.modalComentario').modal('show');
    this.comentario=comentario;
  }

  volver(){
    $('.modalComentario').modal('hide');
    this.comentario = null ;
  }

}
