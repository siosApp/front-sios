import { Component } from '@angular/core';
import { SolicitarTrabajoService } from '../../../services/solicitar-trabajo.service';
declare var $: any; 
@Component({
  selector: 'app-trabajos-realizados',
  templateUrl: './trabajos-realizados.component.html',
  styleUrls: ['./trabajos-realizados.component.css']
})
export class TrabajosRealizadosComponent {

  trabajos:any[]=[]
  comentario:any;
  showReporte:boolean;

  constructor(private solicitarTrabajoService:SolicitarTrabajoService) {
    this.showReporte=false;
    let id=localStorage.getItem("auth");
    solicitarTrabajoService.getTrabajosRealizados(id).subscribe((res:any)=>{
      console.log("Trabajos realizados: ",res);
      if(res.length > 0){
        this.showReporte=true;
        this.trabajos=res;
      }
    })  
  }
 
  abrirComentario(comentarios){
    this.comentario=comentarios[0];
    $('#modalComentario').modal('show');
  }

  cerrarModalComentario(){
    this.comentario=null;
    $('#modalComentario').modal('hide');
  }

}
